import { NavLink, Outlet, Navigate, useLocation } from "react-router-dom";
import Toasts from "./Toasts.jsx";
import ModalHost from "./Modal.jsx";
import BrandMark from "./BrandMark.jsx";
import { useApp } from "../context/AppContext.jsx";

/* 개인투자(HNW) 콘솔 — 기관 FCF 진단용 Layout(Sidebar/BottomNav)과는
   무관한 여정이라 독립된 미니 셸로 구성한다. Toasts/ModalHost는
   position:fixed 오버레이라 이 셸에서 직접 마운트해도 문제 없다. */
export default function HnwShell() {
  const { auth } = useApp();
  const loc = useLocation();

  if (!auth.entered) return <Navigate to="/splash" replace />;

  // 딜 상세(계약 서명 등 위저드 단계)에서는 화면마다 자체 헤더가 있어 상단 콘솔 라벨이 중복이라 숨긴다
  const inDealFlow = loc.pathname.startsWith("/hnw/deal/");

  return (
    <div className="hnw-shell">
      {!inDealFlow && (
        <header className="hnw-topbar">
          <div className="splash-mark sm"><BrandMark size={24} /></div>
          <span>개인투자 콘솔</span>
        </header>
      )}

      <main className="view view-anim" key={loc.pathname}>
        <Outlet />
      </main>

      <nav className="hnw-tabbar">
        <NavLink to="/hnw" end className={({ isActive }) => "hnw-tab" + (isActive ? " active" : "")}>
          <span>⌂</span>홈
        </NavLink>
        <NavLink to="/hnw/invest" className={({ isActive }) => "hnw-tab" + (isActive ? " active" : "")}>
          <span>◈</span>투자
        </NavLink>
        <NavLink to="/hnw/portfolio" className={({ isActive }) => "hnw-tab" + (isActive ? " active" : "")}>
          <span>▤</span>포트
        </NavLink>
        <NavLink to="/hnw/menu" className={({ isActive }) => "hnw-tab" + (isActive ? " active" : "")}>
          <span>☰</span>전체
        </NavLink>
      </nav>

      <Toasts />
      <ModalHost />
    </div>
  );
}
