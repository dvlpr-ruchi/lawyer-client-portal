import React, { useState } from "react";
import api from "../../network/api";

export default function CreateCase() {
  const [form, setForm] = useState({
    firNumber: "",
    policeStation: "",
    district: "",
    state: "",
    firDate: "",
    courtName: "",
    caseTitle: "",
    caseDescription: "",
    caseCategory: "",
    urgencyLevel: "Medium",
    budgetRange: "Not Sure",
  });

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    setFiles(Array.from(e.dataTransfer.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      files.forEach((file) => {
        formData.append("documents", file);
      });

      const res = await api.post("/api/v1/legal-case", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast("success", "Case filed successfully! We'll connect you with a lawyer soon.");
      console.log("Case created:", res.data);

      // Reset form after success
      setForm({
        firNumber: "",
        policeStation: "",
        district: "",
        state: "",
        firDate: "",
        courtName: "",
        caseTitle: "",
        caseDescription: "",
        caseCategory: "",
        urgencyLevel: "Medium",
        budgetRange: "Not Sure",
      });
      setFiles([]);
      setStep(1);
    } catch (err) {
      console.error("Case creation error:", err);
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Something went wrong. Please try again.";
      showToast("error", message);
    } finally {
      setLoading(false);
    }
  };

  const urgencyConfig = {
    Low: { color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/30" },
    Medium: { color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/30" },
    High: { color: "text-red-400", bg: "bg-red-400/10 border-red-400/30" },
  };

  const inputClass =
    "w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all duration-200";

  const labelClass = "block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5";

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-start gap-3 px-5 py-4 rounded-xl border shadow-2xl max-w-sm transition-all duration-300 ${
          toast.type === "success"
            ? "bg-zinc-900 border-emerald-500/40 shadow-emerald-500/10"
            : "bg-zinc-900 border-red-500/40 shadow-red-500/10"
        }`}>
          <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
            toast.type === "success" ? "bg-emerald-500/20" : "bg-red-500/20"
          }`}>
            {toast.type === "success" ? (
              <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
            ) : (
              <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            )}
          </div>
          <div className="flex-1">
            <p className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${toast.type === "success" ? "text-emerald-400" : "text-red-400"}`}>
              {toast.type === "success" ? "Success" : "Error"}
            </p>
            <p className="text-sm text-zinc-300 leading-snug">{toast.message}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-zinc-600 hover:text-zinc-300 transition-colors flex-shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-600/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-black border border-zinc-800 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight">
              Legal<span className="text-amber-500">Ease</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                File a New Case
              </h1>
              <p className="mt-2 text-zinc-400 text-sm">
                Provide complete details to connect with the right legal expert.
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <button
                  key={s}
                  onClick={() => setStep(s)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    step === s
                      ? "bg-amber-500 border-amber-500 text-black"
                      : step > s
                      ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                      : "bg-zinc-900 border-zinc-700 text-zinc-500"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    step > s ? "bg-amber-500 text-black" : step === s ? "bg-black" : "bg-zinc-800"
                  }`}>
                    {step > s ? "✓" : s}
                  </span>
                  <span className="hidden sm:block">
                    {s === 1 ? "FIR Details" : s === 2 ? "Case Info" : "Documents"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Step 1: FIR & Location Details */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-5 bg-amber-500 rounded-full" />
                  <h2 className="text-base font-semibold text-white">FIR & Location Details</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>FIR Number <span className="text-amber-500">*</span></label>
                    <input name="firNumber" placeholder="e.g. 123/2024" onChange={handleChange} value={form.firNumber} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>FIR Date</label>
                    <input type="date" name="firDate" onChange={handleChange} value={form.firDate} className={`${inputClass} [color-scheme:dark]`} />
                  </div>
                  <div>
                    <label className={labelClass}>Police Station <span className="text-amber-500">*</span></label>
                    <input name="policeStation" placeholder="Police Station Name" onChange={handleChange} value={form.policeStation} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Court Name</label>
                    <input name="courtName" placeholder="e.g. District Court, Delhi" onChange={handleChange} value={form.courtName} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>District</label>
                    <input name="district" placeholder="District" onChange={handleChange} value={form.district} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>State</label>
                    <input name="state" placeholder="State" onChange={handleChange} value={form.state} className={inputClass} />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-amber-500/20"
                >
                  Next: Case Info
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Case Details */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-5 bg-amber-500 rounded-full" />
                  <h2 className="text-base font-semibold text-white">Case Information</h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Case Title <span className="text-amber-500">*</span></label>
                    <input name="caseTitle" placeholder="Brief title describing your case" onChange={handleChange} value={form.caseTitle} className={inputClass} required />
                  </div>

                  <div>
                    <label className={labelClass}>Case Description <span className="text-amber-500">*</span></label>
                    <textarea
                      name="caseDescription"
                      placeholder="Describe your case in detail — include facts, dates, parties involved, and what legal help you need..."
                      onChange={handleChange}
                      value={form.caseDescription}
                      rows={5}
                      className={`${inputClass} resize-none leading-relaxed`}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Case Category <span className="text-amber-500">*</span></label>
                    <div className="relative">
                      <select name="caseCategory" onChange={handleChange} value={form.caseCategory} className={`${inputClass} appearance-none pr-10`} required>
                        <option value="">Select a category</option>
                        {["Cyber Crime","Theft","Fraud","Harassment","Domestic Violence","Property Dispute","Criminal","Civil","Other"].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Urgency & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 bg-amber-500 rounded-full" />
                    <h3 className="text-sm font-semibold text-white">Urgency Level</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {["Low", "Medium", "High"].map((level) => (
                      <label key={level} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        form.urgencyLevel === level
                          ? urgencyConfig[level].bg
                          : "border-zinc-800 hover:border-zinc-600"
                      }`}>
                        <input type="radio" name="urgencyLevel" value={level} checked={form.urgencyLevel === level} onChange={handleChange} className="sr-only" />
                        <div className={`w-3 h-3 rounded-full ${
                          level === "Low" ? "bg-emerald-400" : level === "Medium" ? "bg-amber-400" : "bg-red-400"
                        } ${form.urgencyLevel === level ? "ring-2 ring-offset-2 ring-offset-zinc-900 ring-current" : ""}`} />
                        <span className={`text-sm font-medium ${form.urgencyLevel === level ? urgencyConfig[level].color : "text-zinc-400"}`}>{level}</span>
                        {level === "High" && <span className="ml-auto text-xs text-red-400/70 font-medium">Immediate</span>}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 bg-amber-500 rounded-full" />
                    <h3 className="text-sm font-semibold text-white">Budget Range</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {["Not Sure", "5k-10k", "10k-25k", "25k-50k", "50k+"].map((budget) => (
                      <label key={budget} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        form.budgetRange === budget
                          ? "bg-amber-400/10 border-amber-400/30"
                          : "border-zinc-800 hover:border-zinc-600"
                      }`}>
                        <input type="radio" name="budgetRange" value={budget} checked={form.budgetRange === budget} onChange={handleChange} className="sr-only" />
                        <div className={`w-3 h-3 rounded-full border-2 ${form.budgetRange === budget ? "bg-amber-400 border-amber-400" : "border-zinc-600"}`} />
                        <span className={`text-sm font-medium ${form.budgetRange === budget ? "text-amber-400" : "text-zinc-400"}`}>
                          {budget === "Not Sure" ? budget : `₹${budget}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-between">
                <button type="button" onClick={() => setStep(1)} className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Back
                </button>
                <button type="button" onClick={() => setStep(3)} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-3 rounded-xl transition-all text-sm shadow-lg shadow-amber-500/20">
                  Next: Documents
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-5 bg-amber-500 rounded-full" />
                  <h2 className="text-base font-semibold text-white">Supporting Documents</h2>
                  <span className="ml-auto text-xs text-zinc-500">Optional</span>
                </div>

                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 cursor-pointer ${
                    dragOver
                      ? "border-amber-500 bg-amber-500/5"
                      : "border-zinc-700 hover:border-zinc-500 bg-zinc-900/40"
                  }`}
                >
                  <input type="file" multiple onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${dragOver ? "bg-amber-500/20" : "bg-zinc-800"}`}>
                      <svg className={`w-6 h-6 ${dragOver ? "text-amber-400" : "text-zinc-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {dragOver ? "Drop files here" : "Drag & drop files, or click to browse"}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">PDF, JPG, PNG, DOC — Max 10MB each</p>
                    </div>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-zinc-400 font-semibold uppercase tracking-widest mb-3">{files.length} file{files.length > 1 ? "s" : ""} selected</p>
                    {files.map((file, i) => (
                      <div key={i} className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5">
                        <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-white font-medium truncate">{file.name}</p>
                          <p className="text-xs text-zinc-500">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-zinc-600 hover:text-red-400 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary card */}
              <div className="bg-zinc-900/60 border border-amber-500/20 rounded-2xl p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-3">Case Summary</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  {[
                    { label: "FIR No.", value: form.firNumber || "—" },
                    { label: "Station", value: form.policeStation || "—" },
                    { label: "Category", value: form.caseCategory || "—" },
                    { label: "Urgency", value: form.urgencyLevel },
                    { label: "Budget", value: form.budgetRange === "Not Sure" ? "Not Sure" : `₹${form.budgetRange}` },
                    { label: "Documents", value: files.length ? `${files.length} file(s)` : "None" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-zinc-900 rounded-lg p-3">
                      <p className="text-xs text-zinc-500 mb-0.5">{label}</p>
                      <p className="text-xs font-semibold text-white truncate">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-between">
                <button type="button" onClick={() => setStep(2)} className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold px-8 py-3 rounded-xl transition-all text-sm shadow-lg shadow-amber-500/25"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Case
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-zinc-600">© 2026 LegalEase. All rights reserved.</p>
          <p className="text-xs text-zinc-600 flex items-center gap-1">
            <svg className="w-3 h-3 text-amber-500/60" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
            Secured & Encrypted
          </p>
        </div>
      </div>
    </div>
  );
}