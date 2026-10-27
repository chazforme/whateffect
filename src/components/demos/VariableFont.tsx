"use client";

import { useLoop } from "@/hooks/useLoop";
import { big } from "./shared";

// 3초 주기: 굵기가 100 ↔ 900 사이를 부드럽게 오감 (Pretendard Variable)
export default function VariableFont() {
  const t = useLoop(3000);
  const w = Math.round(100 + 800 * (0.5 - 0.5 * Math.cos((t / 3000) * Math.PI * 2)));
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ ...big, fontSize: 44, fontWeight: w, letterSpacing: "-.03em" }}>숨쉬는 글자</div>
      <div style={{ marginTop: 6, fontSize: 12, fontWeight: 700, color: "var(--color-sub)" }}>굵기 {w}</div>
    </div>
  );
}
