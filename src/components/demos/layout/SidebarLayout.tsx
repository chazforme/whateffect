"use client";

const MENU = ["홈", "매출", "고객", "광고", "설정"];
const BARS = [38, 52, 44, 66, 58, 74, 86];

// 왼쪽에 늘 고정된 세로 메뉴, 오른쪽 넓은 곳에 내용
export default function SidebarLayout() {
  return (
    <div
      style={{
        width: 268,
        height: 160,
        background: "#F4F6FA",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(27,34,54,.08)",
        overflow: "hidden",
        display: "flex",
      }}
    >
      <div style={{ width: 62, background: "#1B2236", padding: "10px 6px", display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: "#fff", padding: "0 5px 6px" }}>■ 관리자</div>
        {MENU.map((m) => (
          <div
            key={m}
            style={{
              fontSize: 8.5,
              fontWeight: 600,
              borderRadius: 5,
              padding: "4px 6px",
              color: m === "매출" ? "#fff" : "#9AA3BA",
              background: m === "매출" ? "var(--color-accent)" : "transparent",
            }}
          >
            {m}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: 10, display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: "var(--color-ink)" }}>매출 현황</span>
          <span style={{ fontSize: 7.5, color: "#6B7180" }}>최근 7일</span>
        </div>
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 7,
            padding: "8px 10px 6px",
            display: "flex",
            alignItems: "flex-end",
            gap: 7,
          }}
        >
          {BARS.map((h, k) => (
            <div
              key={k}
              style={{
                flex: 1,
                height: `${h}%`,
                borderRadius: "3px 3px 0 0",
                background: k === BARS.length - 1 ? "var(--color-accent)" : "#C9D5FA",
              }}
            />
          ))}
        </div>
        <div style={{ height: 26, background: "#fff", borderRadius: 7, display: "flex", alignItems: "center", padding: "0 8px", fontSize: 8, color: "#6B7180" }}>
          이번 달 목표 <b style={{ marginLeft: "auto", color: "var(--color-ink)" }}>82% 달성</b>
        </div>
      </div>
    </div>
  );
}
