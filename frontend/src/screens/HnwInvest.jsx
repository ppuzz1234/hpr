import { useNavigate } from "react-router-dom";
import { DB } from "../data.js";
import { won, manwon } from "../utils.js";

/* "투자" 탭 — 현재 모집 중인 SPV 딜 리스트 (구 HnwHome.jsx) */
export default function HnwInvest() {
  const navigate = useNavigate();

  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">INDIVIDUAL · 개인투자 딜룸</div>
        <div className="view-title">지금 모집 중인 투자처</div>
        <div className="view-sub">해외 비상장 기업 지분을 담은 단일 종목 SPV에, 전문투자자 자격으로 참여합니다.</div>
      </div>

      <div className="grid g-2">
        {DB.hnwDeals.map((d) => {
          const up = d.roundChange >= 0;
          const stage = d.filled >= 70 ? { label: "마감 임박", cls: "hot" }
            : d.filled >= 40 ? { label: "모집 중", cls: "on" }
            : { label: "모집 초기", cls: "early" };
          return (
            <div className="hnw-deal-card" key={d.id} onClick={() => navigate(`/hnw/deal/${d.id}`)}>
              <div className="deal-head">
                <div className="deal-ic" style={{ background: `color-mix(in srgb, ${d.accent} 16%, transparent)` }}>{d.icon}</div>
                <div className="deal-head-txt">
                  <div className="row between">
                    <h4>{d.name}</h4>
                    <span className="card-tag">{d.badge}</span>
                  </div>
                  <div className="deal-tagline">{d.tag}</div>
                </div>
              </div>

              <p className="deal-desc">{d.desc}</p>

              <div className="deal-meta">
                <div><div className="k">기업가치</div><div className="v">{won(d.valuation)}</div></div>
                <div style={{ textAlign: "right" }}><div className="k">최소 투자금</div><div className="v" style={{ color: "var(--mint)" }}>{manwon(d.minInvest)}</div></div>
              </div>

              <div className="deal-change">
                <span className="lbl">직전 라운드 단가 대비</span>
                <b className={up ? "up" : "down"}>{up ? "+" : ""}{d.roundChange.toFixed(2)}%</b>
              </div>

              <div className="deal-raise">
                <div className="deal-raise-head">
                  <span className={"raise-status " + stage.cls}>{stage.label}</span>
                  <span className="raise-pct">모집 약정 {d.filled}%</span>
                </div>
                <div className={"commit-bar " + stage.cls}><i style={{ width: d.filled + "%" }} /></div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
