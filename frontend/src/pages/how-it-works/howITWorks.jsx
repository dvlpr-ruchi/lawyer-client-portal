import {
  User,
  Search,
  Calendar,
  Upload,
  MessageSquare,
  FileText,
  CheckCircle,
  Shield,
  Scale,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: User,
    title: "Create Your Account",
    desc: "Sign up using mobile OTP or email. Your identity is securely verified.",
  },
  {
    icon: Search,
    title: "Find a Lawyer",
    desc: "Search by expertise, location, language, and experience.",
  },
  {
    icon: Calendar,
    title: "Book Consultation",
    desc: "Choose chat, call, video, or in-person and select time slot.",
  },
  {
    icon: Upload,
    title: "Upload Documents",
    desc: "Securely upload FIR, case files, or ID proof.",
  },
  {
    icon: MessageSquare,
    title: "Consult Lawyer",
    desc: "Connect and get legal advice from verified lawyers.",
  },
  {
    icon: FileText,
    title: "Request FIR (₹999)",
    desc: "Submit FIR request and we'll retrieve it legally.",
  },
  {
    icon: CheckCircle,
    title: "Track & Receive",
    desc: "Track status and download FIR from dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ══ PAGE HEADER ═══════════════════════════════════════ */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-600 border border-amber-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            <Shield size={11} />
            Simple &amp; Secure
          </span>
          <h1 className="text-[1.85rem] sm:text-[2.4rem] font-bold text-gray-900 tracking-tight leading-tight mb-2">
            How It Works
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
            Get legal help and FIR details in simple steps
          </p>
        </div>
      </div>

      {/* ══ STEPS GRID ════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Top accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />

                <div className="flex items-center gap-4 mb-3">
                  {/* Icon box */}
                  <div className="w-11 h-11 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 transition-colors duration-300">
                    <Icon size={18} className="text-white" strokeWidth={2} />
                  </div>
                  {/* Step number + title */}
                  <div>
                    <p className="text-[0.7rem] font-semibold text-amber-500 uppercase tracking-widest leading-none mb-0.5">
                      Step {index + 1}
                    </p>
                    <h3 className="font-bold text-gray-900 text-[0.95rem] leading-snug">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed pl-[60px]">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* ══ SECURITY BANNER ═══════════════════════════════════ */}
        <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-14 h-14 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
            <Shield size={26} className="text-amber-500" strokeWidth={1.8} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Your Privacy is Protected
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We use secure encryption and verified lawyers to keep your data
              safe. All documents are stored with bank-grade security.
            </p>
          </div>
          {/* Trust badges */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex flex-col items-center gap-1 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
              <CheckCircle size={18} className="text-green-500" />
              <span className="text-[0.65rem] font-semibold text-gray-500 uppercase tracking-wide">
                Verified
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
              <Shield size={18} className="text-amber-500" />
              <span className="text-[0.65rem] font-semibold text-gray-500 uppercase tracking-wide">
                Encrypted
              </span>
            </div>
          </div>
        </div>

        {/* ══ CTA ═══════════════════════════════════════════════ */}
        <div className="mt-8 text-center">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 active:scale-95 transition-all shadow-sm hover:shadow-md"
          >
            Get Started
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="mt-0.5"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <p className="text-gray-400 text-xs mt-3">
            Free to sign up · No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}
