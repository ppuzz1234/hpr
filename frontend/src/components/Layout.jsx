import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import StatusBar from "./StatusBar.jsx";
import Topbar from "./Topbar.jsx";
import BottomNav from "./BottomNav.jsx";
import Toasts from "./Toasts.jsx";
import ModalHost from "./Modal.jsx";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const loc = useLocation();
  return (
    <div id="app">
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
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
