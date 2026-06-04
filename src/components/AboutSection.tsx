"use client";


import { useState, useEffect } from "react";
import giridhar from "@/assets/giridhar.png";
import { Twitter, Instagram, Github, Mail } from "lucide-react";


/* ── DATA ─────────────────────────────────────────────── */
const PROJECTS = [
  { n: "Velocity UI",  t: "Design System",   y: "2024", url: "#", d: "A comprehensive design system for modern web apps." },
  { n: "Chartflow",    t: "Interactive Data", y: "2023", url: "#", d: "Data visualization library with high performance." },
  { n: "PaperCMS",     t: "Side Project",     y: "2023", url: "#", d: "Headless CMS tailored for editorial teams." },
  { n: "Nexas",        t: "E-Commerce",       y: "2022", url: "#", d: "Scalable frontend architecture for retail." },
  { n: "Lumiere",      t: "Creative Studio",  y: "2022", url: "#", d: "Award winning creative portfolio template." },
];
const CONTACTS = [
  { l: "TWITTER",   h: "#", Icon: Twitter },
  { l: "INSTAGRAM", h: "#", Icon: Instagram },
  { l: "GITHUB",    h: "#", Icon: Github },
  { l: "EMAIL",     h: "mailto:you@example.com", Icon: Mail },
];
const QUOTES = [
  "DESIGN IS JUST VIOLENCE WITH BETTER TYPOGRAPHY",
  "MAKE IT WORK. MAKE IT RIGHT. MAKE IT BEAUTIFUL.",
  "TYPE IS THE VOICE OF AN IDEA",
  "WHITESPACE IS NOT EMPTY — IT BREATHES",
  "FORM FOLLOWS FUNCTION. FUNCTION FOLLOWS FEELING.",
  "EVERY PIXEL IS A DECISION",
];
const IDENTITIES = [
  ["THINKER",  "Obsessed with why things feel the way they feel."],
  ["BUILDER",  "Code is just another design tool, but faster."],
  ["WANDERER", "Music, films, late walks, bad decisions."],
];
const INTERESTS = [
  "Typography","Film","Jazz","Hiking",
  "Sci-Fi","Coffee","Mech Keys","Brutalism",
];


/* ── SCRAMBLE ─────────────────────────────────────────── */
// SSR: spaces (preserves layout, nothing readable shown)
// Client mount: fires random noise immediately, then resolves L→R
function useScramble(final) {
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&?";
  const blank  = final.split("").map(() => "\u00A0").join(""); // same char count, invisible
  const [display, setDisplay] = useState(blank);


  useEffect(() => {
    // Immediately blast random chars so real name never appears first
    setDisplay(final.split("").map(() =>
      CHARS[Math.floor(Math.random() * CHARS.length)]
    ).join(""));


    // Then resolve left-to-right over ~800ms
    let iter = 0;
    const total = final.length * 7;
    const id = setInterval(() => {
      setDisplay(final.split("").map((ch, i) =>
        i < iter / 7 ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
      ).join(""));
      iter++;
      if (iter > total) { setDisplay(final); clearInterval(id); }
    }, 38);
    return () => clearInterval(id);
  }, []); // eslint-disable-line


  return display;
}


/* ── MARQUEE ─────────────────────────────────────────── */
function Marquee() {
  const items = [...QUOTES, ...QUOTES, ...QUOTES];
  return (
    <div className="overflow-hidden border-t border-white/10 bg-white/[0.015] py-2">
      <div className="ar-marquee flex w-max">
        {items.map((q, i) => (
          <span key={i} className={
            "font-['Bebas_Neue'] text-[13px] tracking-widest whitespace-nowrap px-6 " +
            (i % 2 === 0 ? "text-white/60" : "text-white/20")
          }>{q} ✦</span>
        ))}
      </div>
    </div>
  );
}


/* ── SECTION LABEL ───────────────────────────────────── */
const L = ({ c }) => (
  <p className="font-['Space_Mono'] text-[8px] tracking-[0.3em] uppercase text-white/45 mb-3">{c}</p>
);


