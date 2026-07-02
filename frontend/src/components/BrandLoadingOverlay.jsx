import { createPortal } from "react-dom";
import BrandMark from "./BrandMark.jsx";

/* 화면 정중앙 · 최상위 레이어에 뜨는 로딩 오버레이 (로그인 인증, 계약 체결 등 공용).
   document.body에 직접 포탈로 붙여서 어느 화면(HnwShell 등 중첩 레이아웃) 안에서 띄우든
   항상 뷰포트 정중앙 · 다른 모든 레이어 위에 보이도록 한다. */
export default function BrandLoadingOverlay({ label = "로딩 중…" }) {
  return createPortal(
    <div className="brand-loading-overlay">
      <BrandMark animated size={64} />
      <span className="brand-loading-txt">{label}</span>
    </div>,
    document.body
  );
}
