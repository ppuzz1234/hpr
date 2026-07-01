import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

/* 투자자 하위분기 랜딩 — 개인투자(HNW) 전용.
   (법인투자는 별도 기업검색 흐름 → /institution/search,
    운용사는 콘솔 대시보드 → /gp/dashboard 로 각각 분리되어 여기서 다루지 않는다) */
const LANDINGS = {
  hnw: {
    eyebrow: "INDIVIDUAL · HNW 개인투자자",
    title: "해외 비상장 기업에,\n개인 자격으로 투자하세요.",
    sub: "OpenAI·SpaceX 같은 비상장 기업의 지분을 담은 단일 종목 SPV에 개인 자격으로 참여합니다. 전문투자자 인증 후, 소액부터 순차적으로 딜룸이 열립니다.",
    accent: "var(--mint)",
    stats: [
      { n: "5천만원~", l: "최소 참여액" },
      { n: "2건", l: "현재 모집 중인 SPV" },
      { n: "38,000", l: "동반 출자 개인투자자" },
      { n: "190", l: "유니콘 배출" },
    ],
    features: [
      { ic: "◈", t: "단일 종목 SPV 투자", d: "비상장 기업 지분을 담은 SPV의 지분을 취득" },
      { ic: "🎥", t: "화상 상담 후 계약", d: "구조·리스크 설명을 들은 뒤 전자서명으로 체결" },
      { ic: "✓", t: "진행상황 실시간 추적", d: "송금·환전·지분취득까지 단계별로 확인" },
      { ic: "⚖", t: "전문투자자 한정", d: "검증된 적격 투자자만 입장하는 폐쇄형 구조" },
    ],
    cta: "투자자격 확인하기",
    nextTo: "/welcome/hnw/signup",
  },
};

export default function Welcome() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { enter, setUserType } = useApp();
  const cfg = LANDINGS[type];

  if (!cfg) return <Navigate to="/welcome" replace />;

  const onEnter = () => {
    if (cfg.nextTo) { navigate(cfg.nextTo); return; }
    setUserType(type);
    enter();
    navigate("/", { replace: true });
  };

  return (
    <div className="onb scroll">
      <div className="onb-inner welcome">
        <button className="onb-back" onClick={() => navigate("/investor-type")}>‹ 투자자 유형 다시 선택</button>

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
        {type === "hnw" && (
          <button className="login-alt" style={{ margin: "12px auto 0", display: "block" }} onClick={() => navigate("/welcome/hnw/about")}>
            어떤 자격이 필요한가요?
          </button>
        )}
      </div>
    </div>
  );
}
