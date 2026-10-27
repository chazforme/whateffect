"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

// 4초 주기: '담기' 탭 → 검은 알림이 떠오름 → 저절로 사라짐 (버튼 없음)
export default function Toast() {
  const t = useLoop(4000);

  const tp = seg(t, 200, 680);
  const tapOpacity = t < 200 ? 0 : tp < 0.33 ? tp * 3 : 1 - (tp - 0.33) / 0.67;
  const tapScale = t < 200 ? 0 : 0.4 + tp * 1.2;
  const show = t < 2700 ? ease(seg(t, 650, 950)) : 1 - seg(t, 2700, 3000);

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
        padding: "10px 9px",
      }}
    >
      <div style={{ fontSize: 8, color: "#6B7180", marginBottom: 6 }}>‹ 상품 상세</div>
      <div
        style={{
          height: 56,
          borderRadius: 8,
          background: "#DCE3F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
        }}
      >
        🎧
      </div>
      <div style={{ fontSize: 9, fontWeight: 800, color: "var(--color-ink)", marginTop: 6 }}>무선 이어폰 프로</div>
      <div style={{ fontSize: 9, fontWeight: 800, color: "var(--color-accent)" }}>₩89,000</div>
      <div
        style={{
          position: "absolute",
          left: 9,
          right: 9,
          bottom: 10,
          height: 20,
          borderRadius: 6,
          background: "var(--color-accent)",
          color: "#fff",
          fontSize: 8,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        장바구니 담기
      </div>
      <div
        style={{
          position: "absolute",
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "rgba(58,91,239,.35)",
          left: "50%",
          bottom: 9,
          opacity: tapOpacity,
          transform: `translateX(-50%) scale(${tapScale})`,
        }}
      />
      {/* 토스트 */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 38,
          background: "rgba(27,34,54,.92)",
          color: "#fff",
          fontSize: 8,
          fontWeight: 700,
          whiteSpace: "nowrap",
          padding: "5px 9px",
          borderRadius: 12,
          opacity: show,
          transform: `translate(-50%, ${8 * (1 - show)}px)`,
          boxShadow: "0 3px 8px rgba(27,34,54,.25)",
        }}
      >
        ✓ 장바구니에 담았어요
      </div>
    </div>
  );
}
