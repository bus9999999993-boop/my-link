"use client";

import * as React from "react";
import { type User } from "firebase/auth";
import { signInWithGoogle, signOutUser } from "@/lib/auth-service";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn } from "lucide-react";

interface UserHeaderProps {
  user: User | null;
  displayName?: string;
  firestorePath?: string;
  onLoginSuccess?: () => void;
  onSignOut?: () => void;
}

export function UserHeader({
  user,
  displayName,
  firestorePath,
  onLoginSuccess,
  onSignOut,
}: UserHeaderProps) {
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleGoogleLogin = async () => {
    setIsProcessing(true);
    try {
      await signInWithGoogle();
      onLoginSuccess?.();
    } catch (err: unknown) {
      console.error("Header login error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSignOut = async () => {
    setIsProcessing(true);
    try {
      await signOutUser();
      onSignOut?.();
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // 1. 로그인 상태인 경우: 이메일 앞부분 displayName, 이메일, Firestore 경로, 로그아웃 버튼
  if (user) {
    const finalDisplayName =
      displayName || user.email?.split("@")[0] || user.displayName || "USER";

    return (
      <div className="bg-[#9fbee7] px-3.5 py-1.5 flex items-center justify-between border-b border-[#3d4f97] gap-2">
        {/* 유저 정보 영역 */}
        <div className="flex items-center gap-2 min-w-0">
          {/* 프로필 사진 또는 첫 글자 아바타 */}
          {user.photoURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.photoURL}
              alt={finalDisplayName}
              className="w-6 h-6 rounded-full border border-[#3d4f97] shrink-0 object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-[#21242e] border border-[#3d4f97] shrink-0 flex items-center justify-center">
              <span className="text-[10px] font-black text-[#ecab37]">
                {finalDisplayName[0]?.toUpperCase() ?? "U"}
              </span>
            </div>
          )}

          {/* 이름(이메일 앞부분) & 이메일 */}
          <div className="min-w-0 text-left">
            <div className="flex items-center gap-1.5 truncate leading-none">
              <span className="text-[11px] font-black text-[#21242e] truncate">
                {finalDisplayName}
              </span>
              <span className="text-[9px] font-bold bg-[#21242e] text-[#ecab37] px-1 py-0.2 rounded-xs shrink-0">
                AUTH
              </span>
            </div>
            <div className="text-[9px] font-bold text-[#3d4f97] truncate font-mono leading-none mt-1">
              {user.email}
            </div>
          </div>
        </div>

        {/* 오른쪽: 경로 힌트 + 로그아웃 버튼 */}
        <div className="flex items-center gap-1.5 shrink-0">
          {firestorePath && (
            <span
              className="text-[8px] font-mono font-bold text-[#3d4f97] bg-white/50 px-1 py-0.5 rounded-xs hidden md:inline-block truncate max-w-[150px]"
              title={firestorePath}
            >
              {firestorePath}
            </span>
          )}
          <Button
            variant="subtle"
            size="xs"
            onClick={handleSignOut}
            disabled={isProcessing}
            className="text-[9px] px-2 py-0.5 cursor-pointer flex items-center gap-1 text-[#a7282b] hover:text-[#e60012] hover:bg-[#ffeaea] font-black"
            title="로그아웃"
          >
            <LogOut className="w-2.5 h-2.5" />
            <span>{isProcessing ? "..." : "LOGOUT"}</span>
          </Button>
        </div>
      </div>
    );
  }

  // 2. 비로그인 상태인 경우: 게스트 상태 표시 + 헤더 [구글 소셜 로그인] 버튼 항상 배치
  return (
    <div className="bg-[#9fbee7] px-3.5 py-1.5 flex items-center justify-between border-b border-[#3d4f97]">
      <div className="flex items-center gap-1.5 text-[10px] font-black text-[#21242e] uppercase tracking-[0.5px]">
        <span className="w-2 h-2 rounded-full bg-[#e60012] animate-pulse" />
        <span>SYSTEM: GUEST (LOGIN REQUIRED)</span>
      </div>

      {/* 헤더 구글 소셜 로그인 버튼 */}
      <Button
        variant="amber"
        size="xs"
        onClick={handleGoogleLogin}
        disabled={isProcessing}
        className="text-[9px] px-2.5 py-0.5 cursor-pointer flex items-center gap-1 font-black shadow-xs tracking-wider"
        title="Google 계정으로 로그인"
      >
        {isProcessing ? (
          <span className="w-2.5 h-2.5 border-2 border-[#21242e] border-t-transparent rounded-full animate-spin" />
        ) : (
          <LogIn className="w-3 h-3" />
        )}
        <span>GOOGLE LOGIN</span>
      </Button>
    </div>
  );
}
