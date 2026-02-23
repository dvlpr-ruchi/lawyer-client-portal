import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  X,
  FileText,
  MessageSquare,
  Send,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Scale,
} from "lucide-react";
import api from "../../../network/api";

const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY");

/* ─── Modal Overlay ─────────────────────────────────────── */
const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl overflow-hidden border border-yellow-600/30 shadow-2xl"
        style={{
          background: "#111",
          animation: "modalIn .22s cubic-bezier(.4,0,.2,1) both",
        }}
      >
        {children}
      </div>
      <style>{`@keyframes modalIn{from{opacity:0;transform:translateY(20px) scale(.97)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
};

/* ─── Form Field Wrapper ─────────────────────────────────── */
const Field = ({ label, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
      {label}
      {required && <span className="text-yellow-500 ml-1">*</span>}
    </label>
    {children}
  </div>
);

/* ─── Shared input className ─────────────────────────────── */
const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 transition-all duration-200";

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════ */
const FirTab = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // Single unified loading state for the entire submit+pay flow
  const [submitting, setSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(""); // "draft" | "payment" | ""

  const [requestId, setRequestId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [msgLoading, setMsgLoading] = useState(false);

  const [form, setForm] = useState({
    complainantName: "",
    caseType: "",
    policeStation: "",
    state: "",
    district: "",
    incidentDate: "",
    incidentDescription: "",
    legalDeclarationAccepted: false,
  });

  const set = (k) => (e) =>
    setForm((p) => ({
      ...p,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  useEffect(() => {
    const savedId = localStorage.getItem("activeFirId");
    if (savedId) setRequestId(savedId);
  }, []);

  useEffect(() => {
    if (requestId) localStorage.setItem("activeFirId", requestId);
  }, [requestId]);

  /* ── Single handler: create draft silently → open Stripe ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Step 1: silently create the draft (user sees "Processing…")
      setSubmitStep("draft");
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));

      const draftRes = await api.post("api/v1/fir/draft", fd);
      const createdId = draftRes.data.draftId;
      setRequestId(createdId);
      localStorage.setItem("activeFirId", createdId);

      // Step 2: immediately call payment API
      setSubmitStep("payment");
      const payRes = await api.post("api/v1/fir/payment", {
        draftId: createdId,
      });

      // Step 3: redirect to Stripe Checkout URL returned by backend
      window.location.href = payRes.data.url;

      // ── If you prefer Stripe.js embedded checkout instead of redirect ──
      // const stripe = await stripePromise;
      // await stripe.redirectToCheckout({ sessionId: payRes.data.sessionId });
    } catch (err) {
      alert(
        err.response?.data?.message ||
          (submitStep === "draft"
            ? "Failed to create FIR. Please try again."
            : "Payment initiation failed. Please try again.")
      );
      setSubmitting(false);
      setSubmitStep("");
    }
  };

  /* ── Messages ── */
  const fetchMessages = async () => {
    if (!requestId) {
      alert("No active FIR found.");
      return;
    }
    setMsgLoading(true);
    try {
      const res = await api.get(`api/v1/fir/${requestId}/messages`);
      setMessages(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setMsgLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!requestId) { alert("No active FIR found."); return; }
    if (!newMessage.trim()) return;
    try {
      const fd = new FormData();
      fd.append("message", newMessage);
      await api.post(`api/v1/fir/${requestId}/user/message`, fd);
      setNewMessage("");
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const loadingLabel =
    submitStep === "draft"
      ? "Preparing your FIR…"
      : submitStep === "payment"
      ? "Opening secure payment…"
      : "Processing…";

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      {/* ── Page Header ── */}
      <div className="max-w-2xl mx-auto mb-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center flex-shrink-0">
          <Scale size={22} className="text-yellow-400" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white leading-none">
            FIR Management
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            File, track and manage First Information Reports
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        {/* ══ Card 1 — File FIR (single action, no mention of "draft") ══ */}
        <div className="rounded-2xl bg-neutral-950 border border-white/8 p-6 hover:border-yellow-600/30 transition-colors duration-300">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">File an FIR</h3>
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                Fill in the incident details and proceed to secure payment to
                submit your First Information Report.
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="flex-shrink-0 flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              <FileText size={15} />
              File FIR
            </button>
          </div>
        </div>

        {/* ══ Card 2 — Messages (only visible if an FIR has been filed) ══ */}
        <div className="rounded-2xl bg-neutral-950 border border-white/8 p-6 hover:border-yellow-600/30 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Messages</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Communicate regarding your filed FIR
              </p>
            </div>
            <button
              onClick={fetchMessages}
              disabled={msgLoading}
              className="flex items-center gap-2 border border-white/10 hover:border-yellow-500/40 bg-white/5 hover:bg-yellow-500/10 text-gray-400 hover:text-yellow-400 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200"
            >
              {msgLoading ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <MessageSquare size={13} />
              )}
              {msgLoading ? "Loading…" : "Load Messages"}
            </button>
          </div>

          {Array.isArray(messages) && messages.length > 0 && (
            <div className="flex flex-col gap-2 mb-4 max-h-52 overflow-y-auto pr-1">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className="bg-white/4 border border-white/6 rounded-xl px-4 py-3 text-sm text-gray-300 leading-relaxed"
                >
                  {msg.message}
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message and press Enter…"
              className={`${inputCls} flex-1`}
            />
            <button
              onClick={sendMessage}
              className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-black p-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/25 flex-shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════ MODAL ══════════════════════ */}
      <Modal open={modalOpen} onClose={() => !submitting && setModalOpen(false)}>
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center">
              <Scale size={16} className="text-yellow-400" />
            </div>
            <div>
              <h3 className="text-base font-black text-white tracking-tight">
                File an FIR
              </h3>
              <p className="text-xs text-gray-500">
                All <span className="text-yellow-500">*</span> fields are
                required
              </p>
            </div>
          </div>
          <button
            onClick={() => !submitting && setModalOpen(false)}
            disabled={submitting}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-500 hover:text-white hover:border-white/20 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <X size={15} />
          </button>
        </div>

        {/* ── Full-screen loading overlay inside modal ── */}
        {submitting ? (
          <div className="px-6 py-20 flex flex-col items-center gap-5 text-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
                <Loader2 size={28} className="text-yellow-400 animate-spin" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-black text-white">{loadingLabel}</h4>
              <p className="text-xs text-gray-500 mt-1.5">
                Please don't close this window
              </p>
            </div>
            {/* Step indicators */}
            <div className="flex items-center gap-3 mt-2">
              <div className={`flex items-center gap-1.5 text-xs font-semibold ${submitStep === "draft" ? "text-yellow-400" : submitStep === "payment" ? "text-green-400" : "text-gray-600"}`}>
                {submitStep === "payment" ? <CheckCircle2 size={12} /> : <div className={`w-2 h-2 rounded-full ${submitStep === "draft" ? "bg-yellow-400 animate-pulse" : "bg-gray-600"}`} />}
                FIR Details
              </div>
              <div className="w-8 h-px bg-white/10" />
              <div className={`flex items-center gap-1.5 text-xs font-semibold ${submitStep === "payment" ? "text-yellow-400 animate-pulse" : "text-gray-600"}`}>
                <div className={`w-2 h-2 rounded-full ${submitStep === "payment" ? "bg-yellow-400 animate-pulse" : "bg-gray-600"}`} />
                Secure Payment
              </div>
            </div>
          </div>
        ) : (
          /* ── Form ── */
          <form
            onSubmit={handleSubmit}
            className="px-6 py-5 flex flex-col gap-4"
          >
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Complainant Name" required>
                <input
                  required
                  value={form.complainantName}
                  onChange={set("complainantName")}
                  placeholder="John Doe"
                  className={inputCls}
                />
              </Field>
              <Field label="Case Type" required>
                <select
                  required
                  value={form.caseType}
                  onChange={set("caseType")}
                  className={`${inputCls} appearance-none`}
                  style={{ background: "#1a1a1a" }}
                >
                  <option value="">Select type</option>
                  {[
                    "Theft",
                    "Assault",
                    "Fraud",
                    "Cybercrime",
                    "Robbery",
                    "Vandalism",
                    "Other",
                  ].map((t) => (
                    <option key={t} value={t} style={{ background: "#111" }}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="State" required>
                <input
                  required
                  value={form.state}
                  onChange={set("state")}
                  placeholder="Delhi"
                  className={inputCls}
                />
              </Field>
              <Field label="District" required>
                <input
                  required
                  value={form.district}
                  onChange={set("district")}
                  placeholder="New Delhi"
                  className={inputCls}
                />
              </Field>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Police Station" required>
                <input
                  required
                  value={form.policeStation}
                  onChange={set("policeStation")}
                  placeholder="Connaught Place PS"
                  className={inputCls}
                />
              </Field>
              <Field label="Incident Date">
                <input
                  type="date"
                  value={form.incidentDate}
                  onChange={set("incidentDate")}
                  className={inputCls}
                  style={{ colorScheme: "dark" }}
                />
              </Field>
            </div>

            {/* Description */}
            <Field label="Incident Description">
              <textarea
                rows={3}
                value={form.incidentDescription}
                onChange={set("incidentDescription")}
                placeholder="Briefly describe the incident…"
                className={`${inputCls} resize-none leading-relaxed`}
              />
            </Field>

            {/* Legal Declaration */}
            <label className="flex items-start gap-3 cursor-pointer bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-4 py-3 hover:border-yellow-500/40 transition-colors duration-200">
              <input
                type="checkbox"
                required
                checked={form.legalDeclarationAccepted}
                onChange={set("legalDeclarationAccepted")}
                className="mt-0.5 w-4 h-4 flex-shrink-0 accent-yellow-500"
              />
              <span className="text-xs text-gray-400 leading-relaxed">
                <AlertCircle
                  size={11}
                  className="inline mr-1.5 text-yellow-500 align-middle"
                />
                I declare that all information provided is true and accurate to
                the best of my knowledge. I understand that providing false
                information is a punishable offence under Indian law.
              </span>
            </label>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/4 text-sm font-semibold text-gray-400 hover:text-white hover:border-white/20 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold px-6 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                <ChevronRight size={15} />
                Continue to Payment
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default FirTab;