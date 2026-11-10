"use client";

import { useState, useEffect } from "react";
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
  /** 이메일 앞부분으로 추출된 display name */
  displayName: string;
  /** Auth 초기 상태 확인 중 여부 */
  authLoading: boolean;
}

/**
 * Firebase Auth 상태를 구독하고,
 * 로그인 시 users/{uid} 경로의 유저 정보를 동기화 및 관리하는 훅
 */
export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfileDoc | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

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
            // users/{uid} 문서에 이메일 앞부분을 display name으로 동기화
            const synced = await syncUserProfile(firebaseUser);
            setProfile(synced);
          } catch (e) {
            console.error("Failed to sync user profile to Firestore:", e);
            // 폴백 프로필 생성
            setProfile({
              uid: firebaseUser.uid,
              email: firebaseUser.email || "",
              displayName: getEmailDisplayName(firebaseUser.email, "User"),
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

  return {
    user,
    profile,
    displayName: derivedDisplayName,
    authLoading,
  };
}
