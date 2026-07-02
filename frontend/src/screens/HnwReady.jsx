import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* 전문투자자 인증 완료 직후 잠깐 보여주는 애니메이션 랜딩.
   두 문단이 순서대로 fade in/out 되며 안내된 뒤, 자동으로 관심 산업 선택 화면으로 넘어간다.
   문구는 소스에서 바로 수정 가능하도록 일반 텍스트로 둔다. */
const LINE_1 = "글로벌 기업에 투자를 하기위한 모든 준비를 마쳤어요. 이제부터 평소에 관심있던 산업 내 기업을 보실 수 있습니다.";
const LINE_2 = "한화금융의 애널리스트 · 금융전문가들이 검토한 공신력있는 리포트를 활용하여 안전한 투자를 도와드립니다.";

const INTRO_MS = 500; // 배지만 먼저 보이는 시간
const LINE_MS = 2800; // 문단 하나가 화면에 머무는 시간
const TOTAL_MS = INTRO_MS + LINE_MS * 2;

export default function HnwReady() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: 인트로, 1: 문단1, 2: 문단2

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), INTRO_MS);
    const t2 = setTimeout(() => setStep(2), INTRO_MS + LINE_MS);
    const t3 = setTimeout(() => navigate("/welcome/hnw/sector", { replace: true }), TOTAL_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [navigate]);

  return (
    <div className="ready-page">
      <div className="ready-glow" />
      <div className="ready-core">
        <div className="ready-badge">✓</div>
        <div className="ready-lines">
          <p className={"ready-line" + (step === 1 ? " show" : "")}>{LINE_1}</p>
          <p className={"ready-line" + (step === 2 ? " show" : "")}>{LINE_2}</p>
        </div>
      </div>
      <div className="ready-bar"><i style={{ animationDuration: TOTAL_MS + "ms" }} /></div>
    </div>
  );
}
