"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";

const STYLE = {
  결제완료: { bg: "#EEF1F7", fg: "#6B7180" },
  배송중: { bg: "#E9EFFD", fg: "#3A5BEF" },
  배송완료: { bg: "#E3F5EA", fg: "#1A8F55" },
  취소됨: { bg: "#FDE8E8", fg: "#D33A3A" },
} as const;
type S = keyof typeof STYLE;

const FLOW: S[] = ["결제완료", "배송중", "배송완료"];
const STEP = 1300;

function Chip({ s, scale = 1 }: { s: S; scale?: number }) {
  const c = STYLE[s];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: c.bg,
        color: c.fg,
        fontSize: 11,
        fontWeight: 800,
        padding: "3px 9px",
        borderRadius: 11,
        transform: `scale(${scale})`,
        whiteSpace: "nowrap",
      }}
    >
      <i style={{ width: 5, height: 5, borderRadius: "50%", background: c.fg }} />
      {s}
    </span>
  );
}

// 3.9초 주기: 첫 주문의 상태 칩이 결제완료 → 배송중 → 배송완료로 색과 함께 바뀜
export default function StatusChip() {
  const t = useLoop(STEP * FLOW.length);
  const i = Math.floor(t / STEP);
  const pop = 1 + 0.14 * Math.sin(Math.PI * seg(t % STEP, 0, 260));
  const rows: { name: string; date: string; chip: S; scale?: number }[] = [
    { name: "운동화", date: "10/27 주문", chip: FLOW[i], scale: pop },
    { name: "백팩", date: "10/25 주문", chip: "배송완료" },
    { name: "모자", date: "10/24 주문", chip: "취소됨" },
  ];

  return (
    <div
      style={{
        width: 250,
        background: "#fff",
        borderRadius: 14,
        padding: "6px 14px",
        boxShadow: "0 2px 8px rgba(27,34,54,.06)",
      }}
    >
      {rows.map((r, k) => (
        <div
          key={r.name}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 0",
            borderTop: k ? "1px solid #EEF1F7" : "none",
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "var(--color-ink)" }}>{r.name}</div>
            <div style={{ fontSize: 10.5, color: "#6B7180" }}>{r.date}</div>
          </div>
          <Chip s={r.chip} scale={r.scale} />
        </div>
      ))}
    </div>
  );
}
