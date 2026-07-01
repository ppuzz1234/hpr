/* ============================================================
   PLUS Babell — Mock data layer
   회사별 진단 데이터(신고려관광·대성홀딩스) + 공통(어드바이저·딜·포트폴리오)
   향후 백엔드 API(재무 OCR / 평가엔진 / Tranching API)로 대체
   ============================================================ */

/* ---- 진단 대상 회사 ---- */
export const companies = {
  // 신고려관광㈜ — 실제 감사보고서(삼덕회계법인 제62기/2025) 기반
  shingoryeo: {
    id: "shingoryeo",
    name: "신고려관광㈜",
    short: "신고려관광",
    sector: "레저 · 회원제 골프장(컨트리클럽)",
    main: { revenue: 195, ebitda: 51, fcf: 50, idleCash: 393, retained: 505, roic: 3.2, wacc: 8.0, netMargin: 22 },
    succ: { name: "신고려레저홀딩스(가칭)", ownership: 0, cash: 0 },
    family: { members: 3, effTaxRate: 41.2, networth: 517 },
    scanLog: [
      "감사보고서 PDF 파싱 … <b class='ok'>삼덕회계법인 제62기(2025)</b> 재무제표 인식",
      "매출액 인식 … <b class='ok'>195억</b> (입장 125 · 식당 48 · 카트 17)",
      "영업이익 산정 … <b class='ok'>40.4억</b> · 영업이익률 20.7%",
      "미처분이익잉여금 … <b class='ok'>505억</b> / 단기금융상품 340억 인식",
      "투자자산 250만원 … <b class='ok'>잉여현금 사실상 미투자 감지</b>",
      "유휴현금 운용수익률 … <b class='ok'>3.2%</b> (영업외수익 12.7억 기준) 정체",
      "유휴자본 기회비용 추정 … 연 <b class='ok'>16억+</b> 상당",
      "비금융 관심사 매칭 … 레저·골프 · 부동산·리조트 · ESG",
      "AI 1-Page Executive Summary 생성 완료",
    ],
    diag: {
      oppCost: 16, idleCash: 393, deployable: 250, retained: 505, score: 76,
      keywords: ["레저·골프", "부동산·리조트", "ESG 인프라", "헬스케어"],
      comment:
        "<b style='color:var(--txt)'>신고려관광㈜</b>은 영업이익률 20%대의 초우량 컨트리클럽이지만, " +
        "<b style='color:var(--txt)'>미처분이익잉여금 505억·단기금융상품 340억</b>이 연 3.2% 저수익 예치에 머물러 있습니다. " +
        "잉여현금의 핵심 <b style='color:var(--mint)'>250억을 LLC를 그릇으로 " +
        "대체투자로 이전</b>하면 연 16억+@의 기회비용을 회수할 수 있습니다.",
      summary: [
        { label: "영업이익", value: "40.4억", delta: "영업이익률 20.7%", deltaCls: "up" },
        { label: "미처분이익잉여금", value: "505억", valueCls: "mint", delta: "단기금융상품 340억" },
        { label: "유휴현금 수익률", value: "3.2%", valueCls: "down", delta: "목표 대체수익 8% 대비 -4.8%p", deltaCls: "down" },
        { label: "유휴자본 기회비용", value: "-16억/년", valueCls: "down", delta: "투자자산 250만원", deltaCls: "down" },
      ],
    },
  },

  // 대성홀딩스㈜ — 데모용 가상 법인 (기존)
  daesung: {
    id: "daesung",
    name: "대성홀딩스㈜",
    short: "대성홀딩스",
    sector: "지주 · 에너지",
    main: { revenue: 8420, ebitda: 1870, fcf: 642, idleCash: 1240, retained: 1240, roic: 6.2, wacc: 7.4, netMargin: 11 },
    succ: { name: "대성인베스트먼트", ownership: 31, cash: 85 },
    family: { members: 4, effTaxRate: 41.2, networth: 28600 },
    scanLog: [
      "재무제표 PDF 파싱 … 손익계산서 · 재무상태표 · 현금흐름표 인식",
      "영업활동현금흐름(CFO) 추출 … <b class='ok'>+1,870억</b>",
      "잉여현금흐름(FCF) 산출 … <b class='ok'>+642억</b> / 사내 유보 1,240억",
      "투하자본이익률(ROIC) 산정 … <b class='ok'>6.2%</b> · WACC 7.4%",
      "ROIC < WACC 구간 감지 … <b class='ok'>가치파괴(EVA-) 정체구간 도출</b>",
      "유휴자본 기회비용 추정 … 연 <b class='ok'>74억</b> 손실 상당",
      "비금융 관심사 키워드 매칭 … 항공우주 · 클린에너지 · 아트테크",
      "AI 1-Page Executive Summary 생성 완료",
    ],
    diag: {
      oppCost: 74, idleCash: 1240, deployable: 880, retained: 1240, score: 71,
      keywords: ["항공우주·UAM", "클린에너지", "아트테크", "바이오 헬스케어"],
      comment:
        "<b style='color:var(--txt)'>대성홀딩스㈜</b>은 안정적 본업 현금흐름에도 불구하고 " +
        "<b style='color:var(--txt)'>잉여현금 1,240억이 6.2% 수익률에 정체</b>되어 연 74억의 기회비용이 발생 중입니다. " +
        "배당 환원 시 가문 실효세 41.2%가 적용되므로, <b style='color:var(--mint)'>가족 LLC를 그릇으로 880억을 " +
        "대체투자로 이전</b>하는 것이 최적 경로입니다.",
      summary: [
        { label: "영업현금흐름(CFO)", value: "1,870억", delta: "건전", deltaCls: "up" },
        { label: "잉여현금흐름(FCF)", value: "642억", valueCls: "mint", delta: "유휴 1,240억 포함" },
        { label: "ROIC", value: "6.2%", valueCls: "down", delta: "WACC 7.4% 하회 (-1.2%p)", deltaCls: "down" },
        { label: "기회비용", value: "-74억/년", valueCls: "down", delta: "가치파괴 구간", deltaCls: "down" },
      ],
    },
  },
};

