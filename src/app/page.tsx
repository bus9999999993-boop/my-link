"use client";

import { useState } from "react";

// 소셜 & 주요 링크 데이터
const SOCIAL_LINKS = [
  {
    id: "github",
    title: "GitHub",
    subtitle: "github.com/heewon-jung",
    url: "https://github.com",
    badge: "15+ Repos",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    color: "from-zinc-800 to-zinc-900 text-white dark:from-zinc-700 dark:to-zinc-800",
  },
  {
    id: "blog",
    title: "기술 블로그 (Tech Blog)",
    subtitle: "개발 여정과 트러블슈팅 아카이브",
    url: "https://velog.io",
    badge: "최신 글 8편",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-600 text-white",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    subtitle: "경력 소개 및 프로페셔널 네트워크",
    url: "https://linkedin.com",
    badge: "Connect",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.77c-.95 0-1.72.77-1.72 1.72s.77 1.72 1.72 1.72 1.72-.77 1.72-1.72-.77-1.72-1.72-1.72z" />
      </svg>
    ),
    color: "from-blue-600 to-indigo-600 text-white",
  },
  {
    id: "portfolio",
    title: "포트폴리오 노션",
    subtitle: "프로젝트 상세 설명서 및 성과 지표",
    url: "https://notion.so",
    badge: "상세보기",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "from-amber-500 to-orange-500 text-white",
  },
];

// 프로젝트 데이터
const PROJECTS = [
  {
    title: "MyLink",
    description: "나만의 아이덴티티와 포트폴리오를 한눈에 보여주는 반응형 프로필 링크 서비스",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "Active",
    linkText: "둘러보기",
    url: "#",
    icon: "🔗",
  },
  {
    title: "DevNote",
    description: "개발자의 문제 해결 과정과 코드 스니펫을 간편하게 기록하는 마크다운 위키",
    tags: ["React", "Supabase", "Zustand"],
    status: "Demo",
    linkText: "GitHub 이동",
    url: "https://github.com",
    icon: "📝",
  },
  {
    title: "FlowFocus",
    description: "뽀모도로 타이머와 일일 업무 체크리스트를 결합한 경량 생산성 도구",
    tags: ["Next.js", "Web Audio API", "PWA"],
    status: "Side Project",
    linkText: "시연 영상",
    url: "https://github.com",
    icon: "⚡",
  },
];

