"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, rand, seg } from "@/lib/loop";

const T = 900; // 누르는 시각
const HX = 66; // 하트 중심
const HY = 134;
const COLORS = ["#FF4D6D", "#FFB020", "#3A5BEF", "#2CC28A"];
const HEART = "M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.7 4.5c2.1 0 3.6 1.2 5.3 3.1 1.7-1.9 3.2-3.1 5.3-3.1 3.7 0 5.8 3.8 4.3 7.3C19.5 16.4 12 21 12 21z";

// 3.8초 주기: 하트를 톡 누르면 빨갛게 채워지며 팡! 작은 점들이 사방으로 튐
export default function LikeBurst() {
  const t = useLoop(3800);
  const local = t - T;
  const liked = local >= 0 && t < 3400;
  const s =
    local < 0
      ? 1
      : local < 120
        ? 1 - 0.25 * seg(local, 0, 120)
        : 0.75 + 0.5 * ease(seg(local, 120, 380)) - 0.25 * seg(local, 380, 560);
  const ring = seg(local, 60, 480);
  const fly = ease(seg(local, 120, 620));
  const fingerO = seg(local, -350, -120) * (1 - seg(local, 150, 400));
  const press = seg(local, -120, 0) * (1 - seg(local, 100, 250));

  return (
    <div style={{ position: "relative", width: 280, height: 170 }}>
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 8,
          width: 200,
          height: 154,
          borderRadius: 14,
          background: "#fff",
          boxShadow: "0 3px 10px rgba(27,34,54,.08)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 6,
            top: 6,
            width: 188,
            height: 98,
            borderRadius: 10,
            background: "linear-gradient(135deg,#FFE4BF,#FFC48A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
          }}
        >
          🥞
        </div>
        <div style={{ position: "absolute", left: 50, top: 116, fontSize: 12.5, fontWeight: 700, color: "var(--color-ink)" }}>
          좋아요 {liked ? "1,204" : "1,203"}
        </div>
      </div>
      {/* 퍼지는 고리 */}
      <div
        style={{
          position: "absolute",
          left: HX - 26,
          top: HY - 26,
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: `${4 * (1 - ring) + 0.5}px solid #FF4D6D`,
          boxSizing: "border-box",
          opacity: ring > 0 && ring < 1 ? 1 - ring : 0,
          transform: `scale(${0.3 + 0.7 * ring})`,
        }}
      />
      {/* 튀는 점 */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2 + rand(i + 3) * 0.4;
        const d = 12 + 20 * fly + rand(i + 11) * 6 * fly;
        const size = 6 * (1 - seg(local, 380, 700));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: HX + Math.cos(a) * d - size / 2,
              top: HY + Math.sin(a) * d - size / 2,
              width: size,
              height: size,
              borderRadius: "50%",
              background: COLORS[i % 4],
              opacity: fly > 0 && size > 0 ? 1 : 0,
            }}
          />
        );
      })}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        style={{ position: "absolute", left: HX - 14, top: HY - 14, transform: `scale(${s})` }}
      >
        <path
          d={HEART}
          fill={liked ? "#FF4D6D" : "none"}
          stroke={liked ? "#FF4D6D" : "#1B2236"}
          strokeWidth="2"
          strokeLinejoin="round"
          opacity={t > 3400 ? seg(t, 3500, 3800) : 1}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: HX - 13,
          top: HY - 13,
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "rgba(27,34,54,.22)",
          border: "2px solid rgba(255,255,255,.9)",
          boxSizing: "border-box",
          opacity: fingerO,
          transform: `scale(${1 + 0.3 * press})`,
        }}
      />
    </div>
  );
}
