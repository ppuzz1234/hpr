import { useNavigate } from "react-router-dom";
import { DB } from "../data.js";
import { useApp } from "../context/AppContext.jsx";

/* 전문투자자 인증 완료 → 딜 리스트 진입 사이에 끼우는 관심 산업 선택 화면.
   큼직한 타일 + 아이콘으로 섹터를 고르게 하고, 선택값은 컨텍스트에 저장해 두면
   딜 리스트(HnwInvest)가 최초 1회 진입 시 이 값으로 필터를 미리 적용한다. */
export default function HnwSectorSelect() {
  const navigate = useNavigate();
  const { setUserType, enter, setSectorInterest } = useApp();

  const pick = (key) => {
    setSectorInterest(key);
    setUserType("hnw");
    enter();
    navigate("/hnw/invest", { replace: true });
  };

  const skip = () => {
    setSectorInterest(null);
    setUserType("hnw");
    enter();
    navigate("/hnw/invest", { replace: true });
  };

  return (
    <div className="onb scroll">
      <div className="onb-inner">
        <header className="view-head">
          <div className="view-eyebrow">INDIVIDUAL · 관심 산업 선택</div>
          <div className="view-title">어떤 산업에 관심 있으세요?</div>
          <div className="view-sub">선택하신 분야에 맞는 투자처를 먼저 보여드려요.</div>
        </header>

        <div className="sector-grid">
          {DB.hnwSectors.map((s) => (
            <button key={s.key} className="sector-tile" onClick={() => pick(s.key)}>
              <span className="sector-ic">{s.icon}</span>
              <strong className="sector-ko">{s.ko}</strong>
              <span className="sector-en">{s.en}</span>
              <p className="sector-desc">{s.desc}</p>
            </button>
          ))}
        </div>

        <button className="login-alt" style={{ margin: "16px auto 0", display: "block" }} onClick={skip}>
          건너뛰고 전체 보기
        </button>
      </div>
    </div>
  );
}
