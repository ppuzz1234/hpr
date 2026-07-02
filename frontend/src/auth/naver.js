/* ============================================================
   네이버 로그인 (OAuth 2.0 Authorization Code) — 실연동
   ------------------------------------------------------------
   동작 방식
   1) 백엔드 /api/auth/naver/status 로 자격증명(클라이언트 ID/Secret)
      설정 여부를 확인한다.
   2) 설정되어 있으면 팝업으로 /api/auth/naver/login 을 열고, 백엔드가
      네이버 인증 → 콜백(코드 교환 → 프로필 조회) 후 window.postMessage
      로 프로필을 부모창에 돌려준다.
   3) 자격증명 미설정(데모 환경)이면 즉시 데모 프로필을 반환해 흐름을 유지.

   실연동 활성화: backend/.env 에 아래 값 설정 후 백엔드 재시작
     NAVER_CLIENT_ID=...
     NAVER_CLIENT_SECRET=...
     NAVER_CALLBACK_URL=http://localhost:4599/api/auth/naver/callback
   그리고 네이버 개발자센터(애플리케이션 등록)의 Callback URL 을 동일하게 등록.
   ============================================================ */

const API = (import.meta.env.VITE_API_BASE || "/api") + "/auth/naver";

async function isConfigured() {
  try {
    const res = await fetch(`${API}/status`);
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data.configured);
  } catch {
    return false;
  }
}

function demoProfile() {
  return {
    provider: "naver",
    demo: true,
    name: "네이버 사용자",
    email: "investor@naver.com",
    nickname: "Barbell Member",
  };
}

// 팝업 기반 실연동 로그인. 프로필(또는 데모 프로필)로 resolve.
export async function loginWithNaver() {
  const configured = await isConfigured();
  if (!configured) {
    // 데모 환경: 실제 네이버 호출 없이 흐름 유지
    await new Promise((r) => setTimeout(r, 600));
    return demoProfile();
  }

  return new Promise((resolve, reject) => {
    const w = 480, h = 720;
    const left = window.screenX + (window.outerWidth - w) / 2;
    const top = window.screenY + (window.outerHeight - h) / 2;
    const popup = window.open(
      `${API}/login`,
      "naver_login",
      `width=${w},height=${h},left=${left},top=${top}`
    );
    if (!popup) {
      reject(new Error("팝업이 차단되었습니다. 팝업 허용 후 다시 시도해 주세요."));
      return;
    }

    const onMessage = (e) => {
      if (!e.data || e.data.source !== "naver-login") return;
      cleanup();
      if (e.data.error) reject(new Error(e.data.error));
      else resolve({ provider: "naver", ...e.data.profile });
    };

    const poll = setInterval(() => {
      if (popup.closed) { cleanup(); reject(new Error("로그인 창이 닫혔습니다.")); }
    }, 500);

    function cleanup() {
      clearInterval(poll);
      window.removeEventListener("message", onMessage);
      try { if (popup && !popup.closed) popup.close(); } catch { /* noop */ }
    }

    window.addEventListener("message", onMessage);
  });
}
