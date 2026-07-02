import { useApp } from "../context/AppContext.jsx";

/* "전체" 탭 — 개인 설정 및 전체 메뉴. 역할 변경은 기존 기능 유지 */
const MENU = [
  "알림 설정",
  "결제 · 계좌 관리",
  "약관 및 정책",
  "고객센터",
];

export default function HnwMenu() {
  const { reset, auth, theme, setTheme } = useApp();
  const name = auth.user?.name || auth.user?.nickname || "고객";

  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">INDIVIDUAL · 전체</div>
        <div className="view-title">{name}님</div>
      </div>

      <div className="card">
        <div className="card-title">화면 테마</div>
        <div className="theme-toggle">
          <button className={"theme-opt" + (theme === "light" ? " active" : "")} onClick={() => setTheme("light")}>
            ☀ 라이트
          </button>
          <button className={"theme-opt" + (theme === "dark" ? " active" : "")} onClick={() => setTheme("dark")}>
            ☾ 다크
          </button>
        </div>
      </div>

      <div className="card mt-16">
        {MENU.map((m, i) => (
          <div key={m} className="row between" style={{ padding: "14px 0", borderTop: i > 0 ? "1px solid var(--line-soft)" : "none" }}>
            <span style={{ fontSize: 13.5 }}>{m}</span>
            <span className="ut-caret">›</span>
          </div>
        ))}
      </div>

      {/* <button className="btn btn-line btn-block mt-16" onClick={reset}>역할 변경</button> */}
    </>
  );
}
