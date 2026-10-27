"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { ACCENT, Finger, INK, PHONE_H, PRODUCTS, Phone, ProductRow, ROW_H, Scrollbar, SUB, io } from "./kit";

const HEAD = 22;
const LOADER = 26;
// 처음 5개 → 바닥에 닿으면 4개 더 → 또 닿으면 3개 더
const BATCH = [5, 9, 12];
const ADD1 = 1500;
const ADD2 = 2900;
const bottom = (n: number) => HEAD + n * ROW_H + LOADER - PHONE_H;

function scrollY(t: number) {
  if (t < ADD1 + 100) return io(seg(t, 300, 1000)) * bottom(5);
  if (t < ADD2 + 50) return bottom(5) + io(seg(t, 1600, 2400)) * (bottom(9) - bottom(5));
  return bottom(9) + io(seg(t, 2950, 3500)) * 70;
}

export default function InfiniteScroll() {
  const t = useLoop(4000);
  const y = scrollY(t);
  const n = t < ADD1 ? BATCH[0] : t < ADD2 ? BATCH[1] : BATCH[2];
  const contentH = HEAD + n * ROW_H + LOADER;
  const fade = seg(t, 0, 200) * (1 - seg(t, 3750, 3980));
  const moving = (t > 300 && t < 1000) || (t > 1600 && t < 2400) || (t > 2950 && t < 3500);
  const waiting = (t > 1000 && t < ADD1) || (t > 2400 && t < ADD2);

  let fy: number;
  if (t < 1100) fy = 130 - seg(t, 300, 1000) * 60;
  else if (t < 2500) fy = 130 - seg(t, 1600, 2400) * 60;
  else fy = 130 - seg(t, 2950, 3500) * 60;
  const fo = moving ? 1 : 0.25;
  const dot = Math.floor(t / 150) % 3;

  return (
    <Phone>
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, transform: `translateY(${-y}px)` }}>
          <div style={{ height: HEAD, padding: "6px 9px", fontSize: 9.5, fontWeight: 800, color: INK }}>추천 상품</div>
          {PRODUCTS.slice(0, n).map((p, i) => {
            const born = i < BATCH[0] ? -1000 : i < BATCH[1] ? ADD1 : ADD2;
            return <ProductRow key={p.name} p={p} style={{ opacity: seg(t, born, born + 300) }} />;
          })}
          <div
            style={{
              height: LOADER,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              fontSize: 7.5,
              color: SUB,
            }}
          >
            {[0, 1, 2].map((k) => (
              <i
                key={k}
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: ACCENT,
                  opacity: waiting && dot === k ? 1 : 0.25,
                }}
              />
            ))}
            <span style={{ marginLeft: 3 }}>더 불러오는 중</span>
          </div>
        </div>
        <Scrollbar p={Math.min(1, y / (contentH - PHONE_H))} ratio={PHONE_H / contentH} />
        <Finger x={64} y={fy} o={fo} />
      </div>
    </Phone>
  );
}
