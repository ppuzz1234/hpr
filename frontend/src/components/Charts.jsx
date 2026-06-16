import { useId } from "react";

/* 의존성 없는 SVG 차트 (도넛 / 바 / 영역 / 게이지) */

export function Donut({ segments, size = 190, thickness = 26, center }) {
  const r = (size - thickness) / 2, cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + x.v, 0);
  let offset = 0;
  const arcs = segments.map((s, i) => {
    const len = (s.v / total) * circ;
    const el = (
      <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.c} strokeWidth={thickness}
        strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={-offset}
        transform={`rotate(-90 ${cx} ${cy})`} strokeLinecap="butt">
        <animate attributeName="stroke-dasharray" from={`0 ${circ}`} to={`${len} ${circ - len}`} dur="0.7s" fill="freeze" />
      </circle>
    );
    offset += len;
    return el;
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {arcs}
      {center && (
        <>
          <text x={cx} y={cy - 6} textAnchor="middle" fill="#EAF1F5" fontSize="22" fontWeight="800">{center.top}</text>
          <text x={cx} y={cy + 15} textAnchor="middle" fill="#9DAAB8" fontSize="11">{center.bottom}</text>
        </>
      )}
    </svg>
  );
}

export function Bars({ data, w = 460, h = 180, color = "#34E0C4", labels = [], suffix = "" }) {
  const pad = 26, max = Math.max(...data) * 1.15;
  const bw = (w - pad * 2) / data.length;
  const nodes = [];
  data.forEach((d, i) => {
    const bh = (d / max) * (h - pad * 2);
    const x = pad + i * bw + bw * 0.18;
    const y = h - pad - bh;
    const ww = bw * 0.64;
    const fill = i === data.length - 1 ? color : "#2C3744";
    nodes.push(
      <rect key={`r${i}`} x={x} y={h - pad} width={ww} height={0} rx="5" fill={fill}>
        <animate attributeName="height" to={bh} dur="0.6s" fill="freeze" />
        <animate attributeName="y" to={y} dur="0.6s" fill="freeze" />
      </rect>,
      <text key={`v${i}`} x={x + ww / 2} y={y - 7} textAnchor="middle" fill="#9DAAB8" fontSize="10" fontWeight="700">{d}{suffix}</text>
    );
    if (labels[i]) nodes.push(
      <text key={`l${i}`} x={x + ww / 2} y={h - 8} textAnchor="middle" fill="#5C6976" fontSize="10">{labels[i]}</text>
    );
  });
  return <svg width="100%" viewBox={`0 0 ${w} ${h}`}>{nodes}</svg>;
}

export function Area({ data, w = 600, h = 170, color = "#34E0C4" }) {
  const id = useId().replace(/:/g, "");
  const pad = 8, min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1);
  const pts = data.map((d, i) => [pad + i * step, h - pad - ((d - min) / range) * (h - pad * 2)]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const fill = `${line} L ${pts[pts.length - 1][0]} ${h} L ${pts[0][0]} ${h} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={0}><animate attributeName="r" to="2.5" dur=".4s" fill="freeze" /></circle>
      ))}
    </svg>
  );
}

export function Gauge({ value, size = 150, color = "#34E0C4" }) {
  const r = size / 2 - 12, cx = size / 2, cy = size / 2;
  const circ = Math.PI * r;
  const len = (value / 100) * circ;
  return (
    <svg width={size} height={size / 1.7} viewBox={`0 0 ${size} ${size / 1.7}`}>
      <path d={`M12 ${cy} A ${r} ${r} 0 0 1 ${size - 12} ${cy}`} fill="none" stroke="#232B36" strokeWidth="12" strokeLinecap="round" />
      <path d={`M12 ${cy} A ${r} ${r} 0 0 1 ${size - 12} ${cy}`} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${len} ${circ}`}>
        <animate attributeName="stroke-dasharray" from={`0 ${circ}`} to={`${len} ${circ}`} dur=".8s" fill="freeze" />
      </path>
      <text x={cx} y={cy - 2} textAnchor="middle" fill="#EAF1F5" fontSize="26" fontWeight="800">{value}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="#9DAAB8" fontSize="10">/ 100</text>
    </svg>
  );
}
