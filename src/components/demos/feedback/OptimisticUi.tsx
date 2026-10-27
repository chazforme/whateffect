"use client";

import type { CSSProperties } from "react";
import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";

const TAP = 200;
const SAVED = 1700; // 저장이 끝나는 시각
const RESET = 3500;

function Button({ on, wait, rot }: { on: boolean; wait: boolean; rot: number }) {
  const s: CSSProperties = {
    height: 28,
    borderRadius: 8,
    border: `1.5px solid ${on ? "var(--color-accent)" : "#E3E6EE"}`,
    background: on ? "#E9EFFD" : "#fff",
    color: on ? "var(--color-accent)" : "var(--color-ink)",
    fontSize: 11.5,
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginTop: 8,
  };
  return (
    <div style={s}>
      {wait ? (
        <svg width="14" height="14" viewBox="0 0 14 14">
          <circle cx="7" cy="7" r="5" fill="none" stroke="#E3E6EE" strokeWidth="2" />
          <circle
            cx="7"
            cy="7"
            r="5"
            fill="none"
            stroke="#6B7180"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="9 40"
            transform={`rotate(${rot} 7 7)`}
          />
        </svg>
      ) : on ? (
        "★ 찜했어요"
      ) : (
        "☆ 찜하기"
      )}
    </div>
  );
}

function Panel({
  label,
  accent,
  on,
  wait,
  note,
  t,
}: {
  label: string;
  accent: boolean;
  on: boolean;
  wait: boolean;
  note: { text: string; o: number };
  t: number;
}) {
  const tp = seg(t, TAP, TAP + 480);
  const tapO = t < TAP || tp >= 1 ? 0 : tp < 0.33 ? tp * 3 : 1 - (tp - 0.33) / 0.67;
  return (
    <div style={{ width: 128 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          color: accent ? "var(--color-accent)" : "#6B7180",
          marginBottom: 6,
          textAlign: "center",
        }}
      >
        {label}
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 12,
          position: "relative",
          boxShadow: "0 2px 8px rgba(27,34,54,.06)",
        }}
      >
        <div style={{ fontSize: 12.5, fontWeight: 800, color: "var(--color-ink)" }}>⛺ 캠핑 의자</div>
        <div style={{ fontSize: 11, color: "#6B7180" }}>₩45,000</div>
        <Button on={on} wait={wait} rot={(t / 800) * 360} />
        <div
          style={{
            position: "absolute",
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "rgba(58,91,239,.35)",
            left: "50%",
            bottom: 14,
            opacity: tapO,
            transform: `translateX(-50%) scale(${0.4 + tp * 1.2})`,
          }}
        />
      </div>
      <div style={{ fontSize: 10, color: "#6B7180", textAlign: "center", marginTop: 6, height: 14, opacity: note.o }}>
        {note.text}
      </div>
    </div>
  );
}

// 4초 주기: 같은 순간 두 버튼을 누름. 왼쪽은 저장될 때까지 빙글, 오른쪽은 바로 바뀌고 저장은 뒤에서
export default function OptimisticUi() {
  const t = useLoop(4000);
  const pressed = t >= TAP + 250 && t < RESET;
  const saved = t >= SAVED && t < RESET;
  const rightNote =
    t < TAP + 250 || t >= 2700
      ? { text: "", o: 0 }
      : t < SAVED
        ? { text: "저장 중…", o: 1 }
        : { text: "✓ 저장됨", o: 1 - seg(t, 2400, 2700) };

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <Panel label="기다렸다 반영" accent={false} on={saved} wait={pressed && !saved} note={{ text: "", o: 0 }} t={t} />
      <Panel label="누르자마자 반영" accent on={pressed} wait={false} note={rightNote} t={t} />
    </div>
  );
}
