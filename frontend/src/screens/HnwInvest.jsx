import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DB } from "../data.js";
import { won, manwon } from "../utils.js";
import { useApp } from "../context/AppContext.jsx";

/* "투자" 탭 — 현재 모집 중인 SPV 딜 리스트.
   관심 산업 선택(HnwSectorSelect) 화면에서 넘어온 sectorInterest가 있으면
   최초 진입 시 1회만 그 산업으로 필터를 미리 적용한다. 이후 컨텍스트 값은
   바로 비워서, 하단 탭바로 직접 들어온 경우엔 항상 전체 리스트로 보이게 한다. */
export default function HnwInvest() {
  const navigate = useNavigate();
  const { sectorInterest, setSectorInterest } = useApp();
  const [filter, setFilter] = useState(() => sectorInterest || "all");
  const [q, setQ] = useState("");

  useEffect(() => {
    if (sectorInterest) setSectorInterest(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deals = useMemo(() => {
    const key = q.trim().toLowerCase();
    return DB.hnwDeals.filter((d) => {
      const bySector = filter === "all" || d.sectorCat === filter;
      const byQuery = !key
        || d.name.toLowerCase().includes(key)
        || d.tag.toLowerCase().includes(key)
        || d.sector.toLowerCase().includes(key);
      return bySector && byQuery;
    });
  }, [filter, q]);

  return (
    <>
      <div className="view-head">
        <div className="view-eyebrow">INDIVIDUAL · 개인투자 딜룸</div>
        <div className="view-title">지금 모집 중인 투자처</div>
      </div>

      <div className="cs-search">
        <span className="cs-search-ic">⌕</span>
        <input
          className="cs-input"
          placeholder="회사명 · 업종으로 검색"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {q && <button className="cs-clear" onClick={() => setQ("")}>✕</button>}
      </div>

      <div className="hnw-filter-row">
        <button className={"hnw-filter-chip" + (filter === "all" ? " active" : "")} onClick={() => setFilter("all")}>전체</button>
        {DB.hnwSectors.map((s) => (
          <button
            key={s.key}
            className={"hnw-filter-chip" + (filter === s.key ? " active" : "")}
            onClick={() => setFilter(s.key)}
          >
            {s.icon} {s.ko}
          </button>
        ))}
      </div>

      {deals.length === 0 ? (
        <div className="card mt-16"><p className="muted">조건에 맞는 투자처가 아직 없어요. 다른 산업이나 검색어로 다시 찾아보세요.</p></div>
      ) : (
        <div className="grid g-2 mt-16">
          {deals.map((d) => {
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

                <div className="deal-stats">
                  <div><div className="k">기업가치</div><div className="v">{won(d.valuation)}</div></div>
                  <div><div className="k">최소 투자금</div><div className="v" style={{ color: "var(--mint)" }}>{manwon(d.minInvest)}</div></div>
                  <div><div className="k">종전 라운드 대비</div><div className={"v " + (up ? "up" : "down")}>{up ? "+" : ""}{d.roundChange.toFixed(2)}%</div></div>
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
      )}
    </>
  );
}
