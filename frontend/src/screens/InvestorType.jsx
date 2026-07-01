import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

/* 투자자 하위 분기 — 개인투자(HNW) / 법인투자.
   각 화면은 이후 별도의 로직으로 분화될 예정이라 우선 진입 경로만 분리한다.
   개인투자 → 개인 자격 랜딩(/welcome/hnw), 법인투자 → 기존 기업 진단 검색 흐름 재사용 */
const TYPES = [
  {
    key: "hnw", tag: "Individual · HNW", title: "개인투자(HNW)",
    desc: "개인 자산가로서 검증된 펀드·SPV·클럽딜에 직접 출자하고 싶어요",
    to: "/welcome/hnw", icon: "person",
  },
  {
    key: "corp", tag: "Corporate", title: "법인투자",
    desc: "법인 자금을 진단하고 대체투자 그릇으로 이전하고 싶어요",
    to: "/institution/search", icon: "bank",
  },
];

export default function InvestorType() {
  const navigate = useNavigate();
  const { setUserType } = useApp();

  const pick = (t) => {
    if (t.key === "hnw") setUserType("hnw");
    navigate(t.to);
  };

  return (
    <div className="onb scroll">
      <div className="onb-inner">
        <button className="onb-back" onClick={() => navigate("/welcome")}>‹ 역할 다시 선택</button>

        <header className="ut-head">
          <div className="view-eyebrow">INVESTOR · 투자자</div>
          <h1 className="ut-title">어떤 자격으로<br />투자하시겠어요?</h1>
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
      </div>
    </div>
  );
}

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const ICONS = {
  // 개인투자(HNW) — 사람
  person: (
    <svg viewBox="0 0 24 24" width="26" height="26" {...S}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20c1.2-4 4.3-6 7.5-6s6.3 2 7.5 6" />
    </svg>
  ),
  // 법인투자 — 은행 건물
  bank: (
    <svg viewBox="0 0 24 24" width="26" height="26" {...S}>
      <path d="M3 9l9-5 9 5" />
      <path d="M5 9v8M9 9v8M15 9v8M19 9v8" />
      <path d="M3 20h18" />
    </svg>
  ),
};
