"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { Browser, Cursor, along, inOut, line, pressAt, sub, txt } from "./_kit";

// 4초 주기: 들어오자마자 안내 창이 툭 뜸 → 커서가 '오늘 하루 보지 않기' 체크 → 창이 닫힘
export default function PopupNotice() {
  const t = useLoop(4000);
  const show = inOut(t, 300, 550, 2650, 2850);
  const checked = t > 2350;
  const [x, y] = along(t, [
    [0, 210, 130],
    [1200, 210, 130],
    [2200, 38, 116],
    [3000, 38, 116],
    [3800, 210, 130],
  ]);
  const co = seg(t, 900, 1200) * (1 - seg(t, 3400, 3800));

  return (
    <Browser url="inno-mall.kr">
      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px 0" }}>
        <span style={txt(10, 800)}>INNO 몰</span>
        <span style={txt(8, 600, sub)}>로그인 · 장바구니</span>
      </div>
      <div style={{ height: 52, margin: "8px 12px 0", borderRadius: 8, background: "#DCE3F6" }} />
      <div style={{ display: "flex", gap: 6, margin: "8px 12px 0" }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1, height: 40, borderRadius: 6, background: "#EEF1F7" }} />
        ))}
      </div>
      <div style={{ ...line("50%"), margin: "8px 12px 0" }} />
      <div
        style={{
          position: "absolute",
          left: 20,
          top: 8,
          width: 124,
          background: "#fff",
          border: "1px solid #D5D9E2",
          boxShadow: "0 8px 22px rgba(15,20,35,.22)",
          opacity: show,
          transform: `scale(${0.96 + 0.04 * show})`,
          transformOrigin: "top left",
        }}
      >
        <div style={{ background: "#2E4BD8", padding: "11px 10px 10px", height: 98 }}>
          <div style={txt(7, 700, "rgba(255,255,255,.75)")}>공지</div>
          <div style={{ ...txt(13, 800, "#fff"), marginTop: 3, whiteSpace: "normal" }}>
            추석 연휴
            <br />
            배송 안내
          </div>
          <div style={{ ...txt(7, 500, "rgba(255,255,255,.85)"), marginTop: 6, whiteSpace: "normal" }}>
            10/3~10/9 주문은
            <br />
            10/10부터 순서대로 보내요
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#1B2236",
            padding: "4px 7px",
            ...txt(6.8, 500, "#fff"),
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <i
              style={{
                width: 7,
                height: 7,
                border: "1px solid #fff",
                borderRadius: 1.5,
                background: checked ? "#fff" : "transparent",
                color: "#1B2236",
                fontSize: 6,
                fontStyle: "normal",
                lineHeight: "7px",
                textAlign: "center",
              }}
            >
              {checked ? "✓" : ""}
            </i>
            오늘 하루 보지 않기
          </span>
          <span>닫기 ✕</span>
        </div>
      </div>
      <Cursor x={x} y={y} o={co} press={pressAt(t, 2350)} />
    </Browser>
  );
}
