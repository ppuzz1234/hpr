import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

/* 타입별 가설 랜딩 — AngelList(syndicate/SPV 모델)를 PPR 톤으로 재해석.
   LP(출자자) · GP(운용사) · Angel(엔젤) 각각 첫 화면이 상이하다.
   (Institution 은 별도 기업검색 흐름 → /institution/search) */
const LANDINGS = {
  lp: {
    eyebrow: "LIMITED PARTNER · 기관 출자자",
    title: "검증된 운용사의 딜에,\n출자자로 입장하세요.",
    sub: "당신은 딜을 고르지 않습니다 — 최상위 운용사(GP)를 고릅니다. 800+ 운용사가 결성한 SPV에 출자자로 동반 참여해 단일 가문으로는 닿기 어려운 라운드에 접근합니다.",
    accent: "var(--mint)",
    stats: [
      { n: "800+", l: "결성 운용사(GP)" },
      { n: "38,000", l: "동반 출자 LP" },
      { n: "$3.6B", l: "누적 집행" },
      { n: "190", l: "유니콘 배출" },
    ],
    features: [
      { ic: "◈", t: "펀드 · SPV 액세스", d: "GP 초대 기반 폐쇄 라운드에 출자자로 참여" },
      { ic: "▤", t: "포트폴리오 분산", d: "Access Fund 형 간접분산으로 상위 10% SPV에 노출" },
      { ic: "✓", t: "출자 약정 관리", d: "캐피털 콜·DPI·IRR 을 한 화면에서 추적" },
      { ic: "⚖", t: "전문투자자 한정", d: "검증된 적격 출자자만 입장하는 폐쇄형 구조" },
    ],
    cta: "출자 딜룸 입장",
  },
  gp: {
    eyebrow: "GENERAL PARTNER · 펀드 운용사",
    title: "당신의 딜을,\n신디케이트로 결집하세요.",
    sub: "펀드 없이도 운용사가 됩니다. 딜 문서화부터 투자 후 관리까지 자동화된 SPV로 팔로워 LP의 자본을 모으고, 성과보수(캐리)로 트랙레코드를 쌓습니다.",
    accent: "var(--violet)",
    stats: [
      { n: "10,000+", l: "연간 결성 SPV" },
      { n: "30/일", l: "신규 SPV 생성" },
      { n: "최대 99인", l: "SPV 출자자 한도" },
      { n: "20%", l: "표준 캐리" },
    ],
    features: [
      { ic: "+", t: "SPV 즉시 설정", d: "딜 1건 = SPV 1개, 설정비 단일 정액으로 결성" },
      { ic: "◇", t: "팔로워 LP 모집", d: "'GP를 위한 소셜' — 팔로워에게 딜 초대 발송" },
      { ic: "₩", t: "캐리 정산", d: "성과보수 자동 계산·분배 및 공동 GP 분할" },
      { ic: "▸", t: "집행 자동화", d: "문서·클로징·투자 후 관리까지 원클릭" },
    ],
    cta: "운용사 콘솔 입장",
  },
  angel: {
    eyebrow: "ANGEL · 엔젤 투자자",
    title: "최소 $1,000으로,\n50개 딜에 분산하세요.",
    sub: "엔젤 투자의 알파는 '종목 선택'이 아니라 '최대 노출'입니다. 매일 도착하는 딜 초대 피드에서 소액으로 수십 개 SPV에 인덱싱해 초기 라운드 포트폴리오를 구축합니다.",
    accent: "var(--amber)",
    stats: [
      { n: "$1,000", l: "최소 참여액" },
      { n: "5–10/일", l: "수신 딜 초대" },
      { n: "45+", l: "권장 신디케이트" },
      { n: "0%", l: "초기 SPV 운용보수" },
    ],
    features: [
      { ic: "✦", t: "딜 초대 피드", d: "팔로우한 GP가 보내는 라운드를 실시간 수신" },
      { ic: "▦", t: "소액 분산 인덱싱", d: "한 딜당 소액, 다수 딜로 손실 확률 분산" },
      { ic: "⇄", t: "공동 GP 동반투자", d: "수퍼 신디케이터의 딜에 follow-on 참여" },
      { ic: "★", t: "세컨더리 유니콘", d: "후기 단계 유니콘 지분 세컨더리 접근" },
    ],
    cta: "엔젤 피드 입장",
  },
};

export default function Welcome() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { enter, setUserType } = useApp();
  const cfg = LANDINGS[type];

  if (!cfg) return <Navigate to="/welcome" replace />;

  const onEnter = () => {
    setUserType(type);
    enter();
    navigate("/", { replace: true });
  };

  return (
    <div className="onb scroll">
      <div className="onb-inner welcome">
        <button className="onb-back" onClick={() => navigate("/welcome")}>‹ 역할 다시 선택</button>

        <div className="wl-hero" style={{ "--acc": cfg.accent }}>
          <div className="view-eyebrow" style={{ color: cfg.accent }}>{cfg.eyebrow}</div>
          <h1 className="wl-title">{cfg.title.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</h1>
          <p className="wl-sub">{cfg.sub}</p>
        </div>

        <div className="wl-stats">
          {cfg.stats.map((s) => (
            <div className="wl-stat" key={s.l}>
              <div className="n" style={{ color: cfg.accent }}>{s.n}</div>
              <div className="l">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="wl-feats">
          {cfg.features.map((f) => (
            <div className="wl-feat" key={f.t}>
              <span className="wl-feat-ic" style={{ color: cfg.accent }}>{f.ic}</span>
              <div>
                <strong>{f.t}</strong>
                <p>{f.d}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary btn-block wl-cta" onClick={onEnter}>{cfg.cta} →</button>
      </div>
    </div>
  );
}
