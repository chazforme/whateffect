"use client";

// 화면을 반으로 딱 나눠 왼쪽은 사진, 오른쪽은 글
export default function SplitScreen() {
  return (
    <div
      style={{
        width: 268,
        height: 156,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(27,34,54,.08)",
        overflow: "hidden",
        display: "flex",
      }}
    >
      <div
        style={{
          flex: 1,
          background: "linear-gradient(160deg,#F5C9D6,#C7B8F3)",
          display: "flex",
          alignItems: "flex-end",
          padding: 8,
          fontSize: 8,
          fontWeight: 700,
          color: "#fff",
        }}
      >
        사진
      </div>
      <div style={{ flex: 1, padding: "0 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: 8.5, fontWeight: 700, color: "var(--color-accent)" }}>2026 가을</div>
        <div
          style={{ fontSize: 15, fontWeight: 800, color: "var(--color-ink)", lineHeight: 1.25, marginTop: 3 }}
        >
          새 시즌
          <br />
          컬렉션
        </div>
        <div style={{ fontSize: 8, color: "#6B7180", marginTop: 5, lineHeight: 1.4 }}>
          포근한 니트와
          <br />
          코트를 만나보세요
        </div>
        <div
          style={{
            marginTop: 9,
            alignSelf: "flex-start",
            background: "var(--color-ink)",
            color: "#fff",
            fontSize: 8.5,
            fontWeight: 700,
            borderRadius: 6,
            padding: "4px 10px",
          }}
        >
          둘러보기
        </div>
      </div>
    </div>
  );
}
