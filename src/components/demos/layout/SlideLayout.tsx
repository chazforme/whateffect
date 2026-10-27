"use client";

const POINTS = ["매출 전년 대비 18% 증가", "신규 고객 2.4만 명", "광고비 효율 1.3배"];
const BARS = [42, 58, 50, 88];

// 16:9 발표 화면 한 장: 위 제목, 왼쪽 요점, 오른쪽 그래프, 아래 쪽번호
export default function SlideLayout() {
  return (
    <div
      style={{
        width: 264,
        height: 148.5,
        background: "#fff",
        borderRadius: 6,
        boxShadow: "0 2px 10px rgba(27,34,54,.12)",
        padding: "12px 14px 8px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ fontSize: 8, fontWeight: 700, color: "var(--color-accent)" }}>02 · 성과</div>
      <div style={{ fontSize: 14, fontWeight: 800, color: "var(--color-ink)", letterSpacing: "-.02em", marginTop: 1 }}>
        3분기 성과 요약
      </div>
      <div style={{ height: 2, width: 26, background: "var(--color-accent)", margin: "5px 0 8px" }} />
      <div style={{ flex: 1, display: "flex", gap: 12 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          {POINTS.map((p) => (
            <div key={p} style={{ fontSize: 8.5, color: "#3A4152", display: "flex", gap: 4, whiteSpace: "nowrap" }}>
              <b style={{ color: "var(--color-accent)" }}>•</b>
              {p}
            </div>
          ))}
        </div>
        <div
          style={{
            width: 96,
            background: "#F4F6FA",
            borderRadius: 5,
            padding: "6px 8px 4px",
            display: "flex",
            alignItems: "flex-end",
            gap: 6,
          }}
        >
          {BARS.map((h, k) => (
            <div key={k} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
              <div
                style={{
                  width: "100%",
                  height: `${h}%`,
                  background: k === BARS.length - 1 ? "var(--color-accent)" : "#C9D5FA",
                  borderRadius: "2px 2px 0 0",
                }}
              />
              <span style={{ fontSize: 6.5, color: "#6B7180", marginTop: 2 }}>{k + 1}Q</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 7, color: "#9AA0AE", marginTop: 6 }}>
        <span>봄날상점 · 마케팅팀</span>
        <span>3 / 12</span>
      </div>
    </div>
  );
}
