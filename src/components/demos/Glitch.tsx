"use client";

import type { CSSProperties } from "react";
import { useLoop } from "@/hooks/useLoop";
import { rand } from "@/lib/loop";
import { big } from "./shared";

const BURSTS: [number, number][] = [
  [500, 850],
  [1500, 1650],
  [2300, 2750],
];

// 3초 주기 중 세 번, 짧게 지지직
export default function Glitch() {
  const t = useLoop(3000);
  const on = BURSTS.some(([a, b]) => t >= a && t < b);
  const n = Math.floor(t / 50);
  const dx = on ? (rand(n) - 0.5) * 10 : 0;
  const top = rand(n + 3) * 70;
  const layer = (color: string, sign: number, seed: number): CSSProperties => ({
    position: "absolute",
    inset: 0,
    color,
    opacity: on ? 0.9 : 0,
    transform: `translateX(${sign * dx + (rand(n + seed) - 0.5) * 4}px)`,
    clipPath: `inset(${top}% 0 ${Math.max(0, 85 - top - rand(n + seed) * 30)}% 0)`,
    mixBlendMode: "multiply",
  });
  const text = "ERROR 404";

  return (
    <div style={{ ...big, fontSize: 38, fontWeight: 900, position: "relative" }}>
      <span style={{ display: "inline-block", transform: `translateX(${on ? dx * 0.3 : 0}px)` }}>{text}</span>
      <span aria-hidden style={layer("#FF2E63", 1, 11)}>
        {text}
      </span>
      <span aria-hidden style={layer("#08D9D6", -1, 23)}>
        {text}
      </span>
    </div>
  );
}
