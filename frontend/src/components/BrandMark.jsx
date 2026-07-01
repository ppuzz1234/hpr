/* Babel 브랜드 마크 — 이름 유래(바벨탑)를 형상화한 3단 지구라트 아이콘.
   브랜드 사각형(.splash-mark / .brand-mark)의 텍스트 글리프 대신 사용 */
export default function BrandMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="4.4" r="1.6" />
      <rect x="8" y="7.6" width="8" height="4" rx="1.2" />
      <rect x="4.5" y="12.3" width="15" height="4" rx="1.2" />
      <rect x="1" y="17" width="22" height="4" rx="1.2" />
    </svg>
  );
}
