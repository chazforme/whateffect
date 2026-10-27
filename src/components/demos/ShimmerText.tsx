"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { big } from "./shared";

// 2.6초 주기: 1.2초 동안 빛줄기가 왼쪽→오른쪽으로 지나가고 잠깐 쉼
export default function ShimmerText() {
  const t = useLoop(2600);
  // 배경 폭 250%일 때 위치 100% → 0% 로 옮기면 빛줄기가 글자 밖 왼쪽에서 오른쪽 밖까지 지나감
  const pos = 100 - ease(seg(t, 200, 1400)) * 100;
  return (
    <div
      style={{
        ...big,
        fontSize: 36,
        color: "transparent",
        backgroundImage: "linear-gradient(110deg,#5B6274 42%,#F4F6FF 50%,#5B6274 58%)",
        backgroundSize: "250% 100%",
        backgroundPosition: `${pos}% 0`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
      }}
    >
      신상품 도착
    </div>
  );
}
