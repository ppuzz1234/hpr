import { NavLink, Outlet, Navigate, useLocation } from "react-router-dom";
import Toasts from "./Toasts.jsx";
import ModalHost from "./Modal.jsx";
import BrandMark from "./BrandMark.jsx";
import { useApp } from "../context/AppContext.jsx";

/* 개인투자(HNW) 콘솔 — 기관 FCF 진단용 Layout(Sidebar/BottomNav)과는
   무관한 여정이라 독립된 미니 셸로 구성한다. Toasts/ModalHost는
   position:fixed 오버레이라 이 셸에서 직접 마운트해도 문제 없다. */
export default function HnwShell() {
  const { auth, reset } = useApp();
  const loc = useLocation();

  if (!auth.entered) return <Navigate to="/splash" replace />;

  return (
    <div className="hnw-shell">
      <header className="hnw-topbar">
        <div className="splash-mark sm"><BrandMark size={24} /></div>
        <span>개인투자 콘솔</span>
        <button className="hnw-exit" onClick={reset}>역할 변경</button>
      </header>

      <main className="view view-anim" key={loc.pathname}>
        <Outlet />
      </main>

      <nav className="hnw-tabbar">
        <NavLink to="/hnw" end className={({ isActive }) => "hnw-tab" + (isActive ? " active" : "")}>
          <span>◈</span>딜 홈
        </NavLink>
        <NavLink to="/hnw/portfolio" className={({ isActive }) => "hnw-tab" + (isActive ? " active" : "")}>
          <span>▤</span>내 포트폴리오
        </NavLink>
      </nav>

      <Toasts />
      <ModalHost />
    </div>
  );
}
