import React, { useEffect, useState } from "react";
import api from "../../network/api";
import {
  MapPin,
  CheckCircle,
  Search,
  Scale,
  Video,
  PhoneCall,
  Filter,
  X,
  Mail,
  ShieldCheck,
  CircleCheck,
  BadgeCheck,
} from "lucide-react";

const CITIES = ["All Cities", "Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"];
const AVAILABILITY = ["All", "Available", "Unavailable"];

export default function AllLawyers() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    city: "All Cities",
    availability: "All",
    verified: false,
    kycVerified: false,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visible, setVisible] = useState(new Set());

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/api/v1/comman/lawyers");
      setLawyers(res.data.lawyers || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch lawyers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = lawyers.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      l.name?.toLowerCase().includes(q) ||
      l.state?.toLowerCase().includes(q) ||
      l.email?.toLowerCase().includes(q) ||
      l.barCouncilId?.toLowerCase().includes(q);
    const matchCity = filters.city === "All Cities" || l.state === filters.city;
    const matchAvail =
      filters.availability === "All" ||
      (filters.availability === "Available" && l.avilable) ||
      (filters.availability === "Unavailable" && !l.avilable);
    const matchVerified = !filters.verified || l.isVerified;
    const matchKyc = !filters.kycVerified || l.kycVerified;
    return matchSearch && matchCity && matchAvail && matchVerified && matchKyc;
  });

  useEffect(() => {
    setVisible(new Set());
    const ids = new Set();
    filtered.forEach((l, i) => {
      setTimeout(() => {
        ids.add(l._id);
        setVisible(new Set(ids));
      }, i * 90);
    });
  }, [lawyers, search, JSON.stringify(filters)]);

  const clearFilters = () =>
    setFilters({ city: "All Cities", availability: "All", verified: false, kycVerified: false });

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <div className="w-11 h-11 rounded-full border-4 border-gray-200 border-t-amber-500 animate-spin" />
        <p className="text-gray-500 text-sm font-medium">Finding lawyers for you…</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center max-w-sm w-full">
          <Scale size={40} className="text-gray-200 mx-auto mb-4" />
          <p className="text-red-500 font-semibold mb-5">{error}</p>
          <button
            onClick={fetchLawyers}
            className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ══ NAVBAR ══════════════════════════════════════════════ */}
      {/* <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <Scale size={17} className="text-amber-400" strokeWidth={2} />
            </div>
            <span className="text-[1.2rem] font-bold tracking-tight text-gray-900 select-none">
              Legal<span className="text-amber-500">Ease</span>
            </span>
          </div>
          <button className="text-sm font-medium text-gray-600 hover:text-amber-500 transition-colors">
            Dashboard
          </button>
        </div>
      </nav> */}

      {/* ══ PAGE HEADER ════════════════════════════════════════ */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-7">
          <h1 className="text-[1.85rem] sm:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight mb-1">
            All Lawyers
          </h1>
          <p className="text-gray-500 text-[0.95rem] mb-6">
            Connect with verified legal professionals across India
          </p>
          <div className="relative max-w-3xl">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, city or bar council ID..."
              className="w-full pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* ══ BODY ════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="flex gap-6 lg:gap-7 items-start">

          {/* ── Sidebar (desktop) ─────────────────────────────── */}
          <aside className="hidden lg:block w-[260px] xl:w-[280px] flex-shrink-0">
            <FiltersPanel
              filters={filters}
              setFilters={setFilters}
              clearFilters={clearFilters}
            />
          </aside>

          {/* ── Results ───────────────────────────────────────── */}
          <section className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-gray-600 text-sm">
                <span className="font-bold text-gray-900 text-[1.05rem]">
                  {filtered.length}
                </span>{" "}
                lawyers found
              </p>
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-300 px-3.5 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Filter size={14} /> Filters
              </button>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
                <Scale size={38} className="text-gray-200 mx-auto mb-3" />
                <p className="font-semibold text-gray-800 mb-1">No lawyers found</p>
                <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-amber-500 text-sm font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((lawyer) => (
                  <LawyerCard
                    key={lawyer._id}
                    lawyer={lawyer}
                    isVisible={visible.has(lawyer._id)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ══ MOBILE FILTER DRAWER ════════════════════════════════ */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[300px] max-w-full bg-white overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <span className="font-bold text-gray-900 text-base">Filters</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5">
              <FiltersPanel
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
                hideHeader
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══ FILTERS PANEL ════════════════════════════════════════════ */
function FiltersPanel({ filters, setFilters, clearFilters, hideHeader }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      {!hideHeader && (
        <div className="flex items-center justify-between mb-5">
          <span className="font-bold text-gray-900 text-base">Filters</span>
          <button
            onClick={clearFilters}
            className="text-amber-500 text-sm font-semibold hover:text-amber-600 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* City */}
      <div className="mb-4">
        <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1.5">
          <MapPin size={13} className="text-amber-500" /> City / Location
        </label>
        <div className="relative">
          <select
            value={filters.city}
            onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
            className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2.5 pr-8 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent cursor-pointer transition-all"
          >
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <Chevron />
        </div>
      </div>

      {/* Availability */}
      <div className="mb-5">
        <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1.5">
          <CircleCheck size={13} className="text-amber-500" /> Availability
        </label>
        <div className="relative">
          <select
            value={filters.availability}
            onChange={(e) => setFilters((f) => ({ ...f, availability: e.target.value }))}
            className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2.5 pr-8 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent cursor-pointer transition-all"
          >
            {AVAILABILITY.map((a) => <option key={a}>{a}</option>)}
          </select>
          <Chevron />
        </div>
      </div>

      {/* Toggles */}
      <div className="border-t border-gray-100 pt-4 space-y-3">
        <ToggleFilter
          label="Verified Only"
          icon={<BadgeCheck size={14} className="text-amber-500" />}
          checked={filters.verified}
          onChange={(v) => setFilters((f) => ({ ...f, verified: v }))}
        />
        <ToggleFilter
          label="KYC Verified"
          icon={<ShieldCheck size={14} className="text-amber-500" />}
          checked={filters.kycVerified}
          onChange={(v) => setFilters((f) => ({ ...f, kycVerified: v }))}
        />
      </div>
    </div>
  );
}

function ToggleFilter({ label, icon, checked, onChange }) {
  return (
    <label className="flex items-center justify-between cursor-pointer select-none">
      <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
        {icon} {label}
      </span>
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
          checked ? "bg-amber-500" : "bg-gray-200"
        }`}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </div>
    </label>
  );
}

function Chevron() {
  return (
    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ══ LAWYER CARD ══════════════════════════════════════════════ */
function LawyerCard({ lawyer, isVisible }) {
  const initials =
    lawyer.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("") ?? "?";

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.45s ease, transform 0.45s ease, box-shadow 0.25s ease",
      }}
    >
      <div className="flex flex-col sm:flex-row">

        {/* ── Photo ─────────────────────────────────────────── */}
        <div className="relative sm:w-[168px] flex-shrink-0 bg-gray-100">
          <div className="h-48 sm:h-full" style={{ minHeight: "190px" }}>
            {lawyer.image ? (
              <img
                src={lawyer.image}
                alt={lawyer.name}
                className="w-full h-full object-cover object-top absolute inset-0"
              />
            ) : (
              <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-amber-50 text-amber-500 text-3xl font-bold">
                {initials}
              </div>
            )}
          </div>

          {/* Availability pill */}
          <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[0.7rem] font-semibold ${
            lawyer.avilable
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}>
            {lawyer.avilable ? "Available" : "Unavailable"}
          </div>

          {/* Verified badge */}
          {lawyer.isVerified && (
            <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center shadow z-10">
              <CheckCircle size={15} className="text-white" strokeWidth={2.5} />
            </div>
          )}
        </div>

        {/* ── Content ───────────────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 gap-4">
          <div>
            {/* Name + badges */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h2 className="text-[1.1rem] font-bold text-gray-900 leading-snug">
                  {lawyer.name}
                </h2>
                <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                  {lawyer.isVerified && (
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 text-[0.7rem] font-semibold px-2 py-0.5 rounded-full border border-amber-200">
                      <BadgeCheck size={11} /> Verified
                    </span>
                  )}
                  {lawyer.kycVerified && (
                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[0.7rem] font-semibold px-2 py-0.5 rounded-full border border-green-200">
                      <ShieldCheck size={11} /> KYC Done
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Meta info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {lawyer.state && (
                <MetaItem icon={<MapPin size={13} />} text={lawyer.state} />
              )}
              {lawyer.contactNumber && (
                <MetaItem icon={<PhoneCall size={13} />} text={lawyer.contactNumber} />
              )}
              {lawyer.email && (
                <MetaItem icon={<Mail size={13} />} text={lawyer.email} />
              )}
              {lawyer.barCouncilId && (
                <MetaItem icon={<Scale size={13} />} text={`Bar ID: ${lawyer.barCouncilId}`} />
              )}
            </div>
          </div>

          {/* Footer: action buttons */}
          <div className="flex items-center justify-end gap-2 flex-wrap pt-4 border-t border-gray-100">
            {lawyer.contactNumber && (
              <button className="inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all">
                <PhoneCall size={14} strokeWidth={2} />
                Call
              </button>
            )}
            <button className="inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all">
              <Video size={14} strokeWidth={2} />
              Video
            </button>
            <button className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-gray-800 active:scale-95 transition-all shadow-sm">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ icon, text }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
      <span className="text-gray-400 flex-shrink-0">{icon}</span>
      <span className="truncate">{text}</span>
    </span>
  );
}