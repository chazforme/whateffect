"use client";

import { useLoop } from "@/hooks/useLoop";
import { big } from "./shared";

const CHARS = [..."두근두근 세일"];

// 1.4초에 한 번 물결이 지나감. 글자마다 박자를 조금씩 늦춤
export default function WaveText() {
  const t = useLoop(1400);
  return (
    <div style={{ ...big, fontSize: 34 }}>
      {CHARS.map((c, i) => {
        const y = -10 * Math.sin((t / 1400) * Math.PI * 2 - i * 0.55);
        return (
          <span key={i} style={{ display: "inline-block", transform: `translateY(${y}px)`, minWidth: c === " " ? "0.3em" : undefined }}>
            {c}
          </span>
        );
      })}
    </div>
  );
}
