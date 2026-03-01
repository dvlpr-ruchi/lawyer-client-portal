import React, { useEffect, useState } from "react";
import api from "../../network/api";

const Terms = () => {
  const [terms, setTerms] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await api.get("/api/v1/terms/latest");
        console.log("Fetched Terms:", res.data);
        setTerms(res.data.data);
      } catch (error) {
        console.error("Error fetching terms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 flex justify-center items-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-400 font-serif text-base">Loading Terms…</p>
        </div>
      </div>
    );
  }

  if (!terms) {
    return (
      <div className="min-h-screen bg-stone-100 flex justify-center items-center">
        <div className="bg-white rounded-2xl px-12 py-10 shadow-lg text-center">
          <p className="text-amber-600 font-serif text-lg font-semibold">
            No Terms Found
          </p>
          <p className="text-stone-400 mt-2 text-sm">
            Please check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 font-serif text-xs font-bold tracking-widest uppercase mb-3">
            Legal Document
          </p>
          <h1 className="font-serif text-4xl font-bold text-stone-900 leading-tight">
            {terms.title}
          </h1>
          <div className="w-12 h-0.5 bg-amber-600 rounded-full mx-auto mt-5" />
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Card Header Bar */}
          <div className="bg-stone-900 px-8 py-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-white font-serif text-sm font-semibold">
                Terms & Conditions
              </span>
            </div>
            <span className="bg-amber-600/20 text-amber-500 font-serif text-xs font-semibold px-3 py-1 rounded-full border border-amber-600/30">
              Version {terms.version}
            </span>
          </div>

          {/* Content — using Tailwind Typography plugin (prose) */}
          <div className="px-8 py-10">
            <div
              className="
                prose prose-stone max-w-none
                prose-headings:font-serif prose-headings:text-stone-900
                prose-h1:text-2xl prose-h1:font-bold
                prose-h2:text-xl prose-h2:font-bold prose-h2:border-b-2 prose-h2:border-stone-200 prose-h2:pb-2
                prose-h3:text-base prose-h3:font-bold prose-h3:text-stone-700
                prose-p:text-stone-500 prose-p:font-serif prose-p:leading-relaxed
                prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-stone-900 prose-strong:font-bold
                prose-li:text-stone-500 prose-li:font-serif
                prose-ul:list-disc prose-ol:list-decimal
                prose-blockquote:border-l-4 prose-blockquote:border-amber-600 prose-blockquote:bg-amber-50 prose-blockquote:rounded-r-lg prose-blockquote:text-stone-500 prose-blockquote:italic
                prose-code:text-amber-600 prose-code:bg-amber-50 prose-code:rounded prose-code:px-1 prose-code:font-mono prose-code:text-sm
                prose-th:bg-stone-900 prose-th:text-white prose-th:font-semibold
                prose-td:text-stone-500 prose-td:border-stone-200
                prose-hr:border-stone-200
                prose-img:rounded-xl prose-img:shadow-md
              "
              dangerouslySetInnerHTML={{ __html: terms.content }}
            />
          </div>

          {/* Card Footer */}
          <div className="border-t border-stone-100 bg-stone-50 px-8 py-4 flex items-center justify-between flex-wrap gap-3">
            <p className="text-stone-400 text-xs font-serif">
              By using our platform, you agree to these terms.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-600 opacity-30" />
              <div className="w-2 h-2 rounded-full bg-amber-600 opacity-60" />
              <div className="w-2 h-2 rounded-full bg-amber-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
