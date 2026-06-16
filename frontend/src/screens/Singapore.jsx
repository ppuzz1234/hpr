import { DB } from "../data.js";
import { useApp } from "../context/AppContext.jsx";

export default function Singapore() {
  const { toast } = useApp();
  const providers = [
    ["⚖", "Allen & Gledhill", "현지 로펌 · 신탁/VCC"],
    ["📊", "KPMG Singapore", "회계 · 13U 자문"],
    ["🏢", "Tricor CSP", "법인설립·운영대행"],
  ];

  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">코어 모듈 · 글로벌 거점</div>
        <div className="view-title">싱가포르 패밀리오피스 라이선스 허브</div>
        <div className="view-sub">VCC·13O·13U 세제혜택 자격을 가문 자산 규모와 실시간 비교 검증하고, 글로벌 탑티어 프로바이더와 대외비 암호화 채널로 직접 소통합니다.</div>
      </div>

      <div className="grid g-2">
        <div className="card span-2">
          <div className="card-head"><div className="card-title">세제혜택 자격 자동 매칭 <small>가문 통합자산 S$ 31M 기준</small></div><span className="card-tag">실시간 검증</span></div>
          <table className="tbl">
            <thead><tr><th>라이선스 / 스킴</th><th>핵심 요건</th><th>충족</th><th>비고</th></tr></thead>
            <tbody>
              {DB.sgLicense.map((l) => (
                <tr key={l.k}>
                  <td><b>{l.k}</b></td>
                  <td>{l.req}</td>
                  <td>{l.ok ? <span className="pill sr">충족</span> : <span className="pill eq">미달</span>}</td>
                  <td><span className="tiny">{l.note}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary mt-24" onClick={() => toast({ title: "자격 검증 리포트 발송", icon: "◉", body: "13O 단독 패밀리오피스·VCC·법인세 면제 요건 충족. 13U는 자산요건 보강 필요 — 상세 리포트를 발송했습니다." })}>자격 검증 리포트 발송</button>
        </div>

        <div className="card">
          <div className="card-title">글로벌 프로바이더 대외비 채널</div>
          <p className="muted mt-16" style={{ fontSize: 12.5 }}>싱가포르 현지 세팅 담당 로펌·회계법인·CSP 전담 에이전트와 암호화 채널로 직접 소통합니다.</p>
          <div className="divider" />
          {providers.map((p) => (
            <div className="build-step" key={p[1]}>
              <div className="no">{p[0]}</div>
              <div><h5>{p[1]}</h5><p>{p[2]}</p><div className="meta"><span className="status-line"><span className="led g" />온라인 · 종단간 암호화</span></div></div>
            </div>
          ))}
          <button className="btn btn-line btn-block mt-16" onClick={() => toast({ title: "대외비 채널 개설", icon: "🔒", body: "Allen & Gledhill 전담 에이전트와 암호화 채널이 열렸습니다. 모든 통신은 대외비로 처리됩니다." })}>대외비 채널 개설</button>
        </div>
      </div>
    </>
  );
}
