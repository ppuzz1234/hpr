import { useState } from "react";
import { won } from "../utils.js";
import { useApp } from "../context/AppContext.jsx";
import { Gauge } from "../components/Charts.jsx";

export default function Bridge() {
  const { toast } = useApp();
  const [amt, setAmt] = useState(100);

  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">코어 모듈 · 무결성 글로벌 자산이전</div>
        <div className="view-title">Global Wealth Bridge</div>
        <div className="view-sub">100억 원 이상의 거액을 해외 거점으로 합법 이전합니다. 신고 서류 자동 생성과 자금출처 무결성 검증으로 사후조사 리스크를 0화합니다.</div>
      </div>

      <div className="grid g-2">
        <div className="card">
          <div className="card-title">외국환거래법 프로세스 자동화</div>
          <div className="slider-row mt-16">
            <div className="lab"><span>이전 규모</span><b>{won(amt)}</b></div>
            <input type="range" min="100" max="2000" step="50" value={amt} onChange={(e) => setAmt(+e.target.value)} />
          </div>
          <div className="build-step done"><div className="no">✓</div><div><h5>해외직접투자 신고서</h5><p>외국환은행 사전신고 양식 자동 생성</p></div></div>
          <div className="build-step done"><div className="no">✓</div><div><h5>해외증권취득 신고</h5><p>취득 보고 표준 가이드 매칭</p></div></div>
          <div className="build-step"><div className="no">3</div><div><h5>송금 자금출처 소명서</h5><p>배당·지분매각 대금 출처 라벨링</p></div></div>
          <button className="btn btn-primary btn-block mt-16" onClick={() => toast({ title: "신고서류 일괄 생성 완료", icon: "📄", body: `${won(amt)} 해외이전 — 해외직접투자 신고서 · 증권취득 신고 · 자금출처 소명서가 인앱 양식으로 생성되었습니다.` })}>인앱 신고서류 일괄 생성</button>
        </div>

        <div className="card">
          <div className="card-head"><div className="card-title">자금출처 무결성 검증 <small>국세청·금감원 사전 소명</small></div><span className="card-tag">리스크 0화</span></div>
          <div style={{ textAlign: "center", margin: "8px 0" }}><Gauge value={94} /></div>
          <div className="tiny" style={{ textAlign: "center", marginBottom: 14 }}>자금출처 무결성 스코어</div>
          <table className="tbl">
            <tbody>
              <tr><td>배당소득 (적법 원천징수)</td><td><span className="pill sr">검증</span></td></tr>
              <tr><td>지분 매각대금</td><td><span className="pill sr">검증</span></td></tr>
              <tr><td>차입금 비중</td><td><span className="pill mz">소명 권고</span></td></tr>
            </tbody>
          </table>
          <button className="btn btn-line btn-block mt-16" onClick={() => toast({ title: "사후조사 시뮬레이션 통과", icon: "🛡", body: "국세청 외환 모니터링 시나리오에서 추징 리스크 '낮음'. 차입금 항목만 보강 소명을 권고합니다." })}>사후조사 에뮬레이터 가동</button>
        </div>
      </div>
    </>
  );
}
