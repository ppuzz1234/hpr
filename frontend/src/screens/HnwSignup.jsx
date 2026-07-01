import { useNavigate } from "react-router-dom";

/* 전문투자자 자격 확인 방법 선택 — 어떤 방법을 골라도 본인인증으로 이어진다 */
const OPTIONS = [
  {
    key: "linked", tag: "가장 빠름", title: "다른 증권사에 이미 등록되어 있어요",
    desc: "타 증권사 전문투자자 등록 정보를 연동해 즉시 확인해요", icon: "flash",
  },
  {
    key: "docs", tag: "1~2 영업일", title: "서류를 제출할게요",
    desc: "잔고증명서 등 요건 서류를 업로드하면 심사 후 안내드려요", icon: "doc",
  },
  {
    key: "video", tag: "15분 · 오늘 가능", title: "화상으로 상담받을게요",
    desc: "담당 어드바이저와 화상으로 요건과 투자 구조를 확인해요", icon: "video",
  },
];

export default function HnwSignup() {
  const navigate = useNavigate();

  return (
    <div className="onb scroll">
      <div className="onb-inner">
        <button className="onb-back" onClick={() => navigate("/welcome/hnw")}>‹ 뒤로</button>

        <header className="ut-head">
          <div className="view-eyebrow">INDIVIDUAL · 자격 확인</div>
          <h1 className="ut-title">어떤 방법이<br />편하신가요?</h1>
        </header>

        <div className="ut-list">
          {OPTIONS.map((o) => (
            <button key={o.key} className="ut-card" onClick={() => navigate("/welcome/hnw/identity")}>
              <span className="ut-ic">{ICONS[o.icon]}</span>
              <span className="ut-text">
                <span className="ut-tag">{o.tag}</span>
                <strong>{o.title}</strong>
                <span className="ut-desc">{o.desc}</span>
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
  flash: (
    <svg viewBox="0 0 24 24" width="24" height="24" {...S}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" width="24" height="24" {...S}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M9 13h6M9 17h6" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" width="24" height="24" {...S}>
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  ),
};
