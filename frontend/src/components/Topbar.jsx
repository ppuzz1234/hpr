import { Link, useLocation } from "react-router-dom";
import { STEPS } from "../utils.js";
import { useApp } from "../context/AppContext.jsx";

export default function Topbar({ onHamburger }) {
  const loc = useLocation();
  const { toast } = useApp();
  const idx = STEPS.findIndex((s) => s.to === loc.pathname);

  return (
    <header className="topbar">
      <button className="hamburger" onClick={onHamburger} aria-label="menu">☰</button>

      <Link to="/" className="topbar-brand">
        <div className="brand-mark">HPR</div>
        <div className="bt">
          <strong>Hanwha</strong>
          <span>PRIVATE ROOM</span>
        </div>
      </Link>

      <div className="topbar-left">
        <div className="step-track">
          {idx < 0 ? (
            <div className="step-pill">
              <span className="num">◈</span>
              Hanwha Private Room · Multi-Family Office Platform
            </div>
          ) : (
            STEPS.map((s, i) => (
              <div className="step-pill-wrap" key={s.to} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div className={"step-pill " + (i < idx ? "done" : i === idx ? "active" : "")}>
                  <span className="num">{i < idx ? "✓" : i + 1}</span>
                  {s.label}
                </div>
                {i < STEPS.length - 1 && <div className="step-sep" />}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="topbar-right">
        <div className="search">
          <span>⌕</span>
          <input placeholder="딜·자산·법인 검색" />
        </div>
        <div
          className="corp-switch"
          onClick={() =>
            toast({ title: "법인 전환", icon: "⇄", body: "데모 환경에서는 대성홀딩스(주) 단일 법인만 활성화되어 있습니다." })
          }
        >
          <span className="corp-dot" />
          <span className="corp-name">대성홀딩스(주)</span>
          <span className="caret">▾</span>
        </div>
      </div>
    </header>
  );
}
