import { useNavigate } from "react-router-dom";
import { DB } from "../data.js";
import { won } from "../utils.js";
import { useApp } from "../context/AppContext.jsx";

export default function Home() {
  const navigate = useNavigate();
  const { company } = useApp();
  const d = company.diag;

  const JourneyCard = ({ no, tag, title, sub, to }) => (
    <div className="card" style={{ cursor: "pointer" }} onClick={() => navigate(to)}>
      <div className="row between">
        <div className="brand-mark" style={{ width: 38, height: 38, fontSize: 16 }}>{no}</div>
        <span className="card-tag">{tag}</span>
      </div>
      <div className="card-title" style={{ marginTop: 16, fontSize: 15 }}>{title}</div>
      <p className="muted" style={{ marginTop: 8, fontSize: 12.5 }}>{sub}</p>
      <div style={{ marginTop: 14, color: "var(--mint)", fontSize: 12.5, fontWeight: 700 }}>바로가기 →</div>
    </div>
  );

  return (
    <>
      <div className="hero glow">
        <div className="view-eyebrow">CLOSED · TOP 0.1% MULTI-FAMILY OFFICE</div>
        <h1>법인의 잉여현금을<br /><span className="accent">가문의 영속자본</span>으로.</h1>
        <p>재무 진단부터 비히클 설립, 한화 밸류체인 기반 대체투자 집행까지 — 데이터 기반 논리와 실질 투자를 하나로 잇는 폐쇄형 올인원 패밀리오피스.</p>
        <div className="stat-row">
          <div className="stat"><div className="n">37.38%</div><div className="l">4년 누적 가문 수익률</div></div>
          <div className="stat"><div className="n">{won(DB.fof.aum)}</div><div className="l">통합 운용자산(AUM)</div></div>
          <div className="stat"><div className="n">0.1%</div><div className="l">검증된 가문 법인만 입장</div></div>
        </div>
        <div className="cta-row">
          <button className="btn btn-primary" onClick={() => navigate("/step1")}>3-Click 진단 시작 →</button>
          <button className="btn btn-ghost" onClick={() => navigate("/step3")}>딜룸 미리보기</button>
        </div>
      </div>

      <div className="grid g-3 mt-32">
        <JourneyCard no="①" tag="STEP 1 · 진단" title="FCF 시뮬레이터 + AI 웰스 어드바이저" sub="재무제표 PDF 한 장으로 30초 만에 ROIC 정체구간·기회비용 도출" to="/step1" />
        <JourneyCard no="②" tag="STEP 2 · 비히클 설립" title="디지털 가족신탁 · Family LLC 빌더" sub="FCF를 담을 그릇을 만들고, 매크로 스트레스 테스트로 방어" to="/step2" />
        <JourneyCard no="③" tag="STEP 3 · 딜룸 집행" title="Tranching 공급망 · 클럽딜 · Fund of Funds" sub="한화가 선인수한 기관급 대체자산을 폐쇄 딜룸에서 공동집행" to="/step3" />
      </div>

      <div className="row between mt-32" style={{ marginBottom: -10 }}>
        <div className="view-eyebrow">선택 법인 · {company.name}</div>
        <span className="tiny">{company.sector}</span>
      </div>
      <div className="grid g-4 mt-24">
        <div className="metric"><div className="label">유휴자본 기회비용</div><div className="value down">-{d.oppCost}억<small style={{ fontSize: 13, color: "var(--txt-3)" }}>/년</small></div><div className="delta down">유휴현금 정체</div></div>
        <div className="metric"><div className="label">안전 이전 가능액</div><div className="value mint">{won(d.deployable)}</div><div className="delta up">CFO 훼손 0%</div></div>
        <div className="metric"><div className="label">가문 실효세부담률</div><div className="value">{company.family.effTaxRate}%</div><div className="delta up">▼ 듀얼구조 최적화 여지</div></div>
        <div className="metric"><div className="label">진단 스코어</div><div className="value mint">{d.score}</div><div className="delta">자산이전 준비도</div></div>
      </div>
    </>
  );
}
