// 링크를 공유할 때(카톡 미리보기 등) 보이는 대표 이미지예요.
// 사이트를 만들 때(배포할 때) 한 번 그려서 그림 파일로 저장해 둬요.

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "하예HAYE 고양이 발바닥 방명록";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ssurround = await readFile(join(process.cwd(), "assets/Cafe24Ssurround.ttf"));

const INK = "#4a2f1d";

// 이미지 여기저기 흩어진 발바닥 도장 (색, 위치, 크기, 기울기)
const PAWS = [
  { color: "#f2a541", left: 40, top: 55, size: 105, tilt: -14 },
  { color: "#ef8f86", left: 1065, top: 45, size: 105, tilt: 12 },
  { color: "#6fbf98", left: 22, top: 400, size: 95, tilt: 10 },
  { color: "#434a66", left: 1085, top: 395, size: 90, tilt: -10 },
  { color: "#b39ad6", left: 230, top: 548, size: 62, tilt: -6 },
  { color: "#7fb8e0", left: 905, top: 548, size: 62, tilt: 8 },
  { color: "#e9765b", left: 250, top: 40, size: 60, tilt: 14 },
  { color: "#a3b85c", left: 885, top: 30, size: 60, tilt: -12 },
];

function Paw({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
      <ellipse cx="13" cy="27" rx="6.5" ry="8" transform="rotate(-25 13 27)" />
      <ellipse cx="25" cy="15" rx="7" ry="8.5" transform="rotate(-8 25 15)" />
      <ellipse cx="39" cy="15" rx="7" ry="8.5" transform="rotate(8 39 15)" />
      <ellipse cx="51" cy="27" rx="6.5" ry="8" transform="rotate(25 51 27)" />
      <path d="M32 31c-9 0-17.5 9.5-17.5 17 0 6 4.6 9 9.5 9 3.6 0 5.4-1.6 8-1.6s4.4 1.6 8 1.6c4.9 0 9.5-3 9.5-9 0-7.5-8.5-17-17.5-17z" />
    </svg>
  );
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "#fff3c9",
          fontFamily: "Ssurround",
          color: INK,
        }}
      >
        {PAWS.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.left,
              top: p.top,
              display: "flex",
              opacity: 0.9,
              transform: `rotate(${p.tilt}deg)`,
            }}
          >
            <Paw color={p.color} size={p.size} />
          </div>
        ))}

        {/* 가운데 카드 + 위에 솟은 고양이 귀 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
          <svg width="560" height="70" viewBox="0 0 560 70" style={{ marginBottom: -6 }}>
            <g stroke={INK} strokeWidth="5" strokeLinejoin="round">
              <path d="M40 70 L95 8 Q102 0 110 8 L165 70" fill="#f2a541" />
              <path d="M395 70 L450 8 Q458 0 465 8 L520 70" fill="#f2a541" />
            </g>
            <path d="M75 70 L102 32 L130 70" fill="#f6b6ae" />
            <path d="M430 70 L458 32 L485 70" fill="#f6b6ae" />
          </svg>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 18,
              padding: "48px 72px 52px",
              backgroundColor: "#fffaee",
              border: `6px solid ${INK}`,
              borderRadius: 40,
              boxShadow: `0 12px 0 ${INK}`,
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "6px 26px",
                fontSize: 34,
                backgroundColor: "#8fd3ad",
                border: `4px solid ${INK}`,
                borderRadius: 999,
              }}
            >
              하예HAYE
            </div>
            <div style={{ display: "flex", fontSize: 84 }}>고양이 발바닥 방명록</div>
            <div style={{ display: "flex", fontSize: 38, color: "#8a6a4f" }}>
              다녀간 발자국을 남겨 주세요
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Ssurround", data: ssurround, style: "normal", weight: 400 }],
    },
  );
}
