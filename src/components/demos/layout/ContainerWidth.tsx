"use client";

const line = (w: string) => (
  <div style={{ height: 5, width: w, borderRadius: 3, background: "#E3E6EE", marginTop: 5 }} />
);

// 넓은 화면이어도 글은 가운데 일정한 폭 안에만 — 양옆은 비워 둠
export default function ContainerWidth() {
  return (
    <div
      style={{
        width: 272,
        height: 160,
        background: "#F4F6FA",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(27,34,54,.08)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* 폭 표시 */}
      <div
        style={{
          position: "absolute",
          top: 6,
          left: 66,
          right: 66,
          display: "flex",
          alignItems: "center",
          gap: 3,
          fontSize: 8,
          fontWeight: 700,
          color: "var(--color-accent)",
        }}
      >
        <span>←</span>
        <div style={{ flex: 1, height: 1, background: "var(--color-accent)" }} />
        <span style={{ whiteSpace: "nowrap" }}>최대 1200px</span>
        <div style={{ flex: 1, height: 1, background: "var(--color-accent)" }} />
        <span>→</span>
      </div>
      {/* 가운데 본문 */}
      <div
        style={{
          width: 140,
          marginTop: 20,
          background: "#fff",
          borderLeft: "1.5px dashed #9EB0F5",
          borderRight: "1.5px dashed #9EB0F5",
          padding: "8px 10px",
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 800, color: "var(--color-ink)" }}>공지사항</div>
        <div style={{ fontSize: 7.5, color: "#6B7180", marginTop: 2 }}>2026.10.27 · 운영팀</div>
        <div style={{ height: 34, background: "#DCE3F6", borderRadius: 5, marginTop: 6 }} />
        {line("100%")}
        {line("92%")}
        {line("100%")}
        {line("70%")}
        {line("96%")}
      </div>
      {/* 양옆 빈 곳 */}
      <span style={{ position: "absolute", left: 12, top: 84, fontSize: 8, color: "#9AA0AE" }}>빈 곳</span>
      <span style={{ position: "absolute", right: 12, top: 84, fontSize: 8, color: "#9AA0AE" }}>빈 곳</span>
    </div>
  );
}
