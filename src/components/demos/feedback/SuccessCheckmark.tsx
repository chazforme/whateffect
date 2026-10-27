"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const GREEN = "#1FAE6B";

// 3.6초 주기: 원이 튕기듯 커짐 → 체크가 그려짐 → 문구 → 사라짐
export default function SuccessCheckmark() {
  const t = useLoop(3600);
  const s = seg(t, 100, 520);
  const pop = s < 1 ? ease(s) * (1 + 0.18 * Math.sin(Math.PI * s)) : 1;
  const draw = ease(seg(t, 480, 880));
  const txt = seg(t, 800, 1100);
  const sub = seg(t, 950, 1250);
  const o = t < 3100 ? 1 : 1 - seg(t, 3100, 3500);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: o }}>
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" fill={GREEN} transform={`translate(32 32) scale(${pop}) translate(-32 -32)`} />
        <path
          d="M19 33 L28 42 L45 23"
          fill="none"
          stroke="#fff"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1 1"
          strokeDashoffset={1 - draw}
          opacity={draw > 0.01 ? 1 : 0}
        />
      </svg>
      <div
        style={{
          fontSize: 18,
          fontWeight: 800,
          color: "var(--color-ink)",
          letterSpacing: "-.02em",
          marginTop: 12,
          opacity: txt,
          transform: `translateY(${8 * (1 - ease(txt))}px)`,
        }}
      >
        결제가 완료됐어요
      </div>
      <div style={{ fontSize: 11.5, color: "#6B7180", marginTop: 4, opacity: sub }}>주문번호 20261027-0142</div>
    </div>
  );
}
