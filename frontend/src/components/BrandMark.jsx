/* Babel 브랜드 마크 — "Babel"의 한글 발음(바벨)을 헬스 바벨(barbell)로 형상화한 아이콘.
   브랜드 사각형(.splash-mark / .brand-mark)의 텍스트 글리프 대신 사용 */
export default function BrandMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="8" y="10.3" width="8" height="3.4" rx="1" />
      <rect x="5.2" y="7.8" width="2.2" height="8.4" rx="1.1" />
      <rect x="1.5" y="5.8" width="3" height="12.4" rx="1.3" />
      <rect x="16.6" y="7.8" width="2.2" height="8.4" rx="1.1" />
      <rect x="19.5" y="5.8" width="3" height="12.4" rx="1.3" />
    </svg>
  );
}
