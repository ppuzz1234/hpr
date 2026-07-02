import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { STEPS } from "../utils.js";
import { useApp } from "../context/AppContext.jsx";
import BrandMark from "./BrandMark.jsx";

export default function Topbar({ onHamburger }) {
  const loc = useLocation();
  const { company, companyId, switchCompany, companies, companyOrder } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const idx = STEPS.findIndex((s) => s.to === loc.pathname);

  return (
    <header className="topbar">
      <button className="hamburger" onClick={onHamburger} aria-label="menu">☰</button>

      <Link to="/" className="topbar-brand">
        <div className="brand-mark"><BrandMark size={20} /></div>
        <div className="bt">
          <strong>PLUS</strong>
          <span>BARBELL</span>
        </div>
      </Link>

      <div className="topbar-left">
        <div className="step-track">
          {idx < 0 ? (
            <div className="step-pill">
              <span className="num">◈</span>
              PLUS Barbell · Multi-Family Office Platform
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
        <div className="corp-wrap">
          <div className="corp-switch" onClick={() => setMenuOpen((o) => !o)}>
            {company.bi ? (
              <span className="corp-bi" style={{ background: company.bi.color, color: company.bi.fg }}>{company.bi.short}</span>
            ) : (
              <span className="corp-dot" />
            )}
            <span className="corp-name">{company.name}</span>
            <span className="caret">▾</span>
          </div>
          {menuOpen && (
            <>
              <div className="corp-menu-bg" onClick={() => setMenuOpen(false)} />
              <div className="corp-menu">
                <div className="corp-menu-label">진단 대상 법인</div>
                {companyOrder.map((id) => {
                  const c = companies[id];
                  if (!c) return null;
                  return (
                    <div
                      key={id}
                      className={"corp-menu-item" + (id === companyId ? " active" : "")}
                      onClick={() => { switchCompany(id); setMenuOpen(false); }}
                    >
                      {c.bi ? (
                        <span className="corp-bi" style={{ background: c.bi.color, color: c.bi.fg }}>{c.bi.short}</span>
                      ) : (
                        <span className="corp-dot" />
                      )}
                      <div className="corp-menu-text">
                        <strong>{c.name}</strong>
                        <span>{c.sector}</span>
                      </div>
                      {id === companyId && <span className="corp-check">✓</span>}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
