import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DB } from "../data.js";
import { useApp } from "../context/AppContext.jsx";
import { Gauge } from "../components/Charts.jsx";

export default function Step1() {
  const { diag, company } = useApp();
  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">STEP 1 · 인바운드 진단 · {company.name}</div>
        <div className="view-title">3-Click 법인 FCF 시뮬레이터</div>
        <div className="view-sub">
          <b style={{ color: "var(--mint)" }}>{company.name}</b>의 재무제표를 올리면 30초 내 유휴자본의{" "}
          <b style={{ color: "var(--mint)" }}>기회비용</b>과 <b style={{ color: "var(--mint)" }}>정체구간</b>을 도출하고,
          AI 웰스 어드바이저가 1-Page Executive Summary를 발행합니다.
        </div>
      </div>
      {diag.done ? <DiagResult /> : <Uploader />}
    </>
  );
}

/* ---------------- 어드바이저 원형 아바타 (사진 없으면 이니셜 폴백) ---------------- */
function AdvisorAvatar({ a, variant = "face" }) {
  const [err, setErr] = useState(false);
  const showImg = a.photo && !err;
  return (
    <div className={variant} style={{ background: a.face }}>
      {showImg && <img src={a.photo} alt={a.name} onError={() => setErr(true)} />}
      {!showImg && <span>{a.initials}</span>}
    </div>
  );
}

/* ---------------- 업로드 + 스캔 (선택 회사 데이터 분석) ---------------- */
function Uploader() {
  const { setDiag, toast, company } = useApp();
  const [scanning, setScanning] = useState(false);
  const [pct, setPct] = useState(0);
  const [logs, setLogs] = useState([]);
  const [drag, setDrag] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearInterval(timer.current), []);

  const run = () => {
    if (scanning) return;
    setScanning(true);
    let p = 0;
    const arr = company.scanLog;
    timer.current = setInterval(() => {
      p += Math.random() * 9 + 4;
      if (p > 100) p = 100;
      setPct(Math.floor(p));
      const target = Math.min(Math.floor((p / 100) * arr.length), arr.length);
      setLogs(arr.slice(0, target));
      if (p >= 100) {
        clearInterval(timer.current);
        setLogs(arr);
        setTimeout(() => {
          setDiag((d) => ({ ...d, done: true }));
          toast({
            title: "진단 완료 · Executive Summary 발행",
            icon: "✓",
            body: `${company.name}의 유휴자본 연 ${company.diag.oppCost}억 기회비용이 확인되었습니다. 글로벌 어드바이저의 컨설팅을 선택해 STEP 2로 진행하세요.`,
            actions: [{ label: "어드바이저 보기", primary: true, fn: () => document.getElementById("advisorAnchor")?.scrollIntoView({ behavior: "smooth" }) }],
          });
        }, 600);
      }
    }, 230);
  };

  return (
    <div className="grid g-2">
      <div className="card glow">
        <div className="card-head">
          <div className="card-title">{company.name} 재무제표 업로드 <small>{company.sector}</small></div>
          <span className="card-tag">3-CLICK</span>
        </div>
        {!scanning ? (
          <div
            className={"dropzone" + (drag ? " drag" : "")}
            onClick={run}
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); run(); }}
          >
            <div className="ic">📄</div>
            <strong>{company.name} 재무제표 PDF를 끌어다 놓으세요</strong>
            <span>또는 클릭하여 선택 · 보안 암호화 업로드 (대외비)</span>
          </div>
        ) : (
          <div style={{ marginTop: 6 }}>
            <div className="row between"><span className="tiny">분석 {pct}%</span><span className="tiny">AI Wealth Engine · {company.short}</span></div>
            <div className="scan-bar mt-8"><i style={{ width: pct + "%" }} /></div>
            <div className="scan-log">
              {logs.map((l, i) => <div key={i} dangerouslySetInnerHTML={{ __html: "› " + l }} />)}
            </div>
          </div>
        )}
        <div className="row" style={{ marginTop: 14, gap: 8 }}>
          <span className="flag">🔒 256-bit 암호화</span>
          <span className="flag">⚡ 30초 분석</span>
          <span className="flag">🗑 분석 후 자동 파기</span>
        </div>
      </div>

      <div className="card">
        <div className="card-title">왜 진단인가</div>
        <p className="muted mt-16">
          대부분의 우량 법인은 <b style={{ color: "var(--txt)" }}>잉여현금이 저수익에 묶여</b> 매년 가치가 침식됩니다.
          배당으로 빼면 41% 종합과세, 사내에 쌓으면 기회비용 — 이 딜레마를 푸는 출발점이 정밀 진단입니다.
        </p>
        <div className="divider" />
        <div className="build-step"><div className="no">1</div><div><h5>재무 OCR · 현금흐름 분해</h5><p>잉여현금·유보금·운용수익률 자동 추출</p></div></div>
        <div className="build-step"><div className="no">2</div><div><h5>유휴자본 정체구간 탐지</h5><p>저수익 예치·미투자 구간을 시각화</p></div></div>
        <div className="build-step"><div className="no">3</div><div><h5>비금융 관심사 키워드 매칭</h5><p>가문 성향에 맞는 테마 자동 연결</p></div></div>
      </div>
    </div>
  );
}

