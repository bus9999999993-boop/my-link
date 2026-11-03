export interface LinkCartridge {
  /** 문서 고유 ID (Firestore 문서 ID) */
  id?: string;
  /** 링크 표시 이름 */
  label: string;
  /** 카트리지 코드 (장식용) */
  code: string;
  /** 링크 설명 */
  desc: string;
  /** 이동할 URL */
  url: string;
  /** 태그 라벨 */
  tag: string;
  /** 태그 색상 클래스 */
  tagColor: string;
  /** 생성일시 */
  createdAt?: any;
  /** 수정일시 */
  updatedAt?: any;
}

export const linkCartridges: LinkCartridge[] = [
  {
    label: "GitHub",
    code: "REPO-01",
    desc: "오픈소스 프로젝트 & 소스코드 저장소",
    url: "https://github.com",
    tag: "CODE",
    tagColor: "bg-[#21242e] text-[#ecab37]",
  },
  {
    label: "Tech Blog",
    code: "POST-02",
    desc: "개발 트러블슈팅 & 기술 회고 아카이브",
    url: "https://velog.io",
    tag: "BLOG",
    tagColor: "bg-[#206479] text-white",
  },
  {
    label: "LinkedIn",
    code: "PROF-03",
    desc: "경력 소개 및 프로페셔널 네트워크",
    url: "https://linkedin.com",
    tag: "CAREER",
    tagColor: "bg-[#3d4f97] text-white",
  },
  {
    label: "Portfolio",
    code: "WORK-04",
    desc: "주요 프로젝트 & 작업물 갤러리",
    url: "https://portfolio.dev",
    tag: "WORK",
    tagColor: "bg-[#e60012] text-white",
  },
  {
    label: "Instagram",
    code: "SOCL-05",
    desc: "일상 & 개발 비하인드 스토리",
    url: "https://instagram.com",
    tag: "SNS",
    tagColor: "bg-[#a7282b] text-white",
  },
  {
    label: "YouTube",
    code: "TUBE-06",
    desc: "코딩 튜토리얼 & 기술 리뷰 채널",
    url: "https://youtube.com",
    tag: "VIDEO",
    tagColor: "bg-[#e60012] text-white",
  },
  {
    label: "Notion Wiki",
    code: "WIKI-07",
    desc: "개발 노트 & 학습 정리 위키",
    url: "https://notion.so",
    tag: "DOCS",
    tagColor: "bg-[#21242e] text-white",
  },
  {
    label: "Discord Server",
    code: "CHAT-08",
    desc: "개발자 커뮤니티 & 실시간 소통",
    url: "https://discord.gg",
    tag: "CHAT",
    tagColor: "bg-[#3d4f97] text-[#9fbee7]",
  },
];

/** 이메일 연락처 */
export const contactEmail = "heewon.jung.dev@gmail.com";

/** 기술 스택 칩 목록 */
export const techSpecs = [
  "Next.js",
  "TypeScript",
  "React 19",
  "Tailwind CSS",
  "Figma",
];
