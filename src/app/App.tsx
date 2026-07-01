import { useState, useEffect, useRef, useCallback } from "react";
// Autoremov screens
import imgAutoLanding from "../imports/Landing_Page.png";
import imgAutoLandingCredit from "../imports/Landing_Page-credit.png";
import imgAutoDashGrid from "../imports/Dashboard.png";
import imgAutoDashList from "../imports/Dashboard-2.png";
import imgAutoEditorEmpty from "../imports/New_Image.png";
import imgAutoEditorBatch from "../imports/New_Image_Multiple_seleceted.png";
import imgAutoPricingSub from "../imports/Pricing.png";
import imgAutoPricingCredit from "../imports/Pricing_-_Credit_based.png";
import imgAutoSettings from "../imports/Notification.png";
import imgAutoBilling from "../imports/Billing.png";
import imgAutoAbout from "../imports/About_Us-1.png";
// Trivira screens
import imgHome from "../imports/Home.png";
import imgAboutUs from "../imports/About_Us.png";
import imgProducts from "../imports/Nutraceutical_Products.png";
import imgBlogs from "../imports/Blogs.png";
import imgBlogsPost from "../imports/Blogs-1.png";
import imgCareers from "../imports/Careers.png";
import imgCareersJobDesc from "../imports/Careers-2.png";
import imgCareersForm from "../imports/Careers-3.png";
import imgContactUs from "../imports/Contact_Us.png";

// ─── Brand Design Tokens ──────────────────────────────────────────────────────
const C = {
  bg: "#F9F7F3",
  secondary: "#FFFFFF",
  surface: "#F3F0EA",
  border: "rgba(30,32,34,0.08)",
  text: "#1E2022",
  muted: "#5C5F62",
  accent: "#E06A3B",
  accentSec: "#10B981",
};

// ─── Type definitions ────────────────────────────────────────────────────────
type Page = "home" | "work-archive" | "experience" | "process" | "about" | "contact";
type CaseStudyId = "klimashift" | "autoremov" | "trivira" | "gamified_lms" | null;

// ─── Process Steps Data ───────────────────────────────────────────────────────
const PROCESS_STEPS = {
  1: {
    meta: "STAGE 01 // DISCOVER AND MAP",
    tag: "Research Framework",
    title: "Deep Stakeholder and Pipeline Investigation",
    desc: "We spend the first week researching in the physical environment. Before single wireframes get plotted, we interview HVAC experts, facilities executives, and technical developers. Our core target is discovering what data parameters determine corrective operational actions.",
    metric: "Stakeholder Alignment & Mapping",
    tool: "User Interview Panels, Flowcharts",
  },
  2: {
    meta: "STAGE 02 // INFORMATION SCHEMA",
    tag: "Logical Architecture",
    title: "Information Schema and Workflow Prioritization",
    desc: "We analyze high-density data parameters to construct clean priority structures. Redundant indicators get isolated and deprecated, ensuring that operators are only presented with contextually-actionable, real-time alerts.",
    metric: "Cognitive Load Decrements",
    tool: "FigJam Mapping, Visual Priority Taxonomies",
  },
  3: {
    meta: "STAGE 03 // PROTOTYPE & TEST",
    tag: "UI Engineering",
    title: "Prototyping & Dynamic Interface Load Testing",
    desc: "We validate ideas using responsive wireframe dashboards directly filled with live database mock payloads. Testing dashboards under high-stress visual loads ensures we capture user friction early before handing code specs over.",
    metric: "UI Responsiveness Verification",
    tool: "Figma Variables, Dynamic Prototyping Systems",
  },
  4: {
    meta: "STAGE 04 // VALIDATE & TUNE",
    tag: "Heuristics Tuning",
    title: "Usability Testing and Continuous Optimization Loops",
    desc: "We gather actual quantitative and qualitative heuristics metrics in the field. Iterating directly on code components ensures all sizing grids, colors, and interactive targets remain fully aligned with professional environments.",
    metric: "40% Target Operational Reductions",
    tool: "Heuristics Matrix Logs, Field Auditing Tools",
  },
} as const;

