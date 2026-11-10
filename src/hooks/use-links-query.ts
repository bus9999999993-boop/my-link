"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getFirestoreLinks,
  addLinkToFirestore,
  updateLinkInFirestore,
  deleteLinkFromFirestore,
  clearFirestoreLinks,
} from "@/lib/links-service";
import { type LinkCartridge } from "@/data/links";

export const linkKeys = {
  all: ["links"] as const,
  user: (uid: string) => [...linkKeys.all, uid] as const,
};

/**
 * users/{uid}/link 목록 조회 쿼리 (TanStack Query)
 */
export function useLinksQuery(uid?: string | null) {
  return useQuery({
    queryKey: linkKeys.user(uid || ""),
    queryFn: async () => {
      if (!uid) return [];
      return await getFirestoreLinks(uid);
    },
    enabled: !!uid,
    staleTime: 1000 * 60 * 3, // 3분간 캐시 유지
  });
}

/**
 * 링크 추가 뮤테이션
 */
export function useAddLinkMutation(uid: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newLink: Omit<LinkCartridge, "id" | "createdAt" | "updatedAt">) => {
      return await addLinkToFirestore(uid, newLink);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkKeys.user(uid) });
    },
  });
}

/**
 * 링크 수정 뮤테이션
 */
export function useUpdateLinkMutation(uid: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updated,
    }: {
      id: string;
      updated: Partial<Omit<LinkCartridge, "id" | "createdAt" | "updatedAt">>;
    }) => {
      await updateLinkInFirestore(uid, id, updated);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkKeys.user(uid) });
    },
  });
}

/**
 * 링크 삭제 뮤테이션
 */
export function useDeleteLinkMutation(uid: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteLinkFromFirestore(uid, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkKeys.user(uid) });
    },
  });
}

/**
 * 모든 링크 초기화(삭제) 뮤테이션
 */
export function useClearLinksMutation(uid: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await clearFirestoreLinks(uid);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkKeys.user(uid) });
    },
  });
}