// 우측 상단 스위처 노출 순서 — 신고려관광이 먼저
export const companyOrder = ["shingoryeo", "daesung"];
export const defaultCompanyId = "shingoryeo";

/* ============================================================
   기관 투자자(Institution) — 기업 검색 디렉터리
   회사명 또는 사업자등록번호로 검색. 데이터 연동 전 목업.
   id 가 위 companies 에 존재하면 정밀 진단 데이터를 재사용하고,
   없으면 buildCompany() 로 진단 프로필을 가설 생성한다.
   bi: 회사 브랜드 아이덴티티(모노그램 칩) — short(1~3자) · color · fg(글자색)
   ============================================================ */
export const companyDirectory = [
  // ── 지정 3개사 ──
  { id: "hanwhalife", name: "한화생명㈜",   bizno: "110-81-12345", sector: "생명보험",            bi: { short: "H", color: "#F37321", fg: "#fff" } },
  { id: "shingoryeo", name: "신고려관광㈜", bizno: "123-81-45678", sector: "레저 · 회원제 골프장", bi: { short: "신", color: "#1f9c8a", fg: "#04201b" } },
  { id: "daesung",    name: "대성홀딩스㈜", bizno: "514-81-00120", sector: "지주 · 에너지",        bi: { short: "大", color: "#C8102E", fg: "#fff" } },
  // ── 국내 10대 기업 ──
  { id: "samsung",    name: "삼성전자㈜",         bizno: "124-81-00998", sector: "반도체 · 전자",   bi: { short: "S",   color: "#1428A0", fg: "#fff" } },
  { id: "skhynix",    name: "SK하이닉스㈜",       bizno: "217-81-15304", sector: "반도체 메모리",   bi: { short: "SK",  color: "#EA002C", fg: "#fff" } },
  { id: "hyundai",    name: "현대자동차㈜",       bizno: "101-81-09147", sector: "완성차",         bi: { short: "현",  color: "#002C5F", fg: "#fff" } },
  { id: "lgensol",    name: "LG에너지솔루션㈜",   bizno: "375-87-00088", sector: "2차전지",        bi: { short: "LG",  color: "#A50034", fg: "#fff" } },
  { id: "samsungbio", name: "삼성바이오로직스㈜", bizno: "774-87-00078", sector: "바이오 CDMO",    bi: { short: "B",   color: "#1428A0", fg: "#fff" } },
  { id: "kia",        name: "기아㈜",             bizno: "119-81-02316", sector: "완성차",         bi: { short: "K",   color: "#05141F", fg: "#fff" } },
  { id: "posco",      name: "POSCO홀딩스㈜",      bizno: "506-81-00023", sector: "철강 · 지주",     bi: { short: "P",   color: "#00A0E9", fg: "#fff" } },
  { id: "naver",      name: "네이버㈜",           bizno: "220-81-62517", sector: "인터넷 플랫폼",   bi: { short: "N",   color: "#03C75A", fg: "#fff" } },
  { id: "kakao",      name: "카카오㈜",           bizno: "120-81-47521", sector: "인터넷 플랫폼",   bi: { short: "k",   color: "#FEE500", fg: "#1a1a1a" } },
  { id: "celltrion",  name: "셀트리온㈜",         bizno: "160-81-04429", sector: "바이오시밀러",   bi: { short: "C",   color: "#0F62FE", fg: "#fff" } },
];

