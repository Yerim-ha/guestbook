import type { Metadata } from "next";
import { Gowun_Batang, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// 제목과 방명록 글에 쓰는 붓글씨 느낌의 한글 글꼴
const gowunBatang = Gowun_Batang({
  variable: "--font-gowun-batang",
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: false,
});

// 날짜·번호에 쓰는 글꼴
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "우리의 방명록",
  description: "이름과 한마디를 남기는 방명록",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${gowunBatang.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