/* ── ROOT ────────────────────────────────────────────── */
export default function AboutSection() {
  const name = useScramble("giridhar");
  const [openProject, setOpenProject] = useState<number | null>(null);


  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Boldonse&family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
      />
      <style>{[
        "@keyframes ar-marquee{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}",
        "@keyframes ar-fadein{from{opacity:0}to{opacity:1}}",
        "@keyframes ar-pulse{0%,100%{opacity:1}50%{opacity:0.3}}",
        ".ar-marquee{animation:ar-marquee 30s linear infinite}",
        ".ar-marquee:hover{animation-play-state:paused}",
        ".ar-fi{animation:ar-fadein 0.5s ease both}",
        ".ar-d1{animation-delay:.05s}.ar-d2{animation-delay:.12s}.ar-d3{animation-delay:.20s}",
        ".ar-d4{animation-delay:.28s}.ar-d5{animation-delay:.36s}.ar-d6{animation-delay:.44s}",
        ".ar-pulse{animation:ar-pulse 2s ease infinite}",
        ".ar-proj:hover .ar-pn{color:#fff}",
        ".ar-proj:hover .ar-arrow{opacity:1;transform:translate(3px,-3px)}",
        ".ar-clink:hover .ar-cdot{background:#fff}",
        "@keyframes ar-electric { 0%, 100% { box-shadow: 0 0 5px #fff, inset 0 0 2px #fff; border-color: rgba(255,255,255,0.8); } 10% { box-shadow: 0 0 18px #fff, inset 0 0 10px #fff; border-color: #fff; text-shadow: 0 0 8px #fff; } 12% { box-shadow: 0 0 2px #fff; border-color: rgba(255,255,255,0.4); text-shadow: none; } 14% { box-shadow: 0 0 25px #fff, inset 0 0 15px #fff; border-color: #fff; text-shadow: 0 0 12px #fff; } 40% { box-shadow: 0 0 5px #fff, inset 0 0 3px #fff; border-color: rgba(255,255,255,0.7); } 60% { box-shadow: 0 0 2px #fff; border-color: rgba(255,255,255,0.3); } 62% { box-shadow: 0 0 20px #fff, inset 0 0 12px #fff; border-color: #fff; text-shadow: 0 0 10px #fff; } }",
        ".ar-electric { animation: ar-electric 4s infinite; }",
      ].join("")}</style>


      {/*
        ┌──────────────────────────────────────────────────────┐
        │ LAYOUT                                               │
        │                                                      │
        │ Mobile / Tablet (<lg):  vertical scroll stack        │
        │  [topbar]                                            │
        │  [HERO: name+pill+bio LEFT | photo RIGHT]  ← big    │
        │  [projects]                                          │
        │  [resume btn]                                        │
        │  [marquee]                                           │
        │  [who i am + into + contact]                         │
        │                                                      │
        │ Desktop (≥lg):  side-by-side, 100vh                 │
        │  [topbar full-width]                                 │
        │  LEFT(1fr): hero(name+photo) / projects / btn /      │
        │             marquee                                   │
        │  RIGHT(clamp): identities / into / contact           │
        └──────────────────────────────────────────────────────┘
      */}
      <div className="w-full h-screen snap-start relative z-10 bg-[#0a0a0a] text-white overflow-x-hidden border-b-[32px] border-black box-border">


        {/* ── TOP BAR ───────────────────────────────── */}
        <div className="ar-fi ar-d1 flex items-center justify-between
                        px-5 lg:px-8 py-[11px]
                        border-b border-white/10">
          <span className="font-['Space_Mono'] text-[8px] tracking-[0.3em] text-white/40">
            PERSONAL SITE — 2025
          </span>
          <div className="flex gap-1.5">
            {[0,1,2].map(i => (
              <div key={i} className="w-[6px] h-[6px] rounded-full border border-white/25" />
            ))}
          </div>
        </div>


        {/* ── BODY (below topbar) ───────────────────── */}
        <div className="flex flex-col lg:flex-row lg:overflow-hidden"
             style={{ height: "calc(100vh - 43px - 32px)" }}
        >


          {/* ════════ LEFT PANEL ════════ */}
          <div className="flex flex-col flex-1 lg:overflow-hidden lg:border-r lg:border-white/10">


            {/* ── HERO ROW: text | photo ─────────────── */}
            {/* min-h on mobile is fixed so scramble animation never causes layout reflow */}
            <div className="flex items-stretch flex-1 lg:max-h-[55%] min-h-[220px] sm:min-h-[260px]">


              {/* Text side — clip X only so scramble never pushes layout width, but font ascenders/descenders are never cut */}
              <div className="flex-1 flex flex-col justify-center gap-0 overflow-x-hidden
                              px-5 lg:px-9
                              py-7 lg:py-0">


                {/* Name — whitespace-nowrap stops layout shift; py gives Boldonse room so ascenders/descenders never clip */}
                <h1 className="font-['Boldonse'] text-white select-none
                               leading-[0.88] tracking-tight whitespace-nowrap
                               py-1
                               text-[clamp(2.8rem,9vw,4.6rem)]
                               lg:text-[clamp(3rem,5.5vw,4.8rem)]">
                  {name}
                </h1>


                {/* Pill — nudged right on desktop */}
                <div className="ar-fi ar-d2 mt-3 lg:ml-6
                                inline-flex self-start items-center gap-2
                                border border-white/20 px-3 py-[5px]">
                  <span className="ar-pulse w-[5px] h-[5px] rounded-full shrink-0
                                   bg-emerald-400 shadow-[0_0_7px_#34d399]" />
                  <span className="font-['Space_Mono'] tracking-[0.2em] text-white/80
                                   text-[7px] sm:text-[7.5px] lg:text-[8px] whitespace-nowrap">
                    DESIGNER × MAKER × HUMAN
                  </span>
                </div>


                {/* Bio */}
                <p className="ar-fi ar-d3 font-['Space_Mono'] italic text-white/60
                              leading-[1.85] mt-3
                              text-[9px] sm:text-[9.5px] lg:text-[10px]
                              max-w-[260px] sm:max-w-[320px] lg:max-w-[360px]">
                  Based in Bengaluru. I make things that look good, feel good,
                  and occasionally break in interesting ways.
                  Fuelled by coffee and an irrational love of type.
                </p>
              </div>


              {/* Photo side — takes good width, prominent */}
              <div className="relative shrink-0 self-stretch bg-[#0f0f0f] overflow-hidden
                              w-[40vw] sm:w-[36vw] lg:w-[clamp(200px,28%,280px)]">
                {/* halftone texture */}
                <div className="absolute inset-0 z-0 opacity-[0.06]"
                  style={{
                    backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)",
                    backgroundSize:  "13px 13px",
                  }} />
                {/* top glow */}
                <div className="absolute inset-0 z-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.06) 0%,transparent 60%)" }} />

                  <img
                    src={giridhar}
                    alt="Giridhar"
                    className="object-cover object-top z-[1]"
                    loading="eager"
                    style={{
                      maskImage: "linear-gradient(to top, transparent 0%, black 22%)",
                      WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 22%)",
                    }}
                  />


                {/* bottom fade into background */}
                <div className="absolute bottom-0 inset-x-0 h-20 z-[2] pointer-events-none"
                  style={{ background: "linear-gradient(to bottom,transparent,#0a0a0a)" }} />


                {/* vertical label — lg only */}
                <div className="hidden lg:block absolute z-[3] pointer-events-none
                                font-['Space_Mono'] text-[6px] tracking-[0.28em]
                                text-white/18 whitespace-nowrap"
                  style={{ bottom:"46%", right:"-28px", transform:"rotate(90deg)" }}>
                  BENGALURU, IN — EST. 2000
                </div>
              </div>
            </div>


            {/* ── PROJECTS ──────────────────────────── */}
            <div className="ar-fi ar-d4 shrink-0 lg:shrink lg:flex-1 lg:min-h-0 lg:overflow-y-auto
                            px-5 lg:px-9 pt-5 pb-4
                            border-t border-white/10"
                 style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <L c="Making Things" />
              {PROJECTS.map((p, i) => (
                <div key={i}
                     className="ar-proj flex flex-col justify-center
                                py-2 border-b border-white/[0.08] last:border-b-0 cursor-pointer"
                     onClick={() => setOpenProject(openProject === i ? null : i)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-[9px] text-white/30">0{i+1}</span>
                      <a href={p.url} onClick={(e) => e.stopPropagation()}
                         className="ar-pn font-['Bebas_Neue'] text-[19px] tracking-[0.05em]
                                    text-white/75 transition-colors duration-150 hover:text-white no-underline">
                        {p.n}
                      </a>
                      <span className="hidden sm:inline font-['Space_Mono'] text-[8px]
                                       tracking-[0.14em] text-white/40">
                        {p.t}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-white/30">{p.y}</span>
                      <svg className={`ar-arrow transition-all duration-300 shrink-0 ${openProject === i ? 'rotate-90 opacity-100' : 'opacity-20'}`}
                           width="11" height="11" viewBox="0 0 24 24"
                           fill="none" stroke="rgba(255,255,255,0.9)"
                           strokeWidth="2" strokeLinecap="round">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Accordion Content */}
                  <div className={`overflow-hidden transition-all duration-300 ${openProject === i ? 'max-h-20 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="font-['Space_Mono'] text-[10px] text-white/60 leading-relaxed pl-5">
                      {p.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>


            {/* ── RESUME BTN ────────────────────────── */}
            <div className="ar-fi ar-d5 shrink-0 px-5 lg:px-9 pb-5 pt-3">
              <a href="https://girxdhar.github.io/pro"
                 className="ar-electric relative inline-flex items-center gap-2
                            font-['Space_Mono'] text-[8px] sm:text-[9px] font-bold tracking-[0.25em]
                            text-white bg-transparent border border-white
                            px-6 py-3 no-underline uppercase
                            transition-all duration-300 hover:bg-white hover:text-black">
                PROFESSIONAL PROFILE
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
              </a>
            </div>


            {/* ── MARQUEE ───────────────────────────── */}
            <div className="ar-fi ar-d6 shrink-0 mt-auto">
              <Marquee />
            </div>
          </div>


          {/* ════════ RIGHT PANEL ════════ */}
          {/*
            Mobile/Tablet: sits below left panel, full width
            Desktop: fixed-width column beside left panel
          */}
          <div className="flex flex-col relative
                          border-t border-white/10
                          lg:border-t-0 lg:border-l lg:border-white/10
                          lg:w-[clamp(260px,26vw,340px)] lg:shrink-0
                          lg:overflow-y-auto">


            {/* Ghost watermark */}
            <span className="font-['Boldonse'] text-white/[0.03] leading-none
                             select-none pointer-events-none
                             absolute -top-2 -right-2 z-0"
              style={{ fontSize: "clamp(80px,14vw,150px)" }}>g</span>


            {/* WHO I AM */}
            <div className="ar-fi ar-d2 relative z-[1] px-5 lg:px-7 pt-7 lg:pt-9">
              <L c="Who I Am" />
              <div className="flex flex-col gap-4
                              sm:grid sm:grid-cols-3 sm:gap-x-5
                              lg:flex lg:flex-col lg:gap-4">
                {IDENTITIES.map(([title, sub]) => (
                  <div key={title}>
                    <p className="font-['Bebas_Neue'] text-white tracking-[0.06em]
                                  leading-none text-[24px] lg:text-[26px]">
                      {title}
                    </p>
                    <p className="font-['Space_Mono'] italic text-white/[0.68]
                                  leading-[1.7] mt-0.5 text-[9px]">
                      {sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>


            {/* DIVIDER */}
            <div className="mx-5 lg:mx-7 my-5 h-px bg-white/10" />


            {/* INTO */}
            <div className="ar-fi ar-d3 relative z-[1] px-5 lg:px-7 pb-7">
              <L c="Into" />
              <div className="flex flex-wrap gap-1.5">
                {INTERESTS.map(tag => (
                  <span key={tag}
                        className="font-['Space_Mono'] text-[8px] tracking-[0.14em]
                                   border border-white/20 text-white/60
                                   px-2 py-[3px] cursor-default
                                   transition-all duration-150 hover:bg-white hover:text-black">
                    {tag}
                  </span>
                ))}
              </div>
            </div>


            {/* CONTACT */}
            <div className="ar-fi ar-d5 relative z-[1] mt-auto
                            border-t border-white/10
                            px-5 lg:px-7 py-5 lg:py-6">
              <L c="Find Me" />
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5">
                {CONTACTS.map(c => {
                  const Icon = c.Icon;
                  return (
                    <a key={c.l} href={c.h}
                       className="ar-clink font-['Space_Mono'] text-[9px] tracking-[0.18em]
                                  no-underline text-white/55 flex items-center gap-2
                                  transition-all duration-200 hover:text-white group">
                      <div className="bg-white/5 p-1.5 rounded-md border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-200">
                        <Icon size={12} strokeWidth={2} />
                      </div>
                      {c.l}
                    </a>
                  );
                })}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Bebas_Neue'] text-[20px] text-white/[0.10] tracking-[0.06em]">
                  ©2025
                </span>
                <span className="font-mono text-[7px] tracking-[0.25em] text-white/28">
                  GIRIDHAR.DEV
                </span>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  );
}

