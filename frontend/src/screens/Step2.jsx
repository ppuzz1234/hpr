import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DB } from "../data.js";
import { won } from "../utils.js";
import { useApp } from "../context/AppContext.jsx";

export default function Step2() {
  const navigate = useNavigate();
  const { diag, vehicle, setVehicle, toast } = useApp();
  const adv = DB.advisors.find((a) => a.id === diag.advisor);

  const [trustAsset, setTrustAsset] = useState(8000);
  const [trustBen, setTrustBen] = useState(4);

  const buildTrust = () => {
    setVehicle((v) => ({ ...v, trust: true }));
    toast({ title: "유언대용신탁 구조 설계 완료", icon: "🏛", body: "수익자 연속신탁 + 표준계약 매칭이 완료되었습니다. 신탁재산 가치는 대시보드에서 추적됩니다." });
  };
  const buildLLC = () => {
    setVehicle((v) => ({ ...v, llc: true }));
    toast({
      title: "Family LLC 디지털 설립 완료", icon: "🏗",
      body: "메인법인 FCF 연동 게이트가 열렸습니다. STEP 3 딜룸 자본집행이 활성화됩니다.",
      actions: [{ label: "딜룸 진입", primary: true, fn: () => navigate("/step3") }],
    });
  };
  const rebalance = () =>
    toast({
      warn: true, title: "방어 리밸런싱 팝업", icon: "⚠",
      body: "신용 익스포저를 시니어 트랜치로 12%p 이동하면 충격도 -11% → -4%로 완화됩니다. 적용할까요?",
      actions: [
        { label: "적용", primary: true, fn: () => toast({ title: "리밸런싱 적용됨", icon: "✓", body: "포트폴리오 방어선이 재설정되었습니다." }) },
        { label: "나중에" },
      ],
    });

  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">STEP 2 · 비히클 설립 & 자산이동 인프라</div>
        <div className="view-title">FCF를 담을 그릇을 만듭니다</div>
        <div className="view-sub">
          디지털 가족신탁과 Family LLC를 설계하고, 가문-법인 통합 스트레스 테스트로 방어선을 점검합니다.
          {adv && <> <b style={{ color: "var(--mint)" }}>{adv.name}</b>의 전략 기조가 반영되었습니다.</>}
        </div>
      </div>

      <div className="grid g-2">
        {/* Digital Trust */}
        <div className="card">
          <div className="card-head">
            <div className="card-title">🏛 디지털 가족신탁 아키텍트 <small>유언대용 · 수익자연속신탁</small></div>
            <span className="card-tag">{vehicle.trust ? "설계완료" : "미설계"}</span>
          </div>
          <div className="slider-row">
            <div className="lab"><span>이전 대상 자산</span><b>{won(trustAsset)}</b></div>
            <input type="range" min="1000" max="20000" step="500" value={trustAsset} onChange={(e) => setTrustAsset(+e.target.value)} />
          </div>
          <div className="slider-row">
            <div className="lab"><span>수익자 (가족 구성원)</span><b>{trustBen}명</b></div>
            <input type="range" min="1" max="8" value={trustBen} onChange={(e) => setTrustBen(+e.target.value)} />
          </div>
          <div className="row between" style={{ margin: "14px 0" }}>
            <span className="muted" style={{ fontSize: 12.5 }}>표준계약 매칭 (한화 + 얼라이언스 로펌)</span>
            <span className="status-line"><span className="led g" />3건 매칭됨</span>
          </div>
          <button className={"btn btn-block " + (vehicle.trust ? "btn-line" : "btn-primary")} onClick={buildTrust} disabled={vehicle.trust}>
            {vehicle.trust ? "✓ 신탁 구조 설계됨 — 대시보드 추적 중" : "30초 만에 신탁구조 설계"}
          </button>
          {vehicle.trust && (
            <div style={{ marginTop: 16 }}>
              <div className="divider" />
              <div className="row between"><span className="tiny">신탁재산 평가액</span><b style={{ color: "var(--mint)" }}>{won(8000)} → {won(8240)} (+3.0%)</b></div>
              <div className="commit-bar mt-8"><i style={{ width: "62%" }} /></div>
              <div className="tiny mt-8">표준계약: 유언대용신탁 · 수익자연속신탁 · 한화생명 + 얼라이언스 로펌 매칭</div>
            </div>
          )}
        </div>

        {/* Family LLC */}
        <div className="card">
          <div className="card-head">
            <div className="card-title">🏗 가족 유한회사(Family LLC) 빌더 <small>FCF 메인 주머니</small></div>
            <span className="card-tag">{vehicle.llc ? "설립완료" : "미설립"}</span>
          </div>
          <div className={"build-step" + (vehicle.llc ? " done" : "")}><div className="no">1</div><div><h5>투자전문 유한회사 정관 생성</h5><p>CFO 훼손 없이 FCF 수령 구조</p></div></div>
          <div className={"build-step" + (vehicle.llc ? " done" : "")}><div className="no">2</div><div><h5>메인법인 FCF 연동 (과세이연)</h5><p>배당 대신 투자형 자금이동</p><div className="meta">연 {won(880)} 수혈 한도</div></div></div>
          <div className={"build-step" + (vehicle.llc ? " done" : "")}><div className="no">3</div><div><h5>대체투자 출자 게이트 개방</h5><p>STEP 3 딜룸 자본집행 연결</p></div></div>
          <button className={"btn btn-block mt-16 " + (vehicle.llc ? "btn-line" : "btn-primary")} onClick={buildLLC} disabled={vehicle.llc}>
            {vehicle.llc ? "✓ LLC 설립 완료 — 딜룸 게이트 개방됨" : "Family LLC 디지털 설립"}
          </button>
        </div>
      </div>

      {/* Stress test */}
      <div className="card glow mt-24">
        <div className="card-head">
          <div className="card-title">⚡ 가문-법인 통합 실시간 스트레스 테스트 <small>매크로 변수 충격 시뮬레이션</small></div>
          <span className="status-line"><span className="led g" />실시간 감시</span>
        </div>
        <div className="grid g-4">
          {DB.stress.map((s) => (
            <div className="metric" key={s.k}>
              <div className="label"><span className={"led " + s.sev} />{s.k}</div>
              <div className={"value " + (s.shock < 95 ? "down" : "")} style={{ fontSize: 22 }}>{s.shock - 100 >= 0 ? "+" : ""}{s.shock - 100}%</div>
              <div className={"delta " + (s.sev === "r" ? "down" : "")}>가문자산 충격도</div>
            </div>
          ))}
        </div>
        <div className="row between mt-24">
          <span className="muted" style={{ fontSize: 12.5 }}>신용스프레드 +200bp 시나리오에서 <b style={{ color: "var(--red)" }}>-11% 손실</b>이 감지됩니다. 방어 리밸런싱을 권고합니다.</span>
          <button className="btn btn-ghost btn-sm" onClick={rebalance}>방어 리밸런싱 실행</button>
        </div>
      </div>

      {/* FX / Tax emulator */}
      <div className="card mt-24">
        <div className="card-head">
          <div className="card-title">🌐 외국환거래법 & 국세청 자금출처 사전 소명 에뮬레이터</div>
          <span className="card-tag">사전 리스크 0화</span>
        </div>
        <table className="tbl">
          <thead><tr><th>점검 항목</th><th>요건</th><th>상태</th><th>조치</th></tr></thead>
          <tbody>
            <tr><td>해외직접투자 신고 (외국환거래법)</td><td>100억↑ 사전신고</td><td><span className="pill sr">자동작성 가능</span></td><td><span className="link">양식 생성 →</span></td></tr>
            <tr><td>자금출처 무결성 (배당·지분매각)</td><td>출처 소명서</td><td><span className="pill sr">AI 검증 통과</span></td><td><span className="link">소명서 →</span></td></tr>
            <tr><td>국세청 외환 모니터링 리스크</td><td>사후조사 대응</td><td><span className="pill mz">중위험</span></td><td><span className="link">시뮬 →</span></td></tr>
          </tbody>
        </table>
        <div className="row between mt-24">
          <span className="status-line"><span className="led g" />STEP 2 완료 시 STEP 3 딜룸이 개방됩니다.</span>
          <button className="btn btn-primary" disabled={!vehicle.llc} onClick={() => navigate("/step3")}>STEP 3 · 딜룸 진입 →</button>
        </div>
      </div>
    </>
  );
}
