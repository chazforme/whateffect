"use client";

const KPIS = [
  { k: "오늘 매출", v: "₩3.2억", d: "▲ 12%", up: true },
  { k: "주문", v: "1,284건", d: "▲ 5%", up: true },
  { k: "방문자", v: "4.8만", d: "▲ 3%", up: true },
  { k: "구매 전환", v: "2.7%", d: "▼ 0.3%p", up: false },
];

// 대시보드 맨 위, 가장 중요한 숫자 4개를 카드로 한 줄
export default function KpiRow() {
  return (
    <div style={{ width: 272, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", gap: 5 }}>
        {KPIS.map((x) => (
          <div
            key={x.k}
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: 9,
              padding: "7px 6px",
              boxShadow: "0 2px 6px rgba(27,34,54,.07)",
            }}
          >
            <div style={{ fontSize: 8, color: "#6B7180", fontWeight: 600 }}>{x.k}</div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: "var(--color-ink)",
                letterSpacing: "-.02em",
                margin: "3px 0 2px",
                whiteSpace: "nowrap",
              }}
            >
              {x.v}
            </div>
            <div style={{ fontSize: 7.5, fontWeight: 700, color: x.up ? "#E5484D" : "#3A5BEF" }}>{x.d}</div>
          </div>
        ))}
      </div>
      {/* 아래 차트 자리는 흐리게 */}
      <div style={{ display: "flex", gap: 5, opacity: 0.55 }}>
        <div style={{ flex: 2, height: 70, background: "#fff", borderRadius: 9, padding: 8, display: "flex", alignItems: "flex-end", gap: 5 }}>
          {[40, 55, 48, 70, 62, 82, 90].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: "#C9D5FA", borderRadius: "3px 3px 0 0" }} />
          ))}
        </div>
        <div style={{ flex: 1, height: 70, background: "#fff", borderRadius: 9, padding: 8 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ height: 5, borderRadius: 3, background: "#E3E6EE", marginBottom: 7 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
