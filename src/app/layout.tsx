import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "효과사전",
  description: "이 효과, AI한테 뭐라고 말해야 하지? 웹 효과 이름을 움직이는 데모로 찾아보세요.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
