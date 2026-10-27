"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

// 4초 주기: 그림 → 제목 → 보조 문구 → 버튼이 차례로 나타나고, 아이콘은 살짝 둥실
export default function EmptyState() {
  const t = useLoop(4000);
  const out = 1 - seg(t, 3500, 3900);
  const item = (k: number) => {
    const p = seg(t, 150 + k * 180, 600 + k * 180);
    return { opacity: p * out, transform: `translateY(${8 * (1 - ease(p))}px)` };
  };
  const bob = Math.sin((t / 2000) * Math.PI * 2) * 2;

  return (
    <div
      style={{
        width: 118,
        height: 168,
        background: "#fff",
        borderRadius: 18,
        border: "3px solid #1B2236",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: 9,
          fontWeight: 800,
          color: "var(--color-ink)",
          padding: "9px 10px 7px",
          borderBottom: "1px solid #EEF1F7",
        }}
      >
        장바구니
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 16 }}>
        <div style={item(0)}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "#EEF1F7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              transform: `translateY(${bob}px)`,
            }}
          >
            🛒
          </div>
        </div>
        <div style={{ ...item(1), fontSize: 8.5, fontWeight: 800, color: "var(--color-ink)", marginTop: 10 }}>
          장바구니가 비어 있어요
        </div>
        <div style={{ ...item(2), fontSize: 6.8, color: "#6B7180", marginTop: 3, whiteSpace: "nowrap" }}>
          마음에 드는 상품을 담아보세요
        </div>
        <div
          style={{
            ...item(3),
            marginTop: 12,
            fontSize: 7.5,
            fontWeight: 700,
            color: "#fff",
            background: "var(--color-accent)",
            borderRadius: 10,
            padding: "4px 10px",
          }}
        >
          쇼핑하러 가기
        </div>
      </div>
    </div>
  );
}
