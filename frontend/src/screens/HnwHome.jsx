import { useNavigate } from "react-router-dom";
import { DB } from "../data.js";
import { won, manwon } from "../utils.js";

export default function HnwHome() {
  const navigate = useNavigate();

  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">INDIVIDUAL · 개인투자 딜룸</div>
        <div className="view-title">지금 모집 중인 투자처</div>
        <div className="view-sub">해외 비상장 기업 지분을 담은 단일 종목 SPV에, 전문투자자 자격으로 참여합니다.</div>
      </div>

      <div className="grid g-2">
        {DB.hnwDeals.map((d) => (
          <div className="deal-card" key={d.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/hnw/deal/${d.id}`)}>
            <div className="hnw-deal-banner" style={{ borderLeftColor: d.accent }}>
              <span className="stage" style={{ color: d.accent }}>{d.tag}</span>
              <p className="desc">{d.desc}</p>
            </div>
            <div className="deal-body">
              <div className="row between">
                <h4>{d.name}</h4>
                <span className="card-tag">{d.badge}</span>
              </div>
              <div className="deal-meta">
                <div><div className="k">기업가치</div><div className="v">{won(d.valuation)}</div></div>
                <div style={{ textAlign: "right" }}><div className="k">최소 투자금</div><div className="v" style={{ color: "var(--mint)" }}>{manwon(d.minInvest)}</div></div>
              </div>
              <div className="commit-bar"><i style={{ width: d.filled + "%" }} /></div>
              <button className="btn btn-primary btn-block mt-16">딜 상세 보기 →</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
