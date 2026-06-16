import { useState } from "react";
import { won } from "../utils.js";
import { useApp } from "../context/AppContext.jsx";
import { Gauge, Area } from "../components/Charts.jsx";

export default function Dual() {
  const { toast, company } = useApp();
  const [mv, setMv] = useState(40); // FCF 이동 비율
  const [dv, setDv] = useState(20); // 배당 성향
  const [sv, setSv] = useState(31); // 승계 지분 이전율

  // 토이 모델: 배당↑ → 세부담↑, 이동/이전↑ → 세부담↓
  const tax = Math.max(18, Math.round(company.family.effTaxRate + dv * 0.18 - mv * 0.09 - sv * 0.07));
  const moved = Math.round((company.main.fcf * mv) / 100);
  const saved = Math.round(((company.family.effTaxRate - tax) / 100) * company.family.networth * 0.04);
  const gaugeColor = tax > 35 ? "#FF6B6B" : tax > 25 ? "#F4B740" : "#34E0C4";

  const golden = () =>
    toast({
      warn: true, icon: "⏳", title: "골든타임 방어 팝업",
      body: "<b>대표님, 현재 승계 법인으로 지분을 이동하기 가장 합리적인 골든 타임입니다.</b> 평가액이 27% 눌린 지금 증여 시 과표를 크게 낮출 수 있습니다.",
      actions: [
        { label: "증여 진행", primary: true, fn: () => toast({ title: "증여 플로우 예약됨", icon: "✓", body: "얼라이언스 세무법인 전담팀에 검토가 배정되었습니다." }) },
        { label: "알림 유지" },
      ],
    });

  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">코어 모듈 · 승계 구조화 · {company.name}</div>
        <div className="view-title">메인-승계 법인 듀얼 구조 시뮬레이터</div>
        <div className="view-sub">메인 법인과 승계 법인의 재무·주주 데이터를 연동해, FCF 이동·배당정책 변화에 따른 <b style={{ color: "var(--mint)" }}>가문 전체 실효세부담률</b>을 실시간 시각화합니다.</div>
      </div>

      <div className="grid g-3">
        <div className="card span-2">
          <div className="card-title">시뮬레이션 변수</div>
          <div className="slider-row mt-16"><div className="lab"><span>FCF → 승계법인 이동 비율</span><b>{mv}%</b></div>
            <input type="range" min="0" max="100" value={mv} onChange={(e) => setMv(+e.target.value)} /></div>
          <div className="slider-row"><div className="lab"><span>배당 성향</span><b>{dv}%</b></div>
            <input type="range" min="0" max="80" value={dv} onChange={(e) => setDv(+e.target.value)} /></div>
          <div className="slider-row"><div className="lab"><span>승계 지분 이전율</span><b>{sv}%</b></div>
            <input type="range" min="0" max="100" value={sv} onChange={(e) => setSv(+e.target.value)} /></div>
          <div className="divider" />
          <div className="grid g-2">
            <div className="metric"><div className="label">승계법인 이동 FCF</div><div className="value mint">{won(moved)}</div></div>
            <div className="metric"><div className="label">예상 세부담 절감</div><div className="value" style={{ color: saved >= 0 ? "var(--green)" : "var(--red)" }}>{saved >= 0 ? "+" : "-"}{won(Math.abs(saved))}</div></div>
          </div>
        </div>
        <div className="card">
          <div className="card-title">가문 실효세부담률</div>
          <div style={{ textAlign: "center", marginTop: 10 }}><Gauge value={tax} color={gaugeColor} /></div>
          <div className="divider" />
          <div className="row between"><span className="muted" style={{ fontSize: 12.5 }}>메인 법인</span><b>{won(company.main.revenue)} 매출</b></div>
          <div className="row between mt-8"><span className="muted" style={{ fontSize: 12.5 }}>승계 법인</span><b>{company.succ.name}</b></div>
          <div className="row between mt-8"><span className="muted" style={{ fontSize: 12.5 }}>가문 순자산</span><b style={{ color: "var(--mint)" }}>{won(company.family.networth)}</b></div>
        </div>
      </div>

      {/* 비상장 주식 골든타임 */}
      <div className="card glow mt-24">
        <div className="card-head">
          <div className="card-title">📉 비상장 주식가치 추적 · 최적 증여 타이밍 <small>상시 평가 알고리즘</small></div>
          <span className="status-line"><span className="led a" />골든타임 감지</span>
        </div>
        <div className="grid g-3">
          <div className="span-2">
            <Area data={[100, 108, 112, 104, 96, 89, 84, 82, 86, 80, 78, 79]} h={150} color="#F4B740" />
            <div className="tiny mt-8">비상장 주당 평가액 추이 — 업황 둔화로 <b style={{ color: "var(--amber)" }}>-22% 저평가 구간</b> 진입</div>
          </div>
          <div>
            <div className="metric"><div className="label">현재 평가액</div><div className="value">79<small style={{ fontSize: 13, color: "var(--txt-3)" }}> /주</small></div><div className="delta down">52주 고점 대비 -27%</div></div>
            <button className="btn btn-primary btn-block mt-16" onClick={golden}>증여 시뮬레이션</button>
          </div>
        </div>
      </div>
    </>
  );
}
