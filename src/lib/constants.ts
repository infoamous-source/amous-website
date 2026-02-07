// 네비게이션 링크 (3개 카테고리 재편)
export const NAV_LINKS = [
  { label: "회사 소개", href: "#about" },
  {
    label: "교육 서비스",
    href: "#services",
    children: [
      { label: "이주민·유학생", href: "/services/immigrant" },
      { label: "중장년·시니어", href: "/services/senior" },
      { label: "취업·직무 역량강화", href: "/services/career" },
    ],
  },
  { label: "협업 사례", href: "/cases" },
  {
    label: "블로그",
    href: "https://blog.naver.com/amous_edu",
    external: true,
  },
  {
    label: "계열사",
    href: "#affiliates",
    children: [
      { label: "에이머스스튜디오", href: "#affiliates" },
      { label: "에이머스이벤트", href: "#affiliates" },
    ],
  },
];

// 교육 서비스 (3개 카테고리 - Supabase fallback)
export const SERVICES = [
  {
    id: 1,
    slug: "immigrant",
    title: "이주민·유학생",
    subtitle: "한국 정착의 첫걸음",
    description:
      "한국어 교육부터 문화 적응, 취업 준비까지. 이주민과 유학생이 한국 사회에 성공적으로 정착할 수 있도록 맞춤형 교육을 제공합니다.",
    icon: "globe",
    color: "from-blue-500 to-cyan-400",
    page_content: "",
    sort_order: 0,
  },
  {
    id: 2,
    slug: "senior",
    title: "중장년·시니어",
    subtitle: "인생 2막의 시작",
    description:
      "풍부한 경험을 새로운 역량으로. 디지털 리터러시, 재취업 교육, 사회 참여 프로그램을 통해 활기찬 시니어 라이프를 설계합니다.",
    icon: "heart",
    color: "from-emerald-500 to-teal-400",
    page_content: "",
    sort_order: 1,
  },
  {
    id: 3,
    slug: "career",
    title: "취업·직무 역량강화",
    subtitle: "꿈을 현실로",
    description:
      "면접·스피치·자기소개서 코칭부터 커리어 설계까지. 현직 아나운서 출신 전문가의 실전 노하우로 취업 성공률을 높입니다.",
    icon: "rocket",
    color: "from-violet-500 to-purple-400",
    page_content: "",
    sort_order: 2,
  },
];

export const STATS = [
  { label: "교육 수료생", value: 15000, suffix: "+" },
  { label: "기업 파트너", value: 120, suffix: "+" },
  { label: "교육 프로그램", value: 50, suffix: "+" },
  { label: "교육 만족도", value: 98, suffix: "%" },
];

export const AFFILIATES = [
  {
    name: "에이머스스튜디오",
    nameEn: "AMOUS Studio",
    description:
      "공간에 생명을 담는 AMOUS STUDIO. 건축과 디자인에 감각적 스토리텔링을 더해, 단순한 도면을 넘어 사람들의 감정과 시간을 담아내는 시각화를 만듭니다.",
    features: ["건축 CG · 3D 투시도", "시네마틱 렌더링", "아이소메트릭 다이어그램", "분양용 투시도 · 광역조감도"],
    icon: "building",
  },
  {
    name: "에이머스이벤트",
    nameEn: "AMOUS Event",
    description:
      "실전 행사 기획과 운영의 전문가. 기업 세미나, 컨퍼런스, 교육 행사를 기획부터 현장 운영까지 토탈 솔루션을 제공합니다.",
    features: ["기업 세미나/컨퍼런스", "교육 행사 기획", "MC/사회 진행", "현장 운영 관리"],
    icon: "calendar",
  },
];

export const CONTACT_FIELDS = [
  "이주민·유학생 교육",
  "중장년·시니어 교육",
  "취업·직무 역량강화",
  "행사 기획",
  "건축 CG/시각화",
  "기타",
];

export const SERVICE_CATEGORIES = [
  { slug: "immigrant", label: "이주민·유학생" },
  { slug: "senior", label: "중장년·시니어" },
  { slug: "career", label: "취업·직무 역량강화" },
];
