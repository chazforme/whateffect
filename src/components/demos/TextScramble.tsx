"use client";

import { useLoop } from "@/hooks/useLoop";
import { rand } from "@/lib/loop";
import { big } from "./shared";

const TARGET = "NEW ARRIVAL";
const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*";

// 3.6초 주기: 마구 돌다가 왼쪽부터 한 글자씩 맞춰짐 → 유지 → 다시 섞임
export default function TextScramble() {
  const t = useLoop(3600);
  const tick = Math.floor(t / 60);
  return (
    <div style={{ ...big, fontSize: 28, fontFamily: "ui-monospace, Menlo, Consolas, monospace", letterSpacing: 0 }}>
      {[...TARGET].map((c, i) => {
        const fixed = t >= 400 + i * 110 && t < 3000;
        if (c === " ") return <span key={i}> </span>;
        const shown = fixed ? c : POOL[Math.floor(rand(tick * 31 + i * 7) * POOL.length)];
        return (
          <span key={i} style={{ color: fixed ? "var(--color-ink)" : "var(--color-accent)" }}>
            {shown}
          </span>
        );
      })}
    </div>
  );
}
