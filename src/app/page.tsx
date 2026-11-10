"use client";

import { useState, useEffect, useCallback } from "react";
import { contactEmail, techSpecs, type LinkCartridge } from "@/data/links";
import {
  addLinkToFirestore,
  getFirestoreLinks,
  updateLinkInFirestore,
  deleteLinkFromFirestore,
  clearFirestoreLinks,
} from "@/lib/links-service";
import { useAuth } from "@/hooks/use-auth";
import { LinkList } from "@/components/link-list";
import { AddLinkDialog } from "@/components/add-link-dialog";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import { LoginScreen } from "@/components/login-screen";
import { UserHeader } from "@/components/user-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const { user, profile, displayName, authLoading } = useAuth();

  const [links, setLinks] = useState<LinkCartridge[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 삭제 확인 모달 상태
  const [deleteTarget, setDeleteTarget] = useState<LinkCartridge | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Firestore에서 사용자 링크 목록 조회 (users/{user.uid}/link, 최신순)
  const fetchLinks = useCallback(async () => {
    if (!user) {
      setLinks([]);
      return;
    }
    setIsLoading(true);
    try {
      const firestoreLinks = await getFirestoreLinks(user.uid);
      setLinks(firestoreLinks);
    } catch (error) {
      console.error("Firestore links fetch failed:", error);
      showToast("링크 목록을 불러오는 데 실패했습니다. ❌");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 로그인 상태가 변경될 때 링크 목록 갱신
  useEffect(() => {
    if (user) {
      fetchLinks();
    } else {
      setLinks([]);
    }
  }, [user, fetchLinks]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // 링크 추가 (users/{user.uid}/link)
  const handleAddLink = async (newLink: LinkCartridge) => {
    if (!user) return;
    try {
      await addLinkToFirestore(user.uid, newLink);
      showToast(`카트리지 [${newLink.label}] 저장 완료! 💾`);
      await fetchLinks();
    } catch (error) {
      console.error("Firestore link save error:", error);
      showToast("카트리지 저장에 실패했습니다. 다시 시도해주세요. ❌");
      throw error;
    }
  };

  // 링크 수정 (users/{user.uid}/link)
  const handleUpdateLink = async (
    id: string,
    updated: Partial<LinkCartridge>
  ) => {
    if (!user) return;
    try {
      await updateLinkInFirestore(user.uid, id, updated);
      showToast(`카트리지 수정 완료! ✏️`);
      await fetchLinks();
    } catch (error) {
      console.error("Firestore link update error:", error);
      showToast("카트리지 수정에 실패했습니다. 다시 시도해주세요. ❌");
      throw error;
    }
  };

  // 삭제 버튼 → 모달 오픈
  const handleDeleteRequest = (item: LinkCartridge) => {
    setDeleteTarget(item);
    setIsDeleteModalOpen(true);
  };

  // 삭제 확인 → Firestore 삭제
  const handleDeleteConfirm = async () => {
    if (!user || !deleteTarget?.id) return;
    try {
      await deleteLinkFromFirestore(user.uid, deleteTarget.id);
      showToast(`카트리지 [${deleteTarget.label}] 삭제 완료! 🗑`);
      await fetchLinks();
    } catch (error) {
      console.error("Firestore link delete error:", error);
      showToast("삭제 중 오류가 발생했습니다. 다시 시도해주세요. ❌");
      throw error;
    } finally {
      setDeleteTarget(null);
    }
  };

  // 전체 초기화
  const handleClearAllLinks = async () => {
    if (!user) return;
    if (confirm("등록된 모든 링크 카트리지를 삭제할까요? (Firestore에서 삭제됩니다)")) {
      try {
        await clearFirestoreLinks(user.uid);
        await fetchLinks();
        showToast("모든 카트리지가 삭제되었습니다. 🗑");
      } catch (error) {
        console.error("Firestore links clear error:", error);
        showToast("삭제 중 오류가 발생했습니다. ❌");
      }
    }
  };

  const handleCopyEmail = () => {
    const emailToCopy = user?.email || contactEmail;
    navigator.clipboard.writeText(emailToCopy);
    showToast(`E-mail (${emailToCopy}) 복사 완료! ✉`);
  };

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${displayName} | My Link Console`,
          text: `${displayName}님의 Nintendo 2001 콘솔 프로필을 확인해보세요!`,
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
      {/* 2001 Console Hardware Main Body */}
      <Card className="w-full max-w-[480px] bg-[#7a8aba] shadow-[0_16px_36px_rgba(20,25,45,0.4)] relative flex flex-col rounded-none">

        {/* 1. TOP COMMAND BAR */}
        <div className="carbon-halftone px-3.5 py-2 flex items-center justify-between border-b-2 border-[#3d4f97]">
          {/* Nintendo Pill */}
          <div className="bg-white border border-[#21242e] rounded-full px-2.5 py-0.5 flex items-center justify-center shadow-inner">
            <span className="text-[#e60012] font-black text-[13px] tracking-tighter">
              Nintendo
            </span>
          </div>

          {/* Center Status */}
          <div className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.5px] uppercase text-[#e48600]">
            <span className="w-2 h-2 rounded-full bg-[#f68d1f] animate-pulse" />
            <span>DEV CONSOLE 2001</span>
          </div>

          {/* Share Button */}
          <Button
            onClick={handleShare}
            aria-label="공유하기"
            variant="amber"
            size="badge"
            className="flex items-center gap-1 cursor-pointer"
          >
            <span>SHARE</span>
            <span>➔</span>
          </Button>
        </div>

        {/* 2. SUB-NAV STRIP : 헤더에 구글 소셜 로그인 / 유저 정보 연동 */}
        <UserHeader
          user={user}
          displayName={displayName}
          firestorePath={user ? `users/${user.uid}/link` : undefined}
          onLoginSuccess={fetchLinks}
          onSignOut={() => setLinks([])}
        />

        {/* 로그인 여부에 따른 화면 분기: 로그인을 안할 땐 프로필이 안 뜬 상태 */}
        {user ? (
          // ================= [1] 로그인 완료 상태 : 프로필 + 마이 링크 슬롯 =================
          <>
            {/* 3. HERO / PROFILE MODULE (로그인 시에만 표시!) */}
            <div className="p-3.5 bg-[#7a8aba]">
              <Card className="bg-gradient-to-r from-[#acace7] via-[#9bb0db] to-[#8ba1d4] p-4 text-center flex flex-col items-center relative overflow-hidden rounded-none">
                {/* Circuit Overlay */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(#3d4f97 1px, transparent 1px), linear-gradient(90deg, #3d4f97 1px, transparent 1px)`,
                    backgroundSize: "16px 16px",
                  }}
                />

                {/* Profile Avatar */}
                <div className="relative mb-2.5 z-10">
                  {user.photoURL ? (
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={user.photoURL}
                        alt={displayName}
                        className="w-16 h-16 border-2 border-[#21242e] shadow-md object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <Badge
                        variant="signal"
                        size="micro"
                        className="absolute -bottom-1 -right-2 text-white"
                      >
                        AUTH
                      </Badge>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="w-16 h-16 bg-[#e60012] border-2 border-[#21242e] shadow-md flex items-center justify-center">
                        <span className="text-3xl font-black text-white select-none">
                          {displayName[0]?.toUpperCase() ?? "U"}
                        </span>
                      </div>
                      <Badge
                        variant="signal"
                        size="micro"
                        className="absolute -bottom-1 -right-2 text-white"
                      >
                        AUTH
                      </Badge>
                    </div>
                  )}
                </div>

                {/* 이름 / 유저 정보 (Display Name: 로그인한 사람의 이메일 앞부분) */}
                <div className="flex flex-col items-center mb-1.5 z-10">
                  <div className="flex items-baseline gap-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-[#21242e] tracking-tight">
                      {displayName}
                    </h1>
                    <span className="text-xs sm:text-sm font-black text-[#3d4f97] tracking-wider uppercase">
                      @{displayName}
                    </span>
                  </div>
                  {user.email && (
                    <span className="text-[10px] font-mono font-bold text-[#3d4f97] mt-0.5">
                      {user.email}
                    </span>
                  )}
                </div>

                {/* Role Badge */}
                <Badge
                  variant="default"
                  size="default"
                  className="bg-[#21242e] text-[#ecab37] tracking-wider mb-2 z-10 rounded-none"
                >
                  MY LINK CONSOLE USER
                </Badge>

                {/* 안내 문구 */}
                <p className="text-[11px] sm:text-[12px] font-bold text-[#21242e] leading-relaxed max-w-sm break-keep z-10">
                  개인화된 Firestore 저장소에 링크 카트리지를 등록하고 실시간으로 관리합니다.
                </p>

                {/* Firestore 경로 및 유저 정보 박스 */}
                <div className="mt-2.5 w-full bg-[#dedede]/90 bevel-plate p-2 text-left z-10 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[9px] font-black uppercase text-[#21242e]">
                    <span>★ FIRESTORE DATABASE PATH</span>
                    <span className="text-[#3d4f97] font-mono font-bold bg-white/70 px-1 py-0.2 rounded-xs">
                      users/{user.uid}/link
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold text-[#555e75]">
                    <span>DISPLAY NAME: <strong className="text-[#21242e]">{displayName}</strong></span>
                    <span className="font-mono text-[8px] text-[#3d4f97]">UID: {user.uid.slice(0, 8)}...</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* 4. CARTRIDGE LIST (로그인 완료 시 액션 툴바 + 링크 목록) */}
            <div className="px-3.5 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#21242e] inline-block" />
                <span className="text-[10px] font-black uppercase text-[#21242e] tracking-wider">
                  CARTRIDGE SLOTS ({isMounted ? links.length : 0})
                </span>
                {isLoading && (
                  <span className="text-[9px] font-bold text-[#e48600] animate-pulse">
                    SYNCING...
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="subtle"
                  size="xs"
                  onClick={() => fetchLinks()}
                  disabled={isLoading}
                  className="text-[9px] px-1.5 py-0.5 cursor-pointer"
                  title="Firestore 링크 새로고침"
                >
                  REFRESH ↻
                </Button>
                {isMounted && links.length > 0 && (
                  <Button
                    variant="subtle"
                    size="xs"
                    onClick={handleClearAllLinks}
                    className="text-[9px] px-1.5 py-0.5 cursor-pointer text-[#a7282b] hover:text-[#e60012]"
                    title="모든 링크 삭제"
                  >
                    CLEAR 🗑
                  </Button>
                )}
                <AddLinkDialog
                  onAddLink={handleAddLink}
                  currentCount={links.length}
                />
              </div>
            </div>

            {/* 링크 목록 */}
            <div className="px-3.5 pb-3.5">
              <LinkList
                links={links}
                email={user.email || contactEmail}
                onCopyEmail={handleCopyEmail}
                onUpdateLink={handleUpdateLink}
                onDeleteLink={handleDeleteRequest}
              />
            </div>
          </>
        ) : (
          // ================= [2] 비로그인 상태 : 프로필 안 뜬 상태, 로그인 화면만 제공 =================
          <div className="pt-3.5">
            <LoginScreen onLoginSuccess={fetchLinks} />
          </div>
        )}

        {/* 5. TECH SPEC CHIPS */}
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

        {/* 6. FOOTER */}
        <footer className="carbon-halftone px-3.5 py-2.5 flex items-center justify-between gap-2 border-t-2 border-[#3d4f97] text-[9px] text-[#9fbee7]">
          <div className="font-bold text-white">
            © 1997–2001 Nintendo / {displayName || "Jeong Huiwon"}
          </div>
          <Badge
            variant="amber"
            size="micro"
            className="border border-[#21242e] text-[#21242e] font-black text-[9px] uppercase shrink-0"
          >
            ESRB — PRIVACY CERTIFIED
          </Badge>
        </footer>
      </Card>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#f68d1f] text-white font-black text-xs px-3.5 py-1.5 border-2 border-[#21242e] bevel-signal shadow-lg tracking-wide uppercase whitespace-nowrap">
          {toastMessage}
        </div>
      )}

      {/* 삭제 확인 모달 */}
      <DeleteConfirmDialog
        open={isDeleteModalOpen}
        link={deleteTarget}
        onOpenChange={(open) => {
          setIsDeleteModalOpen(open);
          if (!open) setDeleteTarget(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </main>
  );
}
