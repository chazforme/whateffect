"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const comma = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

function Tile({ label, value, unit, bar }: { label: string; value: string; unit: string; bar?: number }) {
  return (
    <div
      style={{
        width: 124,
        background: "#fff",
        borderRadius: 14,
        padding: 12,
        boxShadow: "0 3px 10px rgba(27,34,54,.07)",
      }}
    >
      <div style={{ fontSize: 11.5, color: "#6B7180", fontWeight: 600 }}>{label}</div>
      <div style={{ marginTop: 4, whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: "var(--color-ink)", letterSpacing: "-.02em" }}>
          {value}
        </span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#6B7180", marginLeft: 2 }}>{unit}</span>
      </div>
      <div style={{ height: 5, borderRadius: 3, background: bar === undefined ? "transparent" : "#EEF1F7", marginTop: 6 }}>
        {bar !== undefined && (
          <div style={{ height: 5, borderRadius: 3, background: "var(--color-accent)", width: `${bar * 100}%` }} />
        )}
      </div>
    </div>
  );
}

// 3.6초 주기: 숫자가 0부터 목표값까지 빠르게 올라가다 끝에서 천천히 멈춤 → 유지 → 사라짐
export default function CountUp() {
  const t = useLoop(3600);
  const p = ease(seg(t, 200, 1700));
  const o = 1 - seg(t, 3000, 3400);
  return (
    <div style={{ display: "flex", gap: 10, opacity: o }}>
      <Tile label="오늘 방문자" value={comma(Math.round(12480 * p))} unit="명" />
      <Tile label="목표 달성률" value={String(Math.round(87 * p))} unit="%" bar={0.87 * p} />
    </div>
  );
}
