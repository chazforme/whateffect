"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const BASE = "myshop.com/";
const TYPED = "event/2023";

// 4초 주기: 주소창에 옛 주소 입력 → 잠깐 빙글 → 404 안내 → 사라짐
export default function ErrorPage() {
  const t = useLoop(4000);
  const n = Math.min(TYPED.length, Math.floor(seg(t, 100, 900) * (TYPED.length + 1)));
  const waiting = t >= 950 && t < 1350;
  const show = t < 3700 ? seg(t, 1350, 1650) : 1 - seg(t, 3700, 4000);
  const rise = ease(seg(t, 1350, 1750));

  return (
    <div
      style={{
        width: 270,
        height: 162,
        background: "#fff",
        borderRadius: 10,
        border: "2px solid #1B2236",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 24,
          background: "#EEF1F7",
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "0 8px",
        }}
      >
        {["#F26B5B", "#F5BD4F", "#5BC46A"].map((c) => (
          <i key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
        ))}
        <div
          style={{
            flex: 1,
            marginLeft: 6,
            height: 15,
            borderRadius: 5,
            background: "#fff",
            fontSize: 9,
            color: "#6B7180",
            display: "flex",
            alignItems: "center",
            padding: "0 7px",
            whiteSpace: "nowrap",
          }}
        >
          {BASE}
          <span style={{ color: "var(--color-ink)" }}>{TYPED.slice(0, n)}</span>
        </div>
      </div>
      <div style={{ position: "relative", height: 134 }}>
        {waiting && (
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            style={{ position: "absolute", left: "50%", top: "50%", marginLeft: -11, marginTop: -11 }}
          >
            <circle cx="11" cy="11" r="8" fill="none" stroke="#E3E6EE" strokeWidth="3" />
            <circle
              cx="11"
              cy="11"
              r="8"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="14 60"
              transform={`rotate(${(t / 800) * 360} 11 11)`}
            />
          </svg>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: show,
            transform: `translateY(${10 * (1 - rise)}px)`,
          }}
        >
          <div style={{ fontSize: 36, fontWeight: 900, color: "#C9D2EA", lineHeight: 1, letterSpacing: "-.02em" }}>
            404
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "var(--color-ink)", marginTop: 6 }}>
            페이지를 찾을 수 없어요
          </div>
          <div style={{ fontSize: 10.5, color: "#6B7180", marginTop: 2 }}>주소가 바뀌었거나 사라졌어요</div>
          <div
            style={{
              marginTop: 10,
              fontSize: 10,
              fontWeight: 700,
              color: "#fff",
              background: "var(--color-accent)",
              borderRadius: 12,
              padding: "4px 12px",
            }}
          >
            홈으로 가기
          </div>
        </div>
      </div>
    </div>
  );
}
