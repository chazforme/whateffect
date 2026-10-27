"use client";

const PARTS: [number, string, string][] = [
  [34, "#C9D5FA", "① 대표 사진"],
  [16, "#fff", "② 한 줄 핵심"],
  [30, "#F5D3DC", "③ 장점 3가지"],
  [24, "#CDEBDD", "④ 사용 방법"],
  [26, "#F6E3C2", "⑤ 구매 후기"],
  [14, "#3A5BEF", "⑥ 구매 버튼"],
];

// 휴대폰으로 길게 내려 읽는 상세페이지를 한눈에 줄여 본 모습
export default function DetailPage() {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "stretch" }}>
      <div
        style={{
          width: 78,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(27,34,54,.08)",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {PARTS.map(([h, c, label]) => (
          <div
            key={label}
            style={{
              height: h,
              background: c,
              borderRadius: 4,
              border: c === "#fff" ? "1px solid #E3E6EE" : "none",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {PARTS.map(([h, , label]) => (
          <div
            key={label}
            style={{
              height: h,
              display: "flex",
              alignItems: "center",
              fontSize: 9.5,
              fontWeight: 700,
              color: label.startsWith("⑥") ? "var(--color-accent)" : "var(--color-ink)",
              whiteSpace: "nowrap",
            }}
          >
            ← {label}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 8,
          color: "#6B7180",
          paddingLeft: 4,
        }}
      >
        <span>위</span>
        <div style={{ flex: 1, width: 1.5, background: "#C3C8D4", margin: "3px 0" }} />
        <span>↓ 아래</span>
      </div>
    </div>
  );
}
