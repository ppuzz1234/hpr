import { useNavigate } from "react-router-dom";

/* 전문투자자 자격 확인 방법 선택 — 세 가지 경로 모두 결국 본인인증(영상통화)으로 귀결된다 */
const OPTIONS = [
  {
    key: "linked", icon: "doc", badge: "가장 빠름",
    title: "이미 전문투자자예요",
    sub: "다른 증권사에서 받은 확인증이 있어요",
    steps: ["확인증 파일 업로드", "영상통화 (10분) → 완료"],
  },
  {
    key: "mydata", icon: "cube", badge: "서류 없음",
    title: "자산·소득으로 증명해요",
    sub: "마이데이터로 자동 조회해요",
    steps: ["동의 한 번 → 금융자산 자동 확인", "국세청 연동 → 소득 자동 확인", "영상통화 (15분) → 완료"],
  },
  {
    key: "consult", icon: "people", badge: null,
    title: "상담하며 진행할게요",
    sub: "영상상담 또는 지점 방문",
    steps: ["담당자와 함께 서류 정리", "영상상담 30분 또는 지점 방문"],
  },
];

export default function HnwSignup() {
  const navigate = useNavigate();

  return (
    <div className="onb scroll">
      <div className="onb-inner">
        <button className="onb-back" onClick={() => navigate("/welcome/hnw")}>‹ 뒤로</button>

        <header className="view-head">
          <div className="view-eyebrow">INDIVIDUAL · 전문투자자 자격 확인</div>
          <div className="view-title">어떻게 확인할까요?</div>
          <div className="view-sub">세 가지 방법 중 나에게 맞는 걸 골라주세요. 어떤 방법이든 마지막에 짧은 영상통화가 있어요.</div>
        </header>

        <div className="hnw-verify-list">
          {OPTIONS.map((o) => (
            <button key={o.key} className="hnw-verify-card" onClick={() => navigate(`/welcome/hnw/signup/${o.key}`)}>
              <div className="row between">
                <span className="ut-ic">{ICONS[o.icon]}</span>
                <span className="ut-caret">›</span>
              </div>
              <div className="row" style={{ gap: 8, marginTop: 12 }}>
                <strong style={{ fontSize: 15 }}>{o.title}</strong>
                {o.badge && <span className="pill sr">{o.badge}</span>}
              </div>
              <p className="tiny" style={{ marginTop: 4 }}>{o.sub}</p>
              <div className="hnw-verify-steps">
                {o.steps.map((s) => (
                  <div className="hnw-verify-step" key={s}><span>✓</span>{s}</div>
                ))}
              </div>
            </button>
          ))}
        </div>

        <p className="ut-foot">어떤 경로든 마지막엔 영상통화(또는 방문)가 있어요. 이건 법으로 정해진 절차라 건너뛸 수 없어요.</p>
      </div>
    </div>
  );
}

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const ICONS = {
  doc: (
    <svg viewBox="0 0 24 24" width="24" height="24" {...S}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M9 13h6M9 17h6" />
    </svg>
  ),
  cube: (
    <svg viewBox="0 0 24 24" width="24" height="24" {...S}>
      <path d="M12 2 3 7v10l9 5 9-5V7z" />
      <path d="M3 7l9 5 9-5M12 12v10" />
    </svg>
  ),
  people: (
    <svg viewBox="0 0 24 24" width="24" height="24" {...S}>
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z" />
      <path d="M22 21v-2a4 4 0 00-3-3.87M15 3.13a4 4 0 010 7.75" />
    </svg>
  ),
};
