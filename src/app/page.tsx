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
    showToast("💌 이메일 주소가 복사되었습니다!");
  };

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "정희원 | Developer Profile",
          text: "정희원의 프로필 링크를 확인해보세요!",
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showToast("🔗 프로필 링크가 복사되었습니다!");
    }
  };

  const links = [
    {
      title: "GitHub",
      desc: "프로젝트 코드 & 기여 내역",
      url: "https://github.com",
      bg: "bg-[#FFE600]", // Bold Electric Yellow
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
      badge: "GitHub ↗",
    },
    {
      title: "Tech Blog",
      desc: "트러블슈팅 & 기술 회고",
      url: "https://velog.io",
      bg: "bg-[#86EFAC]", // Neo Lime Green
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      badge: "Blog ↗",
    },
    {
      title: "LinkedIn",
      desc: "커리어 및 프로젝트 이력",
      url: "https://linkedin.com",
      bg: "bg-[#7DD3FC]", // Neo Sky Blue
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.77c-.95 0-1.72.77-1.72 1.72s.77 1.72 1.72 1.72 1.72-.77 1.72-1.72-.77-1.72-1.72z" />
        </svg>
      ),
      badge: "Career ↗",
    },
  ];

  const skills = ["Next.js", "TypeScript", "React", "Tailwind CSS", "Figma"];

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-2.5 py-6 sm:p-8 bg-[#FBF8EF] text-[#121212] select-none overflow-x-hidden">
      {/* 배경 장식 스티커들 (대형 화면) */}
      <div className="fixed top-8 left-8 hidden lg:block rotate-[-12deg] bg-[#FFE600] border-2 border-black font-black text-xs px-3 py-1 shadow-[3px_3px_0px_0px_#000]">
        ✦ HUIWON.DEV
      </div>
      <div className="fixed bottom-8 right-8 hidden lg:block rotate-[10deg] bg-[#C4B5FD] border-2 border-black font-black text-xs px-3 py-1 shadow-[3px_3px_0px_0px_#000]">
        ⚡ OPEN FOR WORK
      </div>

      {/* 메인 네오브루탈리즘 카드: 모바일 320px 최적화 */}
      <div className="relative w-full max-w-[420px] bg-white border-[3px] border-black rounded-3xl p-4 sm:p-7 shadow-[5px_5px_0px_0px_#000000] sm:shadow-[8px_8px_0px_0px_#000000] flex flex-col items-center">
        
        {/* 상단 바: 상태 라벨 + 공유 버튼 */}
        <div className="w-full flex items-center justify-between gap-2 mb-4 sm:mb-5">
          <div className="flex items-center gap-1.5 bg-[#86EFAC] border-2 border-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-[2px_2px_0px_0px_#000] shrink-0">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-black tracking-tight text-black uppercase whitespace-nowrap">
              Available For Work
            </span>
          </div>

          <button
            onClick={handleShare}
            aria-label="링크 공유"
            className="flex items-center gap-1 bg-[#F3F4F6] hover:bg-[#FFE600] border-2 border-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer font-black text-[11px] sm:text-xs shrink-0 whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>공유</span>
          </button>
        </div>

        {/* 아바타 영역 */}
        <div className="relative mb-3 sm:mb-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#FFE600] border-[3px] border-black shadow-[4px_4px_0px_0px_#000] sm:shadow-[5px_5px_0px_0px_#000] flex items-center justify-center">
            <span className="text-3xl sm:text-4xl font-black text-black">정</span>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#FDA4AF] border-2 border-black rounded-lg px-1.5 py-0.5 shadow-[2px_2px_0px_0px_#000] text-[10px] sm:text-xs font-black whitespace-nowrap">
            💻 DEV
          </div>
        </div>

        {/* 이름 & 직무 */}
        <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-1">
          정희원
        </h1>
        <div className="bg-[#E0E7FF] border-2 border-black rounded-md px-2.5 py-0.5 shadow-[2px_2px_0px_0px_#000] mb-2.5 sm:mb-3 text-[11px] sm:text-xs font-black tracking-wide uppercase whitespace-nowrap">
          Frontend Developer
        </div>

        {/* 간결한 한 줄 소개 */}
        <p className="text-xs text-center font-bold text-neutral-700 leading-relaxed break-keep mb-4 sm:mb-5 px-1">
          문제를 집요하게 파고들어 직관적인 웹 경험을 만듭니다. 복잡한 문제를 단순하고 명쾌한 코드로 풀어냅니다.
        </p>

        {/* 핵심 링크 목록 */}
        <div className="w-full flex flex-col gap-2.5 mb-4">
          {links.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-2xl ${item.bg} border-[2.5px] border-black shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] hover:shadow-[5px_5px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000] shrink-0">
                  {item.icon}
                </div>
                <div className="text-left min-w-0 flex-1">
                  <div className="text-xs font-black text-black truncate">
                    {item.title}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-neutral-800 truncate">
                    {item.desc}
                  </div>
                </div>
              </div>
              <span className="shrink-0 whitespace-nowrap text-[10px] sm:text-[11px] font-black bg-white border-2 border-black px-2 py-0.5 rounded-lg shadow-[2px_2px_0px_0px_#000]">
                {item.badge}
              </span>
            </a>
          ))}

          {/* 이메일 복사 액션 버튼 */}
          <button
            onClick={handleCopyEmail}
            className="w-full flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-2xl bg-[#C4B5FD] border-[2.5px] border-black shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] hover:shadow-[5px_5px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000] shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left min-w-0 flex-1">
                <div className="text-xs font-black text-black">Contact Me</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-neutral-800 truncate" title={email}>
                  {email}
                </div>
              </div>
            </div>
            <span className="shrink-0 whitespace-nowrap text-[10px] sm:text-[11px] font-black bg-white border-2 border-black px-2 py-0.5 rounded-lg shadow-[2px_2px_0px_0px_#000]">
              복사 📋
            </span>
          </button>
        </div>

        {/* 기술 스택 칩스 */}
        <div className="w-full pt-3 pb-1 border-t-2 border-black/10">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-[10px] sm:text-[11px] font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-white hover:bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-colors whitespace-nowrap"
              >
                #{skill}
              </span>
            ))}
          </div>
        </div>

        {/* 하단 푸터 */}
        <div className="mt-3.5 text-[9px] sm:text-[10px] font-black text-neutral-500 uppercase tracking-wider text-center">
          © 2026 JEONG HUIWON ★ ALL RIGHTS RESERVED
        </div>
      </div>

      {/* 네오브루탈리즘 토스트 팝업 */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#FFE600] border-[3px] border-black rounded-xl px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-black text-black shadow-[4px_4px_0px_0px_#000] animate-bounce whitespace-nowrap">
          {toastMessage}
        </div>
      )}
    </main>
  );
}
