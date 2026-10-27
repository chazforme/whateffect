"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { big } from "./shared";

const LINES = ["새로운 계절,", "새로운 컬렉션"];

// 3.4초 주기: 줄마다 0.2초 차이로 밀려 올라옴 → 유지 → 위로 빠져나감
export default function MaskedReveal() {
  const t = useLoop(3400);
  return (
    <div style={{ ...big, fontSize: 28 }}>
      {LINES.map((line, k) => {
        const local = t - k * 200;
        const y = t >= 2700 ? -100 * ease(seg(t, 2700 + k * 80, 3100 + k * 80)) : 100 * (1 - ease(seg(local, 100, 800)));
        return (
          <div key={line} style={{ overflow: "hidden" }}>
            <div style={{ transform: `translateY(${y}%)` }}>{line}</div>
          </div>
        );
      })}
    </div>
  );
}
