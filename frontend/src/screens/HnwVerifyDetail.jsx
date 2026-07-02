import { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

/* 전문투자자 자격 확인 — 방법별 세부 화면.
   세 경로 모두 마지막 버튼을 누르면 "인증 완료" 알림을 띄우고 관심 산업 선택 화면으로 이동한다. */
const ROUTE_LABEL = { linked: "경로 A", mydata: "경로 B", consult: "경로 C" };
const TITLES = {
  linked: "확인증으로 진행하기",
  mydata: "마이데이터로 진행하기",
  consult: "상담으로 진행하기",
};
const CTA = {
  linked: "업로드 완료, 인증 절차 마치기",
  mydata: "동의 완료, 인증 절차 마치기",
  consult: "상담 예약하고 인증 절차 마치기",
};

export default function HnwVerifyDetail() {
  const { method } = useParams();
  const navigate = useNavigate();
  const { toast } = useApp();
  const [consultWay, setConsultWay] = useState(null); // "video" | "branch" | null

  if (!TITLES[method]) return <Navigate to="/welcome/hnw/signup" replace />;

  const ready = method !== "consult" || consultWay !== null;

  const complete = () => {
    toast({
      title: "전문투자자 인증이 완료되었습니다", icon: "✓",
      body: "관심 있는 산업을 먼저 골라주시면 딱 맞는 투자처를 보여드려요.",
    });
    navigate("/welcome/hnw/sector");
  };

  return (
    <div className="onb scroll">
      <div className="onb-inner">
        <div className="view-eyebrow">{ROUTE_LABEL[method]}</div>
        <div className="row" style={{ gap: 10, margin: "8px 0 22px" }}>
          <button className="onb-back" style={{ margin: 0, padding: 0, fontSize: 20 }} onClick={() => navigate("/welcome/hnw/signup")}>‹</button>
          <strong style={{ fontSize: 18, fontWeight: 800 }}>{TITLES[method]}</strong>
        </div>

        {method === "linked" && <LinkedBody />}
        {method === "mydata" && <MydataBody />}
        {method === "consult" && <ConsultBody way={consultWay} onPick={setConsultWay} />}

        <button
          className="btn btn-primary btn-block mt-24"
          disabled={!ready}
          onClick={complete}
          style={{ opacity: ready ? 1 : .5, cursor: ready ? "pointer" : "not-allowed" }}
        >
          {method === "consult" && !ready ? "영상상담 또는 지점 방문을 선택해주세요" : CTA[method]}
        </button>
      </div>
    </div>
  );
}

/* 경로 A · 확인증 업로드 */
function LinkedBody() {
  const [uploaded, setUploaded] = useState(false);
  return (
    <>
      <div className="card">
        <strong style={{ fontSize: 15 }}>확인증만 있으면 바로 확인돼요</strong>
        <p className="tiny mt-8">다른 증권사에서 받은 전문투자자 확인증(PDF)을 업로드해 주세요.</p>
        <div className="dropzone mt-16" onClick={() => setUploaded(true)}>
          <div className="ic">📄</div>
          {uploaded ? (
            <>
              <strong style={{ color: "var(--mint)" }}>✓ 확인증_2026.pdf 업로드 완료</strong>
              <span>다시 선택하려면 탭하세요</span>
            </>
          ) : (
            <>
              <strong>탭해서 확인증 파일 업로드</strong>
              <span>PDF · 5MB 이하</span>
            </>
          )}
        </div>
      </div>
      <div className="card mt-16" style={{ background: "var(--panel-2)" }}>
        <div className="status-line"><span className="led a" />업로드 후 짧은 영상통화(약 10분)로 본인 확인을 마치면 인증이 완료돼요.</div>
      </div>
    </>
  );
}

/* 경로 B · 마이데이터 자동 확인 */
function MydataBody() {
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(false);

  return (
    <>
      <div className="card">
        <strong style={{ fontSize: 15 }}>동의만 하면 자동으로 확인돼요</strong>
        <p className="tiny mt-8">서류 제출 없이 마이데이터로 금융자산과 소득을 자동 조회해요.</p>
        <label style={{ display: "flex", gap: 8, alignItems: "flex-start", cursor: "pointer", marginTop: 16 }}>
          <input type="checkbox" checked={c1} onChange={() => setC1((v) => !v)} style={{ marginTop: 2 }} />
          <span className="muted" style={{ fontSize: 12.5 }}>금융자산 조회에 동의해요 (증권 · 예금 · 펀드 등 합산)</span>
        </label>
        <label style={{ display: "flex", gap: 8, alignItems: "flex-start", cursor: "pointer", marginTop: 12 }}>
          <input type="checkbox" checked={c2} onChange={() => setC2((v) => !v)} style={{ marginTop: 2 }} />
          <span className="muted" style={{ fontSize: 12.5 }}>국세청 소득금액증명 조회에 동의해요</span>
        </label>
      </div>
      <div className="card mt-16" style={{ background: "var(--panel-2)" }}>
        <div className="status-line"><span className="led a" />동의 후 짧은 영상통화(약 15분)로 본인 확인을 마치면 인증이 완료돼요.</div>
      </div>
    </>
  );
}

/* 경로 C · 담당자 상담 (첨부 화면 준용) — 영상상담/지점방문 중 하나를 골라야 예약 버튼이 활성화된다 */
function ConsultBody({ way, onPick }) {
  const DOCS = [
    "신분증",
    "소득금액증명원 (홈택스 발급 가능)",
    "금융자산 잔고증명서 (각 금융사 발급)",
    "전문 자격증 사본 (해당자만 — 변호사, 회계사, 세무사 등)",
  ];

  return (
    <>
      <div className="card">
        <strong style={{ fontSize: 15 }}>담당자와 함께 진행해요</strong>
        <p className="tiny mt-8">서류 준비부터 자격 확인까지 담당자가 안내해드려요. 처음이라 잘 모르겠다면 이 방법이 편해요.</p>

        <div className="grid g-2 mt-16">
          <button
            className={"metric" + (way === "video" ? " sel" : "")}
            style={{ textAlign: "center", cursor: "pointer", width: "100%", fontFamily: "inherit" }}
            onClick={() => onPick("video")}
          >
            <span className="ut-ic" style={{ margin: "0 auto 10px" }}>{ICONS.video}</span>
            <div style={{ fontWeight: 700, fontSize: 13, color: "var(--txt)" }}>영상상담</div>
            <div className="tiny mt-8">약 30분</div>
            <div className="tiny">오늘 바로 가능</div>
          </button>
          <button
            className={"metric" + (way === "branch" ? " sel" : "")}
            style={{ textAlign: "center", cursor: "pointer", width: "100%", fontFamily: "inherit" }}
            onClick={() => onPick("branch")}
          >
            <span className="ut-ic" style={{ margin: "0 auto 10px" }}>{ICONS.home}</span>
            <div style={{ fontWeight: 700, fontSize: 13, color: "var(--txt)" }}>지점 방문</div>
            <div className="tiny mt-8">가까운 지점</div>
            <div className="tiny">사전 예약 권장</div>
          </button>
        </div>
      </div>

      <div className="card mt-16">
        <div className="card-title">준비하면 좋은 서류</div>
        <div className="hnw-verify-steps" style={{ marginTop: 12, paddingTop: 0, borderTop: "none" }}>
          {DOCS.map((d) => <div className="hnw-verify-step" key={d}><span>✓</span>{d}</div>)}
        </div>
      </div>
    </>
  );
}

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const ICONS = {
  video: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...S}>
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...S}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  ),
};
