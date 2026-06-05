"use client";


import { useState, useEffect } from "react";
import { createPortal } from "react-dom";


const PHOTOS = [
  { id:"p1",  src:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85", title:"Somewhere Between",   location:"Coorg, Karnataka",    year:"2024", desc:"Fog settling over the valley like a held breath. I stood here for forty minutes without moving.", aspect:"tall" },
  { id:"p2",  src:"https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=900&q=85", title:"Concrete Hours",      location:"Bengaluru",           year:"2023", desc:"The city at 6am belongs to no one. Or everyone. I never figured out which.", aspect:"wide" },
  { id:"p3",  src:"https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=900&q=85", title:"Salt & Light",        location:"Goa",                 year:"2024", desc:"Golden hour on the shore. A moment so obvious in its beauty it almost felt cheap to photograph.", aspect:"square" },
  { id:"p4",  src:"https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85", title:"Altitude",            location:"Himachal Pradesh",    year:"2023", desc:"Above the treeline, the silence has texture. You can feel it pressing in.", aspect:"wide" },
  { id:"p5",  src:"https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=900&q=85", title:"Still Water",         location:"Kerala Backwaters",   year:"2022", desc:"The surface so still it made everything above it look uncertain.", aspect:"tall" },
  { id:"p6",  src:"https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=900&q=85", title:"Neon Rain",           location:"Bengaluru",           year:"2024", desc:"Monsoon turns every puddle into a different city. One I'd rather live in.", aspect:"square" },
  { id:"p7",  src:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=85", title:"Open Road",           location:"Rajasthan",           year:"2023", desc:"The highway at dusk. Nothing behind, everything ahead, neither of which matters.", aspect:"wide" },
  { id:"p8",  src:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=85", title:"Forest Floor",        location:"Wayanad, Kerala",     year:"2022", desc:"The light arrives late here. By the time it does, it has forgotten what it was looking for.", aspect:"square" },
  { id:"p9",  src:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=900&q=85", title:"Borrowed Light",      location:"Mysuru",              year:"2024", desc:"The camera was wrong about the time. I've kept its version of events.", aspect:"tall" },
  { id:"p10", src:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&q=85", title:"Mirror Lake",         location:"Uttarakhand",         year:"2023", desc:"Two skies. One of them had clouds. The other had ambition.", aspect:"square" },
  { id:"p11", src:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=85", title:"The Weight of a Look",location:"Bengaluru",           year:"2024", desc:"She looked at the camera like it owed her something. I think it did.", aspect:"portrait" },
  { id:"p12", src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85", title:"Against the Light",   location:"Hampi, Karnataka",    year:"2023", desc:"The sun behind him made everything else a silhouette. I kept the frame anyway.", aspect:"portrait" },
];


const POEMS = [
  { id:"w1",  title:"Draft for a Tuesday",           date:"Oct 2024", tag:"FRAGMENT",       lines:["I keep starting sentences","with the word \"maybe\"\u2014","as if certainty","is something I owe you.","","The coffee goes cold.","I let it."] },
  { id:"w2",  title:"On Staying",                    date:"Aug 2024", tag:"PROSE POEM",     lines:["There is a kind of courage in stillness.","Not the loud kind. The kind that looks,","from the outside, like nothing at all.","","I have been practicing it in doorways,","in the second before I speak,","in every room I have almost left."] },
  { id:"w3",  title:"Portrait of My City at 2am",    date:"Jun 2023", tag:"OBSERVATION",    lines:["The flyover holds the sky up.","Or tries to.","","Below it: a tea stall,","a man checking his phone,","dogs that own the road.","","Everyone looks like they're","waiting for something","they've already missed."] },
  { id:"w4",  title:"Displacement",                  date:"Mar 2024", tag:"FRAGMENT",       lines:["I am from everywhere","I've stayed too long in.","","Bengaluru now.","Before that: classrooms,","arguments, borrowed books.","","I carry them in my posture."] },
  { id:"w5",  title:"Note on Impermanence",           date:"Jan 2024", tag:"HAIKU SEQUENCE", lines:["tab open too long\u2014","the article I'll never","read, reading me","","\u2014","","missed call at midnight.","by morning I've written","three replies, sent none."] },
  { id:"w6",  title:"Still Life With Phone",          date:"Sep 2024", tag:"OBSERVATION",    lines:["The screen is the last thing","I look at before sleep.","It glows like a city","I can't get to.","","I am trying to learn","to put it face-down.","I am not good at this yet."] },
  { id:"w7",  title:"Small Hours",                   date:"Nov 2023", tag:"FRAGMENT",       lines:["3am is honest in a way","4am has already forgotten.","","I know things at 3am","I won't know tomorrow.","","I write them down.","They don't survive the morning."] },
  { id:"w8",  title:"What the Mirror Does",           date:"Feb 2024", tag:"PROSE POEM",     lines:["It shows you yesterday.","Not literally \u2014 but close enough.","","You think you look the same.","You do. You don't.","","The difference is the part","you can't photograph."] },
  { id:"w9",  title:"Trying to Remember a Dream",    date:"May 2023", tag:"FRAGMENT",       lines:["There was a room.","You were in it.","","That's the whole thing.","I've been carrying it","like a stone","I'm not sure is mine."] },
  { id:"w10", title:"On Reading Old Messages",        date:"Dec 2023", tag:"OBSERVATION",    lines:["The person who sent these","is still technically me.","I don't hold it against them.","","We were doing our best","with what we knew.","","We still are."] },
];


const PHOTOS_PER_PAGE = 8;
const POEMS_PER_PAGE  = 8;


function Lightbox({ photo, onClose }) {
  const [colored, setColored] = useState(false);
  const [loaded,  setLoaded]  = useState(false);
  const isPortrait = photo.aspect === "tall" || photo.aspect === "portrait";


  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setColored(true), 420);
    return () => { document.body.style.overflow = prev; clearTimeout(t); };
  }, []);


  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);


  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-8"
      style={{ background: "rgba(4,4,4,0.97)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[98vw] sm:max-w-[92vw] lg:max-w-[1200px] flex flex-col lg:flex-row bg-[#0d0d0d] border border-white/10 overflow-y-auto"
        style={{ maxHeight: "90vh", boxShadow: "0 0 100px rgba(0,0,0,0.9)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative cursor-pointer bg-[#080808] w-full flex-shrink-0 lg:flex-1"
          style={{ height: isPortrait ? "clamp(300px, 65vw, 75vh)" : "clamp(250px, 55vw, 65vh)" }}
          onClick={() => setColored((v) => !v)}
        >
          <img
            src={photo.src}
            alt={photo.title}
            className={"absolute inset-0 w-full h-full " + (isPortrait ? "object-contain" : "object-cover")}
          />
          <img
            src={photo.src}
            alt=""
            className={"absolute inset-0 w-full h-full transition-opacity duration-700 " + (isPortrait ? "object-contain" : "object-cover")}
            style={{ filter: "grayscale(1) contrast(1.08)", opacity: colored ? 0 : 1 }}
            onLoad={() => setLoaded(true)}
          />
          {!colored && loaded && (
            <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
              <span className="font-mono text-[8px] tracking-[0.26em] uppercase text-white/65 bg-black/55 backdrop-blur-sm px-3 py-1.5 border border-white/15">
                TAP TO REVEAL
              </span>
            </div>
          )}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
            <span className="font-mono text-[7px] tracking-[0.2em] text-white/40">
              {colored ? "COLOUR" : "B&W"}
            </span>
            <div className={"w-2 h-2 rounded-full border transition-all duration-500 " + (colored ? "bg-emerald-400 border-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-transparent border-white/30")} />
          </div>
        </div>
        <div className="w-full lg:w-72 flex-shrink-0 flex flex-col border-t border-white/10 lg:border-t-0 lg:border-l lg:border-white/10">
          <div className="flex-1 p-5 sm:p-6 lg:p-7 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-mono text-[7.5px] tracking-[0.28em] uppercase text-white/40">{photo.location}</span>
              <span className="text-white/20 text-[8px]">·</span>
              <span className="font-mono text-[7.5px] tracking-[0.2em] text-white/28">{photo.year}</span>
            </div>
            <h2
              className="text-white leading-[1.05] text-[clamp(1.3rem,5vw,1.75rem)] py-0.5"
              style={{ fontFamily: "Boldonse, sans-serif", wordBreak: "break-word", overflowWrap: "anywhere" }}
            >
              {photo.title}
            </h2>
            <p className="font-mono text-[9.5px] sm:text-[10px] italic text-white/60 leading-[1.95]">
              {photo.desc}
            </p>
          </div>
          <div className="shrink-0 border-t border-white/10 p-4 sm:p-5 flex items-center justify-between gap-3">
            <button
              onClick={() => setColored((v) => !v)}
              className="font-mono text-[7.5px] tracking-[0.2em] uppercase border border-white/20 text-white/50 px-3 py-2 hover:bg-white hover:text-black transition-all duration-200"
            >
              {colored ? "B&W MODE" : "COLOUR"}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 border border-white/20 text-white/40 flex items-center justify-center text-sm hover:bg-white hover:text-black transition-all duration-200"
            >
              &#x2715;
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}


function PaginationBar({ page, total, perPage, onPage }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;


  const start = (page - 1) * perPage + 1;
  const end   = Math.min(page * perPage, total);


  return (
    <div className="border-t border-white/[0.07] px-5 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-baseline gap-3">
        <span className="text-white text-[clamp(1.2rem,2vw,1.6rem)] tracking-[0.04em]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
          {String(start).padStart(2, "0")}&mdash;{String(end).padStart(2, "0")}
        </span>
        <span className="font-mono text-[8px] tracking-[0.2em] text-white/30">
          OF {String(total).padStart(2, "0")}
        </span>
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onPage(p)}
            className="font-mono text-[8px] tracking-[0.18em] w-8 h-8 flex items-center justify-center border transition-all duration-200"
            style={{
              borderColor: p === page ? "#fff" : "rgba(255,255,255,0.15)",
              background:  p === page ? "#fff" : "transparent",
              color:       p === page ? "#000" : "rgba(255,255,255,0.4)",
            }}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="font-mono text-[8px] tracking-[0.18em] uppercase border border-white/15 text-white/40 px-3 py-2 disabled:opacity-20 disabled:cursor-not-allowed hover:border-white/50 hover:text-white/80 transition-all duration-150"
        >
          &#8592; PREV
        </button>
        <button
          onClick={() => onPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="font-mono text-[8px] tracking-[0.18em] uppercase border border-white/15 text-white/40 px-3 py-2 disabled:opacity-20 disabled:cursor-not-allowed hover:border-white/50 hover:text-white/80 transition-all duration-150"
        >
          NEXT &#8594;
        </button>
      </div>
    </div>
  );
}


function PhotosTab() {
  const [active, setActive] = useState(null);
  const [page,   setPage]   = useState(1);


  const start   = (page - 1) * PHOTOS_PER_PAGE;
  const visible = PHOTOS.slice(start, start + PHOTOS_PER_PAGE);


  function goPage(p) {
    setPage(p);
    document.getElementById("cg-photos-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }


  return (
    <>
      {active && <Lightbox photo={active} onClose={() => setActive(null)} />}
      <div id="cg-photos-grid">
        <div className="p-4 sm:p-5 lg:p-8 columns-2 lg:columns-3 gap-3 lg:gap-4">
          {visible.map((photo, idx) => (
            <div
              key={photo.id}
              className="break-inside-avoid mb-3 lg:mb-4 group cursor-pointer relative overflow-hidden cg-fi"
              style={{ animationDelay: idx * 0.05 + "s" }}
              onClick={() => setActive(photo)}
            >
              <div
                className={
                  "relative overflow-hidden " +
                  (photo.aspect === "portrait" ? "aspect-[9/16]" :
                   photo.aspect === "tall"     ? "aspect-[2/3]"  :
                   photo.aspect === "wide"     ? "aspect-[4/3]"  : "aspect-square")
                }
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className={"absolute inset-0 w-full h-full " + (photo.aspect === "portrait" ? "object-contain" : "object-cover")}
                />
                <img
                  src={photo.src}
                  alt=""
                  className={"absolute inset-0 w-full h-full scale-100 transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-[1.04] " + (photo.aspect === "portrait" ? "object-contain" : "object-cover")}
                  style={{ filter: "grayscale(1) contrast(1.1)" }}
                />
                <div className="absolute inset-0 bg-black/45 transition-opacity duration-500 group-hover:opacity-10" />
                <div className="absolute bottom-0 inset-x-0 p-3 translate-y-1 transition-all duration-300 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                  <p className="text-white text-[16px] tracking-[0.06em] leading-none" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                    {photo.title}
                  </p>
                  <p className="font-mono text-white/55 text-[7.5px] tracking-[0.18em] uppercase mt-0.5">
                    {photo.location}
                  </p>
                </div>
                <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full border border-white/30 transition-all duration-300 group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:shadow-[0_0_8px_#34d399]" />
                <div className="absolute top-2.5 left-2.5 font-mono text-[7px] tracking-[0.18em] text-white/30">
                  {String(start + idx + 1).padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}
        </div>
        <PaginationBar page={page} total={PHOTOS.length} perPage={PHOTOS_PER_PAGE} onPage={goPage} />
      </div>
    </>
  );
}


function PoemCard({ poem, idx }) {
  const [open, setOpen] = useState(false);
  const num = String(idx + 1).padStart(2, "0");


  return (
    <article
      className="relative border-b border-white/[0.08] last:border-b-0 group cursor-pointer transition-colors duration-200 hover:bg-white/[0.02]"
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-start gap-5 lg:gap-8 px-5 lg:px-8 py-6 lg:py-8">
        <span
          className="text-white/[0.08] leading-none shrink-0 select-none group-hover:text-white/[0.15] transition-colors duration-300 text-[clamp(3rem,6vw,5rem)]"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          {num}
        </span>
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-[7.5px] tracking-[0.28em] uppercase text-black bg-white/80 px-2 py-[2px]">
              {poem.tag}
            </span>
            <span className="font-mono text-[8px] tracking-[0.2em] text-white/30">
              {poem.date}
            </span>
          </div>
          <h3
            className="text-white leading-[0.9] tracking-[0.04em] text-[clamp(1.6rem,4vw,3rem)] group-hover:tracking-[0.07em] transition-all duration-300"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {poem.title}
          </h3>
          <p className={"font-mono italic text-white/35 text-[9px] leading-[1.7] transition-all duration-300 " + (open ? "opacity-0 h-0 overflow-hidden mt-0" : "opacity-100 mt-2")}>
            {poem.lines.find((l) => l !== "") || ""}
          </p>
        </div>
        <div
          className="shrink-0 mt-2 w-7 h-7 flex items-center justify-center border border-white/15 text-white/30 group-hover:border-white/40 group-hover:text-white/60 transition-all duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform .3s ease" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </div>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? 800 : 0 }}
      >
        <div className="px-5 lg:px-8 pb-8 lg:pb-10">
          <div className="h-px bg-white/[0.07] mb-8" />
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="flex-1">
              <div className="text-white/[0.06] text-[100px] leading-none select-none -mb-8 -ml-2" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                &ldquo;
              </div>
              <div className="relative pl-5 border-l-2 border-white/20">
                {poem.lines.map((line, i) =>
                  line === "—"
                    ? <div key={i} className="my-4 w-8 h-px bg-white/25" />
                    : line === ""
                    ? <div key={i} className="h-4" />
                    : <p key={i} className="font-mono italic text-white/85 text-[clamp(11px,1.4vw,14px)] leading-[2.1]">{line}</p>
                )}
              </div>
            </div>
            <div className="lg:w-44 shrink-0 flex flex-col gap-5">
              <div>
                <p className="font-mono text-[7.5px] tracking-[0.28em] uppercase text-white/30 mb-1">WRITTEN</p>
                <p className="text-white text-[18px] tracking-[0.04em]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>{poem.date}</p>
              </div>
              <div>
                <p className="font-mono text-[7.5px] tracking-[0.28em] uppercase text-white/30 mb-1">FORM</p>
                <p className="font-mono text-[9px] tracking-[0.18em] text-white/60 uppercase">{poem.tag}</p>
              </div>
              <div>
                <p className="font-mono text-[7.5px] tracking-[0.28em] uppercase text-white/30 mb-1">LINES</p>
                <p className="text-white text-[18px] tracking-[0.04em]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                  {poem.lines.filter((l) => l !== "" && l !== "—").length}
                </p>
              </div>
              <div className="mt-auto">
                <p className="text-white/[0.06] text-[64px] leading-none select-none" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                  {num}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}


function PoetryTab() {
  const [page, setPage] = useState(1);
  const start   = (page - 1) * POEMS_PER_PAGE;
  const visible = POEMS.slice(start, start + POEMS_PER_PAGE);


  function goPage(p) {
    setPage(p);
    document.getElementById("cg-poetry-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }


  return (
    <div id="cg-poetry-list">
      <div className="divide-y divide-white/[0.05]">
        {visible.map((poem, idx) => (
          <PoemCard key={poem.id} poem={poem} idx={start + idx} />
        ))}
      </div>
      <PaginationBar page={page} total={POEMS.length} perPage={POEMS_PER_PAGE} onPage={goPage} />
    </div>
  );
}


export default function CreativeGallery({ activeTab, onTabChange }: { activeTab?: string, onTabChange?: (tab: string) => void }) {
  const [internalTab, setInternalTab] = useState("photos");
  const tab = activeTab !== undefined ? activeTab : internalTab;
  const setTab = onTabChange || setInternalTab;


  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Boldonse&family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
      />
      <style>{[
        "@keyframes cg-fadein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}",
        "@keyframes cg-pulse{0%,100%{opacity:1}50%{opacity:0.35}}",
        ".cg-fi{animation:cg-fadein 0.4s ease both}",
        ".cg-pulse{animation:cg-pulse 2s ease infinite}",
      ].join("")}</style>


      <div className="w-full min-h-screen snap-start relative z-10 bg-[#0a0a0a] text-white overflow-x-hidden border-b-[24px] border-black box-border">
        <div className="sticky top-0 z-50 bg-[#0a0a0a] pt-4 lg:pt-6">
          <div className="border-b border-white/10 px-5 lg:px-8 py-4 lg:py-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <p className="font-mono text-[7.5px] tracking-[0.3em] uppercase text-white/30 mb-1.5">
                GIRIDHAR &#183; CREATIVE ARCHIVE
              </p>
              <h2
                className="text-white leading-[0.88] text-[clamp(1.2rem,7.5vw,2rem)] sm:text-[clamp(1.8rem,5.5vw,3.2rem)] whitespace-nowrap transition-all duration-500"
                style={{ fontFamily: "Boldonse, sans-serif" }}
              >
                {tab === "photos" ? "THROUGH THE LENS" : "WRITTEN THINGS"}
              </h2>
            </div>
            <div className="flex shrink-0 border border-white/15 self-start sm:self-auto">
              {[
                { id: "photos", label: "PHOTOGRAPHS" },
                { id: "poetry", label: "POETRY"      },
              ].map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="font-mono text-[7.5px] lg:text-[8px] tracking-[0.22em] uppercase px-4 lg:px-5 py-2.5 transition-all duration-200"
                  style={{
                    background:  tab === t.id ? "#fff" : "transparent",
                    color:       tab === t.id ? "#000" : "rgba(255,255,255,0.4)",
                    borderRight: i === 0 ? "1px solid rgba(255,255,255,0.15)" : "none",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="border-b border-white/[0.06] px-5 lg:px-8 py-2.5 flex items-center justify-between">
            <p className="font-mono text-[7.5px] tracking-[0.25em] text-white/28">
              {tab === "photos"
                ? PHOTOS.length + " FRAMES · 8 PER PAGE — HOVER TO PREVIEW · CLICK TO OPEN"
                : POEMS.length  + " PIECES · 8 PER PAGE — CLICK ANY TO READ"}
            </p>
            <div className="flex items-center gap-2">
              <span className="cg-pulse w-[5px] h-[5px] rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              <span className="font-mono text-[7.5px] tracking-[0.2em] text-emerald-400/65">LIVE</span>
            </div>
          </div>
        </div>


        <div key={tab} className="cg-fi">
          {tab === "photos" ? <PhotosTab /> : <PoetryTab />}
        </div>


        <div className="border-t border-white/[0.06] px-5 lg:px-8 py-4 flex items-center justify-between mt-4">
          <span className="text-[20px] text-white/[0.07] tracking-[0.06em]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>&#169;2025</span>
          <span className="font-mono text-[7px] tracking-[0.28em] text-white/18">GIRIDHAR.DEV</span>
        </div>
      </div>
    </>
  );
}
