"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { big } from "./shared";

const WORDS = ["천천히,", "또렷하게"];

// 3.4초 주기: 단어마다 0.25초 차이로 초점이 맞음 → 유지 → 다시 흐려지며 사라짐
export default function BlurReveal() {
  const t = useLoop(3400);
  const out = seg(t, 2700, 3100);
  return (
    <div style={{ ...big, fontSize: 32, display: "flex", gap: 10 }}>
      {WORDS.map((w, k) => {
        const local = t - 100 - k * 250;
        const blur = 12 * (1 - ease(seg(local, 0, 900))) + 10 * out;
        return (
          <span key={w} style={{ filter: `blur(${blur}px)`, opacity: seg(local, 0, 700) * (1 - out) }}>
            {w}
          </span>
        );
      })}
    </div>
  );
}
