import { Router } from "express";
import crypto from "node:crypto";

/* ============================================================
   네이버 로그인 OAuth 2.0 (Authorization Code) — 실연동 라우트
   환경변수(backend/.env):
     NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, NAVER_CALLBACK_URL
   콜백 URL 은 네이버 개발자센터에 등록한 값과 일치해야 한다.
   미설정 시 status.configured=false → 프론트는 데모 모드로 동작.
   ============================================================ */
const router = Router();

const CLIENT_ID = process.env.NAVER_CLIENT_ID || "";
const CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET || "";
const isConfigured = Boolean(CLIENT_ID && CLIENT_SECRET);

const callbackUrl = (req) =>
  process.env.NAVER_CALLBACK_URL ||
  `${req.protocol}://${req.get("host")}/api/auth/naver/callback`;

// state 임시 저장 (CSRF 방지). 데모 규모 — 인메모리.
const states = new Set();

// GET /api/auth/naver/status — 자격증명 설정 여부
router.get("/naver/status", (_req, res) => res.json({ configured: isConfigured }));

// GET /api/auth/naver/login — 네이버 인증 페이지로 리다이렉트 (팝업이 이 URL을 연다)
router.get("/naver/login", (req, res) => {
  if (!isConfigured) return res.status(503).send("네이버 로그인이 설정되지 않았습니다.");
  const state = crypto.randomBytes(12).toString("hex");
  states.add(state);
  setTimeout(() => states.delete(state), 5 * 60 * 1000);

  const url = new URL("https://nid.naver.com/oauth2.0/authorize");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", CLIENT_ID);
  url.searchParams.set("redirect_uri", callbackUrl(req));
  url.searchParams.set("state", state);
  res.redirect(url.toString());
});

// 부모창으로 결과를 postMessage 하고 팝업을 닫는 HTML 응답
function relayHtml(payload) {
  const json = JSON.stringify({ source: "naver-login", ...payload });
  return `<!doctype html><meta charset="utf-8"><body style="background:#0E1116;color:#9DAAB8;font-family:system-ui;display:grid;place-items:center;height:100vh">
<p>네이버 로그인 처리 중…</p>
<script>
  try { (window.opener || window.parent).postMessage(${json}, "*"); } catch (e) {}
  setTimeout(function(){ window.close(); }, 300);
</script></body>`;
}

// GET /api/auth/naver/callback — 네이버 리다이렉트 수신 → 토큰 교환 → 프로필 조회
router.get("/naver/callback", async (req, res) => {
  const { code, state, error, error_description: desc } = req.query;
  if (error) return res.send(relayHtml({ error: desc || String(error) }));
  if (!code || !state || !states.has(state)) {
    return res.send(relayHtml({ error: "유효하지 않은 인증 응답입니다." }));
  }
  states.delete(state);

  try {
    // 1) 코드 → 액세스 토큰
    const tokenUrl = new URL("https://nid.naver.com/oauth2.0/token");
    tokenUrl.searchParams.set("grant_type", "authorization_code");
    tokenUrl.searchParams.set("client_id", CLIENT_ID);
    tokenUrl.searchParams.set("client_secret", CLIENT_SECRET);
    tokenUrl.searchParams.set("code", String(code));
    tokenUrl.searchParams.set("state", String(state));

    const tokenRes = await fetch(tokenUrl.toString());
    const token = await tokenRes.json();
    if (!token.access_token) {
      return res.send(relayHtml({ error: token.error_description || "토큰 교환 실패" }));
    }

    // 2) 액세스 토큰 → 사용자 프로필
    const meRes = await fetch("https://openapi.naver.com/v1/nid/me", {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });
    const me = await meRes.json();
    if (me.resultcode !== "00") {
      return res.send(relayHtml({ error: me.message || "프로필 조회 실패" }));
    }

    const r = me.response || {};
    return res.send(
      relayHtml({
        profile: {
          id: r.id,
          name: r.name || r.nickname || "네이버 사용자",
          email: r.email || "",
          nickname: r.nickname || "",
          profileImage: r.profile_image || "",
        },
      })
    );
  } catch (e) {
    console.error("naver callback error", e);
    return res.send(relayHtml({ error: "네이버 인증 처리 중 오류가 발생했습니다." }));
  }
});

export default router;
