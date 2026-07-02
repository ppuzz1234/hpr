import { NavLink, Link } from "react-router-dom";
import { NAV } from "../utils.js";
import BrandMark from "./BrandMark.jsx";

export default function Sidebar({ open, onNavigate }) {
  return (
    <aside className={"sidebar" + (open ? " open" : "")}>
      <Link to="/" className="brand" onClick={onNavigate}>
        <div className="brand-mark"><BrandMark size={22} /></div>
        <div className="brand-name">
          <strong>PLUS</strong>
          <span>Barbell</span>
        </div>
      </Link>

      <nav className="nav">
        {NAV.map((n, i) =>
          n.group ? (
            <div className="nav-group-label" key={i}>{n.group}</div>
          ) : (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              onClick={onNavigate}
              className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
            >
              <span className="ic">{n.ic}</span>
              <span>{n.label}</span>
              {n.step && <span className="step-no">{n.step}</span>}
            </NavLink>
          )
        )}
      </nav>

      <div className="sidebar-footer">
        <div className="tier-badge">
          <span className="dot" /> TOP 0.1% VERIFIED
        </div>
        <div className="advisor-mini">
          <div className="avatar">AI</div>
          <div>
            <strong>AI Wealth Advisor</strong>
            <span>실시간 대기 중</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
