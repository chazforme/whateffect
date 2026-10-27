"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { C, Card, Caret, Cursor, Tap, field, isDown, label, path, typed } from "./parts";

// 4.4초: 칸을 누르면 아래에 작은 도움말이 나타나고 형광펜처럼 강조됨
export default function HelperText() {
  const t = useLoop(4400);
  const focus = t >= 750 && t < 3700;
  const show = t < 3700 ? ease(seg(t, 750, 1050)) : 1 - seg(t, 3700, 4000);
  const mark = ease(seg(t, 1100, 1600));
  const text = typed("민지네집", t, 1700, 200);
  const cur = path(t, [
    [0, 215, 112],
    [300, 215, 112],
    [700, 140, 58],
  ]);
  const co = seg(t, 0, 300) * (1 - seg(t, 1200, 1500));

  return (
    <Card width={250} pad={16}>
      <div style={label}>닉네임</div>
      <div style={field(focus ? C.acc : C.line)}>
        <span>
          <span style={{ opacity: 1 - seg(t, 3700, 4000) }}>{text}</span>
          <Caret t={t} show={focus} />
        </span>
      </div>
      <div
        style={{
          marginTop: 7,
          height: 18,
          display: "flex",
          alignItems: "center",
          gap: 5,
          fontSize: 12,
          fontWeight: 600,
          color: C.sub,
          whiteSpace: "nowrap",
          opacity: show,
          transform: `translateY(${(1 - show) * -5}px)`,
        }}
      >
        <svg width="13" height="13" viewBox="0 0 14 14">
          <circle cx="7" cy="7" r="6" fill="none" stroke={C.sub} strokeWidth="1.4" />
          <rect x="6.3" y="6" width="1.4" height="4.2" rx=".7" fill={C.sub} />
          <circle cx="7" cy="4" r=".9" fill={C.sub} />
        </svg>
        <span
          style={{
            padding: "0 2px",
            backgroundImage: "linear-gradient(rgba(58,91,239,.16), rgba(58,91,239,.16))",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 75%",
            backgroundSize: `${mark * 100}% 55%`,
          }}
        >
          한글 2~10자, 나중에 바꿀 수 있어요
        </span>
      </div>
      <Tap x={140} y={56} t={t} at={750} />
      <Cursor x={cur.x} y={cur.y} o={co} down={isDown(t, [750])} />
    </Card>
  );
}
