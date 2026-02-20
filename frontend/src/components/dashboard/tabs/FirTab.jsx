import React, { useState, useEffect } from "react";
import {
  X,
  FileText,
  CreditCard,
  MessageSquare,
  Send,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Scale,
} from "lucide-react";
import api from "../../../network/api";

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

/* ─── Step Badge ─────────────────────────────────────────── */
const StepBadge = ({ n }) => (
  <span className="text-xs font-bold uppercase tracking-widest text-yellow-500 border border-yellow-500/30 px-2 py-0.5 rounded-full">
    Step {n}
  </span>
);

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════ */
const FirTab = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
    if (requestId) {
      localStorage.setItem("activeFirId", requestId);
    }
  }, [requestId]);

  /* ── Handlers ── */
  const handleCreateDraft = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        fd.append(k, v);
      });

      const res = await api.post("api/v1/fir/draft", fd);

      console.log("Draft creation response:", res.data);

      // 🔥 GET ID FROM BACKEND RESPONSE
      const createdId = res.data.draftId;

      // 🔥 STORE IT
      setRequestId(createdId);

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        setModalOpen(false);
      }, 2000);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create draft");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!requestId) {
      alert("Create draft first");
      return;
    }

    try {
      const res = await api.post("api/v1/fir/payment", {
       draftId: requestId,
      });

      window.location.href = res.data.url;
    } catch (err) {
      alert("Payment failed");
    }
  };

  const fetchMessages = async () => {
    if (!requestId) {
      alert("Create draft first");
      return;
    }

    setMsgLoading(true);

    try {
      const res = await api.get(`api/v1/fir/${requestId}/messages`);

      setMessages(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setMsgLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!requestId) {
      alert("Create draft first");
      return;
    }

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
        {/* ══ Card 1 — Create Draft ══ */}
        <div className="rounded-2xl bg-neutral-950 border border-white/8 p-6 hover:border-yellow-600/30 transition-colors duration-300">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <StepBadge n="01" />
              <h3 className="mt-2.5 text-lg font-bold text-white">
                Create FIR Draft
              </h3>
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                Fill complainant details, describe the incident and accept legal
                declarations to generate your draft.
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="flex-shrink-0 flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              <FileText size={15} />
              New Draft
            </button>
          </div>
        </div>

        {/* ══ Card 2 — Payment ══ */}
        <div className="rounded-2xl bg-neutral-950 border border-white/8 p-6 hover:border-yellow-600/30 transition-colors duration-300">
          <StepBadge n="02" />
          <h3 className="mt-2.5 text-lg font-bold text-white mb-4">
            Complete Payment
          </h3>
          <div className="flex gap-3 flex-wrap">
            <input
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
              placeholder="Enter Request ID"
              className={`${inputCls} flex-1 min-w-44`}
            />
            <button
              onClick={handlePayment}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/25 hover:-translate-y-0.5 active:translate-y-0 flex-shrink-0"
            >
              <CreditCard size={15} />
              Pay Now
            </button>
          </div>
        </div>

        {/* ══ Card 3 — Messages ══ */}
        <div className="rounded-2xl bg-neutral-950 border border-white/8 p-6 hover:border-yellow-600/30 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <StepBadge n="03" />
              <h3 className="mt-2.5 text-lg font-bold text-white">Messages</h3>
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

          {messages.length > 0 && (
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
      <Modal open={modalOpen} onClose={() => !loading && setModalOpen(false)}>
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center">
              <Scale size={16} className="text-yellow-400" />
            </div>
            <div>
              <h3 className="text-base font-black text-white tracking-tight">
                New FIR Draft
              </h3>
              <p className="text-xs text-gray-500">
                All <span className="text-yellow-500">*</span> fields are
                required
              </p>
            </div>
          </div>
          <button
            onClick={() => !loading && setModalOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-500 hover:text-white hover:border-white/20 transition-all duration-200"
          >
            <X size={15} />
          </button>
        </div>

        {/* ── Success State ── */}
        {success ? (
          <div className="px-6 py-16 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-yellow-400" />
            </div>
            <div>
              <h4 className="text-xl font-black text-white">Draft Created!</h4>
              <p className="text-sm text-gray-500 mt-1">
                Your FIR draft has been saved successfully.
              </p>
            </div>
          </div>
        ) : (
          /* ── Form ── */
          <form
            onSubmit={handleCreateDraft}
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
                disabled={loading}
                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 text-black text-sm font-bold px-6 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <ChevronRight size={15} />
                )}
                {loading ? "Submitting…" : "Create Draft"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default FirTab;
