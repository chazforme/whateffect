"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { ACCENT, Finger, INK, PRODUCTS, Phone, ProductRow, SUB, io, stage } from "./kit";

// 내릴 때(0.3~1.5초) 제목줄이 숨고, 살짝 올릴 때(1.9~2.6초) 다시 나타남
function scrollY(t: number) {
  if (t < 1900) return io(seg(t, 300, 1500)) * 120;
  if (t < 3300) return 120 - io(seg(t, 1900, 2600)) * 60;
  return 60 * (1 - io(seg(t, 3300, 3800)));
}

export default function HideOnScroll() {
  const t = useLoop(4000);
  const y = scrollY(t);
  const hide = t < 1900 ? ease(seg(t, 450, 750)) : 1 - ease(seg(t, 1950, 2250));
  const down = t < 1700;
  const up = t >= 1900 && t < 2800;

  let fy = 130;
  let fo = 0;
  if (t < 1700) {
    fy = 130 - seg(t, 300, 1500) * 70;
    fo = seg(t, 150, 300) * (1 - seg(t, 1500, 1700));
  } else if (t < 2900) {
    fy = 50 + seg(t, 1900, 2600) * 60;
    fo = seg(t, 1750, 1900) * (1 - seg(t, 2600, 2800));
  }

  const label = (on: boolean, txt: string) => (
    <div style={{ fontSize: 10.5, fontWeight: 700, color: on ? ACCENT : "#B4B9C6", whiteSpace: "nowrap" }}>{txt}</div>
  );

  return (
    <div style={stage}>
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
            background: ACCENT,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 9px",
            transform: `translateY(${-hide * 28}px)`,
            zIndex: 10,
          }}
        >
          <b style={{ fontSize: 9.5, fontWeight: 800 }}>오늘의 쇼핑</b>
          <span style={{ fontSize: 9 }}>☰</span>
        </div>
        <Finger x={64} y={fy} o={fo} />
      </Phone>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {label(down, "↓ 내리면 숨고")}
        {label(up, "↑ 올리면 나타나요")}
        <div style={{ fontSize: 9, color: SUB, lineHeight: 1.4 }}>
          화면을 더 넓게
          <br />
          <span style={{ color: INK }}>쓸 수 있어요</span>
        </div>
      </div>
    </div>
  );
}
