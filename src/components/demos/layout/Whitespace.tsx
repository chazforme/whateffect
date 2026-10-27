"use client";

function Mini({ roomy }: { roomy: boolean }) {
  const p = roomy ? 16 : 4;
  const g = roomy ? 9 : 2;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div
        style={{
          width: 122,
          height: 128,
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(27,34,54,.08)",
          padding: p,
          display: "flex",
          flexDirection: "column",
          gap: g,
          overflow: "hidden",
        }}
      >
        <div style={{ fontSize: roomy ? 12 : 11, fontWeight: 800, color: "var(--color-ink)", lineHeight: 1.2 }}>
          신제품 출시
        </div>
        <div style={{ fontSize: 8, color: "#6B7180", lineHeight: 1.35 }}>
          {roomy ? "가볍고 조용한 새 청소기" : "가볍고 조용한 새 청소기 지금 사전예약하면 사은품 증정 무료배송 할인쿠폰"}
        </div>
        {!roomy && (
          <div style={{ fontSize: 8, color: "#6B7180", lineHeight: 1.35 }}>★4.8 후기 1,203개 · 오늘출발</div>
        )}
        <div
          style={{
            background: "var(--color-accent)",
            color: "#fff",
            fontSize: 8.5,
            fontWeight: 700,
            borderRadius: 6,
            padding: "4px 0",
            textAlign: "center",
            marginTop: roomy ? "auto" : 0,
          }}
        >
          사전예약
        </div>
        {!roomy && <div style={{ height: 22, background: "#DCE3F6", borderRadius: 4 }} />}
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, color: roomy ? "var(--color-accent)" : "#6B7180" }}>
        {roomy ? "여백 넉넉 ✓" : "빽빽함"}
      </span>
    </div>
  );
}

// 같은 내용, 빈 공간만 다르게 — 왼쪽 빽빽 vs 오른쪽 넉넉
export default function Whitespace() {
  return (
    <div style={{ display: "flex", gap: 18 }}>
      <Mini roomy={false} />
      <Mini roomy />
    </div>
  );
}
