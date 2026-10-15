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

// 브라우저 탭과 링크를 공유할 때(카톡 미리보기 등) 보이는 이름과 설명
const siteTitle = "🐾 하예HAYE | 고양이 발바닥 방명록";
const siteDescription = "이름과 한마디를 남기면 고양이가 발바닥 도장을 꾹 찍어 줘요.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://guestbook-smoky.vercel.app/",
    siteName: siteTitle,
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${ssurround.variable} ${gaegu.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
