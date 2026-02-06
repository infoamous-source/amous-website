export const NAV_LINKS = [
  { label: "회사 소개", href: "#about" },
  {
    label: "교육 서비스",
    href: "#services",
    children: [
      { label: "이주민/유학생", href: "#services" },
      { label: "중장년/실버", href: "#services" },
      { label: "청년", href: "#services" },
      { label: "아동/청소년", href: "#services" },
      { label: "기업", href: "#services" },
    ],
  },
  { label: "강사진 소개", href: "#instructors" },
  { label: "협업 사례", href: "#cases" },
  { label: "블로그", href: "#blog" },
  {
    label: "계열사",
    href: "#affiliates",
    children: [
      { label: "에이머스스튜디오", href: "#affiliates" },
      { label: "에이머스이벤트", href: "#affiliates" },
    ],
  },
];

export const SERVICES = [
  {
    id: "immigrant",
    title: "이주민/유학생",
    subtitle: "한국 정착의 첫걸음",
    description:
      "한국어 교육부터 문화 적응, 취업 준비까지. 이주민과 유학생이 한국 사회에 성공적으로 정착할 수 있도록 맞춤형 교육을 제공합니다.",
    icon: "globe",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "senior",
    title: "중장년/실버",
    subtitle: "인생 2막의 시작",
    description:
      "풍부한 경험을 새로운 역량으로. 디지털 리터러시, 재취업 교육, 사회 참여 프로그램을 통해 활기찬 시니어 라이프를 설계합니다.",
    icon: "heart",
    color: "from-emerald-500 to-teal-400",
  },
  {
    id: "youth",
    title: "청년",
    subtitle: "꿈을 현실로",
    description:
      "면접·스피치·자기소개서 코칭부터 커리어 설계까지. 아나운서 출신 전문가의 실전 노하우로 취업 성공률을 높입니다.",
    icon: "rocket",
    color: "from-violet-500 to-purple-400",
  },
  {
    id: "children",
    title: "아동/청소년",
    subtitle: "미래의 리더를 키우다",
    description:
      "발표력, 리더십, 커뮤니케이션 능력을 키우는 체계적인 프로그램. 자신감 있는 표현력으로 아이들의 가능성을 열어줍니다.",
    icon: "star",
    color: "from-amber-500 to-orange-400",
  },
  {
    id: "corporate",
    title: "기업",
    subtitle: "조직의 성장 파트너",
    description:
      "임직원 커뮤니케이션, 프레젠테이션, 리더십 교육. 기업 맞춤형 솔루션으로 조직의 역량을 한 단계 끌어올립니다.",
    icon: "building",
    color: "from-rose-500 to-pink-400",
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
  "이주민/유학생 교육",
  "중장년/실버 교육",
  "청년 취업 코칭",
  "아동/청소년 교육",
  "기업 교육",
  "건축 CG/시각화",
  "행사 기획",
  "기타",
];
