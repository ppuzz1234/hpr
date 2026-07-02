import { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { DB } from "../data.js";
import { won, manwon } from "../utils.js";
import { useApp } from "../context/AppContext.jsx";
import Chevron from "../components/Chevron.jsx";
import BrandLoadingOverlay from "../components/BrandLoadingOverlay.jsx";

// BrandMark(animated) 로딩 한 사이클 길이(styles.css의 .bm-plate animation-duration)와 맞춘 대기 시간 — 로그인 화면과 동일
const BRAND_LOOP_MS = 3600;

/* 딜 투자 여정 — 첨부 프로토타입의 단계를 그대로 따르는 위저드.
   상세 → 구조 안내 → 시뮬레이터 → 화상상담 고지 → 화상상담 → 계약서명 → 진행상황
   각 단계는 별도 라우트가 아니라 이 화면 안의 내부 스테이지로 관리하며(뒤로가기 스택 포함),
   맨 처음 단계에서 뒤로가면 실제로 딜 리스트(/hnw/invest)로 돌아간다. */
export default function HnwDealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deal = DB.hnwDeals.find((d) => d.id === id);
  const { hnwHoldings, invest, toast } = useApp();
  const holding = deal && hnwHoldings.find((h) => h.dealId === id);

  const [stage, setStage] = useState("detail");
  const [hist, setHist] = useState([]);
  const [amt, setAmt] = useState(deal ? deal.minInvest : 0);

  if (!deal) return <Navigate to="/hnw/invest" replace />;

  const go = (s) => { setHist((h) => [...h, stage]); setStage(s); };
  const back = () => {
    if (hist.length === 0) { navigate("/hnw/invest"); return; }
    const prev = hist[hist.length - 1];
    setHist((h) => h.slice(0, -1));
    setStage(prev);
  };

  const confirmContract = () => {
    invest(deal.id, amt);
    toast({
      title: "전자서명 완료 · 투자 확정", icon: "✍",
      body: `${deal.name} SPV에 ${manwon(amt)} 투자가 체결되었습니다.`,
    });
    setHist([]);
    setStage("tracking");
  };

  return (
    <>
      {stage !== "tracking" && <button className="onb-back" onClick={back}><Chevron dir="left" /> 뒤로</button>}

      {stage === "detail" && (
        <DetailStage deal={deal} holding={holding} onStructure={() => go("structure")} onSimulate={() => go("simulator")} />
      )}
      {stage === "structure" && <StructureStage deal={deal} onNext={() => go("simulator")} />}
      {stage === "simulator" && <SimulatorStage deal={deal} amt={amt} setAmt={setAmt} onNext={() => go("video-notice")} />}
      {stage === "video-notice" && <VideoNoticeStage onNext={() => go("video-call")} />}
      {stage === "video-call" && <VideoCallStage deal={deal} onNext={() => go("contract")} />}
      {stage === "contract" && <ContractStage deal={deal} amt={amt} onConfirm={confirmContract} />}
      {stage === "tracking" && <TrackingStage deal={deal} amt={amt} onDone={() => navigate("/hnw/portfolio")} />}
    </>
  );
}

/* ---------------- S05 · 딜 상세 ---------------- */
function DetailStage({ deal, holding, onStructure, onSimulate }) {
  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">{deal.tag} · {deal.sector}</div>
        <div className="view-title">{deal.name}</div>
      </div>

      <div className="row" style={{ gap: 6, marginBottom: 18 }}>
        <span className="led a" />
        <span className="tiny">{deal.name} 주식을 직접 보유하는 게 아니라, SPV 지분을 취득하는 구조예요</span>
      </div>

      <div className="grid g-2">
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
          <div className="build-step active"><div className="no">2</div><div><h5>송금 확인 · 환전 중</h5><p>영업일 기준 1~3일 소요돼요</p></div></div>
          <div className="build-step" style={{ opacity: .55 }}><div className="no">3</div><div><h5>SPV 지분 취득 완료</h5><p>완료되면 포트폴리오에서 알려드려요</p></div></div>
        </div>
      )}

      <DealQA deal={deal} />

      {!holding && (
        <>
          <button className="btn btn-line btn-block mt-16" onClick={onStructure}>내 돈이 어떻게 {deal.name}까지 가는지 보기</button>
          <button className="btn btn-primary btn-block mt-8" onClick={onSimulate}>투자하면 얼마 남는지 계산해보기 →</button>
        </>
      )}
    </>
  );
}

/* AI에게 물어보기 (Step1 어드바이저 채팅의 축소판) */
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

