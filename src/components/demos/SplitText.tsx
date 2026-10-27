"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { big } from "./shared";

const CHARS = [..."환영해요!"];

// 3.3초 주기: 글자마다 0.09초 차이로 굴러 들어옴
export default function SplitText() {
  const t = useLoop(3300);
  const out = 1 - seg(t, 2700, 3000);
  return (
    <div style={{ ...big, fontSize: 36 }}>
      {CHARS.map((c, i) => {
        const local = t - 150 - i * 90;
        const p = ease(seg(local, 0, 600));
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: seg(local, 0, 300) * out,
              transform: `translateY(${(1 - p) * 30}px) rotate(${(1 - p) * -25}deg) scale(${0.6 + 0.4 * p})`,
            }}
          >
            {c}
          </span>
        );
      })}
    </div>
  );
}
