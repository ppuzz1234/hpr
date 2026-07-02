import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { companyDirectory } from "../data.js";
import { useApp } from "../context/AppContext.jsx";
import Chevron from "../components/Chevron.jsx";

/* 기관 투자자 — 기업 검색.
   회사명 또는 사업자등록번호로 검색 → 선택 시 진단 프로필 등록 후 Home 진입.
   (선택 회사는 Home 우측 상단 법인 스위처에 선택된 상태로 노출) */
export default function CompanySearch() {
  const navigate = useNavigate();
  const { registerCompany, enter, setUserType } = useApp();
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const key = q.trim().toLowerCase();
    const digits = key.replace(/\D/g, "");
    if (!key) return companyDirectory;
    return companyDirectory.filter((c) => {
      const byName = c.name.toLowerCase().includes(key);
      const byBiz = digits.length >= 2 && c.bizno.replace(/\D/g, "").includes(digits);
      return byName || byBiz;
    });
  }, [q]);

  const choose = (entry) => {
    setUserType("institution");
    registerCompany(entry); // companyId 설정 (Home 우측 상단 스위처 반영)
    enter();
    navigate("/", { replace: true });
  };

  return (
    <div className="onb scroll">
      <div className="onb-inner">
        <button className="onb-back" onClick={() => navigate("/welcome")}><Chevron dir="left" /> 역할 다시 선택</button>

        <header className="cs-head">
          <div className="view-eyebrow">INSTITUTION · 기관 투자자</div>
          <h1 className="cs-title">진단할 법인을 검색하세요</h1>
          <p className="cs-sub">회사명 또는 사업자등록번호로 검색할 수 있습니다.</p>
        </header>

        <div className="cs-search">
          <span className="cs-search-ic">⌕</span>
          <input
            // autoFocus
            className="cs-input"
            placeholder="예) 신고려관광  ·  124-81-00998"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {q && <button className="cs-clear" onClick={() => setQ("")}>✕</button>}
        </div>

        <div className="cs-list">
          {results.length === 0 ? (
            <div className="cs-empty">검색 결과가 없습니다.<br /><span>회사명 또는 사업자등록번호를 다시 확인해 주세요.</span></div>
          ) : (
            results.map((c) => (
              <button key={c.id} className="cs-item" onClick={() => choose(c)}>
                <span className="cs-bi" style={{ background: c.bi.color, color: c.bi.fg }}>{c.bi.short}</span>
                <span className="cs-meta">
                  <strong>{c.name}</strong>
                  <span className="cs-sub2">{c.sector} · 사업자 {c.bizno}</span>
                </span>
                <span className="cs-go">선택 ›</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
