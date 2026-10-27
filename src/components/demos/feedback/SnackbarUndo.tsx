"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const MEMOS = ["장보기 목록", "회의 메모", "여행 계획"];
const ROW = 22;
const GAP = 5;

function tap(t: number, a: number) {
  const p = seg(t, a, a + 480);
  if (t < a || p >= 1) return { opacity: 0, scale: 0 };
  return { opacity: p < 0.33 ? p * 3 : 1 - (p - 0.33) / 0.67, scale: 0.4 + p * 1.2 };
}

// 4.2초 주기: 🗑 탭 → 줄이 빠짐 → 아래에 '실행 취소' 알림 → 실행 취소 탭 → 줄이 돌아옴
export default function SnackbarUndo() {
  const t = useLoop(4200);
  const gone = t < 2300 ? ease(seg(t, 500, 800)) : 1 - ease(seg(t, 2300, 2600));
  const bar = t < 2200 ? ease(seg(t, 750, 1050)) : 1 - ease(seg(t, 2200, 2500));
  const t1 = tap(t, 150);
  const t2 = tap(t, 1750);

  return (
    <div
      style={{
        width: 118,
        height: 168,
        background: "#fff",
        borderRadius: 18,
        border: "3px solid #1B2236",
        position: "relative",
        overflow: "hidden",
        padding: "10px 8px",
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 800, color: "var(--color-ink)", height: 18 }}>메모</div>
      {MEMOS.map((m, i) => {
        const k = i === 1 ? gone : 0;
        return (
          <div
            key={m}
            style={{
              height: ROW * (1 - k),
              marginBottom: GAP * (1 - k),
              opacity: 1 - k,
              overflow: "hidden",
              background: "#F3F5FA",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 6px",
              fontSize: 8,
              fontWeight: 600,
              color: "var(--color-ink)",
              transform: `translateX(${-30 * k}px)`,
            }}
          >
            <span>📝 {m}</span>
            <span style={{ fontSize: 8, color: "#6B7180" }}>🗑</span>
          </div>
        );
      })}
      {/* 첫 탭: 회의 메모의 🗑 */}
      <div
        style={{
          position: "absolute",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "rgba(58,91,239,.35)",
          right: 4,
          top: 10 + 18 + ROW + GAP,
          opacity: t1.opacity,
          transform: `scale(${t1.scale})`,
        }}
      />
      {/* 스낵바 */}
      <div
        style={{
          position: "absolute",
          left: 6,
          right: 6,
          bottom: 8,
          height: 24,
          borderRadius: 6,
          background: "#2A3045",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 7px",
          fontSize: 7.5,
          color: "#fff",
          whiteSpace: "nowrap",
          transform: `translateY(${40 * (1 - bar)}px)`,
        }}
      >
        <span>메모를 삭제했어요</span>
        <span style={{ color: "#8FA8FF", fontWeight: 800 }}>실행 취소</span>
      </div>
      {/* 둘째 탭: 실행 취소 */}
      <div
        style={{
          position: "absolute",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "rgba(143,168,255,.5)",
          right: 12,
          bottom: 10,
          opacity: t2.opacity,
          transform: `scale(${t2.scale})`,
        }}
      />
    </div>
  );
}
