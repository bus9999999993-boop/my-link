"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { signInWithGoogle } from "@/lib/auth-service";

interface LoginScreenProps {
  onLoginSuccess?: () => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isNotLocalhost, setIsNotLocalhost] = React.useState(false);

  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    ) {
      setIsNotLocalhost(true);
    }
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      onLoginSuccess?.();
    } catch (err: unknown) {
      console.error("Google login error:", err);
      const code = (err as { code?: string; message?: string })?.code;
      const currentHost = typeof window !== "undefined" ? window.location.hostname : "";

      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
        setIsLoading(false);
        return;
      }

      if (code === "auth/unauthorized-domain") {
        setError(
          `현재 접속 주소(${currentHost})는 Firebase 인증에 허용되지 않은 도메인입니다. PC 브라우저에서 http://localhost:3000 으로 접속하시거나, Firebase Console > Authentication > Settings > 승인된 도메인에 [${currentHost}]를 추가해주세요.`
        );
      } else if (code === "auth/operation-not-allowed") {
        setError(
          "Firebase Console에서 Google 로그인이 활성화되지 않았습니다. Authentication > Sign-in method 탭에서 Google 제공업체를 [사용 설정]해주세요."
        );
      } else if (code === "auth/popup-blocked") {
        setError(
          "브라우저에서 로그인 팝업 창이 차단되었습니다. 주소창 우측의 팝업 차단을 해제하고 다시 클릭해주세요."
        );
      } else if (code === "auth/network-request-failed") {
        setError(
          "네트워크 통신 오류가 발생했습니다. 인터넷 연결 상태를 확인하고 잠시 후 다시 시도해주세요."
        );
      } else {
        setError(
          `로그인 실패 [${code || "UNKNOWN"}]: ${(err as Error)?.message || "브라우저 콘솔(F12)을 확인해주세요."}`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-0">
      {/* 1. 비로그인 접근 차단 및 로그인 유도 설명 패널 */}
      <div className="px-3.5 pb-3.5">
        <Card className="bg-[#8ba1d4] bevel-plate p-0 overflow-hidden">
          {/* 상단 닌텐도 레트로 스타일 알림 배너 */}
          <div className="bg-[#21242e] px-4 py-2.5 flex items-center justify-between border-b-2 border-[#ecab37]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e60012] animate-pulse shrink-0" />
              <span className="text-[10px] font-black uppercase text-[#ecab37] tracking-wider">
                [ ACCESS RESTRICTED : LOGIN REQUIRED ]
              </span>
            </div>
            <span className="text-[9px] font-mono font-bold text-[#9fbee7]">
              GUEST MODE
            </span>
          </div>

          {/* 본문 설명 및 안내 문구 */}
          <div className="p-4 sm:p-5 flex flex-col items-center gap-4 text-center">
            {/* IP 주소 접속 시 안내 팁 배너 */}
            {isNotLocalhost && (
              <div className="w-full bg-[#ecab37] text-[#21242e] border-2 border-[#21242e] p-2.5 bevel-chip text-left flex flex-col gap-1">
                <span className="font-black text-[11px] flex items-center gap-1">
                  <span>💡</span>
                  <span>접속 주소 안내 (중요)</span>
                </span>
                <span className="text-[10px] font-bold leading-relaxed">
                  현재 로컬 IP 주소로 접속 중입니다. Firebase Google 로그인은 보안 정책상 기본적으로 <strong>http://localhost:3000</strong> 에서 동작합니다. 로그인이 안 되실 경우 PC의 <strong>http://localhost:3000</strong> 으로 접속하시거나 Firebase 콘솔의 승인된 도메인에 현재 IP를 추가해주세요.
                </span>
              </div>
            )}

            {/* 자물쇠 / 카트리지 하드웨어 아이콘 */}
            <div className="w-14 h-14 bg-[#dedede] bevel-plate flex items-center justify-center shadow-inner">
              <span className="text-3xl select-none">🔒</span>
            </div>

            {/* 메인 설명 문구 */}
            <div className="flex flex-col gap-2">
              <h2 className="text-base sm:text-lg font-black text-[#21242e] tracking-tight leading-tight">
                로그인 이후에 마이 링크 서비스를
                <br />
                이용하실 수 있습니다.
              </h2>
              <p className="text-[11px] sm:text-[12px] font-bold text-[#3d4f97] leading-relaxed max-w-sm">
                현재 비로그인 상태이므로 카트리지 슬롯이 잠겨 있습니다.
                <br />
                Google 계정으로 로그인하면 개인화된 저장소
                <span className="text-[#21242e] font-black"> (users/&#123;uid&#125;/link)</span>에
                나만의 링크 카트리지를 안전하게 보관하고 관리할 수 있습니다.
              </p>
            </div>

            {/* 주요 기능 안내 칩 목록 */}
            <div className="w-full bg-[#dedede]/80 bevel-plate p-2.5 flex flex-col gap-1.5 text-left">
              <div className="text-[9px] font-black uppercase text-[#555e75] tracking-wider">
                ★ LOGIN MEMBER PERKS
              </div>
              <ul className="text-[10px] font-bold text-[#21242e] space-y-1">
                <li className="flex items-center gap-1.5">
                  <span className="text-[#e48600]">✔</span>
                  <span><strong>개인화 Firestore 경로</strong> (users/&#123;user.uid&#125;/link)에 링크 저장</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#e48600]">✔</span>
                  <span><strong>실시간 인라인 편집</strong> 및 안전한 <strong>삭제 확인 모달</strong> 지원</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#e48600]">✔</span>
                  <span><strong>이메일 앞부분</strong>이 내 프로필 닉네임(Display Name)으로 자동 적용</span>
                </li>
              </ul>
            </div>

            {/* 에러 메시지 알림 (발생 시) */}
            {error && (
              <div className="w-full bg-[#ffeaea] border-2 border-[#e60012] px-3 py-2 bevel-chip text-left flex items-start gap-1.5">
                <span className="text-[#e60012] font-black text-xs">⚠</span>
                <span className="text-[10px] font-bold text-[#e60012] leading-tight">
                  {error}
                </span>
              </div>
            )}

            {/* 대형 구글 소셜 로그인 버튼 */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-[#f2f4f8] active:bg-[#e4e8f0] border-2 border-[#21242e] px-4 py-3 bevel-chip cursor-pointer disabled:opacity-50 disabled:pointer-events-none transition-all shadow-md group"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-[#3d4f97] border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              <span className="text-[12px] sm:text-[13px] font-black text-[#21242e] tracking-wider uppercase group-hover:text-[#3d4f97]">
                {isLoading ? "구글 계정 인증 진행 중..." : "Google 계정으로 로그인"}
              </span>
            </button>

            <span className="text-[9px] font-bold text-[#555e75]">
              ※ 로그인 완료 즉시 마이 링크 카트리지 등록이 활성화됩니다.
            </span>
          </div>
        </Card>
      </div>

      {/* 하단 시스템 아키텍처 스펙 칩 */}
      <div className="mx-3.5 mb-3.5 bg-[#8ba1d4] bevel-plate p-2 text-center">
        <div className="text-[9px] font-black text-[#21242e] uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
          <span className="text-[#3d4f97]">≡</span>
          <span>SECURITY & AUTH ARCHITECTURE</span>
          <span className="text-[#3d4f97]">≡</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1">
          {["Firebase Auth", "Firestore (users/{uid}/link)", "Google OAuth 2.0", "Next.js"].map(
            (item) => (
              <Badge
                key={item}
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
    </div>
  );
}
