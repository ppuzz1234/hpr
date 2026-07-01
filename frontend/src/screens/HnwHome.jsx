import { useNavigate } from "react-router-dom";
import { DB } from "../data.js";
import { manwon } from "../utils.js";
import { useApp } from "../context/AppContext.jsx";

/* "홈" 탭 — 인사말 + 내 포트폴리오 요약 카드 + 글로벌 투자 시의성 뉴스 */
export default function HnwHome() {
  const navigate = useNavigate();
  const { auth, hnwHoldings } = useApp();
  const name = auth.user?.name || auth.user?.nickname || "고객";

  const rows = hnwHoldings
    .map((h) => ({ ...h, deal: DB.hnwDeals.find((d) => d.id === h.dealId) }))
    .filter((r) => r.deal);
  const total = rows.reduce((s, r) => s + r.amount, 0);
  const avgReturn = rows.length ? rows.reduce((s, r) => s + r.deal.demoReturn, 0) / rows.length : 0;

  return (
    <>
      <div className="row between" style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 800 }}>{name}</div>
        <span className="hnw-bell">🔔</span>
      </div>

      <button className="card hnw-home-summary" onClick={() => navigate("/hnw/portfolio")}>
        <div className="row between">
          <div>
            <div className="tiny">내 포트폴리오</div>
            {rows.length > 0 ? (
              <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>{manwon(total)}</div>
            ) : (
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4, color: "var(--txt-2)" }}>아직 투자한 SPV가 없어요</div>
            )}
          </div>
          <div className="row" style={{ gap: 10 }}>
            {rows.length > 0 && (
              <span style={{ color: avgReturn >= 0 ? "var(--green)" : "var(--red)", fontWeight: 700, fontSize: 15 }}>
                {avgReturn >= 0 ? "+" : ""}{avgReturn.toFixed(1)}%
              </span>
            )}
            <span className="ut-caret" style={{ marginLeft: 0 }}>›</span>
          </div>
        </div>
      </button>

      <div className="view-head mt-24">
        <div className="view-eyebrow">TODAY · 글로벌 투자 소식</div>
        <div className="view-title" style={{ fontSize: 19 }}>지금 알아두면 좋은 소식</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {DB.hnwNews.map((n, i) => (
          <div className="card" key={i}>
            <div className="row between">
              <span className="tiny">{n.tag}</span>
              <span className="tiny">{n.when}</span>
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 6 }}>{n.title}</div>
          </div>
        ))}
      </div>
    </>
  );
}
