"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { AMOUNT, BTN, LABEL, SUB, frame, mix } from "./common";

const P = 4400;

// 밝은 화면 → 어두운 화면 → 다시 밝게. 같은 카드가 색만 바뀐다
export default function DarkMode() {
  const t = useLoop(P);
  const k = t < 2200 ? ease(seg(t, 1200, 1900)) : 1 - ease(seg(t, 3400, 4100));
  const c = (a: string, b: string) => mix(a, b, k);
  return (
    <div style={{ ...frame, background: c("#F1F3F8", "#0E121D"), flexDirection: "column", gap: 10 }}>
      {/* 해·달 스위치 */}
      <div style={{ position: "absolute", top: 12, left: 14, display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 38, height: 20, borderRadius: 999, background: c("#D6DBE6", "#3A5BEF"), position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 2,
              left: 2 + 18 * k,
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#fff",
              fontSize: 10,
              lineHeight: "16px",
              textAlign: "center",
            }}
          >
            {k < 0.5 ? "☀" : "☾"}
          </div>
        </div>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: c("#6B7180", "#9AA3B5") }}>{k < 0.5 ? "라이트" : "다크"}</span>
      </div>
      <div style={{ width: 210, background: c("#FFFFFF", "#1C2232"), borderRadius: 14, padding: "14px 16px", marginTop: 16 }}>
        <div style={{ fontSize: 11.5, fontWeight: 600, color: c("#6B7180", "#9AA3B5") }}>{LABEL}</div>
        <div style={{ fontSize: 23, fontWeight: 800, letterSpacing: "-.02em", color: c("#1B2236", "#F1F3F8"), marginTop: 2 }}>
          {AMOUNT}
        </div>
        <div style={{ fontSize: 10.5, color: c("#6B7180", "#9AA3B5"), marginTop: 1 }}>{SUB}</div>
        <div
          style={{
            marginTop: 10,
            display: "inline-block",
            background: c("#3A5BEF", "#6C8BFF"),
            color: "#fff",
            fontSize: 11.5,
            fontWeight: 700,
            padding: "6px 13px",
            borderRadius: 8,
          }}
        >
          {BTN}
        </div>
      </div>
    </div>
  );
}