// ─── Shared style helpers ─────────────────────────────────────────────────────
const tagStyle = (color: string): React.CSSProperties => ({
  fontSize: 9,
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color,
});

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        background: C.text,
        color: C.secondary,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        padding: "12px 20px",
        borderRadius: 12,
        boxShadow: "0 8px 24px rgba(30,32,34,0.18)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        zIndex: 100,
        pointerEvents: "none",
        transform: visible ? "translateY(0)" : "translateY(48px)",
        opacity: visible ? 1 : 0,
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: C.accentSec,
          display: "inline-block",
          animation: "pulse 1.5s infinite",
        }}
      />
      {message}
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Nav({
  current,
  onNav,
  onContact,
}: {
  current: Page;
  onNav: (p: Page) => void;
  onContact: () => void;
}) {
  const links: { id: Page; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "work-archive", label: "Work Archive" },
    { id: "experience", label: "Experience" },
    { id: "process", label: "Process" },
    { id: "about", label: "About" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 40,
        background: "rgba(249,247,243,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.border}`,
        padding: "16px 64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}
      <button
        onClick={() => onNav("home")}
        style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: `${C.accent}1a`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 18, color: C.text, zIndex: 1 }}>D</span>
          <div style={{ position: "absolute", bottom: -4, right: -4, width: 20, height: 20, borderRadius: "50%", background: `${C.accent}4d` }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 14, color: C.text, lineHeight: 1 }}>Divyanshu Singh</span>
          <span style={{ ...tagStyle(C.muted), fontSize: 9, marginTop: 3 }}>STRATEGIC UX &amp; ARCHITECTURES</span>
        </div>
      </button>

      {/* Nav links */}
      <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {links.map((l) => (
          <button
            key={l.id}
            onClick={() => onNav(l.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: current === l.id ? C.text : C.muted,
              borderBottom: current === l.id ? `2px solid ${C.accent}` : "2px solid transparent",
              paddingBottom: 2,
              transition: "all 0.2s",
            }}
          >
            {l.label}
          </button>
        ))}
      </nav>

      {/* CTA */}
      <button
        onClick={onContact}
        style={{
          padding: "10px 20px",
          borderRadius: 999,
          background: C.text,
          color: C.secondary,
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 600,
          fontSize: 12,
          letterSpacing: "0.07em",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.accent; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.text; }}
      >
        <span>Let&apos;s Connect</span>
        <span>→</span>
      </button>
    </header>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ onNav, onCaseStudy }: { onNav: (p: Page) => void; onCaseStudy: (id: CaseStudyId) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 120;
    canvas.height = 64;
    ctx.strokeStyle = C.accent;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(15, 45);
    ctx.quadraticCurveTo(45, 40, 95, 15);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(95, 15);
    ctx.lineTo(80, 10);
    ctx.moveTo(95, 15);
    ctx.lineTo(87, 30);
    ctx.stroke();
  }, []);

  const featuredProjects = [
    { id: "klimashift" as CaseStudyId, num: "01", cat: "ENERGY DESIGN SYSTEM", badge: "[ ENERGY DECARBONIZATION ]", title: "KlimaShift Dashboard", sub: "Backed by Schneider & Shell", cardTitle: "KlimaShift — Energy AI", desc: "Designed dashboard systems enabling commercial operators to manage complex carbon reduction workflows." },
    { id: "autoremov" as CaseStudyId, num: "02", cat: "CREATOR SAAS", badge: "[ AI SAAS · FULL-STACK DESIGN ]", title: "Autoremov Platform", sub: "25+ Pages · 8 Weeks · 0 → Live", cardTitle: "Autoremov — Background Removal AI", desc: "Built complete web presence from zero — 25+ pages, design system, functional editor, dual-model pricing UX, 7 audience segments." },
    { id: "trivira" as CaseStudyId, num: "03", cat: "BRANDING & PACKAGING", badge: "[ BRAND IDENTITY SYSTEM ]", title: "Trivira Commerce", sub: "₹64 Lakh Revenue · 100K+ Customers", cardTitle: "Trivira Global Enterprise", desc: "Brand architecture & e-commerce UX for a nutraceutical startup — ₹64L revenue in first year, 100K+ customers across 5 channels." },
  ];

  const education = [
    { active: true, period: "[ POSTGRADUATE // 2025 — 2027 ]", degree: "M.Des in UX Design", detail: "DIT University. Exploring advanced layout architectures, spatial components, and design heuristics tailored for data systems." },
    { active: false, period: "[ INTERNATIONAL SPEC // GÖTTINGEN, GERMANY ]", degree: "M.Sc in UX Design & Management", detail: "PFH University of Applied Sciences. Completed first academic year (2025–2026) in strategic user psychology before transitioning to industry-scale roles with KlimaShift." },
    { active: false, period: "[ UNDERGRADUATE // 2018 — 2022 ]", degree: "B.Des in Industrial Design", detail: "Uttar Pradesh Institute of Design (UPID). Specialized in physical ergonomics, environmental mapping, and tangible user interaction." },
  ];

  const skills = [
    { icon: "🔍", badge: "Empirical", badgeBg: `${C.accentSec}1a`, badgeColor: C.accentSec, title: "Contextual Heuristic Mapping", desc: "Performing field surveys, technical interviews, and benchmark analysis to align interface parameters with actual operational behaviors." },
    { icon: "📐", badge: "High Density", badgeBg: C.text, badgeColor: C.secondary, title: "High-Fidelity Wireframes", desc: "Creating priority visual structures for data dashboards, organizing technical details to keep systems clear and easy to navigate." },
    { icon: "🧠", badge: "AI Core", badgeBg: `${C.accent}1a`, badgeColor: C.accent, title: "Cognitive Load Mitigation", desc: "Refining busy telemetry systems to prevent alert fatigue, ensuring users can find key information and make quick decisions." },
    { icon: "⚡", badge: "Spatial", badgeBg: `${C.accent}1a`, badgeColor: C.accent, title: "Interactive AR Structures", desc: "Designing clear overlay targets and simple hand-held navigation pathways for outdoor industrial calibration tools." },
  ];

  return (
    <div style={{ paddingTop: 112 }}>
      {/* Hero */}
      <div
        style={{
          padding: "0 64px 64px",
          maxWidth: 1440,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "7fr 5fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent, display: "inline-block" }} />
            <span style={{ ...tagStyle(C.accent) }}>STRATEGIC UX &amp; PRODUCT DESIGNER</span>
          </div>

          <h1
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 800,
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: C.text,
              margin: 0,
            }}
          >
            Designing{" "}
            <span
              style={{
                fontFamily: "Caveat, cursive",
                color: C.accent,
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: 84,
                display: "inline-block",
                transform: "rotate(-2deg)",
                padding: "0 4px",
              }}
            >
              meaningful
            </span>{" "}
            systems that create impact.
          </h1>

          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: C.muted, maxWidth: 480, lineHeight: 1.7, margin: 0 }}>
            I translate complex operational logic, telemetry parameters, and field data streams into simple, high-fidelity responsive systems and digital product systems.
          </p>

          <div style={{ display: "flex", gap: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.muted }}>
            <span>📍 Noida, Uttar Pradesh, India</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.accentSec, display: "inline-block", animation: "pulse 1.5s infinite" }} />
              Available for new system opportunities
            </span>
          </div>

          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <button
              onClick={() => onNav("work-archive")}
              style={{ padding: "14px 24px", borderRadius: 999, background: C.text, color: C.secondary, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer", display: "flex", gap: 8, transition: "background 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.accent; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.text; }}
            >
              Browse Work Archive <span>→</span>
            </button>
            <button
              onClick={() => onNav("experience")}
              style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 14, color: C.text, background: "none", border: "none", borderBottom: `1px solid ${C.text}`, cursor: "pointer", paddingBottom: 2, display: "flex", gap: 6, alignItems: "center", transition: "color 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.accent; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.text; }}
            >
              Read Timeline Story <span>→</span>
            </button>
          </div>
        </div>

        {/* Right — portrait frame */}
        <div style={{ position: "relative", height: 450, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              position: "absolute",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: `${C.accent}1a`,
              border: `1px solid ${C.accent}33`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "80%", height: "80%", borderRadius: "50%", border: `1px dashed ${C.accent}4d` }} />
          </div>

          {/* Corner brackets */}
          <div style={{ position: "absolute", top: 16, left: 16, width: 24, height: 24, borderTop: `1px solid ${C.text}26`, borderLeft: `1px solid ${C.text}26` }} />
          <div style={{ position: "absolute", bottom: 16, right: 16, width: 24, height: 24, borderBottom: `1px solid ${C.text}26`, borderRight: `1px solid ${C.text}26` }} />

          {/* Photo placeholder */}
          <div style={{ position: "relative", zIndex: 10, width: "100%", height: 380, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                width: 200,
                height: 280,
                borderRadius: 24,
                background: `linear-gradient(160deg, ${C.surface} 0%, ${C.accent}22 100%)`,
                border: `1px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 64,
              }}
            >
              👤
            </div>

            {/* Quote annotation */}
            <div style={{ position: "absolute", top: -16, left: -24, transform: "rotate(-6deg)", maxWidth: 150, pointerEvents: "none", zIndex: 20 }}>
              <span style={{ fontFamily: "Caveat, cursive", color: C.accent, fontSize: 22, lineHeight: 1.3, display: "block" }}>
                Keep it simple but significant.
              </span>
              <canvas ref={canvasRef} style={{ width: 64, height: 40, marginLeft: 32, marginTop: 4, transform: "rotate(10deg)" }} />
            </div>

            {/* Stat card */}
            <div
              style={{
                position: "absolute",
                top: "35%",
                right: -16,
                background: C.secondary,
                border: `1px solid ${C.border}`,
                boxShadow: "0 8px 24px rgba(30,32,34,0.1)",
                padding: 16,
                borderRadius: 16,
                maxWidth: 140,
                zIndex: 20,
                transform: "rotate(3deg)",
                transition: "transform 0.3s",
              }}
            >
              <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 36, color: C.accent, display: "block", lineHeight: 1 }}>5+</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: C.text, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginTop: 6, lineHeight: 1.4 }}>Years of design experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Work */}
      <div style={{ padding: "80px 64px", maxWidth: 1440, margin: "0 auto", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <span style={tagStyle(C.accent)}>● SELECTED WORK SAMPLES</span>
            <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 40, color: C.text, margin: "4px 0 0" }}>Recent Solutions</h2>
          </div>
          <button
            onClick={() => onNav("work-archive")}
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.accent, background: "none", border: "none", cursor: "pointer", display: "flex", gap: 4, alignItems: "center", textDecoration: "underline" }}
          >
            Browse All Blueprints →
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {featuredProjects.map((p) => (
            <ProjectCard key={p.id} project={p} onClick={() => onCaseStudy(p.id)} />
          ))}
        </div>
      </div>

      {/* Education + Skills */}
      <div style={{ padding: "80px 64px", maxWidth: 1440, margin: "0 auto", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 48, alignItems: "start" }}>
          {/* Education */}
          <div>
            <span style={tagStyle(C.accent)}>● ACADEMIC FOUNDATIONS</span>
            <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 40, color: C.text, margin: "4px 0 4px" }}>Education</h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted, marginBottom: 32, lineHeight: 1.6 }}>Empirical academic frameworks in interaction layouts, spatial balance, and visual acoustics.</p>

            <div style={{ borderLeft: `1px solid ${C.border}`, paddingLeft: 24, display: "flex", flexDirection: "column", gap: 32 }}>
              {education.map((e, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: -33,
                      top: 6,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: e.active ? C.accent : `${C.muted}4d`,
                      border: `4px solid ${C.bg}`,
                      animation: e.active ? "pulse 1.5s infinite" : "none",
                    }}
                  />
                  <span style={{ ...tagStyle(e.active ? C.accent : C.muted), fontSize: 9 }}>{e.period}</span>
                  <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 18, color: C.text, margin: "4px 0 4px" }}>{e.degree}</h4>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.6, margin: 0 }}>{e.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <span style={tagStyle(C.accent)}>● SYSTEM VECTOR MATRIX</span>
            <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 40, color: C.text, margin: "4px 0 24px" }}>UX Foundations &amp; AI-Ready Core</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {skills.map((s, i) => (
                <div key={i} style={{ background: C.secondary, border: `1px solid ${C.border}`, padding: 20, borderRadius: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontSize: 24 }}>{s.icon}</span>
                    <span style={{ ...tagStyle(s.badgeColor), background: s.badgeBg, padding: "2px 10px", borderRadius: 999, fontSize: 9 }}>{s.badge}</span>
                  </div>
                  <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 15, color: C.text, margin: "12px 0 6px" }}>{s.title}</h4>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Project Card (shared) ────────────────────────────────────────────────────
function ProjectCard({ project, onClick }: { project: { num: string; badge: string; title: string; sub: string; cat: string; cardTitle: string; desc: string }; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.secondary,
        border: `1px solid ${hovered ? `${C.accent}4d` : C.border}`,
        padding: 20,
        borderRadius: 20,
        boxShadow: hovered ? "0 8px 24px rgba(30,32,34,0.1)" : "0 2px 8px rgba(30,32,34,0.04)",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      <div
        style={{
          aspectRatio: "16/10",
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          marginBottom: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: `${C.accent}0d`, opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }} />
        <span style={tagStyle(C.accent)}>{project.badge}</span>
        <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 18, color: C.text, margin: "4px 0 0" }}>{project.title}</h4>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.muted, marginTop: 8 }}>{project.sub}</span>
      </div>
      <span style={{ ...tagStyle(C.accent), fontSize: 10 }}>{project.num} // {project.cat}</span>
      <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 18, color: hovered ? C.accent : C.text, margin: "4px 0 4px", transition: "color 0.2s" }}>{project.cardTitle}</h3>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.6, margin: 0 }}>{project.desc}</p>
    </div>
  );
}

// ─── WORK ARCHIVE PAGE ────────────────────────────────────────────────────────
function WorkArchivePage({ onCaseStudy }: { onCaseStudy: (id: CaseStudyId) => void }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const allProjects = [
    { id: "klimashift" as CaseStudyId, num: "01", cat: "ai-saas", badge: "[ AI ENERGY ANALYTICS ]", title: "KlimaShift Platform", sub: "Full UX Ownership · Gurugram", catLabel: "AI INDUSTRIAL TECH", cardTitle: "KlimaShift — Carbon Tracker", desc: "A strategic AI analysis grid helping commercial building teams manage consumption across asset portfolios.", tags: ["Dashboard", "SaaS", "Energy"] },
    { id: "autoremov" as CaseStudyId, num: "02", cat: "ai-saas", badge: "[ AI SAAS · FULL-STACK UX & DEV ]", title: "Autoremov Platform", sub: "25+ Pages · 8 Weeks · 7 Segments", catLabel: "CREATOR PLATFORM", cardTitle: "Autoremov — AI Background Removal", desc: "0 to full web presence in 8 weeks — design system, product editor, dual-model pricing, 7 audience pages, React + TypeScript build.", tags: ["AI SaaS", "Design System", "Full-Stack", "7 Segments"] },
    { id: "ar_onboarding" as CaseStudyId, num: "03", cat: "spatial", badge: "[ MIXED REALITY ]", title: "Spatial AR Asset Utility", sub: "Field Technician Tools", catLabel: "SPATIAL INTERACTION", cardTitle: "AR Asset Onboarding Mobile", desc: "Large-contrast visual paths designed for physical work environments with high-glare limits.", tags: ["Augmented Reality", "Tactile UI"] },
    { id: "trivira" as CaseStudyId, num: "04", cat: "commerce", badge: "[ BRAND + E-COMMERCE UX ]", title: "Trivira Global Enterprise", sub: "₹64L Revenue · 100K+ Customers", catLabel: "COMMERCE ARCHITECTURE", cardTitle: "Trivira — Nutraceuticals & Wellness", desc: "Brand architecture, outcome-based product UX, and trust-led e-commerce for a wellness startup — ₹64 Lakh in first-year revenue.", tags: ["Brand Identity", "E-Commerce UX", "Conversion", "Nutraceuticals"] },
    { id: "gamified_lms" as CaseStudyId, num: "05", cat: "ai-saas", badge: "[ ENTERPRISE GAMIFICATION ]", title: "Learniphi LMS Portal", sub: "Staff Upskilling Experience", catLabel: "WORKFLOW EXPERIENCE", cardTitle: "Gamified LMS Dashboard", desc: "Integrated progress milestones and friendly team challenges that helped increase employee course completion rates.", tags: ["Gamification", "LMS"] },
  ];

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "ai-saas", label: "AI & SaaS" },
    { id: "spatial", label: "Spatial AR" },
    { id: "commerce", label: "Commerce & Brand" },
  ];

  const visible = allProjects.filter((p) => {
    const matchCat = filter === "all" || p.cat === filter;
    const matchSearch = p.cardTitle.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ paddingTop: 112, padding: "112px 64px 64px", maxWidth: 1440, margin: "0 auto" }}>
      <div style={{ marginBottom: 48 }}>
        <span style={tagStyle(C.accent)}>● PRODUCT ARCHIVE</span>
        <h1 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 64, color: C.text, margin: "8px 0 8px" }}>Work Portfolio</h1>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: C.muted, maxWidth: 560 }}>Explore your unified design index spanning climate-tech start-ups, brand systems, and interactive tools.</p>
      </div>

      {/* Filter bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: C.secondary,
          border: `1px solid ${C.border}`,
          padding: 16,
          borderRadius: 20,
          marginBottom: 32,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                border: `1px solid ${C.border}`,
                background: filter === f.id ? C.surface : "transparent",
                color: filter === f.id ? C.text : C.muted,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: filter === f.id ? 600 : 400,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search active blueprints..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: 256,
            background: C.bg,
            border: `1px solid ${C.border}`,
            borderRadius: 999,
            padding: "8px 16px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: C.text,
            outline: "none",
          }}
        />
      </div>

      {visible.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {visible.map((p) => (
            <div key={p.id}>
              <ProjectCard project={p} onClick={() => onCaseStudy(p.id)} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                {p.tags.map((t) => (
                  <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, textTransform: "uppercase", background: C.surface, color: C.muted, padding: "2px 8px", borderRadius: 4 }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "80px 0", color: C.muted, fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>
          No matching blueprints found. Try adjusting your category filter parameters.
        </div>
      )}
    </div>
  );
}

// ─── EXPERIENCE PAGE ──────────────────────────────────────────────────────────
function ExperiencePage() {
  const roles = [
    {
      active: true,
      title: "Lead User Experience Designer",
      company: "KlimaShift",
      period: "SEP 2023 — PRESENT",
      location: "Gurugram, Haryana, India · On-site · 2 yrs 10 mos (backed by Schneider Electric & Shell Petroleum)",
      desc: "Leading UX design decisions for an AI-Powered Energy Analysis Dashboard designed to help commercial properties monitor energy consumption across portfolio assets.",
      bullets: [
        "Designed dynamic asset-onboarding workflows, integrating Augmented Reality (AR) helper paths to reduce tracking drift in the field.",
        "Configured the Admin Control Panel, giving management simple, secure access to telemetry logs and sync operations.",
        "Engineered a client-side fingertip asset app for real-time temperature tracking.",
        "Collaborate closely with the CEO, CTO, and engineering teams, translating strategic business targets into clean, functional interface layouts.",
      ],
    },
    {
      active: false,
      title: "User Experience Designer",
      company: "KlimaShift",
      period: "SEP 2023 — JUN 2025",
      location: "Gurugram, Haryana · Full-time · Overlapping Transition",
      desc: "Designed the visual language and interaction paths for a carbon analytics dashboard tailored for small-to-midsize commercial real estate portfolios.",
      bullets: [],
    },
    {
      active: true,
      title: "Freelance Product Designer & Brand Strategist",
      company: null,
      period: "MAY 2020 — PRESENT",
      location: "Noida, Uttar Pradesh, India · Remote · 6 yrs 2 mos",
      desc: null,
      clients: [
        { label: "CLIENT 1 // TRIVIRA GLOBAL ENTERPRISE", role: "End-to-End Brand Design & Digital Commerce", desc: "Designed unified brand typography, packaging layouts, web catalog experiences, and conversion paths that helped streamline customer checkout funnels." },
        { label: "CLIENT 2 // AUTOREMOV (AI BACKGROUND SAAS)", role: "Bulk SaaS Platform Redesign & Strategy", desc: "Redesigned bulk image background editing consoles, analyzed usability gaps against industry tools, and improved dashboard layout structures for high-volume creator workflows." },
      ],
    },
    {
      active: false,
      title: "UI/UX Consultant",
      company: "Quantmhill",
      period: "APR 2023 — SEP 2023",
      location: "IT Services & Consultancy · Remote · 6 mos",
      desc: "Consulted on web projects for hospitality, media, and real estate clients—designing responsive sites and custom app flows to improve usability.",
      bullets: [],
    },
    {
      active: false,
      title: "UI/UX Designer",
      company: "Learniphi Technology",
      period: "SEP 2022 — MAR 2023",
      location: "Ahmedabad, Gujarat, India · On-site · 7 mos",
      desc: "Designed engaging learning platforms for corporate training programs and created simplified, clean dashboards for Learning Management Systems (LMS).",
      bullets: [],
    },
  ];

  return (
    <div style={{ paddingTop: 112, padding: "112px 64px 64px", maxWidth: 1440, margin: "0 auto" }}>
      <span style={tagStyle(C.accent)}>● HISTORICAL SYSTEM LEDGER</span>
      <h1 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 64, color: C.text, margin: "8px 0 8px" }}>Work Experience</h1>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.muted, maxWidth: 560, marginBottom: 48 }}>A documented record of leading UX roles, startup designs, and digital brand systems.</p>

      <div style={{ borderLeft: `1px solid ${C.border}`, marginLeft: 8, paddingLeft: 48, display: "flex", flexDirection: "column", gap: 64, maxWidth: 900 }}>
        {roles.map((r, i) => (
          <div key={i} style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: -55,
                top: 6,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: r.active ? C.accent : `${C.muted}4d`,
                border: `4px solid ${C.bg}`,
                animation: r.active ? "pulse 1.5s infinite" : "none",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 20, color: C.text, margin: 0 }}>
                {r.title}{r.company && <span style={{ fontWeight: 400, fontSize: 16, color: C.muted }}> @ {r.company}</span>}
              </h3>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  color: r.active ? C.accent : C.muted,
                  background: r.active ? `${C.accent}1a` : C.surface,
                  padding: "2px 10px",
                  borderRadius: 999,
                  whiteSpace: "nowrap",
                }}
              >
                {r.period}
              </span>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted, textTransform: "uppercase", display: "block", marginTop: 4 }}>{r.location}</span>
            {r.desc && <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.muted, marginTop: 16, lineHeight: 1.7 }}>{r.desc}</p>}
            {r.bullets && r.bullets.length > 0 && (
              <ul style={{ marginTop: 12, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                {r.bullets.map((b, j) => (
                  <li key={j} style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{b}</li>
                ))}
              </ul>
            )}
            {"clients" in r && r.clients && (
              <div style={{ marginTop: 24, borderLeft: `2px solid ${C.surface}`, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 24 }}>
                {r.clients.map((cl, j) => (
                  <div key={j}>
                    <span style={{ ...tagStyle(C.accent), fontSize: 10 }}>{cl.label}</span>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: C.text, margin: "4px 0 4px" }}>{cl.role}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.6, margin: 0 }}>{cl.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PROCESS PAGE ─────────────────────────────────────────────────────────────
function ProcessPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [fading, setFading] = useState(false);
  const data = PROCESS_STEPS[step];

  const changeStep = (s: 1 | 2 | 3 | 4) => {
    setFading(true);
    setTimeout(() => {
      setStep(s);
      setFading(false);
    }, 150);
  };

  return (
    <div style={{ paddingTop: 112, padding: "112px 64px 64px", maxWidth: 1440, margin: "0 auto" }}>
      <span style={tagStyle(C.accent)}>● SYSTEMS METHODOLOGY</span>
      <h1 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 64, color: C.text, margin: "8px 0 8px" }}>Product Thinking Blueprint</h1>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.muted, maxWidth: 560, marginBottom: 48 }}>How complex data streams are simplified into clear, high-fidelity responsive systems.</p>

      <div style={{ display: "grid", gridTemplateColumns: "4fr 8fr", gap: 48, alignItems: "start" }}>
        {/* Tabs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {([1, 2, 3, 4] as const).map((s) => {
            const active = step === s;
            return (
              <button
                key={s}
                onClick={() => changeStep(s)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: 20,
                  borderRadius: 20,
                  border: `1px solid ${active ? `${C.accent}33` : C.border}`,
                  background: active ? `${C.accent}0d` : C.secondary,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  transition: "all 0.2s",
                }}
              >
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: active ? C.accent : C.surface,
                    color: active ? C.secondary : C.muted,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  0{s}
                </span>
                <div>
                  <span style={{ ...tagStyle(active ? C.accent : C.muted), display: "block", fontSize: 10 }}>
                    {["Discover & Map", "Information Schema", "Prototype & Test", "Validate & Tune"][s - 1]}
                  </span>
                  <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 14, color: C.text, display: "block" }}>
                    {["System Stakeholders", "Logical Hierarchy", "Load Testing Layouts", "Heuristic Optimizations"][s - 1]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          style={{
            background: C.secondary,
            border: `1px solid ${C.border}`,
            borderRadius: 24,
            padding: 32,
            minHeight: 420,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: fading ? 0 : 1,
            transform: fading ? "translateY(10px)" : "translateY(0)",
            transition: "opacity 0.15s, transform 0.15s",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}`, paddingBottom: 16, marginBottom: 24 }}>
              <span style={tagStyle(C.accent)}>{data.meta}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, textTransform: "uppercase", background: `${C.accent}1a`, color: C.accent, padding: "4px 10px", borderRadius: 4 }}>{data.tag}</span>
            </div>
            <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 28, color: C.text, marginBottom: 16 }}>{data.title}</h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.75 }}>{data.desc}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, borderTop: `1px solid ${C.border}`, paddingTop: 24, marginTop: 32 }}>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, display: "block" }}>CORE METRIC TRACK</span>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: C.text }}>{data.metric}</span>
            </div>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, display: "block" }}>PRIMARY TOOL</span>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: C.text }}>{data.tool}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const tools = ["💻 Figma / FigJam", "⚡ Claude / Gemini", "🎨 Framer / Wix", "📈 HTML / CSS"];
  const books = [
    { title: "The Design of Everyday Things", status: "Completed" },
    { title: "Designing with Data", status: "Active Reading" },
  ];

  return (
    <div style={{ paddingTop: 112, padding: "112px 64px 64px", maxWidth: 1440, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 48, alignItems: "start" }}>
        <div>
          <span style={tagStyle(C.accent)}>● ABOUT STORY</span>
          <h1 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 64, color: C.text, margin: "8px 0 32px" }}>Personal Dossier</h1>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48 }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: C.muted, lineHeight: 1.75 }}>I am a systems-thinking UX designer specializing in complex digital architectures. I thrive when balancing strict technical data parameters with intuitive user behaviors.</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: C.muted, lineHeight: 1.75 }}>Over the last five years, I&apos;ve designed AR field applications, AI thermal carbon dashboards, and unified commerce systems that secure operational objectives for companies.</p>
          </div>

          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 32 }}>
            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 18, color: C.text, marginBottom: 16 }}>Core Principles</h3>
            {[
              { label: "01 // Focus on functional heuristics", open: open1, toggle: () => setOpen1(!open1), body: "Usability always wins. Aesthetic selections must support operational decision-making first. Colors, typography scales, and shadows are deployed strictly as visual hierarchy aids." },
              { label: "02 // Design systems first", open: open2, toggle: () => setOpen2(!open2), body: "I don't design isolated view screens. I build robust libraries of modular variants and spacing specifications, ensuring engineers can quickly build aligned product features." },
            ].map((a, i) => (
              <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", background: C.secondary, marginBottom: 12 }}>
                <button
                  onClick={a.toggle}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, textAlign: "left", background: "none", border: "none", cursor: "pointer" }}
                >
                  <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 14, color: C.text }}>{a.label}</span>
                  <span style={{ color: C.muted, transition: "transform 0.2s", display: "inline-block", transform: a.open ? "rotate(180deg)" : "none" }}>▼</span>
                </button>
                {a.open && (
                  <div style={{ padding: 16, borderTop: `1px solid ${C.border}`, fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.7, background: `${C.bg}4d` }}>{a.body}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24 }}>
            <span style={tagStyle(C.muted)}>● TECHNICAL TOOLS</span>
            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 18, color: C.text, margin: "4px 0 16px" }}>Toolbox Matrix</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {tools.map((t) => (
                <div key={t} style={{ padding: 12, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.text, display: "flex", alignItems: "center", gap: 8 }}>{t}</div>
              ))}
            </div>
          </div>

          <div style={{ background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24 }}>
            <span style={tagStyle(C.muted)}>● ACTIVE LITERARY LENS</span>
            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 18, color: C.text, margin: "4px 0 16px" }}>Current Catalog</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none", padding: 0, margin: 0 }}>
              {books.map((b, i) => (
                <li key={i} style={{ display: "flex", justifyContent: "space-between", borderBottom: i < books.length - 1 ? `1px solid ${C.border}` : "none", paddingBottom: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.text }}>{b.title}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.accent }}>{b.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage({ onToast }: { onToast: (msg: string) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const slots = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM", "07:30 PM"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onToast("System configurations delivered to queue.");
  };

  return (
    <div style={{ paddingTop: 112, padding: "112px 64px 64px", maxWidth: 1440, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 48, alignItems: "start" }}>
        {/* Form */}
        <div style={{ background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 28, padding: 32 }}>
          <span style={tagStyle(C.accent)}>● CONTACT BRIDGE</span>
          <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 40, color: C.text, margin: "8px 0 24px" }}>Get in Touch</h2>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {[{ id: "name", label: "FULL NAME *", type: "text" }, { id: "email", label: "EMAIL ADDRESS *", type: "email" }].map((f) => (
                  <div key={f.id}>
                    <label style={{ display: "block", ...tagStyle(C.muted), fontSize: 10, marginBottom: 8 }}>{f.label}</label>
                    <input required type={f.type} style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 16px", fontFamily: "Inter, sans-serif", fontSize: 14, color: C.text, outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ display: "block", ...tagStyle(C.muted), fontSize: 10, marginBottom: 8 }}>PROJECT FOCUS</label>
                <select style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 16px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 14, color: C.text, outline: "none" }}>
                  <option>SaaS Dashboard System</option>
                  <option>AI Workflow Tooling</option>
                  <option>Spatial AR Application</option>
                  <option>Design Strategy Consulting</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", ...tagStyle(C.muted), fontSize: 10, marginBottom: 8 }}>MESSAGE BRIEF *</label>
                <textarea required rows={5} style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 16px", fontFamily: "Inter, sans-serif", fontSize: 14, color: C.text, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
              <button
                type="submit"
                style={{ width: "100%", padding: 16, background: C.text, color: C.secondary, borderRadius: 12, fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.accent; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.text; }}
              >
                Transmit System Inquiry →
              </button>
            </form>
          ) : (
            <div style={{ textAlign: "center", padding: "48px 0", display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
              <div style={{ width: 64, height: 64, background: `${C.accentSec}1a`, color: C.accentSec, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700 }}>✓</div>
              <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 28, color: C.text, margin: 0 }}>Inquiry Transmitted</h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.muted, maxWidth: 400, lineHeight: 1.7, margin: 0 }}>I've received your configuration details. Expect a professional design systems response within 24 operational hours.</p>
              <button onClick={() => setSubmitted(false)} style={{ padding: "8px 24px", border: `1px solid ${C.border}`, borderRadius: 999, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.text, background: "none", cursor: "pointer" }}>Submit New Ticket</button>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 28, padding: 24 }}>
            <span style={tagStyle(C.muted)}>● MEETING SCHEDULER</span>
            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 18, color: C.text, margin: "4px 0 16px" }}>Select Configuration Slot</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {slots.map((s) => (
                <button
                  key={s}
                  onClick={() => { setSelectedSlot(s); onToast(`Session slot reserved: ${s}`); }}
                  style={{
                    padding: 12,
                    background: selectedSlot === s ? C.accent : C.bg,
                    border: `1px solid ${selectedSlot === s ? C.accent : C.border}`,
                    borderRadius: 12,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: selectedSlot === s ? C.secondary : C.text,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, marginTop: 16, lineHeight: 1.6 }}>All calls are hosted on Google Meet. Selecting a slot locks your priority reservation parameter.</p>
          </div>

          <div style={{ background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 28, padding: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.text, display: "flex", flexDirection: "column", gap: 12 }}>
            {[{ label: "LATITUDE", value: "28.5355° N" }, { label: "LONGITUDE", value: "77.3910° E" }].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.border}`, paddingBottom: 8 }}>
                <span style={{ color: C.muted }}>{r.label}</span>
                <span>{r.value}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: C.muted }}>PULSE STATUS</span>
              <span style={{ color: C.accentSec, fontWeight: 700, animation: "pulse 1.5s infinite" }}>● ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CASE STUDY OVERLAY ───────────────────────────────────────────────────────
function KlimaShiftCase() {
  const [sliderVal, setSliderVal] = useState(50);
  const [activePhase, setActivePhase] = useState<"before" | "after">("before");
  const [peakGroup, setPeakGroup] = useState<Record<string, number>>({ "Deep Fryer A": 0, "Microwave": 1, "Chiller Unit": 2, "Oven B": 1, "HVAC-1": 0 });
  const efficiency = (50 + sliderVal * 0.45).toFixed(1);
  const carbon = Math.round(150 + sliderVal * 4.2);
  const status = sliderVal > 80 ? "Overloaded Risk" : sliderVal < 30 ? "Underperforming" : "Balanced";
  const statusColor = sliderVal > 80 ? C.accent : sliderVal < 30 ? "#d97706" : C.accentSec;

  const sidebarMeta = [
    ["ROLE", "Lead UX Designer & Systems Architect"],
    ["COMPANY", "KlimaShift (Full-time)"],
    ["TIMELINE", "Sep 2023 — Present · Gurugram"],
    ["BACKED BY", "Schneider Electric & Shell Petroleum"],
    ["TEAM", "CEO, CTO, 4 Engineers, 2 Data Scientists"],
    ["PLATFORM", "Enterprise SaaS · Web + Mobile"],
  ];

  const impactMetrics = [
    { value: "₹2,03,786", label: "Total Cost Savings", color: C.accentSec },
    { value: "26 t", label: "CO₂e Carbon Saved", color: "#6366f1" },
    { value: "40%", label: "HVAC Drift Errors Reduced", color: C.accent },
    { value: "0.98", label: "Ideal Power Factor Achieved", color: "#0ea5e9" },
  ];

  const painPoints = [
    { icon: "📊", title: "Anomalous Consumption", desc: "Portfolio-wide opacity hid energy leaks. Sites like Hauz Khas showed highest peak demand with no diagnostic path." },
    { icon: "🔧", title: "Reactive Maintenance", desc: "Freezer failures discovered only after stock compromise — no predictive telemetry to intercept before damage." },
    { icon: "⚡", title: "Operational Inefficiencies", desc: "Phase imbalances and low power factor triggered financial penalties and increased total cost of ownership." },
  ];

  const aiInsights = [
    { rank: "01", site: "Hauz Khas", issue: "Highest Energy & Peak Demand", action: "Prioritize energy audit — investigate high consumption and peak load drivers.", severity: C.accent },
    { rank: "02", site: "Saket", issue: "Highest Energy Consumption", action: "Review HVAC/Operational systems for energy optimization opportunities.", severity: "#f59e0b" },
    { rank: "03", site: "Ghitorni", issue: "Lower Power Factor", action: "Investigate reactive loads — consider power factor correction measures.", severity: "#8b5cf6" },
    { rank: "04", site: "Janakpuri", issue: "Anomalous Consumption", action: "Review data accuracy and investigate potential metering or operational leaks.", severity: "#0ea5e9" },
    { rank: "05", site: "Best Performer", issue: "Efficiency Benchmark", action: "Replicate this site's settings across portfolio as the reference architecture.", severity: C.accentSec },
  ];

  const iaNodes = [
    { label: "Home", sub: "Portfolio Command", children: ["Total Buildings", "Total Assets", "Unresolved Tickets", "Top Alerts"] },
    { label: "Buildings", sub: "Geographic Hierarchy", children: ["Map View", "Building Info", "Controller Status", "Scheduling"] },
    { label: "Assets", sub: "Appliance Intelligence", children: ["Scatter Plot", "Asset Details", "Alert History", "TCO Tracking"] },
    { label: "Avrio Advisor", sub: "AI Diagnostics", children: ["Building Summary", "Hardware Analysis", "Bill Analysis", "AI Insights"] },
    { label: "Avrio Tools", sub: "Optimization Engine", children: ["Phase Balance", "Peak Load", "Comparative", "Scheduling"] },
    { label: "Savings", sub: "Financial ROI", children: ["Cost Savings", "Carbon Offset", "APFC Savings", "Drill-Down"] },
    { label: "Maintenance", sub: "Operational Loop", children: ["Ticket Triage", "Priority Badges", "Expense Tracking", "CSV Export"] },
  ];

  const phaseDistBefore = [
    { phase: "Phase A", pct: 45, kw: 12.4 },
    { phase: "Phase B", pct: 38, kw: 10.2 },
    { phase: "Phase C", pct: 17, kw: 4.6 },
  ];
  const phaseDistAfter = [
    { phase: "Phase A", pct: 33, kw: 9.1 },
    { phase: "Phase B", pct: 30, kw: 8.2 },
    { phase: "Phase C", pct: 37, kw: 10.2 },
  ];
  const phaseDist = activePhase === "before" ? phaseDistBefore : phaseDistAfter;

  const onboardingSteps = [
    { num: "01", title: "Add Building", icon: "🏢", desc: "Entry of foundational metadata: floor area (Sq. Ft.), brand, geographic coordinates." },
    { num: "02", title: "Add Assets", icon: "⚙️", desc: "Categorize specific appliances — Deep Fryers, HVAC units, Ovens, Chillers." },
    { num: "03", title: "Add Users", icon: "👥", desc: "Multi-user assignment with role definitions: Manager, Building Manager, Technician, Admin." },
    { num: "04", title: "Add Utility", icon: "📄", desc: "Upload historical utility bills for baseline usage analysis and consumption profiles." },
  ];

  const peakGroups = ["Group 1 · +0 min", "Group 2 · +30 min", "Group 3 · +60 min"];
  const assets = Object.keys(peakGroup);

  const tickets = [
    { id: "T001", title: "Deep Freezer Not Working", building: "Hauz Khas", priority: "High", status: "Overdue", assignee: "Rahul M.", expense: "₹200" },
    { id: "T002", title: "HVAC Phase Imbalance", building: "Saket", priority: "Medium", status: "In Progress", assignee: "Priya K.", expense: "₹150" },
    { id: "T003", title: "Overvoltage Alert — Chiller", building: "Janakpuri", priority: "High", status: "On Hold", assignee: "Amit S.", expense: "₹340" },
  ];

  const priorityColor: Record<string, string> = { High: "#ef4444", Medium: "#f59e0b", Low: "#10b981" };
  const statusBadgeColor: Record<string, string> = { Overdue: "#ef4444", "In Progress": "#0ea5e9", "On Hold": "#8b5cf6" };

  return (
    <div style={{ gridColumn: "span 12", display: "flex", flexDirection: "column", gap: 0 }}>

      {/* ── HERO BANNER ── */}
      <div style={{ background: `linear-gradient(135deg, ${C.text} 0%, #2d3436 100%)`, borderRadius: 24, padding: "48px 48px 40px", marginBottom: 48, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 300, height: 300, borderRadius: "50%", background: `${C.accent}15`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: "30%", width: 200, height: 200, borderRadius: "50%", background: `${C.accentSec}10`, pointerEvents: "none" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "start", position: "relative", zIndex: 1 }}>
          <div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accent, display: "block", marginBottom: 12 }}>CASE STUDY 01 · AI ENERGY MANAGEMENT · ENTERPRISE SAAS</span>
            <h1 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 52, color: "#ffffff", margin: "0 0 16px", lineHeight: 1.05, letterSpacing: "-0.02em" }}>KlimaShift</h1>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: "rgba(255,255,255,0.6)", maxWidth: 560, lineHeight: 1.7, margin: "0 0 32px" }}>
              Architecting an AI-driven enterprise dashboard that transforms raw IoT telemetry from multi-site food retailers into proactive, financial-grade energy intelligence — moving facilities from reactive firefighting to intelligent optimization.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["Enterprise SaaS", "AI/ML Integration", "IoT Telemetry", "Multi-site Operations", "Energy Management"].map((tag) => (
                <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.08)", padding: "4px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)" }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, minWidth: 320 }}>
            {impactMetrics.map((m) => (
              <div key={m.label} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "20px 16px", textAlign: "center" }}>
                <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 28, color: m.color, display: "block", lineHeight: 1 }}>{m.value}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", display: "block", marginTop: 6, letterSpacing: "0.08em" }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── META + ROLE TABLE ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 1, background: C.border, borderRadius: 16, overflow: "hidden", marginBottom: 64 }}>
        {sidebarMeta.map(([label, value]) => (
          <div key={label} style={{ background: C.secondary, padding: "20px 20px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>{label}</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: C.text, lineHeight: 1.4 }}>{value}</span>
          </div>
        ))}
      </div>

      {/* ── SECTION 01: PROBLEM ── */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.accent, background: `${C.accent}15`, padding: "4px 12px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.1em" }}>01 · Problem Statement</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 36, color: C.text, margin: "0 0 12px" }}>The Visibility Gap in Multi-Site Energy Operations</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: C.muted, maxWidth: 780, lineHeight: 1.8, margin: "0 0 32px" }}>
          Multi-site food retailers managing 4–10 branches operate in a persistent "visibility gap." Facility managers rely on monthly utility bills and anecdotal reports from on-site staff, discovering equipment failures and energy leaks only after significant financial damage. The absence of asset-level telemetry creates systemic operational drift.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {painPoints.map((p) => (
            <div key={p.title} style={{ background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, borderLeft: `4px solid ${C.accent}` }}>
              <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{p.icon}</span>
              <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 16, color: C.text, margin: "0 0 8px" }}>{p.title}</h4>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 02: IA ARCHITECTURE ── */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.accent, background: `${C.accent}15`, padding: "4px 12px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.1em" }}>02 · Information Architecture</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 36, color: C.text, margin: "0 0 12px" }}>Single Source of Truth — Navigation Model</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.muted, maxWidth: 700, lineHeight: 1.8, margin: "0 0 32px" }}>
          The persistent sidebar navigation creates a deliberate progression from high-level "Monitoring" to granular "Execution" — engineered to mitigate alarm fatigue through a structured data hierarchy.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
          {iaNodes.map((node, i) => (
            <div key={node.label} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <div style={{ background: i < 2 ? C.text : i < 4 ? `${C.accent}15` : i < 6 ? `${C.accentSec}15` : C.surface, border: `1px solid ${i < 2 ? C.text : C.border}`, borderRadius: "12px 12px 0 0", padding: "14px 12px" }}>
                <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 12, color: i < 2 ? "#fff" : C.text, display: "block" }}>{node.label}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: i < 2 ? "rgba(255,255,255,0.5)" : C.muted, display: "block", marginTop: 4 }}>{node.sub}</span>
              </div>
              <div style={{ background: C.secondary, border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: "12px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
                {node.children.map((c) => (
                  <span key={c} style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: C.muted, lineHeight: 1.4 }}>· {c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
          {[{ label: "Monitoring Layer", color: C.text }, { label: "AI Insight Layer", color: C.accent }, { label: "ROI Layer", color: C.accentSec }, { label: "Operational Layer", color: C.muted }].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color, display: "inline-block" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 03: ONBOARDING FLOW ── */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.accent, background: `${C.accent}15`, padding: "4px 12px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.1em" }}>03 · Onboarding Workflow</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 36, color: C.text, margin: "0 0 12px" }}>4-Stage Linear Setup Wizard</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.muted, maxWidth: 700, lineHeight: 1.8, margin: "0 0 32px" }}>
          A deliberate wizard pattern ensures standardized data baseline for each new site before it enters the live monitoring loop. "Skip" and "Next" controls allow asynchronous data entry while maintaining logical progression.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, position: "relative" }}>
          <div style={{ position: "absolute", top: 32, left: "12.5%", right: "12.5%", height: 2, background: `linear-gradient(to right, ${C.accent}, ${C.accentSec})`, zIndex: 0 }} />
          {onboardingSteps.map((s, i) => (
            <div key={s.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 16px", position: "relative", zIndex: 1 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${C.accent}, ${C.accentSec})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16, boxShadow: `0 4px 16px ${C.accent}30` }}>{s.icon}</div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: 6 }}>Stage {s.num}</span>
              <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 15, color: C.text, margin: "0 0 8px" }}>{s.title}</h4>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 04: AVRIO ADVISOR AI ── */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.accent, background: `${C.accent}15`, padding: "4px 12px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.1em" }}>04 · Avrio Advisor AI Engine</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 40, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 32, color: C.text, margin: "0 0 16px" }}>AI-Ranked Building Diagnostics</h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.8, margin: "0 0 24px" }}>
              Instead of raw data tables, the "Building Wise Summary" reduces cognitive load by ranking locations based on issue severity and providing automated optimization paths with specific, actionable language.
            </p>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 12 }}>ALERT COLOR TAXONOMY</span>
              {[
                { color: "#ef4444", label: "Red", type: "Overvoltage / High Temperature" },
                { color: "#3b82f6", label: "Blue", type: "Undervoltage / Low Temperature" },
                { color: "#8b5cf6", label: "Purple", type: "Inrush Current Anomaly" },
                { color: "#10b981", label: "Green", type: "Earth Leakage Detected" },
              ].map((a) => (
                <div key={a.color} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: a.color, display: "inline-block", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: a.color, fontWeight: 700 }}>{a.label}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.muted }}>— {a.type}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
              <div style={{ background: C.surface, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 11, color: C.text, textTransform: "uppercase" }}>🤖 Avrio Advisor — Building Wise Summary</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.accentSec, background: `${C.accentSec}15`, padding: "2px 8px", borderRadius: 999, fontWeight: 700 }}>● AI ACTIVE</span>
              </div>
              {aiInsights.map((ai, i) => (
                <div key={ai.rank} style={{ padding: "14px 16px", borderBottom: i < aiInsights.length - 1 ? `1px solid ${C.border}` : "none", display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, alignItems: "start" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 900, fontSize: 18, color: ai.severity, lineHeight: 1 }}>#{ai.rank}</span>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 13, color: C.text }}>{ai.site}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: ai.severity, background: `${ai.severity}15`, padding: "1px 6px", borderRadius: 4, fontWeight: 700, textTransform: "uppercase" }}>{ai.issue}</span>
                    </div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted, margin: 0, lineHeight: 1.5 }}>→ {ai.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 05: TELEMETRY SANDBOX ── */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.accent, background: `${C.accent}15`, padding: "4px 12px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.1em" }}>05 · Asset-Level Telemetry · Interactive</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "6fr 6fr", gap: 24 }}>
          {/* Asset telemetry sandbox */}
          <div>
            <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 28, color: C.text, margin: "0 0 8px" }}>Real-Time HVAC Calibration</h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.7, margin: "0 0 20px" }}>
              Asset views track technical specs alongside live environmental data. Try adjusting the compressor load — the system provides immediate status feedback to prevent drift errors.
            </p>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}`, paddingBottom: 12, marginBottom: 20 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 12, color: C.text, textTransform: "uppercase" }}>⚡ HVAC-1 · Hauz Khas Branch</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: statusColor, background: `${statusColor}15`, padding: "3px 10px", borderRadius: 999, textTransform: "uppercase" }}>● {status}</span>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, marginBottom: 8 }}>
                  <span style={{ color: C.muted }}>Compressor Load</span>
                  <span style={{ color: C.text, fontWeight: 700 }}>{sliderVal}% Output</span>
                </div>
                <input type="range" min={10} max={100} value={sliderVal} onChange={(e) => setSliderVal(parseInt(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, marginTop: 4 }}>
                  <span>10% Idle</span><span>50% Optimal</span><span>100% Max Load</span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                {[
                  { label: "THERMAL EFFICIENCY", value: `${efficiency}%`, color: C.text, icon: "🌡️" },
                  { label: "CARBON OUTPUT CO₂", value: `${carbon} kg/hr`, color: C.accent, icon: "💨" },
                  { label: "CURRENT TEMP", value: "-2°C", color: "#3b82f6", icon: "❄️" },
                  { label: "ADJUSTED TARGET", value: "-4°C", color: "#8b5cf6", icon: "🎯" },
                ].map((m) => (
                  <div key={m.label} style={{ background: C.secondary, padding: 14, borderRadius: 12, border: `1px solid ${C.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 4 }}>{m.label}</span>
                      <span style={{ fontSize: 14 }}>{m.icon}</span>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 900, fontSize: 18, color: m.color }}>{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Asset Detail Card */}
          <div>
            <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 28, color: C.text, margin: "0 0 8px" }}>Asset Profile + Ticket History</h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.7, margin: "0 0 20px" }}>
              The system maintains interconnectivity — embedding Ticket History directly within the asset view so technicians see recurring issues alongside live metrics simultaneously.
            </p>
            <div style={{ background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", background: C.surface, borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 15, color: C.text, display: "block" }}>Deep Freezer — Unit 01</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted }}>Serial: DF-HK-2019-001 · 8 yrs 5 mos</span>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: "#ef4444", background: "#ef444415", padding: "3px 10px", borderRadius: 999 }}>2 ACTIVE ALERTS</span>
              </div>
              <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, borderBottom: `1px solid ${C.border}` }}>
                {[["Business Priority", "High", C.accent], ["Power Rating", "2.4 kW", C.text], ["Brand / Model", "Daikin / FZ-200", C.text], ["Warranty Status", "Active", C.accentSec]].map(([label, value, color]) => (
                  <div key={label as string}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted, textTransform: "uppercase", display: "block", marginBottom: 2 }}>{label}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: color as string }}>{value}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: 20 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 12 }}>TICKET HISTORY SUMMARY</span>
                {[{ id: "T001", title: "Unit Not Cooling", date: "14 Jun 2025", status: "Resolved" }, { id: "T002", title: "Overvoltage Alert", date: "02 Jul 2025", status: "Open" }].map((t) => (
                  <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                    <div>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.accent, fontWeight: 700, display: "block" }}>{t.id}</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.text }}>{t.title}</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.status === "Resolved" ? C.accentSec : C.accent, background: `${t.status === "Resolved" ? C.accentSec : C.accent}15`, padding: "2px 8px", borderRadius: 999, fontWeight: 700, display: "block", marginBottom: 2 }}>{t.status}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted }}>{t.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 06: AVRIO TOOLS ── */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.accent, background: `${C.accent}15`, padding: "4px 12px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.1em" }}>06 · Avrio Tools — Interactive Optimization</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "6fr 6fr", gap: 24 }}>

          {/* Phase Balance */}
          <div>
            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 22, color: C.text, margin: "0 0 8px" }}>Phase Load Balancing</h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.7, margin: "0 0 16px" }}>Before/After visualization of phase distribution. Assets are reallocated across Phase A, B, C to prevent imbalance and neutral current issues.</p>
            <div style={{ background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden" }}>
              <div style={{ display: "flex", padding: "12px 20px", borderBottom: `1px solid ${C.border}`, gap: 8 }}>
                {(["before", "after"] as const).map((v) => (
                  <button key={v} onClick={() => setActivePhase(v)} style={{ flex: 1, padding: "8px", borderRadius: 8, border: `1px solid ${activePhase === v ? C.accent : C.border}`, background: activePhase === v ? `${C.accent}15` : "transparent", color: activePhase === v ? C.accent : C.muted, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, cursor: "pointer", textTransform: "uppercase" }}>
                    {v === "before" ? "Before Rebalance" : "After Rebalance ✓"}
                  </button>
                ))}
              </div>
              <div style={{ padding: 20 }}>
                {phaseDist.map((p) => (
                  <div key={p.phase} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 600, fontSize: 13, color: C.text }}>{p.phase}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: p.pct > 40 ? C.accent : C.accentSec, fontWeight: 700 }}>{p.pct}% · {p.kw} kW</span>
                    </div>
                    <div style={{ height: 12, background: C.surface, borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${p.pct}%`, background: p.pct > 40 ? `linear-gradient(to right, ${C.accent}, #f59e0b)` : `linear-gradient(to right, ${C.accentSec}, #34d399)`, borderRadius: 999, transition: "width 0.5s ease" }} />
                    </div>
                  </div>
                ))}
                <div style={{ background: C.surface, borderRadius: 10, padding: "10px 14px", marginTop: 8 }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: activePhase === "after" ? C.accentSec : C.accent, fontWeight: 600 }}>
                    {activePhase === "after" ? "✓ Balanced distribution achieved — moving Microwave from Phase B to Phase C reduced max imbalance by 28%." : "⚠️ Phase A carrying 45% of total load — risk of neutral current overload and financial penalties."}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Peak Load Stagger */}
          <div>
            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 22, color: C.text, margin: "0 0 8px" }}>Peak Load Stagger Strategy</h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.7, margin: "0 0 16px" }}>Drag assets into staggered timing groups to flatten peak demand curves. An "Always ON" category exempts critical refrigeration units.</p>
            <div style={{ background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden" }}>
              <div style={{ padding: "12px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 11, color: C.text, textTransform: "uppercase" }}>Staggered Group Assignment</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted }}>Click to cycle group</span>
              </div>
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {assets.map((a) => (
                  <div key={a} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: C.surface, borderRadius: 10, border: `1px solid ${C.border}`, cursor: "pointer" }}
                    onClick={() => setPeakGroup((g) => ({ ...g, [a]: (g[a] + 1) % 3 }))}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: C.text }}>{a}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: [C.accent, "#f59e0b", C.accentSec][peakGroup[a]], background: `${[C.accent, "#f59e0b", C.accentSec][peakGroup[a]]}15`, padding: "4px 10px", borderRadius: 999, textTransform: "uppercase" }}>
                      {peakGroups[peakGroup[a]]}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "12px 20px", borderTop: `1px solid ${C.border}`, background: C.surface }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted }}>Staggered load distribution prevents simultaneous peak demand. "Sync Changes" commits to controller automation.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 07: MAINTENANCE TICKETS ── */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.accent, background: `${C.accent}15`, padding: "4px 12px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.1em" }}>07 · Maintenance & Ticket System</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 32, color: C.text, margin: "0 0 12px" }}>Closing the Diagnostic Loop</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.muted, maxWidth: 700, lineHeight: 1.8, margin: "0 0 24px" }}>
          The ticketing interface converts AI-flagged anomalies into manageable maintenance tasks. Priority color-coding, expense tracking, and CSV export enable cost reconciliation with accounting systems. SLA defaults: High=1 day, Medium=3 days, Low=4 days.
        </p>
        <div style={{ background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", background: C.surface, borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 11, color: C.text, textTransform: "uppercase" }}>🔧 Maintenance Ticket Queue</span>
            <div style={{ display: "flex", gap: 8 }}>
              {["All", "High", "Overdue"].map((f) => (
                <span key={f} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted, background: C.surface, padding: "3px 8px", borderRadius: 999, border: `1px solid ${C.border}` }}>{f}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: C.border }}>
            {tickets.map((t) => (
              <div key={t.id} style={{ background: C.secondary, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.accent, fontWeight: 700 }}>{t.id}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: statusBadgeColor[t.status], background: `${statusBadgeColor[t.status]}15`, padding: "2px 8px", borderRadius: 999 }}>{t.status}</span>
                </div>
                <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 14, color: C.text, margin: "0 0 8px" }}>{t.title}</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted }}>📍 {t.building}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted }}>👤 {t.assignee}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: priorityColor[t.priority], background: `${priorityColor[t.priority]}15`, padding: "2px 8px", borderRadius: 999 }}>{t.priority} Priority</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.text }}>{t.expense}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 08: SAVINGS DASHBOARD ── */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.accent, background: `${C.accent}15`, padding: "4px 12px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.1em" }}>08 · Financial ROI & Savings Dashboard</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 32, color: C.text, margin: "0 0 12px" }}>Proving ROI — Savings Analytics</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.muted, maxWidth: 700, lineHeight: 1.8, margin: "0 0 32px" }}>
          The Savings module bridges the gap between optimization actions and financial outcomes — directly aiding Klimashift in client retention and upselling by making energy ROI visible and tangible.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Total Cost Savings", value: "₹20,345", sub: "Verified against baseline bills", color: C.accentSec, bg: `${C.accentSec}10` },
            { label: "Total Carbon Saving", value: "26 t CO₂e", sub: "Annual carbon offset achieved", color: "#6366f1", bg: "#6366f110" },
            { label: "APFC Savings", value: "₹2,30,345", sub: "Power factor correction ROI", color: "#0ea5e9", bg: "#0ea5e910" },
            { label: "Ideal Power Factor", value: "0.98 PF", sub: "vs. 0.82 pre-implementation", color: C.accent, bg: `${C.accent}10` },
          ].map((m) => (
            <div key={m.label} style={{ background: m.bg, border: `1px solid ${m.color}33`, borderRadius: 20, padding: 24 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: m.color, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 8, fontWeight: 700 }}>{m.label}</span>
              <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 28, color: m.color, display: "block", lineHeight: 1 }}>{m.value}</span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.muted, display: "block", marginTop: 8 }}>{m.sub}</span>
            </div>
          ))}
        </div>
        <div style={{ background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 16, fontWeight: 700 }}>ENERGY CHARGE BREAKDOWN — HAUZ KHAS (SAMPLE)</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: C.border, borderRadius: 12, overflow: "hidden" }}>
            {[
              { label: "Energy Charge", value: "₹12,450", pct: 61, color: C.accent },
              { label: "Fixed Charge", value: "₹4,200", pct: 21, color: "#8b5cf6" },
              { label: "Time-of-Day (ToD)", value: "₹3,695", pct: 18, color: "#0ea5e9" },
            ].map((row) => (
              <div key={row.label} style={{ background: C.secondary, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: C.text }}>{row.label}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 13, color: row.color }}>{row.value}</span>
                </div>
                <div style={{ height: 6, background: C.surface, borderRadius: 999 }}>
                  <div style={{ height: "100%", width: `${row.pct}%`, background: row.color, borderRadius: 999 }} />
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted, display: "block", marginTop: 6 }}>{row.pct}% of total bill</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 09: KEY LEARNINGS ── */}
      <div style={{ background: `linear-gradient(135deg, ${C.text} 0%, #2d3436 100%)`, borderRadius: 24, padding: "40px 48px" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "0.15em", display: "block", marginBottom: 16 }}>09 · Key Learnings & Design Principles</span>
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 32, color: "#ffffff", margin: "0 0 32px" }}>Trust Over Absolute Automation</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { icon: "🎯", title: "Experts Need Visible Control", desc: "Domain specialists don't want automation that hides details. They need clear control over system rules and transparent feedback on every automated decision." },
            { icon: "📊", title: "Hierarchy Mitigates Alarm Fatigue", desc: "A structured data hierarchy — portfolio → building → asset → sensor — prevents cognitive overload. Users navigate 'down' only when context requires it." },
            { icon: "💡", title: "ROI Visibility Drives Adoption", desc: "Connecting optimization actions (Peak Load Stagger) directly to financial outcomes (ToD savings) transformed the app from passive monitoring to active management." },
          ].map((l) => (
            <div key={l.title} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 24 }}>
              <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{l.icon}</span>
              <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 15, color: "#ffffff", margin: "0 0 8px" }}>{l.title}</h4>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{l.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AutoremovCase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const [activePhase, setActivePhase] = useState(0);
  const [activeDecision, setActiveDecision] = useState(0);

  const onDrag = useCallback((clientX: number) => {
    const container = containerRef.current;
    const handle = handleRef.current;
    const layer = layerRef.current;
    if (!container || !handle || !layer) return;
    const rect = container.getBoundingClientRect();
    let ratio = (clientX - rect.left) / rect.width;
    ratio = Math.max(0, Math.min(1, ratio));
    handle.style.left = `${ratio * 100}%`;
    layer.style.width = `${ratio * 100}%`;
  }, []);

  useEffect(() => {
    const onUp = () => { activeRef.current = false; };
    const onMove = (e: MouseEvent) => { if (activeRef.current) onDrag(e.clientX); };
    const onTouchMove = (e: TouchEvent) => { if (activeRef.current) onDrag(e.touches[0].clientX); };
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchend", onUp);
    window.addEventListener("touchmove", onTouchMove);
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [onDrag]);

  // Brand palette for Autoremov — electric blue / neon purple
  const AB = { blue: "#3B82F6", purple: "#8B5CF6", cyan: "#06B6D4", darkBg: "#0F172A", darkCard: "#1E293B" };

  const div = (num: string, label: string, color = AB.blue) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color, background: `${color}15`, padding: "4px 12px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>{num} · {label}</span>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );

  const phases = [
    { week: "Wk 1–2", label: "Discover", color: AB.blue, items: ["Stakeholder kickoff — brand positioning, target users, revenue model", "Competitive audit — Remove.bg, Clipping Magic, Canva, Slazzer", "User persona mapping across 7 audience segments", "Information architecture — site map, user flows, page priority matrix"] },
    { week: "Wk 2–3", label: "Define", color: AB.purple, items: ["Design principles — Instant, Precise, Scalable, Segment-aware", "Content strategy — SEO keyword mapping per page and segment", "Component inventory — shared vs. unique per page", "Pricing model UX logic — subscription + top-up mental model"] },
    { week: "Wk 3–6", label: "Design", color: AB.cyan, items: ["Design system — colour tokens, spacing scale, type ramp, icon set", "High-fidelity Figma frames — all 25+ pages, dark + light mode", "Interaction design — editor states, comparison slider, batch flow", "Bento mosaic image layout — editorial alternative to standard grids"] },
    { week: "Wk 6–8", label: "Develop", color: "#10b981", items: ["React + TypeScript implementation — component-by-component", "Tailwind CSS design tokens wired to CSS custom properties", "Framer Motion animation system — scroll-triggered, staggered, page transitions", "Functional editor — file upload, processing simulation, batch tiles, ZIP download"] },
  ];

  const problems = [
    { icon: "🌐", title: "No Web Presence", color: AB.blue, desc: "Autoremov had a working AI product but zero marketing site. Zero pages, zero brand, zero way to communicate value to any buyer persona." },
    { icon: "💰", title: "Complex Dual Pricing Model", color: AB.purple, desc: "Monthly subscription credits AND one-time top-up packs. Most SaaS pricing pages can't handle this cleanly — the UX had to make both intuitive side-by-side." },
    { icon: "👥", title: "7 Very Different Audiences", color: AB.cyan, desc: "E-commerce, photographers, designers, social media, marketing teams, press rooms, institutions — each with entirely different jobs-to-be-done." },
    { icon: "⚡", title: "Bulk Editor UX Challenge", color: "#f59e0b", desc: "Power users process hundreds of images at once. The editor needed single images, multi-select batches, per-image download, and ZIP export — without overwhelming beginners." },
  ];

  const colorTokens = [
    { token: "--electric-blue", hex: "#3B82F6", role: "Primary interactive, CTAs, links" },
    { token: "--neon-purple", hex: "#8B5CF6", role: "Gradient partner, accents" },
    { token: "--cyan-glow", hex: "#06B6D4", role: "Tertiary highlight, API page" },
    { token: "--dark-bg", hex: "#0F172A", role: "Dark mode page background" },
    { token: "--rich-dark", hex: "#1E293B", role: "Dark mode card surface" },
  ];

  const deliverables = [
    { icon: "🎨", title: "Design System", desc: "50+ components, 12 colour tokens, 8 spacing steps, 2 theme modes (dark/light)" },
    { icon: "🏠", title: "Landing Page", desc: "8 sections — hero, features, use cases, pricing toggle, API, gallery, testimonials" },
    { icon: "✂️", title: "Product Editor", desc: "Multi-image batch processing, ZIP download, comparison slider, dark/light mode" },
    { icon: "👤", title: "7 Use Case Pages", desc: "E-commerce, Designers, Photographers, Social Media, Marketing, Press, ID Photos" },
    { icon: "💳", title: "Full Pricing System", desc: "Subscription plans, credit top-up store, interactive cost calculator, plan comparison" },
    { icon: "📄", title: "12 Supporting Pages", desc: "About, API docs, Gallery, Blog, Help, Integrations, Contact, Auth, Dashboard, Settings" },
  ];

  const decisions = [
    {
      id: "D.01", title: "Editorial bento mosaic over a photo grid", color: AB.blue,
      problem: "Standard 3-column photo grids look like stock photo libraries. They don't communicate the value of the product or tell a story about the user.",
      solution: "Two-row asymmetric CSS grid — 7+5 columns row 1, 3+6+3 on row 2 — with stats and captions embedded directly on images as overlays. Each image is a different aspect ratio so nothing aligns predictably.",
      outcome: "Pages feel editorial and curated rather than templated. Layout changes across use cases because column spans adapt to the gradient.",
    },
    {
      id: "D.02", title: "Subscription + top-up in one unified pricing UI", color: AB.purple,
      problem: "Showing subscription tiers and credit packs on separate pages forced users to make a model choice before they understood the product — killing conversions.",
      solution: "A single pricing page with a tab toggle between 'Subscribe' and 'Buy Credits'. An interactive credit cost calculator sits below both, answering 'which model is right for me?' without copywriting.",
      outcome: "Users could compare both models in one view. The calculator became the highest-leverage UI element, handling the most common pre-purchase objection automatically.",
    },
    {
      id: "D.03", title: "Horizontal tile strip for batch editor workflow", color: AB.cyan,
      problem: "Traditional batch UX either shows a full image grid (overwhelming) or a list (loses visual context). Power users need to see file status at a glance without losing the canvas.",
      solution: "A persistent horizontal thumbnail strip pinned to the bottom of the editor. Each tile shows processing status (✓ done, ⏳ processing), file name, and a per-image download. Download ZIP anchored to the strip.",
      outcome: "Users could manage 10–50 images without ever leaving the main canvas view. The strip made batch feel lightweight rather than industrial.",
    },
    {
      id: "D.04", title: "Audience-first use case page architecture", color: "#f59e0b",
      problem: "A generic features page would fail to convert any of the 7 audience segments — E-commerce sellers and photographers have completely different purchase triggers.",
      solution: "Built a single data-driven use case page template that renders differently based on segment: different headline, imagery (via Unsplash API), feature emphasis, and CTA copy. 7 pages, 1 component.",
      outcome: "Consistent quality across all 7 segments without 7× the design work. SEO keyword mapping per segment drove organic traffic to the right page for each audience.",
    },
  ];

  const outcomes = [
    { value: "25+", label: "Pages Designed & Built", color: AB.blue },
    { value: "7", label: "Audience Segment Pages", color: AB.purple },
    { value: "50+", label: "Design System Components", color: AB.cyan },
    { value: "8wk", label: "End-to-End Delivery", color: "#10b981" },
    { value: "100+", label: "ID Format Presets", color: "#f59e0b" },
    { value: "2", label: "Theme Modes (Dark/Light)", color: "#ec4899" },
  ];

  const stack = [
    { name: "Figma", role: "High-fidelity design, design system, prototyping", color: AB.purple },
    { name: "React 18", role: "Component architecture, routing, state management", color: AB.blue },
    { name: "TypeScript", role: "Type-safe props, data models, route params", color: AB.cyan },
    { name: "Tailwind CSS", role: "Design token mapping, responsive utilities", color: "#0ea5e9" },
    { name: "Framer Motion", role: "Scroll animations, page transitions, AnimatePresence", color: "#ec4899" },
    { name: "Unsplash API", role: "Contextual photography for all 7 use case categories", color: "#10b981" },
  ];

  return (
    <div style={{ gridColumn: "span 12", display: "flex", flexDirection: "column", gap: 0 }}>

      {/* ── HERO BANNER ── */}
      <div style={{ background: `linear-gradient(135deg, ${AB.darkBg} 0%, #1a1f35 50%, #0f1629 100%)`, borderRadius: 24, padding: "48px 48px 40px", marginBottom: 48, position: "relative", overflow: "hidden" }}>
        {/* Decorative orbs */}
        <div style={{ position: "absolute", top: -80, right: -60, width: 360, height: 360, borderRadius: "50%", background: `${AB.blue}18`, filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: "20%", width: 280, height: 280, borderRadius: "50%", background: `${AB.purple}14`, filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "start", marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: AB.blue, background: `${AB.blue}20`, padding: "3px 10px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.12em" }}>CASE STUDY 02</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: AB.purple, background: `${AB.purple}20`, padding: "3px 10px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.12em" }}>AI SAAS · FULL-STACK DESIGN & DEV</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: AB.cyan, background: `${AB.cyan}20`, padding: "3px 10px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.12em" }}>FREELANCE 2024</span>
              </div>
              <h1 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 56, color: "#ffffff", margin: "0 0 16px", lineHeight: 1.02, letterSpacing: "-0.02em" }}>
                Autoremov
              </h1>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: "rgba(255,255,255,0.55)", maxWidth: 580, lineHeight: 1.8, margin: "0 0 28px" }}>
                Designing and building the complete web presence for an AI-powered background removal SaaS — from zero to 25+ pages across 7 audience segments, a full design system, functional product editor, and dual-model pricing UX — all in 8 weeks.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["AI SaaS", "Full-Stack UX", "Design System", "7-Segment Architecture", "React + TypeScript", "Dark / Light Mode"].map((tag) => (
                  <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.07)", padding: "4px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)" }}>{tag}</span>
                ))}
              </div>
            </div>
            {/* Outcome metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, minWidth: 360 }}>
              {outcomes.map((m) => (
                <div key={m.label} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "16px 12px", textAlign: "center" }}>
                  <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 26, color: m.color, display: "block", lineHeight: 1 }}>{m.value}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", display: "block", marginTop: 6, letterSpacing: "0.08em", lineHeight: 1.4 }}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Competitor audit strip */}
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px 24px", display: "flex", alignItems: "center", gap: 24 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap", fontWeight: 700 }}>Competitive Audit:</span>
            {["Remove.bg", "Clipping Magic", "Canva", "Slazzer", "PhotoRoom"].map((c) => (
              <span key={c} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── META TABLE ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 1, background: C.border, borderRadius: 16, overflow: "hidden", marginBottom: 64 }}>
        {[["ROLE", "Freelance UX/UI Designer & Frontend Developer"], ["CLIENT", "Autoremov · AI Background Removal SaaS"], ["TIMELINE", "8 Weeks · Full Project Delivery"], ["SCOPE", "End-to-End Design · Design System · 25+ Pages"], ["TOOLS", "Figma · React · TypeScript · Tailwind · Framer Motion"], ["YEAR", "2024 · Freelance Engagement"]].map(([label, value]) => (
          <div key={label} style={{ background: C.secondary, padding: "18px 18px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 5 }}>{label}</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 12, color: C.text, lineHeight: 1.4 }}>{value}</span>
          </div>
        ))}
      </div>

      {/* ── SECTION 01: FOUR CORE PROBLEMS ── */}
      <div style={{ marginBottom: 64 }}>
        {div("01", "Four Core Problems", AB.blue)}
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 36, color: C.text, margin: "0 0 12px" }}>Each Problem Demanded a Separate Design Solution</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.muted, maxWidth: 700, lineHeight: 1.85, margin: "0 0 32px" }}>The brief surfaced distinct UX challenges that a generic template approach would have failed entirely. Every problem required its own design architecture, not a shared skin.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {problems.map((p) => (
            <div key={p.title} style={{ background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, borderTop: `3px solid ${p.color}` }}>
              <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{p.icon}</span>
              <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 15, color: C.text, margin: "0 0 8px" }}>{p.title}</h4>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 02: 4-PHASE PROCESS ── */}
      <div style={{ marginBottom: 64 }}>
        {div("02", "8-Week Design Process — 4 Phases", AB.purple)}
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 36, color: C.text, margin: "0 0 12px" }}>One Designer. Full Stack. Zero Compromise.</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.muted, maxWidth: 700, lineHeight: 1.85, margin: "0 0 32px" }}>Eight weeks. Four phases. Handling UX research, IA, visual design, design system creation, and React/TypeScript implementation end-to-end.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
          {phases.map((ph, i) => (
            <button key={ph.label} onClick={() => setActivePhase(i)} style={{ background: activePhase === i ? `${ph.color}12` : C.secondary, border: `2px solid ${activePhase === i ? ph.color : C.border}`, borderRadius: 16, padding: 18, textAlign: "left", cursor: "pointer", transition: "all 0.2s" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: ph.color, background: `${ph.color}20`, padding: "2px 8px", borderRadius: 4, textTransform: "uppercase", display: "inline-block", marginBottom: 10 }}>{ph.week}</span>
              <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 18, color: activePhase === i ? ph.color : C.text, margin: 0 }}>{ph.label}</h4>
            </button>
          ))}
        </div>
        <div style={{ background: `${phases[activePhase].color}08`, border: `1px solid ${phases[activePhase].color}33`, borderRadius: 20, padding: 28, transition: "all 0.25s" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {phases[activePhase].items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", background: phases[activePhase].color, color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.text, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 03: DESIGN SYSTEM ── */}
      <div style={{ marginBottom: 64 }}>
        {div("03", "Design System — Built Before Any Page", AB.cyan)}
        <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 40, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 32, color: C.text, margin: "0 0 12px" }}>The Foundation Everything Inherits From</h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.85, margin: "0 0 24px" }}>50+ components, 12 colour tokens, 8 spacing steps, 2 theme modes. Lock the system first — then build the pages.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {colorTokens.map((tok) => (
                <div key={tok.token} style={{ display: "flex", alignItems: "center", gap: 12, background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 16px" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: tok.hex, flexShrink: 0, boxShadow: `0 0 12px ${tok.hex}60` }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.text, display: "block" }}>{tok.token}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.muted }}>{tok.role}</span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted }}>{tok.hex}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ background: AB.darkBg, borderRadius: 20, padding: 28, marginBottom: 16 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: 16, fontWeight: 700 }}>TYPE RAMP</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Display", text: "Autoremov", size: 40, weight: 900, color: "#fff" },
                  { label: "Heading 1", text: "Remove Background", size: 28, weight: 800, color: "#e2e8f0" },
                  { label: "Heading 2", text: "AI-Powered Cutouts", size: 20, weight: 700, color: "#cbd5e1" },
                  { label: "Body", text: "Process thousands of images in seconds", size: 15, weight: 400, color: "#94a3b8" },
                  { label: "Label / Mono", text: "UPLOAD · PROCESS · EXPORT", size: 11, weight: 700, color: AB.blue, mono: true },
                ].map((t) => (
                  <div key={t.label} style={{ display: "flex", alignItems: "baseline", gap: 16, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", width: 70, flexShrink: 0, textTransform: "uppercase" }}>{t.label}</span>
                    <span style={{ fontFamily: t.mono ? "'JetBrains Mono', monospace" : "'Inter Tight', sans-serif", fontSize: t.size, fontWeight: t.weight, color: t.color, letterSpacing: t.mono ? "0.1em" : 0 }}>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[{ val: "50+", lab: "Components" }, { val: "12", lab: "Colour tokens" }, { val: "8", lab: "Spacing steps" }, { val: "2", lab: "Theme modes" }].map((s) => (
                <div key={s.lab} style={{ background: `${AB.blue}10`, border: `1px solid ${AB.blue}30`, borderRadius: 14, padding: "16px 12px", textAlign: "center" }}>
                  <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 26, color: AB.blue, display: "block" }}>{s.val}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted, textTransform: "uppercase", display: "block", marginTop: 4 }}>{s.lab}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 04: DELIVERABLES ── */}
      <div style={{ marginBottom: 64 }}>
        {div("04", "Complete Deliverables — 25+ Pages", AB.blue)}
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 36, color: C.text, margin: "0 0 28px" }}>From Zero to Full Product Web Presence</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {deliverables.map((d) => (
            <div key={d.title} style={{ background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 18, padding: 22, display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{d.icon}</span>
              <div>
                <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 15, color: C.text, margin: "0 0 6px" }}>{d.title}</h4>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.6, margin: 0 }}>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 05: LIVE SCREENS GALLERY ── */}
      <div style={{ marginBottom: 64 }}>
        {div("05", "Live Screens — Actual Delivered Product", AB.purple)}
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 36, color: C.text, margin: "0 0 12px" }}>The Final Product — Shipped & Live</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.muted, maxWidth: 700, lineHeight: 1.85, margin: "0 0 40px" }}>Every screen was designed to solve a specific problem for a specific user. Dark/light mode responsive throughout. These are the actual delivered pages.</p>

        {/* Landing Page full-width */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: AB.blue, background: `${AB.blue}15`, padding: "3px 10px", borderRadius: 999, textTransform: "uppercase" }}>Landing Page · Marketing · Light Mode</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 14 }}>
            <ScreenFrame label="autoremov.com" url="Light Mode" accent={AB.blue}>
              <img src={imgAutoLanding} alt="Autoremov Landing Light" style={{ width: "100%", display: "block" }} />
            </ScreenFrame>
            <ScreenFrame label="autoremov.com" url="Credit Pricing Scroll" accent={AB.purple}>
              <img src={imgAutoLandingCredit} alt="Autoremov Landing Credit" style={{ width: "100%", display: "block" }} />
            </ScreenFrame>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {[
              { badge: "Hero + Instant Try", note: "Live upload CTA above fold — demonstrates value before any scroll. Side-by-side before/after portrait." },
              { badge: "7-Card Use Case Grid", note: "E-commerce · Designers · Photographers · Social Media · Marketing · Press · ID Photos — segment-first nav." },
              { badge: "Feature Grid", note: "Icons + captions — Instant, Precise, Scalable, API-ready. Social proof numbers embedded in-line." },
              { badge: "Pricing Toggle", note: "Subscription / Credit-based in one view. Cost calculator below answers the model comparison objection." },
            ].map((a) => (
              <div key={a.badge} style={{ background: `${AB.blue}08`, border: `1px solid ${AB.blue}25`, borderRadius: 12, padding: "12px 14px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: AB.blue, textTransform: "uppercase", display: "block", marginBottom: 5 }}>↳ {a.badge}</span>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.55, margin: 0 }}>{a.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard 2-panel */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: AB.purple, background: `${AB.purple}15`, padding: "3px 10px", borderRadius: 999, textTransform: "uppercase" }}>Dashboard · Grid View & List View</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 14 }}>
            <ScreenFrame label="autoremov.com/dashboard" url="Grid View" accent={AB.purple}>
              <img src={imgAutoDashGrid} alt="Dashboard Grid" style={{ width: "100%", display: "block" }} />
            </ScreenFrame>
            <ScreenFrame label="autoremov.com/dashboard" url="List View" accent={AB.purple}>
              <img src={imgAutoDashList} alt="Dashboard List" style={{ width: "100%", display: "block" }} />
            </ScreenFrame>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {[
              { badge: "4 KPI Metric Cards", note: "127 Images Processed · 43 This Month · 2.4 GB Storage · 2.3s Avg Time — at-a-glance usage health." },
              { badge: "Grid / List Toggle", note: "Grid mode for visual scanning of processed images; List mode for file management with names and sizes." },
              { badge: "Search + Filter", note: "Instant search across image library. Filter by status/date. Both modes respond to the same query state." },
              { badge: "New Image CTA Banner", note: "Persistent mid-page prompt — 'Ready to process more images?' — reduces the path to the next job to 1 click." },
            ].map((a) => (
              <div key={a.badge} style={{ background: `${AB.purple}08`, border: `1px solid ${AB.purple}25`, borderRadius: 12, padding: "12px 14px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: AB.purple, textTransform: "uppercase", display: "block", marginBottom: 5 }}>↳ {a.badge}</span>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.55, margin: 0 }}>{a.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Editor 2-panel */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: AB.cyan, background: `${AB.cyan}15`, padding: "3px 10px", borderRadius: 999, textTransform: "uppercase" }}>Product Editor · Single Image & Batch Mode</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 14 }}>
            <ScreenFrame label="autoremov.com/editor" url="Single Image" accent={AB.cyan}>
              <img src={imgAutoEditorEmpty} alt="Editor Single" style={{ width: "100%", display: "block" }} />
            </ScreenFrame>
            <ScreenFrame label="autoremov.com/editor" url="Batch Mode" accent={AB.cyan}>
              <img src={imgAutoEditorBatch} alt="Editor Batch" style={{ width: "100%", display: "block" }} />
            </ScreenFrame>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {[
              { badge: "Split Panel Layout", note: "Tools & Settings sidebar (280px) + full-bleed canvas. Every control accessible without canvas overlap." },
              { badge: "Export Options", note: "Download PNG · JPG · ZIP · Save to Gallery · Share — all visible in left panel before processing starts." },
              { badge: "Horizontal Batch Strip", note: "Processed images pinned to bottom edge as thumbnail tiles. Per-image download + bulk ZIP — canvas always visible." },
              { badge: "Success Toast", note: "'Background removed successfully!' green toast confirms processing without interrupting the canvas workflow." },
            ].map((a) => (
              <div key={a.badge} style={{ background: `${AB.cyan}08`, border: `1px solid ${AB.cyan}25`, borderRadius: 12, padding: "12px 14px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: AB.cyan, textTransform: "uppercase", display: "block", marginBottom: 5 }}>↳ {a.badge}</span>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.55, margin: 0 }}>{a.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing 2-panel */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: "#f59e0b", background: "#f59e0b15", padding: "3px 10px", borderRadius: 999, textTransform: "uppercase" }}>Pricing System · Subscription & Credit-Based</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 14 }}>
            <ScreenFrame label="autoremov.com/pricing" url="Subscription Plans" accent="#f59e0b">
              <img src={imgAutoPricingSub} alt="Pricing Subscription" style={{ width: "100%", display: "block" }} />
            </ScreenFrame>
            <ScreenFrame label="autoremov.com/pricing/credits" url="Credit Packs" accent="#f59e0b">
              <img src={imgAutoPricingCredit} alt="Pricing Credits" style={{ width: "100%", display: "block" }} />
            </ScreenFrame>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {[
              { badge: "Pay Once Use Forever", note: "Headline positions credit model as ownership vs. recurring cost — reduces commitment anxiety for one-off users." },
              { badge: "Plan Comparison Table", note: "Starter · Basic · Pro · Business · Custom — features matrix lets users self-qualify without sales contact." },
              { badge: "Credit Pack Store", note: "10 to 1K credits — 8 pack sizes with volume discount. 'Popular' badge on 50-credit tier drives mid-tier selection." },
              { badge: "Cost Calculator", note: "Interactive slider: 'How many images per month?' → auto-calculates cheapest option. Removes pricing decision friction." },
            ].map((a) => (
              <div key={a.badge} style={{ background: "#f59e0b08", border: "1px solid #f59e0b25", borderRadius: 12, padding: "12px 14px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: "#d97706", textTransform: "uppercase", display: "block", marginBottom: 5 }}>↳ {a.badge}</span>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.55, margin: 0 }}>{a.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings + About 2-panel */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: "#10b981", background: "#10b98115", padding: "3px 10px", borderRadius: 999, textTransform: "uppercase" }}>Settings System & About Page</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 14 }}>
            <ScreenFrame label="autoremov.com/settings/notifications" url="Notifications" accent="#10b981">
              <img src={imgAutoSettings} alt="Settings Notifications" style={{ width: "100%", display: "block" }} />
            </ScreenFrame>
            <ScreenFrame label="autoremov.com/settings/billing" url="Billing" accent="#10b981">
              <img src={imgAutoBilling} alt="Settings Billing" style={{ width: "100%", display: "block" }} />
            </ScreenFrame>
            <ScreenFrame label="autoremov.com/about" url="About Page" accent="#10b981">
              <img src={imgAutoAbout} alt="About Us" style={{ width: "100%", display: "block" }} />
            </ScreenFrame>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {[
              { badge: "Settings Sidebar Nav", note: "Profile · Notifications · Security · Billing · Preferences — standard account hierarchy. Active state in brand purple." },
              { badge: "Billing & Subscription", note: "Pro Plan $29/mo with Active badge. Manage Subscription + Payment Methods in one view — zero navigation required." },
              { badge: "About — Mission + Team", note: "50K+ images, 50M+ processed, 150+ integrations, 99.9% uptime. Journey timeline + team cards with gradient portraits." },
            ].map((a) => (
              <div key={a.badge} style={{ background: "#10b98108", border: "1px solid #10b98125", borderRadius: 12, padding: "12px 14px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: "#10b981", textTransform: "uppercase", display: "block", marginBottom: 5 }}>↳ {a.badge}</span>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.55, margin: 0 }}>{a.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 06: FOUR DESIGN DECISIONS ── */}
      <div style={{ marginBottom: 64 }}>
        {div("06", "4 Non-Obvious Design Decisions", AB.cyan)}
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 36, color: C.text, margin: "0 0 12px" }}>Each Decision Driven by a Problem — Not a Visual Preference</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.muted, maxWidth: 700, lineHeight: 1.85, margin: "0 0 28px" }}>These are the choices that are easy to miss from the outside but are load-bearing for conversion and usability.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
          {decisions.map((d, i) => (
            <button key={d.id} onClick={() => setActiveDecision(i)} style={{ background: activeDecision === i ? `${d.color}12` : C.secondary, border: `2px solid ${activeDecision === i ? d.color : C.border}`, borderRadius: 14, padding: "16px 14px", textAlign: "left", cursor: "pointer", transition: "all 0.2s" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: d.color, display: "block", marginBottom: 6 }}>{d.id}</span>
              <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 13, color: activeDecision === i ? d.color : C.text, lineHeight: 1.4 }}>{d.title}</span>
            </button>
          ))}
        </div>
        <div style={{ background: `${decisions[activeDecision].color}06`, border: `1px solid ${decisions[activeDecision].color}30`, borderRadius: 20, padding: 28, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28, transition: "all 0.25s" }}>
          {[{ label: "THE PROBLEM", text: decisions[activeDecision].problem }, { label: "THE SOLUTION", text: decisions[activeDecision].solution }, { label: "THE OUTCOME", text: decisions[activeDecision].outcome }].map((col) => (
            <div key={col.label}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: decisions[activeDecision].color, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 10 }}>{col.label}</span>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.text, lineHeight: 1.8, margin: 0 }}>{col.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 07: BEFORE/AFTER DEMO ── */}
      <div style={{ marginBottom: 64 }}>
        {div("07", "Interactive Before/After Demo", AB.blue)}
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 36, color: C.text, margin: "0 0 12px" }}>The Landing Page Centrepiece — Instant Value Proof</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.muted, maxWidth: 700, lineHeight: 1.85, margin: "0 0 24px" }}>I designed a drag-to-reveal comparison slider directly on the homepage hero — demonstrating the AI's effectiveness in the first 3 seconds, before the user scrolls. Drag the handle to see the separation:</p>
        <div
          ref={containerRef}
          onMouseDown={(e) => { activeRef.current = true; onDrag(e.clientX); }}
          onTouchStart={(e) => { activeRef.current = true; onDrag(e.touches[0].clientX); }}
          style={{ position: "relative", width: "100%", height: 340, borderRadius: 20, overflow: "hidden", userSelect: "none", cursor: "ew-resize", border: `1px solid ${C.border}`, boxShadow: `0 0 40px ${AB.blue}20` }}
        >
          {/* After — clean background */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #f8faff 0%, #eef2ff 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 12 }}>
            <div style={{ width: 120, height: 160, background: `linear-gradient(135deg, ${AB.blue}20, ${AB.purple}20)`, borderRadius: 16, border: `2px solid ${AB.blue}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56 }}>👤</div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: AB.blue, textTransform: "uppercase", letterSpacing: "0.1em", background: `${AB.blue}15`, padding: "4px 12px", borderRadius: 999 }}>✓ Background Removed</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: AB.blue }}>Clean · Transparent · AI-Precision</span>
          </div>
          {/* Before — messy background */}
          <div ref={layerRef} style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #94a3b8 0%, #64748b 50%, #475569 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 12, width: "50%", overflow: "hidden", borderRight: `3px solid ${AB.blue}` }}>
            <div style={{ width: 120, height: 160, background: "rgba(255,255,255,0.15)", borderRadius: 16, border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, backdropFilter: "blur(4px)" }}>👤</div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap", background: "rgba(0,0,0,0.3)", padding: "4px 12px", borderRadius: 999 }}>Original Photo</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.7)", whiteSpace: "nowrap" }}>Cluttered Background</span>
          </div>
          {/* Handle */}
          <div ref={handleRef} style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 3, background: AB.blue, zIndex: 10, boxShadow: `0 0 12px ${AB.blue}80` }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 40, height: 40, borderRadius: "50%", background: AB.blue, border: "3px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 700, boxShadow: `0 4px 16px ${AB.blue}60` }}>↔</div>
          </div>
        </div>
      </div>

      {/* ── SECTION 08: TOOLS + REFLECTION ── */}
      <div style={{ background: `linear-gradient(135deg, ${AB.darkBg} 0%, #1a1f35 100%)`, borderRadius: 24, padding: "40px 48px" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: AB.blue, textTransform: "uppercase", letterSpacing: "0.15em", display: "block", marginBottom: 32 }}>08 · Tools, Stack & Reflection</span>
        <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 40 }}>
          <div>
            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", margin: "0 0 16px" }}>Full-Stack Design & Development</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {stack.map((s) => (
                <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 16px" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, display: "inline-block", flexShrink: 0, boxShadow: `0 0 8px ${s.color}` }} />
                  <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", width: 100, flexShrink: 0 }}>{s.name}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{s.role}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", margin: "0 0 20px" }}>Reflection</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "What Worked", color: "#10b981", text: "The segment-first architecture — building 7 audience pages as one data-driven template — meant consistent quality across all segments without 7× the design work. The credit calculator was the highest-leverage UI element: handled 'subscription vs. top-up?' without copywriting." },
                { label: "What I'd Do Differently", color: AB.blue, text: "I'd establish design system tokens in Figma before writing any component code. The CSS custom property mapping evolved as pages were built, requiring token refactoring mid-project. Locked token set first = no dark mode rework." },
                { label: "Key Learning", color: AB.purple, text: "A single pricing model assumption can invalidate an entire pricing page design. Discovering Autoremov needed both subscription and pay-per-use during week 2 required a full redesign. Pricing UX conversations must be the very first design conversation — not a feature discovery." },
              ].map((r) => (
                <div key={r.label} style={{ background: `${r.color}10`, border: `1px solid ${r.color}30`, borderRadius: 14, padding: "16px 20px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: r.color, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>{r.label}</span>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Browser Screen Frame wrapper ─────────────────────────────────────────────
function ScreenFrame({ label, url, accent, children }: { label: string; url: string; accent: string; children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 8px 32px rgba(30,32,34,0.10)" }}>
      {/* Browser chrome */}
      <div style={{ background: C.surface, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#ef4444", "#f59e0b", "#10b981"].map((col) => (
            <span key={col} style={{ width: 9, height: 9, borderRadius: "50%", background: col, display: "inline-block" }} />
          ))}
        </div>
        <div style={{ flex: 1, background: C.secondary, borderRadius: 6, padding: "3px 10px", display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.border}`, maxWidth: 320, margin: "0 auto" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, display: "inline-block", flexShrink: 0 }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: accent, background: `${accent}18`, padding: "2px 7px", borderRadius: 4, fontWeight: 700, textTransform: "uppercase", whiteSpace: "nowrap" }}>{url}</span>
      </div>
      {/* Screenshot */}
      <div style={{ overflowY: "hidden", maxHeight: 420, overflowX: "hidden", background: "#fff" }}>
        {children}
      </div>
    </div>
  );
}

function TriviraCase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeJourneyStep, setActiveJourneyStep] = useState(0);
  const [activePillar, setActivePillar] = useState(0);

  const impactMetrics = [
    { value: "₹64L", label: "Revenue in 12 Months", color: "#16a34a", bg: "#16a34a12" },
    { value: "100K+", label: "Happy Customers", color: "#0ea5e9", bg: "#0ea5e912" },
    { value: "4+", label: "Marketplace Channels", color: "#8b5cf6", bg: "#8b5cf612" },
    { value: "8", label: "Product Lines Designed", color: C.accent, bg: `${C.accent}12` },
  ];

  const brandPillars = [
    { icon: "🌿", title: "Purity", color: "#16a34a", bg: "#E2F0D9", textColor: "#1E3A1E", desc: "Products crafted from clean, natural ingredients, eliminating the chemical-heavy additives of legacy supplement brands. Every formulation is certified clean-label — Gelatin Free, Gluten Free, Non-GMO, Soy-Free, and Vegan Friendly.", visual: "Certified clean-label formulation across all 8 product lines" },
    { icon: "♻️", title: "Sustainability", color: "#0ea5e9", bg: "#E0F2FE", textColor: "#0c4a6e", desc: "A commitment to respecting nature through eco-conscious sourcing and packaging. Long-term environmental stewardship is embedded into supply chain decisions, creating alignment between brand values and product experience.", visual: "Eco-conscious sourcing · Responsible packaging standards" },
    { icon: "💚", title: "Care", color: "#8b5cf6", bg: "#F3E8FF", textColor: "#4c1d95", desc: "Prioritizing the holistic well-being of the user in every formulation and digital interaction. The UX itself embodies care — minimizing cognitive load, surfacing the right information at the right moment in the purchase journey.", visual: "User-first UX decisions at every funnel stage" },
  ];

  const products = [
    { name: "Stevia", category: "sweetener", icon: "🌱", outcome: "Focus", color: "#16a34a", bg: "#E2F0D9", target: "Weight-loss seekers & diabetics", soWhat: "Calorie-free entry point into brand ecosystem. Converts metabolic health consumers with zero-risk first purchase." },
    { name: "Monk Fruit", category: "sweetener", icon: "🍈", outcome: "Balance", color: "#f59e0b", bg: "#FFF7ED", target: "Diabetics & keto dieters", soWhat: "Premium, insulin-friendly solution. Captures high-LTV demographic with repeat purchase velocity." },
    { name: "Cordyceps", category: "mushroom", icon: "⚡", outcome: "Energy", color: "#ef4444", bg: "#FEF2F2", target: "Fitness enthusiasts", soWhat: "Tangible performance gains without artificial stimulants. Appeals to the clean-sports market." },
    { name: "Reishi", category: "mushroom", icon: "🧘", outcome: "Calm", color: "#8b5cf6", bg: "#F3E8FF", target: "Urban professionals", soWhat: "Non-pharmacological recovery for high-stress users. Captures the sleep & stress management segment." },
    { name: "Lion's Mane", category: "mushroom", icon: "🧠", outcome: "Focus", color: "#0ea5e9", bg: "#E0F2FE", target: "Knowledge workers & bio-hackers", soWhat: "Positions brand as a productivity partner. High-LTV cognitive health advocates." },
    { name: "Spirulina", category: "greens", icon: "💧", outcome: "Immunity", color: "#16a34a", bg: "#E2F0D9", target: "Daily wellness consumers", soWhat: "Foundational cross-sell product. Drives basket size and repeat purchase through daily use habits." },
    { name: "Chlorella", category: "greens", icon: "✨", outcome: "Detox", color: "#14b8a6", bg: "#CCFBF1", target: "Holistic health consumers", soWhat: "Targets internal cleansing segment. Entry point for premium wellness bundle upsells." },
    { name: "Plant Protein", category: "protein", icon: "💪", outcome: "Recovery", color: C.accent, bg: "#FEF3C7", target: "Gym-goers & vegan athletes", soWhat: "Disrupts mass-market protein with clean-label promise. Drives recurring subscriptions." },
  ];

  const filteredProducts = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);

  const journeySteps = [
    { num: "01", title: "Awareness & Education", icon: "📚", desc: "Users land on the homepage or SEO-optimised blogs detailing the benefits of functional mushrooms and plant-based health.", ux: "Benefit-led hero, educational content blocks, functional category navigation (Focus / Energy / Calm / Heart Health).", color: "#0ea5e9" },
    { num: "02", title: "Trust Building", icon: "🏅", desc: "Users encounter benefit tags, genuine customer reviews, formulation transparency badges, and personal founder messaging.", ux: "ISO/FDA/GMP certification strip, 100K+ customer banner, Gaurav J. sensory testimonial on Stevia 'zero bitter aftertaste'.", color: "#8b5cf6" },
    { num: "03", title: "Exploration", icon: "🔍", desc: "Intuitive category filtering lets users navigate an extensive catalog across Stevia, Plant Protein, and Functional Mushrooms.", ux: "Quick-filter tab bar, outcome-based sorting (Focus/Energy/Calm), product cards with star ratings and flavor variants.", color: "#16a34a" },
    { num: "04", title: "Conversion", icon: "🛒", desc: "Clean product cards with high-contrast CTAs, omnichannel integration, and a Command Palette for returning power users.", ux: "High-contrast 'Add to Cart' buttons, Amazon/Flipkart/Meesho deep links, zero-friction checkout path.", color: C.accent },
  ];

  const certifications = [
    { label: "ISO Certified", icon: "🏭" },
    { label: "FDA Compliant", icon: "✅" },
    { label: "Non-GMO", icon: "🌿" },
    { label: "HACCP", icon: "🔬" },
    { label: "cGMP Facility", icon: "⚗️" },
    { label: "Vegan Friendly", icon: "🌱" },
    { label: "Gluten Free", icon: "🌾" },
    { label: "Gelatin Free", icon: "💊" },
  ];

  const channels = [
    { name: "Amazon", icon: "📦", color: "#f59e0b" },
    { name: "Flipkart", icon: "🛍️", color: "#0ea5e9" },
    { name: "Meesho", icon: "🏪", color: "#ec4899" },
    { name: "IndiaMart", icon: "🏢", color: "#16a34a" },
    { name: "Direct Web", icon: "🌐", color: C.accent },
  ];

  const sectionDivider = (num: string, label: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: "#16a34a", background: "#16a34a15", padding: "4px 12px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>{num} · {label}</span>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );

  return (
    <div style={{ gridColumn: "span 12", display: "flex", flexDirection: "column", gap: 0 }}>

      {/* ── HERO BANNER ── */}
      <div style={{ background: "linear-gradient(135deg, #14532d 0%, #166534 50%, #1a7a3f 100%)", borderRadius: 24, padding: "48px 48px 40px", marginBottom: 48, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -40, width: 340, height: 340, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: "25%", width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "start", marginBottom: 40 }}>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#86efac", display: "block", marginBottom: 12 }}>CASE STUDY 03 · BRAND STRATEGY & E-COMMERCE UX · NUTRACEUTICALS</span>
              <h1 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 52, color: "#ffffff", margin: "0 0 16px", lineHeight: 1.05, letterSpacing: "-0.02em" }}>Trivira Global Enterprise</h1>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: "rgba(255,255,255,0.65)", maxWidth: 600, lineHeight: 1.75, margin: "0 0 28px" }}>
                Transforming a mission-driven wellness startup into a ₹64 Lakh revenue engine — through a founder-first brand architecture, outcome-based product UX, and a trust-led e-commerce ecosystem that converted skeptical browsers into 100,000+ loyal customers.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["Brand Identity", "E-Commerce UX", "Conversion Optimisation", "Information Architecture", "Nutraceuticals"].map((tag) => (
                  <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.08)", padding: "4px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)" }}>{tag}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, minWidth: 300 }}>
              {impactMetrics.map((m) => (
                <div key={m.label} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "20px 16px", textAlign: "center" }}>
                  <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 30, color: m.color, display: "block", lineHeight: 1 }}>{m.value}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", display: "block", marginTop: 6, letterSpacing: "0.08em", lineHeight: 1.4 }}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Founder quote strip */}
          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "16px 24px", display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 32, flexShrink: 0 }}>🌿</span>
            <div>
              <p style={{ fontFamily: "Caveat, cursive", fontSize: 20, color: "#86efac", margin: 0, lineHeight: 1.4 }}>"Trivira was born to harmonize traditional Indian nutritional wisdom with the rigour of modern science — Nurturing Health, Sustaining Nature."</p>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 6, display: "block" }}>— Sachin Trivedi, Founder · Trivira Global Enterprise</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── META TABLE ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: C.border, borderRadius: 16, overflow: "hidden", marginBottom: 64 }}>
        {[["ROLE", "Freelance Brand Strategist & UX Designer"], ["CLIENT", "Trivira Global Enterprise"], ["TYPE", "Nutraceuticals & Plant-Based Wellness"], ["DELIVERABLES", "Brand Identity, Website UX, Product Design System"], ["CHANNELS", "Web · Amazon · Flipkart · Meesho · IndiaMart"]].map(([label, value]) => (
          <div key={label} style={{ background: C.secondary, padding: "20px 20px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>{label}</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: C.text, lineHeight: 1.4 }}>{value}</span>
          </div>
        ))}
      </div>

      {/* ── SECTION 01: PROBLEM ── */}
      <div style={{ marginBottom: 64 }}>
        {sectionDivider("01", "Problem Statement")}
        <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 48, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 36, color: C.text, margin: "0 0 16px" }}>Demystifying Niche Science for the Mass Market</h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.85, margin: 0 }}>
              The Indian wellness market was flooded with generic supplement brands. Trivira had superior formulations — but zero digital presence. The challenge was dual: build trust for products unfamiliar to most Indian consumers (functional mushrooms, adaptogens) while creating a frictionless conversion path. Too much science = confusion. Too little = no credibility.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "🧪", title: "Science Complexity Barrier", desc: "Functional mushrooms and adaptogens needed to be explained without alienating non-expert users — ancient benefits in modern language." },
              { icon: "🤝", title: "Trust Deficit for New Brand", desc: "Zero brand heritage meant every page had to earn trust through certifications, founder story, and transparent formulation claims." },
              { icon: "🛒", title: "Fragmented Checkout Path", desc: "Inconsistencies between product packaging and digital shop grids created visual friction that undermined purchase confidence." },
            ].map((p) => (
              <div key={p.title} style={{ background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, display: "flex", gap: 16, alignItems: "flex-start", borderLeft: "4px solid #16a34a" }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{p.icon}</span>
                <div>
                  <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 14, color: C.text, margin: "0 0 6px" }}>{p.title}</h4>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 02: BRAND ARCHITECTURE ── */}
      <div style={{ marginBottom: 64 }}>
        {sectionDivider("02", "Brand Architecture — Nature's Wisdom Meets Modern Science")}
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 36, color: C.text, margin: "0 0 12px" }}>Three Pillars. One Voice.</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.muted, maxWidth: 700, lineHeight: 1.85, margin: "0 0 32px" }}>
          The brand identity is anchored by three guiding principles — every touchpoint, from product labels to homepage hero copy, reinforces the enterprise's commitment to quality. A "Founder-First" narrative bridges clinical efficacy and human empathy.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
          {brandPillars.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setActivePillar(i)}
              style={{ background: activePillar === i ? p.bg : C.secondary, border: `2px solid ${activePillar === i ? p.color : C.border}`, borderRadius: 20, padding: 28, textAlign: "left", cursor: "pointer", transition: "all 0.25s" }}
            >
              <span style={{ fontSize: 32, display: "block", marginBottom: 12 }}>{p.icon}</span>
              <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 22, color: activePillar === i ? p.textColor : C.text, margin: "0 0 10px" }}>{p.title}</h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: activePillar === i ? p.textColor : C.muted, lineHeight: 1.7, margin: "0 0 14px", opacity: activePillar === i ? 0.85 : 1 }}>{p.desc}</p>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: p.color, background: `${p.color}15`, padding: "3px 10px", borderRadius: 999, textTransform: "uppercase", display: "inline-block" }}>{p.visual}</span>
            </button>
          ))}
        </div>

        {/* Certifications strip */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px 28px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: 16, fontWeight: 700 }}>COMPETITIVE DIFFERENTIATORS — CERTIFICATION TRUST STRIP</span>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {certifications.map((cert) => (
              <div key={cert.label} style={{ display: "flex", alignItems: "center", gap: 6, background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 999, padding: "6px 14px" }}>
                <span style={{ fontSize: 14 }}>{cert.icon}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.text }}>{cert.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 03: UX JOURNEY ── */}
      <div style={{ marginBottom: 64 }}>
        {sectionDivider("03", "UX Flow — The 4-Stage User Journey")}
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 36, color: C.text, margin: "0 0 12px" }}>From Curiosity to Checkout — Zero Cognitive Load</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.muted, maxWidth: 700, lineHeight: 1.85, margin: "0 0 32px" }}>
          The IA was engineered to minimise Time-to-Value (TTV). A tiered navigation ecosystem balances product discovery with educational content, driving a conversion funnel that justifies a ₹64L revenue outcome.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
          {journeySteps.map((step, i) => (
            <button
              key={step.num}
              onClick={() => setActiveJourneyStep(i)}
              style={{ background: activeJourneyStep === i ? `${step.color}12` : C.secondary, border: `2px solid ${activeJourneyStep === i ? step.color : C.border}`, borderRadius: 16, padding: 20, textAlign: "left", cursor: "pointer", transition: "all 0.2s" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: step.color, background: `${step.color}20`, padding: "3px 8px", borderRadius: 4, textTransform: "uppercase" }}>Stage {step.num}</span>
              </div>
              <span style={{ fontSize: 24, display: "block", marginBottom: 8 }}>{step.icon}</span>
              <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 14, color: activeJourneyStep === i ? step.color : C.text, margin: 0 }}>{step.title}</h4>
            </button>
          ))}
        </div>
        <div style={{ background: `${journeySteps[activeJourneyStep].color}08`, border: `1px solid ${journeySteps[activeJourneyStep].color}33`, borderRadius: 20, padding: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, transition: "all 0.3s" }}>
          <div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: journeySteps[activeJourneyStep].color, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 10 }}>USER BEHAVIOUR</span>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.text, lineHeight: 1.8, margin: 0 }}>{journeySteps[activeJourneyStep].desc}</p>
          </div>
          <div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: journeySteps[activeJourneyStep].color, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 10 }}>UX DECISIONS MADE</span>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.8, margin: 0 }}>{journeySteps[activeJourneyStep].ux}</p>
          </div>
        </div>
      </div>

      {/* ── SECTION 04: PRODUCT ECOSYSTEM ── */}
      <div style={{ marginBottom: 64 }}>
        {sectionDivider("04", "Product Ecosystem — Outcome-Based Categorisation")}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
          <div>
            <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 36, color: C.text, margin: "0 0 8px" }}>Benefits Over Ingredients</h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.muted, maxWidth: 580, lineHeight: 1.7, margin: 0 }}>The "Paradox of Choice" is a conversion killer. Solving this meant presenting functional outcomes (Focus / Energy / Calm) rather than raw ingredient lists — directly driving the ₹64L growth milestone.</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            {[{ id: "all", label: "All Products" }, { id: "sweetener", label: "Sweeteners" }, { id: "mushroom", label: "Mushrooms" }, { id: "greens", label: "Greens" }, { id: "protein", label: "Protein" }].map((f) => (
              <button key={f.id} onClick={() => setActiveCategory(f.id)} style={{ padding: "7px 14px", borderRadius: 999, border: `1px solid ${activeCategory === f.id ? "#16a34a" : C.border}`, background: activeCategory === f.id ? "#16a34a" : "transparent", color: activeCategory === f.id ? "#fff" : C.muted, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}>{f.label}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {filteredProducts.map((p) => (
            <div key={p.name} style={{ background: p.bg, border: `1px solid ${p.color}33`, borderRadius: 20, padding: 20, transition: "transform 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontSize: 28 }}>{p.icon}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: p.color, background: `${p.color}20`, padding: "3px 8px", borderRadius: 999, textTransform: "uppercase" }}>{p.outcome}</span>
              </div>
              <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 16, color: "#1a1a1a", margin: "0 0 6px" }}>{p.name}</h4>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#555", lineHeight: 1.55, margin: "0 0 14px", opacity: 0.85 }}>Target: {p.target}</p>
              <div style={{ background: "rgba(255,255,255,0.6)", borderRadius: 10, padding: "10px 12px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, fontWeight: 700, color: p.color, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 4 }}>SO WHAT?</span>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#333", lineHeight: 1.55, margin: 0 }}>{p.soWhat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 05: KEY SCREENS ── */}
      <div style={{ marginBottom: 64 }}>
        {sectionDivider("05", "Key Screen Analysis — UI/UX Decisions")}
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 36, color: C.text, margin: "0 0 32px" }}>Four Critical Interface Moments</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {[
            { label: "A", title: "Homepage — Conversion & Trust Hub", color: "#16a34a", decisions: ["Benefit-led navigation: Focus, Energy, Calm, Heart Health — not product categories", "Social proof banner: 100,000+ Happy Customers, prominently above the fold", "Formulation transparency strip: Gelatin-Free, Gluten-Free, Non-GMO, Soy-Free, Vegan icons", "High-visibility certification placement: ISO, FDA, HACCP, GMP directly on entry"] },
            { label: "B", title: "Shop Pages — Frictionless Browsing", color: "#0ea5e9", decisions: ["Quick-filter tabs: Stevia / Plant Protein / Functional Mushrooms — one tap to category", "Product cards with flavor variants (Mixed Berries, Chocolate, Coffee) reduce return visits", "Star ratings with review counts (5 stars / 30 reviews) — quantified social proof", "High-contrast Add to Cart CTA with zero competing visual noise"] },
            { label: "C", title: "Educational Blog — Top-of-Funnel Engine", color: "#8b5cf6", decisions: ["Content hierarchy: clear subheadings, bulleted Key Benefits lists for scannability", "Scientific breakdowns (dual extraction methods) position brand as subject matter expert", "Cross-pollination grid: 'Recently Published' articles keep users in the ecosystem longer", "SEO-optimised structure converts organic traffic into informed, high-LTV advocates"] },
            { label: "D", title: "Corporate Pages — Authority & Growth", color: C.accent, decisions: ["Founder's Story on About Us humanises the brand with Sachin Trivedi's personal mission", "Seamless Careers form: role expectations, benefits, Upload Resume — structured talent pipeline", "Contact Sales form for B2B enterprise scaling and franchise partnerships", "Newsletter subscription as Zero-Party Data collection engine for personalised re-marketing"] },
          ].map((screen) => (
            <div key={screen.label} style={{ background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden" }}>
              <div style={{ background: `${screen.color}12`, borderBottom: `1px solid ${screen.color}33`, padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 32, height: 32, borderRadius: "50%", background: screen.color, color: "#fff", fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{screen.label}</span>
                <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 15, color: C.text, margin: 0 }}>{screen.title}</h4>
              </div>
              <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                {screen.decisions.map((d, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: screen.color, flexShrink: 0, marginTop: 5 }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 05.5: LIVE WEBSITE SCREENS GALLERY ── */}
      <div style={{ marginBottom: 64 }}>
        {sectionDivider("05.5", "Live Website — Actual Delivered Screens")}
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 36, color: C.text, margin: "0 0 12px" }}>The Final Product — Shipped & Live</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.muted, maxWidth: 700, lineHeight: 1.85, margin: "0 0 40px" }}>
          Every screen was designed to serve a specific user goal — from homepage trust-building to frictionless job applications. These are the actual delivered pages, live on trivira.com.
        </p>

        {/* ── Row 1: Homepage — Full Feature ── */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: "#16a34a", background: "#16a34a15", padding: "3px 10px", borderRadius: 999, textTransform: "uppercase" }}>Homepage · Conversion Hub</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          <ScreenFrame label="trivira.com" url="Home" accent="#16a34a">
            <img src={imgHome} alt="Trivira Homepage" style={{ width: "100%", display: "block", borderRadius: "0 0 10px 10px" }} />
          </ScreenFrame>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 14 }}>
            {[
              { badge: "Lion's Mane Hero", note: "Benefit-led headline with mushroom photography — nature authority established immediately" },
              { badge: "Certification Strip", note: "ISO, FDA, HACCP, GMP, Non-GMO — visible above fold to de-risk first-time purchase" },
              { badge: "Outcome Navigation", note: "Focus / Energy / Calm / Heart Health — products framed by user desired outcome, not ingredient" },
              { badge: "100K Customers Banner", note: "Social proof as full-width strip — quantified community trust before the product grid" },
            ].map((a) => (
              <div key={a.badge} style={{ background: "#16a34a10", border: "1px solid #16a34a30", borderRadius: 12, padding: "12px 14px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: "#16a34a", textTransform: "uppercase", display: "block", marginBottom: 5 }}>↳ {a.badge}</span>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.55, margin: 0 }}>{a.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Row 2: Products + About side by side ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
          {/* Products */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: "#f59e0b", background: "#f59e0b15", padding: "3px 10px", borderRadius: 999, textTransform: "uppercase" }}>Nutraceuticals Shop Page · Outcome Categories</span>
            </div>
            <ScreenFrame label="trivira.com/shop" url="Nutraceuticals" accent="#f59e0b">
              <img src={imgProducts} alt="Trivira Shop Page" style={{ width: "100%", display: "block", borderRadius: "0 0 10px 10px" }} />
            </ScreenFrame>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
              {[
                { badge: "Quick Filter Tabs", note: "Stevia · Protein · Mushrooms — one tap to category. Eliminates paradox of choice." },
                { badge: "Product Cards", note: "Flavour variants, star ratings, Add to Cart CTA — all scannable in under 3 seconds." },
              ].map((a) => (
                <div key={a.badge} style={{ background: "#f59e0b10", border: "1px solid #f59e0b30", borderRadius: 12, padding: "12px 14px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: "#d97706", textTransform: "uppercase", display: "block", marginBottom: 5 }}>↳ {a.badge}</span>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.55, margin: 0 }}>{a.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* About Us */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: "#0ea5e9", background: "#0ea5e915", padding: "3px 10px", borderRadius: 999, textTransform: "uppercase" }}>About Us · Brand Authority Page</span>
            </div>
            <ScreenFrame label="trivira.com/about-us" url="About Us" accent="#0ea5e9">
              <img src={imgAboutUs} alt="Trivira About Us" style={{ width: "100%", display: "block", borderRadius: "0 0 10px 10px" }} />
            </ScreenFrame>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
              {[
                { badge: "Founder's Story", note: "Sachin Trivedi's personal narrative — Founder-First brand architecture builds emotional trust." },
                { badge: "3 Pillars Visual", note: "Purity · Sustainability · Care displayed as icons — philosophy made tangible at a glance." },
              ].map((a) => (
                <div key={a.badge} style={{ background: "#0ea5e910", border: "1px solid #0ea5e930", borderRadius: 12, padding: "12px 14px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: "#0ea5e9", textTransform: "uppercase", display: "block", marginBottom: 5 }}>↳ {a.badge}</span>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.55, margin: 0 }}>{a.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 3: Blog landing + Blog post ── */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: "#8b5cf6", background: "#8b5cf615", padding: "3px 10px", borderRadius: 999, textTransform: "uppercase" }}>Blog System · Top-of-Funnel Educational Engine</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 20 }}>
            <div>
              <ScreenFrame label="trivira.com/blogs" url="Blogs" accent="#8b5cf6">
                <img src={imgBlogs} alt="Trivira Blog Landing" style={{ width: "100%", display: "block", borderRadius: "0 0 10px 10px" }} />
              </ScreenFrame>
              <div style={{ background: "#8b5cf610", border: "1px solid #8b5cf630", borderRadius: 12, padding: "12px 14px", marginTop: 12 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: "#8b5cf6", textTransform: "uppercase", display: "block", marginBottom: 5 }}>↳ 3-Category Discovery Grid</span>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.55, margin: 0 }}>Functional Mushrooms · Stevia · Plant-Based Protein — educational entry points for each product family. Hero image (Reishi) immediately communicates natural authority.</p>
              </div>
            </div>
            <div>
              <ScreenFrame label="trivira.com/blogs/functional-mushrooms" url="Blog Post" accent="#8b5cf6">
                <img src={imgBlogsPost} alt="Trivira Blog Post" style={{ width: "100%", display: "block", borderRadius: "0 0 10px 10px" }} />
              </ScreenFrame>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
                {[
                  { badge: "Scientific Depth", note: "Dual extraction methods, nerve growth factors — expert-level content positions brand as authority, not vendor." },
                  { badge: "Cross-Pollination Grid", note: "'Recently Published' section keeps users in the ecosystem, increasing session depth and LTV." },
                ].map((a) => (
                  <div key={a.badge} style={{ background: "#8b5cf610", border: "1px solid #8b5cf630", borderRadius: 12, padding: "12px 14px" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: "#8b5cf6", textTransform: "uppercase", display: "block", marginBottom: 5 }}>↳ {a.badge}</span>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.55, margin: 0 }}>{a.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 4: Careers 3-panel ── */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: C.accent, background: `${C.accent}15`, padding: "3px 10px", borderRadius: 999, textTransform: "uppercase" }}>Careers System · Talent Acquisition Pipeline</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { src: imgCareers, url: "trivira.com/careers", label: "Careers Landing", badge: "Role Listings", note: "Categorised job families (Sales, Product, Creative, Operations) with clear department grouping and one-tap apply flow." },
              { src: imgCareersJobDesc, url: "trivira.com/careers/sales-marketing", label: "Job Description", badge: "Role Detail Page", note: "Structured JD with What you'll do, Must-haves, and Benefits sections — sets clear expectations to pre-qualify applicants." },
              { src: imgCareersForm, url: "trivira.com/careers/apply", label: "Application Form", badge: "Frictionless Apply", note: "Minimal fields: Name, Email, Phone, Education, Experience, Position, Cover Letter + Resume upload. One CTA: Submit." },
            ].map((screen) => (
              <div key={screen.label}>
                <ScreenFrame label={screen.url} url={screen.label} accent={C.accent}>
                  <img src={screen.src} alt={screen.label} style={{ width: "100%", display: "block", borderRadius: "0 0 10px 10px" }} />
                </ScreenFrame>
                <div style={{ background: `${C.accent}10`, border: `1px solid ${C.accent}30`, borderRadius: 12, padding: "12px 14px", marginTop: 12 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: C.accent, textTransform: "uppercase", display: "block", marginBottom: 5 }}>↳ {screen.badge}</span>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.55, margin: 0 }}>{screen.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Row 5: Contact Us ── */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: "#14b8a6", background: "#14b8a615", padding: "3px 10px", borderRadius: 999, textTransform: "uppercase" }}>Contact Us · Enterprise Sales Bridge</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "4fr 8fr", gap: 28, alignItems: "start" }}>
            <div>
              <ScreenFrame label="trivira.com/contact-us" url="Contact" accent="#14b8a6">
                <img src={imgContactUs} alt="Trivira Contact" style={{ width: "100%", display: "block", borderRadius: "0 0 10px 10px" }} />
              </ScreenFrame>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 4 }}>
              <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, margin: 0 }}>B2B Enterprise Sales Gateway</h4>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.8, margin: 0 }}>The Contact page serves two distinct audiences — B2C product support (routed to FAQ) and B2B enterprise buyers (direct sales team pipeline). The form collects Name, Mobile, Email, and Message, with a clear "Send Message" CTA, creating a structured lead capture mechanism for enterprise scaling.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { badge: "Sales Team Routing", note: "Separate form from product support — B2B leads go directly to sales pipeline without triage delay." },
                  { badge: "Minimal Friction Design", note: "5 fields only: Name, Mobile, Email, Message. No unnecessary fields — maximises form completion rate." },
                  { badge: "Footer Newsletter", note: "Email subscription on every page footer — Zero-Party Data engine for personalised re-marketing campaigns." },
                  { badge: "Omnichannel Links", note: "Amazon, Flipkart, IndiaMart, Meesho shortcuts in footer — captures purchase intent at every exit point." },
                ].map((a) => (
                  <div key={a.badge} style={{ background: "#14b8a610", border: "1px solid #14b8a630", borderRadius: 12, padding: "12px 14px" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: "#0d9488", textTransform: "uppercase", display: "block", marginBottom: 5 }}>↳ {a.badge}</span>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.55, margin: 0 }}>{a.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 06: SOCIAL PROOF + OMNICHANNEL ── */}
      <div style={{ marginBottom: 64 }}>
        {sectionDivider("06", "Social Proof & Omnichannel Strategy")}
        <div style={{ display: "grid", gridTemplateColumns: "6fr 6fr", gap: 32 }}>
          {/* Testimonial */}
          <div>
            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 24, color: C.text, margin: "0 0 8px" }}>Sensory Trust Factors</h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.75, margin: "0 0 20px" }}>Testimonials are deployed as the "closing argument" of the UX flow — specifically overcoming the primary sensory barrier of the sweetener market.</p>
            <div style={{ background: "#E2F0D9", border: "1px solid #16a34a33", borderRadius: 20, padding: 28 }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: "#f59e0b", fontSize: 18 }}>{s}</span>)}
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: "#1E3A1E", lineHeight: 1.75, margin: "0 0 16px", fontStyle: "italic" }}>
                "I love that this Stevia has <strong>zero bitter aftertaste</strong>. I've tried many brands and this is the first one that actually tastes natural. Perfect for my tea every morning."
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 14, color: "#1E3A1E", display: "block" }}>Gaurav J.</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#16a34a", fontWeight: 700 }}>Verified Buyer · Stevia Powder</span>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#16a34a", background: "#16a34a15", padding: "3px 10px", borderRadius: 999, fontWeight: 700, textTransform: "uppercase" }}>Sensory Trust Signal</span>
              </div>
            </div>
            <div style={{ marginTop: 16, background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 18, color: C.text }}>100,000+</span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.muted }}>Happy Customers · Bold above-fold banner</span>
              <span style={{ fontSize: 20 }}>🎉</span>
            </div>
          </div>

          {/* Omnichannel */}
          <div>
            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 24, color: C.text, margin: "0 0 8px" }}>Omnichannel Accessibility</h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.75, margin: "0 0 20px" }}>The UX acknowledges the user's existing shopping habits. Integrating major marketplace links leverages their built-in trust to bolster Trivira's own digital storefront.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {channels.map((ch) => (
                <div key={ch.name} style={{ background: C.secondary, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 22 }}>{ch.icon}</span>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 14, color: C.text }}>{ch.name}</span>
                    {ch.name === "Direct Web" && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#16a34a", background: "#16a34a15", padding: "1px 6px", borderRadius: 4, fontWeight: 700, marginLeft: 8 }}>PRIMARY</span>}
                  </div>
                  <div style={{ width: "40%", height: 6, background: C.surface, borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: ch.name === "Direct Web" ? "70%" : ch.name === "Amazon" ? "90%" : ch.name === "Flipkart" ? "75%" : ch.name === "Meesho" ? "60%" : "45%", background: ch.color, borderRadius: 999 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 07: BUSINESS IMPACT ── */}
      <div style={{ background: "linear-gradient(135deg, #14532d 0%, #166534 100%)", borderRadius: 24, padding: "40px 48px" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: "#86efac", textTransform: "uppercase", letterSpacing: "0.15em", display: "block", marginBottom: 16 }}>07 · Business Impact & Key Takeaways</span>
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 36, color: "#ffffff", margin: "0 0 12px" }}>Design as a Revenue Engine</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "rgba(255,255,255,0.6)", maxWidth: 680, lineHeight: 1.8, margin: "0 0 36px" }}>
          The ₹64 Lakh milestone in 12 months demonstrates that design was the catalyst for every funnel stage — shifting Trivira's brand perception from a generic supplement provider to a trusted wellness partner.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { icon: "🏆", title: "Trust-Led Design", desc: "Successfully shifted the brand narrative from chemical-heavy supplements to nature-based purity. Every page element serves as a trust signal." },
            { icon: "📖", title: "Educational Authority", desc: "Deep-form content and 'So What?' scientific benefits moved users through the sales funnel with confidence, creating high-LTV advocates." },
            { icon: "🌐", title: "Omnichannel Reach", desc: "Integration with major Indian e-marketplaces captures traffic at every touchpoint, leveraging existing marketplace trust for the brand's own storefront." },
          ].map((l) => (
            <div key={l.title} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 24 }}>
              <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{l.icon}</span>
              <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 16, color: "#ffffff", margin: "0 0 8px" }}>{l.title}</h4>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{l.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GamifiedLmsCase() {
  const [lmsState, setLmsState] = useState(1);
  const progress = lmsState === 1 ? 33 : lmsState === 2 ? 66 : 100;
  const labels = ["Chapter 1 Usability Laws", "Chapter 2 Spatial Interaction Grids", "All Heuristics Mastered! 🏆"];

  return (
    <>
      <div style={{ gridColumn: "span 4", position: "sticky", top: 48, display: "flex", flexDirection: "column", gap: 32, borderRight: `1px solid ${C.border}`, paddingRight: 32 }}>
        <div>
          <span style={tagStyle(C.accent)}>CASE PROFILE 04 // CORPORATE LEARNING</span>
          <h1 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 32, color: C.text, margin: "4px 0 8px" }}>LMS Platform</h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.7 }}>Gamification Training Engine for Employee Skill Development.</p>
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, display: "flex", flexDirection: "column", gap: 16 }}>
          {[["ROLE & POSITION", "UI/UX Designer (Full Time)"], ["TIMELINE", "Sep 2022 — Mar 2023 (Ahmedabad)"]].map(([label, value]) => (
            <div key={label}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, display: "block" }}>{label}</span>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 12, color: C.text }}>{value}</span>
            </div>
          ))}
          <div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, display: "block" }}>KEY OUTCOME METRIC</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: C.accentSec, background: `${C.accentSec}1a`, padding: "4px 8px", borderRadius: 4, display: "inline-block", marginTop: 4, textTransform: "uppercase" }}>Higher corporate course completion rates</span>
          </div>
        </div>
      </div>
      <div style={{ gridColumn: "span 8", display: "flex", flexDirection: "column", gap: 48 }}>
        <section>
          <span style={tagStyle(C.accent)}>02 // THE OPPORTUNITY</span>
          <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 28, color: C.text, margin: "8px 0 16px" }}>Increasing Engagement in Corporate Training Portals</h3>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.75 }}>Corporate training is often required for compliance, but static, uninspiring learning portals can lead to low completion rates. Because courses felt disconnected from daily routines, users skipped tasks, creating compliance gaps for global team systems.</p>
        </section>

        <section style={{ borderTop: `1px solid ${C.border}`, paddingTop: 32 }}>
          <span style={tagStyle(C.accent)}>03 // PROTOTYPE TESTING</span>
          <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 22, color: C.text, margin: "8px 0 16px" }}>Interactive Micro-Moment Journey Sandbox</h3>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, marginTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}`, paddingBottom: 8, marginBottom: 16 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 12, color: C.text, textTransform: "uppercase" }}>🏆 Learning Progress Path</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 900, fontSize: 12, color: C.accent }}>{progress}% Completed{progress === 100 ? " 🏆" : ""}</span>
            </div>
            <div>
              <div style={{ width: "100%", background: C.secondary, height: 14, borderRadius: 999, overflow: "hidden", border: `1px solid ${C.border}`, marginBottom: 16 }}>
                <div style={{ height: "100%", background: C.accent, width: `${progress}%`, transition: "width 0.5s ease", borderRadius: 999 }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted }}>Active Quest: {labels[lmsState - 1]}</span>
                <button
                  onClick={() => setLmsState((s) => (s % 3) + 1 as 1 | 2 | 3)}
                  style={{ padding: "8px 16px", background: C.text, color: C.secondary, borderRadius: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.accent; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.text; }}
                >
                  Simulate Checkpoint
                </button>
              </div>
            </div>
          </div>
        </section>

        <section style={{ borderTop: `1px solid ${C.border}`, paddingTop: 32 }}>
          <span style={tagStyle(C.accent)}>04 // OUTCOME ANALYSIS</span>
          <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 28, color: C.text, margin: "8px 0 16px" }}>Key Platform Outcomes</h3>
          <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            {["Clear Progress Indicators: Created straightforward visual paths showing employees their exact milestones to encourage course completion.", "Modular Course Structures: Designed lesson dashboards to display courses in manageable sections, perfect for busy schedules.", "Polished User Interface: Designed the layout with responsive frameworks, ensuring the platform remains easy to navigate on both desktop and mobile devices."].map((b, i) => (
              <li key={i} style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{b}</li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

function CaseStudyOverlay({ id, onClose }: { id: CaseStudyId; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(249,247,243,0.98)",
        backdropFilter: "blur(12px)",
        overflowY: "auto",
        animation: "fadeIn 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", minHeight: "100vh", padding: "48px 48px 96px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}`, paddingBottom: 24, marginBottom: 48 }}>
          <span style={tagStyle(C.accent)}>UX DESIGN ARCHITECTURE SYSTEM LOGS</span>
          <button
            onClick={onClose}
            style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.muted, background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.text; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.muted; }}
          >
            [ CLOSE BLUEPRINT ] ✕
          </button>
        </div>

        <div style={{ display: (id === "klimashift" || id === "trivira" || id === "autoremov") ? "block" : "grid", gridTemplateColumns: "4fr 8fr", gap: 48, alignItems: "start" }}>
          {id === "klimashift" && <KlimaShiftCase />}
          {id === "autoremov" && <AutoremovCase />}
          {id === "trivira" && <TriviraCase />}
          {id === "gamified_lms" && <GamifiedLmsCase />}
          {(id === "ar_onboarding" || !id) && (
            <div style={{ gridColumn: "span 12", textAlign: "center", padding: "80px 0", color: C.muted, fontFamily: "'JetBrains Mono', monospace" }}>Case study details coming soon.</div>
          )}
        </div>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 48, marginTop: 80, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: `${C.muted}80` }}>CASE DATASET RECOVERY TERMINATED VERIFICATION</span>
          <button onClick={onClose} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.accent, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Return to index</button>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [caseStudy, setCaseStudy] = useState<CaseStudyId>(null);
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({ msg: "", visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  const showToast = (msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, visible: true });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  };

  const goTo = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div
      style={{
        background: C.bg,
        color: C.text,
        minHeight: "100vh",
        backgroundSize: "40px 40px",
        backgroundImage: "linear-gradient(to right, rgba(30,32,34,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,32,34,0.015) 1px, transparent 1px)",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #F9F7F3; }
        ::-webkit-scrollbar-thumb { background: rgba(30,32,34,0.08); border-radius: 4px; border: 2px solid #F9F7F3; }
        ::-webkit-scrollbar-thumb:hover { background: #E06A3B; }
      `}</style>

      <Nav current={page} onNav={goTo} onContact={() => goTo("contact")} />

      <main style={{ animation: "fadeIn 0.3s ease" }} key={page}>
        {page === "home" && <HomePage onNav={goTo} onCaseStudy={setCaseStudy} />}
        {page === "work-archive" && <WorkArchivePage onCaseStudy={setCaseStudy} />}
        {page === "experience" && <ExperiencePage />}
        {page === "process" && <ProcessPage />}
        {page === "about" && <AboutPage />}
        {page === "contact" && <ContactPage onToast={showToast} />}
      </main>

      {caseStudy && <CaseStudyOverlay id={caseStudy} onClose={() => setCaseStudy(null)} />}
      <Toast message={toast.msg} visible={toast.visible} />
    </div>
  );
}
