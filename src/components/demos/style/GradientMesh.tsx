"use client";

import { useLoop } from "@/hooks/useLoop";
import { AMOUNT, LABEL, frame } from "./common";

const P = 9000;

// 여러 색 덩어리가 겹쳐 번지고, 천천히 자리를 옮긴다
export default function GradientMesh() {
  const t = useLoop(P);
  const a = (t / P) * Math.PI * 2;
  const blobs: [number, number, string][] = [
    [22 + 12 * Math.sin(a), 25 + 12 * Math.cos(a), "#FF8FB1"],
    [82 + 10 * Math.cos(a), 18 + 14 * Math.sin(a), "#7AA2FF"],
    [72 - 14 * Math.sin(a), 88 - 10 * Math.cos(a), "#FFD36E"],
    [12 + 10 * Math.cos(a), 86 + 10 * Math.sin(a), "#9B7BFF"],
    [50 + 16 * Math.sin(a + 1), 52 + 10 * Math.cos(a + 2), "#6FE3D0"],
  ];
  return (
    <div
      style={{
        ...frame,
        backgroundColor: "#F3E8FF",
        backgroundImage: blobs.map(([x, y, col]) => `radial-gradient(at ${x}% ${y}%, ${col} 0px, transparent 58%)`).join(","),
        flexDirection: "column",
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(27,34,54,.7)" }}>{LABEL}</div>
      <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-.03em", color: "#1B2236" }}>{AMOUNT}</div>
    </div>
  );
}
