"use client";

import { useLoop } from "@/hooks/useLoop";
import { big } from "./shared";

const TILE = 360; // 그라디언트 한 장 폭(px). 처음·끝 색이 같아서 이어 붙여도 티가 안 남

// 4초에 한 장씩 색이 옆으로 흐름
export default function GradientText() {
  const t = useLoop(4000);
  return (
    <div
      style={{
        ...big,
        fontSize: 40,
        fontWeight: 900,
        color: "transparent",
        backgroundImage: "linear-gradient(90deg,#3A5BEF,#B44CF0,#FF5C8A,#FFB347,#3A5BEF)",
        backgroundSize: `${TILE}px 100%`,
        backgroundRepeat: "repeat-x",
        backgroundPosition: `${(t / 4000) * TILE}px 0`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
      }}
    >
      Summer Sale
    </div>
  );
}
