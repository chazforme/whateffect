"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { big } from "./shared";

const MENU = ["홈", "상품", "이벤트"];
const STEP = 1300;

// 가짜 커서가 메뉴를 하나씩 옮겨 다니고, 올라간 메뉴에 밑줄이 왼쪽부터 그어짐
export default function AnimatedUnderline() {
  const t = useLoop(STEP * MENU.length);
  const active = Math.floor(t / STEP);
  const local = t % STEP;
  const grow = ease(seg(local, 150, 550));
  const leave = ease(seg(local, 950, 1250));

  return (
    <div style={{ ...big, fontSize: 20, display: "flex", gap: 26 }}>
      {MENU.map((m, i) => {
        const on = i === active;
        return (
          <span key={m} style={{ position: "relative", color: on ? "var(--color-ink)" : "#8A90A0" }}>
            {m}
            <span
              style={{
                position: "absolute",
                bottom: -5,
                height: 3,
                borderRadius: 2,
                background: "var(--color-accent)",
                left: on ? `${leave * 100}%` : 0,
                width: on ? `${(grow - leave) * 100}%` : 0,
              }}
            />
            {on && (
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                style={{
                  position: "absolute",
                  left: "60%",
                  top: "115%",
                  opacity: seg(local, 0, 150) * (1 - seg(local, 1100, 1300)),
                }}
              >
                <path d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11 Z" fill="#1B2236" stroke="#fff" strokeWidth="1.2" />
              </svg>
            )}
          </span>
        );
      })}
    </div>
  );
}
