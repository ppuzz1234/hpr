import { useNavigate } from "react-router-dom";

/* 개인투자(HNW) 자격 안내 — 전문투자자 요건 설명 */
export default function HnwAbout() {
  const navigate = useNavigate();

  return (
    <div className="onb scroll">
      <div className="onb-inner">
        <button className="onb-back" onClick={() => navigate("/welcome/hnw")}>‹ 뒤로</button>

        <header className="cs-head">
          <div className="view-eyebrow">INDIVIDUAL · 개인투자자 자격</div>
          <h1 className="cs-title">전문투자자 자격이란</h1>
        </header>

        <div className="card">
          <p className="muted">
            금융투자상품 잔고 5억 원 이상을 보유한 개인은 전문투자자로 등록하면, 일반 투자자에게는 열리지 않는
            비상장 기업 SPV(특수목적기구) 투자 기회에 접근할 수 있습니다.
          </p>
          <div className="divider" />
          <div className="build-step"><div className="no">1</div><div><h5>금융투자상품 잔고 요건</h5><p>예탁 자산 5억 원 이상 (증권·펀드 등 합산)</p></div></div>
          <div className="build-step"><div className="no">2</div><div><h5>투자 경험 또는 소득 요건</h5><p>최근 1년 내 투자 경험, 또는 소득·자산 요건 중 하나 충족</p></div></div>
          <div className="build-step"><div className="no">3</div><div><h5>본인 인증</h5><p>비대면 인증 또는 화상 상담으로 신원과 투자 이해도를 확인</p></div></div>
        </div>

        <div className="card mt-16" style={{ background: "var(--panel-2)" }}>
          <div className="status-line"><span className="led a" />여기서 투자하는 모든 딜은 비상장 기업 주식을 직접 보유하는 것이 아니라, 그 주식을 담은 단일 종목 SPV의 지분입니다.</div>
        </div>

        <button className="btn btn-primary btn-block mt-24" onClick={() => navigate("/welcome/hnw/signup")}>자격 확인하러 가기 →</button>
      </div>
    </div>
  );
}
