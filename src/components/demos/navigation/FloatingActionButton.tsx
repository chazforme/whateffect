"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { ACCENT, INK, LINE, Phone, SUB, Tap, io } from "./parts";

const POSTS = [
  ["김민지", "오늘 산 니트 너무 예뻐요"],
  ["박서준", "동네 맛집 추천해 주세요"],
  ["이하나", "주말에 갈 만한 곳?"],
  ["최도윤", "러닝 3일째 인증해요"],
  ["정유리", "중고 자전거 팔아요"],
];
const ACTIONS = ["글쓰기", "사진 올리기"];

// 4.4초: 글 목록이 위로 흘러가도 오른쪽 아래 동그란 버튼은 제자리 → 탭하면 + 가 X로 돌고 작은 버튼이 튀어나옴
export default function FloatingActionButton() {
  const t = useLoop(4400);
  const scroll = t < 3500 ? io(seg(t, 200, 1300)) : 1 - io(seg(t, 3500, 4200));
  const open = t < 3100 ? ease(seg(t, 1800, 2150)) : 1 - ease(seg(t, 3100, 3400));

  return (
    <Phone>
      <div style={{ position: "absolute", left: 0, right: 0, top: 26, bottom: 0, overflow: "hidden" }}>
        <div style={{ transform: `translateY(${-46 * scroll}px)`, padding: "4px 8px" }}>
          {POSTS.map(([n, s]) => (
            <div key={n} style={{ display: "flex", gap: 5, padding: "5px 0", borderBottom: `1px solid ${LINE}` }}>
              <i style={{ width: 14, height: 14, borderRadius: "50%", background: "#DCE3F6", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 7.5, fontWeight: 800 }}>{n}</div>
                <div style={{ fontSize: 7, color: SUB, whiteSpace: "nowrap" }}>{s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26, background: "#fff", borderBottom: `1px solid ${LINE}`, padding: "0 10px", lineHeight: "26px", fontSize: 10, fontWeight: 800 }}>
        커뮤니티
      </div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,.75)", opacity: open }} />
      {ACTIONS.map((s, i) => {
        const o = t < 3100 ? ease(seg(t, 1900 + i * 80, 2200 + i * 80)) : open;
        return (
          <div
            key={s}
            style={{
              position: "absolute",
              right: 13,
              bottom: 48 + i * 26,
              display: "flex",
              alignItems: "center",
              gap: 4,
              opacity: o,
              transform: `translateY(${(1 - o) * 14}px) scale(${0.6 + 0.4 * o})`,
              transformOrigin: "right center",
            }}
          >
            <span style={{ fontSize: 7.5, fontWeight: 700, background: INK, color: "#fff", borderRadius: 5, padding: "2px 5px" }}>{s}</span>
            <i style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 2px 6px rgba(27,34,54,.25)", display: "flex", alignItems: "center", justifyContent: "center", fontStyle: "normal", fontSize: 9, color: ACCENT, fontWeight: 800 }}>
              {i ? "▣" : "✎"}
            </i>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          right: 10,
          bottom: 12,
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: ACCENT,
          boxShadow: "0 4px 10px rgba(58,91,239,.45)",
          transform: `rotate(${open * 135}deg)`,
        }}
      >
        <i style={{ position: "absolute", left: 8, top: 13, width: 12, height: 2, background: "#fff", borderRadius: 1 }} />
        <i style={{ position: "absolute", left: 13, top: 8, width: 2, height: 12, background: "#fff", borderRadius: 1 }} />
      </div>
      <Tap x={88} y={136} t={t} at={1700} />
      <Tap x={88} y={136} t={t} at={3000} />
    </Phone>
  );
}
