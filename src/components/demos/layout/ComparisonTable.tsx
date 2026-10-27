"use client";

const PLANS = [
  { name: "베이직", price: "무료", rows: ["✓ 1명", "✓ 5GB", "–"], pick: false },
  { name: "프로", price: "₩9,900", rows: ["✓ 5명", "✓ 100GB", "✓ 상담"], pick: true },
  { name: "팀", price: "₩29,000", rows: ["✓ 20명", "✓ 1TB", "✓ 상담"], pick: false },
];

// 요금제를 나란히 세워 항목별로 비교, 추천 하나는 눈에 띄게
export default function ComparisonTable() {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
      {PLANS.map((p) => (
        <div
          key={p.name}
          style={{
            width: 80,
            background: "#fff",
            borderRadius: 10,
            border: p.pick ? "2px solid var(--color-accent)" : "2px solid transparent",
            boxShadow: "0 2px 8px rgba(27,34,54,.08)",
            padding: p.pick ? "8px 6px 10px" : "6px 6px 8px",
            textAlign: "center",
            position: "relative",
          }}
        >
          {p.pick && (
            <div
              style={{
                position: "absolute",
                top: -9,
                left: "50%",
                transform: "translateX(-50%)",
                background: "var(--color-accent)",
                color: "#fff",
                fontSize: 7.5,
                fontWeight: 800,
                borderRadius: 999,
                padding: "2px 7px",
                whiteSpace: "nowrap",
              }}
            >
              추천
            </div>
          )}
          <div style={{ fontSize: 9.5, fontWeight: 700, color: "#6B7180", marginTop: p.pick ? 4 : 0 }}>{p.name}</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "var(--color-ink)", margin: "2px 0 6px" }}>
            {p.price}
          </div>
          {p.rows.map((r, k) => (
            <div
              key={k}
              style={{
                fontSize: 8.5,
                color: r === "–" ? "#B4B9C5" : "var(--color-ink)",
                borderTop: "1px solid #EEF1F7",
                padding: "4px 0",
              }}
            >
              {r}
            </div>
          ))}
          <div
            style={{
              marginTop: 4,
              fontSize: 8.5,
              fontWeight: 700,
              borderRadius: 6,
              padding: "4px 0",
              background: p.pick ? "var(--color-accent)" : "#EEF1F7",
              color: p.pick ? "#fff" : "var(--color-ink)",
            }}
          >
            선택
          </div>
        </div>
      ))}
    </div>
  );
}
