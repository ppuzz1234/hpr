import { useNavigate } from "react-router-dom";
import BrandMark from "../components/BrandMark.jsx";

/* 유저 타입 선택 — 투자자 / 운용사 2분류, 상하 2개 대형 영역으로 배치.
   투자자 → 개인투자(HNW)/법인투자 분기 선택 화면으로 이동
   운용사 → 판매 펀드·고객 현황·AI 보고서 콘솔(대시보드)로 이동 */
const TYPES = [
  {
    key: "investor", tag: "Investor", title: "투자자",
    desc: "개인 자산가 또는 법인으로서 검증된 운용사(GP)의 펀드·SPV에 출자하고 싶어요",
    to: "/investor-type", icon: "investor",
  },
  {
    key: "manager", tag: "Manager", title: "운용사",
    desc: "내가 결성한 펀드를 판매하고, 투자자 현황과 포트폴리오 보고를 관리하고 싶어요",
    to: "/gp/dashboard", icon: "manager",
  },
];

export default function UserType() {
  const navigate = useNavigate();

  return (
    <div className="onb">
      <div className="onb-inner">
        <header className="ut-head">
          <div className="splash-mark sm"><BrandMark size={24} /></div>
          <h1 className="ut-title">PLUS Babell에서<br />어떤 역할로 참여하시겠어요?</h1>
        </header>

        <div className="ut-big-list">
          {TYPES.map((t) => (
            <button key={t.key} className="ut-big-card" onClick={() => navigate(t.to)}>
              <span className="ut-big-ic">{ICONS[t.icon]}</span>
              <span className="ut-tag">{t.tag}</span>
              <strong>{t.title}</strong>
              <span className="ut-big-desc">{t.desc}</span>
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
  // 투자자 — 금고
  investor: (
    <svg viewBox="0 0 24 24" width="30" height="30" {...S}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 9.5v5M9.5 12h5" />
    </svg>
  ),
  // 운용사 — 분배/네트워크
  manager: (
    <svg viewBox="0 0 24 24" width="30" height="30" {...S}>
      <circle cx="12" cy="5" r="2.4" />
      <circle cx="5" cy="18" r="2.4" />
      <circle cx="19" cy="18" r="2.4" />
      <path d="M11 7 6.5 15.8M13 7l4.5 8.8" />
    </svg>
  ),
};
