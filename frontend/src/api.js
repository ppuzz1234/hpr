/* 백엔드 API 헬퍼 (현재 화면은 src/data.js 목업을 사용).
   백엔드 연동 시 각 화면에서 data.js 대신 아래 함수들을 호출하도록 교체.
   dev 환경에서는 vite proxy(/api → :4600)로 전달됨. */
const BASE = import.meta.env.VITE_API_BASE || "/api";

async function req(path, options) {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API ${res.status} ${path}`);
  return res.json();
}

export const api = {
  health: () => req("/health"),
  diagnose: (payload) => req("/diagnose", { method: "POST", body: JSON.stringify(payload || {}) }),
  advisors: () => req("/advisors"),
  consult: (id, question) => req(`/advisors/${id}/consult`, { method: "POST", body: JSON.stringify({ question }) }),
  tranches: () => req("/deals/tranches"),
  clubDeals: () => req("/deals/club"),
  commit: (dealId, amount) => req("/deals/commit", { method: "POST", body: JSON.stringify({ dealId, amount }) }),
  portfolio: () => req("/portfolio"),
  singaporeLicenses: () => req("/singapore/licenses"),
};
