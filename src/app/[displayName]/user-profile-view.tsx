"use client";

import { useState } from "react";
import Link from "next/link";
import { type LinkCartridge } from "@/data/links";
import { type UserProfileDoc } from "@/lib/links-service";
import { useAuth } from "@/hooks/use-auth";
import { UserHeader } from "@/components/user-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ExternalLink, Copy, Check, ArrowLeft, Settings } from "lucide-react";

interface UserProfileViewProps {
  profile: UserProfileDoc;
  initialLinks: LinkCartridge[];
}

export function UserProfileView({
  profile,
  initialLinks,
}: UserProfileViewProps) {
  const { user } = useAuth();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const isOwner = user?.uid === profile.uid;
  const currentDisplayName = profile.displayName || "User";
  const currentBio =
    profile.bio || "개인화된 Firestore 저장소에 링크 카트리지를 등록하고 실시간으로 관리합니다.";

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleCopyEmail = () => {
    if (!profile.email) return;
    navigator.clipboard.writeText(profile.email);
    showToast(`E-mail (${profile.email}) 복사 완료! ✉`);
  };

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${currentDisplayName} | My Link Console`,
          text: `${currentDisplayName}님의 Nintendo 2001 콘솔 링크 프로필을 확인해보세요!`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      showToast("공개 프로필 링크가 복사되었습니다! 🔗");
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-3 sm:p-6 text-[#21242e]">
      {/* 2001 Nintendo Console Hardware Body */}
      <Card className="w-full max-w-[480px] bg-[#7a8aba] shadow-[0_16px_36px_rgba(20,25,45,0.4)] relative flex flex-col rounded-none">
        {/* 1. TOP COMMAND BAR */}
        <div className="carbon-halftone px-3.5 py-2 flex items-center justify-between border-b-2 border-[#3d4f97]">
          {/* Logo & Home Link */}
          <div className="flex items-center gap-2">
            <Link href="/" title="메인 콘솔로 이동">
              <div className="bg-white border border-[#21242e] rounded-full px-2.5 py-0.5 flex items-center justify-center shadow-inner hover:scale-105 transition-transform cursor-pointer">
                <span className="text-[#e60012] font-black text-[13px] tracking-tighter">
                  Nintendo
                </span>
              </div>
            </Link>
            <Link href="/" className="hidden sm:inline-flex">
              <Button
                variant="subtle"
                size="badge"
                className="text-[9px] px-1.5 py-0.5 cursor-pointer flex items-center gap-0.5 font-black"
                title="메인 홈으로 이동"
              >
                <ArrowLeft className="w-2.5 h-2.5" />
                <span>HOME</span>
              </Button>
            </Link>
          </div>

          {/* Status Chip */}
          <div className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.5px] uppercase text-[#e48600]">
            <span className="w-2 h-2 rounded-full bg-[#f68d1f] animate-pulse" />
            <span className="truncate max-w-[150px]">
              {isOwner ? "MY CONSOLE PROFILE" : "USER PROFILE"}
            </span>
          </div>

          {/* Share Button */}
          <Button
            onClick={handleShare}
            aria-label="공유하기"
            variant="amber"
            size="badge"
            className="flex items-center gap-1 cursor-pointer font-black"
          >
            <span>{copiedLink ? "COPIED" : "SHARE"}</span>
            {copiedLink ? <Check className="w-3 h-3" /> : <span>➔</span>}
          </Button>
        </div>

        {/* 2. SUB-NAV STRIP : 상단 유저 헤더 (로그인 상태, 프로필 드롭다운, 내 페이지 이동 연동) */}
        <UserHeader
          user={user}
          displayName={user?.displayName || undefined}
          firestorePath={profile.firestorePath || `users/${profile.uid}/link`}
        />

        {/* 3. HERO / PROFILE MODULE */}
        <div className="p-3.5 bg-[#7a8aba]">
          <Card className="bg-gradient-to-r from-[#acace7] via-[#9bb0db] to-[#8ba1d4] p-4 text-center flex flex-col items-center relative overflow-hidden rounded-none border border-[#3d4f97]">
            {/* 회로 패턴 배경 */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(#3d4f97 1px, transparent 1px), linear-gradient(90deg, #3d4f97 1px, transparent 1px)`,
                backgroundSize: "16px 16px",
              }}
            />

            {/* 본인 계정일 경우 우측 상단 메인 콘솔 편집 바로가기 */}
            {isOwner && (
              <div className="absolute top-2.5 right-2.5 z-20">
                <Link href="/">
                  <Button
                    variant="amber"
                    size="xs"
                    className="text-[9px] px-2 py-0.5 cursor-pointer flex items-center gap-1 font-black shadow-xs tracking-wider"
                    title="메인 홈 콘솔에서 수정하기"
                  >
                    <Settings className="w-2.5 h-2.5" />
                    <span>편집 ⚙</span>
                  </Button>
                </Link>
              </div>
            )}

            {/* Profile Avatar */}
            <div className="relative mb-2.5 z-10">
              {profile.photoURL ? (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.photoURL}
                    alt={currentDisplayName}
                    className="w-16 h-16 border-2 border-[#21242e] shadow-md object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <Badge
                    variant="signal"
                    size="micro"
                    className="absolute -bottom-1 -right-2 text-white"
                  >
                    {isOwner ? "OWNER" : "PUBLIC"}
                  </Badge>
                </div>
              ) : (
                <div className="relative">
                  <div className="w-16 h-16 bg-[#e60012] border-2 border-[#21242e] shadow-md flex items-center justify-center">
                    <span className="text-3xl font-black text-white select-none">
                      {currentDisplayName[0]?.toUpperCase() ?? "U"}
                    </span>
                  </div>
                  <Badge
                    variant="signal"
                    size="micro"
                    className="absolute -bottom-1 -right-2 text-white"
                  >
                    {isOwner ? "OWNER" : "PUBLIC"}
                  </Badge>
                </div>
              )}
            </div>

            {/* 이름 / 식별자 */}
            <div className="flex flex-col items-center mb-1.5 z-10">
              <div className="flex items-baseline gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-[#21242e] tracking-tight">
                  {currentDisplayName}
                </h1>
                <span className="text-xs sm:text-sm font-black text-[#3d4f97] tracking-wider uppercase">
                  @{currentDisplayName}
                </span>
              </div>
              {profile.email && (
                <span className="text-[10px] font-mono font-bold text-[#3d4f97] mt-0.5">
                  {profile.email}
                </span>
              )}
            </div>

            {/* Role Badge */}
            <Badge
              variant="default"
              size="default"
              className="bg-[#21242e] text-[#ecab37] tracking-wider mb-2 z-10 rounded-none"
            >
              {isOwner ? "★ MY LINK CONSOLE (OWNER)" : "MY LINK CONSOLE CARTRIDGE"}
            </Badge>

            {/* 한 줄 소개 (Bio) */}
            <p className="text-[11px] sm:text-[12px] font-bold text-[#21242e] leading-relaxed max-w-sm break-keep z-10">
              {currentBio}
            </p>

            {/* Firestore 경로 박스 */}
            <div className="mt-2.5 w-full bg-[#dedede]/90 bevel-plate p-2 text-left z-10 flex flex-col gap-1">
              <div className="flex items-center justify-between text-[9px] font-black uppercase text-[#21242e]">
                <span>★ FIRESTORE DATABASE PATH</span>
                <span className="text-[#3d4f97] font-mono font-bold bg-white/70 px-1 py-0.2 rounded-xs">
                  users/{profile.uid}/link
                </span>
              </div>
              <div className="flex items-center justify-between text-[9px] font-bold text-[#555e75]">
                <span>
                  DISPLAY NAME:{" "}
                  <strong className="text-[#21242e]">{currentDisplayName}</strong>
                </span>
                <span className="font-mono text-[8px] text-[#3d4f97]">
                  UID: {profile.uid.slice(0, 8)}...
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* 4. CARTRIDGE LIST HEADER */}
        <div className="px-3.5 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#21242e] inline-block" />
            <span className="text-[10px] font-black uppercase text-[#21242e] tracking-wider">
              CARTRIDGE SLOTS ({initialLinks.length})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {isOwner && (
              <Link href="/">
                <Button
                  variant="subtle"
                  size="xs"
                  className="text-[9px] px-2 py-0.5 cursor-pointer font-bold"
                  title="새 카트리지 추가 또는 관리하러 가기"
                >
                  + 카트리지 관리 ➔
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* 5. CARTRIDGE ITEMS */}
        <div className="px-3.5 pb-3.5 flex flex-col gap-2">
          {initialLinks.length === 0 ? (
            <div className="bg-[#8ba1d4] bevel-plate p-5 text-center flex flex-col items-center justify-center gap-1.5">
              <div className="text-[11px] font-black text-[#21242e] uppercase tracking-wider">
                [ NO CARTRIDGES INSERTED ]
              </div>
              <p className="text-[10px] font-bold text-[#3d4f97] leading-relaxed">
                현재 등록된 링크 카트리지가 없습니다.
              </p>
            </div>
          ) : (
            initialLinks.map((link, idx) => (
              <Card
                key={link.id || `${link.code || idx}`}
                className="group bg-[#dedede] hover:bg-white p-2.5 flex items-center justify-between gap-2.5 transition-colors text-left"
              >
                {/* 본문 링크 영역 */}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer select-none"
                >
                  <Badge
                    size="xs"
                    variant="custom"
                    className={cn(
                      "shrink-0",
                      link.tagColor || "bg-[#21242e] text-[#ecab37]"
                    )}
                  >
                    {link.tag || "LINK"}
                  </Badge>

                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-black text-[#21242e] group-hover:text-[#3d4f97] truncate flex items-center gap-1">
                      <span>{link.label}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-[#555e75] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[10px] font-bold text-[#555e75] truncate">
                      {link.desc || link.url}
                    </div>
                  </div>
                </a>

                {/* 우측 새 창 열기 버튼 */}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 rounded-full bg-[#f68d1f] hover:bg-[#ff9e3b] text-white flex items-center justify-center font-black text-[11px] bevel-signal shrink-0 shadow-xs ml-0.5 cursor-pointer"
                  title="새 창으로 이동"
                >
                  ➔
                </a>
              </Card>
            ))
          )}

          {/* 이메일 연락처 카드 */}
          {profile.email && (
            <Card
              className="group bg-[#dedede] hover:bg-white p-2.5 flex items-center justify-between gap-2.5 cursor-pointer text-left"
              onClick={handleCopyEmail}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCopyEmail();
                }
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Badge size="xs" variant="nintendo" className="shrink-0">
                  MAIL
                </Badge>
                <div className="min-w-0">
                  <div className="text-[12px] font-black text-[#21242e] group-hover:text-[#3d4f97]">
                    Contact / E-mail
                  </div>
                  <div className="text-[10px] font-bold text-[#555e75] truncate">
                    {profile.email}
                  </div>
                </div>
              </div>
              <Button
                type="button"
                variant="amber"
                size="badge"
                className="shrink-0 cursor-pointer flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyEmail();
                }}
              >
                <Copy className="w-2.5 h-2.5" />
                <span>COPY ✉</span>
              </Button>
            </Card>
          )}
        </div>

        {/* 6. TECH SPEC CHIPS */}
        <div className="mx-3.5 mb-3.5 bg-[#8ba1d4] bevel-plate p-2 text-center">
          <div className="text-[9px] font-black text-[#21242e] uppercase tracking-wider mb-1.5 flex items-center justify-center gap-1">
            <span className="text-[#3d4f97]">≡</span>
            <span>PUBLIC PROFILE CARTRIDGE</span>
            <span className="text-[#3d4f97]">≡</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1">
            {["Next.js 16 Dynamic Route", `/[${currentDisplayName}]`, "Firestore Cloud Sync", "Optimistic Ready"].map(
              (item, idx) => (
                <Badge
                  key={idx}
                  variant="spec"
                  size="default"
                  className="rounded-none font-black text-[10px] px-2 py-0.5"
                >
                  #{item}
                </Badge>
              )
            )}
          </div>
        </div>

        {/* 7. FOOTER */}
        <footer className="carbon-halftone px-3.5 py-2.5 flex items-center justify-between gap-2 border-t-2 border-[#3d4f97] text-[9px] text-[#9fbee7]">
          <div className="font-bold text-white">
            © 1997–2001 Nintendo / {currentDisplayName}
          </div>
          <Link href="/">
            <Badge
              variant="amber"
              size="micro"
              className="border border-[#21242e] text-[#21242e] font-black text-[9px] uppercase shrink-0 cursor-pointer hover:bg-white"
            >
              CONSOLE HOME ➔
            </Badge>
          </Link>
        </footer>
      </Card>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#f68d1f] text-white font-black text-xs px-3.5 py-1.5 border-2 border-[#21242e] bevel-signal shadow-lg tracking-wide uppercase whitespace-nowrap">
          {toastMessage}
        </div>
      )}
    </main>
  );
}
