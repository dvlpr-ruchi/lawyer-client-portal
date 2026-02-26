import React, { useEffect, useState } from "react";
import api from "../../network/api";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await api.get("/api/v1/comman/faq");
        setFaqs(res.data.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F0F2F5]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#C8860A] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#1a2340] text-base font-medium">
            Loading FAQs...
          </p>
        </div>
      </div>
    );
  }

  if (!faqs || faqs.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F0F2F5]">
        <p className="text-[#C8860A] text-lg font-medium">No FAQs Found</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F0F2F5] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Section Header — matches "How It Works" style */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#1a2340] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-base">
            Everything you need to know about getting legal help
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq._id}
                className={`bg-white rounded-2xl overflow-hidden border transition-all duration-200 ${
                  isOpen
                    ? "border-[#C8860A]/40 shadow-md"
                    : "border-transparent shadow-sm"
                }`}
              >
                {/* Question Row */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                >
                  {/* Step number — faded, like the "01 02 03" on the cards */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="text-2xl font-bold text-[#C8860A]/20 select-none shrink-0 w-8 text-right">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[#1a2340] font-semibold text-base leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  {/* Toggle Icon — golden square, like the icon boxes */}
                  <div
                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      isOpen ? "bg-[#C8860A]" : "bg-[#C8860A]/10"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen
                          ? "rotate-45 text-white"
                          : "rotate-0 text-[#C8860A]"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5 pl-[4.5rem] text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom divider line — matches the horizontal lines between cards */}
        <div className="mt-16 flex items-center gap-4 justify-center opacity-30">
          <div className="h-px w-16 bg-[#C8860A]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C8860A]" />
          <div className="h-px w-16 bg-[#C8860A]" />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
