"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfile,
  updateUserProfile,
  type UserProfileDoc,
} from "@/lib/links-service";

export const profileKeys = {
  all: ["profile"] as const,
  user: (uid: string) => [...profileKeys.all, uid] as const,
};

/**
 * users/{uid} 프로필 조회 쿼리 (TanStack Query)
 */
export function useProfileQuery(uid?: string | null) {
  return useQuery({
    queryKey: profileKeys.user(uid || ""),
    queryFn: async () => {
      if (!uid) return null;
      return await getUserProfile(uid);
    },
    enabled: !!uid,
    staleTime: 1000 * 60 * 5, // 5분
  });
}

/**
 * 프로필 업데이트 뮤테이션 (낙관적 업데이트 적용!)
 * 서버 응답을 기다리지 않고 UI를 즉시 0ms 지연으로 갱신하며, 실패 시 이전 상태로 롤백합니다.
 */
export function useUpdateProfileMutation(uid: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: { displayName: string; bio?: string }) => {
      await updateUserProfile(uid, updates);
      return updates;
    },
    // 1. 낙관적 업데이트 수행 (서버 전송 직전 실행)
    onMutate: async (newUpdates) => {
      const qKey = profileKeys.user(uid);

      // 진행 중인 프로필 쿼리 취소
      await queryClient.cancelQueries({ queryKey: qKey });

      // 실패 시 롤백을 위해 이전 스냅샷 저장
      const previousProfile = queryClient.getQueryData<UserProfileDoc | null>(qKey);

      // 캐시에 낙관적으로 즉시 갱신
      if (previousProfile) {
        queryClient.setQueryData<UserProfileDoc>(qKey, {
          ...previousProfile,
          displayName: newUpdates.displayName.trim(),
          bio: newUpdates.bio?.trim() ?? previousProfile.bio,
        });
      }

      // 이전 스냅샷을 context로 반환
      return { previousProfile };
    },
    // 2. 에러 발생 시 이전 스냅샷으로 롤백
    onError: (err, newUpdates, context) => {
      console.error("[Optimistic Update Failed] rolling back profile:", err);
      if (context?.previousProfile !== undefined) {
        queryClient.setQueryData(profileKeys.user(uid), context.previousProfile);
      }
    },
    // 3. 성공/실패 여부와 관계없이 최종적으로 쿼리 무효화하여 서버와 정합성 맞춤
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.user(uid) });
    },
  });
}
