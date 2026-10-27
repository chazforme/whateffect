"use client";

// 홈페이지 첫 화면: 위 메뉴줄 + 큰 제목·버튼이 있는 넓은 영역 + 아래로 이어지는 내용이 살짝 보임
export default function HeroSection() {
  return (
    <div
      style={{
        width: 264,
        height: 164,
        background: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(27,34,54,.08)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 22,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0 10px",
          fontSize: 8.5,
          color: "#6B7180",
          fontWeight: 600,
        }}
      >
        <b style={{ color: "var(--color-ink)", fontSize: 9.5, marginRight: "auto" }}>봄날상점</b>
        <span>신상품</span>
        <span>기획전</span>
        <span>고객센터</span>
      </div>
      <div
        style={{
          height: 104,
          background: "linear-gradient(135deg,#DCE3F6,#C9D5FA)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <div style={{ fontSize: 9, fontWeight: 700, color: "var(--color-accent)" }}>이번 주말까지</div>
        <div style={{ fontSize: 19, fontWeight: 800, color: "var(--color-ink)", letterSpacing: "-.02em" }}>
          봄 신상 최대 50%
        </div>
        <div
          style={{
            marginTop: 3,
            background: "var(--color-accent)",
            color: "#fff",
            fontSize: 9,
            fontWeight: 700,
            borderRadius: 999,
            padding: "4px 12px",
          }}
        >
          지금 보러가기
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", gap: 6, padding: "8px 10px 0" }}>
        {[0, 1, 2, 3].map((k) => (
          <div key={k} style={{ flex: 1, background: "#EEF1F7", borderRadius: "5px 5px 0 0" }} />
        ))}
      </div>
    </div>
  );
}
