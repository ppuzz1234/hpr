import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

/* 전문투자자 인증 완료 → 딜 리스트 진입 사이에 끼우는 관심 산업 선택 화면.
   큼직한 타일 + 아이콘으로 섹터를 고르게 하고, 선택값은 컨텍스트에 저장해 둔다
   (현재 목업 딜 5종은 이 7개 분류와 1:1로 태깅돼 있지 않아 실제 필터링은 아직 하지 않음). */
const SECTORS = [
  { key: "ai", icon: "🧠", ko: "AI·빅데이터", en: "AI / Big Data", desc: "기계학습, 자연어 처리, 데이터 분석 솔루션" },
  { key: "fintech", icon: "🪙", ko: "핀테크·블록체인", en: "Fintech / Blockchain", desc: "금융 기술, 가상자산, 간편결제, 보안" },
  { key: "commerce", icon: "📦", ko: "커머스·물류", en: "Commerce / Logistics", desc: "이커머스, D2C, 라스트마일 배송, 풀필먼트" },
  { key: "health", icon: "🧬", ko: "헬스케어·바이오", en: "Healthcare / Bio", desc: "디지털 치료제, 원격의료, 신약 개발 플랫폼" },
  { key: "edu", icon: "🎓", ko: "에듀테크·HR", en: "Edtech / HR Tech", desc: "온라인 교육 플랫폼, 채용 및 인재 관리 솔루션" },
  { key: "saas", icon: "☁️", ko: "SaaS·B2B 솔루션", en: "SaaS / B2B", desc: "기업용 업무 협업 툴, 클라우드 인프라" },
  { key: "robotics", icon: "🤖", ko: "로보틱스·모빌리티", en: "Robotics / Mobility", desc: "자율주행, 드론, 물류 로봇" },
];

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
          {SECTORS.map((s) => (
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
