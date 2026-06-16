import { useState } from "react";
import { DB } from "../data.js";
import { won } from "../utils.js";
import { useApp } from "../context/AppContext.jsx";
import { Donut, Area } from "../components/Charts.jsx";

export default function Step3() {
  const { commits, openModal } = useApp();
  const f = DB.fof;

  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">STEP 3 · 한화 디지털 딜룸</div>
        <div className="view-title">기관급 대체자산을 폐쇄 딜룸에서 집행</div>
        <div className="view-sub">한화자산운용·투자증권이 선인수한 Tranching 공급망과 상위 0.1% 가문 간 클럽딜, 그리고 가문 통합 Fund of Funds를 실시간으로 한눈에.</div>
      </div>

      {/* FoF live header */}
      <div className="grid g-4">
        <div className="metric span-2" style={{ background: "linear-gradient(135deg,#141B23,#0E1116)", borderColor: "var(--mint-dim)" }}>
          <div className="label">가문 통합 운용자산 (Fund of Funds AUM)</div>
          <div className="value mint" style={{ fontSize: 34 }}>{won(f.aum)} <span style={{ fontSize: 13, color: "var(--txt-3)" }}>≈ ${(f.aum * 0.075).toFixed(1)}M</span></div>
          <div className="delta up">▲ 오늘 +{f.todayPnl}% (+{won(f.todayPnlAmt)}) · 실시간</div>
        </div>
        <div className="metric"><div className="label">3년 IRR</div><div className="value">{f.irr3y}%</div><div className="delta up">벤치 +6.2%p</div></div>
        <div className="metric"><div className="label">집행 클럽딜</div><div className="value">{Object.keys(commits).length}건</div><div className="delta">서명 대기 {DB.clubDeals.length}건</div></div>
      </div>

      {/* FoF allocation + NAV */}
      <div className="grid g-3 mt-24">
        <div className="card">
          <div className="card-title">자산배분 <small>실물 기준 (Look-through)</small></div>
          <div className="row" style={{ justifyContent: "center", margin: "10px 0" }}>
            <Donut segments={f.allocation} center={{ top: won(f.aum), bottom: "Total AUM" }} />
          </div>
          <div className="legend mt-16">
            {f.allocation.map((a) => (
              <div className="row" key={a.k}>
                <span className="sw" style={{ background: a.c }} />{a.k}
                <span className="pct">{a.v}%</span><span className="amt">{won(a.amt)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card span-2">
          <div className="card-head"><div className="card-title">통합 NAV 추이 <small>최근 12개월 · 100 기준</small></div><span className="delta up">+42.3%</span></div>
          <Area data={f.nav12m} h={150} />
          <div className="divider" />
          <div className="card-title" style={{ fontSize: 13, marginBottom: 6 }}>편입 펀드 현황</div>
          <table className="tbl">
            <thead><tr><th>펀드</th><th>유형</th><th>NAV</th><th>IRR</th><th>DPI</th><th>상태</th></tr></thead>
            <tbody>
              {f.funds.map((fd) => (
                <tr key={fd.name}>
                  <td><b>{fd.name}</b></td>
                  <td><span className="tiny">{fd.type}</span></td>
                  <td>{fd.nav.toFixed(1)}</td>
                  <td style={{ color: fd.irr >= 15 ? "var(--green)" : "var(--txt)" }}>{fd.irr ? fd.irr + "%" : "—"}</td>
                  <td>{fd.dpi ? fd.dpi.toFixed(2) + "x" : "—"}</td>
                  <td><span className="status-line"><span className={"led " + fd.status} /></span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tranching supply */}
      <div className="card mt-24">
        <div className="card-head">
          <div className="card-title">🔗 Tranching API 공급망 <small>한화 선인수 기관급 대체자산</small></div>
          <span className="status-line"><span className="led g" />실시간 피드</span>
        </div>
        <table className="tbl">
          <thead><tr><th>자산</th><th>섹터</th><th>트랜치</th><th>쿠폰/목표</th><th>만기</th><th>최소출자</th><th>소진율</th><th></th></tr></thead>
          <tbody>
            {DB.tranches.map((t, i) => (
              <tr key={i}>
                <td><b>{t.name}</b></td>
                <td><span className="tiny">{t.cat}</span></td>
                <td><span className={"pill " + t.color}>{t.tr}</span></td>
                <td>{t.coupon}</td><td>{t.maturity}</td><td>{won(t.min)}</td>
                <td style={{ minWidth: 120 }}><div className="commit-bar" style={{ margin: 0 }}><i style={{ width: t.filled + "%" }} /></div><span className="tiny">{t.filled}%</span></td>
                <td><button className="btn btn-line btn-sm" onClick={() => openModal(<TrancheModal t={t} />)}>출자</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Club deals */}
      <div className="view-head mt-32">
        <div className="view-eyebrow">폐쇄형 클럽딜 룸</div>
        <div className="view-title">상위 0.1% 가문 공동출자</div>
        <div className="view-sub">자산 노출 없이 조용히 연대합니다. 단독 인수가 부담스러운 대형 우량자산을 가문 법인들이 함께 출자 확약(Commitment)합니다.</div>
      </div>
      <div className="grid g-3">
        {DB.clubDeals.map((d) => <ClubCard key={d.id} d={d} />)}
      </div>
    </>
  );
}

function ClubCard({ d }) {
  const { commits, openModal } = useApp();
  const committed = commits[d.id];
  const fill = committed ? Math.min(100, d.commit + 14) : d.commit;
  return (
    <div className="deal-card">
      <div className="deal-banner" style={{ background: d.grad }}>
        <span className="badge">{committed ? "✓ 출자확약" : d.badge}</span>
        <span className="cat">{d.cat}</span>
      </div>
      <div className="deal-body">
        <h4>{d.name}</h4>
        <div className="sub">딜 규모 {won(d.size)} · 가문 {d.families}곳 참여</div>
        <div className="deal-meta">
          <div><div className="k">최소 확약</div><div className="v">{won(d.min)}</div></div>
          <div style={{ textAlign: "right" }}><div className="k">모집 진행</div><div className="v" style={{ color: "var(--mint)" }}>{fill}%</div></div>
        </div>
        <div className="commit-bar"><i style={{ width: fill + "%" }} /></div>
        <button
          className={"btn btn-block mt-16 " + (committed ? "btn-line" : "btn-primary")}
          onClick={() => (committed ? null : openModal(<ClubDealModal d={d} />))}
        >
          {committed ? `✓ ${won(committed)} 확약 완료` : "공동출자 서명 →"}
        </button>
      </div>
    </div>
  );
}

function TrancheModal({ t }) {
  const { closeModal, toast } = useApp();
  const cp = parseFloat(t.coupon) / 100;
  const [amt, setAmt] = useState(t.min);
  return (
    <>
      <div className="view-eyebrow">TRANCHING · 자본 집행</div>
      <h3 style={{ marginTop: 8 }}>{t.name}</h3>
      <p className="muted mt-8">{t.cat} · <span className={"pill " + t.color}>{t.tr}</span> 트랜치 · 쿠폰 {t.coupon} · 만기 {t.maturity}</p>
      <div className="divider" />
      <div className="slider-row">
        <div className="lab"><span>출자 확약 금액</span><b>{won(amt)}</b></div>
        <input type="range" min={t.min} max={t.min * 6} step="10" value={amt} onChange={(e) => setAmt(+e.target.value)} />
      </div>
      <div className="grid g-2">
        <div className="metric"><div className="label">예상 연수익</div><div className="value mint">{won(Math.round(amt * cp))}</div></div>
        <div className="metric"><div className="label">자금 출처</div><div className="value" style={{ fontSize: 16 }}>Family LLC</div><div className="delta up">과세이연 적용</div></div>
      </div>
      <div className="card mt-16" style={{ background: "var(--panel-2)" }}>
        <div className="status-line"><span className="led g" />무인 캐피탈 콜 · Embedded Finance 자동 집행 준비 완료</div>
      </div>
      <button
        className="btn btn-primary btn-block mt-24"
        onClick={() => { closeModal(); toast({ title: "캐피탈 콜 자동 집행 완료", icon: "✓", body: `${t.name} ${t.tr} 트랜치에 ${won(amt)} 출자확약 — Family LLC에서 자본이 자동 집행되었습니다.` }); }}
      >
        전자서명 후 캐피탈 콜 집행
      </button>
    </>
  );
}

function ClubDealModal({ d }) {
  const { closeModal, toast, setCommits } = useApp();
  const [amt, setAmt] = useState(d.min);
  return (
    <>
      <div className="view-eyebrow">CLUB-DEAL · 대외비 공동출자</div>
      <h3 style={{ marginTop: 8 }}>{d.name}</h3>
      <p className="muted mt-8">{d.cat} · 딜 규모 {won(d.size)} · 참여 가문 {d.families}곳 (익명)</p>
      <div className="card mt-16" style={{ background: "var(--panel-2)" }}>
        <div className="status-line"><span className="led g" />자산 노출 0 · 기존 오너 승인 완료 · 종단간 암호화 서명</div>
      </div>
      <div className="slider-row mt-24">
        <div className="lab"><span>공동출자 확약 금액</span><b>{won(amt)}</b></div>
        <input type="range" min={d.min} max={d.min * 5} step="10" value={amt} onChange={(e) => setAmt(+e.target.value)} />
      </div>
      <div className="grid g-2">
        <div className="metric"><div className="label">지분 비중(예상)</div><div className="value">{((amt / d.size) * 100).toFixed(2)}%</div></div>
        <div className="metric"><div className="label">집행 비히클</div><div className="value" style={{ fontSize: 16 }}>Family LLC</div></div>
      </div>
      <button
        className="btn btn-primary btn-block mt-24"
        onClick={() => {
          setCommits((c) => ({ ...c, [d.id]: amt }));
          closeModal();
          toast({ title: "클럽딜 출자확약 서명 완료", icon: "✍", body: `${d.name}에 ${won(amt)} 공동출자가 확약되었습니다. 다른 가문에 자산 노출 없이 연대 집행됩니다.` });
        }}
      >
        스마트 초청 수락 · 전자서명
      </button>
    </>
  );
}
