"use client";

import type { CSSProperties } from "react";

const box: CSSProperties = {
  borderRadius: 10,
  padding: 8,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  color: "var(--color-ink)",
  fontWeight: 800,
  overflow: "hidden",
};

// 크기가 제각각인 칸을 도시락처럼 빈틈없이 끼워 맞춤
export default function BentoGrid() {
  return (
    <div
      style={{
        width: 264,
        height: 160,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        gap: 6,
      }}
    >
      <div style={{ ...box, gridColumn: "1 / 3", gridRow: "1 / 4", background: "#C9D5FA" }}>
        <span style={{ fontSize: 9, color: "var(--color-accent)" }}>NEW</span>
        <span style={{ fontSize: 15, lineHeight: 1.2 }}>AI 사진 보정</span>
      </div>
      <div style={{ ...box, gridColumn: "3 / 5", background: "#fff" }}>
        <span style={{ fontSize: 10 }}>🔋 배터리 하루 종일</span>
      </div>
      <div style={{ ...box, background: "#F5D3DC", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 14 }}>5G</span>
      </div>
      <div style={{ ...box, gridRow: "2 / 4", background: "#fff", justifyContent: "space-between" }}>
        <span style={{ fontSize: 8, color: "#6B7180", fontWeight: 600 }}>무게</span>
        <span style={{ fontSize: 15 }}>
          168<small style={{ fontSize: 9 }}>g</small>
        </span>
      </div>
      <div style={{ ...box, background: "#CDEBDD", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 10 }}>💧 방수</span>
      </div>
    </div>
  );
}
