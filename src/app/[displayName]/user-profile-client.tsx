"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUserByDisplayName, getUserLinks, type UserProfileDoc } from "@/lib/links-service";
import { type LinkCartridge } from "@/data/links";
import { UserProfileView } from "./user-profile-view";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface UserProfileClientProps {
  initialDisplayName?: string;
  initialProfile?: UserProfileDoc | null;
  initialLinks?: LinkCartridge[];
}

export function UserProfileClient({
  initialDisplayName,
  initialProfile = null,
  initialLinks = [],
}: UserProfileClientProps) {
  const params = useParams();
  const rawParamName = (params?.displayName as string) || initialDisplayName || "";

  const [displayName, setDisplayName] = useState<string>("");
  const [profile, setProfile] = useState<UserProfileDoc | null>(initialProfile);
  const [links, setLinks] = useState<LinkCartridge[]>(initialLinks);
  const [loading, setLoading] = useState<boolean>(!initialProfile);
  const [notFoundState, setNotFoundState] = useState<boolean>(false);

  useEffect(() => {
    let targetName = rawParamName;

    // 만약 파라미터가 없거나 404 폴백인 경우 window.location에서 직접 추출
    if (!targetName && typeof window !== "undefined") {
      const pathParts = window.location.pathname.split("/").filter(Boolean);
      // my-link 저장소명 서브패스 제외
      const nonRepoParts = pathParts.filter((p) => p !== "my-link");
      if (nonRepoParts.length > 0) {
        targetName = nonRepoParts[0];
      }
    }

    if (!targetName) {
      setLoading(false);
      setNotFoundState(true);
      return;
    }

    const decoded = decodeURIComponent(targetName).trim();
    setDisplayName(decoded);

    // 프로필 및 링크 조회
    let isCancelled = false;
    async function fetchData() {
      setLoading(true);
      try {
        const foundUser = await getUserByDisplayName(decoded);
        if (isCancelled) return;

        if (!foundUser) {
          setProfile(null);
          setNotFoundState(true);
        } else {
          setProfile(foundUser);
          setNotFoundState(false);
          const userLinks = await getUserLinks(foundUser.uid);
          if (!isCancelled) {
            setLinks(userLinks);
          }
        }
      } catch (err) {
        console.error("Failed to load user profile:", err);
        if (!isCancelled) {
          setNotFoundState(true);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [rawParamName]);

  // 1. 로딩 상태 화면 (레트로 콘솔 스타일)
  if (loading) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center p-3 sm:p-6 text-[#21242e]">
        <Card className="w-full max-w-[480px] bg-[#7a8aba] shadow-[0_16px_36px_rgba(20,25,45,0.4)] p-6 text-center bevel-plate rounded-none border-2 border-[#21242e] flex flex-col items-center">
          <div className="w-12 h-12 bg-[#21242e] border-2 border-[#ecab37] flex items-center justify-center mb-3">
            <span className="w-4 h-4 border-2 border-[#ecab37] border-t-transparent rounded-full animate-spin" />
          </div>
          <Badge
            variant="default"
            size="default"
            className="bg-[#21242e] text-[#ecab37] font-black tracking-wider mb-2 rounded-none"
          >
            CARTRIDGE READING...
          </Badge>
          <div className="text-sm font-black text-[#21242e] tracking-tight">
            [{displayName || "USER"}] 프로필 카트리지 로딩 중
          </div>
          <span className="text-[10px] font-mono text-[#3d4f97] mt-1 animate-pulse">
            FIRESTORE CLOUD SEARCHING...
          </span>
        </Card>
      </main>
    );
  }

  // 2. 유저를 찾지 못함 (404 화면)
  if (notFoundState || !profile) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center p-3 sm:p-6 text-[#21242e]">
        <Card className="w-full max-w-[480px] bg-[#7a8aba] shadow-[0_16px_36px_rgba(20,25,45,0.4)] relative flex flex-col rounded-none">
          <div className="carbon-halftone px-3.5 py-2 flex items-center justify-between border-b-2 border-[#3d4f97]">
            <div className="bg-white border border-[#21242e] rounded-full px-2.5 py-0.5 flex items-center justify-center shadow-inner">
              <span className="text-[#e60012] font-black text-[13px] tracking-tighter">
                Nintendo
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.5px] uppercase text-[#e60012]">
              <span className="w-2 h-2 rounded-full bg-[#e60012] animate-ping" />
              <span>ERROR 404</span>
            </div>
            <Link href="/">
              <Button variant="subtle" size="badge" className="cursor-pointer">
                HOME ➔
              </Button>
            </Link>
          </div>

          <div className="p-6 bg-[#7a8aba] flex flex-col items-center text-center">
            <Card className="w-full bg-[#dedede] p-6 flex flex-col items-center bevel-plate rounded-none border-2 border-[#21242e]">
              <div className="w-16 h-16 bg-[#21242e] border-2 border-[#e60012] flex items-center justify-center mb-3 shadow-md">
                <span className="text-3xl font-black text-[#e60012] animate-pulse">
                  404
                </span>
              </div>
              <Badge
                variant="default"
                size="default"
                className="bg-[#e60012] text-white font-black tracking-wider mb-2 rounded-none uppercase"
              >
                USER NOT FOUND
              </Badge>
              <h1 className="text-xl sm:text-2xl font-black text-[#21242e] tracking-tight mb-2">
                유저를 찾을 수 없습니다
              </h1>
              <p className="text-[11px] sm:text-[12px] font-bold text-[#555e75] leading-relaxed max-w-sm mb-4 break-keep">
                요청하신 &apos;{displayName}&apos; 사용자가 존재하지 않거나 등록되지 않은 프로필입니다.
              </p>
              <Link href="/" className="w-full">
                <Button
                  variant="amber"
                  size="default"
                  className="w-full py-2 font-black cursor-pointer shadow-md text-xs tracking-wider"
                >
                  🏠 메인 콘솔로 돌아가기
                </Button>
              </Link>
            </Card>
          </div>
        </Card>
      </main>
    );
  }

  // 3. 정상 조회 완료: UserProfileView 표시
  return <UserProfileView profile={profile} initialLinks={links} />;
}
