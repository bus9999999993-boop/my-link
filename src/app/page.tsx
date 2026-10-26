"use client";

import { useState } from "react";

export default function Home() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [pollSelected, setPollSelected] = useState<string>("nextjs");
  const [pollVoted, setPollVoted] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const email = "heewon.jung.dev@gmail.com";

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    showToast("Email address copied to clipboard!");
  };

  const handlePollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPollVoted(true);
    showToast("Player's Poll response submitted!");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      showToast(`Searching for "${searchQuery}" in Nintendo.com Archive...`);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start p-2 sm:p-4 text-[#21242e]">
      {/* 2001 Console Hardware Main Canvas Container (~830px fixed machine faceplate) */}
      <div className="w-full max-w-[830px] bg-[#7a8aba] bevel-plate shadow-[0_12px_32px_rgba(20,25,45,0.45)] relative overflow-hidden">
        
        {/* MASTHEAD: Mario Mascot + Speech Bubble + Search */}
        <div className="bg-[#7a8aba] px-3 pt-3 pb-2 flex flex-wrap items-end justify-between gap-2 border-b border-[#3d4f97]">
          {/* Mario Mascot & Speech Bubble */}
          <div className="flex items-center gap-2">
            {/* Pixel Mario Icon */}
            <div className="relative w-11 h-11 bg-[#e60012] border border-[#21242e] rounded-md shadow-sm flex items-center justify-center shrink-0">
              <span className="text-xl" role="img" aria-label="Mario">🍄</span>
              <span className="absolute -top-1 -left-1 bg-[#21242e] text-[#f68d1f] text-[9px] font-black px-1 rounded-xs">
                M
              </span>
            </div>

            {/* Speech Bubble */}
            <div className="relative bg-white border border-[#21242e] rounded-[10px] px-2.5 py-1 text-[11px] font-bold text-[#21242e] shadow-sm leading-tight">
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[4px] border-y-transparent border-r-[6px] border-r-white" />
              Welcome to Nintendo.com! <span className="text-[#3d4f97] font-black">Jeong Huiwon Edition</span>
            </div>
          </div>

          {/* Search Module */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-1 text-[11px] font-bold">
            <span className="text-[#21242e] uppercase tracking-[0.5px] text-[10px] hidden sm:inline">
              SEARCH:
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Game, Code, Profile..."
              className="bg-white border border-[#3d4f97] text-[#21242e] px-2 py-0.5 text-[11px] h-[22px] w-28 sm:w-36 rounded-none outline-none focus:ring-1 focus:ring-[#f68d1f]"
            />
            <select className="bg-white border border-[#21242e] text-[#21242e] text-[10px] h-[22px] px-1 font-bold rounded-none hidden sm:inline-block">
              <option>All</option>
              <option>Profile</option>
              <option>Projects</option>
              <option>Codes</option>
            </select>
            <button
              type="submit"
              className="bg-[#ecab37] hover:bg-[#e48600] active:bg-[#e48600] text-[#21242e] font-black text-[10px] uppercase px-2 h-[22px] bevel-chip cursor-pointer tracking-[0.5px]"
            >
              GO
            </button>
          </form>
        </div>

        {/* PRIMARY NAV BAR: Carbon-Navy with Halftone Dot Texture */}
        <div className="carbon-halftone px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#3d4f97]">
          {/* Logo Pill + Main Links */}
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto">
            {/* Nintendo Racetrack Logo Pill */}
            <div className="bg-white border border-[#21242e] rounded-full px-2.5 py-0.5 flex items-center justify-center shrink-0 shadow-inner">
              <span className="text-[#e60012] font-black text-[13px] tracking-tighter">
                Nintendo
              </span>
            </div>

            {/* Primary Section Links (Nav Gold Glowing Words) */}
            <nav className="flex items-center gap-2.5 sm:gap-4 text-[12px] sm:text-[13px] font-black tracking-[0.5px] uppercase">
              <a href="#profile" className="text-[#e48600] hover:text-[#ffd280] transition-colors whitespace-nowrap">
                GAMES
              </a>
              <a href="#systems" className="text-[#e48600] hover:text-[#ffd280] transition-colors whitespace-nowrap">
                SYSTEMS
              </a>
              <a href="#news" className="text-[#e48600] hover:text-[#ffd280] transition-colors whitespace-nowrap">
                NEWS
              </a>
              <a href="#projects" className="text-[#e48600] hover:text-[#ffd280] transition-colors whitespace-nowrap">
                NSIDER
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#e48600] hover:text-[#ffd280] transition-colors whitespace-nowrap">
                DOWNLOADS
              </a>
            </nav>
          </div>

          {/* Right Utility Chips (Amber) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => showToast("Opening Code Bank Archive...")}
              className="bg-[#ecab37] hover:bg-[#e48600] text-[#21242e] font-black text-[10px] uppercase px-2 py-0.5 bevel-chip cursor-pointer tracking-[0.5px] whitespace-nowrap"
            >
              CODE BANK
            </button>
            <button
              onClick={() => showToast("Game Finder: Frontend Engineer Jeong Huiwon")}
              className="bg-[#ecab37] hover:bg-[#e48600] text-[#21242e] font-black text-[10px] uppercase px-2 py-0.5 bevel-chip cursor-pointer tracking-[0.5px] whitespace-nowrap"
            >
              GAME FINDER
            </button>
          </div>
        </div>

        {/* SECONDARY NAV STRIP: Pale Sky */}
        <div className="bg-[#9fbee7] px-3 py-1 flex items-center justify-between overflow-x-auto text-[11px] font-bold text-[#21242e] border-b-2 border-[#3d4f97] whitespace-nowrap">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[#3d4f97] font-black">SUB-NAV:</span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub
            </a>
            <span className="text-[#3d4f97]">|</span>
            <a href="https://velog.io" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Tech Blog
            </a>
            <span className="text-[#3d4f97]">|</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              LinkedIn
            </a>
            <span className="text-[#3d4f97]">|</span>
            <button onClick={handleCopyEmail} className="hover:underline cursor-pointer">
              Contact / E-mail
            </button>
            <span className="text-[#3d4f97]">|</span>
            <a href="#esrb" className="hover:underline">
              ESRB Privacy
            </a>
          </div>
          <span className="text-[10px] text-[#3d4f97] font-mono hidden md:inline">
            MODEL NO. HW-2001
          </span>
        </div>

        {/* HERO FIELD: Box-Art Wordmark & Hardware Showcase */}
        <div className="p-3 bg-[#7a8aba]">
          <div className="relative bg-gradient-to-r from-[#acace7] via-[#94a8d8] to-[#8ba1d4] bevel-plate p-4 sm:p-6 overflow-hidden">
            {/* Background Circuit Grid Texture Overlay */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(#3d4f97 1px, transparent 1px), linear-gradient(90deg, #3d4f97 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                {/* Platform Badge */}
                <div className="inline-flex items-center gap-1.5 bg-[#f68d1f] text-white font-black text-[10px] uppercase px-2 py-0.5 bevel-signal mb-2 tracking-[0.5px]">
                  <span>PLAY IT ON</span>
                  <span className="bg-[#21242e] text-[#f68d1f] px-1 py-0.2 rounded-xs">WEB 2001</span>
                </div>

                {/* Box-Art Display Wordmark */}
                <h1 className="box-art-title text-3xl sm:text-4xl md:text-5xl leading-none tracking-tight mb-2">
                  JEONG HUIWON
                </h1>

                {/* Hero Tagline */}
                <p className="text-[14px] sm:text-[15px] font-bold text-[#21242e] leading-snug max-w-xl mb-3">
                  Gorgeous graphics, clean code, and scalable architecture. Building next-generation web applications with precision console engineering.
                </p>

                {/* Forward Action Button */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#f68d1f] hover:bg-[#ff9e3b] text-white font-black text-[12px] uppercase tracking-[0.5px] px-3.5 py-1.5 bevel-signal cursor-pointer shadow-sm"
                  >
                    <span>ENTER SYSTEM PORTFOLIO</span>
                    {/* Circle Arrow Disc */}
                    <span className="w-5 h-5 rounded-full bg-white text-[#f68d1f] flex items-center justify-center font-black text-[11px] shadow-xs">
                      ➔
                    </span>
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="bg-[#ecab37] hover:bg-[#f2ba57] text-[#21242e] font-black text-[11px] uppercase tracking-[0.5px] px-3 py-1.5 bevel-chip cursor-pointer"
                  >
                    E-MAIL CHIP ✉
                  </button>
                </div>
              </div>

              {/* Hardware Stamp Card / Specs Box */}
              <div className="hidden sm:flex flex-col bg-[#21242e] border-2 border-[#3d4f97] p-2.5 text-white w-44 shrink-0 shadow-md">
                <div className="text-[10px] text-[#f68d1f] font-black tracking-wider border-b border-[#3d4f97] pb-1 mb-1.5 uppercase flex justify-between">
                  <span>DEV SPECS</span>
                  <span>VER 2001</span>
                </div>
                <div className="text-[11px] space-y-1 font-mono text-[#dedede]">
                  <div>ROLE: <span className="text-[#ecab37]">FRONTEND</span></div>
                  <div>STACK: <span className="text-white">NEXT.JS/TS</span></div>
                  <div>SPEED: <span className="text-[#86efac]">60 FPS</span></div>
                  <div>STATUS: <span className="text-[#f68d1f]">ONLINE</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN BODY: 2-COLUMN SPLIT WITH LEFT RAIL TABS */}
        <div className="p-3 pt-0 bg-[#7a8aba] flex flex-col md:flex-row gap-3">
          
          {/* LEFT RAIL VERTICAL ROTATED TABS (Desktop Console Style) */}
          <div className="hidden md:flex flex-col gap-1 w-7 shrink-0 text-[10px] font-black tracking-wider uppercase">
            <div className="bg-[#21242e] text-[#9fbee7] border border-[#3d4f97] py-3 text-center writing-vertical-lr rotate-180 cursor-pointer hover:text-white transition-colors">
              TOP TEN
            </div>
            <div className="bg-[#21242e] text-[#9fbee7] border border-[#3d4f97] py-3 text-center writing-vertical-lr rotate-180 cursor-pointer hover:text-white transition-colors">
              GAMES
            </div>
            <div className="bg-[#21242e] text-[#9fbee7] border border-[#3d4f97] py-3 text-center writing-vertical-lr rotate-180 cursor-pointer hover:text-white transition-colors">
              CHOICE
            </div>
            <div className="bg-[#21242e] text-[#ecab37] border border-[#3d4f97] py-3 text-center writing-vertical-lr rotate-180 cursor-pointer hover:text-white transition-colors">
              ESRB
            </div>
          </div>

          {/* MAIN CONTENT COLUMN (~2/3) */}
          <div className="flex-1 flex flex-col gap-3 min-w-0">
            
            {/* MODULE 1: Official News & Updates */}
            <div className="bg-[#7a8aba] border border-[#3d4f97]">
              {/* Section Header Bar */}
              <div className="bg-[#7a8aba] border-b border-[#3d4f97] px-2.5 py-1 flex items-center justify-between text-[11px] font-black tracking-[0.5px] uppercase text-[#21242e]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#3d4f97] text-sm">≡</span>
                  <span>OFFICIAL NEWS / UPDATES</span>
                </div>
                <span className="text-[10px] text-[#3d4f97]">OCTOBER 2001 EDITION</span>
              </div>

              {/* News Rows List (Platinum Gray Inset Rows) */}
              <div className="p-2 flex flex-col gap-1.5 bg-[#8ba1d4]">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#dedede] hover:bg-white bevel-plate p-2 flex items-center justify-between gap-2 group cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="bg-[#3d4f97] text-white text-[9px] font-black px-1.5 py-0.5 shrink-0">
                      SYS
                    </span>
                    <span className="text-[12px] font-bold text-[#3d4f97] group-hover:text-[#21242e] truncate">
                      MyLink Console Edition Launched: Full Hardware Aesthetics
                    </span>
                  </div>
                  <span className="w-[18px] h-[18px] bg-[#f68d1f] group-hover:bg-[#ff9e3b] text-white flex items-center justify-center font-black text-[10px] bevel-signal shrink-0">
                    &gt;
                  </span>
                </a>

                <a
                  href="https://velog.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#dedede] hover:bg-white bevel-plate p-2 flex items-center justify-between gap-2 group cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="bg-[#e48600] text-white text-[9px] font-black px-1.5 py-0.5 shrink-0">
                      BLOG
                    </span>
                    <span className="text-[12px] font-bold text-[#3d4f97] group-hover:text-[#21242e] truncate">
                      Deep Dive: Mastering Next.js Turbopack & React 19 Architecture
                    </span>
                  </div>
                  <span className="w-[18px] h-[18px] bg-[#f68d1f] group-hover:bg-[#ff9e3b] text-white flex items-center justify-center font-black text-[10px] bevel-signal shrink-0">
                    &gt;
                  </span>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#dedede] hover:bg-white bevel-plate p-2 flex items-center justify-between gap-2 group cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="bg-[#206479] text-white text-[9px] font-black px-1.5 py-0.5 shrink-0">
                      DEV
                    </span>
                    <span className="text-[12px] font-bold text-[#3d4f97] group-hover:text-[#21242e] truncate">
                      TypeScript 5.x Strict Mode: Bulletproof State Management Patterns
                    </span>
                  </div>
                  <span className="w-[18px] h-[18px] bg-[#f68d1f] group-hover:bg-[#ff9e3b] text-white flex items-center justify-center font-black text-[10px] bevel-signal shrink-0">
                    &gt;
                  </span>
                </a>
              </div>
            </div>

            {/* MODULE 2: Featured Sites & Projects (2x2 Grid) */}
            <div className="bg-[#7a8aba] border border-[#3d4f97]">
              <div className="bg-[#7a8aba] border-b border-[#3d4f97] px-2.5 py-1 flex items-center justify-between text-[11px] font-black tracking-[0.5px] uppercase text-[#21242e]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#3d4f97] text-sm">≡</span>
                  <span>FEATURED SITES & PROJECTS</span>
                </div>
                <span className="text-[10px] text-[#3d4f97]">CARTRIDGE RACKS</span>
              </div>

              <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#8ba1d4]">
                {/* Tile 1 */}
                <div className="bg-white bevel-plate p-2.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-black text-[#21242e]">DevNote 64</span>
                      <span className="text-[9px] font-black bg-[#9fbee7] text-[#21242e] px-1.5 py-0.2">
                        WIKI
                      </span>
                    </div>
                    <p className="text-[11px] text-[#21242e] leading-snug mb-2">
                      Markdown-based developer knowledge repository & problem solving archive.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#dedede]">
                    <span className="text-[10px] text-[#3d4f97] font-mono">www.devnote64.io</span>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-black text-[#f68d1f] hover:underline"
                    >
                      VISIT ➔
                    </a>
                  </div>
                </div>

                {/* Tile 2 */}
                <div className="bg-white bevel-plate p-2.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-black text-[#21242e]">FlowFocus Color</span>
                      <span className="text-[9px] font-black bg-[#ecab37] text-[#21242e] px-1.5 py-0.2">
                        TIMER
                      </span>
                    </div>
                    <p className="text-[11px] text-[#21242e] leading-snug mb-2">
                      Minimalist Pomodoro productivity booster with Web Audio sound synthesis.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#dedede]">
                    <span className="text-[10px] text-[#3d4f97] font-mono">www.flowfocus.net</span>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-black text-[#f68d1f] hover:underline"
                    >
                      VISIT ➔
                    </a>
                  </div>
                </div>

                {/* Tile 3 */}
                <div className="bg-white bevel-plate p-2.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-black text-[#21242e]">Tech Log Archive</span>
                      <span className="text-[9px] font-black bg-[#86efac] text-[#21242e] px-1.5 py-0.2">
                        BLOG
                      </span>
                    </div>
                    <p className="text-[11px] text-[#21242e] leading-snug mb-2">
                      Deep-dive retrospectives, web performance audits, and debugging journeys.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#dedede]">
                    <span className="text-[10px] text-[#3d4f97] font-mono">velog.io/@huiwon</span>
                    <a
                      href="https://velog.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-black text-[#f68d1f] hover:underline"
                    >
                      VISIT ➔
                    </a>
                  </div>
                </div>

                {/* Tile 4 */}
                <div className="bg-white bevel-plate p-2.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-black text-[#21242e]">Code Vault Hub</span>
                      <span className="text-[9px] font-black bg-[#acace7] text-[#21242e] px-1.5 py-0.2">
                        REPO
                      </span>
                    </div>
                    <p className="text-[11px] text-[#21242e] leading-snug mb-2">
                      Public repositories, open-source toy projects, and UI component prototypes.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#dedede]">
                    <span className="text-[10px] text-[#3d4f97] font-mono">github.com/heewon</span>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-black text-[#f68d1f] hover:underline"
                    >
                      VISIT ➔
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* MODULE 3: Player's Poll (Raised Periwinkle Plate) */}
            <div className="bg-[#8ba1d4] bevel-plate p-3 border border-[#3d4f97]">
              <div className="flex items-center justify-between border-b border-[#3d4f97] pb-1.5 mb-2.5">
                <div className="flex items-center gap-1.5 text-[11px] font-black tracking-[0.5px] uppercase text-[#21242e]">
                  <span className="text-[#e60012]">★</span>
                  <span>PLAYER&apos;S POLL: FRONTEND ARCHITECTURE</span>
                </div>
                <span className="text-[10px] text-[#3d4f97] font-bold">POLL NO. 01</span>
              </div>

              {pollVoted ? (
                <div className="bg-white bevel-inset p-3 text-center">
                  <div className="text-[13px] font-black text-[#21242e] mb-1">
                    THANK YOU FOR VOTING!
                  </div>
                  <p className="text-[11px] text-[#3d4f97]">
                    Your choice ({pollSelected.toUpperCase()}) has been recorded in the 2001 player consensus.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePollSubmit} className="flex flex-col gap-2">
                  <p className="text-[12px] font-bold text-[#21242e]">
                    Which frontend technology stack drives your production web applications in 2026?
                  </p>

                  <div className="space-y-1.5 pl-1 text-[11px] font-bold text-[#21242e]">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="poll"
                        value="nextjs"
                        checked={pollSelected === "nextjs"}
                        onChange={() => setPollSelected("nextjs")}
                        className="accent-[#f68d1f]"
                      />
                      <span>Next.js App Router & TypeScript (Full-Stack SSR)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="poll"
                        value="react"
                        checked={pollSelected === "react"}
                        onChange={() => setPollSelected("react")}
                        className="accent-[#f68d1f]"
                      />
                      <span>React 19 + Vite (Modern Lightweight SPA)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="poll"
                        value="tailwind"
                        checked={pollSelected === "tailwind"}
                        onChange={() => setPollSelected("tailwind")}
                        className="accent-[#f68d1f]"
                      />
                      <span>Tailwind CSS + Headless UI / Micro-Interactions</span>
                    </label>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="bg-[#f68d1f] hover:bg-[#ff9e3b] text-white font-black text-[11px] uppercase tracking-[0.5px] px-4 py-1.5 bevel-signal cursor-pointer"
                    >
                      SUBMIT VOTE
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

          {/* RIGHT ACTION RAIL (~1/3) */}
          <div className="w-full md:w-64 flex flex-col gap-3 shrink-0">
            
            {/* Command Slab Action Buttons (Carbon Navy #21242e) */}
            <div className="flex flex-col gap-1.5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="carbon-halftone hover:bg-[#2b2f3d] text-white font-black text-[11px] uppercase tracking-[0.5px] p-2.5 flex items-center justify-between border-2 border-[#3d4f97] cursor-pointer group shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#f68d1f] font-mono text-xs">▶</span>
                  <span>VIEW GITHUB PROFILE</span>
                </div>
                <span className="text-[#ecab37] text-[10px] group-hover:translate-x-0.5 transition-transform">➔</span>
              </a>

              <a
                href="https://velog.io"
                target="_blank"
                rel="noopener noreferrer"
                className="carbon-halftone hover:bg-[#2b2f3d] text-white font-black text-[11px] uppercase tracking-[0.5px] p-2.5 flex items-center justify-between border-2 border-[#3d4f97] cursor-pointer group shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#f68d1f] font-mono text-xs">▶</span>
                  <span>TECH BLOG (VELOG)</span>
                </div>
                <span className="text-[#ecab37] text-[10px] group-hover:translate-x-0.5 transition-transform">➔</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="carbon-halftone hover:bg-[#2b2f3d] text-white font-black text-[11px] uppercase tracking-[0.5px] p-2.5 flex items-center justify-between border-2 border-[#3d4f97] cursor-pointer group shadow-sm text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[#f68d1f] font-mono text-xs">▶</span>
                  <span className="truncate">COPY E-MAIL CHIP</span>
                </div>
                <span className="text-[#ecab37] text-[10px] group-hover:translate-x-0.5 transition-transform shrink-0">✉</span>
              </button>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="carbon-halftone hover:bg-[#2b2f3d] text-white font-black text-[11px] uppercase tracking-[0.5px] p-2.5 flex items-center justify-between border-2 border-[#3d4f97] cursor-pointer group shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#f68d1f] font-mono text-xs">▶</span>
                  <span>LINKEDIN NETWORK</span>
                </div>
                <span className="text-[#ecab37] text-[10px] group-hover:translate-x-0.5 transition-transform">➔</span>
              </a>
            </div>

            {/* "What Is" Info Box Card */}
            <div className="bg-white bevel-plate border border-[#3d4f97]">
              {/* Amber Header Tab */}
              <div className="bg-[#ecab37] border-b border-[#21242e] px-2.5 py-1 text-[11px] font-black uppercase text-[#21242e] tracking-[0.5px]">
                WHAT IS — LINK FINDER
              </div>
              <div className="p-3 text-[11px] leading-relaxed text-[#21242e]">
                <p className="font-bold mb-1.5">
                  About Developer Jeong Huiwon
                </p>
                <p className="mb-2 text-[#3d4f97]">
                  A software engineer focused on frontend engineering, intuitive user interaction, and robust component architecture.
                </p>
                <div className="border-t border-dotted border-[#60619c] pt-2 flex flex-wrap gap-1 font-bold text-[10px]">
                  <span className="bg-[#9fbee7] text-[#21242e] px-1.5 py-0.5">#Next.js</span>
                  <span className="bg-[#9fbee7] text-[#21242e] px-1.5 py-0.5">#React19</span>
                  <span className="bg-[#9fbee7] text-[#21242e] px-1.5 py-0.5">#TypeScript</span>
                  <span className="bg-[#9fbee7] text-[#21242e] px-1.5 py-0.5">#Tailwind</span>
                </div>
              </div>
            </div>

            {/* Side Promo Card: Game Boy Advance / Portable Dev Kit */}
            <div className="bg-[#acace7] bevel-plate p-3 border border-[#3d4f97]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#21242e]">
                  PORTABLE DEV SYSTEM
                </span>
                <span className="bg-[#e60012] text-white text-[9px] font-black px-1.5 rounded-xs">
                  32-BIT
                </span>
              </div>
              <div className="box-art-title text-xl leading-none mb-1 text-white">
                GAME BOY ADVANCE
              </div>
              <p className="text-[11px] font-bold text-[#21242e] mb-2 leading-tight">
                Compact, responsive web performance tailored for every viewport and mobile screen.
              </p>
              <div className="text-right">
                <span className="inline-block bg-[#f68d1f] text-white font-black text-[9px] uppercase px-2 py-0.5 bevel-signal">
                  HARDWARE CERTIFIED ★
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* FOOTER BAR: Carbon Slab with ESRB Privacy Badge & Copyright */}
        <footer className="carbon-halftone px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#3d4f97] text-[10px] text-[#9fbee7]">
          {/* Copyright & Disclaimer */}
          <div className="space-y-0.5">
            <p className="font-bold text-white">
              © 1997–2001 Nintendo of America Inc. / Jeong Huiwon Developer Profile.
            </p>
            <p className="text-[9px] text-[#9fbee7]">
              Game Boy, Game Boy Advance, and the Nintendo logo are trademarks of Nintendo.
            </p>
          </div>

          {/* ESRB Privacy-Certified Mark & Links */}
          <div className="flex items-center gap-3" id="esrb">
            <div className="bg-[#ecab37] border border-[#21242e] px-2 py-0.5 text-[#21242e] font-black text-[9px] tracking-tight uppercase bevel-chip">
              ESRB — PRIVACY CERTIFIED
            </div>

            <div className="flex items-center gap-2 text-[10px] font-bold text-white">
              <a href="#privacy" className="hover:underline">Privacy Policy</a>
              <span>·</span>
              <a href="#terms" className="hover:underline">Terms of Use</a>
            </div>
          </div>
        </footer>

      </div>

      {/* Retro Signal Orange Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#f68d1f] text-white font-black text-xs px-4 py-2 border-2 border-[#21242e] bevel-signal shadow-lg tracking-wide uppercase">
          {toastMessage}
        </div>
      )}
    </main>
  );
}
