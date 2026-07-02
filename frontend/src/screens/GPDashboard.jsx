import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DB } from "../data.js";
import { won } from "../utils.js";
import Chevron from "../components/Chevron.jsx";

/* 운용사(GP) 콘솔 — 기본 구조.
   - 내가 판매 중인 펀드 리스트
   - 선택한 펀드의 고객(가입완료/가입희망) 현황
   - 포트폴리오 기업 개별 보고서(영업보고서/심사)를 AI로 자동 산출 → 투자자 전송
   AI 산출·전송은 아직 실연동 전이라 화면 내 상태 전이만 시뮬레이션한다.
   (추후 세부 개발 예정) */
export default function GPDashboard() {
  const navigate = useNavigate();
  const [fundId, setFundId] = useState(DB.gpFunds[0].id);
  const [reportState, setReportState] = useState({}); // portfolioId -> "ready" | "sent"

  const fund = DB.gpFunds.find((f) => f.id === fundId);
  const pct = Math.min(100, Math.round((fund.aum / fund.target) * 100));

  const generateReport = (pid) => setReportState((s) => ({ ...s, [pid]: "ready" }));
  const sendReport = (pid) => setReportState((s) => ({ ...s, [pid]: "sent" }));

  return (
    <div className="onb scroll">
      <div className="onb-inner gp-inner">
        <button className="onb-back" onClick={() => navigate("/welcome")}><Chevron dir="left" /> 역할 다시 선택</button>

        <header className="cs-head">
          <div className="view-eyebrow">MANAGER · 운용사 콘솔</div>
          <h1 className="cs-title">판매 펀드와 투자자 현황을<br />한 화면에서 관리하세요</h1>
          <p className="cs-sub">기본 구조 미리보기 · AI 보고서 자동화는 추후 세부 개발 예정입니다.</p>
        </header>

        <div className="gp-fund-tabs">
          {DB.gpFunds.map((f) => (
            <button
              key={f.id}
              className={"gp-fund-tab" + (f.id === fundId ? " active" : "")}
              onClick={() => setFundId(f.id)}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">{fund.name}<small>{fund.cat}</small></div>
            <span className="card-tag">{fund.status}</span>
          </div>
          <div className="gp-progress">
            <div className="gp-progress-bar"><i style={{ width: pct + "%" }} /></div>
            <div className="gp-progress-label">{won(fund.aum)} / {won(fund.target)} 모집 · {pct}%</div>
          </div>
        </div>

        <div className="card mt-16">
          <div className="card-head">
            <div className="card-title">고객 현황<small>가입완료 · 가입희망</small></div>
            <span className="card-tag">{fund.investors.length}명</span>
          </div>
          <div className="gp-investor-list">
            {fund.investors.map((inv, i) => (
              <div className="gp-investor-row" key={i}>
                <span className="gp-investor-name">
                  {inv.name}
                  <span className="tiny"> · {inv.type}</span>
                </span>
                <span className={"pill " + (inv.stage === "가입완료" ? "sr" : "mz")}>{inv.stage}</span>
                <span className="gp-investor-amt">{inv.amount > 0 ? won(inv.amount) : "-"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card mt-16">
          <div className="card-head">
            <div className="card-title">포트폴리오 기업 보고서<small>영업보고서 · 심사 — AI 자동 산출</small></div>
            <span className="card-tag">{fund.portfolio.length}개사</span>
          </div>
          <div className="gp-report-list">
            {fund.portfolio.map((p) => {
              const st = reportState[p.id];
              return (
                <div className="gp-report-row" key={p.id}>
                  <div className="gp-report-name">
                    {p.name}
                    <span className="tiny"> · {p.sector}</span>
                    <div className="tiny">
                      {st === "sent" ? "투자자 전송 완료" : p.lastReport ? `최근 보고서 ${p.lastReport}` : "생성된 보고서 없음"}
                    </div>
                  </div>
                  {!st && (
                    <button className="btn btn-line" onClick={() => generateReport(p.id)}>AI 보고서 생성</button>
                  )}
                  {st === "ready" && (
                    <button className="btn btn-primary" onClick={() => sendReport(p.id)}>투자자에게 전송</button>
                  )}
                  {st === "sent" && <span className="pill sr">전송완료</span>}
                </div>
              );
            })}
          </div>
        </div>

        <p className="ut-foot">※ 기본 구조 화면입니다. AI 보고서 엔진·자동 전송 실연동은 추후 개발 예정입니다.</p>
      </div>
    </div>
  );
}
