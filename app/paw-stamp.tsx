// 발바닥 도장이에요. 글마다 털색과 기울기가 섞여서 정해져서
// 매번 다른 고양이가 다녀간 것처럼 보여요.

// 고양이 털색 12가지
const COATS = [
  { color: "#f2a541", name: "치즈" },
  { color: "#8a8378", name: "고등어" },
  { color: "#ef8f86", name: "젤리 분홍" },
  { color: "#5b4636", name: "까망" },
  { color: "#d9a55b", name: "크림" },
  { color: "#6fbf98", name: "민트" },
  { color: "#8e9bb4", name: "러시안블루" },
  { color: "#434a66", name: "턱시도" },
  { color: "#e9765b", name: "노을" },
  { color: "#b39ad6", name: "라벤더" },
  { color: "#7fb8e0", name: "하늘" },
  { color: "#a3b85c", name: "말차" },
];

// 같은 숫자를 넣으면 항상 같은 "섞인 숫자"(0~1)가 나오는 계산기.
// 진짜 랜덤이 아니라서 새로고침해도, 누가 봐도 도장 색이 그대로예요.
function seeded(seed: number) {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// 글 12개를 한 묶음으로 보고, 묶음마다 12색을 카드 섞듯 섞어요.
// 그래서 한 묶음 안에서는 색이 겹치지 않고, 순서 규칙도 안 보여요.
function shuffledCoats(block: number) {
  const order = COATS.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(seeded(block * 100 + i) * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function coatFor(id: number) {
  const block = Math.floor((id - 1) / COATS.length);
  const order = shuffledCoats(block);
  // 묶음이 바뀌는 곳에서 바로 앞 글과 같은 색이 나오면 순서를 살짝 바꿔요
  if (block > 0 && order[0] === shuffledCoats(block - 1)[COATS.length - 1]) {
    [order[0], order[1]] = [order[1], order[0]];
  }
  return COATS[order[(id - 1) % COATS.length]];
}

// 기울기도 글마다 섞어서 -14도 ~ +14도 사이로 정해요
function tiltFor(id: number) {
  return Math.round(seeded(id * 7 + 3) * 28 - 14);
}

export function PawStamp({ id }: { id: number }) {
  const coat = coatFor(id);
  const tilt = tiltFor(id);

  return (
    <div className="flex w-16 shrink-0 flex-col items-center gap-0.5" aria-hidden>
      <svg
        viewBox="0 0 64 64"
        className="paw-stamp size-14 opacity-90 mix-blend-multiply"
        style={{ transform: `rotate(${tilt}deg)`, ["--tilt" as string]: `${tilt}deg` }}
        fill={coat.color}
      >
        {/* 발가락 젤리 네 개 */}
        <ellipse cx="13" cy="27" rx="6.5" ry="8" transform="rotate(-25 13 27)" />
        <ellipse cx="25" cy="15" rx="7" ry="8.5" transform="rotate(-8 25 15)" />
        <ellipse cx="39" cy="15" rx="7" ry="8.5" transform="rotate(8 39 15)" />
        <ellipse cx="51" cy="27" rx="6.5" ry="8" transform="rotate(25 51 27)" />
        {/* 큰 젤리 */}
        <path d="M32 31c-9 0-17.5 9.5-17.5 17 0 6 4.6 9 9.5 9 3.6 0 5.4-1.6 8-1.6s4.4 1.6 8 1.6c4.9 0 9.5-3 9.5-9 0-7.5-8.5-17-17.5-17z" />
      </svg>
      <span className="text-sm text-muted tabular-nums">
        No.{String(id).padStart(3, "0")}
      </span>
    </div>
  );
}
