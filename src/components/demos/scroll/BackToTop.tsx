"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { ACCENT, Finger, PRODUCTS, Phone, ProductRow, Scrollbar, io } from "./kit";

const MAX = 240;

// 한참 내려가면 ↑ 버튼이 생기고, 누르면 맨 위로 슝 올라감
function scrollY(t: number) {
  if (t < 2650) return io(seg(t, 400, 2200)) * MAX;
  return MAX * (1 - io(seg(t, 2650, 3150)));
}

export default function BackToTop() {
  const t = useLoop(4000);
  const y = scrollY(t);
  const btn = seg(y, 60, 100);
  const press = t > 2450 && t < 2650 ? 0.85 : 1;

  let fx = 60;
  let fy = 130;
  let fo = 0;
  let fs = 1;
  if (t < 2200) {
    fy = 130 - seg(t, 400, 2200) * 80;
    fo = seg(t, 250, 400);
  } else {
    const m = seg(t, 2200, 2450);
    fx = 60 + m * 36;
    fy = 50 + m * 92;
    fo = 1 - seg(t, 2650, 2900);
    fs = t > 2450 && t < 2650 ? 0.75 : 1;
  }

  return (
    <Phone>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, transform: `translateY(${-y}px)` }}>
        {PRODUCTS.map((p) => (
          <ProductRow key={p.name} p={p} />
        ))}
      </div>
      <Scrollbar p={y / MAX} ratio={0.4} />
      <div
        style={{
          position: "absolute",
          right: 8,
          bottom: 9,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: ACCENT,
          color: "#fff",
          fontSize: 13,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 3px 8px rgba(58,91,239,.4)",
          opacity: btn,
          transform: `translateY(${(1 - btn) * 10}px) scale(${press})`,
          zIndex: 12,
        }}
      >
        ↑
      </div>
      <Finger x={fx} y={fy} o={fo} s={fs} />
    </Phone>
  );
}
