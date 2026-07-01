import { DB } from "../data.js";
import { manwon } from "../utils.js";
import { useApp } from "../context/AppContext.jsx";
import { Area } from "../components/Charts.jsx";

export default function HnwPortfolio() {
  const { hnwHoldings, openModal } = useApp();

  const rows = hnwHoldings
    .map((h, idx) => ({ ...h, idx, deal: DB.hnwDeals.find((d) => d.id === h.dealId) }))
    .filter((r) => r.deal);
  const total = rows.reduce((s, r) => s + r.amount, 0);
  const feed = rows.flatMap((r) => r.deal.history.map((h) => ({ ...h, dealName: r.deal.name })));

  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">INDIVIDUAL · 내 포트폴리오</div>
        <div className="view-title">내 SPV 투자 자산</div>
        <div className="view-sub">보유 중인 SPV 지분과 최신 소식을 한눈에 확인하세요.</div>
      </div>

      <div className="card glow">
        <div className="card-head"><div className="card-title">총 투자 자산</div><span className="card-tag">{rows.length}건 보유</span></div>
        <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>{manwon(total)}</div>
        <Area data={[100, 102, 99, 104, 108, 105, 110, 113, 109, 115, 118, total ? 114 : 100]} h={110} />
      </div>

      {rows.length === 0 ? (
        <div className="card mt-16"><p className="muted">아직 투자한 SPV가 없습니다. 딜 홈에서 투자할 곳을 찾아보세요.</p></div>
      ) : (
        <div className="card mt-16">
          <div className="card-title">보유 SPV 지분</div>
          {rows.map((r) => (
            <div key={r.idx} className="row between" style={{ padding: "12px 0", borderTop: "1px solid var(--line-soft)" }}>
              <div>
                <strong style={{ fontSize: 13.5 }}>{r.deal.name}</strong>
                <div className="tiny">{manwon(r.amount)} 투자</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                <span style={{ color: r.deal.demoReturn >= 0 ? "var(--green)" : "var(--red)", fontWeight: 700 }}>
                  {r.deal.demoReturn >= 0 ? "+" : ""}{r.deal.demoReturn}%
                </span>
                <button className="btn btn-line btn-sm" onClick={() => openModal(<HnwExitModal r={r} />)}>매도</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {feed.length > 0 && (
        <div className="card mt-16">
          <div className="card-title">AI 브리핑</div>
          {feed.map((f, i) => (
            <div key={i} style={{ padding: "10px 0", borderTop: i > 0 ? "1px solid var(--line-soft)" : "none" }}>
              <div className="tiny">{f.dealName} · {f.when}</div>
              <p style={{ fontSize: 12.5, margin: "4px 0 0", color: f.tone === "warn" ? "var(--amber)" : f.tone === "up" ? "var(--green)" : "var(--txt)" }}>{f.text}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ---------------- 매도 모달 — 즉시매도 vs 대기 비교 + 세금 정리 ---------------- */
function HnwExitModal({ r }) {
  const { closeModal, toast, exitHolding } = useApp();
  const now = Math.round(r.amount * (1 + r.deal.demoReturn / 100));
  const later = Math.round(now * 1.15); // 대기 시 가정치 (확정 아님)
  const gain = Math.max(0, now - r.amount);
  const tax = Math.round(gain * 0.22);
  const netNow = now - tax;

  const confirm = () => {
    exitHolding(r.idx);
    closeModal();
    toast({
      title: "매도 신청 접수", icon: "✓",
      body: `${r.deal.name} SPV 지분 매도 신청이 접수되었습니다. 세후 예상 수령액은 ${manwon(netNow)}입니다.`,
    });
  };

  return (
    <>
      <div className="view-eyebrow">SPV 지분 매도 · {r.deal.name}</div>
      <h3 style={{ marginTop: 8 }}>지금 매도할까요, 기다릴까요?</h3>
      <p className="muted mt-8">SPV 지분 매도는 회사 동의 절차가 포함될 수 있어 체결까지 시간이 걸릴 수 있어요.</p>

      <div className="grid g-2 mt-16">
        <div className="metric"><div className="label">지금 매도(세후)</div><div className="value mint">{manwon(netNow)}</div><div className="delta">세금 반영</div></div>
        <div className="metric"><div className="label">6개월 대기 시(예상)</div><div className="value">{manwon(later)}</div><div className="delta">확정 아님, 변할 수 있어요</div></div>
      </div>

      <div className="card mt-16" style={{ background: "var(--panel-2)" }}>
        <div className="tiny" style={{ marginBottom: 8 }}>세금 정리</div>
        <div className="row between"><span className="muted" style={{ fontSize: 12.5 }}>매도 차익</span><span>{manwon(gain)}</span></div>
        <div className="row between mt-8"><span className="muted" style={{ fontSize: 12.5 }}>양도소득세(약 22%)</span><span style={{ color: "var(--red)" }}>-{manwon(tax)}</span></div>
      </div>

      <button className="btn btn-primary btn-block mt-24" onClick={confirm}>매도 신청</button>
    </>
  );
}
