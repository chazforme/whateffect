"use client";

const line = (w: number) => (
  <div style={{ height: 5, width: w, borderRadius: 3, background: "#E3E6EE", margin: "5px auto 0" }} />
);

// 글은 가운데 좁게, 사진 띠만 화면 끝에서 끝까지
export default function FullBleed() {
  return (
    <div
      style={{
        width: 268,
        height: 164,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(27,34,54,.08)",
        overflow: "hidden",
        paddingTop: 12,
      }}
    >
      <div style={{ textAlign: "center", fontSize: 11, fontWeight: 800, color: "var(--color-ink)" }}>
        브랜드 이야기
      </div>
      {line(130)}
      {line(110)}
      <div
        style={{
          marginTop: 12,
          height: 62,
          background: "linear-gradient(120deg,#9FB4F7,#C7B8F3 55%,#F5C9D6)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 4px",
          color: "#fff",
          fontSize: 10,
          fontWeight: 800,
        }}
      >
        <span>◀</span>
        <span style={{ textShadow: "0 1px 4px rgba(27,34,54,.25)" }}>끝에서 끝까지 사진</span>
        <span>▶</span>
      </div>
      {line(130)}
      {line(120)}
      {line(90)}
    </div>
  );
}
