import { useState } from "react";
import { DB } from "../data.js";
import { manwon } from "../utils.js";
import { useApp } from "../context/AppContext.jsx";
import { Area } from "../components/Charts.jsx";
import Chevron from "../components/Chevron.jsx";

/* 포트폴리오 여정 — 첨부 프로토타입 순서 그대로: 목록 → 매도 비교 → 세금 정리.
   각 단계는 별도 라우트가 아니라 이 화면 안의 내부 스테이지로 관리한다. */
export default function HnwPortfolio() {
  const { hnwHoldings } = useApp();

  // 매도 기능 — 우선 주석 처리하고 대신 보유 종목별 사업현황/재무현황/Values 정보를 노출한다.
  // 재활성화 시 아래 상태/함수와 ExitStage·TaxStage 렌더 분기를 다시 연결하면 된다.
  // const { exitHolding, toast } = useApp();
  // const [stage, setStage] = useState("list"); // list | exit | tax
  // const [target, setTarget] = useState(null);

  const rows = hnwHoldings
    .map((h, idx) => ({ ...h, idx, deal: DB.hnwDeals.find((d) => d.id === h.dealId) }))
    .filter((r) => r.deal);

  // const startExit = (r) => { setTarget(r); setStage("exit"); };
  // const finishExit = () => {
  //   exitHolding(target.idx);
  //   toast({ title: "매도 신청 접수", icon: "✓", body: `${target.deal.name} SPV 지분 매도 신청이 접수되었습니다.` });
  //   setTarget(null);
  //   setStage("list");
  // };

  // if (stage === "exit" && target) {
  //   return <ExitStage r={target} onBack={() => { setTarget(null); setStage("list"); }} onNext={() => setStage("tax")} />;
  // }
  // if (stage === "tax" && target) {
  //   return <TaxStage r={target} onDone={finishExit} />;
  // }

  return <ListStage rows={rows} />;
}

