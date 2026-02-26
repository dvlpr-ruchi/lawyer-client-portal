import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Scale,
  Menu,
  X,
  ChevronDown,
  User,
  FileText,
  Settings,
  LogOut,
  BookOpen,
} from "lucide-react";
import api from "../../network/api";

// ── Helper MenuItem ────────────────────────────────────────────────────────────
const MenuItem = ({ icon, label, to, onClick }) => (
  <Link
    to={to}
    className="usermenu-item"
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "9px 12px",
      borderRadius: "8px",
      color: "#ccc",
      fontSize: "14px",
      textDecoration: "none",
      transition: "all 0.15s ease",
    }}
  >
    <span style={{ color: "#888", display: "flex" }}>{icon}</span>
    {label}
  </Link>
);

// ── UserMenu Dropdown ──────────────────────────────────────────────────────────
const UserMenu = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const Avatar = ({ size = 32, fontSize = 12 }) =>
    user.image ? (
      <img
        src={user.image}
        alt="profile"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
          border: "2px solid rgba(212,160,23,0.45)",
        }}
      />
    ) : (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #D4A017, #a07010)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize,
          fontWeight: "700",
          color: "#1a1a1a",
          letterSpacing: "0.5px",
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
    );

  return (
    <div ref={ref} className="relative">
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .usermenu-item:hover {
          background: rgba(212,160,23,0.1) !important;
          color: #D4A017 !important;
        }
        .usermenu-item:hover span { color: #D4A017 !important; }
        .usermenu-logout:hover {
          background: rgba(220,60,60,0.12) !important;
          color: #ff6b6b !important;
        }
      `}</style>

      {/* Trigger Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: open ? "rgba(212,160,23,0.12)" : "rgba(255,255,255,0.06)",
          border: "1px solid",
          borderColor: open ? "#D4A017" : "rgba(255,255,255,0.12)",
          borderRadius: "50px",
          padding: "6px 14px 6px 6px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#D4A017";
          e.currentTarget.style.background = "rgba(212,160,23,0.08)";
        }}
        onMouseLeave={(e) => {
          if (!open) {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
          }
        }}
      >
        <Avatar size={32} fontSize={12} />
        <span
          style={{
            color: "#f0f0f0",
            fontSize: "14px",
            fontWeight: "500",
            maxWidth: "120px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {user.name}
        </span>
        <ChevronDown
          size={14}
          color="#D4A017"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            flexShrink: 0,
          }}
        />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            right: 0,
            width: "230px",
            background: "#181818",
            border: "1px solid rgba(212,160,23,0.25)",
            borderRadius: "14px",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
            overflow: "hidden",
            zIndex: 999,
            animation: "fadeSlideIn 0.15s ease",
          }}
        >
          {/* User Info Header */}
          <div
            style={{
              padding: "16px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(212,160,23,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Avatar size={42} fontSize={15} />
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    color: "#f0f0f0",
                    fontWeight: "600",
                    fontSize: "14px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.name}
                </div>
                <div
                  style={{
                    color: "#888",
                    fontSize: "12px",
                    marginTop: "2px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.email || "Client"}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div style={{ padding: "8px" }}>
            <MenuItem icon={<User size={15} />} label="My Profile" to="/profile" onClick={() => setOpen(false)} />
            {/* <MenuItem icon={<FileText size={15} />} label="My Cases" to="/cases" onClick={() => setOpen(false)} />
            <MenuItem icon={<BookOpen size={15} />} label="Consultations" to="/consultations" onClick={() => setOpen(false)} />
            <MenuItem icon={<Settings size={15} />} label="Settings" to="/settings" onClick={() => setOpen(false)} /> */}
          </div>

          {/* Logout */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "8px" }}>
            <button
              className="usermenu-logout"
              onClick={() => { setOpen(false); onLogout(); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "none",
                background: "transparent",
                color: "#ccc",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.15s ease",
                textAlign: "left",
              }}
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Navbar ─────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/api/v1/user/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.log("Logout API error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    }
  };

  const mobileInitials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "U";

  return (
    <nav className="bg-transparent absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
              <Scale className="text-yellow-400 w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-serif text-white">
              Legal<span className="text-yellow-400">Ease</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/find-lawyer" className="text-white/90 hover:text-yellow-400 font-medium transition-colors">Find Lawyers</Link>
            <Link to="/practice-areas" className="text-white/90 hover:text-yellow-400 font-medium transition-colors">Practice Areas</Link>
            <Link to="/how-it-works" className="text-white/90 hover:text-yellow-400 font-medium transition-colors">How it Works</Link>
            <Link to="/about" className="text-white/90 hover:text-yellow-400 font-medium transition-colors">About Us</Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <UserMenu user={user} onLogout={handleLogout} />
            ) : (
              <>
                <Link to="/login" className="px-5 py-2 text-white hover:text-yellow-400 font-semibold transition-colors">Login</Link>
                <Link to="/signup" className="px-5 py-2 bg-white text-black rounded-lg font-semibold hover:bg-yellow-400 transition-colors">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {/* Nav links */}
            {[
              { label: "Find Lawyers", to: "/find-lawyer" },
              { label: "Practice Areas", to: "/practice-areas" },
              { label: "How it Works", to: "/how-it-works" },
              { label: "About Us", to: "/about" },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="block py-2 text-white/90 hover:text-yellow-400 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            {/* Divider */}
            <div className="border-t border-white/10 pt-3 mt-1 space-y-2">
              {user ? (
                <>
                  {/* User info row */}
                  <div className="flex items-center gap-3 py-2 px-1">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt="profile"
                        className="w-9 h-9 rounded-full object-cover"
                        style={{ border: "2px solid rgba(212,160,23,0.5)" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 36, height: 36, borderRadius: "50%",
                          background: "linear-gradient(135deg, #D4A017, #a07010)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 13, fontWeight: 700, color: "#1a1a1a", flexShrink: 0,
                        }}
                      >
                        {mobileInitials}
                      </div>
                    )}
                    <div>
                      <div className="text-white font-semibold text-sm">{user.name}</div>
                      <div className="text-white/50 text-xs">{user.email || "Client"}</div>
                    </div>
                  </div>

                  {/* Mobile quick links */}
                  {[
                    { label: "My Profile", to: "/profile" },
                    { label: "My Cases", to: "/cases" },
                    { label: "Consultations", to: "/consultations" },
                    { label: "Settings", to: "/settings" },
                  ].map(({ label, to }) => (
                    <Link
                      key={to}
                      to={to}
                      className="block py-2 text-white/70 hover:text-yellow-400 text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}

                  <button
                    onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                    className="w-full py-2 mt-1 text-sm font-semibold rounded-lg text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-2 text-center border border-white/30 text-white rounded-lg hover:border-yellow-400 hover:text-yellow-400 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block py-2 text-center bg-white text-black rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;