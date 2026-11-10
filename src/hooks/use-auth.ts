"use client";

import { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  syncUserProfile,
  getUserProfile,
  getEmailDisplayName,
  type UserProfileDoc,
} from "@/lib/links-service";

export interface AuthState {
  /** 현재 로그인된 유저 (null이면 비로그인) */
  user: User | null;
  /** Firestore users/{uid} 경로에 저장된 유저 프로필 정보 */
  profile: UserProfileDoc | null;
  /** 이메일 앞부분 또는 커스텀 변경된 display name */
  displayName: string;
  /** 한 줄 소개 (Bio) */
  bio: string;
  /** Auth 초기 상태 확인 중 여부 */
  authLoading: boolean;
  /** 프로필 수정 성공 시 로컬 상태 즉시 갱신 함수 */
  updateProfileState: (updated: { displayName?: string; bio?: string }) => void;
  /** Firestore에서 프로필 최신 정보 다시 불러오기 */
  refreshProfile: () => Promise<void>;
}

/**
 * Firebase Auth 상태를 구독하고,
 * 로그인 시 users/{uid} 경로의 유저 정보를 동기화 및 관리하는 훅
 */
export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfileDoc | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    try {
      const fetched = await getUserProfile(user.uid);
      if (fetched) {
        setProfile(fetched);
      }
    } catch (e) {
      console.error("refreshProfile error:", e);
    }
  }, [user]);

  const updateProfileState = useCallback(
    (updated: { displayName?: string; bio?: string }) => {
      setProfile((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          displayName: updated.displayName ?? prev.displayName,
          bio: updated.bio ?? prev.bio,
        };
      });
    },
    []
  );

  useEffect(() => {
    // 3초 안전 타이머 (네트워크 지연 시에도 UI 멈춤 방지)
    const fallbackTimer = setTimeout(() => {
      setAuthLoading(false);
    }, 3000);

    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        clearTimeout(fallbackTimer);
        setUser(firebaseUser);

        if (firebaseUser) {
          try {
            // users/{uid} 문서에 프로필 동기화 (기존 displayName/bio 보존)
            const synced = await syncUserProfile(firebaseUser);
            setProfile(synced);
          } catch (e) {
            console.error("Failed to sync user profile to Firestore:", e);
            // 폴백 프로필 생성
            setProfile({
              uid: firebaseUser.uid,
              email: firebaseUser.email || "",
              displayName: getEmailDisplayName(firebaseUser.email, "User"),
              bio: "개인화된 Firestore 저장소에 링크 카트리지를 등록하고 실시간으로 관리합니다.",
              photoURL: firebaseUser.photoURL || null,
              firestorePath: `users/${firebaseUser.uid}/link`,
            });
          }
        } else {
          setProfile(null);
        }
        setAuthLoading(false);
      },
      (error) => {
        clearTimeout(fallbackTimer);
        console.error("[useAuth] onAuthStateChanged error:", error);
        setAuthLoading(false);
      }
    );

    return () => {
      clearTimeout(fallbackTimer);
      unsubscribe();
    };
  }, []);

  const derivedDisplayName =
    profile?.displayName || getEmailDisplayName(user?.email, "User");
  const derivedBio =
    profile?.bio ||
    "개인화된 Firestore 저장소에 링크 카트리지를 등록하고 실시간으로 관리합니다.";

  return {
    user,
    profile,
    displayName: derivedDisplayName,
    bio: derivedBio,
    authLoading,
    updateProfileState,
    refreshProfile,
  };
}
