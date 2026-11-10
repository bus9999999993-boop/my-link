"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export interface AuthState {
  /** 현재 로그인된 유저 (null이면 비로그인) */
  user: User | null;
  /** Auth 초기 상태 확인 중 여부 */
  authLoading: boolean;
}

/**
 * Firebase Auth 상태를 구독하는 훅
 */
export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, authLoading };
}