/* ---------------- S06 · 투자 구조 안내 ---------------- */
function StructureStage({ deal, onNext }) {
  const [showTrustInfo, setShowTrustInfo] = useState(false);

  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">투자 전 꼭 확인</div>
        <div className="view-title">정확히 무엇을 투자하는 건가요</div>
        <div className="view-sub">
          고객님이 {deal.name} 주식을 직접 사는 게 아니에요. {deal.name} 지분을 담은 단일 종목 SPV의 지분을 사는 거고, 그 SPV가 실제 주식을 보유해요.
        </div>
      </div>

      <div className="card">
        {deal.structureSteps.map((s, i) => (
          <div className="build-step" key={i}><div className="no">{i + 1}</div><div><h5>{s}</h5></div></div>
        ))}
        <div className="build-step done"><div className="no">✓</div><div><h5>고객님은 SPV 지분을 갖게 돼요</h5></div></div>
      </div>

      <div className="card mt-16" style={{ background: "var(--panel-2)" }}>
        <div className="status-line"><span className="led a" />해외 비상장 주식은 국내 증권사가 직접 사줄 수 없어요. SPV를 거치는 게 합법적으로 투자할 수 있는 유일한 방법이에요.</div>
      </div>

      <button className="btn btn-primary btn-block mt-16" onClick={onNext}>이해했어요, 계속하기</button>

      <button
        className="login-alt"
        style={{ margin: "14px auto 0", display: "block" }}
        onClick={() => setShowTrustInfo((v) => !v)}
      >
        특정금전신탁이란? {showTrustInfo ? "▲" : "▼"}
      </button>

      {showTrustInfo && (
        <div className="card mt-12" style={{ background: "var(--panel-2)" }}>
          <p className="tiny" style={{ color: "var(--txt)" }}>
            특정금전신탁은 고객(위탁자)이 자금의 운용 대상을 직접 지정하는 신탁이에요. 증권사(수탁자)는 고객이 지정한 대로만 자금을 운용할 수 있고,
            신탁재산은 증권사의 고유재산과 법적으로 분리·보관돼요.
          </p>
          <div className="hnw-verify-steps">
            <div className="hnw-verify-step"><span>✓</span>고객이 투자 대상(이 딜의 SPV 지분)을 직접 지정해요</div>
            <div className="hnw-verify-step"><span>✓</span>신탁재산은 증권사 고유재산과 분리되어, 증권사가 파산해도 별도로 보호돼요 (도산격리)</div>
            <div className="hnw-verify-step"><span>✓</span>자본시장법에 따라 정식으로 감독받는 절차예요</div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- S07 · 투자 시뮬레이터 ---------------- */
function SimulatorStage({ deal, amt, setAmt, onNext }) {
  const before = amt * 3; // toy 3배 성장 가정 (실제 결과와 무관한 예시)
  const tax = Math.round(before * 0.22);
  const after = before - tax;
  const min = deal.minInvest, max = deal.minInvest * 10;
  const pct = ((amt - min) / (max - min)) * 100;

  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">투자 시뮬레이션</div>
        <div className="view-title">투자금을 입력해보세요</div>
        <div className="view-sub">희망하는 금액으로 {deal.name} SPV 지분을 매입해요.</div>
      </div>

      <div className="card">
        <div className="slider-row" style={{ marginBottom: 6 }}>
          <div className="lab"><span>투자금</span><b>{manwon(amt)}</b></div>
          <input
            type="range" min={min} max={max} step="500" value={amt}
            onChange={(e) => setAmt(+e.target.value)}
            style={{ background: `linear-gradient(to right, var(--mint) ${pct}%, var(--panel-2) ${pct}%)` }}
          />
          <div className="row between mt-8"><span className="tiny">최소 {manwon(min)}</span><span className="tiny">최대 {manwon(max)}</span></div>
        </div>
      </div>

      <div className="card mt-16" style={{ background: "var(--panel-2)" }}>
        <div className="tiny" style={{ marginBottom: 10, color: "var(--txt)", fontWeight: 700 }}>3배 성장 시나리오 (예시 · 실제 결과와 무관)</div>
        <div className="row between"><span className="muted" style={{ fontSize: 12.5 }}>세전 회수액</span><span>{manwon(before)}</span></div>
        <div className="row between mt-8"><span className="muted" style={{ fontSize: 12.5 }}>세금(약 22%)</span><span style={{ color: "var(--red)" }}>-{manwon(tax)}</span></div>
        <div className="divider" />
        <div className="row between"><span style={{ fontWeight: 700 }}>세후 회수액</span><span style={{ color: "var(--mint)", fontWeight: 700, fontSize: 17 }}>{manwon(after)}</span></div>
      </div>
      <p className="tiny mt-8">실제 수익은 투자 결과에 따라 달라져요. 이 숫자는 예시예요.</p>

      <button className="btn btn-primary btn-block mt-16" onClick={onNext}>이 조건으로 투자 진행하기</button>
    </>
  );
}

/* ---------------- S08 · 화상상담 고지 ---------------- */
function VideoNoticeStage({ onNext }) {
  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">계약 전 화상 상담</div>
        <div className="view-title">담당자와 화상상담이 필요해요</div>
        <div className="view-sub">법으로 정해진 절차예요. 약 15~20분, 대기는 3분 안쪽이에요.</div>
      </div>

      <div className="grid g-2">
        <div className="metric"><div className="label">예상 소요시간</div><div className="value" style={{ fontSize: 18 }}>15~20분</div></div>
        <div className="metric"><div className="label">대기 시간</div><div className="value" style={{ fontSize: 18 }}>3분 이내</div></div>
      </div>

      <button className="btn btn-primary btn-block mt-16" onClick={onNext}>지금 연결하기</button>
    </>
  );
}

/* ---------------- S09 · 화상상담 진행 ---------------- */
function VideoCallStage({ deal, onNext }) {
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(false);
  const ready = c1 && c2;

  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">화상상담 진행 중</div>
        <div className="view-title">담당자와 연결 중이에요</div>
      </div>

      <div className="card" style={{ height: 120, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <span style={{ fontSize: 26 }}>🎥</span>
        <span className="tiny">담당자와 화상 연결 중</span>
      </div>

      <div className="card mt-16">
        <label style={{ display: "flex", gap: 8, alignItems: "flex-start", cursor: "pointer" }}>
          <input type="checkbox" checked={c1} onChange={() => setC1((v) => !v)} style={{ marginTop: 2 }} />
          <span className="muted" style={{ fontSize: 12.5 }}>
            고객님의 <b style={{ color: "var(--mint)" }}>특정금전신탁</b>을 활용하여, {deal.name} 주식을 보유하고 있는{" "}
            <b style={{ color: "var(--mint)" }}>특수목적법인(SPV)</b>에 투자한다는 것을 이해했어요
          </span>
        </label>
        <label style={{ display: "flex", gap: 8, alignItems: "flex-start", cursor: "pointer", marginTop: 12 }}>
          <input type="checkbox" checked={c2} onChange={() => setC2((v) => !v)} style={{ marginTop: 2 }} />
          <span className="muted" style={{ fontSize: 12.5 }}>투자금 전액 손실 가능성을 포함한 투자 위험을 설명받았어요</span>
        </label>
      </div>

      <button
        className="btn btn-primary btn-block mt-16"
        disabled={!ready}
        onClick={onNext}
        style={{ opacity: ready ? 1 : .5, cursor: ready ? "pointer" : "not-allowed" }}
      >
        {ready ? "확인 완료, 서명하러 가기" : "두 항목 모두 확인해주세요"}
      </button>
    </>
  );
}

/* ---------------- S10 · 계약 서명 ---------------- */
function ContractStage({ deal, amt, onConfirm }) {
  const { openModal } = useApp();
  const [busy, setBusy] = useState(false);

  const handleConfirm = () => {
    setBusy(true);
    setTimeout(onConfirm, BRAND_LOOP_MS);
  };

  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">계약 서명</div>
        <div className="view-title">마지막으로 서명만 하면 돼요</div>
      </div>

      <div className="card" style={{ background: "var(--panel-2)" }}>
        <div className="status-line"><span className="led g" />상담 완료 · 구조와 위험 모두 확인하셨어요</div>
      </div>

      <div className="card mt-16">
        <div className="row between"><span className="muted" style={{ fontSize: 12.5 }}>투자금</span><b>{manwon(amt)}</b></div>
        <div className="divider" />
        <p className="tiny">
          계약 상대는 Barbell의 운영사인 <b style={{ color: "var(--mint)" }}>한화투자증권 신탁</b>이며, 투자 대상은{" "}
          <b style={{ color: "var(--mint)" }}>{deal.name} 주식을 보유한 SPV 지분</b>이에요.
        </p>
      </div>

      <button
        className="card mt-16"
        style={{ width: "100%", cursor: "pointer", background: "var(--panel)", color: "var(--txt)", fontFamily: "inherit" }}
        onClick={() => openModal(<ContractDocModal deal={deal} amt={amt} />)}
      >
        <div className="row between">
          <span style={{ fontSize: 12.5 }}>계약서 내용 다시 보기</span>
          <span className="ut-caret">›</span>
        </div>
      </button>

      <button className="btn btn-primary btn-block mt-16" onClick={handleConfirm} disabled={busy}>서명하고 투자 완료하기</button>

      {busy && <BrandLoadingOverlay label="투자 체결 중…" />}
    </>
  );
}

/* 계약서 원문 — 일반적인 SPV 지분 매매계약서 양식을 딜 내용에 맞춰 채운 샘플 */
function ContractDocModal({ deal, amt }) {
  const today = new Date().toISOString().slice(0, 10);
  const articles = [
    { t: "제1조 (목적)", d: `본 계약은 매수인이 ${deal.name} 주식을 보유한 특수목적기구(이하 "SPV")의 지분을 취득함으로써 ${deal.name}의 기업가치 변동에 간접적으로 노출되는 것을 목적으로 한다.` },
    { t: "제2조 (투자대상)", d: `투자대상은 ${deal.name} 보통주(또는 우선주)를 보유한 단일 종목 SPV의 지분이며, 매수인은 납입금액에 비례하여 SPV 지분을 취득한다.` },
    { t: "제3조 (투자금액 및 납입방법)", d: `투자금액은 금 ${manwon(amt)}(원화)으로 하며, 매수인은 이를 운영사가 지정한 계좌로 납입한다. 납입된 원화는 필요시 외화로 환전되어 SPV의 기초자산 매입에 사용된다.` },
    { t: "제4조 (권리와 의무)", d: `매수인은 SPV 지분 보유자로서 손익 귀속에 관한 권리를 가지며, ${deal.name}에 대한 의결권 등 직접적인 주주권은 행사할 수 없다.` },
    { t: "제5조 (손익의 귀속)", d: "SPV가 보유한 기초자산의 가치 변동에 따른 손익은 매수인의 지분율에 비례하여 귀속된다." },
    { t: "제6조 (환금성 제한)", d: "본 지분은 비상장 자산의 특성상 즉시 현금화가 어려우며, 매도 시 발행회사 동의 등 절차가 필요할 수 있어 체결까지 상당한 시일이 소요될 수 있다." },
    { t: "제7조 (투자위험의 고지)", d: "매수인은 비상장기업의 가치평가가 확정적이지 않고 투자원금 전액 손실이 가능함을 사전에 설명받았으며, 이를 이해하고 본 계약에 서명한다." },
    { t: "제8조 (세금)", d: "본 계약과 관련하여 발생하는 제세공과금은 관계 법령이 정하는 바에 따라 매수인이 부담한다." },
    { t: "제9조 (준거법 및 관할)", d: "본 계약은 대한민국 법을 준거법으로 하며, 본 계약과 관련한 분쟁은 서울중앙지방법원을 제1심 관할 법원으로 한다." },
  ];

  return (
    <>
      <div className="view-eyebrow">SPV 지분 매매계약서 · 샘플</div>
      <h3 style={{ marginTop: 8 }}>{deal.name} SPV 지분 매매계약서</h3>
      <p className="tiny mt-8">
        계약일 {today} · 매도인: 한화투자증권 신탁(Barbell SPV 운영사) · 매수인: 본인
      </p>
      <div className="divider" />
      {articles.map((a) => (
        <div key={a.t} style={{ marginBottom: 16 }}>
          <strong style={{ fontSize: 13, color: "var(--mint)" }}>{a.t}</strong>
          <p className="mt-8" style={{ fontSize: 12.5, lineHeight: 1.7, color: "var(--txt)" }}>{a.d}</p>
        </div>
      ))}
      <div className="divider" />
      <p className="tiny">본 문서는 서비스 이해를 돕기 위한 샘플 양식이며, 실제 계약서는 서명 시 정식 전자문서로 별도 제공됩니다.</p>
    </>
  );
}

/* ---------------- S11 · 진행상황 ---------------- */
function TrackingStage({ deal, amt, onDone }) {
  const steps = [
    { label: "계약 체결 완료", sub: "전자서명으로 구조와 위험 설명을 다 들으셨어요", state: "done" },
    { label: "송금 확인", sub: "영업일 기준 1~3일 소요돼요", state: "active" },
    { label: "환전 중", sub: "원화 → 달러 환전이 진행돼요", state: "todo" },
    { label: "SPV 지분 취득 완료", sub: "완료되면 포트폴리오에서 알려드려요", state: "todo" },
  ];

  return (
    <>
      <div className="card">
        <div className="tiny">내 투자 → {deal.name} SPV</div>
        <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>{manwon(amt)} 투자 진행 중</div>
      </div>

      <div className="card mt-16">
        <div className="card-title">지금 어느 단계인가요</div>
        {steps.map((s, i) => (
          <div
            className={"build-step" + (s.state === "done" ? " done" : s.state === "active" ? " active" : "")}
            key={i}
            style={{ opacity: s.state === "todo" ? .55 : 1 }}
          >
            <div className="no">{s.state === "done" ? "✓" : i + 1}</div>
            <div><h5>{s.label}</h5><p>{s.sub}</p></div>
          </div>
        ))}
      </div>

      <div className="card mt-16" style={{ background: "var(--panel-2)" }}>
        <div className="status-line"><span className="led a" />화면은 실시간으로 보이지만, 실제 송금 확인은 영업일 기준으로 처리돼요.</div>
      </div>

      <button className="btn btn-primary btn-block mt-16" onClick={onDone}>포트폴리오로 이동하기</button>
    </>
  );
}
