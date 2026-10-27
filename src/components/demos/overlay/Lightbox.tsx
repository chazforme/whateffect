"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { Browser, Cursor, Dim, along, inOut, pressAt, txt } from "./_kit";

const PHOTOS = [
  ["#BFD3F7", "🏔"],
  ["#F7C9B8", "🌅"],
  ["#C7E8D3", "🌿"],
  ["#F5DFA6", "🌻"],
  ["#D9CCF5", "🌌"],
  ["#F2C4D8", "🌸"],
];
const TW = 70;
const TH = 46;
const thumb = (i: number) => ({ x: 13 + (i % 3) * (TW + 6), y: 26 + Math.floor(i / 3) * (TH + 6) });
const BIG = { x: 54, y: 14, w: 140, h: 96 };

// 4.2초 주기: 사진 클릭 → 배경 까매지며 사진이 크게 → '›'로 다음 사진 → ✕ → 제자리로 작아짐
export default function Lightbox() {
  const t = useLoop(4200);
  const grow = ease(seg(t, 700, 1150));
  const shrink = ease(seg(t, 3150, 3550));
  const slide = ease(seg(t, 2000, 2350));
  const z = grow * (1 - shrink);
  const dark = inOut(t, 700, 1050, 3150, 3500);

  // 열릴 때는 2번 사진 자리에서, 닫힐 때는 3번 사진 자리로
  const from = thumb(t < 2600 ? 1 : 2);
  const r = {
    x: from.x + (BIG.x - from.x) * z,
    y: from.y + (BIG.y - from.y) * z,
    w: TW + (BIG.w - TW) * z,
    h: TH + (BIG.h - TH) * z,
  };
  const idx = t < 2600 ? 1 : 2;
  const open = t > 700 && t < 3550;

  const [x, y] = along(t, [
    [0, 200, 130],
    [500, 125, 50],
    [1400, 125, 50],
    [1850, 212, 64],
    [2700, 212, 64],
    [3000, 214, 10],
    [3400, 214, 10],
    [4000, 200, 130],
  ]);
  const co = seg(t, 0, 200) * (1 - seg(t, 3700, 4100));

  return (
    <Browser url="photo.inno.kr">
      <div style={{ ...txt(9.5, 800), position: "absolute", left: 13, top: 8 }}>여행 사진첩</div>
      {PHOTOS.map(([bg, e], i) => {
        const p = thumb(i);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: TW,
              height: TH,
              borderRadius: 6,
              background: bg,
              display: "grid",
              placeItems: "center",
              fontSize: 18,
              opacity: open && i === idx ? 0 : 1,
            }}
          >
            {e}
          </div>
        );
      })}
      <Dim o={dark} color="rgba(10,12,20,.9)" />
      {open && (
        <div
          style={{
            position: "absolute",
            left: r.x,
            top: r.y,
            width: r.w,
            height: r.h,
            borderRadius: 6 * (1 - z) + 3 * z,
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", height: "100%", width: "200%", transform: `translateX(${-50 * (t < 2600 ? slide : 0)}%)` }}>
            {[idx, idx + 1].map((k) => (
              <div
                key={k}
                style={{
                  width: "50%",
                  height: "100%",
                  background: PHOTOS[k][0],
                  display: "grid",
                  placeItems: "center",
                  fontSize: 18 + 22 * z,
                }}
              >
                {PHOTOS[k][1]}
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ opacity: dark }}>
        <span style={{ position: "absolute", left: 30, top: 54, ...txt(16, 400, "#fff") }}>‹</span>
        <span style={{ position: "absolute", left: 206, top: 54, ...txt(16, 400, "#fff") }}>›</span>
        <span style={{ position: "absolute", left: 208, top: 4, ...txt(11, 400, "#fff") }}>✕</span>
        <span style={{ position: "absolute", left: 0, right: 0, top: 118, textAlign: "center", ...txt(8, 600, "rgba(255,255,255,.75)") }}>
          {t < 2200 ? 2 : 3} / 6
        </span>
      </div>
      <Cursor x={x} y={y} o={co} press={pressAt(t, 600) + pressAt(t, 1950) + pressAt(t, 3100)} />
    </Browser>
  );
}
