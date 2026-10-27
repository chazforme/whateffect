"use client";

import { useId } from "react";
import { useLoop } from "@/hooks/useLoop";

// 8초에 한 바퀴 도는 동그란 글자 배지
export default function TextOnPath() {
  const t = useLoop(8000);
  const id = useId();
  return (
    <svg width="150" height="150" viewBox="0 0 150 150">
      <defs>
        <path id={id} d="M75,75 m-55,0 a55,55 0 1,1 110,0 a55,55 0 1,1 -110,0" />
      </defs>
      <g transform={`rotate(${(t / 8000) * 360} 75 75)`}>
        <text fontSize="14" fontWeight="800" fill="#1B2236" letterSpacing="2.2">
          <textPath href={`#${id}`}>아래로 내려보세요 • 아래로 내려보세요 •</textPath>
        </text>
      </g>
      <circle cx="75" cy="75" r="26" fill="#3A5BEF" />
      <path d="M75 63 V87 M65 78 L75 88 L85 78" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
