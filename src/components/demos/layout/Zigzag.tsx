"use client";

const ROWS = [
  { t: "① 가볍게", s: "한 손에 쏙 280g", c: "#C9D5FA" },
  { t: "② 튼튼하게", s: "떨어뜨려도 괜찮아요", c: "#F5D3DC" },
  { t: "③ 오래가게", s: "한 번 충전 3일", c: "#CDEBDD" },
];

// 사진-글, 글-사진 순서로 번갈아 내려가는 배치
export default function Zigzag() {
  return (
    <div
      style={{
        width: 236,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(27,34,54,.08)",
        padding: 8,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {ROWS.map((r, k) => (
        <div key={r.t} style={{ display: "flex", flexDirection: k % 2 ? "row-reverse" : "row", gap: 8, height: 44 }}>
          <div style={{ width: 96, background: r.c, borderRadius: 6 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "var(--color-ink)" }}>{r.t}</div>
            <div style={{ fontSize: 8, color: "#6B7180", marginTop: 2 }}>{r.s}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
