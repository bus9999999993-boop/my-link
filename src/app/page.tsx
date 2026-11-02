"use client";

import { useState } from "react";
import { techSpecs } from "@/data/links";
import { LinkList } from "@/components/link-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const handleCopyEmail = () => {
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

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-3 sm:p-6 text-[#21242e]">
      {/* 2001 Console Hardware Main Body (Compact Faceplate) */}
      <Card className="w-full max-w-[480px] bg-[#7a8aba] shadow-[0_16px_36px_rgba(20,25,45,0.4)] relative flex flex-col rounded-none">
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
          <Button
            onClick={handleShare}
            aria-label="공유하기"
            variant="amber"
            size="badge"
            className="flex items-center gap-1"
          >
            <span>SHARE</span>
            <span>➔</span>
          </Button>
        </div>

        {/* 2. SUB-NAV STRIP: Pale Sky */}
        <div className="bg-[#9fbee7] px-3.5 py-1 flex items-center justify-between text-[10px] font-black text-[#21242e] border-b border-[#3d4f97] uppercase tracking-[0.5px]">
          <span>SYSTEM: HUIWON.JEONG</span>
          <span className="text-[#3d4f97] font-mono">STATUS: ONLINE (60 FPS)</span>
        </div>

        {/* 3. HERO / PROFILE MODULE: Lavender Brushed Metallic Plate */}
        <div className="p-3.5 bg-[#7a8aba]">
          <Card className="bg-gradient-to-r from-[#acace7] via-[#9bb0db] to-[#8ba1d4] p-4 text-center flex flex-col items-center relative overflow-hidden rounded-none">
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
              <Badge
                variant="signal"
                size="micro"
                className="absolute -bottom-1 -right-2 text-white"
              >
                32-BIT
              </Badge>
            </div>

            {/* 깔끔하고 정돈된 이름 타이포그래피 */}
            <div className="flex flex-col items-center mb-2 z-10">
              <div className="flex items-baseline gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-[#21242e] tracking-tight">
                  정희원
                </h1>
                <span className="text-xs sm:text-sm font-black text-[#3d4f97] tracking-wider uppercase">
                  Jeong Huiwon
                </span>
              </div>
            </div>

            {/* Role Badge */}
            <Badge
              variant="default"
              size="default"
              className="bg-[#21242e] text-[#ecab37] tracking-wider mb-2.5 z-10 rounded-none"
            >
              FRONTEND DEVELOPER & PROBLEM SOLVER
            </Badge>

            {/* 1-Sentence Concise Bio */}
            <p className="text-[12px] font-bold text-[#21242e] leading-relaxed max-w-sm break-keep z-10">
              문제를 집요하게 파고들어 직관적이고 견고한 웹 경험을 설계합니다. 사용자 가치를 만드는 지속 가능한 코드에 몰입합니다.
            </p>
          </Card>
        </div>

        {/* 4. ESSENTIAL ACTION CARTRIDGES (Link List Component) */}
        <div className="px-3.5 pb-3.5">
          <LinkList onCopyEmail={handleCopyEmail} />
        </div>

        {/* 5. HARDWARE TECH SPEC CHIPS */}
        <div className="mx-3.5 mb-3.5 bg-[#8ba1d4] bevel-plate p-2 text-center">
          <div className="text-[9px] font-black text-[#21242e] uppercase tracking-wider mb-1.5 flex items-center justify-center gap-1">
            <span className="text-[#3d4f97]">≡</span>
            <span>CORE SYSTEM ARCHITECTURE</span>
            <span className="text-[#3d4f97]">≡</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1">
            {techSpecs.map((item, idx) => (
              <Badge
                key={idx}
                variant="spec"
                size="default"
                className="rounded-none font-black text-[10px] px-2 py-0.5"
              >
                #{item}
              </Badge>
            ))}
          </div>
        </div>

        {/* 6. COMPACT CARBON FOOTER BAR */}
        <footer className="carbon-halftone px-3.5 py-2.5 flex items-center justify-between gap-2 border-t-2 border-[#3d4f97] text-[9px] text-[#9fbee7]">
          <div className="font-bold text-white">
            © 1997–2001 Nintendo / Jeong Huiwon
          </div>

          {/* ESRB Privacy-Certified Mark */}
          <Badge
            variant="amber"
            size="micro"
            className="border border-[#21242e] text-[#21242e] font-black text-[9px] uppercase shrink-0"
          >
            ESRB — PRIVACY CERTIFIED
          </Badge>
        </footer>
      </Card>

      {/* Signal Orange Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#f68d1f] text-white font-black text-xs px-3.5 py-1.5 border-2 border-[#21242e] bevel-signal shadow-lg tracking-wide uppercase whitespace-nowrap">
          {toastMessage}
        </div>
      )}
    </main>
  );
}
