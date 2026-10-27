"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const W = 250;
const H = 156;
const BAR = 24;
const MENU = [
  ["아메리카노", "₩4,500"],
  ["카페라떼", "₩5,000"],
  ["딸기 라떼", "₩6,200"],
];

// 3.8초 주기: 커서가 '메뉴 보기'를 누름 → 첫 화면이 왼쪽으로 밀려나며 흐려지고, 다음 화면이 오른쪽에서 들어옴 → 유지 → 처음으로
export default function PageTransition() {
  const t = useLoop(3800);
  const go = ease(seg(t, 1000, 1600));
  const reset = seg(t, 3200, 3700);
  const p = go * (1 - reset);

  // 커서: 오른쪽 아래 → 버튼
  const c = ease(seg(t, 150, 800));
  const cx = 210 + (58 - 210) * c;
  const cy = 150 + (BAR + 92 - 150) * c;
  const press = t > 850 && t < 1000 ? 0.85 : 1;
  const cursorO = seg(t, 0, 150) * (1 - seg(t, 1300, 1500));

  return (
    <div
      style={{
        position: "relative",
        width: W,
        height: H,
        borderRadius: 10,
        background: "#fff",
        border: "2px solid #1B2236",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: BAR,
          background: "#EEF1F7",
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "0 8px",
          borderBottom: "1px solid #E3E6EE",
        }}
      >
        {["#F87171", "#FBBF24", "#34D399"].map((col) => (
          <span key={col} style={{ width: 6, height: 6, borderRadius: "50%", background: col }} />
        ))}
        <span
          style={{
            marginLeft: 8,
            flex: 1,
            height: 14,
            borderRadius: 7,
            background: "#fff",
            fontSize: 9,
            lineHeight: "14px",
            padding: "0 8px",
            color: "#6B7180",
          }}
        >
          cafebom.kr/{p > 0.5 ? "menu" : "home"}
        </span>
      </div>

      {/* 첫 화면 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: BAR,
          bottom: 0,
          padding: "18px 16px",
          opacity: 1 - p,
          transform: `translateX(${-40 * p}%)`,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--color-accent)" }}>☕ 카페 봄날</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "var(--color-ink)", marginTop: 4, letterSpacing: "-.02em" }}>
          따뜻한 하루를 시작해요
        </div>
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 80,
            padding: "6px 14px",
            borderRadius: 8,
            background: "var(--color-accent)",
            color: "#fff",
            fontSize: 12,
            fontWeight: 800,
            transform: `scale(${press})`,
          }}
        >
          메뉴 보기
        </div>
      </div>

      {/* 다음 화면 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: BAR,
          bottom: 0,
          padding: "12px 16px",
          opacity: p,
          transform: `translateX(${40 * (1 - p)}%)`,
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 800, color: "var(--color-ink)", marginBottom: 6 }}>메뉴</div>
        {MENU.map(([n, price]) => (
          <div
            key={n}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              fontWeight: 700,
              color: "var(--color-ink)",
              padding: "6px 0",
              borderBottom: "1px solid #EEF1F7",
            }}
          >
            <span>{n}</span>
            <span style={{ color: "#6B7180" }}>{price}</span>
          </div>
        ))}
      </div>

      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        style={{ position: "absolute", left: cx, top: cy, opacity: cursorO }}
      >
        <path d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11 Z" fill="#1B2236" stroke="#fff" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
