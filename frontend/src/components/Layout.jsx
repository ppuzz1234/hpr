import { useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import StatusBar from "./StatusBar.jsx";
import Topbar from "./Topbar.jsx";
import BottomNav from "./BottomNav.jsx";
import Toasts from "./Toasts.jsx";
import ModalHost from "./Modal.jsx";
import { useApp } from "../context/AppContext.jsx";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const loc = useLocation();
  const { auth } = useApp();

  // 진입 게이트: 스플래시→로그인→타입선택을 거치지 않았으면 스플래시로
  if (!auth.entered) return <Navigate to="/splash" replace />;

  return (
    <div id="app">
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}
      <main className="main">
        {/* <StatusBar /> */}
        <Topbar onHamburger={() => setSidebarOpen((o) => !o)} />
        <section className="view view-anim" key={loc.pathname}>
          <Outlet />
        </section>
      </main>
      <BottomNav />
      <Toasts />
      <ModalHost />
    </div>
  );
}
