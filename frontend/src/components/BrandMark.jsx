/* Barbell 브랜드 마크 — 실제 바벨처럼 봉 양쪽에 원판을 2장씩(총 4장) 끼운 모양.
   원판 사이에는 살짝 간격을 두어 "2장이 꽂혀있다"는 느낌을 주고,
   봉의 양 끝은 가장 바깥 원판보다 더 바깥으로 나오도록 그린다.
   animated=true 이면 이 마크 자체가 로딩 인디케이터가 된다 — 4개의 원판이
   순서대로 봉에 "꽂히는" 동작을 반복하며 로딩 중임을 표현한다. */
export default function BrandMark({ size = 22, animated = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 37.42 24"
      fill="currentColor"
      aria-hidden="true"
      className={animated ? "brand-mark-loading" : undefined}
    >
      {/* 봉 — 원판보다 양끝이 더 길게 나온다. 길어진 만큼은 가운데 그립 구간이 늘어난다 */}
      <rect x="0.46" y="11.1" width="36.5" height="1.8" rx="0.9" />

      {/* 왼쪽 안쪽 원판 — 로딩 시 1번째로 꽂힌다 (봉 끝-간격은 이전과 동일) */}
      <rect className="bm-plate bm-plate-0" fill="#E9E744" style={{ "--dx": "-14px" }} x="7.4" y="5.7" width="3.6" height="12.6" rx="1.0" />
      {/* 오른쪽 안쪽 원판 — 2번째. 봉이 길어진 만큼 바깥쪽으로 이동 */}
      <rect className="bm-plate bm-plate-1" fill="#E9E744" style={{ "--dx": "14px" }} x="26.42" y="5.7" width="3.6" height="12.6" rx="1.0" />
      {/* 왼쪽 바깥 원판 (안쪽과 살짝 간격) — 3번째 */}
      <rect className="bm-plate bm-plate-2" fill="#39A59F" style={{ "--dx": "-14px" }} x="3.2" y="5.7" width="3.6" height="12.6" rx="1.0" />
      {/* 오른쪽 바깥 원판 (안쪽과 살짝 간격) — 4번째. 봉이 길어진 만큼 바깥쪽으로 이동, 이 시점에 원판 4장이 모두 쌓인다 */}
      <rect className="bm-plate bm-plate-3" fill="#39A59F" style={{ "--dx": "14px" }} x="30.62" y="5.7" width="3.6" height="12.6" rx="1.0" />
    </svg>
  );
}