// 문자열 → 안정적 의사난수 시드(0~1) — 검색 회사별 진단 수치를 결정적으로 생성
function seed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return ((h >>> 0) % 1000) / 1000;
}

/* 디렉터리 엔트리 → Home/STEP 화면이 요구하는 전체 진단 프로필을 가설 생성.
   (이미 companies 에 정밀 데이터가 있는 회사는 그대로 사용) */
export function buildCompany(entry) {
  if (companies[entry.id]) return companies[entry.id];

  const s = seed(entry.id);
  const revenue   = Math.round(800 + s * 9000);            // 매출(억)
  const ebitda    = Math.round(revenue * (0.14 + s * 0.12));
  const fcf       = Math.round(ebitda * (0.3 + s * 0.25));
  const retained  = Math.round(revenue * (0.6 + s * 1.4));
  const idleCash  = Math.round(retained * (0.4 + s * 0.4));
  const roic      = +(5 + s * 4).toFixed(1);
  const wacc      = +(7 + s * 1.5).toFixed(1);
  const oppCost   = Math.round(idleCash * 0.06);
  const deployable = Math.round(idleCash * (0.55 + s * 0.2));
  const score     = Math.round(64 + s * 22);
  const effTax    = 41.2;

  return {
    id: entry.id,
    name: entry.name,
    short: entry.name.replace(/[㈜()주식회사\s]/g, ""),
    sector: entry.sector,
    bi: entry.bi,
    main: { revenue, ebitda, fcf, idleCash, retained, roic, wacc, netMargin: Math.round(8 + s * 14) },
    succ: { name: entry.name.replace(/㈜.*$/, "") + " 패밀리홀딩스(가칭)", ownership: 0, cash: 0 },
    family: { members: 3 + Math.round(s * 3), effTaxRate: effTax, networth: Math.round(retained * 1.2) },
    scanLog: [
      `사업자등록번호 <b class='ok'>${entry.bizno}</b> 조회 … 법인 식별 완료`,
      `재무제표 인식 … 매출 <b class='ok'>${revenue.toLocaleString()}억</b> · EBITDA ${ebitda.toLocaleString()}억`,
      `미처분이익잉여금 … <b class='ok'>${retained.toLocaleString()}억</b> / 유휴현금 ${idleCash.toLocaleString()}억 인식`,
      `투하자본이익률(ROIC) … <b class='ok'>${roic}%</b> · WACC ${wacc}%`,
      `유휴자본 기회비용 추정 … 연 <b class='ok'>${oppCost}억</b> 상당`,
      "AI 1-Page Executive Summary 생성 완료",
    ],
    diag: {
      oppCost, idleCash, deployable, retained, score,
      keywords: ["대체투자", "사모대출", "인프라·실물", "글로벌 분산"],
      comment:
        `<b style='color:var(--txt)'>${entry.name}</b>은(는) 본업 현금흐름 대비 ` +
        `<b style='color:var(--txt)'>유휴현금 ${idleCash.toLocaleString()}억이 ${roic}% 수익률에 정체</b>되어 ` +
        `연 ${oppCost}억의 기회비용이 발생 중입니다. ` +
        `<b style='color:var(--mint)'>가족 LLC를 그릇으로 ${deployable.toLocaleString()}억을 대체투자로 이전</b>하는 것이 최적 경로입니다.`,
      summary: [
        { label: "매출액", value: `${revenue.toLocaleString()}억`, delta: `EBITDA ${ebitda.toLocaleString()}억`, deltaCls: "up" },
        { label: "미처분이익잉여금", value: `${retained.toLocaleString()}억`, valueCls: "mint", delta: `유휴현금 ${idleCash.toLocaleString()}억` },
        { label: "ROIC", value: `${roic}%`, valueCls: "down", delta: `WACC ${wacc}% 대비`, deltaCls: "down" },
        { label: "기회비용", value: `-${oppCost}억/년`, valueCls: "down", delta: "유휴자본 정체", deltaCls: "down" },
      ],
    },
  };
}

