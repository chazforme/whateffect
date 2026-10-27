"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { big } from "./shared";

// 4초 주기: 테두리만 있는 글자 → 속이 잠깐 채워졌다가 → 다시 비워짐 (차이를 보여주려고)
export default function OutlineText() {
  const t = useLoop(4000);
  const fill = t < 2800 ? ease(seg(t, 1500, 2200)) : 1 - ease(seg(t, 2800, 3500));
  const edge = fill * 100;
  return (
    <div
      style={{
        ...big,
        fontSize: 46,
        fontWeight: 900,
        letterSpacing: "0.01em",
        color: "transparent",
        WebkitTextStroke: "1.6px #1B2236",
        backgroundImage: `linear-gradient(90deg,#1B2236 ${edge}%,transparent ${edge}%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
      }}
    >
      BIG SALE
    </div>
  );
}
