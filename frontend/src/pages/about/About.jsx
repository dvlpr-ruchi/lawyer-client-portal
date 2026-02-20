import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const teamMembers = [
  {
    name: "Arjun Mehta",
    role: "Founder & CEO",
    exp: "18 years in Corporate Law",
    image: "https://api.dicebear.com/7.x/personas/svg?seed=ArjunMehta",
    quote: "Access to justice should be a right, not a privilege.",
  },
  {
    name: "Priya Sharma",
    role: "Chief Legal Officer",
    exp: "15 years in Constitutional Law",
    image: "https://api.dicebear.com/7.x/personas/svg?seed=PriyaSharma",
    quote: "We bridge the gap between citizens and the legal system.",
  },
  {
    name: "Rohan Verma",
    role: "Head of Technology",
    exp: "12 years in LegalTech",
    image: "https://api.dicebear.com/7.x/personas/svg?seed=RohanVerma",
    quote: "Technology can democratize legal expertise across India.",
  },
  {
    name: "Anjali Nair",
    role: "Director of Operations",
    exp: "10 years in Legal Operations",
    image: "https://api.dicebear.com/7.x/personas/svg?seed=AnjaliNair",
    quote: "Our clients deserve seamless, transparent experiences.",
  },
];

const values = [
  {
    icon: "⚖️",
    title: "Justice First",
    desc: "Every decision we make is guided by the principle that fair legal representation is a fundamental right for all citizens.",
  },
  {
    icon: "🔒",
    title: "Trust & Integrity",
    desc: "We rigorously verify every lawyer on our platform, maintaining the highest standards of professional conduct.",
  },
  {
    icon: "🌐",
    title: "Accessibility",
    desc: "From metros to tier-3 cities, we're making quality legal help reachable for every Indian, in every language.",
  },
  {
    icon: "🚀",
    title: "Innovation",
    desc: "We continuously evolve our platform with cutting-edge technology to make your legal journey faster and smarter.",
  },
];

