"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { DemoContext } from "@/hooks/useLoop";

const PASTELS = ["bg-pastel-blue", "bg-pastel-peach", "bg-pastel-mint", "bg-pastel-lav"];

/** 데모 박스: 파스텔 배경 + LOOP 표시. 화면에 보일 때만 루프를 돌린다 */
export default function DemoBox({
  index,
  label = "LOOP",
  children,
}: {
  index: number;
  label?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex h-[190px] items-center justify-center overflow-hidden rounded-2xl ${PASTELS[index % 4]}`}
    >
      <span className="absolute top-2.5 right-3 text-[10px] font-bold tracking-[.06em] text-[rgba(27,34,54,.35)]">
        {label}
      </span>
      {/* 카드마다 시작 시점을 어긋나게 해서 그리드 전체가 같은 박자로 움직이지 않게 */}
      <DemoContext.Provider value={{ visible, offset: index * 370 }}>{children}</DemoContext.Provider>
    </div>
  );
}
