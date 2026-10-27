"use client";

import type { CSSProperties } from "react";
import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const bar: CSSProperties = { height: 7, borderRadius: 4, background: "#E3E6EE", margin: "14px 12px 0" };
const opt: CSSProperties = { height: 13, borderRadius: 5, background: "#EEF1F7", marginBottom: 6 };

// 4초 주기: 버튼 탭 → 시트 올라옴 → 유지 → 내려감
export default function BottomSheet() {
  const t = useLoop(4000);

  const tp = seg(t, 240, 720);
  const tapOpacity = t < 240 ? 0 : tp < 0.33 ? tp * 3 : 1 - (tp - 0.33) / 0.67;
  const tapScale = t < 240 ? 0 : 0.4 + tp * 1.2;
  const dim = t < 2960 ? seg(t, 560, 1040) : 1 - seg(t, 2960, 3440);
  const up = t < 2880 ? ease(seg(t, 560, 1200)) : 1 - ease(seg(t, 2880, 3440));

  return (
    <div
      style={{
        width: 118,
        height: 168,
        background: "#fff",
        borderRadius: 18,
        border: "3px solid #1B2236",
        position: "relative",
        overflow: "hidden",
        marginTop: 22,
      }}
    >
      <div style={bar} />
      <div style={{ ...bar, width: "50%" }} />
      <div style={{ height: 46, borderRadius: 8, background: "#DCE3F6", margin: "10px 12px 0" }} />
      <div
        style={{
          position: "absolute",
          left: 12,
          right: 12,
          bottom: 14,
          height: 18,
          borderRadius: 6,
          background: "var(--color-accent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "rgba(58,91,239,.35)",
          left: "50%",
          bottom: 9,
          opacity: tapOpacity,
          transform: `translateX(-50%) scale(${tapScale})`,
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(15,20,35,.45)", opacity: dim }} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "62%",
          background: "#fff",
          borderRadius: "14px 14px 0 0",
          padding: "7px 12px",
          transform: `translateY(${105 * (1 - up)}%)`,
        }}
      >
        <div style={{ width: 22, height: 4, borderRadius: 2, background: "#D5D9E2", margin: "0 auto 9px" }} />
        <div style={{ ...opt, background: "#DCE4FD" }} />
        <div style={opt} />
        <div style={opt} />
      </div>
    </div>
  );
}
