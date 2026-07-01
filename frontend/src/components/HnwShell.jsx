import { NavLink, Outlet, Navigate, useLocation } from "react-router-dom";
import Toasts from "./Toasts.jsx";
import ModalHost from "./Modal.jsx";
import { useApp } from "../context/AppContext.jsx";

/* 개인투자(HNW) 콘솔 — 기관 FCF 진단용 Layout(Sidebar/BottomNav)과는
   무관한 여정이라 독립된 미니 셸로 구성한다. Toasts/ModalHost는
   position:fixed 오버레이라 이 셸에서 직접 마운트해도 문제 없다. */
export default function HnwShell() {
  const { auth } = useApp();
  const loc = useLocation();

  if (!auth.entered) return <Navigate to="/splash" replace />;

  return (
    <div className="hnw-shell">
      <main className="view view-anim" key={loc.pathname}>
        <Outlet />
      </main>

      <nav className="hnw-tabbar">
        {HNW_TABS.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            className={({ isActive }) => "hnw-tab" + (isActive ? " active" : "")}
          >
            {({ isActive }) => (
              <>
                <TabIcon name={t.icon} active={isActive} />
                <span className="lb">{t.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <Toasts />
      <ModalHost />
    </div>
  );
}

const HNW_TABS = [
  { to: "/hnw", end: true, icon: "home", label: "홈" },
  { to: "/hnw/invest", icon: "diamond", label: "투자" },
  { to: "/hnw/portfolio", icon: "grid", label: "포트" },
  { to: "/hnw/menu", icon: "menu", label: "전체" },
];

/* 하단 탭 아이콘 — 미선택: 외곽선(라인) 아이콘, 선택: 색상을 채운 솔리드 아이콘.
   전체(menu)는 라인 아이콘이라 채움 없이 색상만 강조된다. */
function TabIcon({ name, active, size = 24 }) {
  const base = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true };
  const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinejoin: "round", strokeLinecap: "round" };

  if (name === "home") {
    // 외곽선/솔리드 모두 동일한 실루엣(채워졌을 때 모양)을 사용 — 채움 여부만 다름
    const home = "M12 4 3 11.4V20.5h6v-5.4h6v5.4h6V11.4z";
    return active ? (
      <svg {...base} fill="currentColor"><path d={home} /></svg>
    ) : (
      <svg {...base} {...line}><path d={home} /></svg>
    );
  }
  if (name === "diamond") {
    return active ? (
      <svg {...base} fill="currentColor"><path d="M12 3.5 20.5 12 12 20.5 3.5 12z" /></svg>
    ) : (
      <svg {...base} {...line}><path d="M12 3.5 20.5 12 12 20.5 3.5 12z" /></svg>
    );
  }
  if (name === "grid") {
    return active ? (
      <svg {...base} fill="currentColor">
        <rect x="4" y="4" width="7" height="7" rx="1.6" /><rect x="13" y="4" width="7" height="7" rx="1.6" />
        <rect x="4" y="13" width="7" height="7" rx="1.6" /><rect x="13" y="13" width="7" height="7" rx="1.6" />
      </svg>
    ) : (
      <svg {...base} {...line}>
        <rect x="4" y="4" width="7" height="7" rx="1.6" /><rect x="13" y="4" width="7" height="7" rx="1.6" />
        <rect x="4" y="13" width="7" height="7" rx="1.6" /><rect x="13" y="13" width="7" height="7" rx="1.6" />
      </svg>
    );
  }
  // menu (전체) — 라인 전용, 채움 반전 없음
  return <svg {...base} {...line}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
}