export const DB = {
  companies,
  companyOrder,
  companyDirectory,
  buildCompany,

  // STEP 1.1 글로벌 어드바이저 (photo: public/advisors/ 에 파일 추가 시 원형 사진 표시, 없으면 이니셜)
  advisors: [
    {
      id: "cathie", name: "Cathie Wood", role: "ARK Invest · CEO",
      photo: "/advisors/cathie.png",
      face: "linear-gradient(135deg,#34E0C4,#1f9c8a)", initials: "CW",
      style: "파괴적 혁신(Disruptive Innovation) 집중. 고성장 기술주·테마형 장기 베팅을 선호합니다.",
      opening: "막대한 유휴현금이 3% 예치에 묶여 가치가 침식되고 있습니다. 저라면 이 유휴자본의 상당분을 UAM·에너지저장·게놈 등 5년 CAGR 30%+ 혁신 테마에 분산 배치하겠습니다. 단기 변동성은 감내하되, 가족 LLC를 그릇으로 써서 변동성을 가문 단위로 흡수하세요.",
      qa: {
        "변동성이 너무 크지 않나요?": "맞습니다. 그래서 '법인 직접투자'가 아닌 '가족 LLC 우회 + 트랜치 분산'이 핵심입니다. 시니어 트랜치로 원금방어층을 깔고, 혁신 베팅은 에쿼티 트랜치 20% 이내로 제한하면 가문 전체 변동성은 ±9%로 통제됩니다.",
        "한국 세제와 충돌은 없나요?": "잉여금을 배당으로 빼면 41% 종합과세 폭탄을 맞습니다. 대신 가족 LLC가 법인자금을 '투자'로 받으면 과세이연이 가능합니다. STEP2 비히클 빌더에서 구조를 짜드리죠.",
        "추천 첫 딜은?": "딜룸의 '한화 차세대 UAM 인프라 펀드' 시니어 트랜치를 권합니다. 한화에어로 밸류체인 선인수 물량이라 다운사이드가 제한적입니다.",
      },
    },
    {
      id: "dalio", name: "Ray Dalio", role: "Bridgewater · Founder",
      photo: "/advisors/dalio.png",
      face: "linear-gradient(135deg,#3B82F6,#1e40af)", initials: "RD",
      style: "All-Weather. 거시 사이클·리스크 패리티 기반의 전천후 분산을 추구합니다.",
      opening: "지금은 부채 사이클 후반부입니다. 자산이 한국 원화·단일 법인의 저수익 현금에 집중된 것이 가장 큰 리스크입니다. 유휴현금의 절반은 통화·자산군·지역으로 '리스크 패리티' 분산하고, 싱가포르 거점으로 통화 헤지층을 만드세요.",
      qa: {
        "지금 진입 타이밍 맞나요?": "타이밍을 맞추려 하지 마세요. 상관관계가 낮은 자산을 동시에 들고 가는 것이 알파입니다. 매크로 스트레스 테스트(STEP2)부터 돌려 약한 고리를 찾으세요.",
        "추천 비중은?": "주식 30 · 채권/크레딧 40 · 실물(에너지·인프라) 20 · 금/대체 10. 한화 트랜치 공급망이 크레딧·인프라층을 채우기 좋습니다.",
        "환율 리스크는?": "외국환 브릿지로 100억 단위를 분할 이전하고, 싱가포르 13U로 통화 다변화 거점을 두면 원화 단일 노출이 70%→40%로 내려갑니다.",
      },
    },
    {
      id: "buffett", name: "Warren Buffett", role: "Berkshire · Chairman",
      photo: "/advisors/buffett.png",
      face: "linear-gradient(135deg,#F4B740,#b8860b)", initials: "WB",
      style: "가치투자·해자(Moat). 이해 가능한 우량 현금흐름 자산의 장기 보유를 선호합니다.",
      opening: "혁신도 좋지만, 잉여현금은 '이해되는 자산'에 들어가야 합니다. 안정적 현금흐름을 내는 인프라·우량 사모대출을 코어로 깔고, 비상장 지분은 저평가 골든타임에만 승계 법인으로 넘기세요. 지금 주식 가치는 업황 둔화로 일시적으로 싸졌습니다 — 증여 적기입니다.",
      qa: {
        "지금 승계를 해야 하나요?": "네. 평가액이 눌린 지금이 증여세 과표를 낮출 골든타임입니다. 듀얼구조 시뮬레이터로 이동 시 세부담을 먼저 확인하세요.",
        "어떤 딜을 코어로?": "딜룸의 '글로벌 인프라 시니어 사모대출' 같은 예측 가능한 현금흐름 자산. 화려하지 않지만 잠은 잘 옵니다.",
        "현금은 얼마나 남길까요?": "유사시 2년치 운영비는 항상 현금으로. 이전 가능액 중 일부는 드라이파우더로 남기세요.",
      },
    },
  ],

  // STEP3 딜룸 — Tranching 공급망
  tranches: [
    { name: "한화 차세대 UAM 인프라 펀드", cat: "Aerospace / Infra", tr: "Senior", coupon: "8.4%", maturity: "5Y", min: 50, filled: 72, color: "sr" },
    { name: "글로벌 데이터센터 사모대출", cat: "Digital Infra", tr: "Senior", coupon: "9.1%", maturity: "4Y", min: 30, filled: 88, color: "sr" },
    { name: "북미 클린에너지 ESS", cat: "Clean Energy", tr: "Mezzanine", coupon: "13.5%", maturity: "6Y", min: 40, filled: 54, color: "mz" },
    { name: "동남아 핀테크 그로스 에쿼티", cat: "Growth Equity", tr: "Equity", coupon: "Target 22%", maturity: "7Y", min: 60, filled: 41, color: "eq" },
    { name: "유럽 명품 브랜드 바이아웃", cat: "Buyout", tr: "Mezzanine", coupon: "14.2%", maturity: "6Y", min: 80, filled: 63, color: "mz" },
  ],

  // 클럽딜
  clubDeals: [
    { id: "d1", name: "스위스 정밀의료 로보틱스 인수", cat: "Healthcare Buyout", size: 4200, min: 150, commit: 68, families: 7, badge: "ANCHOR 모집", grad: "linear-gradient(135deg,#1f9c8a,#0f3d36)" },
    { id: "d2", name: "한화-아람코 수소 밸류체인", cat: "Energy Transition", size: 9800, min: 300, commit: 81, families: 11, badge: "마감임박", grad: "linear-gradient(135deg,#2a4d7a,#13243d)" },
    { id: "d3", name: "실리콘밸리 AI 인프라 SPV", cat: "Venture / AI", size: 2600, min: 100, commit: 47, families: 5, badge: "신규", grad: "linear-gradient(135deg,#5b4b9e,#241d44)" },
  ],

  // Fund of Funds 포트폴리오 (실시간 대시보드)
  fof: {
    aum: 34037, todayPnl: 2.06, todayPnlAmt: 685, irr3y: 18.37,
    allocation: [
      { k: "사모대출(Private Credit)", v: 32, amt: 10892, c: "#34E0C4" },
      { k: "인프라/실물", v: 24, amt: 8169, c: "#3B82F6" },
      { k: "바이아웃/PE", v: 18, amt: 6127, c: "#8B7CF6" },
      { k: "그로스/벤처", v: 14, amt: 4765, c: "#F4B740" },
      { k: "헤지/유동자산", v: 12, amt: 4084, c: "#46D39A" },
    ],
    funds: [
      { name: "한화 글로벌 인프라 III", type: "Infra", nav: 142.3, irr: 16.8, dpi: 0.74, status: "g" },
      { name: "북미 ESS 메자닌", type: "Credit", nav: 118.5, irr: 13.5, dpi: 0.31, status: "g" },
      { name: "동남아 핀테크 GE", type: "Growth", nav: 167.9, irr: 24.1, dpi: 0.12, status: "a" },
      { name: "유럽 럭셔리 바이아웃", type: "Buyout", nav: 131.2, irr: 19.4, dpi: 0.55, status: "g" },
      { name: "글로벌 매크로 헤지", type: "Hedge", nav: 108.7, irr: 9.2, dpi: 1.05, status: "g" },
      { name: "AI 인프라 SPV (예정)", type: "Venture", nav: 100.0, irr: 0, dpi: 0, status: "a" },
    ],
    nav12m: [100, 103, 101, 106, 110, 108, 114, 119, 122, 127, 133, 142],
  },

  // 스트레스 테스트 시나리오
  stress: [
    { k: "美 기준금리 +100bp", base: 100, shock: 94, sev: "a" },
    { k: "원/달러 1,500원 급등", base: 100, shock: 97, sev: "g" },
    { k: "글로벌 신용스프레드 +200bp", base: 100, shock: 89, sev: "r" },
    { k: "본업 업황 -20%", base: 100, shock: 91, sev: "a" },
  ],

  // 싱가포르 라이선스
  sgLicense: [
    { k: "13O Single Family Office", req: "운용자산 S$20M+", ok: true, note: "충족 — 가문 통합자산 S$ 31M" },
    { k: "13U Enhanced Tier", req: "운용자산 S$50M+ / 전문인력 3인", ok: false, note: "자산요건 미달 (현 S$31M)" },
    { k: "VCC 설립 (Variable Capital)", req: "현지 이사 1인 + CSP", ok: true, note: "얼라이언스 CSP 매칭 가능" },
    { k: "Single FO 법인세 면제", req: "비즈니스 지출 S$200K+", ok: true, note: "충족 가능 — 시뮬레이션 통과" },
  ],

  /* ============================================================
     운용사(GP) 콘솔 — 기본 구조 (목업)
     내가 판매 중인 펀드 · 펀드별 고객(가입/희망) 현황 · 포트폴리오
     기업 AI 보고서 자동화(영업보고서/심사)는 추후 세부 개발 예정
     ============================================================ */
  gpFunds: [
    {
      id: "uam", name: "한화 차세대 UAM 인프라 펀드", cat: "Aerospace / Infra",
      status: "모집중", aum: 360, target: 500,
      investors: [
        { name: "대성홀딩스㈜", type: "법인", stage: "가입완료", amount: 80 },
        { name: "신고려관광㈜", type: "법인", stage: "가입희망", amount: 30 },
        { name: "박OO 패밀리오피스", type: "개인", stage: "가입완료", amount: 20 },
        { name: "이OO 개인투자자", type: "개인", stage: "가입희망", amount: 0 },
      ],
      portfolio: [
        { id: "p1", name: "한화에어로스페이스 UAM", sector: "Aerospace", lastReport: "2026-05-30" },
        { id: "p2", name: "북미 이스캡 인프라", sector: "Infra", lastReport: null },
      ],
    },
    {
      id: "essmz", name: "북미 클린에너지 ESS 메자닌", cat: "Clean Energy",
      status: "모집중", aum: 210, target: 300,
      investors: [
        { name: "대성홀딩스㈜", type: "법인", stage: "가입희망", amount: 0 },
        { name: "이OO 개인투자자", type: "개인", stage: "가입완료", amount: 15 },
      ],
      portfolio: [
        { id: "p3", name: "텍사스 ESS 배터리 시스템", sector: "Clean Energy", lastReport: "2026-06-12" },
        { id: "p4", name: "애리조나 태양광 저장", sector: "Clean Energy", lastReport: null },
      ],
    },
    {
      id: "fintech", name: "동남아 핀테크 그로스 에쿼티", cat: "Growth Equity",
      status: "클로즈드", aum: 480, target: 480,
      investors: [
        { name: "삼성전자㈜", type: "법인", stage: "가입완료", amount: 200 },
        { name: "카카오㈜", type: "법인", stage: "가입완료", amount: 100 },
      ],
      portfolio: [
        { id: "p5", name: "자카르타 디지털 뱅킹", sector: "Fintech", lastReport: "2026-04-20" },
      ],
    },
  ],

  /* ============================================================
     개인투자(HNW) 딜 — 해외 비상장 기업 SPV 투자 (목업)
     실제로는 기업 지분을 직접 보유하는 것이 아니라, Babell이 결성한
     단일 종목 SPV(특수목적기구)의 지분을 취득하는 구조
     ============================================================ */
  hnwDeals: [
    {
      id: "openai", name: "OpenAI", tag: "AI · Series G", sector: "인공지능",
      badge: "인기", accent: "var(--mint)", icon: "✨",
      valuation: 3000000, minInvest: 5000, filled: 68, demoReturn: 12.4, roundChange: 146.2,
      desc: "차세대 파운데이션 모델을 개발하는 AI 리서치·제품 기업. 후속 라운드(Series G) 참여 물량을 SPV로 재분할합니다.",
      structureSteps: [
        "고객님이 Babell SPV에 투자금을 맡겨요",
        "SPV가 OpenAI 세컨더리 지분을 매입해요",
        "고객님은 SPV 지분을 비율대로 보유해요",
      ],
      qa: {
        "정말 OpenAI 주식을 갖게 되나요?": "아니요. OpenAI 주식은 SPV(특수목적기구)가 보유하고, 고객님은 그 SPV의 지분을 보유합니다. 법적 권리는 SPV를 통해 간접적으로 행사돼요.",
        "언제 현금화할 수 있나요?": "비상장 지분이라 상장(IPO)이나 세컨더리 매각 전까지는 유동성이 제한적이에요. 포트폴리오에서 매도 신청은 가능하지만 체결까지 시간이 걸릴 수 있습니다.",
        "손실 위험은 없나요?": "있습니다. 비상장 기업가치 평가는 확정된 게 아니라 변동될 수 있고, 최악의 경우 투자금 전액 손실도 가능합니다.",
      },
      history: [
        { when: "3일 전", text: "OpenAI가 신모델을 출시했어요. 주간 활성 사용자가 5억 명을 넘었습니다.", tone: "up" },
        { when: "2주 전", text: "직전 라운드 대비 SPV 평가가치가 소폭 상향 조정되었습니다.", tone: "up" },
      ],
    },
    {
      id: "anthropic", name: "Anthropic", tag: "AI · Series F", sector: "인공지능",
      badge: "신규", accent: "var(--violet)", icon: "🧠",
      valuation: 1830000, minInvest: 6000, filled: 55, demoReturn: 8.1, roundChange: 92.7,
      desc: "안전성 중심의 AI 모델 Claude를 개발하는 AI 리서치 기업. 최신 라운드(Series F) 참여 물량을 SPV로 재분할합니다.",
      structureSteps: [
        "고객님이 Babell SPV에 투자금을 맡겨요",
        "SPV가 Anthropic 세컨더리 지분을 매입해요",
        "고객님은 SPV 지분을 비율대로 보유해요",
      ],
      qa: {
        "정말 Anthropic 주식을 갖게 되나요?": "아니요. Anthropic 주식은 SPV(특수목적기구)가 보유하고, 고객님은 그 SPV의 지분을 보유합니다. 법적 권리는 SPV를 통해 간접적으로 행사돼요.",
        "OpenAI랑 무슨 차이가 있나요?": "둘 다 최상위 AI 모델 기업이지만 투자 라운드·기업가치·성장 곡선이 달라요. 포트폴리오 분산 차원에서 함께 담는 투자자가 많아요.",
        "손실 위험은 없나요?": "있습니다. 비상장 기업가치 평가는 확정된 게 아니라 변동될 수 있고, 최악의 경우 투자금 전액 손실도 가능합니다.",
      },
      history: [
        { when: "5일 전", text: "Anthropic이 Claude 신규 모델을 출시했어요. 기업용 계약이 크게 늘었습니다.", tone: "up" },
        { when: "3주 전", text: "신규 투자 라운드 참여 수요가 몰려 배정 물량이 조기 마감됐어요.", tone: "up" },
      ],
    },
    /* 아래 3개 종목은 EquityZen 등 세컨더리 마켓 대표 프리IPO 기업.
       기업가치·라운드는 공개 보도(2026-07 기준) 인용, accent는 각 기업 BI 컬러.
       - Stripe:     2026-02 테너오퍼 $159B (직전 $91.5B 대비 +74%) — CNBC/TechCrunch
       - Databricks: 2026-02 라운드 $134B (직전 Series K $100B 대비 +34%) — CNBC
       - Anduril:    2026-05 Series H $61B (직전 $30.5B 대비 2배) — TechCrunch/CNBC */
    {
      id: "stripe", name: "Stripe", tag: "핀테크 · Secondary", sector: "핀테크·결제",
      badge: "인기", accent: "#635BFF", icon: "💳",
      valuation: 1590000, minInvest: 7000, filled: 72, demoReturn: 9.8, roundChange: 73.8,
      desc: "온라인 결제 인프라를 제공하는 글로벌 핀테크. 2026년 2월 임직원 대상 테너오퍼에서 $159B(약 159조원) 가치로 평가된 세컨더리 물량을 SPV로 재분할합니다.",
      structureSteps: [
        "고객님이 Babell SPV에 투자금을 맡겨요",
        "SPV가 Stripe 세컨더리 지분을 매입해요",
        "고객님은 SPV 지분을 비율대로 보유해요",
      ],
      qa: {
        "Stripe는 언제 상장하나요?": "확정된 IPO 일정은 공개되지 않았어요. 상장 전까지는 테너오퍼·세컨더리 거래로만 유동성이 형성됩니다.",
        "왜 기업가치가 크게 올랐나요?": "2026년 2월 테너오퍼 기준 $159B로, 1년 전 $91.5B 대비 약 74% 상승했습니다(CNBC·TechCrunch 보도).",
        "손실 위험은 없나요?": "있습니다. 비상장 지분 평가가치는 변동될 수 있고, 최악의 경우 투자금 전액 손실도 가능합니다.",
      },
      history: [
        { when: "최근", text: "2026년 2월 테너오퍼에서 기업가치가 $159B로 1년 전($91.5B) 대비 74% 상승했습니다.", tone: "up" },
        { when: "2025년", text: "연간 총결제액(TPV)이 1.9조 달러로 전년 대비 34% 증가했습니다.", tone: "up" },
      ],
    },
    {
      id: "databricks", name: "Databricks", tag: "데이터·AI · Series K", sector: "데이터·AI 플랫폼",
      badge: "신규", accent: "#FF3621", icon: "🧱",
      valuation: 1340000, minInvest: 6500, filled: 61, demoReturn: 11.2, roundChange: 34.0,
      desc: "레이크하우스 기반 데이터·AI 플랫폼 기업. 2026년 2월 $5B 규모 펀딩에서 $134B(약 134조원) 가치로 평가된 물량을 SPV로 재분할합니다.",
      structureSteps: [
        "고객님이 Babell SPV에 투자금을 맡겨요",
        "SPV가 Databricks 세컨더리 지분을 매입해요",
        "고객님은 SPV 지분을 비율대로 보유해요",
      ],
      qa: {
        "무슨 사업을 하나요?": "데이터 저장·분석과 AI 모델 개발을 한 곳에서 처리하는 레이크하우스 플랫폼을 제공합니다. Agent Bricks·Lakebase 등으로 AI 사업을 확장 중이에요.",
        "기업가치 근거가 뭔가요?": "2026년 2월 $5B 펀딩 마감 기준 $134B로, 직전 Series K($100B) 대비 약 34% 상향됐습니다(CNBC 보도).",
        "손실 위험은 없나요?": "있습니다. 비상장 지분 평가가치는 변동될 수 있고, 최악의 경우 투자금 전액 손실도 가능합니다.",
      },
      history: [
        { when: "최근", text: "2026년 2월 $5B 펀딩을 마감하며 기업가치가 $134B로 상향(직전 $100B 대비 +34%)됐습니다.", tone: "up" },
        { when: "2025년", text: "연간 매출 런레이트 $4B를 돌파했고, AI 매출 런레이트도 $1B을 넘었습니다.", tone: "up" },
      ],
    },
    {
      id: "anduril", name: "Anduril", tag: "방위테크 · Series H", sector: "방위산업 테크",
      badge: "마감임박", accent: "#8792A6", icon: "🛡️",
      valuation: 610000, minInvest: 8000, filled: 44, demoReturn: 7.5, roundChange: 100.0,
      desc: "자율 방위 시스템과 Lattice 플랫폼을 개발하는 방위테크 기업. 2026년 5월 Series H($5B)에서 $61B(약 61조원) 가치로 직전 대비 두 배 평가된 물량을 SPV로 재분할합니다.",
      structureSteps: [
        "고객님이 Babell SPV에 투자금을 맡겨요",
        "SPV가 Anduril 세컨더리 지분을 매입해요",
        "고객님은 SPV 지분을 비율대로 보유해요",
      ],
      qa: {
        "무슨 사업을 하나요?": "드론·자율 무기 체계와 이를 통합하는 AI 소프트웨어 Lattice를 개발하는 방위산업 스타트업입니다.",
        "성장 근거가 뭔가요?": "2026년 5월 Series H($5B)에서 기업가치가 $61B로 직전($30.5B) 대비 두 배가 됐고, 미 육군 IVAS 프로그램(최대 $220억)을 인수했습니다(TechCrunch·CNBC 보도).",
        "손실 위험은 없나요?": "있습니다. 비상장 지분 평가가치는 변동될 수 있고, 방위 예산·규제 영향도 커 투자금 전액 손실이 가능합니다.",
      },
      history: [
        { when: "최근", text: "2026년 5월 Series H에서 $5B를 유치하며 기업가치가 $61B로 직전($30.5B) 대비 두 배가 됐습니다.", tone: "up" },
        { when: "2026년", text: "미 육군의 IVAS 프로그램(최대 $220억 규모) 운영을 인수했습니다.", tone: "up" },
      ],
    },
  ],

  /* 홈 탭 · 글로벌 투자 시의성 뉴스 카드 (목업) */
  hnwNews: [
    { tag: "글로벌 AI", when: "3시간 전", title: "OpenAI, 신규 모델 발표 임박 — 후속 라운드 밸류에이션 주목" },
    { tag: "매크로", when: "오늘", title: "미 연준 금리 동결 — 비상장 성장주 밸류에이션 영향은?" },
    { tag: "Anthropic", when: "1일 전", title: "Anthropic, 신규 투자 라운드 클로징 임박 소식" },
    { tag: "세컨더리", when: "2일 전", title: "빅테크 세컨더리 거래량 3분기 연속 증가" },
  ],
};