/* ---------------- 진단 결과 + STEP 1.1 어드바이저 ---------------- */
function DiagResult() {
  const { diag, setDiag, company } = useApp();
  const d = company.diag;

  return (
    <>
      <div className="card glow">
        <div className="card-head">
          <div className="card-title">📑 1-Page Executive Summary <small>AI Wealth Advisor · {company.name}</small></div>
          <span className="card-tag">중간 리포트</span>
        </div>
        <div className="grid g-4">
          {d.summary.map((s, i) => (
            <div className="metric" key={i}>
              <div className="label">{s.label}</div>
              <div className={"value " + (s.valueCls || "")}>{s.value}</div>
              <div className={"delta " + (s.deltaCls || "")}>{s.delta}</div>
            </div>
          ))}
        </div>
        <div className="divider" />
        <div className="grid g-3">
          <div className="span-2">
            <div className="card-title" style={{ fontSize: 13 }}>진단 코멘트</div>
            <p className="muted mt-16" dangerouslySetInnerHTML={{ __html: d.comment }} />
            <div className="row wrap mt-16">
              <span className="tiny" style={{ marginRight: 6 }}>비금융 관심사 매칭:</span>
              {d.keywords.map((k) => <span className="flag" key={k}>{k}</span>)}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="card-title" style={{ fontSize: 13, marginBottom: 6 }}>자산이전 준비도</div>
            <Gauge value={d.score} />
            <div className="tiny" style={{ marginTop: 8 }}>상위 18% 수준 · 즉시 진행 권장</div>
          </div>
        </div>
      </div>

      <div className="view-head mt-32" id="advisorAnchor">
        <div className="view-eyebrow">STEP 1.1 · 글로벌 컨설팅 선택</div>
        <div className="view-title">어떤 시선으로 자산을 볼까요?</div>
        <div className="view-sub">세계적 투자 거장의 관점을 선택하면, 그 철학에 맞춰 진단 결과를 해석하고 STEP 2 비히클 설계 방향이 결정됩니다.</div>
      </div>

      <div className="advisor-grid">
        {DB.advisors.map((a) => (
          <div
            key={a.id}
            className={"advisor-card" + (diag.advisor === a.id ? " sel" : "")}
            onClick={() => setDiag((x) => ({ ...x, advisor: a.id }))}
          >
            <AdvisorAvatar a={a} variant="face" />
            <h4>{a.name}</h4>
            <div className="role">{a.role}</div>
            <div className="style">{a.style}</div>
            <div className="pick">이 관점으로 컨설팅 받기 →</div>
          </div>
        ))}
      </div>

      {diag.advisor && <AdvisorChat advisorId={diag.advisor} />}
    </>
  );
}

/* ---------------- 어드바이저 채팅 ---------------- */
function AdvisorChat({ advisorId }) {
  const navigate = useNavigate();
  const a = DB.advisors.find((x) => x.id === advisorId);
  const [messages, setMessages] = useState([{ who: a.name, text: a.opening, me: false }]);
  const [asked, setAsked] = useState([]);
  const boxRef = useRef(null);

  useEffect(() => {
    setMessages([{ who: a.name, text: a.opening, me: false }]);
    setAsked([]);
  }, [advisorId]);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages]);

  const ask = (q) => {
    setAsked((s) => [...s, q]);
    setMessages((m) => [...m, { text: q, me: true }]);
    setTimeout(() => setMessages((m) => [...m, { who: a.name, text: a.qa[q], me: false }]), 450);
  };

  const remaining = Object.keys(a.qa).filter((q) => !asked.includes(q));

  return (
    <div className="card glow mt-24">
      <div className="card-head">
        <div className="advisor-mini">
          <AdvisorAvatar a={a} variant="avatar" />
          <div><strong>{a.name}</strong><span style={{ color: "var(--mint)" }}>{a.role}</span></div>
        </div>
        <span className="card-tag">실시간 컨설팅</span>
      </div>

      <div className="chat" ref={boxRef}>
        {messages.map((msg, i) => (
          <div key={i} className={"bubble " + (msg.me ? "me" : "them")}>
            {!msg.me && <div className="who">{msg.who}</div>}
            {msg.text}
          </div>
        ))}
      </div>

      {remaining.length > 0 && (
        <div className="quick-q">
          {remaining.map((q) => <span key={q} className="chip" onClick={() => ask(q)}>{q}</span>)}
        </div>
      )}

      <div className="divider" />
      <div className="row between">
        <span className="muted" style={{ fontSize: 12.5 }}>이 관점으로 비히클 설계를 진행합니다.</span>
        <button className="btn btn-primary" onClick={() => navigate("/step2")}>{a.name.split(" ")[0]}의 전략으로 STEP 2 →</button>
      </div>
    </div>
  );
}
