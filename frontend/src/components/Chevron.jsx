/* iOS 스타일의 얇은 셰브런 아이콘 — 뒤로가기/건너뛰기 등 방향성 있는 텍스트 버튼에 공통으로 사용 */
export default function Chevron({ dir = "left", size = 14 }) {
  const d = dir === "left" ? "M14.5 5l-6 7 6 7" : "M9.5 5l6 7-6 7";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
