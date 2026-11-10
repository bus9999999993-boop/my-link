import { notFound } from "next/navigation";
import { getUserByDisplayName, getUserLinks } from "@/lib/links-service";
import { UserProfileView } from "./user-profile-view";

interface PageProps {
  params: Promise<{ displayName: string }>;
}

// 메타데이터는 추후 요구사항에 따라 generateMetadata 등으로 확장 예정
export default async function UserProfilePage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawDisplayName = resolvedParams.displayName;
  
  if (!rawDisplayName) {
    notFound();
  }

  const decodedDisplayName = decodeURIComponent(rawDisplayName);

  // 1. displayName으로 Firestore 유저 검색
  const profile = await getUserByDisplayName(decodedDisplayName);

  // 2. 유저가 없으면 404 페이지
  if (!profile) {
    notFound();
  }

  // 3. 링크 목록 조회 (user/{userId}/links & users/{userId}/link 호환)
  const links = await getUserLinks(profile.uid);

  return <UserProfileView profile={profile} initialLinks={links} />;
}
