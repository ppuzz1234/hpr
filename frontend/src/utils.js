// 금액 포맷 (억/조) — 법인·펀드 스케일
export const won = (n) =>
  n >= 10000 ? Number((n / 10000).toFixed(2)) + "조" : n.toLocaleString() + "억";

// 금액 포맷 (만원/억) — 개인투자(HNW) 스케일
export const manwon = (n) =>
  n >= 10000 ? Number((n / 10000).toFixed(1)) + "억" : n.toLocaleString() + "만원";

// 내비게이션 설정
export const NAV = [
  { group: "게이트웨이" },
  { to: "/", ic: "◈", label: "Barbell", end: true },
  { group: "자산이전 여정" },
  { to: "/step1", ic: "①", label: "진단 · 시뮬레이터", step: "STEP 1" },
  { to: "/step2", ic: "②", label: "비히클 설립", step: "STEP 2" },
  { to: "/step3", ic: "③", label: "한화 디지털 딜룸", step: "STEP 3" },
  { group: "코어 모듈" },
  { to: "/dual", ic: "⇄", label: "메인-승계 듀얼 시뮬레이터" },
  { to: "/bridge", ic: "✈", label: "글로벌 자산이전 브릿지" },
  { to: "/singapore", ic: "◉", label: "싱가포르 라이선스 허브" },
];

export const STEPS = [
  { to: "/step1", label: "진단" },
  { to: "/step2", label: "비히클 설립" },
  { to: "/step3", label: "딜룸 집행" },
];

export const BOTTOM = [
  { to: "/", ic: "◈", label: "Room", end: true },
  { to: "/step1", ic: "①", label: "진단" },
  { to: "/step2", ic: "②", label: "비히클" },
  { to: "/step3", ic: "③", label: "딜룸" },
  { sheet: true, ic: "⋯", label: "모듈" },
];

export const MODULE_ROUTES = ["/dual", "/bridge", "/singapore"];