// 기술 스택
const SKILLS = [
  { category: "Frontend", items: ["TypeScript", "Next.js", "React", "Tailwind CSS", "HTML5/CSS3"] },
  { category: "State & Tools", items: ["Zustand", "Git & GitHub", "Vercel", "REST APIs", "ESLint"] },
  { category: "Design & UX", items: ["Figma", "Responsive Web", "Web Accessibility", "Micro-interactions"] },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"links" | "projects" | "skills">("links");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const email = "heewon.jung.dev@gmail.com";

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    showToast("이메일 주소가 클립보드에 복사되었습니다! 💌");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "정희원 | Developer Profile",
          text: "정희원의 개발자 프로필 링크를 확인해보세요!",
          url: window.location.href,
        });
      } catch {
        // Share cancelled or failed silently
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("프로필 링크가 복사되었습니다! 🔗");
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-slate-50 dark:bg-[#090d16] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* 화려한 오로라 블러 배경 장식 */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-400/20 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none transform -translate-y-1/2" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-violet-400/20 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none transform translate-y-1/2" />
      <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-teal-400/15 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 미세한 그리드 배경 오버레이 */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* 메인 프로필 카드 */}
      <div className="relative w-full max-w-md backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] dark:shadow-[0_20px_50px_rgba(0,_0,_0,_0.5)] flex flex-col items-center transition-all duration-300">
        
        {/* 상단 액션 바 (공유 버튼 등) */}
        <div className="w-full flex justify-between items-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            커피챗 · 협업 가능
          </span>

          <button
            onClick={handleShare}
            aria-label="프로필 공유하기"
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
            title="프로필 링크 공유"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>

        {/* 프로필 아바타 영역 */}
        <div className="relative mb-5 group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-70 blur-sm group-hover:opacity-100 transition duration-300"></div>
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-[3px] shadow-lg">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
              <span className="text-3xl font-black bg-gradient-to-tr from-indigo-600 to-pink-500 bg-clip-text text-transparent select-none">
                정
              </span>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 bg-white dark:bg-slate-900 rounded-full p-1 shadow-md border border-slate-200 dark:border-slate-800">
            <span className="text-base select-none" role="img" aria-label="code">💻</span>
          </div>
        </div>

        {/* 이름 및 역할 */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              정희원
            </h1>
            <svg className="w-5 h-5 text-blue-500 fill-current" viewBox="0 0 24 24" aria-label="인증된 개발자">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Software Developer · Problem Solver
          </p>
        </div>

        {/* 자기소개 */}
        <p className="text-sm text-center leading-relaxed text-slate-600 dark:text-slate-300 break-keep mb-6 px-1">
          더 나은 사용자 경험을 고민하고 지속적으로 성장하는 개발자입니다. 코드로 일상의 문제를 해결하고 가치 있는 서비스를 만드는 일에 몰입합니다.
        </p>

        {/* 핵심 통계 / 하이라이트 */}
        <div className="w-full grid grid-cols-3 gap-2 py-3 px-2 mb-6 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 text-center">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">관심 분야</span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">Frontend</span>
          </div>
          <div className="flex flex-col border-x border-slate-200 dark:border-slate-700/60">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">주요 기술</span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">Next.js / TS</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">지향점</span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">Clean UX</span>
          </div>
        </div>

        {/* 빠른 연락 바 */}
        <div className="w-full flex gap-2 mb-6">
          <button
            onClick={handleCopyEmail}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-xs bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>이메일 복사하기</span>
          </button>
          
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub 바로가기"
            className="flex items-center justify-center p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all active:scale-95 border border-slate-200/80 dark:border-slate-700"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>

        {/* 탭 네비게이션 */}
        <div className="w-full flex p-1 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/60 dark:border-slate-700/60 mb-5">
          <button
            onClick={() => setActiveTab("links")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              activeTab === "links"
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            링크 목록
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              activeTab === "projects"
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            프로젝트
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              activeTab === "skills"
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            기술 스택
          </button>
        </div>

        {/* 탭 콘텐츠 영역 */}
        <div className="w-full min-h-[220px]">
          {/* TAB 1: 링크 목록 */}
          {activeTab === "links" && (
            <div className="flex flex-col gap-2.5 w-full animate-in fade-in duration-200">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 hover:border-indigo-400 dark:hover:border-indigo-500/60 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${item.color} shadow-sm group-hover:scale-105 transition-transform`}>
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[170px] sm:max-w-[200px]">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300">
                      {item.badge}
                    </span>
                    <svg
                      className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* TAB 2: 프로젝트 */}
          {activeTab === "projects" && (
            <div className="flex flex-col gap-3 w-full animate-in fade-in duration-200">
              {PROJECTS.map((project, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 hover:border-indigo-400 dark:hover:border-indigo-500/60 shadow-xs hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{project.icon}</span>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        {project.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                      {project.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3 text-left">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline ml-2 whitespace-nowrap"
                    >
                      {project.linkText}
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: 기술 스택 */}
          {activeTab === "skills" && (
            <div className="flex flex-col gap-3.5 w-full animate-in fade-in duration-200">
              {SKILLS.map((skillGroup, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 text-left"
                >
                  <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.items.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 푸터 영역 */}
        <div className="mt-8 pt-5 border-t border-slate-200/70 dark:border-slate-800/70 w-full text-center flex flex-col items-center gap-1.5">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            © 2026 Jeong Huiwon. All rights reserved.
          </p>
          <p className="text-[10px] text-slate-400/80 dark:text-slate-500/80">
            Crafted with Next.js & Tailwind CSS
          </p>
        </div>
      </div>

      {/* 복사 완료 토스트 알림 */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 text-xs font-semibold shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}
    </main>
  );
}
