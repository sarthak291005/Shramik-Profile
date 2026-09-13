import { useState, useEffect, useCallback } from "react";

/* =============================================================
   SHRAMIK -- India's Verified Worker Network
   Clean rewrite v3.1 -- zero accumulated bugs
   Design: Dark navy mesh hero, teal accent, bento grid
   Fonts: Syne (display) + Plus Jakarta Sans (body)
   12 pages, fully responsive, mobile hamburger nav
============================================================= */

// --- TOKENS --------------------------------------------------
const T = {
  void:"#05080D", base:"#0D1B28", l1:"#1A3A4F", l2:"#254A65",
  glass:"rgba(255,255,255,0.08)", glassB:"rgba(255,255,255,0.12)",
  white:"#FFFFFF", offwhite:"#F0F7F8", subtle:"#E6F5F7",
  border:"#D4E8EB", borderM:"#BADADF",
  snow70:"rgba(255,255,255,0.75)",
  ink:"#0D1B28", body:"#2D5566", muted:"#5A7A99", dim:"#8899BB",
  teal:"#00D9B8", tealM:"#00B89F", tealD:"#008A7F",
  tealGlow:"rgba(0,217,184,0.22)",
  violet:"#9C66FF", violetL:"#B399FF", violetGlow:"rgba(156,102,255,0.18)",
  amber:"#FF9D3D", amberL:"#FFB366", amberBg:"rgba(255,157,61,0.1)",
  green:"#1FCB88", greenBg:"#E8FAF3",
  red:"#FF4B4B", gold:"#FFB800",
  s1:"0 2px 8px rgba(0,0,0,0.08),0 4px 16px rgba(0,0,0,0.1)",
  s2:"0 6px 24px rgba(0,0,0,0.14)",
  s3:"0 16px 56px rgba(0,0,0,0.2)",
  r:"10px", rM:"16px", rL:"22px", rX:"32px",
};

