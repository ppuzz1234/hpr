/* 백엔드 목업 데이터 — 프론트 src/data.js 와 동일 도메인.
   향후: 재무 OCR / 기업가치 평가엔진 / Tranching API / DB 로 대체 */
export const corp = {
  name: "대성홀딩스(주)",
  main: { revenue: 8420, ebitda: 1870, fcf: 642, cash: 1240, roic: 6.2 },
  succ: { name: "대성인베스트먼트", ownership: 31 },
  family: { members: 4, effTaxRate: 41.2, networth: 28600 },
};

export const advisors = [
  { id: "cathie", name: "Cathie Wood", role: "ARK Invest · CEO" },
  { id: "dalio", name: "Ray Dalio", role: "Bridgewater · Founder" },
  { id: "buffett", name: "Warren Buffett", role: "Berkshire · Chairman" },
];

export const tranches = [
  { name: "한화 차세대 UAM 인프라 펀드", cat: "Aerospace / Infra", tr: "Senior", coupon: "8.4%", maturity: "5Y", min: 50, filled: 72 },
  { name: "글로벌 데이터센터 사모대출", cat: "Digital Infra", tr: "Senior", coupon: "9.1%", maturity: "4Y", min: 30, filled: 88 },
  { name: "북미 클린에너지 ESS", cat: "Clean Energy", tr: "Mezzanine", coupon: "13.5%", maturity: "6Y", min: 40, filled: 54 },
  { name: "동남아 핀테크 그로스 에쿼티", cat: "Growth Equity", tr: "Equity", coupon: "Target 22%", maturity: "7Y", min: 60, filled: 41 },
  { name: "유럽 명품 브랜드 바이아웃", cat: "Buyout", tr: "Mezzanine", coupon: "14.2%", maturity: "6Y", min: 80, filled: 63 },
];

export const clubDeals = [
  { id: "d1", name: "스위스 정밀의료 로보틱스 인수", cat: "Healthcare Buyout", size: 4200, min: 150, commit: 68, families: 7 },
  { id: "d2", name: "한화-아람코 수소 밸류체인", cat: "Energy Transition", size: 9800, min: 300, commit: 81, families: 11 },
  { id: "d3", name: "실리콘밸리 AI 인프라 SPV", cat: "Venture / AI", size: 2600, min: 100, commit: 47, families: 5 },
];

export const fof = {
  aum: 34037, todayPnl: 2.06, todayPnlAmt: 685, irr3y: 18.37,
  allocation: [
    { k: "사모대출(Private Credit)", v: 32, amt: 10892 },
    { k: "인프라/실물", v: 24, amt: 8169 },
    { k: "바이아웃/PE", v: 18, amt: 6127 },
    { k: "그로스/벤처", v: 14, amt: 4765 },
    { k: "헤지/유동자산", v: 12, amt: 4084 },
  ],
  nav12m: [100, 103, 101, 106, 110, 108, 114, 119, 122, 127, 133, 142],
};

export const sgLicense = [
  { k: "13O Single Family Office", req: "운용자산 S$20M+", ok: true },
  { k: "13U Enhanced Tier", req: "운용자산 S$50M+ / 전문인력 3인", ok: false },
  { k: "VCC 설립 (Variable Capital)", req: "현지 이사 1인 + CSP", ok: true },
  { k: "Single FO 법인세 면제", req: "비즈니스 지출 S$200K+", ok: true },
];
