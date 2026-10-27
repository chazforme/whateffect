"use client";

const EVENTS = [
  ["2019", "작은 가게로 시작"],
  ["2021", "온라인몰 오픈"],
  ["2023", "해외 첫 진출"],
  ["2026", "매장 100곳"],
];

// 한 줄 위에 시간 순서대로 점을 찍고 사건을 적음
export default function Timeline() {
  return (
    <div style={{ width: 264, position: "relative", height: 120 }}>
      <div
        style={{ position: "absolute", left: 14, right: 14, top: 58, height: 3, borderRadius: 2, background: "#C9D5FA" }}
      />
      <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "space-between" }}>
        {EVENTS.map(([y, s], k) => {
          const last = k === EVENTS.length - 1;
          return (
            <div
              key={y}
              style={{ width: 62, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
            >
              <div
                style={{
                  height: 46,
                  display: "flex",
                  alignItems: "flex-end",
                  fontSize: 13,
                  fontWeight: 800,
                  color: last ? "var(--color-accent)" : "var(--color-ink)",
                }}
              >
                {y}
              </div>
              <div
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                  marginTop: 6,
                  background: last ? "var(--color-accent)" : "#fff",
                  border: "3px solid var(--color-accent)",
                }}
              />
              <div
                style={{
                  marginTop: 8,
                  fontSize: 9,
                  fontWeight: 600,
                  color: "#3A4152",
                  background: "#fff",
                  borderRadius: 6,
                  padding: "4px 5px",
                  lineHeight: 1.3,
                  boxShadow: "0 1px 4px rgba(27,34,54,.07)",
                }}
              >
                {s}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
