"use client";

// 열마다 사진 높이가 달라 벽돌처럼 엇갈려 쌓임 (핀터레스트형)
const COLS: [number, string, string][][] = [
  [
    [58, "#C9D5FA", "캠핑 요리"],
    [34, "#F6E3C2", "홈카페"],
    [44, "#CDEBDD", ""],
  ],
  [
    [32, "#F5D3DC", "봄 코디"],
    [64, "#DCD3F5", "제주 여행"],
    [40, "#D3E7F5", ""],
  ],
  [
    [46, "#CDEBDD", "식물 키우기"],
    [40, "#C9D5FA", ""],
    [52, "#F5D3DC", "네일 아트"],
  ],
];

export default function Masonry() {
  return (
    <div style={{ width: 246, height: 166, overflow: "hidden", display: "flex", gap: 6, alignItems: "flex-start" }}>
      {COLS.map((col, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          {col.map(([h, c, label], j) => (
            <div key={j}>
              <div style={{ height: h, background: c, borderRadius: 8 }} />
              {label && (
                <div style={{ fontSize: 8, fontWeight: 700, color: "var(--color-ink)", marginTop: 2 }}>{label}</div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
