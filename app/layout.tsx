import type { Metadata } from "next";
import localFont from "next/font/local";
import { Gaegu } from "next/font/google";
import "./globals.css";

// 제목·이름에 쓰는 통통한 글꼴 (카페24 써라운드, 웹 사용 허용된 무료 폰트)
const ssurround = localFont({
  src: "./fonts/Cafe24Ssurround.woff2",
  variable: "--font-ssurround",
  display: "swap",
});

// 방명록 글과 나머지 글씨에 쓰는 손글씨 글꼴
const gaegu = Gaegu({
  variable: "--font-gaegu",
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "우리의 방명록",
  description: "이름과 한마디를 남기는 고양이 방명록",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${ssurround.variable} ${gaegu.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
