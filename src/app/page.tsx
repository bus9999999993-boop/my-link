"use client";

import { useState } from "react";

export default function Home() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const email = "heewon.jung.dev@gmail.com";

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    showToast("E-mail address copied to clipboard! ✉");
  };

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "정희원 | Developer Profile",
          text: "정희원의 Nintendo 2001 콘솔 프로필을 확인해보세요!",
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback
      }
    }
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showToast("Profile link copied! 🔗");
    }
  };

  const linkCartridges = [
    {
      label: "GitHub",
      code: "REPO-01",
      desc: "오픈소스 프로젝트 & 소스코드 저장소",
      url: "https://github.com",
      tag: "CODE",
      tagColor: "bg-[#21242e] text-[#ecab37]",
    },
    {
      label: "Tech Blog",
      code: "POST-02",
      desc: "개발 트러블슈팅 & 기술 회고 아카이브",
      url: "https://velog.io",
      tag: "BLOG",
      tagColor: "bg-[#206479] text-white",
    },
    {
      label: "LinkedIn",
      code: "PROF-03",
      desc: "경력 소개 및 프로페셔널 네트워크",
      url: "https://linkedin.com",
      tag: "CAREER",
      tagColor: "bg-[#3d4f97] text-white",
    },
  ];

  const specs = ["Next.js", "TypeScript", "React 19", "Tailwind CSS", "Figma"];

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-3 sm:p-6 text-[#21242e]">
      {/* 2001 Console Hardware Main Body (Compact Faceplate) */}
      <div className="w-full max-w-[480px] bg-[#7a8aba] bevel-plate shadow-[0_16px_36px_rgba(20,25,45,0.4)] relative flex flex-col">
        
        {/* 1. TOP COMMAND BAR: Carbon Navy with Halftone Dot Matrix */}
        <div className="carbon-halftone px-3.5 py-2 flex items-center justify-between border-b-2 border-[#3d4f97]">
          {/* Nintendo Oval Racetrack Pill */}
          <div className="bg-white border border-[#21242e] rounded-full px-2.5 py-0.5 flex items-center justify-center shadow-inner">
            <span className="text-[#e60012] font-black text-[13px] tracking-tighter">
              Nintendo
            </span>
          </div>

          {/* Center Status Pill */}
          <div className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.5px] uppercase text-[#e48600]">
            <span className="w-2 h-2 rounded-full bg-[#f68d1f] animate-pulse" />
            <span>DEV CONSOLE 2001</span>
          </div>

          {/* Quick Share Action Button */}
          <button
            onClick={handleShare}
            aria-label="공유하기"
            className="bg-[#ecab37] hover:bg-[#e48600] active:bg-[#e48600] text-[#21242e] font-black text-[10px] uppercase px-2 py-0.5 bevel-chip cursor-pointer tracking-[0.5px] flex items-center gap-1"
          >
            <span>SHARE</span>
            <span>➔</span>
          </button>
        </div>

        {/* 2. SUB-NAV STRIP: Pale Sky */}
        <div className="bg-[#9fbee7] px-3.5 py-1 flex items-center justify-between text-[10px] font-black text-[#21242e] border-b border-[#3d4f97] uppercase tracking-[0.5px]">
          <span>SYSTEM: HUIWON.JEONG</span>
          <span className="text-[#3d4f97] font-mono">STATUS: ONLINE (60 FPS)</span>
        </div>

        {/* 3. HERO / PROFILE MODULE: Lavender Brushed Metallic Plate */}
        <div className="p-3.5 bg-[#7a8aba]">
          <div className="bg-gradient-to-r from-[#acace7] via-[#9bb0db] to-[#8ba1d4] bevel-plate p-4 text-center flex flex-col items-center relative overflow-hidden">
            {/* Subtle Circuit Overlay */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(#3d4f97 1px, transparent 1px), linear-gradient(90deg, #3d4f97 1px, transparent 1px)`,
                backgroundSize: "16px 16px",
              }}
            />

            {/* Profile Avatar / Hardware Stamp */}
            <div className="relative mb-2.5 z-10">
              <div className="w-16 h-16 bg-[#e60012] border-2 border-[#21242e] shadow-md flex items-center justify-center">
                <span className="text-3xl font-black text-white select-none">
                  정
                </span>
              </div>
              <div className="absolute -bottom-1 -right-2 bg-[#f68d1f] text-white font-black text-[9px] px-1.5 py-0.2 bevel-signal uppercase">
                32-BIT
              </div>
            </div>

            {/* Box-Art Display Wordmark */}
            <h1 className="box-art-title text-3xl sm:text-4xl leading-none tracking-tight mb-1.5 z-10">
              정희원
            </h1>

            {/* Role Badge */}
            <div className="inline-block bg-[#21242e] text-[#ecab37] font-black text-[10px] tracking-wider uppercase px-2 py-0.5 mb-2.5 z-10">
              FRONTEND DEVELOPER & PROBLEM SOLVER
            </div>

            {/* 1-Sentence Concise Bio */}
            <p className="text-[12px] font-bold text-[#21242e] leading-relaxed max-w-sm break-keep z-10">
              문제를 집요하게 파고들어 직관적이고 견고한 웹 경험을 설계합니다. 사용자 가치를 만드는 지속 가능한 코드에 몰입합니다.
            </p>
          </div>
        </div>

        {/* 4. ESSENTIAL ACTION CARTRIDGES (Link List) */}
        <div className="px-3.5 pb-3.5 flex flex-col gap-2">
          {linkCartridges.map((cart, idx) => (
            <a
              key={idx}
              href={cart.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#dedede] hover:bg-white bevel-plate p-2.5 flex items-center justify-between gap-2.5 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Cartridge Tag */}
                <span className={`text-[9px] font-black px-1.5 py-0.5 shrink-0 ${cart.tagColor}`}>
                  {cart.tag}
                </span>

                {/* Title & Description */}
                <div className="text-left min-w-0">
                  <div className="text-[12px] font-black text-[#21242e] group-hover:text-[#3d4f97] truncate">
                    {cart.label}
                  </div>
                  <div className="text-[10px] font-bold text-[#555e75] truncate">
                    {cart.desc}
                  </div>
                </div>
              </div>

              {/* Signal Orange Forward Chevron Disc */}
              <span className="w-5 h-5 rounded-full bg-[#f68d1f] group-hover:bg-[#ff9e3b] text-white flex items-center justify-center font-black text-[10px] bevel-signal shrink-0 shadow-xs">
                ➔
              </span>
            </a>
          ))}

          {/* Quick Email Contact Chip (Interactive) */}
          <button
            onClick={handleCopyEmail}
            className="group bg-[#dedede] hover:bg-white bevel-plate p-2.5 flex items-center justify-between gap-2.5 cursor-pointer transition-colors text-left"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-[9px] font-black px-1.5 py-0.5 shrink-0 bg-[#e60012] text-white">
                MAIL
              </span>
              <div className="min-w-0">
                <div className="text-[12px] font-black text-[#21242e] group-hover:text-[#3d4f97]">
                  Contact / E-mail
                </div>
                <div className="text-[10px] font-bold text-[#555e75] truncate">
                  {email}
                </div>
              </div>
            </div>
            <span className="bg-[#ecab37] hover:bg-[#e48600] text-[#21242e] font-black text-[10px] uppercase px-2 py-0.5 bevel-chip shrink-0">
              COPY ✉
            </span>
          </button>
        </div>

        {/* 5. HARDWARE TECH SPEC CHIPS */}
        <div className="mx-3.5 mb-3.5 bg-[#8ba1d4] bevel-plate p-2 text-center">
          <div className="text-[9px] font-black text-[#21242e] uppercase tracking-wider mb-1.5 flex items-center justify-center gap-1">
            <span className="text-[#3d4f97]">≡</span>
            <span>CORE SYSTEM ARCHITECTURE</span>
            <span className="text-[#3d4f97]">≡</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1">
            {specs.map((item, idx) => (
              <span
                key={idx}
                className="bg-white border border-[#3d4f97] text-[#21242e] font-black text-[10px] px-2 py-0.5 shadow-2xs"
              >
                #{item}
              </span>
            ))}
          </div>
        </div>

        {/* 6. COMPACT CARBON FOOTER BAR */}
        <footer className="carbon-halftone px-3.5 py-2.5 flex items-center justify-between gap-2 border-t-2 border-[#3d4f97] text-[9px] text-[#9fbee7]">
          <div className="font-bold text-white">
            © 1997–2001 Nintendo / Jeong Huiwon
          </div>

          {/* ESRB Privacy-Certified Mark */}
          <div className="bg-[#ecab37] border border-[#21242e] px-1.5 py-0.2 text-[#21242e] font-black text-[9px] uppercase bevel-chip shrink-0">
            ESRB — PRIVACY CERTIFIED
          </div>
        </footer>

      </div>

      {/* Signal Orange Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#f68d1f] text-white font-black text-xs px-3.5 py-1.5 border-2 border-[#21242e] bevel-signal shadow-lg tracking-wide uppercase whitespace-nowrap">
          {toastMessage}
        </div>
      )}
    </main>
  );
}
