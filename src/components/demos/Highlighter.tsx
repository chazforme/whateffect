"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { big } from "./shared";

// 3.5초 주기: 형광펜이 왼쪽→오른쪽으로 칠해짐 → 유지 → 흐려짐
export default function Highlighter() {
  const t = useLoop(3500);
  const p = ease(seg(t, 500, 1200));
  return (
    <div style={{ ...big, fontSize: 24, textAlign: "center", lineHeight: 1.5 }}>
      <div style={{ color: "#3A4152", fontWeight: 600, fontSize: 18 }}>오늘 하루만</div>
      <span style={{ position: "relative", isolation: "isolate" }}>
        <span
          style={{
            position: "absolute",
            left: -4,
            bottom: "0.08em",
            height: "0.5em",
            width: `calc(${p * 100}% + ${p * 8}px)`,
            background: "#FFE45C",
            borderRadius: 3,
            zIndex: -1,
            opacity: 1 - seg(t, 2800, 3200),
          }}
        />
        전 품목 무료배송
      </span>
    </div>
  );
}
