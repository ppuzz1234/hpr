import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { DB } from "../data.js";
import { won, manwon } from "../utils.js";
import { useApp } from "../context/AppContext.jsx";

export default function HnwDealDetail() {
  const { id } = useParams();
  const deal = DB.hnwDeals.find((d) => d.id === id);
  const { hnwHoldings, openModal } = useApp();
  const holding = hnwHoldings.find((h) => h.dealId === id);

  if (!deal) return <Navigate to="/hnw" replace />;

  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">{deal.tag} · {deal.sector}</div>
        <div className="view-title">{deal.name}</div>
        <div className="view-sub">{deal.desc}</div>
      </div>

      <div className="card" style={{ background: "var(--panel-2)" }}>
        <div className="status-line">
          <span className="led a" />
          {deal.name} 주식을 직접 보유하는 것이 아니라, {deal.name} 지분을 담은 단일 종목 SPV의 지분을 취득하는 구조입니다.
        </div>
      </div>

      <div className="grid g-2 mt-16">
        <div className="metric"><div className="label">기업가치</div><div className="value">{won(deal.valuation)}</div></div>
        <div className="metric"><div className="label">최소 투자금</div><div className="value mint">{manwon(deal.minInvest)}</div></div>
      </div>

      {holding && (
        <div className="card mt-16">
          <div className="card-head">
            <div className="card-title">진행 상황</div>
            <span className="card-tag">{manwon(holding.amount)} 투자</span>
          </div>
          <div className="build-step done"><div className="no">✓</div><div><h5>계약 체결 · 전자서명 완료</h5><p>SPV 지분 취득 계약이 체결되었습니다</p></div></div>
          <div className="build-step"><div className="no">2</div><div><h5>송금 확인 · 환전 중</h5><p>영업일 기준 1~3일 소요돼요</p></div></div>
          <div className="build-step"><div className="no">3</div><div><h5>SPV 지분 취득 완료</h5><p>완료되면 포트폴리오에서 알려드려요</p></div></div>
        </div>
      )}

      <div className="card mt-16">
        <div className="card-title">투자 구조</div>
        {deal.structureSteps.map((s, i) => (
          <div className="build-step" key={i}><div className="no">{i + 1}</div><div><h5>{s}</h5></div></div>
        ))}
      </div>

      <DealQA deal={deal} />

      {!holding && (
        <button className="btn btn-primary btn-block mt-24" onClick={() => openModal(<HnwInvestModal deal={deal} />)}>
          투자 진행하기 →
        </button>
      )}
    </>
  );
}

/* ---------------- AI에게 물어보기 (Step1 어드바이저 채팅의 축소판) ---------------- */
function DealQA({ deal }) {
  const [messages, setMessages] = useState([]);
  const [asked, setAsked] = useState([]);

  const ask = (q) => {
    setAsked((s) => [...s, q]);
    setMessages((m) => [...m, { text: q, me: true }]);
    setTimeout(() => setMessages((m) => [...m, { text: deal.qa[q], me: false }]), 400);
  };

  const remaining = Object.keys(deal.qa).filter((q) => !asked.includes(q));

  return (
    <div className="card mt-16">
      <div className="card-head">
        <div className="card-title">AI에게 물어보기</div>
        <span className="card-tag">{deal.name} Q&A</span>
      </div>
      {messages.length > 0 && (
        <div className="chat" style={{ marginBottom: 14 }}>
          {messages.map((msg, i) => (
            <div key={i} className={"bubble " + (msg.me ? "me" : "them")}>{msg.text}</div>
          ))}
        </div>
      )}
      {remaining.length > 0 && (
        <div className="quick-q" style={{ marginTop: 0 }}>
          {remaining.map((q) => <span key={q} className="chip" onClick={() => ask(q)}>{q}</span>)}
        </div>
      )}
    </div>
  );
}

/* ---------------- 투자 모달 — 시뮬레이터 + 화상상담 고지 + 전자서명 ---------------- */
function HnwInvestModal({ deal }) {
  const { closeModal, toast, invest } = useApp();
  const [amt, setAmt] = useState(deal.minInvest);
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(false);
  const ready = c1 && c2;

  const before = amt * 3; // toy 3배 성장 가정 (실제 결과와 무관한 예시)
  const tax = Math.round(before * 0.22);
  const after = before - tax;

  const confirm = () => {
    invest(deal.id, amt);
    closeModal();
    toast({
      title: "전자서명 완료 · 투자 확정", icon: "✍",
      body: `${deal.name} SPV에 ${manwon(amt)} 투자가 체결되었습니다. 송금 확인 후 지분 취득까지 진행 상황을 딜 상세 화면에서 추적할 수 있습니다.`,
    });
  };

  return (
    <>
      <div className="view-eyebrow">SPV 투자 · {deal.name}</div>
      <h3 style={{ marginTop: 8 }}>투자금을 정해주세요</h3>
      <p className="muted mt-8">화상 상담으로 안내드린 SPV 구조와 손실 위험을 다시 한번 확인해 주세요.</p>

      <div className="slider-row mt-24">
        <div className="lab"><span>투자금</span><b>{manwon(amt)}</b></div>
        <input type="range" min={deal.minInvest} max={deal.minInvest * 10} step="500" value={amt} onChange={(e) => setAmt(+e.target.value)} />
      </div>

      <div className="card" style={{ background: "var(--panel-2)" }}>
        <div className="tiny" style={{ marginBottom: 10 }}>3배 성장 시나리오 (예시 · 실제 결과와 무관)</div>
        <div className="row between"><span className="muted" style={{ fontSize: 12.5 }}>세전 회수액</span><span>{manwon(before)}</span></div>
        <div className="row between mt-8"><span className="muted" style={{ fontSize: 12.5 }}>세금(약 22%)</span><span style={{ color: "var(--red)" }}>-{manwon(tax)}</span></div>
        <div className="divider" />
        <div className="row between"><span style={{ fontWeight: 700 }}>세후 회수액</span><span style={{ color: "var(--mint)", fontWeight: 700, fontSize: 17 }}>{manwon(after)}</span></div>
      </div>

      <div className="card mt-16">
        <label style={{ display: "flex", gap: 8, alignItems: "flex-start", cursor: "pointer" }}>
          <input type="checkbox" checked={c1} onChange={() => setC1((v) => !v)} style={{ marginTop: 2 }} />
          <span className="muted" style={{ fontSize: 12.5 }}>{deal.name} 주식을 직접 보유하는 것이 아니라 SPV 지분을 보유한다는 것을 이해했습니다</span>
        </label>
        <label style={{ display: "flex", gap: 8, alignItems: "flex-start", cursor: "pointer", marginTop: 12 }}>
          <input type="checkbox" checked={c2} onChange={() => setC2((v) => !v)} style={{ marginTop: 2 }} />
          <span className="muted" style={{ fontSize: 12.5 }}>투자금 전액 손실 가능성을 포함한 투자 위험을 설명받았습니다</span>
        </label>
      </div>

      <button
        className="btn btn-primary btn-block mt-24"
        disabled={!ready}
        onClick={confirm}
        style={{ opacity: ready ? 1 : .5, cursor: ready ? "pointer" : "not-allowed" }}
      >
        {ready ? "전자서명하고 투자 확정" : "위 항목을 모두 확인해 주세요"}
      </button>
    </>
  );
}
