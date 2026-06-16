import { useNavigate, useLocation } from "react-router-dom";
import { BOTTOM, MODULE_ROUTES } from "../utils.js";
import { useApp } from "../context/AppContext.jsx";

export default function BottomNav() {
  const navigate = useNavigate();
  const loc = useLocation();
  const { openModal, closeModal } = useApp();

  const isActive = (item) => {
    if (item.sheet) return MODULE_ROUTES.includes(loc.pathname);
    if (item.end) return loc.pathname === "/";
    return loc.pathname === item.to;
  };

  const openSheet = () =>
    openModal(<ModuleSheet onPick={(to) => { closeModal(); navigate(to); }} />);

  return (
    <nav className="bottom-nav">
      {BOTTOM.map((item, i) => (
        <button
          key={i}
          className={"bn-item" + (isActive(item) ? " active" : "")}
          onClick={() => (item.sheet ? openSheet() : navigate(item.to))}
        >
          <span className="ic">{item.ic}</span>
          <span className="lb">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function ModuleSheet({ onPick }) {
  const items = [
    { to: "/dual", label: "⇄ 메인-승계 듀얼 시뮬레이터" },
    { to: "/bridge", label: "✈ 글로벌 자산이전 브릿지" },
    { to: "/singapore", label: "◉ 싱가포르 라이선스 허브" },
  ];
  return (
    <>
      <div className="view-eyebrow">코어 모듈</div>
      <h3 style={{ marginTop: 8 }}>전문 모듈 바로가기</h3>
      <p className="muted mt-8" style={{ fontSize: 12.5 }}>승계·이전·거점 전략 모듈로 이동합니다.</p>
      <div className="mt-16" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((it) => (
          <button key={it.to} className="btn btn-ghost btn-block" onClick={() => onPick(it.to)}>
            {it.label}
          </button>
        ))}
      </div>
    </>
  );
}
