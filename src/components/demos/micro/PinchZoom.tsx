"use client";

import type { CSSProperties } from "react";
import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const road: CSSProperties = { position: "absolute", background: "#fff", borderRadius: 3 };
const block: CSSProperties = { position: "absolute", background: "#D3E2CC", borderRadius: 4 };
const W = 220;
const H = 150;

// 4초 주기: 두 손가락을 벌리면 지도가 커지고, 오므리면 다시 작아짐
export default function PinchZoom() {
  const t = useLoop(4000);
  const z = ease(seg(t, 600, 1500)) * (1 - ease(seg(t, 2600, 3400)));
  const s = 1 + 0.9 * z;
  const d = 16 + 40 * z; // 손가락이 가운데에서 떨어진 거리(대각선)
  const fo = seg(t, 250, 500) * (1 - seg(t, 3400, 3700));
  const cx = 30 + W / 2;
  const cy = 10 + H / 2;

  return (
    <div style={{ position: "relative", width: 280, height: 170 }}>
      <div
        style={{
          position: "absolute",
          left: 30,
          top: 10,
          width: W,
          height: H,
          borderRadius: 14,
          overflow: "hidden",
          background: "#E6F0E1",
          boxShadow: "0 3px 10px rgba(27,34,54,.1)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, transform: `scale(${s})` }}>
          <div style={{ ...block, left: 14, top: 12, width: 60, height: 40 }} />
          <div style={{ ...block, left: 150, top: 92, width: 56, height: 44 }} />
          <div style={{ ...block, left: 132, top: 14, width: 40, height: 30 }} />
          <div style={{ position: "absolute", left: -20, right: -20, top: 104, height: 14, background: "#BFD9F2", transform: "rotate(-8deg)" }} />
          <div style={{ ...road, left: 0, right: 0, top: 62, height: 8 }} />
          <div style={{ ...road, left: 96, top: 0, bottom: 0, width: 8 }} />
          <div style={{ ...road, left: 20, top: -10, width: 6, height: 180, transform: "rotate(28deg)" }} />
          <div style={{ position: "absolute", left: 98, top: 34, fontSize: 18 }}>📍</div>
          <div
            style={{
              position: "absolute",
              left: 112,
              top: 40,
              padding: "2px 6px",
              borderRadius: 6,
              background: "#fff",
              fontSize: 10,
              fontWeight: 800,
              color: "var(--color-ink)",
              boxShadow: "0 1px 3px rgba(27,34,54,.15)",
            }}
          >
            성수역
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            padding: "2px 7px",
            borderRadius: 6,
            background: "rgba(27,34,54,.7)",
            color: "#fff",
            fontSize: 10.5,
            fontWeight: 800,
          }}
        >
          {Math.round(s * 100)}%
        </div>
      </div>
      {[-1, 1].map((k) => (
        <div
          key={k}
          style={{
            position: "absolute",
            left: cx + k * d * 0.8 - 13,
            top: cy + k * d * 0.6 - 13,
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "rgba(27,34,54,.22)",
            border: "2px solid rgba(255,255,255,.9)",
            boxSizing: "border-box",
            opacity: fo,
            transform: "scale(1.15)",
          }}
        />
      ))}
    </div>
  );
}
