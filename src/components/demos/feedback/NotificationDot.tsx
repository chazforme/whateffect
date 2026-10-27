"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const TABS = [
  { icon: "🏠", label: "홈" },
  { icon: "🔍", label: "검색" },
  { icon: "🔔", label: "알림" },
  { icon: "👤", label: "내정보" },
];
const W = 250;
const TAP = 2400;
const CLEAR = 2650;
const RESET = 3900;

function Dot({ scale = 1, ring }: { scale?: number; ring?: number }) {
  return (
    <span style={{ position: "absolute", top: -1, right: -4, width: 9, height: 9 }}>
      {ring !== undefined && (
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "#F04452",
            opacity: 0.5 * (1 - ring),
            transform: `scale(${1 + ring * 1.6})`,
          }}
        />
      )}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "#F04452",
          border: "1.5px solid #fff",
          transform: `scale(${scale})`,
        }}
      />
    </span>
  );
}

// 4.2초 주기: '알림' 탭에 빨간 점이 생기고 물결이 퍼짐 → 손가락이 누르면 점이 사라짐
export default function NotificationDot() {
  const t = useLoop(4200);
  const showDot = t >= 400 && t < CLEAR;
  const pop = ease(seg(t, 400, 600)) * (1 + 0.3 * Math.sin(Math.PI * seg(t, 400, 700)));
  const ring = ((t - 400) % 1000) / 1000;
  const active = t >= CLEAR && t < RESET ? 2 : 0;

  const tp = seg(t, TAP, TAP + 480);
  const tapO = t < TAP || tp >= 1 ? 0 : tp < 0.33 ? tp * 3 : 1 - (tp - 0.33) / 0.67;

  return (
    <div
      style={{
        position: "relative",
        width: W,
        height: 60,
        background: "#fff",
        borderRadius: 16,
        display: "flex",
        boxShadow: "0 2px 10px rgba(27,34,54,.08)",
      }}
    >
      {TABS.map((tab, i) => (
        <div
          key={tab.label}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <span style={{ position: "relative", fontSize: 18, lineHeight: 1, opacity: active === i ? 1 : 0.55 }}>
            {tab.icon}
            {i === 2 && showDot && <Dot scale={pop} ring={ring} />}
            {i === 3 && <Dot />}
          </span>
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: active === i ? "var(--color-accent)" : "#8A90A0",
            }}
          >
            {tab.label}
          </span>
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "rgba(58,91,239,.35)",
          left: W * (2.5 / 4) - 13,
          top: 17,
          opacity: tapO,
          transform: `scale(${0.4 + tp * 1.2})`,
        }}
      />
    </div>
  );
}
