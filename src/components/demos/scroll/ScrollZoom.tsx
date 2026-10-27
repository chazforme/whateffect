"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { Browser, INK, SUB, Wheel, prog, stage } from "./kit";

const W = 234;
const H = 137;
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

// 가운데 작은 사진이 휠을 굴릴수록 커져서 창을 가득 채움
export default function ScrollZoom() {
  const t = useLoop(4000);
  const p = prog(t, 300, 2500, 3300, 3850);
  const on = t < 3300 ? seg(t, 200, 300) * (1 - seg(t, 2400, 2550)) : seg(t, 3300, 3400) * (1 - seg(t, 3750, 3850));
  const w = lerp(96, W, p);
  const h = lerp(60, H, p);
  const top = lerp(56, 0, p);

  return (
    <div style={stage}>
      <Browser url="studio.co.kr">
        <div
          style={{
            position: "absolute",
            top: 12 - p * 30,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: 1 - seg(p, 0, 0.5),
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, color: INK }}>새로운 계절이 와요</div>
          <div style={{ fontSize: 7.5, color: SUB }}>2026 봄 컬렉션</div>
        </div>
        <div
          style={{
            position: "absolute",
            left: (W - w) / 2,
            top,
            width: w,
            height: h,
            borderRadius: lerp(12, 0, p),
            overflow: "hidden",
            background: "linear-gradient(160deg,#BFE3C8 0%,#7CC59A 55%,#3E8E6A 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: lerp(22, 44, p),
            }}
          >
            🌿
          </div>
          <div
            style={{
              position: "absolute",
              left: 12,
              bottom: 10,
              color: "#fff",
              fontSize: 13,
              fontWeight: 800,
              opacity: seg(p, 0.7, 1),
              whiteSpace: "nowrap",
            }}
          >
            초록이 시작되는 곳
          </div>
        </div>
      </Browser>
      <Wheel t={t} on={on} dir={t < 3300 ? 1 : -1} />
    </div>
  );
}
