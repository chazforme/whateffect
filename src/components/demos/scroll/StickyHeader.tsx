"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { ACCENT, Finger, INK, PRODUCTS, Phone, ProductRow, Scrollbar, prog } from "./kit";

const MAX = 150;

// 목록은 올라가는데 맨 위 제목줄만 제자리에 붙어 있음
export default function StickyHeader() {
  const t = useLoop(4000);
  const y = prog(t) * MAX;
  const drag = seg(t, 400, 2600);
  const fo = seg(t, 250, 400) * (1 - seg(t, 2600, 2800));

  return (
    <Phone>
      <div style={{ position: "absolute", left: 0, right: 0, top: 26, transform: `translateY(${-y}px)` }}>
        {PRODUCTS.slice(0, 9).map((p) => (
          <ProductRow key={p.name} p={p} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 26,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 9px",
          borderBottom: `2px solid ${ACCENT}`,
          boxShadow: `0 3px 8px rgba(27,34,54,${0.18 * seg(y, 0, 12)})`,
          zIndex: 10,
        }}
      >
        <b style={{ fontSize: 9.5, fontWeight: 800, color: INK }}>오늘의 쇼핑</b>
        <span style={{ fontSize: 9 }}>🔍</span>
      </div>
      <Scrollbar p={y / MAX} ratio={0.45} />
      <Finger x={64} y={130 - drag * 80} o={fo} />
    </Phone>
  );
}
