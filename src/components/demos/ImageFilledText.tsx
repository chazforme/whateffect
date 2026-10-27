"use client";

import { useLoop } from "@/hooks/useLoop";
import { big } from "./shared";

// 글자 안에 '바다 사진'(그림으로 그린 하늘·해·물결)을 채우고 물결만 천천히 흐르게
export default function ImageFilledText() {
  const t = useLoop(3000);
  const wave = (t / 3000) * 72; // 물결 무늬 18px × 4칸 → 끝과 처음이 딱 맞물림
  return (
    <div
      style={{
        ...big,
        fontSize: 92,
        fontWeight: 900,
        letterSpacing: "-.04em",
        lineHeight: 1.1,
        color: "transparent",
        backgroundImage: [
          "radial-gradient(circle at 78% 22%, #FFF4C2 0 9%, transparent 10%)",
          "repeating-linear-gradient(180deg, rgba(255,255,255,.38) 0 3px, transparent 3px 18px)",
          "linear-gradient(180deg,#9BE3FF 0%,#3AA0E4 45%,#0B4F8A 100%)",
        ].join(","),
        backgroundPosition: `0 0, 0 ${wave}px, 0 0`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
      }}
    >
      바다
    </div>
  );
}
