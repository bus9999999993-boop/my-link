import { UserProfileClient } from "./user-profile-client";

// Next.js 정적 내보내기(output: 'export' / GitHub Pages) 지원을 위한 generateStaticParams
export async function generateStaticParams() {
  return [
    { displayName: "user" },
    { displayName: "profile" },
  ];
}

interface PageProps {
  params: Promise<{ displayName: string }>;
}

export default async function UserProfilePage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawDisplayName = resolvedParams?.displayName;

  return <UserProfileClient initialDisplayName={rawDisplayName} />;
}