// --- GLOBAL STYLES -------------------------------------------
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body,#root{font-family:'Plus Jakarta Sans',system-ui,sans-serif;background:${T.offwhite};color:${T.body};overflow-x:hidden;-webkit-font-smoothing:antialiased}
      body{font-size:15px;line-height:1.6;letter-spacing:0}
      .font-display{font-family:'Syne',system-ui,sans-serif;letter-spacing:-0.02em}
      .h1-big{font-size:clamp(2.5rem,5vw,3.5rem)!important;letter-spacing:-1.4px!important}
      .h2-big{font-size:clamp(1.9rem,3.4vw,2.7rem)!important;letter-spacing:-1px!important}
      h1,h2,h3{line-height:1.15}
      p{line-height:1.75}
      button,input,select,textarea{font-size:14px}
      button{min-height:42px}
      .main-wrap{max-width:1200px;margin:0 auto;width:100%}
      .panel{background:${T.white};border:1px solid #E8EDF4;border-radius:${T.rM};box-shadow:${T.s1}}
      .grad-teal{background:linear-gradient(120deg,${T.teal},${T.violetL});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      .grad-amber{background:linear-gradient(120deg,${T.amber},#F97316);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      .grad-violet{background:linear-gradient(120deg,${T.violetL},${T.teal});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
      @keyframes slideLeft{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(0.95)}}
      @keyframes menuSlide{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
      .anim-fadeup{animation:fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both}
      .anim-fadeup-1{animation:fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both}
      .anim-fadeup-2{animation:fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.2s both}
      .anim-fadein{animation:fadeIn 0.4s ease both}
      .anim-float{animation:floatY 4s ease-in-out infinite}
      .anim-menuslide{animation:menuSlide 0.25s cubic-bezier(0.22,1,0.36,1) both}
      .lift{transition:transform 0.22s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.22s ease,border-color 0.2s}
      .lift:hover{transform:translateY(-3px)}
      .card-glow:hover{box-shadow:0 0 0 1.5px ${T.teal}44,0 12px 40px rgba(0,229,195,0.14)}
      .btn-teal:hover{filter:brightness(1.08);transform:translateY(-2px)}
      .btn-ghost:hover{border-color:${T.teal}!important;color:${T.teal}!important}
      .btn-teal:active,.btn-ghost:active{transform:translateY(1px) scale(.985)}
      .btn-teal:disabled,.btn-ghost:disabled{transform:none!important;filter:none!important;box-shadow:none!important}
      .reveal{opacity:0;transform:translateY(26px);transition:opacity 0.7s ease,transform 0.7s cubic-bezier(0.22,1,0.36,1)}
      .reveal.in{opacity:1;transform:translateY(0)}
      .stagger-1{transition-delay:.06s}
      .stagger-2{transition-delay:.12s}
      .stagger-3{transition-delay:.18s}
      ::-webkit-scrollbar{width:5px}
      ::-webkit-scrollbar-track{background:${T.offwhite}}
      ::-webkit-scrollbar-thumb{background:${T.borderM};border-radius:3px}
      .marquee{display:flex;width:max-content;animation:slideLeft 32s linear infinite}
      .marquee:hover{animation-play-state:paused}
      .mesh-bg{background:radial-gradient(ellipse 80% 60% at 20% 40%,rgba(0,229,195,0.13) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 80% 20%,rgba(139,92,246,0.11) 0%,transparent 60%),${T.base}}
      .dot-bg{background-image:radial-gradient(circle,rgba(255,255,255,0.035) 1px,transparent 1px);background-size:28px 28px}
      .tab-on{background:${T.teal}!important;color:${T.base}!important;font-weight:700!important}
      input,textarea,select{font-family:'Plus Jakarta Sans',system-ui;color:${T.ink}}
      input,textarea,select,button{border-radius:${T.r}}
      input:focus,textarea:focus,select:focus,button:focus-visible{outline:none;box-shadow:0 0 0 3px rgba(0,229,195,0.18)}
      input::placeholder,textarea::placeholder{color:${T.dim}}
      select option{background:#fff;color:${T.ink}}
      .hamburger{display:none}
      .filter-bar{display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;padding:10px 12px;border:1px solid rgba(255,255,255,.45);border-radius:16px;background:linear-gradient(135deg,rgba(255,255,255,.42),rgba(255,255,255,.18));backdrop-filter:blur(18px) saturate(130%);-webkit-backdrop-filter:blur(18px) saturate(130%);box-shadow:0 12px 34px rgba(15,23,42,.12),inset 0 1px 0 rgba(255,255,255,.45)}
      .filter-field{display:flex;flex-direction:column;gap:6px}
      .filter-label{font-size:11px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:#4F6C88}
      .filter-select{width:126px;height:38px}
      .filter-select.city{width:126px}
      .filter-search{width:220px;min-width:180px;height:40px}
      .filter-actions{display:flex;gap:8px;align-items:flex-end;margin-left:auto}
      .liquid-control{background:linear-gradient(180deg,rgba(255,255,255,.62),rgba(255,255,255,.38))!important;border:1px solid rgba(199,218,236,.9)!important;backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.5)}
      .view-toggle{min-width:72px;height:38px;border-radius:${T.r};display:inline-flex;align-items:center;justify-content:center;gap:6px;font-size:11.5px;font-weight:800;letter-spacing:.02em}
      .search-sticky{margin-top:14px}
      .empty-state{padding:28px;background:${T.white};border:1px dashed ${T.borderM};border-radius:${T.rM};text-align:center;color:${T.muted}}
      .page-note{font-size:12.5px;color:${T.muted};margin-top:8px}
      .page-shell{min-height:100vh;background:${T.offwhite}}
      .page-wrap{max-width:1100px;margin:0 auto;padding:32px}
      .page-wrap-wide{max-width:1200px;margin:0 auto;padding:32px}
      .section-soft{background:linear-gradient(145deg,rgba(255,255,255,.48) 0%,rgba(247,250,253,.26) 100%);border:1px solid rgba(255,255,255,.58);border-radius:${T.rM};box-shadow:0 12px 34px rgba(15,23,42,.1),inset 0 1px 0 rgba(255,255,255,.52);backdrop-filter:blur(18px) saturate(130%);-webkit-backdrop-filter:blur(18px) saturate(130%)}
      .page-enter{animation:fadeUp .45s cubic-bezier(0.22,1,0.36,1) both}
      .clicky{transition:transform .18s ease, box-shadow .18s ease}
      .clicky:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(15,23,42,.1)}
      .easy-mode{font-size:17px}
      .easy-mode button{min-height:48px;font-size:15px}
      .easy-mode input,.easy-mode select,.easy-mode textarea{min-height:46px;font-size:15px}
      .compact-btn{min-height:34px!important;font-size:12px!important;padding-top:7px!important;padding-bottom:7px!important}
      .compact-nav-btn{min-height:36px!important;font-size:13px!important}
      .easy-chip{display:inline-flex;align-items:center;gap:6px;background:${T.teal}15;border:1px solid ${T.teal}44;color:${T.tealM};border-radius:999px;padding:6px 12px;font-size:12px;font-weight:700}
      .dashboard-hero{background:linear-gradient(135deg,${T.l1} 0%,${T.l2} 55%,#17304B 100%);border-radius:${T.rX};padding:28px;border:1px solid rgba(255,255,255,0.08);box-shadow:${T.s3};color:#fff}
      .dashboard-sub{font-size:13px;color:rgba(255,255,255,0.58);margin-top:6px}
      .dashboard-chipbar{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
      .metric-card{background:linear-gradient(145deg,rgba(255,255,255,.52) 0%,rgba(248,251,254,.28) 100%);border:1px solid rgba(255,255,255,.6);border-radius:${T.rM};padding:20px;box-shadow:0 12px 30px rgba(15,23,42,.08),inset 0 1px 0 rgba(255,255,255,.5);backdrop-filter:blur(16px) saturate(120%);-webkit-backdrop-filter:blur(16px) saturate(120%)}
      .action-tile{background:linear-gradient(145deg,rgba(255,255,255,.5) 0%,rgba(248,251,254,.26) 100%);border:1px solid rgba(255,255,255,.58);border-radius:${T.rM};padding:18px;box-shadow:0 10px 28px rgba(15,23,42,.08),inset 0 1px 0 rgba(255,255,255,.5);backdrop-filter:blur(15px) saturate(120%);-webkit-backdrop-filter:blur(15px) saturate(120%);transition:transform .18s ease, box-shadow .18s ease}
      .action-tile:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(15,23,42,.08)}
      .toast{position:fixed;right:20px;bottom:20px;z-index:500;display:flex;align-items:flex-start;gap:10px;background:${T.ink};color:#fff;border-radius:16px;padding:12px 14px;box-shadow:${T.s3};font-size:13px;font-weight:600;max-width:320px;border:1px solid rgba(255,255,255,.08);animation:fadeUp .22s ease both}
      .toast-icon{width:24px;height:24px;border-radius:999px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0}
      .toast-copy{display:flex;flex-direction:column;gap:2px}
      .toast-title{font-size:12px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:rgba(255,255,255,.62)}
      .toast-text{font-size:13px;line-height:1.5;color:#fff}
      .toast.success .toast-icon{background:rgba(16,185,129,.18);color:#6EE7B7}
      .toast.info .toast-icon{background:rgba(0,229,195,.18);color:${T.teal}}
      .toast.warn .toast-icon{background:rgba(245,158,11,.18);color:#FCD34D}
      .hero-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:28px;padding-top:36px;border-top:1px solid rgba(255,255,255,0.06)}
      .hero-copy{max-width:620px}
      .hero-kicker{display:inline-flex;align-items:center;gap:8px;background:${T.glass};border:1px solid ${T.glassB};border-radius:${T.rX};padding:7px 16px}
      .hero-heading{max-width:13ch;font-size:clamp(2.5rem,5vw,4rem)!important;letter-spacing:-1.7px!important;line-height:1.04!important;text-wrap:balance}
      .hero-subcopy{max-width:62ch;font-size:15.5px;line-height:1.75;color:rgba(255,255,255,0.72)}
      .hero-proof-row{display:flex;gap:10px;flex-wrap:wrap;margin:0 0 32px}
      .hero-proof-pill{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:999px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);font-size:12px;font-weight:700;color:rgba(255,255,255,0.76)}
      .hero-card-shell{background:linear-gradient(180deg,rgba(12,24,41,0.88) 0%,rgba(9,18,31,0.94) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.15);border-radius:${T.rX};padding:28px;box-shadow:0 0 40px rgba(0,229,195,0.16),0 24px 64px rgba(0,0,0,0.5)}
      .role-quick-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
      .assist-bar{position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:260;background:rgba(6,13,24,.95);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:8px 10px;display:flex;align-items:center;gap:8px;box-shadow:${T.s3}}
      .assist-pill{border:none;border-radius:999px;padding:9px 14px;background:rgba(255,255,255,.08);color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',system-ui}
      .assist-pill.active{background:${T.teal};color:${T.base}}
      .section-intro{max-width:760px;margin:0 auto 56px;text-align:center}
      .section-intro p{font-size:15px;color:${T.muted};max-width:60ch;margin:14px auto 0}
      .home-feature-grid{display:grid;grid-template-columns:1.1fr 1fr 1fr;gap:18px}
      .home-feature-core{grid-row:span 2;display:flex;flex-direction:column;justify-content:space-between}
      .home-feature-card{min-height:168px}
      @media(max-width:900px){
        .nav-links{display:none!important}
        .hamburger{display:flex!important}
        .grid-hero{grid-template-columns:1fr!important}
        .grid-3{grid-template-columns:1fr 1fr!important}
        .grid-4{grid-template-columns:1fr 1fr!important}
        .grid-plan{grid-template-columns:1fr!important}
        .grid-profile{grid-template-columns:1fr!important}
        .footer-grid{grid-template-columns:1fr 1fr!important}
        .filter-select,.filter-select.city{width:calc(50% - 4px)!important}
        .filter-search{width:100%!important;min-width:100%!important}
        .filter-actions{margin-left:0}
        .hero-stats{grid-template-columns:1fr 1fr 1fr!important}
        .home-feature-grid{grid-template-columns:1fr 1fr!important}
        .home-feature-core{grid-row:span 1}
        .page-wrap,.page-wrap-wide{padding:26px 20px}
        .dashboard-hero{padding:22px}
      }
      @media(max-width:600px){
        .grid-3{grid-template-columns:1fr!important}
        .grid-4{grid-template-columns:1fr!important}
        .grid-2{grid-template-columns:1fr!important}
        .bento-grid{grid-template-columns:1fr!important}
        .h1-big{font-size:clamp(2rem,10vw,2.25rem)!important;letter-spacing:-0.8px!important}
        .h2-big{font-size:clamp(1.5rem,7vw,1.8rem)!important}
        .sec-pad{padding:56px 16px!important}
        .otp-input{width:40px!important;height:50px!important;font-size:18px!important}
        .sidebar-sticky{position:static!important}
        .dash-4{grid-template-columns:1fr!important}
        .footer-grid{grid-template-columns:1fr!important}
        .filter-select,.filter-select.city,.filter-search{width:100%!important}
        .filter-field{width:100%}
        .filter-actions{width:100%;justify-content:flex-start}
        .search-sticky{position:sticky;top:62px;z-index:110;background:linear-gradient(135deg,rgba(255,255,255,.34),rgba(255,255,255,.16));border:1px solid rgba(255,255,255,.5);border-radius:${T.r};padding:8px;backdrop-filter:blur(18px) saturate(130%);-webkit-backdrop-filter:blur(18px) saturate(130%)}
        .search-sticky button,.search-sticky select,.search-sticky input{min-height:42px!important}
        .hero-stats{grid-template-columns:1fr!important;gap:14px!important}
        .hero-copy{max-width:none}
        .hero-heading{max-width:none!important;font-size:clamp(2.15rem,9vw,2.8rem)!important;letter-spacing:-1.1px!important;line-height:1.02!important}
        .hero-subcopy{text-align:left;font-size:15px}
        .hero-proof-row{margin-bottom:24px}
        .home-feature-grid{grid-template-columns:1fr!important}
        .role-quick-grid{grid-template-columns:1fr 1fr!important}
        .home-feature-card{min-height:auto}
        .section-intro{margin-bottom:40px}
        .page-wrap,.page-wrap-wide{padding:20px 14px}
        .toast{left:14px;right:14px;bottom:14px;max-width:none}
        .assist-bar{left:12px;right:12px;transform:none;justify-content:center;border-radius:${T.rM};padding:10px 8px}
      }
      @media(max-width:420px){
        nav > div{padding:0 14px!important}
        .sec-pad{padding:48px 14px!important}
      }
      @media (prefers-reduced-motion: reduce){
        .reveal{opacity:1!important;transform:none!important;transition:none!important}
      }
    `}</style>
  );
}

// --- HELPERS -------------------------------------------------
function row(align, justify, gap) {
  return { display:"flex", alignItems:align||"center", justifyContent:justify||"flex-start", gap:gap||0, flexWrap:"wrap" };
}
function col(gap) { return { display:"flex", flexDirection:"column", gap:gap||0 }; }
function card(p, extra) { return Object.assign({ background:"linear-gradient(145deg,rgba(255,255,255,.5) 0%,rgba(248,251,254,.26) 100%)", border:"1px solid rgba(255,255,255,.58)", borderRadius:T.rM, padding:p||24, boxShadow:"0 12px 30px rgba(15,23,42,.08),inset 0 1px 0 rgba(255,255,255,.5)", backdropFilter:"blur(16px) saturate(120%)", WebkitBackdropFilter:"blur(16px) saturate(120%)" }, extra||{}); }
var inp = { width:"100%", background:"#F8FAFC", border:"1.5px solid #E2E8F0", borderRadius:T.r, padding:"11px 14px", fontSize:14, outline:"none", transition:"border-color 0.15s" };
var liquidControlStyle = { background:"linear-gradient(180deg,rgba(255,255,255,.62),rgba(255,255,255,.38))", border:"1px solid rgba(199,218,236,.9)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", boxShadow:"inset 0 1px 0 rgba(255,255,255,.5)" };

var API_BASE_URL = (typeof import.meta !== "undefined" && import.meta && import.meta.env && import.meta.env.VITE_API_BASE_URL
  ? String(import.meta.env.VITE_API_BASE_URL)
  : "http://localhost:8080").replace(/\/$/, "");

function apiUrl(path) {
  return API_BASE_URL + path;
}

async function apiGetWorkers() {
  var res = await fetch(apiUrl("/api/workers?limit=100"));
  if (!res.ok) throw new Error("workers api unavailable");
  var data = await res.json();
  if (!data || !Array.isArray(data.items)) return [];
  return data.items;
}

async function apiSubmitContact(payload) {
  var res = await fetch(apiUrl("/api/contact"), {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify(payload)
  });
  var data = await res.json().catch(function(){ return {}; });
  if (!res.ok) throw new Error(data.message || "contact submit failed");
  return data;
}

function initialsFromName(name) {
  var words = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "WK";
  if (words.length===1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function mapWorkerFromApi(worker, index) {
  var palette = ["#14B8A6", "#8B5CF6", "#F59E0B", "#0EA5E9", "#EF4444", "#22C55E", "#6366F1", "#EC4899"];
  var city = normalizeCityName(worker.city || "Hyderabad");
  var score = Number(worker.rating || worker.score || 4.5);
  var safeScore = Number.isFinite(score) ? Math.min(5, Math.max(3.5, score)) : 4.5;
  var skills = Array.isArray(worker.skills) && worker.skills.length ? worker.skills : [String(worker.role || "General Work")];
  var exp = Number(worker.exp || (2 + (index % 8)));
  var safeExp = Number.isFinite(exp) ? Math.max(1, exp) : 3;
  var salaryAmount = Number(worker.salaryAmount || (9000 + (index % 6) * 1500));
  var jobs = [{
    emp:"Verified Employer",
    role:String(worker.role || "Worker"),
    dur:"2024-Present",
    rating:Math.round(safeScore),
    review:"Reliable and verified worker.",
    verified:true,
    date:"2026"
  }];

  return {
    id:Number(worker.id) || (9000 + index),
    name:String(worker.name || "Worker"),
    role:String(worker.role || "General Worker"),
    city:city,
    area:String(worker.area || city),
    verified:worker.verified!==false,
    score:safeScore,
    reviews:Number(worker.reviews || (20 + index * 3)),
    exp:safeExp,
    skills:skills,
    bio:String(worker.bio || ("Verified " + String(worker.role || "worker") + " available in " + city + ".")),
    salary:String(salaryAmount.toLocaleString("en-IN") + "/mo"),
    avi:initialsFromName(worker.name),
    color:palette[index % palette.length],
    avail:String(worker.avail || "Available"),
    lang:Array.isArray(worker.lang) && worker.lang.length ? worker.lang : (city==="Hyderabad" ? ["Telugu", "Hindi"] : ["Hindi", "English"]),
    since:String(worker.since || String(2018 + (index % 6))),
    completePct:Number(worker.completePct || (88 + (index % 10))),
    badges:Array.isArray(worker.badges) && worker.badges.length ? worker.badges : ["Verified"],
    jobs:jobs
  };
}

// --- ATOMS ---------------------------------------------------
function Chip(props) {
  var label=props.label, color=props.color||T.teal, size=props.size||11, dot=props.dot;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:color+"18", color:color, border:"1px solid "+color+"28", borderRadius:T.rX, padding:"4px "+(size+2)+"px", fontSize:size, fontWeight:700, whiteSpace:"nowrap" }}>
      {dot && <span style={{ width:6, height:6, borderRadius:"50%", background:color, flexShrink:0 }} />}
      {label}
    </span>
  );
}

function Stars(props) {
  var n=props.n||0, size=props.size||14, interactive=props.interactive, onChange=props.onChange;
  var hover = useState(0);
  var hoverVal = hover[0], setHover = hover[1];
  return (
    <span style={row("center","flex-start",3)}>
      {[1,2,3,4,5].map(function(s) {
        return (
          <span key={s} style={{ fontSize:size, color:s<=(hoverVal||n)?T.gold:"#E2E8F0", cursor:interactive?"pointer":"default", lineHeight:1, transition:"color 0.1s" }}
            onMouseEnter={function(){ if(interactive) setHover(s); }}
            onMouseLeave={function(){ if(interactive) setHover(0); }}
            onClick={function(){ if(interactive && onChange) onChange(s); }}>
            &#9733;
          </span>
        );
      })}
    </span>
  );
}

function Score(props) {
  var n=props.n, count=props.count;
  var c = n>=4.7?T.green:n>=4.3?T.tealM:T.amber;
  return (
    <span style={Object.assign(row("center","flex-start",5), { background:c+"14", border:"1px solid "+c+"22", borderRadius:T.rX, padding:"4px 11px" })}>
      <span style={{ fontSize:12, color:T.gold }}>&#9733;</span>
      <span style={{ fontSize:13, fontWeight:800, color:c }}>{n.toFixed(1)}</span>
      {count!==undefined && <span style={{ fontSize:11, color:T.muted }}>({count})</span>}
    </span>
  );
}

function Avi(props) {
  var text=props.text, bg=props.bg, size=props.size||44, r=props.r||12, ring=props.ring;
  return (
    <div style={{ width:size, height:size, borderRadius:r, background:bg, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.33, fontWeight:800, color:"#fff", fontFamily:"'Syne',system-ui", boxShadow:ring?"0 0 0 2px "+T.base+",0 0 0 4px "+T.teal:undefined }}>
      {text}
    </div>
  );
}

function TrustLevel(props) {
  var score=props.score;
  var lvl = score>=4.8 ? { label:"Platinum", c:"#94A3B8", icon:"Plat." }
    : score>=4.5 ? { label:"Gold", c:T.amber, icon:"Gold" }
    : score>=4.0 ? { label:"Silver", c:"#8B9CB6", icon:"Silver" }
    : { label:"Rising", c:T.teal, icon:"Rising" };
  return <Chip label={lvl.label} color={lvl.c} />;
}

function speakText(text) {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  try {
    var utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.92;
    utter.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
    return true;
  } catch {
    return false;
  }
}

var HI_LABELS = {
  "Find Workers":"कामगार खोजें",
  "Pricing":"कीमत",
  "For Societies":"सोसायटी के लिए",
  "For Workers":"कामगारों के लिए",
  "Enterprise":"एंटरप्राइज़",
  "Get started":"शुरू करें",
  "Sign in":"लॉगिन करें",
  "Sign out":"लॉगआउट",
  "Find verified workers":"सत्यापित कामगार खोजें",
  "I am a worker":"मैं कामगार हूँ",
  "Read Aloud":"आवाज़ में सुनें",
  "View Profile and Hire":"प्रोफाइल देखें और हायर करें",
  "Overview":"सारांश",
  "Wallet":"वॉलेट",
  "Ratings":"रेटिंग",
  "Job Matches":"जॉब मैच",
  "Work Planner":"कार्य योजना",
  "Daily Board":"दैनिक बोर्ड",
  "Profile":"प्रोफाइल",
  "My Workers":"मेरे कामगार",
  "Post Job":"जॉब पोस्ट करें",
  "Ops Desk":"ऑप्स डेस्क",
  "History":"इतिहास",
  "Dashboard":"डैशबोर्ड",
  "Entry Log":"एंट्री लॉग",
  "Registry":"रजिस्ट्री",
  "Approvals":"स्वीकृतियाँ",
  "Incident Desk":"घटना डेस्क",
  "Notices":"सूचनाएँ",
  "Verifications":"सत्यापन",
  "Users":"यूज़र्स",
  "Revenue":"राजस्व",
  "Risk":"जोखिम",
  "Reports":"रिपोर्ट्स",
  "View Matches":"मैच देखें",
  "Edit Profile":"प्रोफाइल बदलें",
  "Apply":"आवेदन करें",
  "Save Changes":"बदलाव सेव करें",
  "Save Planner":"योजना सेव करें",
  "Open Recommended Jobs":"सुझाए गए जॉब खोलें",
  "Post Quick Job":"त्वरित जॉब पोस्ट",
  "Approve All Pending Payouts":"सभी लंबित भुगतान मंजूर करें",
  "Read Dashboard":"डैशबोर्ड सुनें",
  "Open Risk Desk":"जोखिम डेस्क खोलें",
  "Open Verification Queue":"सत्यापन कतार खोलें",
  "View Health Reports":"हेल्थ रिपोर्ट देखें",
  "Review Queue":"कतार देखें",
  "Approve Batch":"बैच मंजूर करें",
  "Watchlist":"वॉचलिस्ट",
  "Resolve":"समाधान करें",
  "Find Worker":"कामगार खोजें",
  "Help/Login":"मदद/लॉगिन",
  "Easy Mode":"सरल मोड",
  "Easy ON":"सरल मोड चालू",
  "Why families switch":"परिवार क्यों बदल रहे हैं",
  "Transparent cost planner":"पारदर्शी लागत योजनाकार",
  "Expected monthly platform fee":"अनुमानित मासिक प्लेटफ़ॉर्म शुल्क",
  "Households":"घर",
  "Workers required":"आवश्यक कामगार",
  "Service model":"सेवा मॉडल",
  "Standard":"मानक",
  "Priority":"प्राथमिक",
  "View pricing":"कीमत देखें",
  "Talk to support":"सहायता से बात करें",
  "Trust promises":"विश्वास वादे",
  "Replacement ready":"रिप्लेसमेंट तैयार",
  "Fast response":"तेज़ प्रतिक्रिया",
  "With police/background checks":"पुलिस/पृष्ठभूमि जांच सहित",
  "Clear promise":"स्पष्ट वादा",
  "Pay only after join":"जॉइन के बाद भुगतान",
  "1-tap replacement request":"1-टैप रिप्लेसमेंट अनुरोध",
  "Track support ticket":"सपोर्ट टिकट ट्रैक करें",
};

var HI_TEXT = {
  "Secure access for workers, employers, societies, and administrators":"कामगार, नियोक्ता, सोसायटी और एडमिन के लिए सुरक्षित प्रवेश",
  "Who are you?":"आप कौन हैं?",
  "Select the operating role you want to access.":"जिस भूमिका में लॉगिन करना है, उसे चुनें।",
  "Enter mobile":"मोबाइल नंबर दर्ज करें",
  "A verification code will be sent to your registered mobile number.":"आपके पंजीकृत मोबाइल पर सत्यापन कोड भेजा जाएगा।",
  "Enter OTP":"ओटीपी दर्ज करें",
  "Your full name":"पूरा नाम",
  "Demo mode - any OTP works":"डेमो मोड - कोई भी ओटीपी चलेगा",
  "Find Verified Workers":"सत्यापित कामगार खोजें",
  "Smart discovery with proximity, trust intelligence, shortlist, compare, and interview scheduling.":"लोकेशन, ट्रस्ट स्कोर, शॉर्टलिस्ट, तुलना और इंटरव्यू शेड्यूल के साथ स्मार्ट खोज।",
  "Preference profile:":"पसंद प्रोफाइल:",
  "Max budget":"अधिकतम बजट",
  "Reset prefs":"पसंद रीसेट",
  "Search":"खोज",
  "Name, skill or role":"नाम, कौशल या भूमिका",
  "Role":"भूमिका",
  "City":"शहर",
  "Min Rating":"न्यूनतम रेटिंग",
  "Sort By":"क्रमबद्ध करें",
  "Availability":"उपलब्धता",
  "Language":"भाषा",
  "Radius":"दायरा",
  "Verified only":"केवल सत्यापित",
  "Clear":"साफ करें",
  "Quick skill:":"त्वरित कौशल:",
  "Recent search:":"हाल की खोज:",
  "Continue browsing:":"जहाँ छोड़ा था वहीं से:",
  "Preset name":"प्रिसेट नाम",
  "Apply preset...":"प्रिसेट लागू करें...",
  "Your shortlist":"आपकी शॉर्टलिस्ट",
  "Clear shortlist":"शॉर्टलिस्ट साफ करें",
  "Action complete":"क्रिया पूरी",
  "Update":"अपडेट",
  "Overview":"सारांश",
  "Latest Verified Reviews":"नवीनतम सत्यापित समीक्षाएँ",
  "Edit Profile":"प्रोफाइल बदलें",
  "About You":"आपके बारे में",
  "Availability and Goals":"उपलब्धता और लक्ष्य",
  "Availability status":"उपलब्धता स्थिति",
  "Monthly income goal (Rs.)":"मासिक आय लक्ष्य (रु.)",
  "Hours available per week":"साप्ताहिक उपलब्ध घंटे",
  "Projected Outcomes":"अनुमानित परिणाम",
  "Suggested matches/week":"संभावित मैच/सप्ताह",
  "Estimated income reach":"अनुमानित आय",
  "Profile priority":"प्रोफाइल प्राथमिकता",
  "Back":"वापस",
  "Back to Search":"खोज पर वापस",
  "View":"देखें",
  "Book":"बुक करें",
  "Quick Book":"त्वरित बुकिंग",
  "Interview":"इंटरव्यू",
  "Approve":"मंजूर",
  "Reject":"अस्वीकार",
  "Escalate":"एस्केलेट करें",
  "Flag":"फ्लैग करें",
  "Saved":"सहेजा गया",
  "Shortlist":"शॉर्टलिस्ट",
  "Clear compare":"तुलना साफ करें",
  "Competitor audit: users value transparent pricing, replacement guarantee, and quick support.":"प्रतियोगी विश्लेषण: उपयोगकर्ताओं को पारदर्शी कीमत, रिप्लेसमेंट गारंटी और तेज़ सहायता चाहिए।",
  "Simple promise layer inspired by top platforms, without making the flow complex.":"शीर्ष प्लेटफॉर्म की अच्छी बातें, बिना प्रक्रिया जटिल किए।",
  "No hidden fees":"कोई छिपी फीस नहीं",
  "Visible replacement SLA":"स्पष्ट रिप्लेसमेंट SLA",
  "Live support tracking":"लाइव सपोर्ट ट्रैकिंग",
};

var APP_LANG = "en";
function setAppLanguage(lang) {
  APP_LANG = lang === "hi" ? "hi" : "en";
}

function trS(text) {
  if (typeof text !== "string") return text;
  var hindi = HI_TEXT[text] || HI_LABELS[text];
  if (APP_LANG === "hi" && hindi) return hindi;
  return text;
}

function biText(text) {
  if (typeof text !== "string") return text;
  var hindi = HI_LABELS[text];
  if (APP_LANG === "hi" && hindi) return hindi;
  return text;
}

function BtnTeal(props) {
  var children=props.children, onClick=props.onClick, full=props.full, disabled=props.disabled, style=props.style||{};
  return (
    <button disabled={disabled} onClick={disabled?undefined:onClick} className="btn-teal"
      style={Object.assign({ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8, background:"linear-gradient(135deg,"+T.teal+","+T.tealM+")", color:T.base, border:"none", borderRadius:T.r, padding:"12px 24px", fontSize:14, fontWeight:700, fontFamily:"'Plus Jakarta Sans',system-ui", cursor:disabled?"not-allowed":"pointer", opacity:disabled?0.45:1, boxShadow:"0 4px 20px "+T.tealGlow, transition:"filter 0.15s,transform 0.15s", width:full?"100%":undefined }, style)}>
      {biText(children)}
    </button>
  );
}

function BtnGhost(props) {
  var children=props.children, onClick=props.onClick, full=props.full, dark=props.dark, style=props.style||{};
  return (
    <button onClick={onClick} className="btn-ghost"
      style={Object.assign({ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8, background:"transparent", color:dark?T.snow70||"rgba(255,255,255,0.7)":T.body, border:"1.5px solid "+(dark?"rgba(255,255,255,0.25)":"#CBD5E1"), borderRadius:T.r, padding:"12px 24px", fontSize:14, fontWeight:600, fontFamily:"'Plus Jakarta Sans',system-ui", cursor:"pointer", transition:"all 0.2s", width:full?"100%":undefined }, style)}>
      {biText(children)}
    </button>
  );
}

function BtnViolet(props) {
  var children=props.children, onClick=props.onClick, full=props.full, style=props.style||{};
  return (
    <button onClick={onClick} className="btn-teal"
      style={Object.assign({ display:"inline-flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,"+T.violet+",#6D28D9)", color:"#fff", border:"none", borderRadius:T.r, padding:"12px 24px", fontSize:14, fontWeight:700, fontFamily:"'Plus Jakarta Sans',system-ui", cursor:"pointer", boxShadow:"0 4px 20px "+T.violetGlow, transition:"filter 0.15s,transform 0.15s", width:full?"100%":undefined }, style)}>
      {biText(children)}
    </button>
  );
}

function BtnAmber(props) {
  var children=props.children, onClick=props.onClick, full=props.full, style=props.style||{};
  return (
    <button onClick={onClick} className="btn-teal"
      style={Object.assign({ display:"inline-flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,"+T.amber+",#F97316)", color:"#fff", border:"none", borderRadius:T.r, padding:"12px 24px", fontSize:14, fontWeight:700, fontFamily:"'Plus Jakarta Sans',system-ui", cursor:"pointer", boxShadow:"0 4px 20px rgba(245,158,11,0.3)", transition:"filter 0.15s,transform 0.15s", width:full?"100%":undefined }, style)}>
      {biText(children)}
    </button>
  );
}

// --- DATA ----------------------------------------------------
var WORKERS = [
  { id:201, name:"Shabbir Pasha", role:"Driver", city:"Hyderabad", area:"Zaheerabad", verified:true, score:4.8, reviews:44, exp:9, skills:["Safe Driving","Intercity Route","Vehicle Upkeep","Client Care"], bio:"9 years driving experience on Hyderabad-Zaheerabad routes. Clean safety record and punctual service.", salary:"17,500/mo", avi:"SP", color:"#00D9B8", avail:"Available", lang:["Urdu","Telugu","Hindi"], since:"2016", completePct:98, badges:["Safe Driver","Police Verified"], jobs:[{ emp:"Patancheru Industrial Family", role:"Personal Driver", dur:"2020-Present", rating:5, review:"Reliable on long routes and very polite.", verified:true, date:"2025" }] },
  { id:202, name:"Anasuya Devi", role:"Domestic Helper", city:"Hyderabad", area:"Sangareddy", verified:true, score:4.7, reviews:36, exp:8, skills:["Cooking","Cleaning","Elder Support","Laundry"], bio:"8 years domestic support across Sangareddy and outskirts. Known for hygienic cooking and discipline.", salary:"13,800/mo", avi:"AD", color:"#9C66FF", avail:"Available", lang:["Telugu","Hindi"], since:"2017", completePct:96, badges:["Top Rated","Police Verified"], jobs:[{ emp:"Rao Family", role:"Cook & Home Support", dur:"2019-Present", rating:5, review:"Dependable and excellent at daily meal prep.", verified:true, date:"2025" }] },
  { id:203, name:"Rahim Uddin", role:"Plumber", city:"Hyderabad", area:"Zaheerabad", verified:true, score:4.9, reviews:41, exp:10, skills:["Leak Repair","Bore Line Fitting","Bathroom Fixtures","Emergency Plumbing"], bio:"10 years plumbing in Zaheerabad belt with strong emergency response. Trusted by local apartments.", salary:"920/hr", avi:"RU", color:"#1FCB88", avail:"Available", lang:["Urdu","Hindi","Telugu"], since:"2015", completePct:99, badges:["Licensed","Emergency","Police Verified"], jobs:[{ emp:"Highway Residency", role:"Maintenance Plumber", dur:"2021-Present", rating:5, review:"Fast and accurate repairs every time.", verified:true, date:"2025" }] },
  { id:1, name:"Rekha Devi", role:"Domestic Helper", city:"Hyderabad", area:"Banjara Hills", verified:true, score:4.8, reviews:34, exp:7, skills:["Cooking","Cleaning","Child Care","Elderly Care"], bio:"7 years with families in Banjara Hills & Jubilee Hills. Specialist in South-Indian cooking.", salary:"14,000/mo", avi:"RD", color:"#0D9488", avail:"Available", lang:["Telugu","Hindi"], since:"2017", completePct:98, badges:["Top Rated","Police Verified","Background Check"], jobs:[{ emp:"Sharma Residence", role:"Cook & Help", dur:"Jan 2021-Mar 2024", rating:5, review:"Rekha is exceptional - punctual, trustworthy and an outstanding cook.", verified:true, date:"Mar 2024" }] },
  { id:2, name:"Ravi Reddy", role:"Plumber", city:"Hyderabad", area:"Madhapur", verified:true, score:4.9, reviews:56, exp:11, skills:["Pipe Fitting","Leak Repair","Bathroom Fixtures","Water Purifier"], bio:"Licensed plumber, 11 years. 600+ jobs in Tech Parks & residential. Emergency available.", salary:"900/hr", avi:"RR", color:"#00D9B8", avail:"Available", lang:["Telugu","Hindi","English"], since:"2013", completePct:99, badges:["Licensed","Emergency","Police Verified"], jobs:[{ emp:"Tech Park Towers", role:"Plumbing Maintenance", dur:"2020-Present", rating:5, review:"Solved complex water issues immediately. Very professional.", verified:true, date:"2024" }] },
  { id:3, name:"Malik Khan", role:"Security Guard", city:"Hyderabad", area:"Madhapur", verified:true, score:4.8, reviews:47, exp:12, skills:["Access Control","CCTV","Night Patrol","Emergency Response"], bio:"12 years security. Armed guard trained. CGL certified. Zero incident record.", salary:"16,000/mo", avi:"MK", color:"#0D1B28", avail:"Available", lang:["Telugu","Hindi","Urdu"], since:"2012", completePct:99, badges:["CGL Armed","Police Verified"], jobs:[{ emp:"IT Park Towers", role:"Head Guard", dur:"2018-Present", rating:5, review:"Vigilant & professional. We trust him with our building.", verified:true, date:"2024" }] },
  { id:4, name:"Vimla Rao", role:"Domestic Helper", city:"Hyderabad", area:"Jubilee Hills", verified:true, score:4.7, reviews:38, exp:9, skills:["Cooking","Cleaning","Elderly Care","Child Care"], bio:"9 years housekeeping in premium areas. Expert in vegetarian & non-veg cooking.", salary:"16,000/mo", avi:"VR", color:"#FF9D3D", avail:"Available", lang:["Telugu","Hindi"], since:"2015", completePct:97, badges:["Police Verified","Verified"], jobs:[{ emp:"Gaur Residence", role:"Cook & Maid", dur:"2018-Present", rating:5, review:"Extremely dedicated. Never missed a day.", verified:true, date:"2024" }] },
  { id:5, name:"Anitha Devi", role:"Cook", city:"Hyderabad", area:"Secunderabad", verified:true, score:4.8, reviews:45, exp:7, skills:["Telangana Cuisine","Tiffin Service","Meal Prep","Catering"], bio:"7 years catering. Hyderabadi biryani specialist. Tiffin & meal plans for families.", salary:"12,000/mo", avi:"AN", color:"#FF4B4B", avail:"Available", lang:["Telugu","Hindi"], since:"2017", completePct:96, badges:["Tiffin Service","Verified"], jobs:[{ emp:"Corporate Employees", role:"Tiffin Service", dur:"2020-Present", rating:5, review:"Authentic & delicious. Never disappointed.", verified:true, date:"2024" }] },
  { id:6, name:"Pradeep Kumar", role:"Electrician", city:"Hyderabad", area:"Miyapur", verified:true, score:4.7, reviews:52, exp:10, skills:["Wiring","MCB","Inverter","Solar Installation","AC"], bio:"10 years licensed electrician. Solar specialist. Residential & commercial work.", salary:"800/hr", avi:"PK", color:"#FFB800", avail:"On Job", lang:["Telugu","Hindi"], since:"2014", completePct:97, badges:["Licensed","Solar Certified"], jobs:[{ emp:"Miyapur Complex", role:"Electrician", dur:"2019-Present", rating:5, review:"Very professional and efficient.", verified:true, date:"2024" }] },
  { id:7, name:"Deepa Sharma", role:"Tutor & Childcare", city:"Hyderabad", area:"Banjara Hills", verified:true, score:4.7, reviews:29, exp:8, skills:["English Coaching","Math Tuition","Child Care","Homework"], bio:"8 years tutoring. English & Math specialist for classes 1-8. Very patient.", salary:"7,500/mo", avi:"DS", color:"#9C66FF", avail:"Available", lang:["Telugu","Hindi","English"], since:"2016", completePct:95, badges:["Police Verified"], jobs:[{ emp:"25 Students", role:"Home Tutor", dur:"2018-Present", rating:5, review:"Makes learning very fun.", verified:true, date:"2024" }] },
  { id:8, name:"Sandeep Kumar", role:"Driver", city:"Hyderabad", area:"Begumpet", verified:true, score:4.8, reviews:39, exp:10, skills:["Safe Driving","Vehicle Maintenance","City Navigation","Care"], bio:"10 years driving. Excellent safety. Knows all city routes. Very polite.", salary:"18,000/mo", avi:"SK", color:"#00D9B8", avail:"Available", lang:["Telugu","Hindi","English"], since:"2014", completePct:99, badges:["Safe Driver","Police Verified"], jobs:[{ emp:"Corporate Executive", role:"Personal Driver", dur:"2019-Present", rating:5, review:"Professional and trustworthy.", verified:true, date:"2024" }] },
  { id:9, name:"Arjun Rao", role:"Carpenter", city:"Hyderabad", area:"Kukatpally", verified:true, score:4.7, reviews:35, exp:11, skills:["Furniture Making","Repair","Fitting","Custom Design"], bio:"11 years carpentry. Expert in custom designs. Premium furniture specialist.", salary:"1,000/day", avi:"AR", color:"#FFB800", avail:"Available", lang:["Telugu","Hindi"], since:"2013", completePct:97, badges:["Skilled Craftsman"], jobs:[{ emp:"50+ Families", role:"Furniture", dur:"2016-Present", rating:5, review:"Excellent craftsmanship.", verified:true, date:"2024" }] },
  { id:10, name:"Raman Singh", role:"Plumber", city:"Hyderabad", area:"Miyapur", verified:true, score:4.9, reviews:48, exp:12, skills:["Advanced Plumbing","Leak Detection","Fittings","Installation"], bio:"12 years licensed plumber. Expert in complex repairs. Emergency service.", salary:"950/hr", avi:"RS", color:"#1FCB88", avail:"Available", lang:["Hindi","Telugu"], since:"2012", completePct:100, badges:["Licensed","Emergency","Police Verified"], jobs:[{ emp:"Miyapur Towers", role:"Maintenance", dur:"2020-Present", rating:5, review:"Best plumber!", verified:true, date:"2024" }] },
  { id:11, name:"Suresh Nair", role:"Security Guard", city:"Mumbai", area:"Powai", verified:true, score:4.9, reviews:42, exp:9, skills:["Access Control","CCTV","Emergency","Night Patrol"], bio:"Ex-Army. 9 years security. Zero incident record running.", salary:"18,000/mo", avi:"SN", color:"#7C3AED", avail:"Available", lang:["Malayalam","Hindi","English"], since:"2015", completePct:99, badges:["Ex-Army","Police Verified"], jobs:[{ emp:"Lodha Splendora", role:"Head Guard", dur:"2020-Present", rating:5, review:"Transformed security.", verified:true, date:"2024" }] },
  { id:12, name:"Priya Singh", role:"Cook", city:"Pune", area:"Koregaon Park", verified:true, score:4.4, reviews:19, exp:4, skills:["North Indian","Tiffin Service","Baking","Meal Prep"], bio:"Punjabi & continental cuisine. Daily tiffin for working couples.", salary:"10,000/mo", avi:"PS", color:"#D97706", avail:"Available", lang:["Hindi","Marathi"], since:"2020", completePct:82, badges:["Tiffin Service"], jobs:[{ emp:"Tiwari Family", role:"Cook", dur:"2022-Present", rating:4, review:"Quality and hygienic.", verified:true, date:"2024" }] },
  { id:13, name:"Rajan Kumar", role:"Plumber", city:"Bengaluru", area:"Whitefield", verified:true, score:4.6, reviews:58, exp:12, skills:["Pipe Fitting","Leak Repair","Bathroom Fixtures","Gas Line"], bio:"Licensed plumber, 12 years. 500+ jobs. Emergency 24/7.", salary:"1,200/visit", avi:"RK", color:"#2563EB", avail:"Available", lang:["Kannada","Hindi"], since:"2012", completePct:100, badges:["Licensed","Emergency 24/7"], jobs:[{ emp:"Green Park", role:"Plumber", dur:"2022-Present", rating:5, review:"Fixed burst pipe immediately.", verified:true, date:"2024" }] },
  { id:14, name:"Mohan Das", role:"Electrician", city:"Delhi", area:"Lajpat Nagar", verified:true, score:4.7, reviews:67, exp:15, skills:["Wiring","MCB","Inverter Setup","CCTV","AC Fitting"], bio:"15 years licensed. CPWD-empanelled. Residential & commercial.", salary:"900/hr", avi:"MD", color:"#059669", avail:"On Job", lang:["Hindi","English"], since:"2009", completePct:96, badges:["CPWD","Licensed"], jobs:[{ emp:"DLF Sector 22", role:"Electrician", dur:"2019-Present", rating:5, review:"Professional and reliable.", verified:true, date:"2024" }] },
  { id:15, name:"Fatima Begum", role:"Elderly Care", city:"Hyderabad", area:"Jubilee Hills", verified:true, score:4.9, reviews:28, exp:6, skills:["Patient Care","Medicine Mgmt","Night Care","Physiotherapy"], bio:"Trained elderly carer, 6 years. Mobility & medication support.", salary:"20,000/mo", avi:"FB", color:"#DC2626", avail:"Available", lang:["Telugu","Urdu","Hindi"], since:"2018", completePct:100, badges:["Trained Carer","Police Verified"], jobs:[{ emp:"Reddy Family", role:"Live-in Carer", dur:"2021-Present", rating:5, review:"Wonderful care.", verified:true, date:"2024" }] },
  { id:16, name:"Sophia Sharma", role:"Domestic Helper", city:"Hyderabad", area:"Banjara Hills", verified:true, score:4.6, reviews:31, exp:6, skills:["Cooking","Cleaning","Ironing","Kitchen"] , bio:"6 years housekeeping. Meticulous cleaner. Kitchen expert.", salary:"13,000/mo", avi:"SS", color:"#9C66FF", avail:"Available", lang:["Telugu","Hindi"], since:"2018", completePct:94, badges:["Police Verified"], jobs:[{ emp:"Kumar Family", role:"House Help", dur:"2020-Present", rating:4, review:"Very responsible.", verified:true, date:"2024" }] },
  { id:17, name:"Indira Devi", role:"Elderly Care", city:"Hyderabad", area:"Hyderabad Central", verified:true, score:4.8, reviews:26, exp:6, skills:["Elderly Care","Patient Support","Mobility","Companionship"], bio:"6 years elderly care. Compassionate. Alzheimer's experience.", salary:"17,000/mo", avi:"ID", color:"#FF9D3D", avail:"Available", lang:["Telugu","Hindi"], since:"2018", completePct:98, badges:["Trained","Police Verified"], jobs:[{ emp:"Senior Care", role:"Caregiver", dur:"2020-Present", rating:5, review:"Wonderful person.", verified:true, date:"2024" }] },
  { id:18, name:"Vikram Singh", role:"Guard", city:"Hyderabad", area:"Gachibowli", verified:true, score:4.5, reviews:22, exp:5, skills:["Patrol","Entry Control","Emergency","Vigilance"], bio:"5 years security work. Alert and responsible guard.", salary:"15,000/mo", avi:"VS", color:"#0D1B28", avail:"Available", lang:["Hindi","Telugu"], since:"2019", completePct:91, badges:["Police Verified"], jobs:[{ emp:"Corporate Office", role:"Guard", dur:"2019-Present", rating:4, review:"Alert guard.", verified:true, date:"2024" }] },
  { id:19, name:"Lokesh Kumar", role:"Electrician", city:"Hyderabad", area:"HITEC City", verified:true, score:4.6, reviews:41, exp:9, skills:["Wiring","Repair","Maintenance","Installation"], bio:"9 years electrical work. Fast service. Expert technician.", salary:"750/hr", avi:"LK", color:"#FFB800", avail:"Available", lang:["Telugu","Hindi"], since:"2015", completePct:95, badges:["Licensed","Verified"], jobs:[{ emp:"Tech Companies", role:"Technician", dur:"2018-Present", rating:4, review:"Quick service.", verified:true, date:"2024" }] },
  { id:20, name:"Kavya Rao", role:"Tutor", city:"Hyderabad", area:"Madhapur", verified:true, score:4.8, reviews:33, exp:7, skills:["Science","Math","English","Computer"], bio:"7 years tuition. Excellent track record. Science specialist.", salary:"8,000/mo", avi:"KR", color:"#9C66FF", avail:"Available", lang:["Telugu","Hindi","English"], since:"2017", completePct:97, badges:["Police Verified"], jobs:[{ emp:"30 Students", role:"Tutor", dur:"2018-Present", rating:5, review:"Excellent teacher.", verified:true, date:"2024" }] },
  { id:21, name:"Arun Chandran", role:"Cook", city:"Mumbai", area:"Andheri", verified:true, score:4.7, reviews:48, exp:8, skills:["Marathi Cuisine","Tiffin","Snacks","Meal Prep"], bio:"8 years cooking. Authentic Marathi food. Popular tiffin service.", salary:"11,000/mo", avi:"AC", color:"#FF4B4B", avail:"Available", lang:["Marathi","Hindi"], since:"2016", completePct:96, badges:["Tiffin Service"], jobs:[{ emp:"Families", role:"Cook", dur:"2020-Present", rating:5, review:"Delicious food.", verified:true, date:"2024" }] },
  { id:22, name:"Neha Verma", role:"Domestic Helper", city:"Delhi", area:"Dwarka", verified:true, score:4.5, reviews:29, exp:5, skills:["Cooking","Cleaning","Child Care"], bio:"5 years house help. Reliable and hardworking helper.", salary:"12,000/mo", avi:"NV", color:"#9C66FF", avail:"Available", lang:["Hindi","English"], since:"2019", completePct:90, badges:["Police Verified"], jobs:[{ emp:"Verma Family", role:"Helper", dur:"2020-Present", rating:4, review:"Hardworking.", verified:true, date:"2024" }] },
  { id:23, name:"Prakash Rao", role:"Security Guard", city:"Bengaluru", area:"Marathahalli", verified:true, score:4.8, reviews:44, exp:10, skills:["Access Control","CCTV","Emergency Response"], bio:"10 years security. Professional guard with night shift experience.", salary:"17,000/mo", avi:"PR", color:"#0D1B28", avail:"Available", lang:["Kannada","Hindi"], since:"2014", completePct:99, badges:["Licensed","Police Verified"], jobs:[{ emp:"IT Park", role:"Guard", dur:"2019-Present", rating:5, review:"Excellent guard.", verified:true, date:"2024" }] },
  { id:24, name:"Asha Patel", role:"Cook", city:"Bengaluru", area:"Koramangala", verified:true, score:4.6, reviews:36, exp:7, skills:["Gujarati Cuisine","Tiffin","Vegetarian","Meal Planning"], bio:"7 years cooking. Gujarati food specialist. Meal planning expert.", salary:"10,500/mo", avi:"AP", color:"#FF4B4B", avail:"Available", lang:["Gujarati","Hindi"], since:"2017", completePct:94, badges:["Tiffin Service"], jobs:[{ emp:"Patel Family", role:"Cook", dur:"2019-Present", rating:4, review:"Good food.", verified:true, date:"2024" }] },
  { id:25, name:"Rajesh Kumar", role:"Plumber", city:"Delhi", area:"Rohini", verified:true, score:4.7, reviews:53, exp:11, skills:["Plumbing","Pipe Fitting","Repairs","Water Purifier"], bio:"11 years plumbing. Expert with modern fixtures. Reliable.", salary:"900/hr", avi:"RK", color:"#00D9B8", avail:"Available", lang:["Hindi"], since:"2013", completePct:98, badges:["Licensed","Police Verified"], jobs:[{ emp:"Rohini Society", role:"Plumber", dur:"2019-Present", rating:5, review:"Very reliable.", verified:true, date:"2024" }] },
  { id:26, name:"Sunita Reddy", role:"Elderly Care", city:"Bengaluru", area:"Indiranagar", verified:true, score:4.9, reviews:25, exp:5, skills:["Patient Care","Nursing","Mobility Support","Gentle Care"], bio:"5 years elderly care. Compassionate nurse. Very gentle caregiver.", salary:"19,000/mo", avi:"SR", color:"#DC2626", avail:"Available", lang:["Kannada","Telugu","Hindi"], since:"2019", completePct:100, badges:["Nurse Training","Police Verified"], jobs:[{ emp:"Reddy Family", role:"Nurse", dur:"2021-Present", rating:5, review:"Excellent care.", verified:true, date:"2024" }] },
  { id:27, name:"Rajendra Rao", role:"Carpenter", city:"Bengaluru", area:"Jayanagar", verified:true, score:4.6, reviews:32, exp:9, skills:["Furniture","Custom Design","Repair","Fitting"], bio:"9 years carpentry. Custom furniture expert. Great designs.", salary:"950/day", avi:"RR", color:"#FFB800", avail:"Available", lang:["Kannada","Telugu"], since:"2015", completePct:96, badges:["Skilled"], jobs:[{ emp:"40+ Homes", role:"Carpenter", dur:"2018-Present", rating:4, review:"Good work.", verified:true, date:"2024" }] },
  { id:28, name:"Pooja Singh", role:"Tutor & Childcare", city:"Delhi", area:"Gurugram", verified:true, score:4.7, reviews:38, exp:7, skills:["English","Math","Science","Computer Skills"], bio:"7 years education. Math & Science expert. Great with kids.", salary:"7,000/mo", avi:"PS", color:"#9C66FF", avail:"Available", lang:["Hindi","English"], since:"2017", completePct:96, badges:["Police Verified"], jobs:[{ emp:"20 Students", role:"Tutor", dur:"2018-Present", rating:5, review:"Excellent tutor.", verified:true, date:"2024" }] },
  { id:29, name:"Vijay Sharma", role:"Driver", city:"Mumbai", area:"Vile Parle", verified:true, score:4.5, reviews:27, exp:6, skills:["Driving","Navigation","Vehicle Care","Customer Service"], bio:"6 years driving. Safe driver. Knows all Mumbai routes.", salary:"16,000/mo", avi:"VS", color:"#00D9B8", avail:"Available", lang:["Hindi","Marathi"], since:"2018", completePct:91, badges:["Safe Driver"], jobs:[{ emp:"Corporate", role:"Driver", dur:"2019-Present", rating:4, review:"Good driver.", verified:true, date:"2024" }] },
  { id:30, name:"Lakshmi Devi", role:"Domestic Helper", city:"Bangalore", area:"Whitefield", verified:true, score:4.8, reviews:42, exp:8, skills:["Cooking","Cleaning","Laundry","Kitchen Management"], bio:"8 years housekeeping. Excellent cleaner. Very organized.", salary:"14,000/mo", avi:"LD", color:"#9C66FF", avail:"Available", lang:["Kannada","Telugu","Hindi"], since:"2016", completePct:98, badges:["Police Verified"], jobs:[{ emp:"Tech Workers", role:"Helper", dur:"2019-Present", rating:5, review:"Excellent helper.", verified:true, date:"2024" }] },
  { id:31, name:"Ram Kumar", role:"Security Guard", city:"Hyderabad", area:"HITEC City", verified:true, score:4.7, reviews:35, exp:8, skills:["Building Security","CCTV","Patrol"], bio:"8 years security work at IT companies. Alert & responsible.", salary:"15,500/mo", avi:"RK", color:"#0D1B28", avail:"Available", lang:["Telugu","Hindi"], since:"2016", completePct:95, badges:["Police Verified"], jobs:[{ emp:"Tech Campus", role:"Security", dur:"2019-Present", rating:4, review:"Alert and professional.", verified:true, date:"2024" }] },
  { id:32, name:"Sunita Kumari", role:"Cook", city:"Hyderabad", area:"Gachibowli", verified:true, score:4.6, reviews:28, exp:6, skills:["Home Cooking","Tiffin Service","Meal Preparation"], bio:"6 years cooking. Authentic South Indian & North Indian food.", salary:"11,000/mo", avi:"SK", color:"#FF4B4B", avail:"Available", lang:["Telugu","Hindi"], since:"2018", completePct:92, badges:["Tiffin Service"], jobs:[{ emp:"Families", role:"Cook", dur:"2019-Present", rating:4, review:"Good homestyle food.", verified:true, date:"2024" }] },
  { id:33, name:"Devendra Singh", role:"Plumber", city:"Hyderabad", area:"HITEC City", verified:true, score:4.8, reviews:43, exp:10, skills:["Plumbing","Pipe Fitting","AC Maintenance"], bio:"10 years plumbing. Expert in residential & commercial.", salary:"850/hr", avi:"DS", color:"#00D9B8", avail:"Available", lang:["Hindi","Telugu"], since:"2014", completePct:97, badges:["Licensed","Police Verified"], jobs:[{ emp:"Tech Parks", role:"Plumber", dur:"2019-Present", rating:5, review:"Very professional.", verified:true, date:"2024" }] },
  { id:34, name:"Kavya Kumari", role:"Elderly Care", city:"Hyderabad", area:"Banjara Hills", verified:true, score:4.9, reviews:24, exp:5, skills:["Elderly Care","Patient Support","Mobility Assist"], bio:"5 years elderly care. Very compassionate & gentle caregiver.", salary:"18,500/mo", avi:"KK", color:"#DC2626", avail:"Available", lang:["Telugu","Hindi"], since:"2019", completePct:100, badges:["Trained Caregiver","Police Verified"], jobs:[{ emp:"Senior Family", role:"Caregiver", dur:"2021-Present", rating:5, review:"Amazing care for seniors.", verified:true, date:"2024" }] },
  { id:35, name:"Naresh Rao", role:"Driver", city:"Bangalore", area:"Marathahalli", verified:true, score:4.7, reviews:31, exp:8, skills:["Safe Driving","Vehicle Care","Route Navigation"], bio:"8 years driving experience. Safe & punctual driver.", salary:"16,500/mo", avi:"NR", color:"#00D9B8", avail:"Available", lang:["Kannada","Telugu","Hindi"], since:"2016", completePct:96, badges:["Safe Driver"], jobs:[{ emp:"Corporate Worker", role:"Driver", dur:"2019-Present", rating:4, review:"Reliable driver.", verified:true, date:"2024" }] },
  { id:36, name:"Divya Sharma", role:"Tutor", city:"Bangalore", area:"Indiranagar", verified:true, score:4.8, reviews:37, exp:7, skills:["Math","Science","English","Computer"], bio:"7 years tuition. Science & Math expert. Excellent results.", salary:"8,000/mo", avi:"DV", color:"#9C66FF", avail:"Available", lang:["Kannada","Hindi","English"], since:"2017", completePct:98, badges:["Police Verified"], jobs:[{ emp:"35 Students", role:"Tutor", dur:"2018-Present", rating:5, review:"Outstanding teacher.", verified:true, date:"2024" }] },
  { id:37, name:"Rajesh Kumar", role:"Electrician", city:"Bangalore", area:"Jayanagar", verified:true, score:4.6, reviews:39, exp:9, skills:["Electrical Work","Wiring","Maintenance","Repair"], bio:"9 years electrical work. Reliable & professional.", salary:"800/hr", avi:"RJ", color:"#FFB800", avail:"Available", lang:["Kannada","Hindi"], since:"2015", completePct:94, badges:["Licensed"], jobs:[{ emp:"Homes", role:"Electrician", dur:"2018-Present", rating:4, review:"Good work quality.", verified:true, date:"2024" }] },
  { id:38, name:"Aarthi Reddy", role:"Domestic Helper", city:"Bangalore", area:"Koramangala", verified:true, score:4.7, reviews:36, exp:7, skills:["Cooking","Cleaning","Laundry"], bio:"7 years housekeeping. Expert cleaner. Very reliable.", salary:"13,500/mo", avi:"AR", color:"#9C66FF", avail:"Available", lang:["Kannada","Telugu"], since:"2017", completePct:96, badges:["Police Verified"], jobs:[{ emp:"Families", role:"Helper", dur:"2019-Present", rating:4, review:"Very capable helper.", verified:true, date:"2024" }] },
  { id:39, name:"Vinay Kumar", role:"Security Guard", city:"Mumbai", area:"Andheri", verified:true, score:4.6, reviews:30, exp:7, skills:["Building Security","Entry Control","CCTV"], bio:"7 years security. Alert and responsible guard.", salary:"16,000/mo", avi:"VK", color:"#0D1B28", avail:"Available", lang:["Hindi","Marathi"], since:"2017", completePct:93, badges:["Police Verified"], jobs:[{ emp:"Building", role:"Guard", dur:"2019-Present", rating:4, review:"Good guard.", verified:true, date:"2024" }] },
  { id:40, name:"Chandrika Patel", role:"Cook", city:"Mumbai", area:"Vile Parle", verified:true, score:4.5, reviews:25, exp:5, skills:["Indian Cuisine","Tiffin Service","Meal Prep"], bio:"5 years cooking. Good food quality. Tiffin specialist.", salary:"10,000/mo", avi:"CP", color:"#FF4B4B", avail:"Available", lang:["Marathi","Hindi"], since:"2019", completePct:88, badges:["Tiffin Service"], jobs:[{ emp:"Office Workers", role:"Cook", dur:"2021-Present", rating:4, review:"Decent food.", verified:true, date:"2024" }] },
  { id:41, name:"Arun Mishra", role:"Carpenter", city:"Delhi", area:"Dwarka", verified:true, score:4.7, reviews:33, exp:9, skills:["Furniture","Custom Design","Repair"], bio:"9 years carpentry. Expert in woodwork & designs.", salary:"950/day", avi:"AM", color:"#FFB800", avail:"Available", lang:["Hindi"], since:"2015", completePct:95, badges:["Skilled"], jobs:[{ emp:"Homes", role:"Carpenter", dur:"2018-Present", rating:4, review:"Good craftsmanship.", verified:true, date:"2024" }] },
  { id:42, name:"Geetha Devi", role:"Elderly Care", city:"Delhi", area:"Rohini", verified:true, score:4.8, reviews:22, exp:4, skills:["Patient Care","Nursing","Mobility Support"], bio:"4 years elderly care. Gentle & compassionate caregiver.", salary:"17,000/mo", avi:"GD", color:"#DC2626", avail:"Available", lang:["Hindi"], since:"2020", completePct:98, badges:["Trained Care","Police Verified"], jobs:[{ emp:"Senior Care", role:"Caregiver", dur:"2021-Present", rating:5, review:"Excellent care.", verified:true, date:"2024" }] },
  { id:43, name:"Praveen Singh", role:"Driver", city:"Delhi", area:"Gurugram", verified:true, score:4.7, reviews:28, exp:7, skills:["Professional Driving","Vehicle Care"], bio:"7 years driving. Safe & responsible driver.", salary:"17,000/mo", avi:"PS", color:"#00D9B8", avail:"Available", lang:["Hindi"], since:"2017", completePct:94, badges:["Safe Driver"], jobs:[{ emp:"Corporate", role:"Driver", dur:"2019-Present", rating:4, review:"Professional.", verified:true, date:"2024" }] },
  { id:44, name:"Sathya Kumari", role:"Tutor", city:"Delhi", area:"Dwarka", verified:true, score:4.6, reviews:32, exp:6, skills:["English","Math","Science"], bio:"6 years tuition. Patient teacher. Good results.", salary:"7,000/mo", avi:"SK", color:"#9C66FF", avail:"Available", lang:["Hindi","English"], since:"2018", completePct:92, badges:["Police Verified"], jobs:[{ emp:"30 Students", role:"Tutor", dur:"2018-Present", rating:4, review:"Good teaching.", verified:true, date:"2024" }] },
  { id:45, name:"Harish Kumar", role:"Plumber", city:"Delhi", area:"Gurugram", verified:true, score:4.5, reviews:36, exp:9, skills:["Plumbing", "Pipe Fitting","Repair"], bio:"9 years plumbing. Reliable & professional plumber.", salary:"850/hr", avi:"HK", color:"#00D9B8", avail:"Available", lang:["Hindi"], since:"2015", completePct:91, badges:["Licensed"], jobs:[{ emp:"Homes", role:"Plumber", dur:"2018-Present", rating:4, review:"Decent work.", verified:true, date:"2024" }] },
  { id:46, name:"Seema Joshi", role:"Domestic Helper", city:"Pune", area:"Koregaon Park", verified:true, score:4.8, reviews:39, exp:8, skills:["Cooking","Cleaning","Child Care"], bio:"8 years housekeeping in premium area. Excellent helper.", salary:"13,500/mo", avi:"SJ", color:"#9C66FF", avail:"Available", lang:["Marathi","Hindi"], since:"2016", completePct:97, badges:["Police Verified"], jobs:[{ emp:"Families", role:"Helper", dur:"2019-Present", rating:5, review:"Excellent helper.", verified:true, date:"2024" }] },
  { id:47, name:"Nikhil Sharma", role:"Security Guard", city:"Pune", area:"Koregaon Park", verified:true, score:4.5, reviews:27, exp:6, skills:["Building Security","CCTV","Patrol"], bio:"6 years security. Alert & responsible security guard.", salary:"15,000/mo", avi:"NS", color:"#0D1B28", avail:"Available", lang:["Marathi","Hindi"], since:"2018", completePct:90, badges:["Police Verified"], jobs:[{ emp:"Society", role:"Guard", dur:"2019-Present", rating:4, review:"Good guard.", verified:true, date:"2024" }] },
  { id:48, name:"Vidya Rao", role:"Cook", city:"Hyderabad", area:"Secunderabad", verified:true, score:4.7, reviews:34, exp:7, skills:["Hyderabadi Cuisine","Biryani Specialist","Tiffin"], bio:"7 years cooking. Biryani & Hyderabadi food expert.", salary:"11,500/mo", avi:"VR", color:"#FF4B4B", avail:"Available", lang:["Telugu","Hindi"], since:"2017", completePct:96, badges:["Tiffin Service"], jobs:[{ emp:"Families", role:"Cook", dur:"2019-Present", rating:4, review:"Good biryani.", verified:true, date:"2024" }] },
  { id:49, name:"Ashok Kumar", role:"Electrician", city:"Hyderabad", area:"Miyapur", verified:true, score:4.6, reviews:40, exp:8, skills:["Wiring","MCB","Repair","Maintenance"], bio:"8 years electrical work. Reliable technician.", salary:"750/hr", avi:"AK", color:"#FFB800", avail:"Available", lang:["Telugu","Hindi"], since:"2016", completePct:93, badges:["Licensed"], jobs:[{ emp:"Homes", role:"Electrician", dur:"2018-Present", rating:4, review:"Good work.", verified:true, date:"2024" }] },
  { id:50, name:"Divya Kumari", role:"Tutor & Childcare", city:"Hyderabad", area:"Jubilee Hills", verified:true, score:4.8, reviews:31, exp:6, skills:["English","Math","Science","Computer"], bio:"6 years tutoring. Excellent teacher. Great with kids.", salary:"7,500/mo", avi:"DK", color:"#9C66FF", avail:"Available", lang:["Telugu","Hindi","English"], since:"2018", completePct:97, badges:["Police Verified"], jobs:[{ emp:"20 Students", role:"Home Tutor", dur:"2019-Present", rating:5, review:"Excellent teaching.", verified:true, date:"2024" }] },
]; // 50 verified workers across 5 major Indian cities

var CITY_COORDS = {
  Hyderabad:{ lat:17.3850, lng:78.4867 },
  Bengaluru:{ lat:12.9716, lng:77.5946 },
  Mumbai:{ lat:19.0760, lng:72.8777 },
  Pune:{ lat:18.5204, lng:73.8567 },
  Delhi:{ lat:28.6139, lng:77.2090 },
};

var AREA_COORDS = {
  // Hyderabad
  "Banjara Hills":{ lat:17.4126, lng:78.4482 },
  "Jubilee Hills":{ lat:17.4316, lng:78.4071 },
  Madhapur:{ lat:17.3645, lng:78.4504 },
  Secunderabad:{ lat:17.3726, lng:78.5099 },
  Miyapur:{ lat:17.4928, lng:78.3612 },
  Begumpet:{ lat:17.3919, lng:78.4588 },
  Kukatpally:{ lat:17.4701, lng:78.4328 },
  "HITEC City":{ lat:17.3629, lng:78.3954 },
  Gachibowli:{ lat:17.4415, lng:78.3889 },
  "Hyderabad Central":{ lat:17.3850, lng:78.4867 },
  // Mumbai
  Powai:{ lat:19.1176, lng:72.9060 },
  Andheri:{ lat:19.1136, lng:72.8697 },
  "Vile Parle":{ lat:19.1025, lng:72.8333 },
  // Bengaluru
  Whitefield:{ lat:12.9698, lng:77.7500 },
  Marathahalli:{ lat:12.9632, lng:77.7499 },
  Koramangala:{ lat:12.9352, lng:77.6245 },
  Indiranagar:{ lat:13.0036, lng:77.6412 },
  Jayanagar:{ lat:13.0098, lng:77.5957 },
  // Pune
  "Koregaon Park":{ lat:18.5362, lng:73.8930 },
  // Delhi
  "Lajpat Nagar":{ lat:28.5677, lng:77.2430 },
  Dwarka:{ lat:28.5921, lng:77.0460 },
  Rohini:{ lat:28.7500, lng:77.1500 },
  Gurugram:{ lat:28.4595, lng:77.0266 },
  Zaheerabad:{ lat:17.6836, lng:77.6161 },
  Sangareddy:{ lat:17.6240, lng:78.0868 },
};

var AREA_DISTRICT_INDEX = {
  "Banjara Hills":"Hyderabad",
  "Jubilee Hills":"Hyderabad",
  Madhapur:"Hyderabad",
  Secunderabad:"Hyderabad",
  Miyapur:"Medchal-Malkajgiri",
  Begumpet:"Hyderabad",
  Kukatpally:"Medchal-Malkajgiri",
  "HITEC City":"Ranga Reddy",
  Gachibowli:"Ranga Reddy",
  "Hyderabad Central":"Hyderabad",
  Powai:"Mumbai Suburban",
  Andheri:"Mumbai Suburban",
  "Vile Parle":"Mumbai Suburban",
  Whitefield:"Bengaluru Urban",
  Marathahalli:"Bengaluru Urban",
  Koramangala:"Bengaluru Urban",
  Indiranagar:"Bengaluru Urban",
  Jayanagar:"Bengaluru Urban",
  "Koregaon Park":"Pune",
  "Lajpat Nagar":"South East Delhi",
  Dwarka:"South West Delhi",
  Rohini:"North West Delhi",
  Gurugram:"Gurugram",
  Zaheerabad:"Sangareddy",
  Sangareddy:"Sangareddy",
};

function distanceKm(a, b) {
  if (!a || !b) return null;
  var R = 6371;
  var dLat = (b.lat-a.lat) * Math.PI / 180;
  var dLng = (b.lng-a.lng) * Math.PI / 180;
  var s1 = Math.sin(dLat/2);
  var s2 = Math.sin(dLng/2);
  var x = s1*s1 + Math.cos(a.lat*Math.PI/180) * Math.cos(b.lat*Math.PI/180) * s2*s2;
  var y = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
  return R * y;
}

function normalizeCityName(city) {
  var c = String(city || "").trim().toLowerCase();
  if (c==="bangalore") return "Bengaluru";
  if (c==="gurgaon") return "Gurugram";
  if (c==="secunderbad") return "Secunderabad";
  return c ? (c.charAt(0).toUpperCase() + c.slice(1)) : "";
}

function getAreaCityIndex() {
  return WORKERS.reduce(function(acc, worker) {
    if (!acc[worker.area]) acc[worker.area] = normalizeCityName(worker.city);
    return acc;
  }, {});
}

function cityFromCoords(lat, lng) {
  var point = { lat:lat, lng:lng };
  var areaCityIndex = getAreaCityIndex();

  var area = "";
  var areaBest = Infinity;
  var areaCity = "";
  Object.keys(AREA_COORDS).forEach(function(name) {
    var dArea = distanceKm(point, AREA_COORDS[name]);
    if (dArea!==null && dArea<areaBest) {
      areaBest = dArea;
      area = name;
      areaCity = normalizeCityName(areaCityIndex[name]);
    }
  });

  var city = "";
  var cityBest = Infinity;
  Object.keys(CITY_COORDS).forEach(function(name) {
    var d = distanceKm(point, CITY_COORDS[name]);
    if (d!==null && d<cityBest) {
      cityBest = d;
      city = name;
    }
  });

  var chosenCity = areaCity || city;
  var district = area || "";
  var districtName = AREA_DISTRICT_INDEX[area] || chosenCity || "";
  return { city:chosenCity, district:district, districtName:districtName, areaKm:areaBest, cityKm:cityBest };
}

function parseSalaryAmount(salaryText) {
  if (!salaryText) return 0;
  var m = String(salaryText).match(/\d[\d,]*/);
  if (!m) return 0;
  return Number(m[0].replace(/,/g, "")) || 0;
}

function workerSignals(worker) {
  var responseMins = Math.max(6, Math.round(8 + worker.id*5 + (5-worker.score)*18));
  var repeatHireRate = Math.min(99, Math.round(58 + worker.score*8 + worker.exp*1.2));
  var riskConfidence = Math.min(99, Math.round(62 + (worker.verified?18:0) + worker.score*3 + worker.completePct*0.08));
  return { responseMins:responseMins, repeatHireRate:repeatHireRate, riskConfidence:riskConfidence };
}

var CATS = [
  { icon:"[M]", label:"Domestic Help", n:"4,200+", color:T.tealM },
  { icon:"[W]", label:"Plumbers", n:"1,800+", color:T.violet },
  { icon:"[S]", label:"Security", n:"2,100+", color:"#7C3AED" },
  { icon:"[C]", label:"Cooks", n:"3,400+", color:T.amber },
  { icon:"[E]", label:"Electricians", n:"2,300+", color:T.green },
  { icon:"[O]", label:"Elderly Care", n:"1,400+", color:"#EC4899" },
  { icon:"[D]", label:"Drivers", n:"3,800+", color:"#0EA5E9" },
  { icon:"[B]", label:"Carpenters", n:"900+", color:"#92400E" },
];

// --- NAV -----------------------------------------------------
function Nav(props) {
  var page=props.page, setPage=props.setPage, user=props.user, setUser=props.setUser;
  var easyMode=props.easyMode, setEasyMode=props.setEasyMode;
  var lang=props.lang, setLang=props.setLang;
  var onActionToast=props.onActionToast;
  var menuState = useState(false);
  var menuOpen = menuState[0], setMenuOpen = menuState[1];
  var onDark = page==="landing" || page==="auth" || page==="enterprise";
  var navBg = onDark ? "rgba(6,13,24,0.92)" : "rgba(255,255,255,0.92)";
  var borderC = onDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)";
  var links = [
    { id:"search", l:"Find Workers" },
    { id:"pricing", l:"Pricing" },
    { id:"for-societies", l:"For Societies" },
    { id:"for-workers", l:"For Workers" },
    { id:"enterprise", l:"Enterprise" },
  ];

  function navToast(message) {
    if (onActionToast) onActionToast(message);
  }

  function getDash() {
    if (!user) return "auth";
    if (user.type==="worker") return "worker-dashboard";
    if (user.type==="society") return "society-dashboard";
    if (user.type==="admin") return "admin";
    return "employer-dashboard";
  }

  function AuthButtons() {
    if (user) {
      return (
        <div style={Object.assign(row("center","flex-end",8), { flexWrap:"wrap" })}>
          <button className="compact-btn" onClick={function(){ setLang(lang==="en"?"hi":"en"); }} style={{ background:"none", border:"1px solid "+(onDark?T.glassB:"#E2E8F0"), cursor:"pointer", fontWeight:700, color:onDark?"rgba(255,255,255,0.74)":T.muted, borderRadius:999, padding:"7px 11px", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{lang==="en"?"हिंदी":"English"}</button>
          <button className="compact-btn" onClick={function(){ setEasyMode(function(v){ return !v; }); }} style={{ background:easyMode?T.teal+"22":"none", border:"1px solid "+(easyMode?T.teal:(onDark?T.glassB:"#E2E8F0")), cursor:"pointer", fontWeight:700, color:easyMode?T.teal:(onDark?"rgba(255,255,255,0.62)":T.muted), borderRadius:999, padding:"7px 11px", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{biText(easyMode?"Easy ON":"Easy Mode", true)}</button>
          <div onClick={function(){ setPage(getDash()); }} style={Object.assign(row("center","flex-start",8), { cursor:"pointer", background:onDark?T.glass:T.subtle, borderRadius:T.r, padding:"6px 12px", border:"1px solid "+(onDark?T.glassB:"#E2E8F0") })}>
            <Avi text={user.name[0]} bg={T.tealM} size={26} r={7} />
            <span style={{ fontSize:13, fontWeight:600, color:onDark?"#fff":T.ink }}>{user.name.split(" ")[0]}</span>
          </div>
          <button className="compact-btn" onClick={function(){ setUser(null); setPage("landing"); }} style={{ background:"none", border:"none", cursor:"pointer", color:onDark?"rgba(255,255,255,0.45)":T.muted, fontFamily:"'Plus Jakarta Sans',system-ui" }}>{biText("Sign out", true)}</button>
        </div>
      );
    }
    return (
      <div style={Object.assign(row("center","flex-end",8), { flexWrap:"wrap" })}>
        <button className="compact-btn" onClick={function(){ setLang(lang==="en"?"hi":"en"); }} style={{ background:"none", border:"1px solid "+(onDark?T.glassB:"#E2E8F0"), cursor:"pointer", fontWeight:700, color:onDark?"rgba(255,255,255,0.74)":T.muted, borderRadius:999, padding:"7px 11px", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{lang==="en"?"हिंदी":"English"}</button>
        <button className="compact-btn" onClick={function(){ setEasyMode(function(v){ return !v; }); }} style={{ background:easyMode?T.teal+"22":"none", border:"1px solid "+(easyMode?T.teal:(onDark?T.glassB:"#E2E8F0")), cursor:"pointer", fontWeight:700, color:easyMode?T.teal:(onDark?"rgba(255,255,255,0.62)":T.muted), borderRadius:999, padding:"7px 11px", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{biText(easyMode?"Easy ON":"Easy Mode", true)}</button>
        <button className="compact-btn" onClick={function(){ setPage("auth"); navToast("Opening Sign in."); }} style={{ background:"none", border:"none", cursor:"pointer", fontWeight:600, color:onDark?"rgba(255,255,255,0.7)":T.body, fontFamily:"'Plus Jakarta Sans',system-ui" }}>{biText("Sign in", true)}</button>
        <BtnTeal onClick={function(){ setPage("auth"); navToast("Opening Get started."); }} style={{ padding:"8px 14px", fontSize:12.5 }}>Get started</BtnTeal>
      </div>
    );
  }

  return (
    <div>
      <nav style={{ position:"sticky", top:0, zIndex:200, background:navBg, backdropFilter:"blur(24px)", borderBottom:"1px solid "+borderC }}>
        <div style={Object.assign(row("center","space-between"), { maxWidth:1200, margin:"0 auto", height:60, padding:"0 24px" })}>
          <div onClick={function(){ setPage("landing"); setMenuOpen(false); navToast("Returning to home."); }} style={Object.assign(row("center","flex-start",10), { cursor:"pointer", flexShrink:0 })}>
            <div style={{ width:32, height:32, borderRadius:9, background:"linear-gradient(135deg,"+T.teal+","+T.tealM+")", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontFamily:"'Syne',system-ui", fontWeight:800, color:T.base, flexShrink:0 }}>S</div>
            <span className="font-display" style={{ fontSize:18, fontWeight:800, color:onDark?"#fff":T.ink, letterSpacing:"-0.5px", whiteSpace:"nowrap" }}>Shramik<span style={{ color:T.teal }}>.</span></span>
          </div>

          <div className="nav-links" style={row("center","flex-start",2)}>
            {links.map(function(l) {
              return (
                <button key={l.id} onClick={function(){ setPage(l.id); if (l.id==="search") navToast("Opening Find Workers."); }}
                  className="compact-nav-btn"
                  style={{ background:"none", border:"none", cursor:"pointer", padding:"7px 12px", fontWeight:page===l.id?700:500, color:page===l.id?T.teal:onDark?"rgba(255,255,255,0.7)":T.muted, fontFamily:"'Plus Jakarta Sans',system-ui", borderRadius:8, transition:"color 0.15s" }}>
                  {biText(l.l, true)}
                </button>
              );
            })}
          </div>

          <div style={row("center","flex-end",10)}>
            <div className="nav-links">
              <AuthButtons />
            </div>
            <button className="hamburger" onClick={function(){ setMenuOpen(function(o){ return !o; }); }}
              style={{ background:"none", border:"1px solid "+(onDark?T.glassB:"#E2E8F0"), borderRadius:8, width:38, height:38, cursor:"pointer", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:5, padding:8, flexShrink:0 }}>
              {[0,1,2].map(function(i) {
                return <span key={i} style={{ display:"block", width:18, height:2, background:onDark?"#fff":T.ink, borderRadius:2 }} />;
              })}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="anim-menuslide" style={{ position:"fixed", top:60, left:0, right:0, zIndex:199, background:onDark?"rgba(6,13,24,0.97)":"rgba(255,255,255,0.97)", backdropFilter:"blur(24px)", borderBottom:"1px solid "+borderC, padding:"16px 24px 24px" }}>
          {links.map(function(l) {
            return (
              <button key={l.id} onClick={function(){ setPage(l.id); setMenuOpen(false); if (l.id==="search") navToast("Opening Find Workers."); }}
                style={{ display:"block", width:"100%", textAlign:"left", background:"none", border:"none", cursor:"pointer", padding:"12px 0", fontSize:16, fontWeight:page===l.id?700:500, color:page===l.id?T.teal:onDark?"#fff":T.ink, fontFamily:"'Plus Jakarta Sans',system-ui", borderBottom:"1px solid "+borderC }}>
                {biText(l.l, true)}
              </button>
            );
          })}
          <div style={{ marginTop:16 }}><AuthButtons /></div>
        </div>
      )}
    </div>
  );
}

// --- LANDING -------------------------------------------------
function Landing(props) {
  var setPage=props.setPage, setUser=props.setUser;
  var easyMode=props.easyMode, setEasyMode=props.setEasyMode;
  var cState = useState({ w:0, s:0, r:0 });
  var counts=cState[0], setCounts=cState[1];

  useEffect(function() {
    var tgt = { w:24100, s:1280, r:98200 };
    var f = 0, FRAMES = 80;
    var timer = setInterval(function() {
      f++;
      var p = f/FRAMES;
      var ease = 1 - Math.pow(1-p, 3);
      setCounts({ w:Math.floor(tgt.w*ease), s:Math.floor(tgt.s*ease), r:Math.floor(tgt.r*ease) });
      if (f>=FRAMES) clearInterval(timer);
    }, 18);
    return function() { clearInterval(timer); };
  }, [setCounts]);

  var wiState = useState(0);
  var wi=wiState[0], setWi=wiState[1];
  var words = ["trusted","portable","compliant","verified"];
  var roadmapState = useState("assist");
  var roadmapMsgState = useState("");
  var sandboxKeyState = useState("");
  var roadmap = roadmapState[0], setRoadmap = roadmapState[1];
  var roadmapMsg = roadmapMsgState[0], setRoadmapMsg = roadmapMsgState[1];
  var sandboxKey = sandboxKeyState[0], setSandboxKey = sandboxKeyState[1];
  var planHomesState = useState("1");
  var planWorkersState = useState("2");
  var planModelState = useState("standard");
  var planHomes = planHomesState[0], setPlanHomes = planHomesState[1];
  var planWorkers = planWorkersState[0], setPlanWorkers = planWorkersState[1];
  var planModel = planModelState[0], setPlanModel = planModelState[1];

  var homeCount = Number(planHomes || 0);
  var workerCount = Number(planWorkers || 0);
  var basePlatform = homeCount >= 3 ? 499 : 199;
  var perWorkerFee = planModel === "priority" ? 399 : 249;
  var estimatedFee = Math.max(0, basePlatform + (workerCount * perWorkerFee));
  useEffect(function() {
    var timer = setInterval(function() { setWi(function(i){ return (i+1)%words.length; }); }, 2400);
    return function() { clearInterval(timer); };
  }, [setWi, words.length]);

  function roadmapAction(type) {
    if (type==="assist") {
      speakText("Worker Assist enabled. Hindi labels and voice guidance active.");
      setRoadmapMsg("Worker Assist activated: voice guidance and easy flow are enabled.");
      return;
    }
    if (type==="ops") {
      setRoadmapMsg("Smart Ops simulated: 2 high-risk entry patterns auto-flagged for review.");
      return;
    }
    if (type==="finance") {
      setUser({ name:"Worker Demo", type:"worker", id:120 });
      setPage("worker-dashboard");
      setRoadmapMsg("Trust Finance path opened in Worker dashboard.");
      return;
    }
    var key = "SHRAMIK-SANDBOX-"+Math.random().toString(36).slice(2,10).toUpperCase();
    setSandboxKey(key);
    setRoadmapMsg("Sandbox API key generated for integration pilot.");
  }

  return (
    <div>
      {/* HERO */}
      <section className="mesh-bg dot-bg" style={{ padding:"88px 32px 100px", overflow:"hidden", position:"relative" }}>
        <div style={{ position:"absolute", top:"15%", left:"8%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,229,195,0.12) 0%,transparent 70%)", pointerEvents:"none", filter:"blur(40px)" }} />
        <div style={{ position:"absolute", top:"30%", right:"5%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,0.10) 0%,transparent 70%)", pointerEvents:"none", filter:"blur(40px)" }} />

        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>
          <div className="grid-hero" style={{ display:"grid", gridTemplateColumns:"minmax(0,1.08fr) minmax(360px,.92fr)", gap:64, alignItems:"center" }}>

            {/* Left */}
            <div className="anim-fadeup hero-copy">
              <div style={Object.assign(row("center","flex-start",8), { marginBottom:28 })}>
                <div className="hero-kicker">
                  <div style={{ width:7, height:7, borderRadius:"50%", background:T.teal, animation:"pulse 2s infinite" }} />
                  <span style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.7)", letterSpacing:0.5 }}>India's trusted worker identity network</span>
                </div>
              </div>

              <h1 className="font-display h1-big hero-heading" style={{ fontWeight:800, color:"#fff", marginBottom:16 }}>
                Hire trusted workers, faster.
              </h1>
              <p className="hero-subcopy" style={{ marginBottom:22 }}>Verified identity, clear pricing, replacement support, and simple flows for families, workers, societies, and enterprises.</p>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.78)", fontWeight:700, marginBottom:18 }}>Built for {words[wi]} operations.</div>
              <div style={{ marginBottom:20 }}>
                <span className="easy-chip">Simple screens • Big actions • Hindi-friendly flow</span>
              </div>
              <div className="hero-proof-row anim-fadeup-1">
                {[
                  "Pay only after joining",
                  "Replacement request in one tap",
                  "Police/background-verified profiles"
                ].map(function(item) {
                  return (
                    <div key={item} className="hero-proof-pill">
                      <span style={{ width:7, height:7, borderRadius:"50%", background:T.teal, flexShrink:0 }} />
                      <span>{item}</span>
                    </div>
                  );
                })}
              </div>

              <div style={Object.assign(row("center","flex-start",14), { marginBottom:44 })}>
                <BtnTeal onClick={function(){ setPage("search"); }} style={{ padding:"14px 28px", fontSize:15 }}>Find verified workers</BtnTeal>
                <BtnGhost onClick={function(){ setPage("for-workers"); }} dark={true} style={{ padding:"14px 24px", fontSize:14 }}>I am a worker</BtnGhost>
                <BtnGhost onClick={function(){ var ok = speakText("Shramik helps workers and families hire safely. Use big easy buttons below to start."); if(!ok) setRoadmapMsg("Audio read is unavailable in this browser."); }} dark={true} style={{ padding:"14px 18px", fontSize:14 }}>Read Aloud</BtnGhost>
              </div>

              <div className="hero-stats">
                {[[counts.w.toLocaleString()+"+","Verified workers"],[counts.s.toLocaleString()+"+","Societies"],[Math.floor(counts.r/1000)+"K+","Verified ratings"]].map(function(item) {
                  return (
                    <div key={item[1]}>
                      <div className="font-display" style={{ fontSize:30, fontWeight:800, color:T.teal, lineHeight:1 }}>{item[0]}</div>
                      <div style={{ fontSize:13, color:"rgba(255,255,255,0.45)", marginTop:4 }}>{item[1]}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right card */}
            <div className="anim-float anim-fadeup-1" style={{ position:"relative" }}>
              <div className="hero-card-shell">
                <div style={Object.assign(row("flex-start","space-between"), { marginBottom:20 })}>
                  <div style={row("flex-start","flex-start",14)}>
                    <Avi text="RD" bg={T.tealM} size={54} r={14} ring={true} />
                    <div>
                      <div className="font-display" style={{ fontSize:17, fontWeight:800, color:"#fff" }}>Rekha Devi</div>
                      <div style={{ fontSize:12, color:"rgba(255,255,255,0.5)", marginTop:2 }}>Domestic Helper - 7 yrs</div>
                      <div style={{ marginTop:6 }}><Chip label="Verified" color={T.teal} /></div>
                    </div>
                  </div>
                  <Score n={4.8} count={34} />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:18 }}>
                  {[["7 yrs","Experience"],["34","Reviews"],["98%","Completion"]].map(function(item) {
                    return (
                      <div key={item[1]} style={{ background:T.glass, borderRadius:10, padding:"12px 10px", textAlign:"center", border:"1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ fontSize:16, fontWeight:800, color:T.teal }}>{item[0]}</div>
                        <div style={{ fontSize:10, color:"rgba(255,255,255,0.45)", marginTop:2 }}>{item[1]}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ background:T.glass, borderRadius:12, padding:"12px 14px", marginBottom:18 }}>
                  <div style={{ fontSize:11, color:T.teal, fontWeight:700, marginBottom:5 }}>Latest Review</div>
                  <p style={{ fontSize:12.5, color:"rgba(255,255,255,0.65)", fontStyle:"italic", lineHeight:1.65 }}>"Rekha is exceptional - punctual, honest, and an outstanding cook."</p>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", marginTop:5 }}>- Sharma Family, Banjara Hills</div>
                </div>
                <BtnTeal onClick={function(){ setPage("search"); }} full={true} style={{ padding:"11px", fontSize:13.5 }}>View Profile and Hire</BtnTeal>
              </div>
              <div style={{ position:"absolute", top:-18, right:-24, background:"rgba(12,24,41,0.9)", backdropFilter:"blur(12px)", border:"1px solid rgba(0,229,195,0.3)", borderRadius:12, padding:"9px 14px", transform:"rotate(2deg)", fontSize:12, color:"rgba(255,255,255,0.8)", fontWeight:600, whiteSpace:"nowrap" }}>Hired in 18 min</div>
              <div style={{ position:"absolute", bottom:28, left:-32, background:"rgba(12,24,41,0.9)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:12, padding:"9px 14px", transform:"rotate(-2deg)", fontSize:12, color:"rgba(255,255,255,0.7)", fontWeight:600, whiteSpace:"nowrap" }}>Police Verified</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST RIBBON */}
      <div style={{ background:T.l1, borderTop:"1px solid rgba(255,255,255,0.06)", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"15px 0", overflow:"hidden" }}>
        <div className="marquee">
          {["Prestige Group","DLF Residencies","Brigade Society","Lodha Living","Sobha Complexes","Godrej Properties","Puravankara","Shapoorji Pallonji","Embassy Group","Phoenix Mills","Prestige Group","DLF Residencies","Brigade Society","Lodha Living","Sobha Complexes","Godrej Properties"].map(function(s, i) {
            return <span key={i} style={{ padding:"0 44px", fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.25)", whiteSpace:"nowrap" }}>{s}</span>;
          })}
        </div>
      </div>

      <section className="sec-pad reveal" data-reveal="true" style={{ padding:"64px 32px", background:T.offwhite, borderBottom:"1px solid #E8EDF4" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={Object.assign(row("center","space-between"), { marginBottom:20, gap:10 })}>
            <div>
              <Chip label="ONE TAP START" color={T.teal} size={11} />
              <h2 className="font-display" style={{ fontSize:28, fontWeight:800, color:T.ink, marginTop:10 }}>No confusion. Start in one tap.</h2>
            </div>
            <button onClick={function(){ setEasyMode(function(v){ return !v; }); }} style={{ border:"1px solid "+(easyMode?T.teal:T.borderM), background:easyMode?T.teal+"15":T.white, color:easyMode?T.tealM:T.body, borderRadius:999, padding:"10px 14px", fontSize:12.5, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>
              {easyMode?"Easy Mode On":"Turn On Easy Mode"}
            </button>
          </div>
          <div className="role-quick-grid">
            {[
              ["Worker", "काम चाहिए", T.amber, function(){ setUser({ name:"Worker Demo", type:"worker", id:120 }); setPage("worker-dashboard"); }],
              ["Family", "मदद चाहिए", T.teal, function(){ setUser({ name:"Family Demo", type:"employer", id:121 }); setPage("search"); }],
              ["Society", "गेट और रजिस्टर", T.violet, function(){ setUser({ name:"Society Demo", type:"society", id:122 }); setPage("society-dashboard"); }],
              ["Enterprise", "टीम हायरिंग", "#7C3AED", function(){ setPage("enterprise"); }],
            ].map(function(item) {
              return (
                <button key={item[0]} onClick={item[3]} className="lift" style={{ textAlign:"left", background:T.white, border:"1px solid #E8EDF4", borderTop:"3px solid "+item[2], borderRadius:T.rM, padding:"18px 16px", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>
                  <div className="font-display" style={{ fontSize:18, fontWeight:800, color:T.ink }}>{item[0]}</div>
                  <div style={{ fontSize:13, color:item[2], fontWeight:700, marginTop:4 }}>{item[1]}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec-pad reveal" data-reveal="true" style={{ padding:"76px 32px", background:T.white, borderBottom:"1px solid #E8EDF4" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1.12fr .88fr", gap:18 }}>
            <div style={card(24, { borderTop:"3px solid "+T.teal })}>
              <Chip label={trS("Why families switch")} color={T.teal} size={11} />
              <h3 className="font-display" style={{ fontSize:28, fontWeight:800, color:T.ink, marginTop:12, marginBottom:8 }}>Stronger than alternatives, simpler than agency workflows.</h3>
              <p style={{ fontSize:14, color:T.muted, marginBottom:16 }}>{trS("Competitor audit: users value transparent pricing, replacement guarantee, and quick support.")}</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:10 }}>
                {[
                  [trS("No hidden fees"), trS("Pay only after join")],
                  [trS("Visible replacement SLA"), trS("1-tap replacement request")],
                  [trS("Live support tracking"), trS("Track support ticket")],
                ].map(function(item) {
                  return (
                    <div key={item[0]} style={{ border:"1px solid #E8EDF4", borderRadius:T.r, background:"#FAFCFF", padding:"11px 12px" }}>
                      <div style={{ fontSize:12.5, color:T.ink, fontWeight:800, marginBottom:3 }}>{item[0]}</div>
                      <div style={{ fontSize:12.5, color:T.muted }}>{item[1]}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop:14, fontSize:12.5, color:T.muted }}>{trS("Simple promise layer inspired by top platforms, without making the flow complex.")}</div>
            </div>

            <div style={card(24, { borderTop:"3px solid "+T.violet })}>
              <div style={{ marginBottom:10 }}><Chip label={trS("Transparent cost planner")} color={T.violet} size={11} /></div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                <div>
                  <div style={{ fontSize:12, color:T.muted, fontWeight:700, marginBottom:6 }}>{trS("Households")}</div>
                  <input type="number" min="1" max="50" value={planHomes} onChange={function(e){ setPlanHomes(e.target.value.replace(/\D/g,"").slice(0,2)); }} style={Object.assign({}, inp, { height:42 })} />
                </div>
                <div>
                  <div style={{ fontSize:12, color:T.muted, fontWeight:700, marginBottom:6 }}>{trS("Workers required")}</div>
                  <input type="number" min="1" max="500" value={planWorkers} onChange={function(e){ setPlanWorkers(e.target.value.replace(/\D/g,"").slice(0,3)); }} style={Object.assign({}, inp, { height:42 })} />
                </div>
              </div>
              <div style={{ marginBottom:12 }}>
                <div style={{ fontSize:12, color:T.muted, fontWeight:700, marginBottom:6 }}>{trS("Service model")}</div>
                <div style={row("center","flex-start",8)}>
                  <button onClick={function(){ setPlanModel("standard"); }} style={{ border:"1px solid "+(planModel==="standard"?T.teal:"#D5DEE9"), background:planModel==="standard"?T.teal+"12":"#fff", color:planModel==="standard"?T.tealM:T.body, borderRadius:T.r, padding:"8px 11px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{trS("Standard")}</button>
                  <button onClick={function(){ setPlanModel("priority"); }} style={{ border:"1px solid "+(planModel==="priority"?T.violet:"#D5DEE9"), background:planModel==="priority"?"#F5F3FF":"#fff", color:planModel==="priority"?T.violet:T.body, borderRadius:T.r, padding:"8px 11px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{trS("Priority")}</button>
                </div>
              </div>
              <div style={{ border:"1px solid #E8EDF4", borderRadius:T.r, background:"#F8FBFF", padding:"12px 14px", marginBottom:12 }}>
                <div style={{ fontSize:12, color:T.muted, fontWeight:700 }}>{trS("Expected monthly platform fee")}</div>
                <div className="font-display" style={{ fontSize:30, color:T.ink, fontWeight:800, marginTop:2 }}>Rs. {estimatedFee.toLocaleString()}</div>
                <div style={{ fontSize:12, color:T.muted, marginTop:3 }}>No worker salary commission. Replacement request included.</div>
              </div>
              <div style={row("center","flex-start",8)}>
                <BtnGhost onClick={function(){ setPage("pricing"); }} style={{ padding:"10px 12px", fontSize:12 }}>{trS("View pricing")}</BtnGhost>
                <BtnTeal onClick={function(){ setPage("auth"); }} style={{ padding:"10px 12px", fontSize:12 }}>{trS("Talk to support")}</BtnTeal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN SECTION */}
      <section className="sec-pad reveal" data-reveal="true" style={{ padding:"100px 32px", background:T.white }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="section-intro">
            <Chip label="PROBLEM -> SOLUTION" color={T.violet} size={11} />
            <h2 className="font-display h2-big" style={{ fontSize:44, fontWeight:800, color:T.ink, letterSpacing:"-1.5px", lineHeight:1.1, marginTop:16 }}>
              Trust is broken in hiring.<br /><span className="grad-teal">Shramik fixes it end-to-end.</span>
            </h2>
            <p>Stop guesswork. Run verified hiring like a system.</p>
          </div>
          <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {[
              { who:"Families", color:T.violet, problem:"Hiring through forwards and agencies feels risky, slow, and expensive.", solution:"Get police-cleared, background-verified profiles with trusted employer reviews. Average hire time drops to 22 minutes.", stats:[["22 min","Avg hire time"],["97%","Safety confidence"]] },
              { who:"Societies", color:T.teal, problem:"Recurring workers enter daily with no unified registry and no risk alerts.", solution:"Manage all workers in one hub with QR entry logs, real-time alerts, approvals, and monthly compliance-ready audit reports.", stats:[["0","Target incidents"],["72+","Workers managed"]] },
              { who:"Workers", color:T.amber, problem:"Years of honest work are invisible without a verified professional record.", solution:"Build a portable Trust Score and verified history that follows you across employers and cities, unlocking higher income.", stats:[["35-45%","Income uplift"],["0","Joining cost"]] },
            ].map(function(s) {
              return (
                <div key={s.who} className="lift card-glow" style={card(32, { borderTop:"3px solid "+s.color, cursor:"default" })}>
                  <div style={Object.assign(row("center","space-between"), { marginBottom:16 })}>
                    <div style={{ fontSize:14, fontWeight:700, color:s.color }}>{s.who}</div>
                  </div>
                  <p style={{ fontSize:15.5, color:T.ink, lineHeight:1.6, fontStyle:"italic", marginBottom:18, fontWeight:500 }}>"{s.problem}"</p>
                  <div style={{ height:1, background:"#F0F4F9", marginBottom:16 }} />
                  <p style={{ fontSize:13.5, color:T.body, lineHeight:1.7, marginBottom:20 }}><span style={{ color:s.color, fontWeight:700 }}>Our answer: </span>{s.solution}</p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    {s.stats.map(function(st) {
                      return (
                        <div key={st[1]} style={{ background:s.color+"0C", borderRadius:10, padding:"10px 14px" }}>
                          <div className="font-display" style={{ fontSize:22, fontWeight:800, color:s.color }}>{st[0]}</div>
                          <div style={{ fontSize:11, color:T.muted, marginTop:2 }}>{st[1]}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="sec-pad reveal" data-reveal="true" style={{ padding:"90px 32px", background:T.offwhite }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={Object.assign(row("flex-end","space-between"), { marginBottom:52, gap:16 })}>
            <div>
              <Chip label="BROWSE WORKERS" color={T.teal} size={11} />
              <h2 className="font-display h2-big" style={{ fontSize:38, fontWeight:800, color:T.ink, letterSpacing:"-1.2px", marginTop:14 }}>Every skill. Every city.</h2>
            </div>
            <BtnGhost onClick={function(){ setPage("search"); }}>View all workers</BtnGhost>
          </div>
          <div className="grid-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
            {CATS.map(function(c) {
              return (
                <div key={c.label} className="lift card-glow" onClick={function(){ setPage("search"); }}
                  style={card(24, { cursor:"pointer", textAlign:"center", borderBottom:"3px solid "+c.color })}>
                  <div style={{ width:56, height:56, borderRadius:14, background:c.color+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, margin:"0 auto 14px" }}>{c.icon}</div>
                  <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:3 }}>{c.label}</div>
                  <div style={{ fontSize:13, color:c.color, fontWeight:700 }}>{c.n}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mesh-bg dot-bg sec-pad reveal" data-reveal="true" style={{ padding:"96px 32px", overflow:"hidden" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="section-intro">
            <Chip label="HOW IT WORKS" color={T.teal} size={11} />
            <h2 className="font-display h2-big" style={{ fontSize:40, fontWeight:800, color:"#fff", letterSpacing:"-1.2px", marginTop:16 }}>Verify fast. Hire safely. Grow continuously.</h2>
            <p style={{ color:"rgba(255,255,255,0.52)" }}>Verify. Match. Hire. Rate. Repeat.</p>
          </div>
          <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {[
              { n:"01", title:"Register and Verify", desc:"Mobile number + Aadhaar. We run background and police checks. Takes 24-48 hours.", color:T.teal },
              { n:"02", title:"Search and Match", desc:"Filter by city, skill, rating, availability. AI-matched recommendations. Instant contact.", color:T.violet },
              { n:"03", title:"Rate and Build", desc:"After every job, verified ratings compound into a portable Trust Score. It grows forever.", color:T.amber },
            ].map(function(s) {
              return (
                <div key={s.n} className="lift" style={{ background:"rgba(255,255,255,0.06)", backdropFilter:"blur(16px)", border:"1px solid "+s.color+"22", borderRadius:T.rM, padding:32 }}>
                  <div className="font-display" style={{ fontSize:40, fontWeight:800, color:s.color+"30", marginBottom:8, lineHeight:1 }}>{s.n}</div>
                  <div className="font-display" style={{ fontSize:19, fontWeight:800, color:"#fff", marginBottom:10 }}>{s.title}</div>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,0.5)", lineHeight:1.75 }}>{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec-pad reveal" data-reveal="true" style={{ padding:"86px 32px", background:T.white }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="section-intro">
            <Chip label="PLATFORM MODULES" color={T.teal} size={11} />
            <h2 className="font-display h2-big" style={{ fontSize:40, fontWeight:800, color:T.ink, letterSpacing:"-1.2px", marginTop:16 }}>More than a directory. A complete trust operating layer.</h2>
            <p>One trust layer for every stakeholder.</p>
          </div>
          <div className="home-feature-grid">
            <div className="lift card-glow home-feature-core" style={card(28, { background:"linear-gradient(180deg,#071221 0%,#0C1829 100%)", border:"1px solid rgba(0,229,195,0.14)" })}>
              <div style={{ marginBottom:16 }}><Chip label="CORE RECORD" color={T.teal} size={11} /></div>
              <div className="font-display" style={{ fontSize:26, fontWeight:800, color:"#fff", lineHeight:1.08, marginBottom:12 }}>A living worker profile with trust, earnings, and hiring signals.</div>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.56)", lineHeight:1.78, marginBottom:22 }}>Each profile captures identity verification, work history, ratings, availability, and key decision data so employers and societies can act with confidence.</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {[["4.8 / 5","Verified rating"],["22 min","Average hire time"],["98%","Completion signal"],["0 brokerage","Direct hiring"]].map(function(item) {
                  return (
                    <div key={item[0]+item[1]} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"12px 14px" }}>
                      <div className="font-display" style={{ fontSize:18, fontWeight:800, color:T.teal }}>{item[0]}</div>
                      <div style={{ fontSize:11.5, color:"rgba(255,255,255,0.48)", marginTop:4 }}>{item[1]}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            {[
              ["Verification and compliance","Identity checks, police verification, audit logs, and risk signals for home, society, and enterprise use.",T.violet],
              ["Hiring and repeat workflow","Search, shortlist, direct contact, hire requests, ratings, and proof that compounds after every completed engagement.",T.amber],
              ["Society operations","Registry management, QR-based entry, resident-safe approvals, notices, and downloadable logs.",T.teal],
              ["Worker growth tools","Portable work history, verified reputation, higher visibility, and financial enablement pathways.",T.green]
            ].map(function(item, index) {
              return (
                <div key={item[0]} className={"lift card-glow reveal home-feature-card stagger-"+((index%3)+1)} data-reveal="true" style={card(24, { borderTop:"3px solid "+item[2] })}>
                  <div className="font-display" style={{ fontSize:17, fontWeight:800, color:T.ink, marginBottom:10 }}>{item[0]}</div>
                  <p style={{ fontSize:13.5, color:T.muted, lineHeight:1.72 }}>{item[1]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sec-pad reveal" data-reveal="true" style={{ padding:"90px 32px", background:T.offwhite }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="section-intro" style={{ marginBottom:56 }}>
            <Chip label="REAL STORIES" color={T.violet} size={11} />
            <h2 className="font-display h2-big" style={{ fontSize:40, fontWeight:800, color:T.ink, letterSpacing:"-1.2px", marginTop:16 }}>People trust it.</h2>
            <p>Real trust. Real outcomes.</p>
          </div>
          <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {[
              { q:"Hired Rekha in 20 minutes. The background check gave us immediate peace of mind. Worth every rupee.", name:"Priya Sharma", role:"Resident, Banjara Hills", avi:"PS", c:T.violet },
              { q:"I had 8 years of experience but no proof. Now employers see my verified history and I earn 40% more.", name:"Vijay Kumar", role:"Security Guard, Bengaluru", avi:"VK", c:T.amber },
              { q:"Managing 320 flats used to mean chaos. Shramik cut security incidents to zero in 3 months.", name:"Ramesh Iyer", role:"Secretary, Prestige Complex", avi:"RI", c:T.teal },
            ].map(function(t) {
              return (
                <div key={t.name} className="lift card-glow" style={card(30, { borderLeft:"4px solid "+t.c })}>
                  <Stars n={5} size={15} />
                  <p style={{ fontSize:15, color:T.body, lineHeight:1.75, margin:"14px 0 22px", fontStyle:"italic", fontWeight:500 }}>"{t.q}"</p>
                  <div style={row("center","flex-start",12)}>
                    <Avi text={t.avi} bg={t.c} size={40} r={10} />
                    <div>
                      <div style={{ fontSize:14, fontWeight:700, color:T.ink }}>{t.name}</div>
                      <div style={{ fontSize:12, color:T.muted }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA GRID */}
      <section className="sec-pad reveal" data-reveal="true" style={{ padding:"90px 32px", background:T.base }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="section-intro" style={{ marginBottom:56 }}>
            <h2 className="font-display h2-big" style={{ fontSize:40, fontWeight:800, color:"#fff", letterSpacing:"-1.2px" }}>Built for every side of trust.</h2>
            <p style={{ fontSize:16, color:"rgba(255,255,255,0.45)", marginTop:10 }}>Everyone wins when trust is visible.</p>
          </div>
          <div className="grid-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
            {[
              { icon:"H", title:"Family", sub:"Find verified help for your home. Background-checked, rated, ready.", cta:"Find Help", color:T.teal, page:"search" },
              { icon:"S", title:"Society / RWA", sub:"Gate management. Worker registry. Monthly audit. All in one hub.", cta:"Set Up Hub", color:T.violet, page:"for-societies" },
              { icon:"W", title:"Worker", sub:"Build your digital work history. Get found faster. Earn 45% more.", cta:"Join Free", color:T.amber, page:"for-workers" },
              { icon:"E", title:"Enterprise", sub:"Bulk verified hiring for hotels, construction, and facilities.", cta:"Talk to Sales", color:"#7C3AED", page:"enterprise" },
            ].map(function(c) {
              return (
                <div key={c.title} className="lift" onClick={function(){ setPage(c.page); }}
                  style={{ background:"rgba(255,255,255,0.06)", border:"1px solid "+c.color+"20", borderRadius:T.rM, padding:28, cursor:"pointer", textAlign:"center" }}>
                  <div style={{ width:56, height:56, borderRadius:14, background:c.color+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:800, color:c.color, margin:"0 auto 14px", fontFamily:"'Syne',system-ui" }}>{c.icon}</div>
                  <div className="font-display" style={{ fontSize:16, fontWeight:800, color:"#fff", marginBottom:8 }}>{c.title}</div>
                  <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.65, marginBottom:20 }}>{c.sub}</p>
                  <div style={{ background:c.color+"18", border:"1px solid "+c.color+"35", borderRadius:T.r, padding:"9px 16px", fontSize:13, fontWeight:700, color:c.color }}>{c.cta}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec-pad reveal" data-reveal="true" style={{ padding:"76px 32px", background:T.offwhite, borderTop:"1px solid #E8EDF4" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="section-intro" style={{ marginBottom:36 }}>
            <Chip label="ROADMAP" color={T.violet} size={11} />
            <h2 className="font-display h2-big" style={{ fontSize:36, fontWeight:800, color:T.ink, marginTop:14 }}>What we improve next</h2>
            <p>Clear steps to improve trust, usability, and scale across all stakeholders.</p>
          </div>
          <div className="grid-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
            {[
              ["Q2 2026", "Worker Assist", "Voice-first onboarding, icon navigation, and regional language packs.", T.teal],
              ["Q3 2026", "Smart Ops", "Predictive incident alerts, SLA auto-escalation, and auto-scheduling.", T.violet],
              ["Q4 2026", "Trust Finance", "Payroll proofs, micro-insurance, and salary safety rails.", T.amber],
              ["Q1 2027", "Open Integrations", "API-based integrations with society ERPs and enterprise HR tools.", T.green],
            ].map(function(item, idx) {
              var key = idx===0?"assist":idx===1?"ops":idx===2?"finance":"integrations";
              var active = roadmap===key;
              return (
                <button key={item[1]} onClick={function(){ setRoadmap(key); }} style={Object.assign({}, card(20, { borderTop:"3px solid "+item[3], textAlign:"left", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui", width:"100%" }), active?{ boxShadow:"0 0 0 2px "+item[3]+"55, "+T.s1 }:null)}>
                  <div style={{ fontSize:11, fontWeight:700, color:item[3], marginBottom:6 }}>{item[0]}</div>
                  <div className="font-display" style={{ fontSize:16, fontWeight:800, color:T.ink, marginBottom:8 }}>{item[1]}</div>
                  <p style={{ fontSize:12.5, color:T.muted, lineHeight:1.65 }}>{item[2]}</p>
                </button>
              );
            })}
          </div>
          <div style={card(20, { marginTop:14, borderLeft:"3px solid "+(roadmap==="assist"?T.teal:roadmap==="ops"?T.violet:roadmap==="finance"?T.amber:T.green) })}>
            <div className="font-display" style={{ fontSize:16, fontWeight:800, color:T.ink, marginBottom:8 }}>
              {roadmap==="assist"?"Worker Assist Module":""}
              {roadmap==="ops"?"Smart Ops Module":""}
              {roadmap==="finance"?"Trust Finance Module":""}
              {roadmap==="integrations"?"Open Integrations Module":""}
            </div>
            <p style={{ fontSize:13, color:T.muted, marginBottom:12 }}>
              {roadmap==="assist"?"Enable voice helper and simplified worker onboarding cues.":""}
              {roadmap==="ops"?"Trigger automated incident intelligence for faster committee action.":""}
              {roadmap==="finance"?"Open worker financial trust workflows and salary safety tools.":""}
              {roadmap==="integrations"?"Generate sandbox credentials for external ERP/HR integrations.":""}
            </p>
            <div style={row("center","flex-start",10)}>
              <BtnTeal onClick={function(){ roadmapAction(roadmap); }} style={{ padding:"10px 16px", fontSize:13 }}>
                {roadmap==="assist"?"Enable Worker Assist":roadmap==="ops"?"Run Smart Ops Scan":roadmap==="finance"?"Open Trust Finance":"Generate Sandbox Key"}
              </BtnTeal>
              {sandboxKey && roadmap==="integrations" && <span style={{ fontSize:12.5, color:T.ink, fontWeight:700 }}>API: {sandboxKey}</span>}
            </div>
            {roadmapMsg && <div style={{ marginTop:10, fontSize:12.5, color:T.tealM }}>{roadmapMsg}</div>}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"#020408", padding:"60px 32px 28px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr", gap:40, marginBottom:48 }}>
            <div>
              <div className="font-display" style={{ fontSize:22, fontWeight:800, color:"#fff", marginBottom:14 }}>Shramik<span style={{ color:T.teal }}>.</span></div>
              <p style={{ fontSize:13.5, color:"rgba(255,255,255,0.3)", lineHeight:1.8, maxWidth:240 }}>India's trusted worker identity platform. Giving 500M informal workers their professional voice.</p>
            </div>
            {[["Product",["Find Workers","For Societies","For Workers","Pricing","Enterprise"]],["Company",["About Us","Blog","Careers","Press"]],["Support",["Help Center","Contact","Safety"]],["Legal",["Privacy","Terms","Data Policy"]]].map(function(section) {
              return (
                <div key={section[0]}>
                  <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.3)", letterSpacing:1.5, marginBottom:16, textTransform:"uppercase" }}>{section[0]}</div>
                  {section[1].map(function(item) {
                    var target = "";
                    if (item==="Find Workers") target = "search";
                    else if (item==="For Societies") target = "for-societies";
                    else if (item==="For Workers") target = "for-workers";
                    else if (item==="Pricing") target = "pricing";
                    else if (item==="Enterprise") target = "enterprise";
                    return (
                      <button key={item} onClick={function(){ if (target) setPage(target); else setRoadmapMsg(item+" section will be available soon."); }} style={{ display:"block", width:"100%", textAlign:"left", background:"none", border:"none", fontSize:13.5, color:"rgba(255,255,255,0.45)", marginBottom:10, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui", padding:0 }}>
                        {trS(item)}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div style={Object.assign(row("center","space-between"), { borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:24 })}>
            <span style={{ fontSize:12.5, color:"rgba(255,255,255,0.25)" }}>2025 Shramik Technologies Pvt. Ltd.</span>
            <div style={row("center","flex-end",12)}>
              <Chip label="ISO 27001" color={T.teal} size={10} />
              <Chip label="DPDP Compliant" color={T.violet} size={10} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AssistBar(props) {
  var easyMode=props.easyMode, setEasyMode=props.setEasyMode, setPage=props.setPage, page=props.page, onActionToast=props.onActionToast;
  function readCurrent() {
    var byPage = {
      landing:"Welcome to Shramik. Choose Worker, Family, Society, or Enterprise to continue.",
      search:"Use filters at top. Tap a worker card to view and hire.",
      "worker-dashboard":"Check jobs, update profile, and use planner for more income.",
      "employer-dashboard":"Post jobs, manage workers, and approve payouts.",
      "society-dashboard":"Track entries, approvals, and incidents from one dashboard.",
      admin:"Monitor operations, verifications, revenue, and risk controls.",
    };
    speakText(byPage[page] || "Use top menu to navigate Shramik.");
  }
  return (
    <div className="assist-bar">
      <button className={"assist-pill "+(easyMode?"active":"")} onClick={function(){ setEasyMode(function(v){ return !v; }); }}>{biText(easyMode?"Easy ON":"Easy Mode", true)}</button>
      <button className="assist-pill" onClick={readCurrent}>{biText("Read Aloud", true)}</button>
      <button className="assist-pill" onClick={function(){ setPage("search"); if (onActionToast) onActionToast("Opening Find Worker."); }}>{biText("Find Worker", true)}</button>
      <button className="assist-pill" onClick={function(){ setPage("auth"); if (onActionToast) onActionToast("Opening Help/Login."); }}>{biText("Help/Login", true)}</button>
    </div>
  );
}

// --- SEARCH --------------------------------------------------
function Search(props) {
  var setPage=props.setPage, setViewId=props.setViewId, easyMode=props.easyMode, apiReady=props.apiReady;
  var qState=useState(""), fRoleState=useState("All"), fCityState=useState("All"), fRatingState=useState("All"), sortState=useState("smart"), viewState=useState("grid");
  var locState=useState(null), nearCityState=useState(""), nearAreaState=useState(""), nearDistrictState=useState(""), showLocState=useState(true), showCoordState=useState(false), proximityState=useState(true), locBusyState=useState(false), locMsgState=useState(""), alertState=useState("");
  var availState=useState("All"), langState=useState("All"), skillState=useState("All"), radiusState=useState("25"), verifiedState=useState(false);
  var autoRunState=useState(true), triedAutoState=useState(false), recentState=useState([]), presetNameState=useState(""), presetsState=useState([]), chosenPresetState=useState("");
  var shortlistState=useState([]), compareState=useState([]), viewedState=useState([]);
  var aiState=useState(""), prefBudgetState=useState(""), prefTimingState=useState("Any"), prefLangState=useState("All");
  var interviewState=useState(null), interviewSlotState=useState("Tomorrow 11:00 AM");
  var replacementOnlyState=useState(false), fastResponseOnlyState=useState(false), docsOnlyState=useState(false);

  var query=qState[0],setQuery=qState[1], fRole=fRoleState[0],setFRole=fRoleState[1];
  var fCity=fCityState[0],setFCity=fCityState[1], fRating=fRatingState[0],setFRating=fRatingState[1], sortBy=sortState[0],setSort=sortState[1];
  var view=viewState[0],setView=viewState[1];
  var userLoc=locState[0],setUserLoc=locState[1], nearCity=nearCityState[0],setNearCity=nearCityState[1], nearArea=nearAreaState[0],setNearArea=nearAreaState[1], nearDistrict=nearDistrictState[0],setNearDistrict=nearDistrictState[1], showLocDetails=showLocState[0],setShowLocDetails=showLocState[1], showCoordDetails=showCoordState[0],setShowCoordDetails=showCoordState[1], proximityOn=proximityState[0],setProximityOn=proximityState[1], locBusy=locBusyState[0],setLocBusy=locBusyState[1], locMsg=locMsgState[0],setLocMsg=locMsgState[1], smartAlert=alertState[0],setSmartAlert=alertState[1];
  var fAvail=availState[0],setFAvail=availState[1], fLang=langState[0],setFLang=langState[1], quickSkill=skillState[0],setQuickSkill=skillState[1], radiusKm=radiusState[0],setRadiusKm=radiusState[1], verifiedOnly=verifiedState[0],setVerifiedOnly=verifiedState[1];
  var autoRun=autoRunState[0],setAutoRun=autoRunState[1], triedAuto=triedAutoState[0],setTriedAuto=triedAutoState[1], _recent=recentState[0],setRecent=recentState[1], presetName=presetNameState[0],setPresetName=presetNameState[1], presets=presetsState[0],setPresets=presetsState[1], _chosenPreset=chosenPresetState[0],setChosenPreset=chosenPresetState[1];
  var shortlist=shortlistState[0],setShortlist=shortlistState[1], compareIds=compareState[0],setCompareIds=compareState[1], recentViewed=viewedState[0],setRecentViewed=viewedState[1];
  var aiPrompt=aiState[0],_setAiPrompt=aiState[1], prefBudget=prefBudgetState[0],setPrefBudget=prefBudgetState[1], _prefTiming=prefTimingState[0],setPrefTiming=prefTimingState[1], prefLang=prefLangState[0],_setPrefLang=prefLangState[1];
  var interviewWorker=interviewState[0],setInterviewWorker=interviewState[1], interviewSlot=interviewSlotState[0],setInterviewSlot=interviewSlotState[1];
  var replacementOnly=replacementOnlyState[0],setReplacementOnly=replacementOnlyState[1], fastResponseOnly=fastResponseOnlyState[0],setFastResponseOnly=fastResponseOnlyState[1], docsOnly=docsOnlyState[0],setDocsOnly=docsOnlyState[1];

  function formatLocTime(ts) {
    if (!ts) return "-";
    try { return new Date(ts).toLocaleString(); } catch { return "-"; }
  }

  function setMockLocation(areaName, cityName) {
    var point = AREA_COORDS[areaName] || CITY_COORDS[cityName] || CITY_COORDS.Hyderabad;
    setUserLoc({ lat:point.lat, lng:point.lng, accuracy:null, altitude:null, heading:null, speed:null, timestamp:Date.now(), source:"field-test" });
    setNearArea(areaName || "");
    setNearDistrict(AREA_DISTRICT_INDEX[areaName] || cityName || "Hyderabad");
    setNearCity(cityName || "Hyderabad");
    setShowLocDetails(true);
    if (fCity==="All") setFCity(cityName || "Hyderabad");
    setLocMsg("Field test location set: "+(areaName ? areaName+", " : "")+(cityName || "Hyderabad")+".");
  }

  function clearDetectedLocation() {
    setUserLoc(null);
    setNearArea("");
    setNearDistrict("");
    setNearCity("");
    setLocMsg("Location cleared. Showing all cities based on filters.");
  }

  function copyLocationDetails() {
    if (!userLoc || typeof navigator==="undefined" || !navigator.clipboard) {
      setLocMsg("Location details unavailable to copy.");
      return;
    }
    var payload = {
      lat:userLoc.lat,
      lng:userLoc.lng,
      accuracy:userLoc.accuracy,
      area:nearArea || "",
      city:nearCity || "",
      source:userLoc.source || "",
      timestamp:userLoc.timestamp || Date.now()
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2)).then(function(){
      setLocMsg("Location details copied.");
    }).catch(function(){
      setLocMsg("Could not copy location details.");
    });
  }

  var roles = ["All"].concat(WORKERS.map(function(w){ return w.role; }).filter(function(v,i,a){ return a.indexOf(v)===i; }));
  var cities = ["All"].concat(WORKERS.map(function(w){ return normalizeCityName(w.city); }).filter(function(v,i,a){ return a.indexOf(v)===i; }));
  var ratings = ["All","4.5+","4.0+","3.5+"];
  var _avails = ["All","Available","On Job"];
  var _langs = ["All"].concat([].concat.apply([], WORKERS.map(function(w){ return w.lang || []; })).filter(function(v,i,a){ return a.indexOf(v)===i; }));
  var _quickSkills = ["All"].concat([].concat.apply([], WORKERS.map(function(w){ return w.skills || []; })).filter(function(v,i,a){ return a.indexOf(v)===i; }).slice(0,12));

  useEffect(function() {
    try {
      var raw = localStorage.getItem("shramik-search-presets");
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setPresets(parsed);
      }
      var autoRaw = localStorage.getItem("shramik-proximity-autorun");
      if (autoRaw!==null) setAutoRun(autoRaw==="1");
      var listRaw = localStorage.getItem("shramik-shortlist");
      if (listRaw) {
        var ids = JSON.parse(listRaw);
        if (Array.isArray(ids)) setShortlist(ids);
      }
      var viewedRaw = localStorage.getItem("shramik-recent-viewed");
      if (viewedRaw) {
        var v = JSON.parse(viewedRaw);
        if (Array.isArray(v)) setRecentViewed(v);
      }
    } catch { void 0; }
  }, [setAutoRun, setPresets, setRecentViewed, setShortlist]);

  useEffect(function() {
    try { localStorage.setItem("shramik-proximity-autorun", autoRun?"1":"0"); } catch { void 0; }
  }, [autoRun]);

  useEffect(function() {
    try { localStorage.setItem("shramik-shortlist", JSON.stringify(shortlist)); } catch { void 0; }
  }, [shortlist]);

  useEffect(function() {
    if (!autoRun || triedAuto || userLoc || locBusy) return;
    setTriedAuto(true);
    detectLocation(true);
  }, [autoRun, triedAuto, userLoc, locBusy, detectLocation, setTriedAuto]);

  useEffect(function() {
    var q = query.trim();
    if (q.length<2) return;
    var timer = setTimeout(function() {
      setRecent(function(prev) {
        return [q].concat(prev.filter(function(x){ return x.toLowerCase()!==q.toLowerCase(); })).slice(0,6);
      });
    }, 450);
    return function() { clearTimeout(timer); };
  }, [query, setRecent]);

  function clearFilters() {
    setQuery("");
    setFRole("All");
    setFCity("All");
    setFRating("All");
    setFAvail("All");
    setFLang("All");
    setQuickSkill("All");
    setRadiusKm("25");
    setVerifiedOnly(false);
    setReplacementOnly(false);
    setFastResponseOnly(false);
    setDocsOnly(false);
    setSort("smart");
  }

  function applyEasyRole(role) {
    setFRole(role);
    if (nearCity) setFCity(nearCity);
    setProximityOn(true);
    setSort("nearest");
    setLocMsg(role+" filter applied. Showing nearest options.");
  }

  function switchView(next) {
    var mode = next==="list" ? "list" : "grid";
    setView(mode);
    setLocMsg(mode==="grid" ? "Grid view enabled" : "List view enabled");
  }

  function isReplacementReady(w) {
    return !!(w.verified && w.score>=4.4 && w._signals && w._signals.repeatHireRate>=70);
  }

  var detectLocation = useCallback(function(silent) {
    if (!navigator.geolocation) {
      if (!silent) {
        setLocMsg("Geolocation not supported. Using default location: Hyderabad.");
        setNearCity("Hyderabad");
        setNearArea("Sangareddy");
        setNearDistrict("Sangareddy");
        setUserLoc({ lat:CITY_COORDS.Hyderabad.lat, lng:CITY_COORDS.Hyderabad.lng, accuracy:null, altitude:null, heading:null, speed:null, timestamp:Date.now(), source:"fallback" });
        setShowLocDetails(true);
        if (fCity==="All") setFCity("Hyderabad");
      }
      return;
    }
    setLocBusy(true);
    if (!silent) setLocMsg("Detecting your location...");
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var accuracy = position.coords.accuracy;
      var altitude = position.coords.altitude;
      var heading = position.coords.heading;
      var speed = position.coords.speed;
      var timestamp = position.timestamp || Date.now();
      var location = cityFromCoords(lat, lng) || { city:"", district:"" };
      var foundCity = location.city || "";
      var foundDistrict = location.district || "";
      var foundDistrictName = location.districtName || foundCity || "";
      setUserLoc({ lat:lat, lng:lng, accuracy:accuracy, altitude:altitude, heading:heading, speed:speed, timestamp:timestamp, source:"gps" });
      setNearCity(foundCity);
      setNearArea(foundDistrict);
      setNearDistrict(foundDistrictName);
      setShowLocDetails(true);
      setLocBusy(false);
      var msg = foundCity && foundDistrict ? ("Location: "+foundDistrict+", "+foundCity) : foundCity ? ("Location near "+foundCity) : "Location detected";
      if (typeof location.areaKm==="number" && isFinite(location.areaKm) && foundDistrict) msg += " ("+location.areaKm.toFixed(1)+" km)";
      setLocMsg(msg+".");
      if (foundCity && fCity==="All") setFCity(normalizeCityName(foundCity));
    }, function() {
      setLocBusy(false);
      // Fallback to Hyderabad if location detection fails
      setLocMsg("Using default location: Hyderabad. (Enable location for better results)");
      setNearCity("Hyderabad");
      setNearArea("Sangareddy");
      setNearDistrict("Sangareddy");
      setUserLoc({ lat:CITY_COORDS.Hyderabad.lat, lng:CITY_COORDS.Hyderabad.lng, accuracy:null, altitude:null, heading:null, speed:null, timestamp:Date.now(), source:"fallback" });
      setShowLocDetails(true);
      if (fCity==="All") setFCity("Hyderabad");
      if (silent) return;
    }, { enableHighAccuracy:true, timeout:9000, maximumAge:60000 });
  }, [fCity, setFCity, setLocBusy, setLocMsg, setNearArea, setNearCity, setNearDistrict, setShowLocDetails, setUserLoc]);

  function _saveCurrentPreset() {
    var name = presetName.trim();
    if (!name) {
      setLocMsg("Enter a preset name to save current filters.");
      return;
    }
    var preset = { name:name, fRole:fRole, fCity:fCity, fRating:fRating, fAvail:fAvail, fLang:fLang, quickSkill:quickSkill, radiusKm:radiusKm, sortBy:sortBy, verifiedOnly:verifiedOnly };
    var next = [preset].concat(presets.filter(function(p){ return p.name.toLowerCase()!==name.toLowerCase(); })).slice(0,8);
    setPresets(next);
    setPresetName("");
    setChosenPreset(name);
    try { localStorage.setItem("shramik-search-presets", JSON.stringify(next)); } catch { void 0; }
    setLocMsg("Preset saved: "+name+".");
  }

  function _applyPreset(name) {
    var p = presets.filter(function(x){ return x.name===name; })[0];
    if (!p) return;
    setFRole(p.fRole || "All");
    setFCity(p.fCity || "All");
    setFRating(p.fRating || "All");
    setFAvail(p.fAvail || "All");
    setFLang(p.fLang || "All");
    setQuickSkill(p.quickSkill || "All");
    setRadiusKm(p.radiusKm || "25");
    setSort(p.sortBy || "smart");
    setVerifiedOnly(!!p.verifiedOnly);
    setLocMsg("Preset applied: "+name+".");
  }

  function _toggleShortlist(workerId) {
    setShortlist(function(prev) {
      if (prev.indexOf(workerId)>=0) {
        setLocMsg("Removed from shortlist.");
        return prev.filter(function(id){ return id!==workerId; });
      }
      setLocMsg("Added to shortlist.");
      return [workerId].concat(prev).slice(0,12);
    });
  }

  function _toggleCompare(workerId) {
    setCompareIds(function(prev) {
      if (prev.indexOf(workerId)>=0) return prev.filter(function(id){ return id!==workerId; });
      if (prev.length>=3) {
        setLocMsg("Compare supports up to 3 workers.");
        return prev;
      }
      return prev.concat([workerId]);
    });
  }

  function openWorker(worker) {
    var next = [worker.id].concat(recentViewed.filter(function(id){ return id!==worker.id; })).slice(0,6);
    setRecentViewed(next);
    try { localStorage.setItem("shramik-recent-viewed", JSON.stringify(next)); } catch { void 0; }
    setViewId(worker.id);
    setPage("worker-view");
  }

  function quickBook(worker) {
    setLocMsg("Quick booking started for "+worker.name+". Complete details in profile.");
    openWorker(worker);
  }

  function _applyAssistant() {
    var text = aiPrompt.toLowerCase().trim();
    if (!text) return;
    if (/cook|chef|kitchen/.test(text)) setFRole("Cook");
    if (/plumb/.test(text)) setFRole("Plumber");
    if (/guard|security/.test(text)) setFRole("Security Guard");
    if (/helper|maid|clean/.test(text)) setFRole("Domestic Helper");
    if (/elder|care/.test(text)) setFRole("Elderly Care");

    if (/hyderabad/.test(text)) setFCity("Hyderabad");
    if (/bengaluru|bangalore/.test(text)) setFCity("Bengaluru");
    if (/mumbai/.test(text)) setFCity("Mumbai");
    if (/pune/.test(text)) setFCity("Pune");
    if (/delhi/.test(text)) setFCity("Delhi");

    if (/available|immediate|now/.test(text)) setFAvail("Available");
    if (/telugu/.test(text)) setFLang("Telugu");
    if (/hindi/.test(text)) setFLang("Hindi");
    if (/english/.test(text)) setFLang("English");

    var budgetMatch = text.match(/(\d{4,6})/);
    if (budgetMatch) setPrefBudget(budgetMatch[1]);
    if (/morning/.test(text)) setPrefTiming("Morning");
    if (/evening/.test(text)) setPrefTiming("Evening");
    if (/night/.test(text)) setPrefTiming("Night");
    setLocMsg("Assistant applied suggestions from your request.");
  }

  async function submitInterview() {
    if (!interviewWorker) return;
    try {
      await apiSubmitContact({
        name:"Interview Request",
        phone:"9999999999",
        message:"Interview requested for "+interviewWorker.name+" at "+interviewSlot+"."
      });
      setLocMsg("Interview request sent to "+interviewWorker.name+" for "+interviewSlot+".");
      setInterviewWorker(null);
    } catch {
      setLocMsg("Could not send interview request. Please retry.");
    }
  }

  function ratingPass(score) {
    if (fRating==="4.5+") return score>=4.5;
    if (fRating==="4.0+") return score>=4.0;
    if (fRating==="3.5+") return score>=3.5;
    return true;
  }

  var maxBudget = Number(prefBudget || 0);

  var withDistance = WORKERS.map(function(w) {
    var workerCity = normalizeCityName(w.city);
    var workerPoint = AREA_COORDS[w.area] || CITY_COORDS[workerCity] || null;
    var km = userLoc ? distanceKm(userLoc, workerPoint) : null;
    var signals = workerSignals(w);
    var salaryValue = parseSalaryAmount(w.salary);
    var prefLangPass = prefLang==="All" || (w.lang||[]).indexOf(prefLang)>=0;
    var budgetScore = !maxBudget ? 10 : (salaryValue>0 && salaryValue<=maxBudget ? 14 : 2);
    var proximityScore = typeof km==="number" ? Math.max(0, 20 - km) : 8;
    var matchScore = Math.round((w.score*8) + Math.min(12,w.exp) + (w.verified?10:0) + budgetScore + proximityScore + (prefLangPass?6:0) + (signals.repeatHireRate/8));
    return Object.assign({}, w, { _distanceKm:km, _signals:signals, _salaryValue:salaryValue, _matchScore:matchScore, _prefLangPass:prefLangPass });
  });

  var filtered = withDistance.filter(function(w) {
    var q = query.toLowerCase();
    var textPass = !q || w.name.toLowerCase().includes(q) || w.role.toLowerCase().includes(q) || w.skills.some(function(s){ return s.toLowerCase().includes(q); });
    var langPass = fLang==="All" || (w.lang||[]).indexOf(fLang)>=0;
    var availPass = fAvail==="All" || w.avail===fAvail;
    var skillPass = quickSkill==="All" || (w.skills||[]).indexOf(quickSkill)>=0;
    var radiusPass = !proximityOn || !userLoc || typeof w._distanceKm!=="number" || w._distanceKm <= Number(radiusKm);
    var verifyPass = !verifiedOnly || w.verified;
    var replacementPass = !replacementOnly || isReplacementReady(w);
    var responsePass = !fastResponseOnly || (w._signals && w._signals.responseMins<=45);
    var docsPass = !docsOnly || w.verified;
    var budgetPass = !maxBudget || !w._salaryValue || w._salaryValue <= maxBudget;
    return (fRole==="All" || w.role===fRole) && (fCity==="All" || normalizeCityName(w.city)===normalizeCityName(fCity)) && ratingPass(w.score) && langPass && availPass && skillPass && textPass && radiusPass && verifyPass && replacementPass && responsePass && docsPass && budgetPass;
  }).sort(function(a,b){
    if (sortBy==="nearest" && userLoc && proximityOn) {
      var da = typeof a._distanceKm==="number" ? a._distanceKm : 99999;
      var db = typeof b._distanceKm==="number" ? b._distanceKm : 99999;
      return da-db;
    }
    if (sortBy==="smart") return b._matchScore-a._matchScore;
    return sortBy==="rating" ? b.score-a.score : b.exp-a.exp;
  });

  var nearestWorkers = filtered.slice().sort(function(a,b){
    if (userLoc) {
      var da = typeof a._distanceKm==="number" ? a._distanceKm : 99999;
      var db = typeof b._distanceKm==="number" ? b._distanceKm : 99999;
      if (da!==db) return da-db;
    }
    return b._matchScore-a._matchScore;
  }).slice(0,8);
  var shortlistWorkers = withDistance.filter(function(w){ return shortlist.indexOf(w.id)>=0; });
  var _compareWorkers = withDistance.filter(function(w){ return compareIds.indexOf(w.id)>=0; });
  var _viewedWorkers = withDistance.filter(function(w){ return recentViewed.indexOf(w.id)>=0; });

  useEffect(function() {
    if (!userLoc || !shortlistWorkers.length) {
      setSmartAlert("");
      return;
    }
    var bestShort = shortlistWorkers.slice().sort(function(a,b){ return b._matchScore-a._matchScore; })[0];
    var better = filtered.filter(function(w){ return shortlist.indexOf(w.id)<0; }).slice(0,1)[0];
    if (better && bestShort && better._matchScore > bestShort._matchScore + 8) {
      setSmartAlert("Better nearby match found: "+better.name+" has stronger trust and proximity score than your current shortlist top profile.");
    } else {
      setSmartAlert("");
    }
  }, [userLoc, shortlist, filtered, sortBy, fCity, fRole, query, setSmartAlert, shortlistWorkers]);

  return (
    <div className="page-shell page-enter" style={{ background:T.offwhite, minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(180deg,rgba(255,255,255,.45) 0%,rgba(243,250,255,.2) 100%)", borderBottom:"1px solid rgba(255,255,255,.5)", padding:"26px 32px", backdropFilter:"blur(16px) saturate(130%)", WebkitBackdropFilter:"blur(16px) saturate(130%)" }}>
        <div className="page-wrap-wide" style={{ maxWidth:1200, margin:"0 auto", padding:0 }}>
          <h1 className="font-display" style={{ fontSize:26, fontWeight:800, color:T.ink, marginBottom:8 }}>{trS("Find Verified Workers")}</h1>
          <div className="page-note">Simple search: choose role/city/rating and optional proximity. Data source: {apiReady ? "Live backend" : "Local fallback"}.</div>

          {easyMode && <div className="section-soft" style={{ marginTop:10, padding:12, borderLeft:"4px solid "+T.green }}>
            <div style={{ fontSize:13, fontWeight:800, color:T.ink, marginBottom:8 }}>Easy Actions</div>
            <div style={Object.assign(row("center","flex-start",8), { flexWrap:"wrap" })}>
              <button onClick={function(){ applyEasyRole("Domestic Helper"); }} style={{ border:"1px solid #D5DEE9", background:"#fff", color:T.ink, borderRadius:999, padding:"8px 12px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>🧹 Home Help</button>
              <button onClick={function(){ applyEasyRole("Cook"); }} style={{ border:"1px solid #D5DEE9", background:"#fff", color:T.ink, borderRadius:999, padding:"8px 12px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>🍳 Cook</button>
              <button onClick={function(){ applyEasyRole("Driver"); }} style={{ border:"1px solid #D5DEE9", background:"#fff", color:T.ink, borderRadius:999, padding:"8px 12px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>🚗 Driver</button>
              <button onClick={function(){ applyEasyRole("Plumber"); }} style={{ border:"1px solid #D5DEE9", background:"#fff", color:T.ink, borderRadius:999, padding:"8px 12px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>🔧 Plumber</button>
              <button onClick={function(){ speakText("Use these quick buttons to find nearby workers. Tap card to view full profile."); }} style={{ border:"1px solid #BFDBFE", background:"#EFF6FF", color:T.tealM, borderRadius:999, padding:"8px 12px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>🔊 Read Help</button>
            </div>
          </div>}

          <div className="filter-bar search-sticky">
            <div className="filter-field"><label className="filter-label">{trS("Search")}</label><input className="filter-search liquid-control" value={query} onChange={function(e){ setQuery(e.target.value); }} placeholder={trS("Name, skill or role")} style={Object.assign({}, inp, liquidControlStyle, { borderRadius:T.r })} /></div>
            <div className="filter-field"><label className="filter-label">{trS("Role")}</label><select className="filter-select liquid-control" value={fRole} onChange={function(e){ setFRole(e.target.value); }} style={Object.assign({}, inp, liquidControlStyle, { height:44 })}>{roles.map(function(r){ return <option key={r}>{r}</option>; })}</select></div>
            <div className="filter-field"><label className="filter-label">{trS("City")}</label><select className="filter-select city liquid-control" value={fCity} onChange={function(e){ setFCity(e.target.value); }} style={Object.assign({}, inp, liquidControlStyle, { height:44 })}>{cities.map(function(c){ return <option key={c}>{c}</option>; })}</select></div>
            <div className="filter-field"><label className="filter-label">{trS("Min Rating")}</label><select className="filter-select liquid-control" value={fRating} onChange={function(e){ setFRating(e.target.value); }} style={Object.assign({}, inp, liquidControlStyle, { height:44 })}>{ratings.map(function(r){ return <option key={r}>{r}</option>; })}</select></div>
            <div className="filter-field"><label className="filter-label">{trS("Sort By")}</label><select className="filter-select liquid-control" value={sortBy} onChange={function(e){ setSort(e.target.value); }} style={Object.assign({}, inp, liquidControlStyle, { height:44 })}><option value="smart">{trS("Smart Match")}</option><option value="rating">{trS("Highest Rated")}</option><option value="exp">{trS("Most Experienced")}</option>{userLoc && <option value="nearest">{trS("Nearest to Me")}</option>}</select></div>
            <div className="filter-field"><label className="filter-label">{trS("Radius")}</label><select className="filter-select liquid-control" value={radiusKm} onChange={function(e){ setRadiusKm(e.target.value); }} style={Object.assign({}, inp, liquidControlStyle, { height:44 })}>{["5","10","25","50"].map(function(k){ return <option key={k} value={k}>{k} km</option>; })}</select></div>
            <div className="filter-actions">
              <button onClick={function(){ setVerifiedOnly(function(v){ return !v; }); }} className="liquid-control" style={Object.assign({}, liquidControlStyle, { border:"1px solid "+(verifiedOnly?"#A7F3D0":"#D5DEE9"), background:verifiedOnly?T.greenBg:"rgba(255,255,255,.45)", color:verifiedOnly?T.green:T.muted, borderRadius:T.r, padding:"10px 12px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" })}>{trS("Verified only")}</button>
              <button onClick={clearFilters} className="liquid-control" style={Object.assign({}, liquidControlStyle, { border:"1px solid #D5DEE9", background:"rgba(255,255,255,.45)", color:T.body, borderRadius:T.r, padding:"10px 14px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" })}>Clear</button>
              {["grid","list"].map(function(v) {
                var active=view===v;
                return <button key={v} className="liquid-control view-toggle" aria-label={v==="grid"?"Grid view":"List view"} aria-pressed={active} onClick={function(){ switchView(v); }} style={Object.assign({}, liquidControlStyle, { border:"1.5px solid "+(active?T.teal:"#D8E6F3"), background:active?"rgba(0,229,195,0.14)":"rgba(255,255,255,.42)", color:active?T.tealM:T.dim, cursor:"pointer" })}>
                  {v==="grid" ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg> : <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>}
                  <span>{v==="grid"?"Grid":"List"}</span>
                </button>;
              })}
            </div>
          </div>

          <div style={{ marginTop:10, fontSize:13, color:T.muted }}><strong style={{ color:T.ink }}>{filtered.length}</strong> verified workers <span style={{ marginLeft:8, color:T.tealM, fontWeight:800 }}>View: {view==="grid"?"Grid":"List"}</span></div>
          <div style={Object.assign(row("center","flex-start",10), { marginTop:12 })}>
            <BtnGhost onClick={detectLocation} style={{ padding:"9px 12px", fontSize:12 }}>{locBusy ? "Locating..." : "Use my location"}</BtnGhost>
            <button onClick={function(){ setAutoRun(function(v){ return !v; }); }} style={{ border:"1px solid "+(autoRun?"#A7F3D0":"#D5DEE9"), background:autoRun?T.greenBg:"#fff", color:autoRun?T.green:T.muted, borderRadius:T.r, padding:"9px 12px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{autoRun?"Auto-run: On":"Auto-run: Off"}</button>
            <button onClick={function(){ setProximityOn(function(v){ return !v; }); }} style={{ border:"1px solid "+(proximityOn?"#BFDBFE":"#D5DEE9"), background:proximityOn?"#EFF6FF":"#fff", color:proximityOn?T.tealM:T.muted, borderRadius:T.r, padding:"9px 12px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{proximityOn?"Proximity: On":"Proximity: Off"}</button>
            {nearCity && fCity!==nearCity && <button onClick={function(){ setFCity(nearCity); }} style={{ border:"1px solid #C7D2FE", background:"#EEF2FF", color:T.violet, borderRadius:T.r, padding:"9px 12px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>Filter city: {nearCity}</button>}
            {nearArea && <span style={{ fontSize:12.5, color:T.muted }}>Nearest area: {nearArea}</span>}
            {locMsg && <span style={{ fontSize:12.5, color:T.muted }}>{locMsg}</span>}
          </div>

          {userLoc && (
            <div className="section-soft" style={{ marginTop:10, padding:"10px 12px", borderLeft:"4px solid "+T.teal }}>
              <div style={Object.assign(row("center","space-between",8), { marginBottom:6 })}>
                <div style={{ fontSize:12, color:T.ink, fontWeight:800 }}>Location Details</div>
                <div style={Object.assign(row("center","flex-end",6))}>
                  <button onClick={function(){ setShowCoordDetails(function(v){ return !v; }); }} style={{ border:"1px solid #D5DEE9", background:"#fff", color:T.body, borderRadius:T.r, padding:"5px 10px", fontSize:11.5, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{showCoordDetails?"Hide coordinates":"Show coordinates"}</button>
                  <button onClick={function(){ setShowLocDetails(function(v){ return !v; }); }} style={{ border:"1px solid #D5DEE9", background:"#fff", color:T.body, borderRadius:T.r, padding:"5px 10px", fontSize:11.5, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{showLocDetails?"Hide details":"Show details"}</button>
                </div>
              </div>
              {showLocDetails && <div style={Object.assign(row("center","flex-start",8), { flexWrap:"wrap" })}>
                <span style={{ fontSize:12, color:T.body, background:T.subtle, border:"1px solid #D5DEE9", borderRadius:999, padding:"4px 10px" }}>District: {nearDistrict || "-"}</span>
                <span style={{ fontSize:12, color:T.body, background:T.subtle, border:"1px solid #D5DEE9", borderRadius:999, padding:"4px 10px" }}>Area: {nearArea || "-"}</span>
                <span style={{ fontSize:12, color:T.body, background:T.subtle, border:"1px solid #D5DEE9", borderRadius:999, padding:"4px 10px" }}>City: {nearCity || "-"}</span>
                <span style={{ fontSize:12, color:T.body, background:T.subtle, border:"1px solid #D5DEE9", borderRadius:999, padding:"4px 10px" }}>Accuracy: {typeof userLoc.accuracy==="number" ? Math.round(userLoc.accuracy)+" m" : "-"}</span>
                <span style={{ fontSize:12, color:T.body, background:T.subtle, border:"1px solid #D5DEE9", borderRadius:999, padding:"4px 10px" }}>Source: {userLoc.source==="gps" ? "GPS" : "Fallback"}</span>
                <span style={{ fontSize:12, color:T.body, background:T.subtle, border:"1px solid #D5DEE9", borderRadius:999, padding:"4px 10px" }}>Updated: {formatLocTime(userLoc.timestamp)}</span>
              </div>}
              {showCoordDetails && <div style={Object.assign(row("center","flex-start",8), { flexWrap:"wrap", marginTop:8 })}>
                <span style={{ fontSize:12, color:T.body, background:T.subtle, border:"1px solid #D5DEE9", borderRadius:999, padding:"4px 10px" }}>Lat: {typeof userLoc.lat==="number" ? userLoc.lat.toFixed(6) : "-"}</span>
                <span style={{ fontSize:12, color:T.body, background:T.subtle, border:"1px solid #D5DEE9", borderRadius:999, padding:"4px 10px" }}>Lng: {typeof userLoc.lng==="number" ? userLoc.lng.toFixed(6) : "-"}</span>
                <span style={{ fontSize:12, color:T.body, background:T.subtle, border:"1px solid #D5DEE9", borderRadius:999, padding:"4px 10px" }}>Altitude: {typeof userLoc.altitude==="number" ? userLoc.altitude.toFixed(1)+" m" : "-"}</span>
                <span style={{ fontSize:12, color:T.body, background:T.subtle, border:"1px solid #D5DEE9", borderRadius:999, padding:"4px 10px" }}>Heading: {typeof userLoc.heading==="number" ? Math.round(userLoc.heading)+"°" : "-"}</span>
                <span style={{ fontSize:12, color:T.body, background:T.subtle, border:"1px solid #D5DEE9", borderRadius:999, padding:"4px 10px" }}>Speed: {typeof userLoc.speed==="number" ? userLoc.speed.toFixed(2)+" m/s" : "-"}</span>
              </div>}
              <div style={Object.assign(row("center","flex-start",8), { marginTop:8, flexWrap:"wrap" })}>
                <button onClick={copyLocationDetails} style={{ border:"1px solid #D5DEE9", background:"#fff", color:T.body, borderRadius:T.r, padding:"6px 10px", fontSize:11.5, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>Copy location JSON</button>
                <button onClick={function(){ setMockLocation("Madhapur","Hyderabad"); }} style={{ border:"1px solid #D5DEE9", background:"#fff", color:T.body, borderRadius:T.r, padding:"6px 10px", fontSize:11.5, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>Test: Madhapur</button>
                <button onClick={function(){ setMockLocation("Whitefield","Bengaluru"); }} style={{ border:"1px solid #D5DEE9", background:"#fff", color:T.body, borderRadius:T.r, padding:"6px 10px", fontSize:11.5, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>Test: Whitefield</button>
                <button onClick={function(){ setMockLocation("Zaheerabad","Hyderabad"); }} style={{ border:"1px solid #D5DEE9", background:"#fff", color:T.body, borderRadius:T.r, padding:"6px 10px", fontSize:11.5, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>Test: Zaheerabad</button>
                <button onClick={clearDetectedLocation} style={{ border:"1px solid #FECACA", background:"#FEF2F2", color:T.red, borderRadius:T.r, padding:"6px 10px", fontSize:11.5, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>Clear location</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="page-wrap-wide" style={{ maxWidth:1200, margin:"0 auto", padding:"28px 32px" }}>
        {smartAlert && <div className="section-soft" style={{ padding:12, marginBottom:14, borderLeft:"4px solid "+T.teal }}><span style={{ fontSize:13.5, color:T.ink }}>{smartAlert}</span></div>}

        {nearestWorkers.length>0 && (
          <div className="section-soft" style={{ padding:18, marginBottom:18 }}>
            <div style={Object.assign(row("center","space-between"), { marginBottom:10 })}>
              <div className="font-display" style={{ fontSize:16, fontWeight:800, color:T.ink }}>Recommended for you</div>
              <Chip label={nearCity || "Proximity"} color={T.tealM} size={10} dot={true} />
            </div>
            <div className="grid-3" style={{ display:"grid", gridTemplateColumns:view==="grid"?"repeat(3,1fr)":"1fr", gap:12 }}>
              {nearestWorkers.map(function(w) {
                var nearYou = userLoc && typeof w._distanceKm==="number" && w._distanceKm<=30;
                return (
                  <div key={"near-"+w.id} className="lift" style={Object.assign(card(16), { cursor:"pointer", background:"linear-gradient(145deg,rgba(255,255,255,.56) 0%,rgba(247,251,255,.28) 100%)", border:"1px solid rgba(255,255,255,.62)", borderRadius:18 })}>
                    <div style={Object.assign(row("center","space-between"), { marginBottom:8 })}><div style={row("center","flex-start",8)}><Avi text={w.avi} bg={w.color} size={34} r={10} ring={w.verified} /><div className="font-display" style={{ fontSize:14, fontWeight:800, color:T.ink }}>{w.name}</div>{nearYou && <Chip label="Near You" color={T.green} size={10} dot={true} />}</div><Score n={w.score} /></div>
                    <div style={{ fontSize:12.5, color:T.muted, marginBottom:7 }}>{w.role} - {w.area}, {w.city}</div>
                    <div style={{ fontSize:12.5, color:T.body, marginBottom:6 }}>Risk confidence: <strong title="Derived from verification, completion, and ratings">{w._signals.riskConfidence}%</strong></div>
                    <div style={row("center","space-between")}><span style={{ fontSize:12, fontWeight:700, color:T.tealM }}>{w._distanceKm<1 ? "<1 km" : (Math.round(w._distanceKm*10)/10)+" km"} away</span><Chip label={w.avail} color={w.avail==="Available"?T.green:T.amber} size={10} dot={true} /></div>
                    <div style={Object.assign(row("center","flex-start",8), { marginTop:10 })}><button onClick={function(){ openWorker(w); }} style={{ border:"1px solid #D5DEE9", background:"#fff", color:T.body, borderRadius:T.r, padding:"6px 9px", fontSize:11.5, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{trS("View")}</button><button onClick={function(){ quickBook(w); }} style={{ border:"none", background:"linear-gradient(135deg,"+T.teal+","+T.tealM+")", color:T.base, borderRadius:T.r, padding:"6px 10px", fontSize:11.5, fontWeight:800, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui", boxShadow:"0 3px 12px "+T.tealGlow }}>{trS("Quick Book")}</button></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {filtered.length===0 ? (
          <div className="empty-state">
            <div className="font-display" style={{ fontSize:20, color:T.ink, marginBottom:8 }}>No workers found for this filter.</div>
            <p style={{ fontSize:13.5, marginBottom:14 }}>Try clearing filters or broadening city/role selection.</p>
            <BtnTeal onClick={clearFilters} style={{ padding:"10px 18px", fontSize:13 }}>Reset Filters</BtnTeal>
          </div>
        ) : view==="grid" ? (
          <div className="grid-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
            {filtered.map(function(w) {
              var nearYou = userLoc && typeof w._distanceKm==="number" && w._distanceKm<=30;
              return (
                <div key={w.id} className="lift card-glow" style={card(12, { cursor:"pointer", padding:"10px", background:"linear-gradient(145deg,rgba(255,255,255,.56) 0%,rgba(249,252,255,.26) 100%)", border:"1px solid rgba(255,255,255,.62)", borderRadius:16 })}>
                  <div style={row("center","space-between", 6)}><div style={{ fontSize:20 }}>👤</div><Score n={w.score} count={w.reviews} style={{ fontSize:10 }} /></div>
                  <div className="font-display" style={{ fontSize:12, fontWeight:800, color:T.ink, lineHeight:1.15, marginBottom:3 }}>{w.name}</div>
                  <div style={{ fontSize:10, color:T.body, marginBottom:2 }}>{w.role}</div>
                  <div style={{ fontSize:9.5, color:T.muted, marginBottom:3 }}>{w.district || w.area}</div>
                  <div style={{ fontSize:10.5, color:T.teal, fontWeight:700, marginBottom:3 }}>Match {w._matchScore}</div>
                  {nearYou && <Chip label="Near You" color={T.green} size={9} dot={true} />}
                  <div style={Object.assign(row("center","flex-start",4), { marginTop:6 })}>
                    <button onClick={function(){ openWorker(w); }} style={{ border:"1px solid "+T.border, background:T.white, color:T.body, borderRadius:"5px", padding:"4px 6px", fontSize:9.5, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{trS("View")}</button>
                    <button onClick={function(){ quickBook(w); }} style={{ border:"none", background:"linear-gradient(135deg,"+T.teal+","+T.tealM+")", color:T.base, borderRadius:"6px", padding:"4px 7px", fontSize:9.5, fontWeight:800, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{trS("Book")}</button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={col(12)}>
            {filtered.map(function(w) {
              var nearYou = userLoc && typeof w._distanceKm==="number" && w._distanceKm<=30;
              return (
                <div key={w.id} className="lift" style={Object.assign(card(18), row("center","space-between"), { cursor:"pointer", background:"linear-gradient(145deg,rgba(255,255,255,.56) 0%,rgba(247,251,255,.28) 100%)", border:"1px solid rgba(255,255,255,.62)", borderRadius:18 })}>
                  <div style={row("center","flex-start",16)}>
                    <Avi text={w.avi} bg={w.color} size={52} r={12} ring={w.verified} />
                    <div>
                      <div style={row("center","flex-start",10)}><div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink }}>{w.name}</div><TrustLevel score={w.score} /><Chip label={"Match "+w._matchScore} color={T.tealM} size={10} />{nearYou && <Chip label="Near You" color={T.green} size={10} dot={true} />}</div>
                      <div style={{ fontSize:13, color:T.muted, marginTop:3 }}>{w.role} - {w.area}, {w.city} - {w.exp} yrs</div>
                      <div style={{ fontSize:12.5, color:T.body, marginTop:4 }}>Risk {w._signals.riskConfidence}% • Response {w._signals.responseMins} min • Repeat hire {w._signals.repeatHireRate}%</div>
                    </div>
                  </div>
                  <div style={Object.assign(col(8), { textAlign:"right" })}>
                    <Score n={w.score} count={w.reviews} />
                    <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink }}>Rs.{w.salary}</div>
                    {userLoc && typeof w._distanceKm==="number" && <div style={{ fontSize:12, fontWeight:700, color:T.tealM }}>{w._distanceKm<1 ? "<1 km" : (Math.round(w._distanceKm*10)/10)+" km"}</div>}
                    <div style={Object.assign(row("center","flex-end",6), { marginTop:6 })}><button onClick={function(){ openWorker(w); }} style={{ border:"1px solid #D5DEE9", background:"#fff", color:T.body, borderRadius:T.r, padding:"6px 8px", fontSize:11.5, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{trS("View")}</button><button onClick={function(){ quickBook(w); }} style={{ border:"none", background:"linear-gradient(135deg,"+T.teal+","+T.tealM+")", color:T.base, borderRadius:T.r, padding:"6px 9px", fontSize:11.5, fontWeight:800, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui", boxShadow:"0 3px 12px "+T.tealGlow }}>{trS("Book")}</button></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {interviewWorker && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:340, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }} onClick={function(){ setInterviewWorker(null); }}>
          <div style={card(24, { maxWidth:420, width:"100%" })} onClick={function(e){ e.stopPropagation(); }}>
            <div className="font-display" style={{ fontSize:20, fontWeight:800, color:T.ink, marginBottom:6 }}>Schedule Interview</div>
            <div style={{ fontSize:13.5, color:T.muted, marginBottom:14 }}>Worker: {interviewWorker.name}</div>
            <select value={interviewSlot} onChange={function(e){ setInterviewSlot(e.target.value); }} style={Object.assign({}, inp, { height:42, marginBottom:12 })}>
              {["Today 6:00 PM","Tomorrow 11:00 AM","Tomorrow 6:30 PM","This Weekend 10:30 AM"].map(function(slot){ return <option key={slot}>{slot}</option>; })}
            </select>
            <BtnTeal onClick={submitInterview} full={true} style={{ padding:"11px" }}>Send Interview Request</BtnTeal>
            <BtnGhost onClick={function(){ setInterviewWorker(null); }} full={true} style={{ marginTop:10, padding:"10px" }}>Cancel</BtnGhost>
          </div>
        </div>
      )}
    </div>
  );
}

// --- WORKER PROFILE ------------------------------------------
function WorkerView(props) {
  var wId=props.wId, setPage=props.setPage;
  var w = WORKERS.filter(function(x){ return x.id===wId; })[0] || WORKERS[0];
  var hireState=useState(false), ratedState=useState(0);
  var hireDateState=useState(""), hireDurationState=useState("Part-time (4 hrs/day)"), hireMessageState=useState(""), toastState=useState("");
  var hire=hireState[0],setHire=hireState[1];
  var rated=ratedState[0],setRated=ratedState[1];
  var hireDate=hireDateState[0],setHireDate=hireDateState[1];
  var hireDuration=hireDurationState[0],setHireDuration=hireDurationState[1];
  var hireMessage=hireMessageState[0],setHireMessage=hireMessageState[1];
  var toast=toastState[0],setToast=toastState[1];

  function notify(message, type, title) {
    setToast({ text:message, type:type||"success", title:title||"Action complete" });
    setTimeout(function(){ setToast(""); }, 2300);
  }

  async function submitHireRequest() {
    if (!hireDate) {
      notify("Please choose a start date before sending the request.", "warn", "Missing details");
      return;
    }
    try {
      await apiSubmitContact({
        name:"Hire Request",
        phone:"9999999999",
        message:"Hire request for "+w.name+". Start: "+hireDate+". Duration: "+hireDuration+". Note: "+(hireMessage || "N/A")
      });
      setHire(false);
      setHireMessage("");
      notify("Hire request sent to "+w.name+".", "success", "Request sent");
    } catch {
      notify("Could not send hire request. Check backend and retry.", "warn", "Request failed");
    }
  }

  function submitRating(score) {
    setRated(score);
    notify("You rated "+w.name+" "+score+" stars.", "info", "Rating saved");
  }

  return (
    <div className="page-shell page-enter" style={{ background:T.offwhite }}>
      <div className="page-wrap" style={{ maxWidth:1100, margin:"0 auto", padding:"32px 32px" }}>
        <button onClick={function(){ setPage("search"); }} style={{ background:"none", border:"none", fontSize:14, color:T.tealM, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui", marginBottom:24 }}>{trS("Back to Search")}</button>
        <div className="grid-profile" style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:22 }}>
          <div style={col(18)}>
            <div style={card(32)}>
              <div style={row("flex-start","space-between")}>
                <div style={row("flex-start","flex-start",20)}>
                  <Avi text={w.avi} bg={w.color} size={80} r={18} ring={w.verified} />
                  <div>
                    <h1 className="font-display" style={{ fontSize:28, fontWeight:800, color:T.ink, marginBottom:4 }}>{w.name}</h1>
                    <div style={{ fontSize:15, color:T.muted, marginBottom:10 }}>{w.role} - {w.area}, {w.city}</div>
                    <div style={row("center","flex-start",8)}>
                      {w.badges.map(function(b){ return <Chip key={b} label={b} color={T.tealM} />; })}
                    </div>
                  </div>
                </div>
                <div style={col(8)}>
                  <Score n={w.score} count={w.reviews} />
                  <TrustLevel score={w.score} />
                  <Chip label={w.avail} color={w.avail==="Available"?T.green:T.amber} dot={true} />
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginTop:24 }}>
                {[["Experience",w.exp+" yrs"],["Since",w.since],["Salary","Rs."+w.salary],["Completion",w.completePct+"%"]].map(function(item) {
                  return (
                    <div key={item[0]} style={{ background:T.subtle, borderRadius:T.rM, padding:"12px 14px" }}>
                      <div style={{ fontSize:11, color:T.muted, marginBottom:3 }}>{item[0]}</div>
                      <div className="font-display" style={{ fontSize:17, fontWeight:800, color:T.ink }}>{item[1]}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop:20, background:T.subtle, borderRadius:T.rM, padding:16 }}>
                <div style={{ fontSize:13, fontWeight:600, color:T.ink, marginBottom:6 }}>About</div>
                <p style={{ fontSize:14, color:T.body, lineHeight:1.75 }}>{w.bio}</p>
              </div>
            </div>

            <div style={card(24)}>
              <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:14 }}>Skills and Languages</div>
              <div style={Object.assign(row("center","flex-start",8), { flexWrap:"wrap", marginBottom:12 })}>
                {w.skills.map(function(s){ return <Chip key={s} label={s} color={T.tealM} />; })}
              </div>
              <div style={{ fontSize:13, color:T.muted }}>Languages: {w.lang.join(", ")}</div>
            </div>

            <div style={card(24)}>
              <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:18 }}>Verified Work History</div>
              {w.jobs.map(function(j, i) {
                return (
                  <div key={i} style={{ borderLeft:"3px solid "+T.tealM, paddingLeft:20, marginBottom:24 }}>
                    <div style={Object.assign(row("center","space-between"), { marginBottom:6 })}>
                      <div className="font-display" style={{ fontSize:14, fontWeight:800, color:T.ink }}>{j.emp}</div>
                      {j.verified && <Chip label="Employer Verified" color={T.teal} size={10} />}
                    </div>
                    <div style={{ fontSize:13, color:T.muted, marginBottom:8 }}>{j.role} - {j.dur}</div>
                    <Stars n={j.rating} size={13} />
                    <p style={{ fontSize:13.5, color:T.body, fontStyle:"italic", marginTop:8, lineHeight:1.65 }}>"{j.review}"</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sidebar-sticky" style={{ position:"sticky", top:80 }}>
            <div style={card(24)}>
              <BtnTeal onClick={function(){ setHire(true); }} full={true} style={{ padding:"14px", fontSize:15 }}>Hire {w.name.split(" ")[0]}</BtnTeal>
              <div style={{ height:1, background:"#F0F4F9", margin:"18px 0" }} />
              <div style={{ fontSize:13, fontWeight:700, color:T.ink, marginBottom:12 }}>Quick Info</div>
              {[["Location",w.area+", "+w.city],["Pay","Rs."+w.salary],["Status",w.avail],["Since",w.since]].map(function(item) {
                return (
                  <div key={item[0]} style={Object.assign(row("flex-start","space-between"), { padding:"9px 0", borderBottom:"1px solid #F0F4F9" })}>
                    <span style={{ fontSize:12, color:T.muted }}>{item[0]}</span>
                    <span style={{ fontSize:12.5, fontWeight:600, color:T.ink, textAlign:"right", maxWidth:140 }}>{item[1]}</span>
                  </div>
                );
              })}
              <div style={{ height:1, background:"#F0F4F9", margin:"18px 0" }} />
              <div style={{ fontSize:13, fontWeight:700, color:T.ink, marginBottom:12 }}>Rate this worker</div>
              <Stars n={rated} size={28} interactive={true} onChange={submitRating} />
            </div>
          </div>
        </div>
      </div>

      {hire && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }} onClick={function(){ setHire(false); }}>
          <div style={card(32, { maxWidth:440, width:"100%" })} onClick={function(e){ e.stopPropagation(); }}>
            <div className="font-display" style={{ fontSize:20, fontWeight:800, color:T.ink, marginBottom:6 }}>Hire {w.name}</div>
            <p style={{ fontSize:14, color:T.muted, marginBottom:22 }}>Direct hire. No commission. No middleman.</p>
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:12.5, fontWeight:600, color:T.ink, marginBottom:6 }}>Start Date</div>
              <input type="date" value={hireDate} onChange={function(e){ setHireDate(e.target.value); }} style={Object.assign({}, inp, { borderRadius:T.r, height:44 })} />
            </div>
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:12.5, fontWeight:600, color:T.ink, marginBottom:6 }}>Duration</div>
              <select value={hireDuration} onChange={function(e){ setHireDuration(e.target.value); }} style={Object.assign({}, inp, { borderRadius:T.r, height:44 })}>
                <option>Part-time (4 hrs/day)</option>
                <option>Full-time (8 hrs/day)</option>
                <option>Live-in</option>
                <option>One-time job</option>
              </select>
            </div>
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:12.5, fontWeight:600, color:T.ink, marginBottom:6 }}>Message</div>
              <textarea value={hireMessage} onChange={function(e){ setHireMessage(e.target.value); }} rows={3} placeholder="Tell the worker about the job..." style={Object.assign({}, inp, { resize:"none", borderRadius:T.r })} />
            </div>
            <BtnTeal onClick={submitHireRequest} full={true} style={{ padding:"13px", marginTop:8 }}>Send Request</BtnTeal>
            <BtnGhost onClick={function(){ setHire(false); }} full={true} style={{ marginTop:10, padding:"11px" }}>Cancel</BtnGhost>
          </div>
        </div>
      )}
      <ActionToast message={toast} />
    </div>
  );
}

// --- PRICING -------------------------------------------------
function Pricing(props) {
  var setPage=props.setPage;
  var cycleState=useState("monthly"), tabState=useState("societies");
  var cycle=cycleState[0],setCycle=cycleState[1];
  var tab=tabState[0],setTab=tabState[1];

  var sPlans = [
    { name:"Free", monthly:0, annual:0, color:T.tealM, ghost:true, sub:"For small societies evaluating digitisation", features:["50 worker profiles","Basic entry log","Resident app","Email support"], cta:"Start free" },
    { name:"Pro", monthly:2999, annual:1999, color:T.violet, popular:true, sub:"For active societies standardising operations", features:["Unlimited profiles","QR gate management","Real-time alerts","Monthly audit PDF","WhatsApp integration","Priority support","Custom branding"], cta:"Start 30-day trial" },
    { name:"Estate", monthly:7999, annual:4999, color:"#7C3AED", sub:"For multi-tower and professionally managed communities", features:["Everything in Pro","Multi-tower support","API access","Dedicated account manager","99.9% SLA"], cta:"Contact sales" },
  ];
  var wPlans = [
    { name:"Basic", monthly:0, annual:0, color:T.tealM, ghost:true, sub:"For workers building a verified professional record", features:["Verified profile","WhatsApp share","Unlimited ratings","QR Trust Card","Job search"], cta:"Create free profile" },
    { name:"Pro", monthly:149, annual:99, color:T.amber, popular:true, sub:"For workers seeking higher visibility and repeat hiring", features:["Everything in Basic","Priority placement","Employment letter PDF","Income proof for banks","Weekly job alerts","Premium badge","Chat support"], cta:"Go Pro for Rs.149/mo" },
    { name:"Worker+", monthly:299, annual:199, color:T.red, sub:"For workers combining employability with financial protection", features:["Everything in Pro","Salary advance Rs.25K","Accident insurance Rs.1L","Free health check","Training certifications","Featured slot"], cta:"Get all benefits" },
  ];
  var plans = tab==="societies" ? sPlans : wPlans;

  return (
    <div style={{ background:T.white }}>
      <section className="reveal" data-reveal="true" style={{ padding:"80px 32px 60px", background:"radial-gradient(ellipse 80% 60% at 50% 0%,rgba(139,92,246,0.06) 0%,transparent 70%)" }}>
        <div style={{ maxWidth:860, margin:"0 auto", textAlign:"center" }}>
          <Chip label="PRICING" color={T.violet} size={11} />
          <h1 className="font-display h1-big" style={{ fontSize:50, fontWeight:800, color:T.ink, letterSpacing:"-1.8px", margin:"18px 0 14px" }}>Pricing designed for operational adoption.</h1>
          <p style={{ fontSize:16, color:T.muted, marginBottom:40 }}>Transparent plans for societies, workers, and enterprise buyers. No brokerage fees, opaque commissions, or long implementation cycles.</p>
          <div style={{ display:"inline-flex", background:T.subtle, border:"1px solid #E2E8F0", borderRadius:T.rM, padding:4, marginBottom:32 }}>
            {[["societies","For Societies"],["workers","For Workers"]].map(function(item) {
              return (
                <button key={item[0]} onClick={function(){ setTab(item[0]); }}
                  style={{ padding:"10px 28px", borderRadius:11, border:"none", cursor:"pointer", background:tab===item[0]?T.white:"transparent", boxShadow:tab===item[0]?T.s1:"none", fontSize:14, fontWeight:tab===item[0]?700:500, color:tab===item[0]?T.ink:T.muted, fontFamily:"'Plus Jakarta Sans',system-ui", transition:"all 0.2s" }}>
                  {item[1]}
                </button>
              );
            })}
          </div>
          <div style={row("center","center",12)}>
            <span style={{ fontSize:14, color:cycle==="monthly"?T.ink:T.muted, fontWeight:cycle==="monthly"?600:400 }}>Monthly</span>
            <div onClick={function(){ setCycle(function(c){ return c==="monthly"?"annual":"monthly"; }); }}
              style={{ width:44, height:24, background:cycle==="annual"?T.teal:"#CBD5E1", borderRadius:12, position:"relative", cursor:"pointer", transition:"background 0.2s" }}>
              <div style={{ width:18, height:18, background:"#fff", borderRadius:"50%", position:"absolute", top:3, left:cycle==="annual"?23:3, transition:"left 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.18)" }} />
            </div>
            <span style={{ fontSize:14, color:cycle==="annual"?T.ink:T.muted, fontWeight:cycle==="annual"?600:400 }}>Annual</span>
            {cycle==="annual" && <Chip label="Save 33%" color={T.teal} size={11} />}
          </div>
          <div className="reveal stagger-1" data-reveal="true" style={{ marginTop:26, display:"inline-flex", gap:10, flexWrap:"wrap", justifyContent:"center", background:"rgba(255,255,255,0.88)", border:"1px solid #E2E8F0", borderRadius:999, padding:"10px 14px" }}>
            {[
              "Implementation in days, not months",
              "Formal audit trails and resident logs",
              "Support for both free adoption and scaled roll-out"
            ].map(function(item) {
              return <span key={item} style={{ fontSize:12.5, color:T.body }}>{item}</span>;
            })}
          </div>
        </div>
      </section>
      <section className="reveal" data-reveal="true" style={{ padding:"40px 32px 80px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div className="grid-plan" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:22, alignItems:"start" }}>
            {plans.map(function(p) {
              var price = cycle==="monthly" ? p.monthly : p.annual;
              return (
                <div key={p.name} className="lift reveal stagger-2" data-reveal="true" style={card(32, { border:p.popular?"2px solid "+p.color:"1px solid #E8EDF4", position:"relative" })}>
                  {p.popular && <div style={{ position:"absolute", top:-13, left:"50%", transform:"translateX(-50%)", background:p.color, color:"#fff", borderRadius:T.rX, padding:"5px 16px", fontSize:11, fontWeight:700, whiteSpace:"nowrap" }}>MOST POPULAR</div>}
                  <div style={{ fontSize:16, fontWeight:700, color:T.ink, marginBottom:3 }}>{p.name}</div>
                  <div style={{ fontSize:13, color:T.muted, marginBottom:14 }}>{p.sub}</div>
                  <div style={{ fontSize:40, fontWeight:800, color:p.color, fontFamily:"'Syne',system-ui", lineHeight:1, marginBottom:4 }}>{price===0?"Rs.0":"Rs."+price.toLocaleString()}</div>
                  <div style={{ height:1, background:"#F0F4F9", margin:"18px 0" }} />
                  {p.features.map(function(f) {
                    return (
                      <div key={f} style={Object.assign(row("flex-start","flex-start",9), { marginBottom:10 })}>
                        <span style={{ color:p.color, fontSize:14, flexShrink:0, marginTop:1 }}>+</span>
                        <span style={{ fontSize:13.5, color:T.body }}>{f}</span>
                      </div>
                    );
                  })}
                  <div style={{ marginTop:22 }}>
                    {p.ghost ? <BtnGhost onClick={function(){ setPage("auth"); }} full={true}>{p.cta}</BtnGhost>
                      : p.color===T.violet||p.color==="#7C3AED" ? <BtnViolet onClick={function(){ setPage("auth"); }} full={true}>{p.cta}</BtnViolet>
                      : p.color===T.amber ? <BtnAmber onClick={function(){ setPage("auth"); }} full={true}>{p.cta}</BtnAmber>
                      : <BtnTeal onClick={function(){ setPage("auth"); }} full={true}>{p.cta}</BtnTeal>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

// --- FOR SOCIETIES -------------------------------------------
function ForSocieties(props) {
  var setPage=props.setPage, setUser=props.setUser;
  var flatsState=useState(320), workersState=useState(72), incidentsState=useState(9);
  var flats=flatsState[0],setFlats=flatsState[1];
  var workers=workersState[0],setWorkers=workersState[1];
  var incidents=incidentsState[0],setIncidents=incidentsState[1];

  var monthlyTimeSaved = Math.round((workers * 22 * 4.5) / 60);
  var reducedIncidents = Math.max(0, Math.round(incidents * 0.62));
  var residentTrustLift = Math.min(32, Math.max(8, Math.round((workers / Math.max(1, flats)) * 100 * 0.35)));

  return (
    <div>
      <section className="reveal" data-reveal="true" style={{ padding:"88px 32px", background:"radial-gradient(ellipse 70% 60% at 30% 50%,rgba(139,92,246,0.08) 0%,transparent 60%),"+T.white, borderBottom:"1px solid #E8EDF4" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="grid-hero" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"center" }}>
            <div>
              <Chip label="FOR SOCIETIES AND RWAS" color={T.violet} size={11} />
              <h1 className="font-display h1-big grad-violet" style={{ fontSize:52, fontWeight:800, color:T.ink, letterSpacing:"-1.8px", lineHeight:1.08, margin:"20px 0 18px" }}>Operational control for<br /><span>modern residential communities.</span></h1>
              <p style={{ fontSize:16, color:T.muted, lineHeight:1.8, marginBottom:36, maxWidth:460 }}>Replace fragmented resident groups and manual gate registers with a formal workforce registry, resident-safe approvals, and auditable entry control.</p>
              <div style={row("center","flex-start",14)}>
                <BtnViolet onClick={function(){ setUser({ name:"Prestige Society", type:"society", id:99 }); setPage("society-dashboard"); }} style={{ padding:"14px 28px" }}>Set Up Society Hub</BtnViolet>
                <BtnGhost onClick={function(){ setUser({ name:"Demo Society", type:"society", id:100 }); setPage("society-dashboard"); }} >View live demo</BtnGhost>
              </div>
            </div>
            <div className="lift" style={card(26, { border:"1px solid "+T.violet+"25", boxShadow:"0 0 40px "+T.violetGlow })}>
              <div style={Object.assign(row("center","space-between"), { marginBottom:20 })}>
                <div className="font-display" style={{ fontSize:14, fontWeight:700, color:T.ink }}>Prestige Lakeside - Bengaluru</div>
                <Chip label="LIVE" color={T.green} dot={true} size={11} />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:18 }}>
                {[["320","Flats",T.violet],["72","Workers",T.teal],["14","Today Entries",T.amber],["0","Unverified",T.green]].map(function(item) {
                  return (
                    <div key={item[1]} style={{ background:T.subtle, borderRadius:T.rM, padding:"14px 16px" }}>
                      <div className="font-display" style={{ fontSize:26, fontWeight:800, color:item[2], lineHeight:1 }}>{item[0]}</div>
                      <div style={{ fontSize:12, color:T.muted, marginTop:4 }}>{item[1]}</div>
                    </div>
                  );
                })}
              </div>
              {["Rekha Devi - Flat 402 - 07:34 AM","Rajan Kumar - Flat 118 - 08:12 AM","Suresh Nair - Gate - 08:15 AM"].map(function(e) {
                return <div key={e} style={Object.assign(row("center","space-between"), { padding:"9px 12px", background:T.greenBg, border:"1px solid #A7F3D0", borderRadius:9, marginBottom:8, fontSize:12.5, color:T.green, fontWeight:600 })}>{e} OK</div>;
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="sec-pad reveal" data-reveal="true" style={{ padding:"72px 32px", background:T.offwhite }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
              <h2 className="font-display h2-big" style={{ fontSize:36, fontWeight:800, color:T.ink, textAlign:"center", marginBottom:48 }}>Built for committee governance, guard operations, and resident trust.</h2>
          <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {[["Registry","Every worker verified and organized. Filter by skill, status, flat access."],["QR Gate","Guards scan QR codes. Full profile loads instantly. No unknowns."],["Alerts","Flagged worker tries entry? Residents and committee notified instantly."],["Feedback","Residents rate workers. Issues auto-escalated."],["Reports","Full entry log - who, when, which flat - as PDF."],["WhatsApp","Workers share Shramik QR. Verification takes 2 seconds."]].map(function(f) {
              return (
                <div key={f[0]} className="lift card-glow" style={card(26)}>
                  <div className="font-display" style={{ fontSize:16, fontWeight:800, color:T.ink, marginBottom:8 }}>{f[0]}</div>
                  <div style={{ fontSize:13.5, color:T.muted, lineHeight:1.65 }}>{f[1]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec-pad reveal" data-reveal="true" style={{ padding:"72px 32px", background:T.white, borderTop:"1px solid #E8EDF4" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:20 }}>
            <div style={card(24, { border:"1px solid "+T.violet+"25" })}>
              <div className="font-display" style={{ fontSize:18, fontWeight:800, color:T.ink, marginBottom:8 }}>Society Impact Planner</div>
              <p style={{ fontSize:13.5, color:T.muted, marginBottom:18, lineHeight:1.65 }}>Estimate committee-level operational gains from verified worker workflows and digital gate approvals.</p>
              <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:16 }}>
                <div>
                  <div style={{ fontSize:12, color:T.muted, marginBottom:6 }}>Total flats</div>
                  <input type="number" min={80} max={2000} value={flats} onChange={function(e){ setFlats(Number(e.target.value||0)); }} style={Object.assign({}, inp, { height:42, borderRadius:T.r })} />
                </div>
                <div>
                  <div style={{ fontSize:12, color:T.muted, marginBottom:6 }}>Active workers</div>
                  <input type="number" min={20} max={1000} value={workers} onChange={function(e){ setWorkers(Number(e.target.value||0)); }} style={Object.assign({}, inp, { height:42, borderRadius:T.r })} />
                </div>
                <div>
                  <div style={{ fontSize:12, color:T.muted, marginBottom:6 }}>Monthly incidents</div>
                  <input type="number" min={0} max={120} value={incidents} onChange={function(e){ setIncidents(Number(e.target.value||0)); }} style={Object.assign({}, inp, { height:42, borderRadius:T.r })} />
                </div>
              </div>
              <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                <div style={{ background:T.subtle, borderRadius:T.rM, padding:"12px 14px" }}>
                  <div style={{ fontSize:11, color:T.muted }}>Monthly guard-hours saved</div>
                  <div className="font-display" style={{ fontSize:22, fontWeight:800, color:T.violet }}>{monthlyTimeSaved} hrs</div>
                </div>
                <div style={{ background:T.subtle, borderRadius:T.rM, padding:"12px 14px" }}>
                  <div style={{ fontSize:11, color:T.muted }}>Incidents prevented</div>
                  <div className="font-display" style={{ fontSize:22, fontWeight:800, color:T.teal }}>{reducedIncidents}/month</div>
                </div>
                <div style={{ background:T.subtle, borderRadius:T.rM, padding:"12px 14px" }}>
                  <div style={{ fontSize:11, color:T.muted }}>Resident trust lift</div>
                  <div className="font-display" style={{ fontSize:22, fontWeight:800, color:T.green }}>+{residentTrustLift}%</div>
                </div>
              </div>
            </div>

            <div style={card(24)}>
              <div className="font-display" style={{ fontSize:16, fontWeight:800, color:T.ink, marginBottom:12 }}>Stakeholder Lanes</div>
              {[
                ["Committee", "Audit-ready compliance reports and policy controls.", T.violet],
                ["Guards", "QR-first approvals with unknown-entry escalation in seconds.", T.teal],
                ["Residents", "Live alerts, notices, and verified workforce trust signals.", T.green],
              ].map(function(item) {
                return (
                  <div key={item[0]} style={{ background:T.subtle, borderRadius:T.r, padding:"12px 14px", marginBottom:10, borderLeft:"3px solid "+item[2] }}>
                    <div className="font-display" style={{ fontSize:13.5, fontWeight:800, color:T.ink, marginBottom:4 }}>{item[0]}</div>
                    <div style={{ fontSize:12.5, color:T.muted, lineHeight:1.6 }}>{item[1]}</div>
                  </div>
                );
              })}
              <BtnViolet onClick={function(){ setUser({ name:"Impact Demo Society", type:"society", id:101 }); setPage("society-dashboard"); }} full={true} style={{ marginTop:6 }}>Launch Impact Demo</BtnViolet>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- FOR WORKERS ---------------------------------------------
function ForWorkers(props) {
  var setPage=props.setPage;
  return (
    <div>
      <section className="reveal" data-reveal="true" style={{ padding:"88px 32px", background:"radial-gradient(ellipse 70% 60% at 80% 50%,rgba(245,158,11,0.07) 0%,transparent 60%),"+T.white, borderBottom:"1px solid #E8EDF4" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="grid-hero" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"center" }}>
            <div>
              <Chip label="FOR MAIDS COOKS PLUMBERS GUARDS DRIVERS" color={T.amber} size={11} />
              <h1 className="font-display h1-big grad-amber" style={{ fontSize:52, fontWeight:800, color:T.ink, letterSpacing:"-1.8px", lineHeight:1.08, margin:"20px 0 18px" }}>A verified professional identity<br /><span>for informal workers.</span></h1>
              <p style={{ fontSize:16, color:T.muted, lineHeight:1.8, marginBottom:36, maxWidth:450 }}>Build a portable work record that employers can trust. Verified identity, ratings, and work history improve discoverability and support stronger wage outcomes.</p>
              <BtnAmber onClick={function(){ setPage("auth"); }} style={{ padding:"14px 28px", fontSize:15 }}>Create free profile</BtnAmber>
            </div>
            <div className="lift" style={card(26, { maxWidth:340, boxShadow:T.s3 })}>
              <div style={Object.assign(row("flex-start","space-between"), { marginBottom:18 })}>
                <div style={row("flex-start","flex-start",14)}>
                  <Avi text="RD" bg={T.tealM} size={54} r={13} ring={true} />
                  <div>
                    <div className="font-display" style={{ fontSize:16, fontWeight:800, color:T.ink }}>Rekha Devi</div>
                    <div style={{ fontSize:12, color:T.muted }}>Domestic Helper</div>
                    <div style={{ marginTop:5 }}><Chip label="Verified" color={T.teal} size={11} /></div>
                  </div>
                </div>
                <Score n={4.8} count={34} />
              </div>
              <div style={{ background:T.amberBg||"rgba(245,158,11,0.08)", border:"1px solid "+T.amber+"22", borderRadius:T.r, padding:"12px 14px", marginBottom:14 }}>
                <div style={Object.assign(row("center","space-between"), { marginBottom:7 })}>
                  <span style={{ fontSize:12, fontWeight:700, color:T.amber }}>Trust Score</span>
                  <span style={{ fontSize:13, fontWeight:800, color:T.amber }}>96 / 100</span>
                </div>
                <div style={{ height:7, background:T.amber+"20", borderRadius:4, overflow:"hidden" }}>
                  <div style={{ width:"96%", height:"100%", background:"linear-gradient(90deg,"+T.amber+",#FBBF24)", borderRadius:4 }} />
                </div>
              </div>
              <div style={Object.assign(row("center","space-between"), { padding:"11px 14px", background:T.greenBg, border:"1px solid #A7F3D0", borderRadius:T.r })}>
                <div>
                  <div style={{ fontSize:11, color:T.muted }}>Monthly Earnings</div>
                  <div className="font-display" style={{ fontSize:22, fontWeight:800, color:T.green }}>Rs.14,000</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:11, color:T.muted }}>vs. before profile</div>
                  <div style={{ fontSize:15, fontWeight:700, color:T.tealM }}>+42% more</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec-pad reveal" data-reveal="true" style={{ padding:"72px 32px", background:T.offwhite }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <h2 className="font-display h2-big" style={{ fontSize:36, fontWeight:800, color:T.ink, textAlign:"center", marginBottom:48 }}>A simple onboarding flow, designed for daily use.</h2>
          <div className="grid-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18 }}>
            {[["01","Register","Create a profile with a mobile number in under two minutes."],["02","Verify","Complete identity verification to unlock the verified badge."],["03","Work","Share your QR profile and accept direct hiring requests."],["04","Grow","Build ratings, return bookings, and stronger monthly income."]].map(function(s) {
              return (
                <div key={s[0]} className="lift card-glow" style={card(24, { textAlign:"center", borderTop:"3px solid "+T.amber })}>
                  <div className="font-display" style={{ fontSize:30, fontWeight:800, color:T.amber+"30", marginBottom:4 }}>{s[0]}</div>
                  <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:6 }}>{s[1]}</div>
                  <div style={{ fontSize:12.5, color:T.muted, lineHeight:1.6 }}>{s[2]}</div>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign:"center", marginTop:44 }}>
            <BtnAmber onClick={function(){ setPage("auth"); }} style={{ padding:"15px 36px", fontSize:16 }}>Create my free profile</BtnAmber>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- ENTERPRISE ----------------------------------------------
function Enterprise(props) {
  var setPage=props.setPage;
  var sitesState=useState(6), targetState=useState(120), strictState=useState("high");
  var sites=sitesState[0],setSites=sitesState[1];
  var target=targetState[0],setTarget=targetState[1];
  var strict=strictState[0],setStrict=strictState[1];

  var strictMult = strict==="high" ? 1.2 : strict==="medium" ? 1 : 0.85;
  var deployDays = Math.max(7, Math.round((target / 8) * strictMult));
  var monthlySavings = Math.round(target * 850);
  var complianceDocs = Math.round(target * (strict==="high" ? 4 : strict==="medium" ? 3 : 2));

  return (
    <div>
      <section className="mesh-bg dot-bg reveal" data-reveal="true" style={{ padding:"88px 32px 96px", overflow:"hidden" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="grid-hero" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"center" }}>
            <div>
              <Chip label="ENTERPRISE AND CORPORATE" color={T.violetL} size={11} />
              <h1 className="font-display h1-big grad-violet" style={{ fontSize:52, fontWeight:800, color:"#fff", letterSpacing:"-1.8px", lineHeight:1.08, margin:"20px 0 18px" }}>Compliance-ready workforce infrastructure<br /><span>at enterprise scale.</span></h1>
              <p style={{ fontSize:16, color:"rgba(255,255,255,0.55)", lineHeight:1.8, marginBottom:36, maxWidth:460 }}>For hospitality, facilities, construction, and healthcare operators that require verified deployment, centralised documentation, and measurable turnaround times.</p>
              <div style={row("center","flex-start",14)}>
                <BtnViolet onClick={function(){ setPage("auth"); }} style={{ padding:"14px 28px" }}>Schedule Demo</BtnViolet>
                <BtnGhost dark={true} onClick={function(){ setPage("pricing"); }} style={{ padding:"14px 24px" }}>Download Brochure</BtnGhost>
              </div>
            </div>
            <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {[["500+","Enterprise Clients"],["48 hr","Hire to Deploy"],["Rs.0","Middleman Fees"],["100%","Compliance Docs"]].map(function(item) {
                return (
                  <div key={item[1]} style={{ background:"rgba(255,255,255,0.06)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:T.rM, padding:24, textAlign:"center" }}>
                    <div className="font-display" style={{ fontSize:32, fontWeight:800, color:T.violetL, lineHeight:1 }}>{item[0]}</div>
                    <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginTop:8 }}>{item[1]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="sec-pad reveal" data-reveal="true" style={{ padding:"80px 32px", background:T.white }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <h2 className="font-display h2-big" style={{ fontSize:36, fontWeight:800, color:T.ink, textAlign:"center", marginBottom:48 }}>Operational coverage across high-trust workforce categories.</h2>
          <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {[["Hotels","Housekeeping, Kitchen Staff, Security, Concierge"],["Construction","Labourers, Masons, Plumbers, Electricians"],["Healthcare","Patient Attendants, Ward Boys, Cleaners"],["Manufacturing","Machine Operators, Line Workers, Supervisors"],["Retail","Security, Janitors, Delivery Staff, Store Help"],["Facility Mgmt","Housekeeping Teams, Plumbers, Electricians"]].map(function(u) {
              return (
                <div key={u[0]} className="lift card-glow" style={card(26)}>
                  <div className="font-display" style={{ fontSize:16, fontWeight:800, color:T.ink, marginBottom:8 }}>{u[0]}</div>
                  <div style={{ fontSize:13.5, color:T.muted, lineHeight:1.65 }}>{u[1]}</div>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign:"center", marginTop:48 }}>
            <BtnViolet onClick={function(){ setPage("auth"); }} style={{ padding:"15px 36px", fontSize:16 }}>Get Enterprise Demo</BtnViolet>
          </div>
        </div>
      </section>

      <section className="sec-pad reveal" data-reveal="true" style={{ padding:"0 32px 80px", background:T.white }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:20 }}>
            <div style={card(24, { border:"1px solid "+T.violet+"20" })}>
              <div className="font-display" style={{ fontSize:18, fontWeight:800, color:T.ink, marginBottom:8 }}>Enterprise Deployment Cockpit</div>
              <p style={{ fontSize:13.5, color:T.muted, marginBottom:16, lineHeight:1.65 }}>Model workforce onboarding velocity, compliance load, and brokerage savings before launch.</p>
              <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:16 }}>
                <div>
                  <div style={{ fontSize:12, color:T.muted, marginBottom:6 }}>Sites</div>
                  <input type="number" min={1} max={80} value={sites} onChange={function(e){ setSites(Number(e.target.value||1)); }} style={Object.assign({}, inp, { height:42, borderRadius:T.r })} />
                </div>
                <div>
                  <div style={{ fontSize:12, color:T.muted, marginBottom:6 }}>Hiring target</div>
                  <input type="number" min={20} max={5000} value={target} onChange={function(e){ setTarget(Number(e.target.value||0)); }} style={Object.assign({}, inp, { height:42, borderRadius:T.r })} />
                </div>
                <div>
                  <div style={{ fontSize:12, color:T.muted, marginBottom:6 }}>Compliance strictness</div>
                  <select value={strict} onChange={function(e){ setStrict(e.target.value); }} style={Object.assign({}, inp, { height:42, borderRadius:T.r })}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="baseline">Baseline</option>
                  </select>
                </div>
              </div>
              <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                <div style={{ background:T.subtle, borderRadius:T.rM, padding:"12px 14px" }}>
                  <div style={{ fontSize:11, color:T.muted }}>Estimated deployment</div>
                  <div className="font-display" style={{ fontSize:22, fontWeight:800, color:T.violet }}>{deployDays} days</div>
                </div>
                <div style={{ background:T.subtle, borderRadius:T.rM, padding:"12px 14px" }}>
                  <div style={{ fontSize:11, color:T.muted }}>Compliance docs pack</div>
                  <div className="font-display" style={{ fontSize:22, fontWeight:800, color:T.teal }}>{complianceDocs}</div>
                </div>
                <div style={{ background:T.subtle, borderRadius:T.rM, padding:"12px 14px" }}>
                  <div style={{ fontSize:11, color:T.muted }}>Brokerage avoided</div>
                  <div className="font-display" style={{ fontSize:22, fontWeight:800, color:T.green }}>Rs.{monthlySavings.toLocaleString()}/mo</div>
                </div>
              </div>
            </div>

            <div style={card(24)}>
              <div className="font-display" style={{ fontSize:16, fontWeight:800, color:T.ink, marginBottom:12 }}>Readiness Checklist</div>
              {[
                ["Policy controls mapped", T.green],
                ["Document templates configured", T.teal],
                ["Site-wise deployment manager assigned", T.violet],
                ["Incident escalation SLA defined", T.amber],
              ].map(function(rowItem) {
                return (
                  <div key={rowItem[0]} style={Object.assign(row("center","space-between"), { padding:"10px 0", borderBottom:"1px solid #F0F4F9" })}>
                    <span style={{ fontSize:13, color:T.body }}>{rowItem[0]}</span>
                    <Chip label="Ready" color={rowItem[1]} size={10} />
                  </div>
                );
              })}
              <BtnViolet onClick={function(){ setPage("auth"); }} full={true} style={{ marginTop:14 }}>Request Enterprise Rollout Plan</BtnViolet>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- AUTH ----------------------------------------------------
function Auth(props) {
  var setPage=props.setPage, setUser=props.setUser;
  var stepState=useState(1), roleState=useState(""), phoneState=useState(""), nameState=useState(""), loadState=useState(false), toastState=useState("");
  var step=stepState[0],setStep=stepState[1];
  var role=roleState[0],setRole=roleState[1];
  var phone=phoneState[0],setPhone=phoneState[1];
  var name=nameState[0],setName=nameState[1];
  var loading=loadState[0],setLoading=loadState[1];
  var toast=toastState[0],setToast=toastState[1];
  var otpState=useState(["","","","","",""]);
  var otp=otpState[0],setOtp=otpState[1];

  function notify(message, type, title) {
    setToast({ text:message, type:type||"info", title:title||"Update" });
    setTimeout(function(){ setToast(""); }, 2200);
  }

  var roles = [
    { id:"employer", icon:"H", label:"Family / Employer", sub:"Hire verified home help", color:T.teal },
    { id:"society",  icon:"S", label:"Society / RWA",     sub:"Manage complex workers",  color:T.violet },
    { id:"worker",   icon:"W", label:"Worker",             sub:"Build my profile",        color:T.amber },
    { id:"admin",    icon:"A", label:"Admin",              sub:"Platform admin",          color:"#94A3B8" },
  ];

  function finish() {
    setLoading(true);
    setTimeout(function() {
      var names = { worker:name||"Rekha Devi", employer:name||"Sharma Family", society:name||"Prestige Society", admin:"Admin" };
      var types = { worker:"worker", employer:"employer", society:"society", admin:"admin" };
      var u = { name:names[role]||names.employer, type:types[role]||"employer" };
      setUser(u);
      notify("Signed in successfully as "+(role||"employer")+".", "success", "Welcome" );
      var pages = { worker:"worker-dashboard", employer:"employer-dashboard", society:"society-dashboard", admin:"admin" };
      setPage(pages[role]||"employer-dashboard");
    }, 1400);
  }

  function updateOtp(i, val) {
    var next = otp.slice();
    next[i] = val;
    setOtp(next);
    if (val && i < 5) {
      var el = document.getElementById("otp-"+( i+1));
      if (el) el.focus();
    }
  }

  return (
    <div className="mesh-bg dot-bg page-enter" style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px" }}>
      <div style={{ width:"100%", maxWidth:480 }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div className="font-display" style={{ fontSize:26, fontWeight:800, color:"#fff" }}>Shramik<span style={{ color:T.teal }}>.</span></div>
          <div style={{ fontSize:14, color:"rgba(255,255,255,0.45)", marginTop:4 }}>{trS("Secure access for workers, employers, societies, and administrators")}</div>
        </div>

        <div style={row("center","center",0)}>
          {[1,2,3].map(function(s) {
            return (
              <div key={s} style={row("center","center",0)}>
                <div style={{ width:34, height:34, borderRadius:"50%", background:s<=step?T.teal:"rgba(255,255,255,0.06)", border:"2px solid "+(s<=step?T.teal:"rgba(255,255,255,0.12)"), display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:s<=step?T.base:"rgba(255,255,255,0.3)", transition:"all 0.3s" }}>
                  {s<step?"v":s}
                </div>
                {s<3 && <div style={{ width:48, height:2, background:s<step?T.teal:"rgba(255,255,255,0.08)", transition:"background 0.3s" }} />}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop:32, background:"rgba(12,24,41,0.85)", backdropFilter:"blur(24px)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:T.rX, padding:36 }}>
          {step===1 && (
            <div>
              <h2 className="font-display" style={{ fontSize:22, fontWeight:800, color:"#fff", marginBottom:6 }}>Who are you?</h2>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.5)", marginBottom:24 }}>{trS("Select the operating role you want to access.")}</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:24 }}>
                {roles.map(function(r) {
                  return (
                    <div key={r.id} onClick={function(){ setRole(r.id); }}
                      style={{ padding:18, borderRadius:T.rM, border:"2px solid "+(role===r.id?r.color:"rgba(255,255,255,0.12)"), background:role===r.id?r.color+"18":"rgba(255,255,255,0.04)", cursor:"pointer", textAlign:"center", transition:"all 0.2s" }}>
                      <div style={{ width:40, height:40, borderRadius:10, background:r.color+"20", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:800, color:r.color, margin:"0 auto 8px", fontFamily:"'Syne',system-ui" }}>{r.icon}</div>
                      <div style={{ fontSize:13, fontWeight:700, color:role===r.id?r.color:"#fff" }}>{r.label}</div>
                      <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)", marginTop:2 }}>{r.sub}</div>
                    </div>
                  );
                })}
              </div>
              <BtnTeal onClick={function(){ if(role) { setStep(2); notify("Role selected: "+role+".", "info", "Step complete"); } }} disabled={!role} full={true} style={{ padding:"13px", fontSize:14.5 }}>Continue</BtnTeal>
            </div>
          )}

          {step===2 && (
            <div>
              <h2 className="font-display" style={{ fontSize:22, fontWeight:800, color:"#fff", marginBottom:6 }}>Enter mobile</h2>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.5)", marginBottom:24 }}>{trS("A verification code will be sent to your registered mobile number.")}</p>
              <div style={Object.assign(row("center","flex-start",0), { border:"1.5px solid rgba(255,255,255,0.15)", borderRadius:T.rM, overflow:"hidden", background:"rgba(255,255,255,0.06)", marginBottom:18 })}>
                <span style={{ padding:"0 16px", fontSize:14, color:"rgba(255,255,255,0.5)", borderRight:"1px solid rgba(255,255,255,0.12)", height:50, display:"flex", alignItems:"center" }}>+91</span>
                <input value={phone} onChange={function(e){ setPhone(e.target.value.replace(/\D/g,"").slice(0,10)); }}
                  placeholder={trS("98765 43210")} maxLength={10}
                  style={{ background:"transparent", border:"none", color:"#fff", flex:1, padding:"0 16px", height:50, fontSize:15, outline:"none", fontFamily:"'Plus Jakarta Sans',system-ui" }} />
              </div>
              <BtnTeal onClick={function(){ if(phone.length>=10) { setStep(3); notify("OTP sent to +91 "+phone+".", "success", "OTP sent"); } }} disabled={phone.length<10} full={true} style={{ padding:"13px" }}>Send OTP</BtnTeal>
              <button onClick={function(){ setStep(1); }} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.4)", fontSize:13, cursor:"pointer", display:"block", margin:"14px auto 0", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{trS("Back")}</button>
            </div>
          )}

          {step===3 && (
            <div>
              <h2 className="font-display" style={{ fontSize:22, fontWeight:800, color:"#fff", marginBottom:6 }}>Enter OTP</h2>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.5)", marginBottom:24 }}>{trS("Sent to +91")} {phone}</p>
              <div style={Object.assign(row("center","center",10), { marginBottom:18 })}>
                {otp.map(function(d, i) {
                  return (
                    <input key={i} id={"otp-"+i} maxLength={1} value={d}
                      onChange={function(e){ updateOtp(i, e.target.value.replace(/\D/,"")); }}
                      className="otp-input"
                      style={{ width:48, height:56, textAlign:"center", fontSize:22, fontWeight:700, background:"rgba(255,255,255,0.06)", border:"2px solid "+(d?T.teal:"rgba(255,255,255,0.12)"), borderRadius:T.rM, color:"#fff", outline:"none", fontFamily:"'Syne',system-ui", transition:"border-color 0.15s" }} />
                  );
                })}
              </div>
              <input value={name} onChange={function(e){ setName(e.target.value); }} placeholder={trS("Your full name")}
                style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1.5px solid rgba(255,255,255,0.12)", borderRadius:T.rM, color:"#fff", padding:"0 16px", height:50, fontSize:15, outline:"none", fontFamily:"'Plus Jakarta Sans',system-ui", marginBottom:18 }} />
              <BtnTeal onClick={finish} disabled={otp.join("").length<4 || !name.trim() || loading} full={true} style={{ padding:"13px" }}>
                {loading?"Verifying...":"Enter Dashboard"}
              </BtnTeal>
              <p style={{ fontSize:11.5, color:"rgba(255,255,255,0.3)", textAlign:"center", marginTop:14 }}>{trS("Demo mode - any OTP works")}</p>
            </div>
          )}
        </div>
      </div>
      <ActionToast message={toast} />
    </div>
  );
}

// --- DASHBOARDS ----------------------------------------------
function DashTabs(props) {
  var tabs=props.tabs, active=props.active, onChange=props.onChange, color=props.color||T.teal;
  var activeTextColor = color===T.base ? T.white : T.base;
  return (
    <div className="reveal in" style={{ display:"inline-flex", background:T.white, border:"1px solid #E8EDF4", borderRadius:T.rM, padding:4, marginBottom:28, gap:3, flexWrap:"nowrap", maxWidth:"100%", overflowX:"auto" }}>
      {tabs.map(function(t) {
        var isActive = active===t[0];
        return (
          <button key={t[0]} onClick={function(){ onChange(t[0]); }}
            style={{ padding:"8px 16px", border:"none", borderRadius:10, cursor:"pointer", fontSize:13.5, fontWeight:isActive?700:500, background:isActive?color:"transparent", color:isActive?activeTextColor:T.muted, fontFamily:"'Plus Jakarta Sans',system-ui", transition:"all 0.2s", whiteSpace:"nowrap", flexShrink:0 }}>
            {biText(t[1], true)}
          </button>
        );
      })}
    </div>
  );
}

function DashboardActionStrip(props) {
  var items = props.items || [];
  return (
    <div style={Object.assign(row("center","flex-start",10), { marginBottom:18, flexWrap:"wrap" })}>
      {items.map(function(item) {
        return (
          <button key={item[0]} onClick={item[2]} style={{ background:item[3]||T.white, border:"1px solid #E2E8F0", borderRadius:999, padding:"9px 14px", fontSize:12.5, fontWeight:700, color:item[1]||T.ink, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{biText(item[0], true)}</button>
        );
      })}
    </div>
  );
}

function normalizeToastText(text, title, type) {
  if (!text || typeof text!=="string") return text;
  if (type==="warn") return text;
  if (title && title!=="Action complete") return text;

  var s = text.trim().replace(/\s+/g, " ");
  if (/^Opening\b/i.test(s)) {
    var openingTail = s.replace(/^Opening\s*/i, "").replace(/[.\s]+$/g, "").toLowerCase();
    return "Opening " + openingTail + ".";
  }
  if (/^Saved\b/i.test(s)) {
    var savedTail = s.replace(/^Saved\s*:?\s*/i, "").replace(/[.\s]+$/g, "").toLowerCase();
    return "Saved: " + savedTail + ".";
  }

  if (/\b(open|opening|opened)\b/i.test(s)) {
    var openTarget = s
      .replace(/\bopened\b/ig, "")
      .replace(/\bopening\b/ig, "")
      .replace(/\bopen\b/ig, "")
      .replace(/\s+/g, " ")
      .replace(/^[:\-\s]+|[.\s]+$/g, "")
      .toLowerCase();
    return "Opening " + (openTarget || "section") + ".";
  }

  if (/\b(saved|updated|submitted|approved|posted|created|resolved|renewed|applied|copied|cleared|added|removed|enabled|disabled|done|sent|moved)\b/i.test(s)) {
    var actionText = s.replace(/[.\s]+$/g, "").toLowerCase();
    return "Saved: " + actionText + ".";
  }

  return s;
}

function ActionToast(props) {
  if (!props.message) return null;
  var payload = typeof props.message === "string"
    ? { text:props.message, type:"success", title:"Action complete" }
    : props.message;
  var type = payload.type || "success";
  var icon = type==="warn" ? "!" : type==="info" ? "i" : "v";
  var normalizedText = normalizeToastText(payload.text, payload.title || "Action complete", type);
  return (
    <div className={"toast "+type} role="status" aria-live="polite">
      <div className="toast-icon">{icon}</div>
      <div className="toast-copy">
        <div className="toast-title">{trS(payload.title || "Action complete")}</div>
        <div className="toast-text">{trS(normalizedText)}</div>
      </div>
    </div>
  );
}

function WorkerDash(props) {
  var user=props.user;
  var tabState=useState("overview");
  var tab=tabState[0],setTab=tabState[1];
  var toastState=useState("");
  var toast=toastState[0],setToast=toastState[1];
  var availabilityState=useState("Available");
  var incomeGoalState=useState(18000);
  var weekHoursState=useState(48);
  var checkinState=useState(false);
  var taskState=useState([
    { id:1, label:"Update today availability", done:false },
    { id:2, label:"Apply top 2 job matches", done:false },
    { id:3, label:"Request one verified review", done:false },
  ]);
  var availability=availabilityState[0],setAvailability=availabilityState[1];
  var incomeGoal=incomeGoalState[0],setIncomeGoal=incomeGoalState[1];
  var weekHours=weekHoursState[0],setWeekHours=weekHoursState[1];
  var _checkedIn=checkinState[0],_setCheckedIn=checkinState[1];
  var dailyTasks=taskState[0],setDailyTasks=taskState[1];
  var w = WORKERS[0];

  function notify(message) {
    setToast(message);
    setTimeout(function(){ setToast(""); }, 2200);
  }

  return (
    <div className="page-shell page-enter" style={{ background:T.offwhite, minHeight:"100vh" }}>
      <div className="page-wrap" style={{ maxWidth:1100, margin:"0 auto", padding:"32px 32px" }}>
        <div className="dashboard-hero" style={{ marginBottom:24 }}>
          <div style={Object.assign(row("center","space-between"), { marginBottom:18 })}>
            <div>
              <h1 className="font-display" style={{ fontSize:28, fontWeight:800, color:"#fff" }}>Welcome back, {user&&user.name?user.name.split(" ")[0]:"Rekha"}</h1>
              <p className="dashboard-sub">Track your reputation, earnings, and new job matches from one place.</p>
            </div>
            <div className="dashboard-chipbar">
              <Chip label="Aadhaar Verified" color={T.teal} />
              <Chip label="Active" color={T.green} dot={true} />
            </div>
          </div>
          <div className="dashboard-chipbar">
            <BtnTeal onClick={function(){ setTab("jobs"); notify("Opening job matches."); }} style={{ padding:"10px 18px", fontSize:13 }}>View Matches</BtnTeal>
            <BtnGhost dark={true} onClick={function(){ setTab("profile"); notify("Opening profile editor."); }} style={{ padding:"10px 18px", fontSize:13 }}>Edit Profile</BtnGhost>
          </div>
        </div>
        <div style={{ marginBottom:16, fontSize:12.5, color:T.muted }}>Use tabs to move between Overview, Jobs, Wallet, Planner and Profile.</div>
        <DashTabs tabs={[["overview","Overview"],["wallet","Wallet"],["ratings","Ratings"],["jobs","Job Matches"],["planner","Work Planner"],["daily","Daily Board"],["profile","Profile"]]} active={tab} onChange={setTab} />

        {tab==="overview" && (
          <div style={col(18)}>
            <div className="dash-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
              {[["Trust Score","96/100",T.gold],["Reviews","34",T.teal],["Profile Views","428",T.violet],["Monthly Pay","Rs.14,000",T.green]].map(function(item) {
                return (
                  <div key={item[0]} className="metric-card">
                    <div style={{ fontSize:12, color:T.muted, marginBottom:3 }}>{item[0]}</div>
                    <div className="font-display" style={{ fontSize:20, fontWeight:800, color:item[2] }}>{item[1]}</div>
                  </div>
                );
              })}
            </div>
            <div style={card(24)}>
              <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:16 }}>Latest Verified Reviews</div>
              {w.jobs.map(function(j, i) {
                return (
                  <div key={i} style={{ padding:"14px", background:T.subtle, borderRadius:T.r, marginBottom:10, borderLeft:"3px solid "+T.tealM }}>
                    <div style={Object.assign(row("center","space-between"), { marginBottom:5 })}>
                      <span style={{ fontSize:13, fontWeight:700, color:T.ink }}>{j.emp}</span>
                      <Stars n={j.rating} size={12} />
                    </div>
                    <p style={{ fontSize:13, color:T.body, fontStyle:"italic" }}>"{j.review}"</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab==="wallet" && (
          <div style={col(18)}>
            <div style={card(0, { overflow:"hidden", background:"linear-gradient(135deg,"+T.l1+","+T.l2+")" })}>
              <div style={{ padding:"28px 28px 0" }}>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:6 }}>Lifetime Earnings</div>
                <div className="font-display" style={{ fontSize:44, fontWeight:800, color:T.teal }}>Rs.1,68,000</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderTop:"1px solid rgba(255,255,255,0.06)", marginTop:20 }}>
                {[["Rs.14,000","Monthly"],["42% more","vs. before"],["98%","Completion"]].map(function(item) {
                  return (
                    <div key={item[1]} style={{ padding:"20px 24px" }}>
                      <div className="font-display" style={{ fontSize:22, fontWeight:800, color:"#fff" }}>{item[0]}</div>
                      <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:4 }}>{item[1]}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
              {[["Salary Advance","Up to Rs.10,000 advance. Instant approval.",T.violet,"Apply"],["Accident Insurance","Rs.1L cover at Rs.29/month.",T.teal,"Get Insured"],["Health Check","Free annual checkup. 500+ centres.",T.green,"Book Free"],["Skill Training","Certifications in cooking, care, more.",T.amber,"View Courses"]].map(function(b) {
                return (
                  <div key={b[0]} className="action-tile" style={card(22, { borderLeft:"3px solid "+b[2] })}>
                    <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:6 }}>{b[0]}</div>
                    <div style={{ fontSize:13, color:T.muted, lineHeight:1.6, marginBottom:14 }}>{b[1]}</div>
                    <button onClick={function(){ notify(b[0]+" opened successfully."); }} style={{ width:"100%", background:b[2]+"12", border:"1px solid "+b[2]+"25", borderRadius:9, padding:9, textAlign:"center", fontSize:13, fontWeight:700, color:b[2], cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{b[3]}</button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab==="ratings" && (
          <div style={col(14)}>
            {w.jobs.map(function(j, i) {
              return (
                <div key={i} style={card(22, { borderLeft:"3px solid "+T.tealM })}>
                  <div style={Object.assign(row("center","space-between"), { marginBottom:7 })}>
                    <div className="font-display" style={{ fontSize:14, fontWeight:800, color:T.ink }}>{j.emp}</div>
                    <Stars n={j.rating} size={13} />
                  </div>
                  <p style={{ fontSize:13.5, color:T.body, fontStyle:"italic", lineHeight:1.65 }}>"{j.review}"</p>
                </div>
              );
            })}
          </div>
        )}

        {tab==="jobs" && (
          <div style={col(12)}>
            {[["Cook needed - Jubilee Hills","Mehta Family","Rs.12,000/mo","95%"],["Full-time domestic help","Krishnan Residence","Rs.15,000/mo","88%"],["Part-time 4 hrs/day","Singh Family","Rs.7,500/mo","79%"]].map(function(j) {
              return (
                <div key={j[0]} className="lift" style={card(22)}>
                  <div style={row("center","space-between")}>
                    <div>
                      <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:4 }}>{j[0]}</div>
                      <div style={{ fontSize:13, color:T.muted }}>{j[1]} - {j[2]}</div>
                    </div>
                    <div style={Object.assign(col(8), { textAlign:"right" })}>
                      <div className="font-display" style={{ fontSize:24, fontWeight:800, color:T.teal }}>{j[3]}</div>
                      <div style={{ fontSize:11, color:T.muted }}>Match</div>
                      <BtnTeal onClick={function(){ notify("Application submitted for "+j[0]+"."); }} style={{ padding:"8px 18px", fontSize:12 }}>Apply</BtnTeal>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab==="profile" && (
          <div style={card(28)}>
            <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:20 }}>Edit Profile</div>
            <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {["Full Name","Role","City","Locality","Expected Salary","Years Experience"].map(function(l) {
                return (
                  <div key={l}>
                    <div style={{ fontSize:12.5, fontWeight:600, color:T.muted, marginBottom:6 }}>{trS(l)}</div>
                    <input defaultValue={l==="Full Name"?w.name:l==="Role"?w.role:l==="City"?w.city:l==="Expected Salary"?w.salary:l==="Years Experience"?String(w.exp):""} style={Object.assign({}, inp, { borderRadius:T.r, height:44 })} placeholder={trS("Enter "+l)} />
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop:16 }}>
              <div style={{ fontSize:12.5, fontWeight:600, color:T.muted, marginBottom:6 }}>{trS("About You")}</div>
              <textarea rows={4} defaultValue={w.bio} style={Object.assign({}, inp, { resize:"vertical" })} />
            </div>
            <BtnTeal onClick={function(){ notify("Profile changes saved."); }} style={{ marginTop:20, padding:"12px 28px" }}>Save Changes</BtnTeal>
          </div>
        )}

        {tab==="planner" && (
          <div style={col(18)}>
            <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
              <div style={card(24)}>
                <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:14 }}>{trS("Availability and Goals")}</div>
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:12.5, color:T.muted, marginBottom:6 }}>{trS("Availability status")}</div>
                  <select value={availability} onChange={function(e){ setAvailability(e.target.value); }} style={Object.assign({}, inp, { height:42, borderRadius:T.r })}>
                    <option>Available</option>
                    <option>Partially Available</option>
                    <option>Not Available</option>
                  </select>
                </div>
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:12.5, color:T.muted, marginBottom:6 }}>{trS("Monthly income goal (Rs.)")}</div>
                  <input type="number" min={5000} max={60000} value={incomeGoal} onChange={function(e){ setIncomeGoal(Number(e.target.value||0)); }} style={Object.assign({}, inp, { height:42, borderRadius:T.r })} />
                </div>
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:12.5, color:T.muted, marginBottom:6 }}>{trS("Hours available per week")}</div>
                  <input type="number" min={10} max={90} value={weekHours} onChange={function(e){ setWeekHours(Number(e.target.value||0)); }} style={Object.assign({}, inp, { height:42, borderRadius:T.r })} />
                </div>
                <BtnTeal onClick={function(){ notify("Work planner updated and reflected in job matching."); }} style={{ padding:"11px 22px" }}>Save Planner</BtnTeal>
              </div>

              <div style={card(24)}>
                <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:14 }}>{trS("Projected Outcomes")}</div>
                {[ 
                  [trS("Suggested matches/week"), Math.max(3, Math.round(weekHours/10))],
                  [trS("Estimated income reach"), "Rs."+Math.round(incomeGoal*0.92).toLocaleString()],
                  [trS("Profile priority"), availability==="Available" ? trS("High") : availability==="Partially Available" ? trS("Medium") : trS("Low")],
                ].map(function(item) {
                  return (
                    <div key={item[0]} style={Object.assign(row("center","space-between"), { padding:"10px 0", borderBottom:"1px solid #F0F4F9" })}>
                      <span style={{ fontSize:13, color:T.body }}>{item[0]}</span>
                      <span style={{ fontSize:13.5, fontWeight:700, color:T.ink }}>{item[1]}</span>
                    </div>
                  );
                })}
                <BtnGhost onClick={function(){ setTab("jobs"); notify("Showing best jobs for your planner settings."); }} full={true} style={{ marginTop:14 }}>Open Recommended Jobs</BtnGhost>
              </div>
            </div>
          </div>
        )}

        {tab==="daily" && (
          <div style={col(16)}>
            <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
              <div style={card(22)}>
                <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:12 }}>Today Checklist</div>
                {dailyTasks.map(function(task) {
                  return (
                    <button key={task.id} onClick={function(){ setDailyTasks(function(prev){ return prev.map(function(x){ return x.id===task.id ? Object.assign({}, x, { done:!x.done }) : x; }); }); }} style={Object.assign(row("center","space-between"), { width:"100%", background:T.subtle, border:"1px solid #E2E8F0", borderRadius:10, padding:"10px 12px", marginBottom:8, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" })}>
                      <span style={{ fontSize:13, color:T.body }}>{task.label}</span>
                      <Chip label={task.done?"Done":"Pending"} color={task.done?T.green:T.amber} size={10} />
                    </button>
                  );
                })}
              </div>
              <div style={card(22)}>
                <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:12 }}>Skill Boost</div>
                {[["Hygiene and Safety", "12 min"],["Client Communication", "9 min"],["Time Management", "11 min"]].map(function(mod) {
                  return (
                    <div key={mod[0]} style={Object.assign(row("center","space-between"), { padding:"9px 0", borderBottom:"1px solid #F0F4F9" })}>
                      <span style={{ fontSize:13, color:T.body }}>{mod[0]}</span>
                      <BtnGhost onClick={function(){ notify(mod[0]+" module opened."); }} style={{ padding:"6px 10px", fontSize:11.5 }}>{mod[1]}</BtnGhost>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <ActionToast message={toast} />
    </div>
  );
}

function EmployerDash(props) {
  var user=props.user, setPage=props.setPage;
  var tabState=useState("overview"), rateState=useState(null), ratingState=useState(0);
  var toastState=useState(""), jobTitleState=useState(""), jobLocationState=useState(""), jobSalaryState=useState(""), jobDateState=useState(""), jobDescState=useState("");
  var payoutsState=useState([
    { id:1, worker:"Rekha Devi", amount:14000, status:"pending" },
    { id:2, worker:"Rajan Kumar", amount:6200, status:"pending" },
  ]);
  var renewalsState=useState([
    { id:1, worker:"Rekha Devi", role:"Domestic Helper", due:"2026-04-01", status:"due" },
    { id:2, worker:"Priya Singh", role:"Cook", due:"2026-04-15", status:"due" },
  ]);
  var tab=tabState[0],setTab=tabState[1];
  var rateW=rateState[0],setRateW=rateState[1];
  var ratingN=ratingState[0],setRatingN=ratingState[1];
  var toast=toastState[0],setToast=toastState[1];
  var jobTitle=jobTitleState[0],setJobTitle=jobTitleState[1];
  var jobLocation=jobLocationState[0],setJobLocation=jobLocationState[1];
  var jobSalary=jobSalaryState[0],setJobSalary=jobSalaryState[1];
  var jobDate=jobDateState[0],setJobDate=jobDateState[1];
  var jobDesc=jobDescState[0],setJobDesc=jobDescState[1];
  var payouts=payoutsState[0],setPayouts=payoutsState[1];
  var renewals=renewalsState[0],setRenewals=renewalsState[1];

  function notify(message) {
    setToast(message);
    setTimeout(function(){ setToast(""); }, 2200);
  }

  function submitJob() {
    if (!jobTitle.trim() || !jobLocation.trim() || !jobSalary.trim() || !jobDate.trim() || !jobDesc.trim()) return;
    notify("Job posted successfully.");
    setJobTitle("");
    setJobLocation("");
    setJobSalary("");
    setJobDate("");
    setJobDesc("");
  }

  function approvePayout(id) {
    setPayouts(function(prev){ return prev.map(function(item){ return item.id===id ? Object.assign({}, item, { status:"approved" }) : item; }); });
    notify("Payout approved.");
  }

  function renewContract(id) {
    setRenewals(function(prev){ return prev.map(function(item){ return item.id===id ? Object.assign({}, item, { status:"renewed" }) : item; }); });
    notify("Contract renewed successfully.");
  }

  return (
    <div className="page-shell page-enter" style={{ background:T.offwhite, minHeight:"100vh" }}>
      <div className="page-wrap" style={{ maxWidth:1100, margin:"0 auto", padding:"32px 32px" }}>
        <div className="dashboard-hero" style={{ marginBottom:24 }}>
          <div style={Object.assign(row("center","space-between"), { marginBottom:18 })}>
            <div>
              <h1 className="font-display" style={{ fontSize:28, fontWeight:800, color:"#fff" }}>Hello, {user&&user.name?user.name:"Sharma Family"}</h1>
              <p className="dashboard-sub">Hire faster, manage active workers, and keep verified hiring history in one dashboard.</p>
            </div>
            <BtnTeal onClick={function(){ setPage("search"); notify("Opening Find Worker page."); }} style={{ padding:"10px 22px", fontSize:13.5 }}>+ Find Worker</BtnTeal>
          </div>
          <div className="dashboard-chipbar">
            <Chip label="2 Active Workers" color={T.teal} />
            <Chip label="5 Verified Reviews" color={T.gold} />
          </div>
        </div>
        <div style={{ marginBottom:16, fontSize:12.5, color:T.muted }}>Simple flow: Overview, My Workers, Post Job, Ops Desk, History.</div>
        <DashTabs tabs={[["overview","Overview"],["hired","My Workers"],["post","Post Job"],["ops","Ops Desk"],["history","History"]]} active={tab} onChange={setTab} />

        {tab==="overview" && (
          <div style={col(18)}>
            <div className="dash-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
              {[["Active Workers","2",T.teal],["Reviews Given","5",T.gold],["Jobs Posted","3",T.violet],["Profile Views","28",T.amber]].map(function(item) {
                return (
                  <div key={item[0]} className="metric-card">
                    <div style={{ fontSize:12, color:T.muted, marginBottom:3 }}>{item[0]}</div>
                    <div className="font-display" style={{ fontSize:22, fontWeight:800, color:item[2] }}>{item[1]}</div>
                  </div>
                );
              })}
            </div>
            <div style={card(24)}>
              <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:16 }}>Currently Hired</div>
              {WORKERS.slice(0,2).map(function(w) {
                return (
                  <div key={w.id} style={Object.assign(card(16, { background:T.subtle }), row("center","space-between"), { marginBottom:12 })}>
                    <div style={row("center","flex-start",14)}>
                      <Avi text={w.avi} bg={w.color} size={44} r={11} ring={true} />
                      <div>
                        <div className="font-display" style={{ fontSize:14, fontWeight:800, color:T.ink }}>{w.name}</div>
                        <div style={{ fontSize:13, color:T.muted }}>{w.role} - Since Jan 2024</div>
                      </div>
                    </div>
                    <div style={row("center","flex-end",10)}>
                      <Score n={w.score} count={w.reviews} />
                      <BtnTeal onClick={function(){ setRateW(w); }} style={{ padding:"8px 16px", fontSize:12 }}>Rate</BtnTeal>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab==="post" && (
          <div style={card(28)}>
            <div className="font-display" style={{ fontSize:16, fontWeight:800, color:T.ink, marginBottom:20 }}>Post a New Job</div>
            <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {["Job Title","Location","Salary Budget","Start Date"].map(function(l) {
                return (
                  <div key={l}>
                    <div style={{ fontSize:12.5, fontWeight:600, color:T.muted, marginBottom:6 }}>{l}</div>
                    <input value={l==="Job Title"?jobTitle:l==="Location"?jobLocation:l==="Salary Budget"?jobSalary:jobDate} onChange={function(e){
                      if (l==="Job Title") setJobTitle(e.target.value);
                      else if (l==="Location") setJobLocation(e.target.value);
                      else if (l==="Salary Budget") setJobSalary(e.target.value);
                      else setJobDate(e.target.value);
                    }} style={Object.assign({}, inp, { borderRadius:T.r, height:44 })} placeholder={l} />
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop:16 }}>
              <div style={{ fontSize:12.5, fontWeight:600, color:T.muted, marginBottom:6 }}>Description</div>
              <textarea value={jobDesc} onChange={function(e){ setJobDesc(e.target.value); }} rows={4} placeholder="Describe the work and requirements..." style={Object.assign({}, inp, { resize:"none", borderRadius:T.r })} />
            </div>
            <BtnTeal onClick={submitJob} disabled={!jobTitle.trim() || !jobLocation.trim() || !jobSalary.trim() || !jobDate.trim() || !jobDesc.trim()} style={{ marginTop:20, padding:"12px 28px" }}>Post Job</BtnTeal>
          </div>
        )}

        {tab==="hired" && (
          <div style={col(12)}>
            {WORKERS.slice(0,3).map(function(w) {
              return (
                <div key={w.id} style={Object.assign(card(18), row("center","space-between"), { gap:12 })}>
                  <div style={row("center","flex-start",12)}>
                    <Avi text={w.avi} bg={w.color} size={44} r={11} ring={true} />
                    <div>
                      <div className="font-display" style={{ fontSize:14, fontWeight:800, color:T.ink }}>{w.name}</div>
                      <div style={{ fontSize:12.5, color:T.muted }}>{w.role} • {w.city} • Since Jan 2025</div>
                    </div>
                  </div>
                  <div style={row("center","flex-end",10)}>
                    <Score n={w.score} count={w.reviews} />
                    <BtnTeal onClick={function(){ setRateW(w); }} style={{ padding:"8px 16px", fontSize:12 }}>Rate</BtnTeal>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab==="history" && (
          <div style={col(12)}>
            {[
              ["Rekha Devi","Domestic Helper","Completed","Jan 2024 - Mar 2025","5/5"],
              ["Rajan Kumar","Plumber","Completed","Sep 2024 - Jan 2025","4.8/5"],
              ["Priya Singh","Cook","Ended","Mar 2024 - Aug 2024","4.4/5"],
            ].map(function(item, i) {
              return (
                <div key={i} style={Object.assign(card(18), row("center","space-between"), { gap:12 })}>
                  <div>
                    <div className="font-display" style={{ fontSize:14, fontWeight:800, color:T.ink }}>{item[0]} • {item[1]}</div>
                    <div style={{ fontSize:12.5, color:T.muted, marginTop:4 }}>{item[3]}</div>
                  </div>
                  <div style={Object.assign(col(4), { alignItems:"flex-end" })}>
                    <Chip label={item[2]} color={item[2]==="Completed"?T.green:T.amber} size={10} />
                    <div style={{ fontSize:12.5, color:T.ink, fontWeight:700 }}>{item[4]}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab==="ops" && (
          <div style={col(18)}>
            <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
              <div style={card(22)}>
                <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:12 }}>Monthly Payout Queue</div>
                {payouts.map(function(item) {
                  return (
                    <div key={item.id} style={Object.assign(row("center","space-between"), { padding:"10px 0", borderBottom:"1px solid #F0F4F9" })}>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, color:T.ink }}>{item.worker}</div>
                        <div style={{ fontSize:12, color:T.muted }}>Rs.{item.amount.toLocaleString()}</div>
                      </div>
                      {item.status==="approved" ? <Chip label="Approved" color={T.green} size={10} /> : <BtnTeal onClick={function(){ approvePayout(item.id); }} style={{ padding:"7px 12px", fontSize:12 }}>Approve</BtnTeal>}
                    </div>
                  );
                })}
              </div>

              <div style={card(22)}>
                <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:12 }}>Contract Renewals</div>
                {renewals.map(function(item) {
                  return (
                    <div key={item.id} style={Object.assign(row("center","space-between"), { padding:"10px 0", borderBottom:"1px solid #F0F4F9" })}>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, color:T.ink }}>{item.worker} • {item.role}</div>
                        <div style={{ fontSize:12, color:T.muted }}>Due: {item.due}</div>
                      </div>
                      {item.status==="renewed" ? <Chip label="Renewed" color={T.green} size={10} /> : <BtnGhost onClick={function(){ renewContract(item.id); }} style={{ padding:"7px 12px", fontSize:12 }}>Renew</BtnGhost>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {rateW && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }} onClick={function(){ setRateW(null); }}>
          <div style={card(32, { maxWidth:420, width:"100%" })} onClick={function(e){ e.stopPropagation(); }}>
            <div className="font-display" style={{ fontSize:20, fontWeight:800, color:T.ink, marginBottom:6 }}>Rate {rateW.name}</div>
            <p style={{ fontSize:13.5, color:T.muted, marginBottom:22 }}>Your verified review builds their professional reputation.</p>
            <div style={Object.assign(row("center","center"), { marginBottom:22 })}>
              <Stars n={ratingN} size={36} interactive={true} onChange={setRatingN} />
            </div>
            <textarea rows={3} placeholder="Share your experience..." style={Object.assign({}, inp, { resize:"none", borderRadius:T.r, marginBottom:16 })} />
            <BtnTeal onClick={function(){ notify("Verified review submitted for "+rateW.name+"."); setRateW(null); setRatingN(0); }} disabled={!ratingN} full={true} style={{ padding:"13px" }}>Submit Verified Review</BtnTeal>
          </div>
        </div>
      )}
      <ActionToast message={toast} />
    </div>
  );
}

function SocietyDash(props) {
  var user=props.user, _setPage=props.setPage;
  var tabState=useState("dashboard");
  var toastState=useState("");
  var tab=tabState[0],setTab=tabState[1];
  var toast=toastState[0],setToast=toastState[1];
  var registryQueryState=useState("");
  var registryQuery=registryQueryState[0],setRegistryQuery=registryQueryState[1];
  var noticeTitleState=useState(""), noticeMsgState=useState("");
  var noticeTitle=noticeTitleState[0],setNoticeTitle=noticeTitleState[1];
  var noticeMsg=noticeMsgState[0],setNoticeMsg=noticeMsgState[1];
  var noticesState=useState([
    ["Water Maintenance","Water supply suspended Dec 15, 7AM-2PM.","info"],
    ["Verification Policy","All new workers must submit updated Aadhaar from Jan 1.","alert"],
    ["Worker of the Month","Congrats Rekha Devi - highest-rated in December.","success"],
  ]);
  var notices=noticesState[0],setNotices=noticesState[1];
  var incidentTitleState=useState(""), incidentSeverityState=useState("medium");
  var incidentTitle=incidentTitleState[0],setIncidentTitle=incidentTitleState[1];
  var incidentSeverity=incidentSeverityState[0],setIncidentSeverity=incidentSeverityState[1];
  var incidentsState=useState([
    { id:1, title:"Unknown entry attempt at Gate 2", severity:"high", status:"open", time:"09:02" },
    { id:2, title:"Worker QR scan delay", severity:"medium", status:"open", time:"08:36" },
  ]);
  var incidents=incidentsState[0],setIncidents=incidentsState[1];
  var pendState=useState([
    { id:1, name:"Amit Sharma", role:"Plumber", status:"pending" },
    { id:2, name:"Gita Devi", role:"Domestic Helper", status:"pending" },
    { id:3, name:"Ramesh Yadav", role:"Electrician", status:"pending" },
  ]);
  var pending=pendState[0],setPending=pendState[1];

  function updatePending(id, status) {
    setPending(function(prev){ return prev.map(function(x){ return x.id===id ? Object.assign({},x,{status:status}) : x; }); });
  }

  var entries = [
    { name:"Rekha Devi", role:"Domestic Helper", flat:"402", time:"07:34", ok:true },
    { name:"Rajan Kumar", role:"Plumber", flat:"118", time:"08:12", ok:true },
    { name:"Suresh Nair", role:"Guard", flat:"Gate", time:"08:15", ok:true },
    { name:"Unknown Visitor", role:"Unregistered", flat:"?", time:"09:02", ok:false },
  ];

  var registryRows = WORKERS.slice(0,5).filter(function(w) {
    var q = registryQuery.toLowerCase();
    if (!q) return true;
    return w.name.toLowerCase().includes(q) || w.role.toLowerCase().includes(q) || w.city.toLowerCase().includes(q);
  });

  function downloadEntryLog() {
    var lines = ["Society Entry Log", "================", ""];
    entries.forEach(function(e) {
      lines.push(e.time+" AM | "+e.name+" | "+e.role+" | Flat "+e.flat+" | "+(e.ok?"Verified":"Unknown"));
    });
    var blob = new Blob([lines.join("\n")], { type:"text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "society-entry-log.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function postNotice() {
    if (!noticeTitle.trim() || !noticeMsg.trim()) return;
    setNotices(function(prev){ return [[noticeTitle.trim(), noticeMsg.trim(), "info"]].concat(prev); });
    setNoticeTitle("");
    setNoticeMsg("");
    setToast("Notice posted to residents.");
    setTimeout(function(){ setToast(""); }, 2200);
  }

  function notify(message) {
    setToast(message);
    setTimeout(function(){ setToast(""); }, 2200);
  }

  function createIncident() {
    if (!incidentTitle.trim()) return;
    var next = { id:Date.now(), title:incidentTitle.trim(), severity:incidentSeverity, status:"open", time:new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" }) };
    setIncidents(function(prev){ return [next].concat(prev); });
    setIncidentTitle("");
    setIncidentSeverity("medium");
    notify("Incident logged and shared with guards.");
  }

  function resolveIncident(id) {
    setIncidents(function(prev){ return prev.map(function(item){ return item.id===id ? Object.assign({}, item, { status:"resolved" }) : item; }); });
    notify("Incident resolved and archived.");
  }

  function registerWorker() {
    var nextId = pending.length + 10;
    setPending(function(prev){ return [{ id:nextId, name:"New Worker "+nextId, role:"Domestic Helper", status:"pending" }].concat(prev); });
    setTab("approvals");
    notify("New worker added to approval queue.");
  }

  return (
    <div className="page-shell page-enter" style={{ background:T.offwhite, minHeight:"100vh" }}>
      <div className="page-wrap" style={{ maxWidth:1100, margin:"0 auto", padding:"32px 32px" }}>
        <div className="dashboard-hero" style={{ marginBottom:24 }}>
          <div style={Object.assign(row("center","space-between"), { marginBottom:18 })}>
            <div>
              <h1 className="font-display" style={{ fontSize:28, fontWeight:800, color:"#fff" }}>{user&&user.name?user.name:"Prestige Society"} Hub</h1>
              <p className="dashboard-sub">Monitor entries, approvals, worker registry, and resident notices from one command center.</p>
            </div>
            <div className="dashboard-chipbar">
              <Chip label="LIVE" color={T.green} dot={true} />
              <BtnViolet onClick={registerWorker} style={{ padding:"10px 20px", fontSize:13 }}>+ Register Worker</BtnViolet>
              <BtnGhost dark={true} onClick={function(){ setTab("incidents"); notify("Opening Incident Desk."); }} style={{ padding:"10px 16px", fontSize:13 }}>Incident Desk</BtnGhost>
            </div>
          </div>
            <div style={{ fontSize:12.5, color:"rgba(255,255,255,0.75)" }}>72 Verified Workers • {pending.filter(function(p){ return p.status==="pending"; }).length} Pending Approvals</div>
        </div>
          <div style={{ marginBottom:16, fontSize:12.5, color:T.muted }}>One simple bar: choose Dashboard, Entry, Registry, Approvals, Incidents, Notices.</div>
          <DashTabs tabs={[["dashboard","Dashboard"],["entry","Entry Log"],["registry","Registry"],["approvals","Approvals"],["incidents","Incident Desk"],["notices","Notices"]]} active={tab} onChange={setTab} color={T.violet} />

        {tab==="dashboard" && (
          <div style={col(18)}>
            <div className="dash-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
              {[["Flats","320",T.violet],["Verified Workers","72",T.teal],["Today Entries","14",T.amber],["Pending Approvals",pending.filter(function(p){ return p.status==="pending"; }).length,T.red]].map(function(item) {
                return (
                  <div key={item[0]} className="metric-card">
                    <div style={{ fontSize:12, color:T.muted, marginBottom:3 }}>{item[0]}</div>
                    <div className="font-display" style={{ fontSize:24, fontWeight:800, color:item[2] }}>{item[1]}</div>
                  </div>
                );
              })}
            </div>
            <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
              <div style={card(22)}>
                <div className="font-display" style={{ fontSize:14, fontWeight:800, color:T.ink, marginBottom:14 }}>Live Entry Feed</div>
                {entries.map(function(e) {
                  return (
                    <div key={e.name} style={Object.assign(row("center","space-between"), { padding:"10px 12px", background:T.subtle, borderRadius:T.r, marginBottom:8, borderLeft:"3px solid "+(e.ok?T.tealM:T.red) })}>
                      <div>
                        <div style={{ fontSize:13, fontWeight:600, color:T.ink }}>{e.name}</div>
                        <div style={{ fontSize:11, color:T.muted }}>{e.role} - Flat {e.flat} - {e.time}</div>
                      </div>
                      <Chip label={e.ok?"OK":"Flag"} color={e.ok?T.green:T.red} size={10} />
                    </div>
                  );
                })}
              </div>
              <div style={card(22)}>
                <div className="font-display" style={{ fontSize:14, fontWeight:800, color:T.ink, marginBottom:14 }}>Worker Mix</div>
                {[["Domestic Helpers",28,T.teal],["Security Guards",12,T.violet],["Plumbers",8,T.amber],["Electricians",6,T.green],["Others",18,T.muted]].map(function(item) {
                  return (
                    <div key={item[0]} style={{ marginBottom:10 }}>
                      <div style={Object.assign(row("center","space-between"), { marginBottom:4, fontSize:13 })}>
                        <span style={{ color:T.body }}>{item[0]}</span>
                        <span style={{ fontWeight:700, color:item[2] }}>{item[1]}</span>
                      </div>
                      <div style={{ height:6, background:"#F0F4F9", borderRadius:3, overflow:"hidden" }}>
                        <div style={{ width:Math.round((item[1]/72)*100)+"%", height:"100%", background:item[2], borderRadius:3 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {tab==="approvals" && (
          <div style={col(14)}>
            {pending.filter(function(p){ return p.status==="pending"; }).length===0 && (
              <div style={card(40, { textAlign:"center" })}>
                <div className="font-display" style={{ fontSize:16, fontWeight:700, color:T.ink }}>All caught up!</div>
              </div>
            )}
            {pending.filter(function(p){ return p.status==="pending"; }).map(function(p) {
              return (
                <div key={p.id} style={Object.assign(card(20), row("center","space-between"))}>
                  <div style={row("center","flex-start",14)}>
                    <Avi text={p.name[0]} bg={T.violet} size={44} r={11} />
                    <div>
                      <div className="font-display" style={{ fontSize:14, fontWeight:800, color:T.ink }}>{p.name}</div>
                      <div style={{ fontSize:13, color:T.muted }}>{p.role}</div>
                    </div>
                  </div>
                  <div style={row("center","flex-end",10)}>
                    <button onClick={function(){ updatePending(p.id,"approved"); notify(p.name+" approved."); }} style={{ background:T.greenBg, color:T.green, border:"none", borderRadius:9, padding:"8px 16px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{trS("Approve")}</button>
                    <button onClick={function(){ updatePending(p.id,"rejected"); notify(p.name+" rejected."); }} style={{ background:"#FEF2F2", color:T.red, border:"none", borderRadius:9, padding:"8px 16px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{trS("Reject")}</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab==="entry" && (
          <div style={card(0, { overflow:"hidden" })}>
            <div style={Object.assign(row("center","space-between"), { padding:"18px 22px", borderBottom:"1px solid #F0F4F9" })}>
              <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink }}>Today's Entry Log</div>
              <BtnGhost onClick={downloadEntryLog} style={{ padding:"8px 16px", fontSize:12 }}>Download Log</BtnGhost>
            </div>
            {entries.map(function(e, i) {
              return (
                <div key={e.name} style={Object.assign(row("center","space-between"), { padding:"14px 22px", borderBottom:"1px solid #F0F4F9", background:i%2===0?T.white:T.offwhite })}>
                  <div style={row("center","flex-start",14)}>
                    <div style={{ width:10, height:10, borderRadius:"50%", background:e.ok?T.green:T.red, flexShrink:0 }} />
                    <div>
                      <div style={{ fontSize:14, fontWeight:600, color:T.ink }}>{e.name}</div>
                      <div style={{ fontSize:12, color:T.muted }}>{e.role}</div>
                    </div>
                  </div>
                  <div style={{ fontSize:13, color:T.muted }}>Flat {e.flat}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:T.ink }}>{e.time} AM</div>
                  <Chip label={e.ok?"Verified":"Unknown"} color={e.ok?T.green:T.red} size={10} dot={true} />
                  {!e.ok && <button onClick={function(){ setTab("incidents"); setIncidentTitle("Escalated: Unknown entry at Flat "+e.flat+" ("+e.time+")"); notify("Unknown entry moved to Incident Desk."); }} style={{ background:"#FEF2F2", color:T.red, border:"none", borderRadius:8, padding:"6px 10px", fontSize:11.5, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{trS("Escalate")}</button>}
                </div>
              );
            })}
          </div>
        )}

        {tab==="registry" && (
          <div style={card(0, { overflow:"hidden" })}>
            <div style={Object.assign(row("center","space-between"), { padding:"18px 22px", borderBottom:"1px solid #F0F4F9" })}>
              <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink }}>Worker Registry</div>
              <input value={registryQuery} onChange={function(e){ setRegistryQuery(e.target.value); }} placeholder="Search name, role, city..." style={Object.assign({}, inp, { width:230, height:38, fontSize:13 })} />
            </div>
            {registryRows.map(function(w, i) {
              return (
                <div key={w.id} style={Object.assign(row("center","space-between"), { padding:"13px 22px", borderBottom:"1px solid #F0F4F9", background:i%2===0?T.white:T.offwhite })}>
                  <div style={row("center","flex-start",12)}>
                    <Avi text={w.avi} bg={w.color} size={32} r={9} ring={w.verified} />
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:T.ink }}>{w.name}</div>
                      <div style={{ fontSize:12, color:T.muted }}>{w.role}</div>
                    </div>
                  </div>
                  <div style={{ fontSize:13, color:T.tealM }}>{w.city}</div>
                  <div style={row("center","flex-start",3)}>
                    <span style={{ fontSize:12, color:T.gold }}>*</span>
                    <span style={{ fontSize:13, fontWeight:700 }}>{w.score}</span>
                  </div>
                  <Chip label={w.verified?"Active":"Pending"} color={w.verified?T.green:T.amber} size={10} />
                </div>
              );
            })}
          </div>
        )}

        {tab==="notices" && (
          <div style={col(14)}>
            {notices.map(function(n) {
              return (
                <div key={n[0]} style={card(20, { borderLeft:"4px solid "+(n[2]==="info"?T.violet:n[2]==="alert"?T.amber:T.green) })}>
                  <div className="font-display" style={{ fontSize:14, fontWeight:800, color:T.ink, marginBottom:7 }}>{n[0]}</div>
                  <p style={{ fontSize:13.5, color:T.muted, lineHeight:1.65 }}>{n[1]}</p>
                </div>
              );
            })}
            <div style={card(22)}>
              <div className="font-display" style={{ fontSize:14, fontWeight:800, color:T.ink, marginBottom:14 }}>Post a Notice</div>
              <input value={noticeTitle} onChange={function(e){ setNoticeTitle(e.target.value); }} placeholder="Notice title..." style={Object.assign({}, inp, { marginBottom:10 })} />
              <textarea value={noticeMsg} onChange={function(e){ setNoticeMsg(e.target.value); }} rows={3} placeholder="Notice message..." style={Object.assign({}, inp, { resize:"none", marginBottom:12 })} />
              <BtnViolet onClick={postNotice} style={{ padding:"11px 24px", fontSize:13 }}>Post to All Residents</BtnViolet>
            </div>
          </div>
        )}

        {tab==="incidents" && (
          <div style={col(14)}>
            <div style={card(22)}>
              <div className="font-display" style={{ fontSize:14, fontWeight:800, color:T.ink, marginBottom:12 }}>Log New Incident</div>
              <input value={incidentTitle} onChange={function(e){ setIncidentTitle(e.target.value); }} placeholder="Describe incident..." style={Object.assign({}, inp, { marginBottom:10 })} />
              <div style={row("center","flex-start",10)}>
                <select value={incidentSeverity} onChange={function(e){ setIncidentSeverity(e.target.value); }} style={Object.assign({}, inp, { height:40, width:180 })}>
                  <option value="low">Low severity</option>
                  <option value="medium">Medium severity</option>
                  <option value="high">High severity</option>
                </select>
                <BtnViolet onClick={createIncident} style={{ padding:"9px 16px", fontSize:12.5 }}>Create Incident</BtnViolet>
              </div>
            </div>

            {incidents.map(function(item) {
              var tone = item.severity==="high" ? T.red : item.severity==="medium" ? T.amber : T.teal;
              return (
                <div key={item.id} style={card(20, { borderLeft:"4px solid "+tone })}>
                  <div style={Object.assign(row("center","space-between"), { marginBottom:6 })}>
                    <div className="font-display" style={{ fontSize:14, fontWeight:800, color:T.ink }}>{item.title}</div>
                    <Chip label={item.status==="resolved"?"Resolved":"Open"} color={item.status==="resolved"?T.green:tone} size={10} />
                  </div>
                  <div style={{ fontSize:12.5, color:T.muted, marginBottom:10 }}>Reported at {item.time} • Severity: {item.severity}</div>
                  {item.status!=="resolved" && <BtnGhost onClick={function(){ resolveIncident(item.id); }} style={{ padding:"8px 13px", fontSize:12 }}>Mark Resolved</BtnGhost>}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <ActionToast message={toast} />
    </div>
  );
}

function Admin(props) {
  var setPage=props.setPage, setViewId=props.setViewId;
  var tabState=useState("overview");
  var tab=tabState[0],setTab=tabState[1];
  var userQueryState=useState("");
  var toastState=useState("");
  var userQuery=userQueryState[0],setUserQuery=userQueryState[1];
  var toast=toastState[0],setToast=toastState[1];
  var riskRulesState=useState({ highVelocity:true, geoMismatch:true, ratingAnomaly:true, duplicateDevice:false });
  var riskCasesState=useState([
    { id:1, worker:"Rohan P.", issue:"Rating anomaly spike", severity:"high", status:"open" },
    { id:2, worker:"Unknown Device Cluster", issue:"Multiple accounts on same device", severity:"medium", status:"open" },
  ]);
  var riskRules=riskRulesState[0],setRiskRules=riskRulesState[1];
  var riskCases=riskCasesState[0],setRiskCases=riskCasesState[1];
  var adminActions = [
    ["Verification queue","142 cases pending",T.violet,"Prioritise Aadhaar, police, and employer history checks.",function(){ setTab("verifications"); notify("Verification queue opened."); }],
    ["Compliance reports","Weekly platform risk summary",T.teal,"Review verification turnaround time, degraded services, and fraud alerts.",function(){ setTab("reports"); notify("Compliance reports opened."); }],
    ["Revenue controls","Subscription and enterprise health",T.green,"Track plan mix, expansion revenue, and operational efficiency.",function(){ setTab("revenue"); notify("Revenue controls opened."); }],
    ["Risk command center","Fraud and dispute command",T.red,"Operate rule-based safeguards with manual overrides for sensitive accounts.",function(){ setTab("risk"); notify("Risk command center opened."); }],
  ];
  var adminActivities = [
    ["08:40","Batch verification approved","64 worker identities cleared for live access",T.green],
    ["09:05","Notification degradation detected","OTP queue latency increased for one gateway region",T.amber],
    ["09:22","Manual review raised","Two suspicious reviews routed to compliance operations",T.red],
    ["09:46","Enterprise onboarding completed","A new facility partner enabled across 3 deployment sites",T.violet],
  ];

  function notify(message) {
    setToast(message);
    setTimeout(function(){ setToast(""); }, 2200);
  }

  var filteredAdminUsers = WORKERS.filter(function(w) {
    var q = userQuery.toLowerCase();
    if (!q) return true;
    return w.name.toLowerCase().includes(q) || w.role.toLowerCase().includes(q) || w.city.toLowerCase().includes(q);
  });

  function toggleRiskRule(key) {
    setRiskRules(function(prev){ return Object.assign({}, prev, { [key]:!prev[key] }); });
    notify("Risk rule updated.");
  }

  function handleRiskCase(id, status) {
    setRiskCases(function(prev){ return prev.map(function(item){ return item.id===id ? Object.assign({}, item, { status:status }) : item; }); });
    notify("Risk case moved to "+status+".");
  }

  return (
    <div className="page-shell page-enter" style={{ background:T.offwhite, minHeight:"100vh" }}>
      <div className="page-wrap-wide" style={{ maxWidth:1200, margin:"0 auto", padding:"32px 32px" }}>
        <div className="dashboard-hero" style={{ marginBottom:24 }}>
          <div style={Object.assign(row("center","space-between"), { marginBottom:18 })}>
            <div>
              <h1 className="font-display" style={{ fontSize:28, fontWeight:800, color:"#fff" }}>Admin Dashboard</h1>
              <p className="dashboard-sub">Oversee verification, platform health, compliance, and revenue performance from one admin console.</p>
            </div>
            <div className="dashboard-chipbar">
              <Chip label="Production" color={T.red} />
              <Chip label="v3.1.0" color={T.muted} />
            </div>
          </div>
          <div className="dashboard-chipbar">
            <BtnGhost dark={true} onClick={function(){ setTab("verifications"); notify("Opening verification queue."); }} style={{ padding:"10px 18px", fontSize:13 }}>Open Verification Queue</BtnGhost>
            <BtnTeal onClick={function(){ setTab("reports"); notify("Opening health reports."); }} style={{ padding:"10px 18px", fontSize:13 }}>View Health Reports</BtnTeal>
          </div>
        </div>
        <div style={{ marginBottom:16, fontSize:12.5, color:T.muted }}>Use tabs for all admin tasks: Overview, Verifications, Users, Revenue, Risk, Reports.</div>
        <DashTabs tabs={[["overview","Overview"],["verifications","Verifications"],["users","Users"],["revenue","Revenue"],["risk","Risk"],["reports","Reports"]]} active={tab} onChange={setTab} color={T.base} />

        {tab==="overview" && (
          <div style={col(20)}>
            <div className="dash-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
              {[["Total Workers","24,118",T.teal,"+195 this month"],["Societies","1,280",T.violet,"+34 this month"],["Total Ratings","98,200",T.gold,"+2,840 this month"],["MRR","Rs.38.4L",T.green,"+9.6% MoM"]].map(function(item) {
                return (
                  <div key={item[0]} className="metric-card reveal stagger-1" data-reveal="true" style={{ padding:22 }}>
                    <div style={{ fontSize:12, color:T.muted, marginBottom:3 }}>{item[0]}</div>
                    <div className="font-display" style={{ fontSize:22, fontWeight:800, color:item[2] }}>{item[1]}</div>
                    <div style={{ fontSize:12, color:T.green, marginTop:4 }}>{item[3]}</div>
                  </div>
                );
              })}
            </div>
            <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:18 }}>
              <div className="section-soft reveal stagger-2" data-reveal="true" style={{ padding:22 }}>
                <div style={Object.assign(row("center","space-between"), { marginBottom:14 })}>
                  <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink }}>Operations activity</div>
                  <Chip label="Live audit trail" color={T.base} size={10} />
                </div>
                {adminActivities.map(function(item) {
                  return (
                    <div key={item[0]+item[1]} style={Object.assign(row("flex-start","space-between",14), { padding:"12px 0", borderBottom:"1px solid #F0F4F9" })}>
                      <div style={{ width:62, fontSize:12, fontWeight:700, color:item[3], flexShrink:0 }}>{item[0]}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13.5, fontWeight:700, color:T.ink, marginBottom:4 }}>{item[1]}</div>
                        <div style={{ fontSize:12.5, color:T.muted, lineHeight:1.6 }}>{item[2]}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="section-soft reveal stagger-3" data-reveal="true" style={{ padding:22 }}>
                <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:14 }}>Priority actions</div>
                <div style={col(12)}>
                  {adminActions.map(function(item) {
                    return (
                      <button key={item[0]} className="action-tile" onClick={item[4]} style={{ textAlign:"left", padding:16, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui", width:"100%" }}>
                        <div style={Object.assign(row("center","space-between"), { marginBottom:8 })}>
                          <div className="font-display" style={{ fontSize:14, fontWeight:800, color:T.ink }}>{item[0]}</div>
                          <Chip label={item[1]} color={item[2]} size={10} />
                        </div>
                        <div style={{ fontSize:12.5, color:T.muted, lineHeight:1.65 }}>{item[3]}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
              {[
                { title:"Revenue Streams", rows:[["Society Subs","Rs.18.2L"],["Background Checks","Rs.6.4L"],["Worker Pro","Rs.5.8L"],["Enterprise","Rs.8.0L"]] },
                { title:"Platform Health", rows:[["Verification Rate","98.4%"],["Avg Hire Time","22 min"],["Job Completion","97.3%"],["Fraud Blocked","0"]] },
                { title:"System Status", rows:[["API Uptime","99.98%"],["OTP Delivery","99.4%"],["Open Tickets","7"],["Flagged Reviews","3"]] },
              ].map(function(section) {
                return (
                  <div key={section.title} className="section-soft reveal stagger-2" data-reveal="true" style={{ padding:22 }}>
                    <div className="font-display" style={{ fontSize:14, fontWeight:800, color:T.ink, marginBottom:14 }}>{section.title}</div>
                    {section.rows.map(function(r) {
                      return (
                        <div key={r[0]} style={Object.assign(row("center","space-between"), { padding:"9px 0", borderBottom:"1px solid #F0F4F9" })}>
                          <span style={{ fontSize:13, color:T.muted }}>{r[0]}</span>
                          <span style={{ fontSize:13, fontWeight:700, color:T.ink }}>{r[1]}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab==="revenue" && (
          <div style={col(18)}>
            <div className="dash-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
              {[["MRR","Rs.38.4L",T.green],["ARR","Rs.4.6Cr",T.teal],["Avg Society Plan","Rs.2,999",T.violet],["Avg Worker Plan","Rs.149",T.amber]].map(function(item) {
                return (
                  <div key={item[0]} style={card(20)}>
                    <div className="font-display" style={{ fontSize:26, fontWeight:800, color:item[2] }}>{item[1]}</div>
                    <div style={{ fontSize:13, color:T.muted, marginTop:6 }}>{item[0]}</div>
                  </div>
                );
              })}
            </div>
            <div style={card(24)}>
              <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:18 }}>Revenue by Stream</div>
              {[["Society Subscriptions","Rs.18.2L",47,T.violet],["Enterprise B2B","Rs.8.0L",21,"#7C3AED"],["Background Checks","Rs.6.4L",17,T.teal],["Worker Pro Plans","Rs.5.8L",15,T.amber]].map(function(item) {
                return (
                  <div key={item[0]} style={{ marginBottom:14 }}>
                    <div style={Object.assign(row("center","space-between"), { marginBottom:6, fontSize:14 })}>
                      <span style={{ color:T.body }}>{item[0]}</span>
                      <span style={{ fontWeight:700, color:T.ink }}>{item[1]} ({item[2]}%)</span>
                    </div>
                    <div style={{ height:8, background:"#F0F4F9", borderRadius:4, overflow:"hidden" }}>
                      <div style={{ width:item[2]+"%", height:"100%", background:item[3], borderRadius:4 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab==="users" && (
          <div style={card(0, { overflow:"hidden" })}>
            <div style={Object.assign(row("center","space-between"), { padding:"18px 22px", borderBottom:"1px solid #F0F4F9" })}>
              <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink }}>All Workers</div>
              <input value={userQuery} onChange={function(e){ setUserQuery(e.target.value); }} placeholder="Search name, role, city..." style={Object.assign({}, inp, { width:230, height:38, fontSize:13 })} />
            </div>
            {filteredAdminUsers.map(function(w, i) {
              return (
                <div key={w.id} style={Object.assign(row("center","space-between"), { padding:"13px 22px", borderBottom:"1px solid #F0F4F9", background:i%2===0?T.white:T.offwhite, flexWrap:"wrap", gap:10 })}>
                  <div style={row("center","flex-start",12)}>
                    <Avi text={w.avi} bg={w.color} size={32} r={8} ring={w.verified} />
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:T.ink }}>{w.name}</div>
                      <div style={{ fontSize:12, color:T.muted }}>{w.role} - {w.city}</div>
                    </div>
                  </div>
                  <div style={row("center","flex-end",10)}>
                    <div style={row("center","flex-start",3)}>
                      <span style={{ fontSize:12, color:T.gold }}>*</span>
                      <span style={{ fontSize:13, fontWeight:700 }}>{w.score}</span>
                    </div>
                    <Chip label={w.verified?"Active":"Pending"} color={w.verified?T.green:T.amber} size={10} />
                    <button onClick={function(){ setViewId(w.id); setPage("worker-view"); }} style={{ background:T.subtle, border:"1px solid #E8EDF4", borderRadius:7, padding:"4px 10px", fontSize:11, cursor:"pointer", color:T.muted, fontFamily:"'Plus Jakarta Sans',system-ui" }}>{trS("View")}</button>
                    <button onClick={function(){ notify(w.name+" flagged for manual review."); }} style={{ background:"#FEF2F2", color:T.red, border:"none", borderRadius:7, padding:"4px 10px", fontSize:11, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>{trS("Flag")}</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab==="verifications" && (
          <div style={col(14)}>
            <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
              {[["Queue health","230 active cases",T.violet],["Median TAT","18 hours",T.teal],["Escalations","12 priority reviews",T.red]].map(function(item) {
                return (
                  <div key={item[0]} style={card(18)}>
                    <div style={{ fontSize:12, color:T.muted }}>{item[0]}</div>
                    <div className="font-display" style={{ fontSize:22, fontWeight:800, color:item[2], marginTop:6 }}>{item[1]}</div>
                  </div>
                );
              })}
            </div>
            {[ 
              ["Aadhaar Verification Queue", "142 pending", T.violet, "KYC docs awaiting OTP validation and face match."],
              ["Police Clearance Queue", "57 pending", T.amber, "Regional police check API responses under processing."],
              ["Background Check Queue", "31 pending", T.teal, "Employment history and reference checks in progress."],
            ].map(function(v) {
              return (
                <div key={v[0]} style={card(22, { borderLeft:"4px solid "+v[2] })}>
                  <div style={Object.assign(row("center","space-between"), { marginBottom:8 })}>
                    <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink }}>{v[0]}</div>
                    <Chip label={v[1]} color={v[2]} size={10} />
                  </div>
                  <p style={{ fontSize:13.5, color:T.muted, lineHeight:1.65, marginBottom:14 }}>{v[3]}</p>
                  <div style={row("center","flex-start",10)}>
                    <BtnGhost onClick={function(){ notify("Opening "+v[0]+"."); }} style={{ padding:"8px 14px", fontSize:12 }}>Review Queue</BtnGhost>
                    <BtnTeal onClick={function(){ notify(v[0]+" batch approved."); }} style={{ padding:"8px 14px", fontSize:12 }}>Approve Batch</BtnTeal>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab==="reports" && (
          <div style={col(14)}>
            <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
              {[["Compliance Pass Rate","99.1%",T.green],["Avg Verify TAT","18 hrs",T.teal],["Fraud Alerts","3",T.red]].map(function(item) {
                return (
                  <div key={item[0]} style={card(20)}>
                    <div style={{ fontSize:12, color:T.muted }}>{item[0]}</div>
                    <div className="font-display" style={{ fontSize:24, fontWeight:800, color:item[2], marginTop:6 }}>{item[1]}</div>
                  </div>
                );
              })}
            </div>
            <div style={card(22)}>
              <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:12 }}>Platform Health Snapshot</div>
              {[["Aadhaar API","Operational"],["Police Check API","Operational"],["Notification Queue","Degraded"],["OTP Delivery","Operational"]].map(function(s) {
                return (
                  <div key={s[0]} style={Object.assign(row("center","space-between"), { padding:"10px 0", borderBottom:"1px solid #F0F4F9" })}>
                    <span style={{ fontSize:13, color:T.body }}>{s[0]}</span>
                    <Chip label={s[1]} color={s[1]==="Degraded"?T.amber:T.green} size={10} dot={true} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab==="risk" && (
          <div style={col(18)}>
            <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
              <div style={card(22)}>
                <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:12 }}>Rule Controls</div>
                {[
                  ["highVelocity","High-velocity profile edits"],
                  ["geoMismatch","Geo mismatch during verification"],
                  ["ratingAnomaly","Rating anomaly detection"],
                  ["duplicateDevice","Duplicate device policy"],
                ].map(function(rule) {
                  return (
                    <div key={rule[0]} style={Object.assign(row("center","space-between"), { padding:"10px 0", borderBottom:"1px solid #F0F4F9" })}>
                      <span style={{ fontSize:13, color:T.body }}>{rule[1]}</span>
                      <button onClick={function(){ toggleRiskRule(rule[0]); }} style={{ background:riskRules[rule[0]]?T.greenBg:"#E2E8F0", color:riskRules[rule[0]]?T.green:T.muted, border:"none", borderRadius:999, padding:"6px 12px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',system-ui" }}>
                        {riskRules[rule[0]]?"Enabled":"Disabled"}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div style={card(22)}>
                <div className="font-display" style={{ fontSize:15, fontWeight:800, color:T.ink, marginBottom:12 }}>Live Risk Cases</div>
                {riskCases.map(function(item) {
                  var tone = item.severity==="high" ? T.red : T.amber;
                  return (
                    <div key={item.id} style={{ background:T.subtle, borderRadius:T.r, padding:"12px 14px", marginBottom:10, borderLeft:"3px solid "+tone }}>
                      <div style={Object.assign(row("center","space-between"), { marginBottom:6 })}>
                        <div style={{ fontSize:13, fontWeight:700, color:T.ink }}>{item.worker}</div>
                        <Chip label={item.status} color={item.status==="resolved"?T.green:tone} size={10} />
                      </div>
                      <div style={{ fontSize:12.5, color:T.muted, marginBottom:10 }}>{item.issue}</div>
                      {item.status!=="resolved" && (
                        <div style={row("center","flex-start",8)}>
                          <BtnGhost onClick={function(){ handleRiskCase(item.id, "watchlist"); }} style={{ padding:"7px 11px", fontSize:11.5 }}>Watchlist</BtnGhost>
                          <BtnTeal onClick={function(){ handleRiskCase(item.id, "resolved"); }} style={{ padding:"7px 11px", fontSize:11.5 }}>Resolve</BtnTeal>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <ActionToast message={toast} />
    </div>
  );
}

// --- APP ROOT ------------------------------------------------
export default function App() {
  var pageState=useState("landing"), userState=useState(null), viewIdState=useState(null), easyState=useState(false);
  var appToastState=useState("");
  var dataSyncState=useState({ apiReady:false, synced:false });
  var langState=useState(function(){
    try {
      var saved = localStorage.getItem("shramik-lang");
      return saved==="hi" ? "hi" : "en";
    } catch {
      return "en";
    }
  });
  var page=pageState[0],setPage=pageState[1];
  var user=userState[0],setUser=userState[1];
  var viewId=viewIdState[0],setViewId=viewIdState[1];
  var easyMode=easyState[0],setEasyMode=easyState[1];
  var appToast=appToastState[0],setAppToast=appToastState[1];
  var dataSync=dataSyncState[0],setDataSync=dataSyncState[1];
  var lang=langState[0],setLang=langState[1];

  function appNotify(message) {
    setAppToast(message);
    setTimeout(function(){ setAppToast(""); }, 1700);
  }

  setAppLanguage(lang);

  useEffect(function() {
    try { localStorage.setItem("shramik-lang", lang); } catch { void 0; }
  }, [lang]);

  useEffect(function() {
    var alive = true;

    async function syncWorkersFromBackend() {
      try {
        var apiWorkers = await apiGetWorkers();
        if (!alive) return;
        if (Array.isArray(apiWorkers) && apiWorkers.length) {
          WORKERS = apiWorkers.map(function(worker, index) { return mapWorkerFromApi(worker, index); });
          setDataSync({ apiReady:true, synced:true });
        } else {
          setDataSync({ apiReady:false, synced:true });
        }
      } catch {
        if (!alive) return;
        setDataSync({ apiReady:false, synced:true });
      }
    }

    syncWorkersFromBackend();
    return function() { alive = false; };
  }, [setDataSync]);

  useEffect(function() {
    try {
      if (localStorage.getItem("shramik-location-asked") === "1") return;
    } catch { void 0; }
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(function() {
      try { localStorage.setItem("shramik-location-asked", "1"); } catch { void 0; }
    }, function() {
      try { localStorage.setItem("shramik-location-asked", "1"); } catch { void 0; }
    }, { enableHighAccuracy:false, timeout:7000, maximumAge:300000 });
  }, []);

  useEffect(function() {
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    var targets = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!targets.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold:0.12, rootMargin:"0px 0px -8% 0px" });

    targets.forEach(function(el) { observer.observe(el); });

    return function() { observer.disconnect(); };
  }, [page]);

  function renderPage() {
    if (page==="landing")           return <Landing setPage={setPage} setUser={setUser} easyMode={easyMode} setEasyMode={setEasyMode} />;
    if (page==="search")            return <Search setPage={setPage} setViewId={setViewId} easyMode={easyMode} apiReady={dataSync.apiReady} />;
    if (page==="worker-view")       return <WorkerView wId={viewId} setPage={setPage} />;
    if (page==="pricing")           return <Pricing setPage={setPage} />;
    if (page==="for-societies")     return <ForSocieties setPage={setPage} setUser={setUser} />;
    if (page==="for-workers")       return <ForWorkers setPage={setPage} />;
    if (page==="enterprise")        return <Enterprise setPage={setPage} />;
    if (page==="auth")              return <Auth setPage={setPage} setUser={setUser} />;
    if (page==="worker-dashboard")  return <WorkerDash user={user} />;
    if (page==="employer-dashboard")return <EmployerDash user={user} setPage={setPage} />;
    if (page==="society-dashboard") return <SocietyDash user={user} setPage={setPage} />;
    if (page==="admin")             return <Admin setPage={setPage} setViewId={setViewId} />;
    return <Landing setPage={setPage} setUser={setUser} easyMode={easyMode} setEasyMode={setEasyMode} />;
  }

  return (
    <div className={easyMode?"easy-mode":""} style={{ fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif", minHeight:"100vh", background:T.offwhite }}>
      <GlobalStyles />
      {page!=="auth" && <Nav page={page} setPage={setPage} user={user} setUser={setUser} easyMode={easyMode} setEasyMode={setEasyMode} lang={lang} setLang={setLang} onActionToast={appNotify} />}
      {renderPage()}
      {page==="landing" && <AssistBar easyMode={easyMode} setEasyMode={setEasyMode} setPage={setPage} page={page} onActionToast={appNotify} />}
      <ActionToast message={appToast} />
    </div>
  );
}
