import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { loginWithNaver } from "../auth/naver.js";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useApp();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(null); // 진행중인 provider
  const [err, setErr] = useState("");

  const proceed = (provider, user) => {
    signIn(provider, user);
    navigate("/welcome");
  };

  const onEmail = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    proceed("email", { email: email.trim() });
  };

  const onNaver = async () => {
    setErr("");
    setBusy("naver");
    try {
      const profile = await loginWithNaver();
      proceed("naver", profile);
    } catch (e) {
      setErr(e.message || "네이버 로그인에 실패했습니다.");
    } finally {
      setBusy(null);
    }
  };

  // 데모: 외부 SSO(구글/아마존/애플)는 즉시 진입 (실제 연동 지점만 표시)
  const onSso = (provider) => () => proceed(provider, { provider });

  return (
    <div className="onb">
      <div className="onb-inner login">
        <header className="login-brand">
          <div className="splash-mark sm">PPR</div>
          <div className="login-titles">
            <strong>PLUS Private Room</strong>
            <span>검증된 가문만의 폐쇄형 자본 플랫폼</span>
          </div>
        </header>

        <h2 className="login-h">로그인 또는 회원가입</h2>

        <form onSubmit={onEmail} className="login-form">
          <label className="onb-label">이메일</label>
          <input
            className="onb-input"
            type="email"
            inputMode="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" className="login-alt">대신 휴대폰 번호 사용</button>
          <button type="submit" className="btn btn-primary btn-block" disabled={!email.trim()}>계속</button>
        </form>

        <div className="login-or"><span>또는</span></div>

        {err && <div className="login-err">{err}</div>}

        <div className="sso-list">
          <button className="sso-btn naver" onClick={onNaver} disabled={busy === "naver"}>
            <span className="sso-ic naver-ic">N</span>
            {busy === "naver" ? "네이버 인증 중…" : "네이버로 계속하기"}
          </button>
          <button className="sso-btn" onClick={onSso("google")}>
            <span className="sso-ic">{GOOGLE}</span>
            Google(으)로 계속하기
          </button>
          <button className="sso-btn" onClick={onSso("amazon")}>
            <span className="sso-ic amazon-ic">a</span>
            Amazon(으)로 계속하기
          </button>
          <button className="sso-btn" onClick={onSso("apple")}>
            <span className="sso-ic apple-ic">{APPLE}</span>
            Apple(으)로 계속하기
          </button>
        </div>

        <button className="login-foot-link" onClick={() => proceed("guest", { guest: true })}>
          이미 PPR 회원이신가요? <b>로그인하세요</b>
        </button>
      </div>
    </div>
  );
}

const APPLE = (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
    <path d="M17.05 12.54c-.02-2.05 1.68-3.03 1.75-3.08-.95-1.4-2.43-1.59-2.96-1.61-1.26-.13-2.46.74-3.1.74-.64 0-1.62-.72-2.67-.7-1.37.02-2.64.8-3.35 2.03-1.43 2.48-.37 6.15 1.03 8.16.68.98 1.49 2.08 2.55 2.04 1.03-.04 1.42-.66 2.66-.66 1.24 0 1.59.66 2.67.64 1.1-.02 1.8-1 2.48-1.99.78-1.14 1.1-2.24 1.12-2.3-.02-.01-2.14-.82-2.16-3.25zM15.1 6.6c.56-.68.94-1.63.84-2.58-.81.03-1.79.54-2.37 1.22-.52.6-.98 1.56-.86 2.48.9.07 1.83-.46 2.39-1.12z" />
  </svg>
);
const GOOGLE = (
  <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.6 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.6 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 43.5c5.5 0 10.3-1.9 13.7-5.1l-6.3-5.3C29.3 34.6 26.8 35.5 24 35.5c-5.3 0-9.6-3.1-11.3-7.9l-6.6 5.1C9.7 39 16.2 43.5 24 43.5z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.4 4.2-4.6 5.6l6.3 5.3c-.4.4 6.5-4.7 6.5-14.9 0-1.2-.1-2.3-.4-3.5z" />
  </svg>
);
