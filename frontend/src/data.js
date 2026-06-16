/* ============================================================
   PLUS Private Room — Mock data layer
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
        "<b style='color:var(--txt)'>미처분이익잉여금 505억·단기금융상품 340억</b>이 연 3.2% 저수익 예치에 머물고 " +
        "투자자산은 250만원에 불과합니다. 잉여현금의 핵심 <b style='color:var(--mint)'>250억을 가족 LLC를 그릇으로 " +
        "대체투자로 이전</b>하면 연 16억+의 기회비용을 회수할 수 있습니다.",
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

export const DB = {
  companies,
  companyOrder,

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
};
