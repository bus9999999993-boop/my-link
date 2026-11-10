"use client";

import * as React from "react";
import { type User } from "firebase/auth";
import { signOutUser } from "@/lib/auth-service";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface UserHeaderProps {
  user: User;
  onSignOut?: () => void;
}

export function UserHeader({ user, onSignOut }: UserHeaderProps) {
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOutUser();
      onSignOut?.();
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="bg-[#9fbee7] px-3.5 py-1.5 flex items-center justify-between border-b border-[#3d4f97]">
      {/* 유저 정보 영역 */}
      <div className="flex items-center gap-2 min-w-0">
        {/* 프로필 사진 */}
        {user.photoURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.photoURL}
            alt={user.displayName ?? "user"}
            className="w-5 h-5 rounded-full border border-[#3d4f97] shrink-0 object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-5 h-5 rounded-full bg-[#3d4f97] border border-[#21242e] shrink-0 flex items-center justify-center">
            <span className="text-[8px] font-black text-white">
              {user.displayName?.[0]?.toUpperCase() ?? "U"}
            </span>
          </div>
        )}

        {/* 이름 & 이메일 */}
        <div className="min-w-0">
          <div className="text-[10px] font-black text-[#21242e] truncate leading-none">
            {user.displayName ?? "사용자"}
          </div>
          <div className="text-[9px] font-bold text-[#3d4f97] truncate font-mono leading-none mt-0.5">
            {user.email}
          </div>
        </div>
      </div>

      {/* 오른쪽: 상태 + 로그아웃 */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-[9px] font-black text-[#3d4f97] uppercase tracking-[0.5px] font-mono hidden sm:block">
          ONLINE
        </span>
        <Button
          variant="subtle"
          size="xs"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="text-[9px] px-1.5 py-0.5 cursor-pointer flex items-center gap-1 text-[#a7282b] hover:text-[#e60012] hover:bg-[#ffeaea]"
          title="로그아웃"
        >
          <LogOut className="w-2.5 h-2.5" />
          <span>{isSigningOut ? "..." : "LOGOUT"}</span>
        </Button>
      </div>
    </div>
  );
}
