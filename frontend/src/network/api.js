import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}`,
  timeout: 180000,
  withCredentials: true, // ✅ Sends cookies automatically
});

// Cache implementation
const cache = new Map();
const DEFAULT_STALE_TIME = 30 * 1000; // 30 seconds
const DEFAULT_CACHE_TIME = 5 * 60 * 1000; // 5 minutes

function setCache(key, data, cacheTime) {
  if (cache.has(key)) {
    clearTimeout(cache.get(key).timeout);
  }
  cache.set(key, {
    data,
    timestamp: Date.now(),
    timeout: setTimeout(() => cache.delete(key), cacheTime),
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retryRequest(
  error,
  originalRequest,
  baseDelay = 200,
  maxRetries = 3,
) {
  if (!originalRequest) return Promise.reject(error);

  originalRequest._retrying = originalRequest._retrying || 0;

  if (originalRequest._retrying >= maxRetries) {
    return Promise.reject(error);
  }

  originalRequest._retrying += 1;
  const delay = baseDelay * Math.pow(2, originalRequest._retrying - 1);

  await wait(delay);
  return api(originalRequest);
}

// Track if we're currently refreshing to prevent multiple refresh calls
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    // ✅ Attach token (IMPORTANT FIX)
    const token = localStorage.getItem("token"); // or wherever you store it

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Content-Type logic
    if (!config.headers["Content-Type"]) {
      if (!(config.data instanceof FormData)) {
        config.headers["Content-Type"] = "application/json";
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (!error || !error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    const status = error.response?.status;

    // ✅ Handle 401 Unauthorized (token expired)
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("🔄 Access token expired, refreshing...");

        // Call refresh endpoint - browser sends refresh token cookie automatically
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/refresh`,
          {},
          { withCredentials: true },
        );

        console.log("✅ Token refreshed successfully");

        // Process queued requests
        processQueue(null, refreshResponse.data);

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token failed:", refreshError);

        // Process queued requests with error
        processQueue(refreshError, null);

        // Clear any client-side tokens
        Cookies.remove("accessToken");

        // Only redirect if not already on login page
        if (!window.location.pathname.includes("/login")) {
          console.log("🔐 Redirecting to login...");
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ✅ Handle 403 Forbidden
    if (status === 403) {
      console.error("❌ Access forbidden - insufficient permissions");
    }

    // ✅ Retry on server errors or rate limits
    if (status >= 500 || status === 429) {
      console.log(`⚠️ Server error (${status}), retrying...`);
      return retryRequest(error, originalRequest);
    }

    return Promise.reject(error);
  },
);

// ✅ CACHED GET METHOD
api.cachedGet = async function (
  url,
  { staleTime = DEFAULT_STALE_TIME, cacheTime = DEFAULT_CACHE_TIME } = {},
) {
  const cached = cache.get(url);

  // Return fresh cache if available
  if (cached && Date.now() - cached.timestamp < staleTime) {
    console.log(`📦 Cache hit (fresh): ${url}`);
    return cached.data;
  }

  // Return stale cache but refresh in background
  if (cached) {
    console.log(`📦 Cache hit (stale): ${url}, refreshing...`);
    api
      .get(url)
      .then((data) => {
        setCache(url, data, cacheTime);
        console.log(`✅ Cache refreshed: ${url}`);
      })
      .catch((error) => {
        console.warn(`⚠️ Cache refresh failed: ${url}`, error);
      });
    return cached.data;
  }

  // No cache, fetch fresh data
  console.log(`🌐 Cache miss: ${url}, fetching...`);
  const data = await api.get(url);
  setCache(url, data, cacheTime);
  return data;
};

// ✅ AUTO-INVALIDATE CACHE ON MUTATIONS
const mutationMethods = ["post", "put", "patch", "delete"];

mutationMethods.forEach((method) => {
  const original = api[method];

  api[method] = async function (url, ...args) {
    const result = await original.call(api, url, ...args);

    // Find related cached GET requests
    const relatedGetUrl = url.split("?")[0];
    const cachedKeys = Array.from(cache.keys()).filter((key) =>
      key.includes(relatedGetUrl),
    );

    // Refresh related caches
    if (cachedKeys.length > 0) {
      console.log(
        `🔄 Invalidating ${cachedKeys.length} related cache(s) for: ${relatedGetUrl}`,
      );

      cachedKeys.forEach(async (key) => {
        try {
          const freshData = await api.get(key);
          setCache(key, freshData, DEFAULT_CACHE_TIME);
          console.log(`✅ Cache auto-updated: ${key}`);
        } catch (e) {
          console.warn(`⚠️ Failed to update cache: ${key}`, e);
          // Remove invalid cache
          cache.delete(key);
        }
      });
    }

    return result;
  };
});

// ✅ UTILITY: Clear all cache
api.clearCache = () => {
  cache.forEach((value) => {
    if (value.timeout) {
      clearTimeout(value.timeout);
    }
  });
  cache.clear();
  console.log("🗑️ All cache cleared");
};

// ✅ UTILITY: Clear specific cache by URL pattern
api.clearCacheByPattern = (pattern) => {
  const keysToDelete = Array.from(cache.keys()).filter((key) =>
    key.includes(pattern),
  );

  keysToDelete.forEach((key) => {
    const value = cache.get(key);
    if (value?.timeout) {
      clearTimeout(value.timeout);
    }
    cache.delete(key);
  });

  console.log(
    `🗑️ Cleared ${keysToDelete.length} cache entries matching: ${pattern}`,
  );
};

// ✅ UTILITY: Get cache stats
api.getCacheStats = () => {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  };
};

export default api;
