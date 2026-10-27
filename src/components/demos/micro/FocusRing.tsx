"use client";

import type { CSSProperties } from "react";
import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const STEP = 1100;
const TOPS = [22, 66, 110];
const btn: CSSProperties = {
  position: "absolute",
  left: 40,
  width: 180,
  height: 34,
  borderRadius: 9,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 13.5,
  fontWeight: 800,
  boxSizing: "border-box",
};

// 3.3초 주기: Tab 키를 누를 때마다 테두리 링이 다음 버튼으로 옮겨 감
export default function FocusRing() {
  const t = useLoop(STEP * 3);
  const i = Math.floor(t / STEP);
  const local = t % STEP;
  const prev = (i + 2) % 3;
  const m = ease(seg(local, 0, 200));
  const top = TOPS[prev] + (TOPS[i] - TOPS[prev]) * m;
  const pop = 1 + 0.05 * (1 - ease(seg(local, 0, 300)));
  const pressed = local < 160;

  return (
    <div style={{ position: "relative", width: 280, height: 170 }}>
      <div style={{ ...btn, top: TOPS[0], background: "var(--color-accent)", color: "#fff" }}>로그인</div>
      <div style={{ ...btn, top: TOPS[1], background: "#fff", color: "var(--color-ink)", border: "1.5px solid #D5D9E2" }}>
        회원가입
      </div>
      <div style={{ ...btn, top: TOPS[2], color: "#6B7180", fontWeight: 700, textDecoration: "underline" }}>
        비밀번호 찾기
      </div>
      <div
        style={{
          position: "absolute",
          left: 34,
          top: top - 6,
          width: 192,
          height: 46,
          borderRadius: 13,
          border: "3px solid var(--color-accent)",
          boxShadow: "inset 0 0 0 2px #fff",
          boxSizing: "border-box",
          transform: `scale(${pop})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 234,
          top: 120,
          width: 42,
          height: 30,
          borderRadius: 7,
          background: pressed ? "#E3E6EE" : "#fff",
          border: "1.5px solid #C9CEDA",
          boxShadow: pressed ? "0 1px 0 #C9CEDA" : "0 3px 0 #C9CEDA",
          transform: `translateY(${pressed ? 2 : 0}px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11.5,
          fontWeight: 800,
          color: "var(--color-ink)",
          boxSizing: "border-box",
        }}
      >
        Tab ⇥
      </div>
    </div>
  );
}
