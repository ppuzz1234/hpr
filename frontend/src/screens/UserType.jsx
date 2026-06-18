import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

/* 유저 타입 선택 — LP · GP · Institution · Angel
   Institution → 기업 검색, 그 외 → 타입별 가설 랜딩 */
const TYPES = [
  {
    key: "lp", tag: "LP", title: "기관 출자자",
    desc: "검증된 운용사(GP)의 펀드·SPV에 출자자로 참여하고 싶어요",
    to: "/welcome/lp", icon: "vault",
  },
  {
    key: "gp", tag: "GP", title: "펀드 운용사",
    desc: "내 딜을 신디케이트로 만들어 자본을 결집하고 운용하고 싶어요",
    to: "/welcome/gp", icon: "fund",
  },
  {
    key: "institution", tag: "Institution", title: "기관 투자자",
    desc: "법인 자금을 진단하고 대체투자 그릇으로 이전하고 싶어요",
    to: "/institution/search", icon: "bank",
  },
  {
    key: "angel", tag: "Angel", title: "엔젤 투자자",
    desc: "소액으로 다수의 초기 딜에 분산 투자(인덱싱)하고 싶어요",
    to: "/welcome/angel", icon: "angel",
  },
];

export default function UserType() {
  const navigate = useNavigate();
  const { setUserType } = useApp();

  const pick = (t) => {
    setUserType(t.key);
    navigate(t.to);
  };

  return (
    <div className="onb scroll">
      <div className="onb-inner">
        <header className="ut-head">
          <div className="splash-mark sm">PPR</div>
          <h1 className="ut-title">PLUS Private Room에서<br />어떤 역할로 참여하시겠어요?</h1>
        </header>

        <div className="ut-list">
          {TYPES.map((t) => (
            <button key={t.key} className="ut-card" onClick={() => pick(t)}>
              <span className="ut-ic">{ICONS[t.icon]}</span>
              <span className="ut-text">
                <span className="ut-tag">{t.tag}</span>
                <strong>{t.title}</strong>
                <span className="ut-desc">{t.desc}</span>
              </span>
              <span className="ut-caret">›</span>
            </button>
          ))}
        </div>

        <p className="ut-foot">가입 이후에도 언제든 원하는 역할로 전환할 수 있어요.</p>
      </div>
    </div>
  );
}

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const ICONS = {
  // 기관 출자자 — 금고
  vault: (
    <svg viewBox="0 0 24 24" width="26" height="26" {...S}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 9.5v5M9.5 12h5" />
    </svg>
  ),
  // 펀드 운용사 — 분배/네트워크
  fund: (
    <svg viewBox="0 0 24 24" width="26" height="26" {...S}>
      <circle cx="12" cy="5" r="2.4" />
      <circle cx="5" cy="18" r="2.4" />
      <circle cx="19" cy="18" r="2.4" />
      <path d="M11 7 6.5 15.8M13 7l4.5 8.8" />
    </svg>
  ),
  // 기관 투자자 — 은행 건물
  bank: (
    <svg viewBox="0 0 24 24" width="26" height="26" {...S}>
      <path d="M3 9l9-5 9 5" />
      <path d="M5 9v8M9 9v8M15 9v8M19 9v8" />
      <path d="M3 20h18" />
    </svg>
  ),
  // 엔젤 — 날개
  angel: (
    <svg viewBox="0 0 24 24" width="26" height="26" {...S}>
      <path d="M12 12c-2.5-4-6-5-9-4 .5 4 3 7 6.5 7.5" />
      <path d="M12 12c2.5-4 6-5 9-4-.5 4-3 7-6.5 7.5" />
      <path d="M12 12v6" />
    </svg>
  ),
};
