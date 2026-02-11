import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scale, ArrowLeft, Phone, Mail } from "lucide-react";
import api from "../../network/api";

const Login = () => {
  const navigate = useNavigate();

  const [loginMethod, setLoginMethod] = useState("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= EMAIL LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (loginMethod !== "email") return;

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/app/v1/user/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= OTP UI ONLY (NO API YET) =================
  const handleSendOtp = () => {
    setOtpSent(true);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* LEFT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          <Link to="/" className="flex items-center gap-2 text-gray-500 mb-8">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Scale className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-serif">
              Legal<span className="text-yellow-600">Ease</span>
            </span>
          </Link>

          <h1 className="text-3xl font-serif font-bold mb-2">Welcome back</h1>
          <p className="text-gray-500 mb-8">Login to access your account</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* TOGGLE */}
          <div className="flex bg-gray-200 rounded-xl p-1 mb-8">
            <button
              type="button"
              onClick={() => {
                setLoginMethod("phone");
                setError("");
              }}
              className={`flex-1 py-3 rounded-lg ${
                loginMethod === "phone" ? "bg-white shadow" : "text-gray-500"
              }`}
            >
              <Phone size={16} className="inline mr-2" /> Phone
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginMethod("email");
                setError("");
              }}
              className={`flex-1 py-3 rounded-lg ${
                loginMethod === "email" ? "bg-white shadow" : "text-gray-500"
              }`}
            >
              <Mail size={16} className="inline mr-2" /> Email
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            {/* PHONE LOGIN (UI ONLY) */}
            {loginMethod === "phone" ? (
              <>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  className="w-full border rounded-lg px-4 py-3"
                  placeholder="Enter mobile number"
                />

                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-full bg-black text-white py-3 rounded-lg"
                  >
                    Send OTP
                  </button>
                ) : (
                  <>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      className="w-full border rounded-lg px-4 py-3"
                      placeholder="Enter OTP"
                    />
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-3 rounded-lg"
                    >
                      Verify & Login
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                {/* EMAIL */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3"
                  placeholder="Enter email"
                />

                {/* PASSWORD */}
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-lg px-4 py-3"
                    placeholder="Enter password"
                  />
                  <div className="text-right mt-2">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-lg"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </>
            )}
          </form>

          <p className="text-center text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-yellow-600 font-semibold">
              Sign up
            </Link>
          </p>

        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white items-center justify-center p-12 text-center">
        <div>
          <h2 className="text-3xl font-serif font-bold mb-4">
            Access Legal Help Anytime
          </h2>
          <p className="text-gray-300">
            Connect with verified lawyers across India.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;