const milestones = [
  { year: "2018", event: "LegalEase Founded in Bengaluru" },
  { year: "2019", event: "Crossed 1,000 verified lawyers" },
  { year: "2021", event: "Expanded to 28 states across India" },
  { year: "2022", event: "10K+ lawyers, Series B funding secured" },
  { year: "2024", event: "50K+ cases successfully resolved" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function About() {
  const [activeVal, setActiveVal] = useState(0);

  return (
    <div
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        background: "#0a0a0a",
        color: "#f0ede6",
      }}
      className="min-h-screen"
    >
      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        body { margin: 0; }
        .gold { color: #c9922a; }
        .gold-bg { background: #c9922a; }
        .border-gold { border-color: #c9922a; }
        .dm { font-family: 'DM Sans', sans-serif; }
        .nav-link { font-family: 'DM Sans', sans-serif; font-size: 0.95rem; color: #c0bab0; transition: color 0.2s; cursor: pointer; }
        .nav-link:hover { color: #c9922a; }
        .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(201,146,42,0.15); }
        .timeline-dot::before { content: ''; position: absolute; left: -6px; top: 50%; transform: translateY(-50%); width: 12px; height: 12px; background: #c9922a; border-radius: 50%; }
        .stat-card { background: linear-gradient(135deg, #1a1a1a 0%, #111 100%); border: 1px solid #2a2a2a; }
        .team-card { background: linear-gradient(135deg, #141414 0%, #0f0f0f 100%); border: 1px solid #222; transition: all 0.35s ease; }
        .team-card:hover { border-color: #c9922a44; }
        .val-pill { transition: all 0.3s ease; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .val-pill.active { background: #c9922a; color: #000; }
        .val-pill:not(.active) { background: #1a1a1a; color: #888; border: 1px solid #2a2a2a; }
        .val-pill:not(.active):hover { border-color: #c9922a66; color: #c9922a; }
        .hero-badge { background: linear-gradient(135deg, #c9922a22, #c9922a11); border: 1px solid #c9922a44; }
        .quote-mark { font-size: 5rem; line-height: 0; color: #c9922a22; font-family: Georgia; position: absolute; top: 20px; left: 20px; }
      `}</style>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "85vh", display: "flex", alignItems: "center" }}
      >
        {/* BG decorative */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 70% at 70% 50%, #c9922a0d 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            border: "1px solid #c9922a11",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            border: "1px solid #c9922a22",
            pointerEvents: "none",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center w-full">
          <div>
            <div
              className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="gold dm text-sm font-medium">✦ Our Story</span>
            </div>
            <h1
              className="font-black leading-tight mb-6"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Justice Within
              <br />
              <em className="gold">Everyone's</em> Reach
            </h1>
            <p
              className="dm leading-relaxed mb-8"
              style={{
                color: "#9a9490",
                fontSize: "1.1rem",
                maxWidth: "480px",
              }}
            >
              Founded in 2018, LegalEase was born from a simple belief — that
              navigating India's legal system shouldn't be a privilege reserved
              for the few. We're changing that, one case at a time.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                className="dm font-medium px-6 py-3 rounded-lg transition-all"
                style={{
                  background: "#c9922a",
                  color: "#000",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.background = "#b5831f")}
                onMouseOut={(e) => (e.target.style.background = "#c9922a")}
              >
                Meet Our Team ↓
              </button>
              <button
                className="dm font-medium px-6 py-3 rounded-lg transition-all"
                style={{
                  background: "transparent",
                  color: "#f0ede6",
                  border: "1px solid #333",
                  cursor: "pointer",
                }}
              >
                Our Mission
              </button>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "10K+", label: "Verified Lawyers", icon: "👨‍⚖️" },
              { num: "50K+", label: "Cases Resolved", icon: "📁" },
              { num: "28", label: "States Covered", icon: "🗺️" },
              { num: "4.8★", label: "Average Rating", icon: "⭐" },
            ].map((s, i) => (
              <div
                key={i}
                className="stat-card p-6 rounded-2xl hover-lift"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-bold gold" style={{ fontSize: "1.8rem" }}>
                  {s.num}
                </div>
                <div className="dm text-sm mt-1" style={{ color: "#666" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <AnimatedSection>
        <section className="py-24 relative" style={{ background: "#0d0d0d" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, #c9922a33, transparent)",
            }}
          />
          <div className="max-w-5xl mx-auto px-6 text-center">
            <span className="dm text-sm uppercase tracking-widest gold mb-4 block">
              Our Mission
            </span>
            <h2
              className="font-black leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Democratizing Legal Access
              <br />
              Across India
            </h2>
            <p
              className="dm leading-relaxed mx-auto"
              style={{
                color: "#7a7570",
                fontSize: "1.15rem",
                maxWidth: "680px",
              }}
            >
              We connect citizens with verified, experienced lawyers across
              every practice area — from family law to corporate litigation —
              making expert legal guidance affordable, accessible, and
              transparent.
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <div
                style={{ height: "1px", width: "80px", background: "#2a2a2a" }}
              />
              <span className="gold text-2xl">⚖️</span>
              <div
                style={{ height: "1px", width: "80px", background: "#2a2a2a" }}
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* VALUES */}
      <AnimatedSection>
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <span className="dm text-sm uppercase tracking-widest gold mb-3 block">
              What We Stand For
            </span>
            <h2
              className="font-bold"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              Our Core Values
            </h2>
          </div>

          {/* Pills selector */}
          <div className="flex flex-wrap gap-3 mb-10">
            {values.map((v, i) => (
              <button
                key={i}
                onClick={() => setActiveVal(i)}
                className={`val-pill px-5 py-2 rounded-full text-sm font-medium ${i === activeVal ? "active" : ""}`}
              >
                {v.icon} {v.title}
              </button>
            ))}
          </div>

          {/* Active value detail */}
          <div
            key={activeVal}
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: "linear-gradient(135deg, #141414, #0f0f0f)",
              border: "1px solid #c9922a33",
              animation: "fadeIn 0.4s ease",
            }}
          >
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            <div className="text-5xl mb-6">{values[activeVal].icon}</div>
            <h3 className="font-bold text-2xl gold mb-4">
              {values[activeVal].title}
            </h3>
            <p
              className="dm leading-relaxed"
              style={{
                color: "#9a9490",
                fontSize: "1.1rem",
                maxWidth: "600px",
              }}
            >
              {values[activeVal].desc}
            </p>
          </div>

          {/* All values grid (visible on larger screens) */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {values.map((v, i) => (
              <div
                key={i}
                onClick={() => setActiveVal(i)}
                className="hover-lift p-6 rounded-xl cursor-pointer"
                style={{
                  background: i === activeVal ? "#c9922a08" : "#111",
                  border: `1px solid ${i === activeVal ? "#c9922a44" : "#1e1e1e"}`,
                  transition: "all 0.3s",
                }}
              >
                <div className="text-3xl mb-3">{v.icon}</div>
                <h4 className="font-bold mb-2" style={{ fontSize: "1rem" }}>
                  {v.title}
                </h4>
                <p
                  className="dm text-sm"
                  style={{ color: "#666", lineHeight: "1.6" }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* TEAM */}
      <AnimatedSection>
        <section className="py-24" style={{ background: "#0d0d0d" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, #c9922a22, transparent)",
            }}
          />
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-14 text-center">
              <span className="dm text-sm uppercase tracking-widest gold mb-3 block">
                The People Behind It
              </span>
              <h2
                className="font-bold"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
              >
                Meet Our Leadership
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="team-card rounded-2xl overflow-hidden hover-lift">
                    <div
                      className="relative"
                      style={{
                        height: "200px",
                        background: "#1a1a1a",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "50%",
                          border: "3px solid #c9922a33",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "60px",
                          background: "linear-gradient(transparent, #0f0f0f)",
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                      <div className="gold dm text-sm mb-1">{member.role}</div>
                      <div
                        className="dm text-xs mb-4"
                        style={{ color: "#555" }}
                      >
                        {member.exp}
                      </div>
                      <div className="relative pl-8">
                        <span className="quote-mark">"</span>
                        <p
                          className="dm text-sm italic leading-relaxed"
                          style={{ color: "#7a7570" }}
                        >
                          {member.quote}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* TIMELINE */}
      <AnimatedSection>
        <section className="py-24 max-w-4xl mx-auto px-6">
          <div className="mb-14 text-center">
            <span className="dm text-sm uppercase tracking-widest gold mb-3 block">
              Our Journey
            </span>
            <h2
              className="font-bold"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              Milestones That Shaped Us
            </h2>
          </div>

          <div className="relative" style={{ paddingLeft: "2px" }}>
            <div
              style={{
                position: "absolute",
                left: "60px",
                top: 0,
                bottom: 0,
                width: "1px",
                background: "linear-gradient(#c9922a44, #c9922a11)",
              }}
            />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="flex items-center gap-8">
                    <div
                      className="text-right dm font-medium"
                      style={{
                        minWidth: "50px",
                        color: "#c9922a",
                        fontSize: "0.9rem",
                      }}
                    >
                      {m.year}
                    </div>
                    <div className="relative flex items-center">
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background: "#c9922a",
                          flexShrink: 0,
                          boxShadow: "0 0 10px #c9922a66",
                        }}
                      />
                    </div>
                    <div
                      className="flex-1 p-5 rounded-xl dm"
                      style={{
                        background: "#111",
                        border: "1px solid #1e1e1e",
                      }}
                    >
                      <span style={{ color: "#d0ccc6" }}>{m.event}</span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection>
        <section
          className="py-24 relative overflow-hidden"
          style={{ background: "#0d0d0d" }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 50% 60% at 50% 50%, #c9922a0a 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "10%",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              border: "1px solid #c9922a0f",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20%",
              right: "10%",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              border: "1px solid #c9922a0a",
              pointerEvents: "none",
            }}
          />

          <div className="max-w-3xl mx-auto px-6 text-center">
            <span className="dm text-sm uppercase tracking-widest gold mb-4 block">
              Ready to Get Started?
            </span>
            <h2
              className="font-black mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15 }}
            >
              Find Your Lawyer
              <br />
              <em className="gold">Today</em>
            </h2>
            <p
              className="dm mb-10 leading-relaxed"
              style={{ color: "#7a7570", fontSize: "1.1rem" }}
            >
              Join over 50,000 clients who found the right legal help through
              LegalEase. Your first consultation is always transparent and
              straightforward.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                className="dm font-semibold px-8 py-4 rounded-xl transition-all"
                style={{
                  background: "#c9922a",
                  color: "#000",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
                onMouseOver={(e) => (e.target.style.background = "#b5831f")}
                onMouseOut={(e) => (e.target.style.background = "#c9922a")}
              >
                Find a Lawyer →
              </button>
              <button
                className="dm font-semibold px-8 py-4 rounded-xl transition-all"
                style={{
                  background: "transparent",
                  color: "#f0ede6",
                  border: "1px solid #333",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Learn How It Works
              </button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
