import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

/* 투자자 하위분기 랜딩 — 개인투자(HNW) 전용. 아이콘 + 제목 + 설명 + CTA만 남긴 단순 구성.
   (법인투자는 별도 기업검색 흐름 → /institution/search,
    운용사는 콘솔 대시보드 → /gp/dashboard 로 각각 분리되어 여기서 다루지 않는다) */
const LANDINGS = {
  hnw: {
    icon: "bank",
    title: "해외 비상장 기업에,\n개인 자격으로 투자하세요.",
    sub: "OpenAI, Anthropic 같은 비상장 기업의 지분을 담은 SPV에 투자할 수 있는 전문투자자 전용 서비스예요.",
    accent: "var(--mint)",
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

        <div className="wl-hero" style={{ "--acc": cfg.accent, textAlign: "center" }}>
          <div className="wl-icon" style={{ color: cfg.accent }}>{ICONS[cfg.icon]}</div>
          <h1 className="wl-title">{cfg.title.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</h1>
          {cfg.sub && <p className="wl-sub">{cfg.sub}</p>}
        </div>

        <button className="btn btn-primary btn-block wl-cta mt-24" onClick={onEnter}>{cfg.cta} →</button>
        {type === "hnw" && (
          <button className="login-alt" style={{ margin: "12px auto 0", display: "block" }} onClick={() => navigate("/welcome/hnw/about")}>
            어떤 자격이 필요한가요?
          </button>
        )}
      </div>
    </div>
  );
}

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const ICONS = {
  bank: (
    <svg viewBox="0 0 24 24" width="30" height="30" {...S}>
      <path d="M3 9l9-5 9 5" />
      <path d="M5 9v8M9 9v8M15 9v8M19 9v8" />
      <path d="M3 20h18" />
    </svg>
  ),
};
