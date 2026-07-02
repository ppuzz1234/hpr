import { Fragment, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BrandMark from "../components/BrandMark.jsx";

/* 로그인 직후 노출되는 스크롤 기반 에디토리얼 스토리텔링 온보딩.
   신탁 → 해외 SPV → 타겟기업으로 이어지는 투자 구조 전체를 스크롤에 맞춰
   보여주고, 마지막 CTA를 눌러야 다음 단계(개인투자 랜딩)로 넘어간다.
   상단 시각 영역(.story-visual)은 sticky로 고정된 채, 아래 텍스트 패널이
   IntersectionObserver로 뷰포트 중앙을 지날 때마다 아이콘/흐름도가 전환된다. */
const SCENES = [
  {
    icon: "🪪",
    eyebrow: "STEP 1 · 자격 확인",
    title: "가장 먼저,\n전문투자자 자격을 확인해요",
    body: "당사 전문투자자 등록 여부를 자동으로 확인하고, 미등록 고객은 마이데이터 연동으로 금융자산·소득 증빙을 스크래핑해 1분 만에 심사받을 수 있어요.",
  },
  {
    icon: "🏦",
    eyebrow: "STEP 2 · 자산 보관",
    title: "투자금은 안전한\n특정금전신탁으로 보관돼요",
    body: "고객님의 투자금은 증권사의 특정금전신탁 계좌에 예치되어, 신탁업법의 엄격한 감독 아래 분리 관리됩니다.",
  },
  {
    icon: "💱",
    eyebrow: "STEP 3 · 해외 송금",
    title: "신탁 자금이 환전을 거쳐\n현지 SPV로 이동해요",
    body: "운용지시에 따라 원화를 외화로 환전한 뒤, 미국 현지에 설립된 딜 전용 SPV(특수목적법인)의 지분 인수 대금으로 송금돼요.",
  },
  {
    icon: "🚀",
    eyebrow: "STEP 4 · 지분 확보",
    title: "SPV가 글로벌 유니콘의\n지분을 취득해요",
    body: "SPV는 송금받은 자금으로 OpenAI, Anthropic 같은 북미 비상장기업의 주식을 취득하고 주주명부에 등재됩니다.",
  },
  {
    icon: "📈",
    eyebrow: "STEP 5 · 사후 관리",
    title: "투자 이후에도\n계속 지켜봐 드려요",
    body: "후속 투자 유치(라운드 변동), 주요 공시, 뉴스, 지분가치 평가액을 앱 대시보드에서 주기적으로 확인할 수 있어요.",
  },
  {
    icon: "💰",
    eyebrow: "STEP 6 · 매각 및 회수",
    title: "상장·M&A가 성사되면\n수익이 다시 돌아와요",
    body: "IPO, M&A, 구주 매각 같은 엑싯 이벤트가 발생하면 매각 대금이 SPV → 신탁계좌를 거쳐 고객님의 위탁계좌로 정산돼요.",
  },
];

const NODES = [
  { key: "trust", icon: "🏦", label: "신탁계좌" },
  { key: "spv", icon: "🌐", label: "해외 SPV" },
  { key: "company", icon: "🚀", label: "대상기업" },
];

export default function HnwStory() {
  const navigate = useNavigate();
  const location = useLocation();
  const jumpToEnd = Boolean(location.state?.scrollBottom);
  const panelRefs = useRef([]);
  const pageRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(jumpToEnd ? SCENES.length - 1 : 0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveIndex(Number(e.target.dataset.index));
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );
    panelRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // HnwAbout("어떤 자격이 필요한가요?")에서 뒤로 왔을 때는 맨 위가 아니라
  // 가장 스크롤다운된 마지막(CTA) 화면으로 복귀시킨다.
  useEffect(() => {
    if (jumpToEnd && pageRef.current) {
      pageRef.current.scrollTop = pageRef.current.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => navigate("/welcome/hnw", { replace: true });
  const goVerify = () => navigate("/welcome/hnw/signup");

  const nodeActive = [
    [1, 2, 5].includes(activeIndex),
    [2, 3, 5].includes(activeIndex),
    [3, 4, 5].includes(activeIndex),
  ];
  const arrowActive = [[2, 5].includes(activeIndex), [3, 5].includes(activeIndex)];
  const reverse = activeIndex === 5;

  return (
    <div className="story-page" ref={pageRef}>
      <div className="story-visual">
        <div className="story-visual-top">
          <span className="story-brand"><BrandMark size={18} /> PLUS Barbell</span>
          <button className="story-skip" onClick={finish}>건너뛰기 →</button>
        </div>

        <div className="story-flow">
          {NODES.map((n, i) => (
            <Fragment key={n.key}>
              {i > 0 && (
                <span className={"story-arrow" + (arrowActive[i - 1] ? " active" : "") + (reverse ? " reverse" : "")}>
                  <i />
                </span>
              )}
              <span className={"story-node" + (nodeActive[i] ? " active" : "")}>
                <span className="dot">{n.icon}</span>
                <span className="lbl">{n.label}</span>
              </span>
            </Fragment>
          ))}
        </div>

        <div className="story-icon-stage">
          {SCENES.map((s, i) => (
            <div key={i} className={"story-icon" + (i === activeIndex ? " active" : "")}>{s.icon}</div>
          ))}
        </div>
      </div>

      <div className="story-scroll">
        {SCENES.map((s, i) => (
          <section
            key={i}
            className="story-panel"
            data-index={i}
            ref={(el) => (panelRefs.current[i] = el)}
          >
            <div className="story-eyebrow">{s.eyebrow}</div>
            <h2 className="story-title">{s.title.split("\n").map((l, j) => <span key={j}>{l}<br /></span>)}</h2>
            <p className="story-body">{s.body}</p>
          </section>
        ))}

        <section className="story-panel story-cta">
          <div className="story-eyebrow">READY</div>
          <h2 className="story-title">이제 이 여정을<br />함께 시작해볼까요?</h2>
          <p className="story-body">딜 탐색, 계약, 트래킹, 매각까지 —<br />전 과정을 앱 안에서 안내해 드릴게요.</p>
          <button className="btn btn-primary btn-block mt-24" onClick={goVerify}>투자자격 확인하러 가기 →</button>
          <button className="login-alt" style={{ margin: "12px auto 0", display: "block" }} onClick={() => navigate("/welcome/hnw/about")}>
            어떤 자격이 필요한가요?
          </button>
        </section>
      </div>

      <div className={"story-scrolldown" + (activeIndex === 0 ? "" : " hide")}>
        <span>아래로 스크롤해서 계속 보기</span>
        <svg className="story-scrolldown-ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
