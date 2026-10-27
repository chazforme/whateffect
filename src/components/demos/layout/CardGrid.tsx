"use client";

const ITEMS = [
  ["울 니트", "₩39,000", "#C9D5FA"],
  ["린넨 셔츠", "₩29,000", "#F5D3DC"],
  ["와이드 팬츠", "₩45,000", "#CDEBDD"],
  ["캔버스백", "₩19,000", "#F6E3C2"],
  ["가디건", "₩52,000", "#DCD3F5"],
  ["버킷햇", "₩15,000", "#D3E7F5"],
];

// 크기가 똑같은 카드를 줄 맞춰 3개씩 2줄
export default function CardGrid() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 76px)", gap: 8 }}>
      {ITEMS.map(([name, price, c]) => (
        <div
          key={name}
          style={{ background: "#fff", borderRadius: 8, padding: 5, boxShadow: "0 2px 6px rgba(27,34,54,.07)" }}
        >
          <div style={{ height: 42, background: c, borderRadius: 5 }} />
          <div style={{ fontSize: 8.5, fontWeight: 600, color: "var(--color-ink)", marginTop: 4 }}>{name}</div>
          <div style={{ fontSize: 9, fontWeight: 800, color: "var(--color-ink)" }}>{price}</div>
        </div>
      ))}
    </div>
  );
}
