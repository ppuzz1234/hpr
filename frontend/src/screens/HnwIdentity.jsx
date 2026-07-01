import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

/* 본인 인증 — 완료 시 앱 본체(HNW 딜 콘솔)로 입장 */
const OPTIONS = [
  { key: "phone", title: "휴대폰 본인인증으로 확인하기", icon: "phone" },
  { key: "cert", title: "공동인증서로 확인하기", icon: "cert" },
];

export default function HnwIdentity() {
  const navigate = useNavigate();
  const { setUserType, enter } = useApp();

  const confirm = () => {
    setUserType("hnw");
    enter();
    navigate("/hnw", { replace: true });
  };

  return (
    <div className="onb scroll">
      <div className="onb-inner">
        <button className="onb-back" onClick={() => navigate("/welcome/hnw/signup")}>‹ 뒤로</button>

        <header className="cs-head">
          <div className="view-eyebrow">INDIVIDUAL · 본인 인증</div>
          <h1 className="cs-title">본인 인증이 필요해요</h1>
          <p className="cs-sub">서류상 본인이 실제 신청자인지 확인하는 절차예요.</p>
        </header>

        <div className="card">
          {OPTIONS.map((o, i) => (
            <div
              key={o.key}
              onClick={confirm}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderTop: i > 0 ? "1px solid var(--line-soft)" : "none", cursor: "pointer" }}
            >
              <span className="ut-ic" style={{ width: 40, height: 40 }}>{ICONS[o.icon]}</span>
              <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600 }}>{o.title}</span>
              <span className="ut-caret">›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const ICONS = {
  phone: (
    <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  ),
  cert: (
    <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
      <circle cx="12" cy="9" r="5" />
      <path d="M8.2 13.5 7 22l5-3 5 3-1.2-8.5" />
    </svg>
  ),
};