/* ---------------- S12 · 포트폴리오 목록 ---------------- */
function ListStage({ rows }) {
  const [openIdx, setOpenIdx] = useState(null);
  const total = rows.reduce((s, r) => s + r.amount, 0);
  const feed = rows.flatMap((r) => r.deal.history.map((h) => ({ ...h, dealName: r.deal.name })));

  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">INDIVIDUAL · 내 포트폴리오</div>
        <div className="view-title">내 투자 자산</div>
        <div className="view-sub">보유 중인 투자 지분과 최신 소식을 한눈에 확인하세요.</div>
      </div>

      <div className="card glow">
        <div className="card-head"><div className="card-title">총 투자 자산</div><span className="card-tag">{rows.length}건 보유</span></div>
        <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>{manwon(total)}</div>
        <Area data={[100, 102, 99, 104, 108, 105, 110, 113, 109, 115, 118, total ? 114 : 100]} h={110} />
      </div>

      {rows.length === 0 ? (
        <div className="card mt-16"><p className="muted">아직 투자한 내역이 없습니다. 딜 홈에서 투자할 곳을 찾아보세요.</p></div>
      ) : (
        <div className="card mt-16 analysis-card">
          <div className="card-title" style={{ padding: "10px 16px 0" }}>내 투자 자산</div>
          {rows.map((r) => {
            const isOpen = openIdx === r.idx;
            const analysis = r.deal.analysis;
            const current = Math.round(r.amount * (1 + r.deal.demoReturn / 100));
            const gain = current - r.amount;
            const up = r.deal.demoReturn >= 0;

            return (
              <div key={r.idx} className="analysis-sec">
                <button className="analysis-head" onClick={() => setOpenIdx(isOpen ? null : r.idx)}>
                  <span style={{ flex: 1, textAlign: "left" }}>
                    <strong style={{ fontSize: 13.5 }}>{r.deal.name}</strong>
                    <div className="tiny">{manwon(r.amount)} 투자</div>
                  </span>
                  <span style={{ color: up ? "var(--green)" : "var(--red)", fontWeight: 700, fontSize: 13 }}>
                    {up ? "+" : ""}{r.deal.demoReturn}%
                  </span>
                  <span className={"analysis-caret" + (isOpen ? " open" : "")}><Chevron dir="right" size={12} /></span>
                </button>

                <div className={"analysis-collapse" + (isOpen ? " open" : "")}>
                  <div className="analysis-collapse-inner">
                    <div className="analysis-body">
                      <div className="analysis-row">
                        <b>📌 사업 현황</b>
                        {analysis?.news ? (
                          analysis.news.slice(0, 3).map((n, i) => (
                            <p className="tiny mt-4" key={i}><span style={{ color: "var(--mint)", fontWeight: 700 }}>{n.when}</span> · {n.text}</p>
                          ))
                        ) : (
                          <p className="tiny mt-4 muted">국내외 사업·뉴스 정보를 준비 중이에요.</p>
                        )}
                      </div>

                      <div className="analysis-row">
                        <b>📊 재무 현황</b>
                        {analysis?.financials ? (
                          analysis.financials.slice(0, 3).map((f, i) => (
                            <div className="row between mt-4" key={i}>
                              <span className="tiny">{f.label}</span>
                              <span className="tiny" style={{ fontWeight: 700 }}>{f.value}</span>
                            </div>
                          ))
                        ) : (
                          <p className="tiny mt-4 muted">분기·반기 재무 리포트를 준비 중이에요.</p>
                        )}
                      </div>

                      <div className="analysis-row">
                        <b>💹 Values</b>
                        <div className="row between mt-4">
                          <span className="tiny">내 투자금</span>
                          <span className="tiny" style={{ fontWeight: 700 }}>{manwon(r.amount)}</span>
                        </div>
                        <div className="row between mt-4">
                          <span className="tiny">최근 라운드 기준 평가액</span>
                          <span className="tiny" style={{ color: up ? "var(--green)" : "var(--red)", fontWeight: 700 }}>
                            {manwon(current)} ({up ? "+" : ""}{manwon(gain)})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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

/* ---------------- S13 · 즉시매도 vs 대기 비교 ---------------- */
function ExitStage({ r, onBack, onNext }) {
  const now = Math.round(r.amount * (1 + r.deal.demoReturn / 100));
  const later = Math.round(now * 1.15); // 대기 시 가정치 (확정 아님)

  return (
    <>
      <button className="onb-back" onClick={onBack}><Chevron dir="left" /> 뒤로</button>

      <div className="view-head">
        <div className="view-eyebrow">SPV 지분 매도 · {r.deal.name}</div>
        <div className="view-title">지금 매도할까요, 기다릴까요?</div>
        <div className="view-sub">SPV 지분 매도는 회사 동의 절차가 포함될 수 있어 체결까지 시간이 걸릴 수 있어요.</div>
      </div>

      <div className="grid g-2">
        <div className="metric"><div className="label">지금 매도(세전)</div><div className="value mint">{manwon(now)}</div></div>
        <div className="metric"><div className="label">6개월 대기 시(예상)</div><div className="value" style={{ fontSize: 18 }}>{manwon(later)}</div><div className="delta">확정 아님, 변할 수 있어요</div></div>
      </div>

      <div className="card mt-16" style={{ background: "var(--panel-2)" }}>
        <div className="status-line"><span className="led a" />한 번에 다 팔지 않고 나눠 파는 것도 방법이에요. 매도에는 회사 동의 절차가 포함될 수 있어요.</div>
      </div>

      <button className="btn btn-primary btn-block mt-16" onClick={onNext}>매도 진행하기</button>
    </>
  );
}

/* ---------------- S14 · 세금 정리 ---------------- */
function TaxStage({ r, onDone }) {
  const { toast } = useApp();
  const now = Math.round(r.amount * (1 + r.deal.demoReturn / 100));
  const gain = Math.max(0, now - r.amount);
  const tax = Math.round(gain * 0.22);
  const net = now - tax;

  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">세금 정리</div>
        <div className="view-title">세금 내역이 정리됐어요</div>
      </div>

      <div className="card">
        <div className="row between" style={{ padding: "8px 0", borderBottom: "1px solid var(--line-soft)" }}>
          <span className="muted" style={{ fontSize: 12.5 }}>매도 차익</span><span>{manwon(gain)}</span>
        </div>
        <div className="row between" style={{ padding: "8px 0", borderBottom: "1px solid var(--line-soft)" }}>
          <span className="muted" style={{ fontSize: 12.5 }}>양도소득세(약 22%)</span><span style={{ color: "var(--red)" }}>-{manwon(tax)}</span>
        </div>
        <div className="row between mt-8">
          <span style={{ fontWeight: 700 }}>세후 수령액</span>
          <span style={{ color: "var(--mint)", fontWeight: 700, fontSize: 17 }}>{manwon(net)}</span>
        </div>
      </div>

      <div className="card mt-16" style={{ background: "var(--panel-2)" }}>
        <div className="status-line"><span className="led a" />이 숫자는 참고용이에요. 실제 신고는 세무사와 확인해 주세요.</div>
      </div>

      <button
        className="btn btn-line btn-block mt-16"
        onClick={() => toast({ title: "세무사 연결 요청 접수", icon: "✓", body: "담당 세무사가 곧 연락드릴 예정이에요." })}
      >
        세무사와 연결하기
      </button>
      <button className="btn btn-primary btn-block mt-8" onClick={onDone}>완료 · 포트폴리오로 돌아가기</button>
    </>
  );
}
