/* Barbell 브랜드 마크 — 이름 그대로 헬스 바벨(barbell)을 형상화한 아이콘.
   묵직한 범퍼 플레이트를 양쪽에 장착한 로디드 바벨을 형상화.
   브랜드 사각형(.splash-mark / .brand-mark)의 텍스트 글리프 대신 사용 */
export default function BrandMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {/* 중앙 바 */}
      <rect x="7.5" y="10.8" width="9" height="2.4" rx="1.2" />
      {/* 왼쪽 안쪽 플레이트 */}
      <rect x="5.4" y="6.6" width="2.4" height="10.8" rx="1.2" />
      {/* 왼쪽 바깥 대형 범퍼 플레이트 */}
      <rect x="1.8" y="3.8" width="3.4" height="16.4" rx="1.7" />
      {/* 오른쪽 안쪽 플레이트 */}
      <rect x="16.2" y="6.6" width="2.4" height="10.8" rx="1.2" />
      {/* 오른쪽 바깥 대형 범퍼 플레이트 */}
      <rect x="18.8" y="3.8" width="3.4" height="16.4" rx="1.7" />
    </svg>
  );
}
