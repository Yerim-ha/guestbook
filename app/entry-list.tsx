// 남겨진 글 목록이에요. 서버에서 Supabase의 글을 읽어 와서 화면으로 만들어요.

import { connection } from "next/server";
import { supabase, type Entry } from "@/lib/supabase";
import { PawStamp } from "./paw-stamp";

// 서버가 해외(Vercel)에 있어도 한국 시간으로 보여 줘요
const dateFormat = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export async function EntryList() {
  // 페이지를 열 때마다 최신 글을 새로 읽어 오라는 표시예요
  await connection();

  const { data, error } = await supabase
    .from("entries")
    .select("id, name, message, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return <Notice title="방명록을 불러오지 못했어요" text="페이지를 새로 고쳐 주세요." />;
  }

  const entries = (data ?? []) as Entry[];

  if (entries.length === 0) {
    return <Notice title="아직 아무 고양이도 다녀가지 않았어요" text="첫 번째 발자국을 남겨 주세요." />;
  }

  return (
    <ol className="flex flex-col">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="entry flex gap-4 border-b-2 border-dashed border-line py-5 last:border-b-0"
        >
          {/* 발바닥 도장: 몇 번째로 다녀간 고양이인지 보여 줘요 */}
          <PawStamp id={entry.id} />

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="text-base font-bold">{entry.name}</span>
              <time dateTime={entry.created_at} className="text-sm text-muted tabular-nums">
                {dateFormat.format(new Date(entry.created_at))}
              </time>
            </div>
            <p className="text-base whitespace-pre-wrap">
              {entry.message}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Notice({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-line px-5 py-10 text-center text-muted">
      <strong className="mb-1 block font-display text-lg font-normal text-ink">{title}</strong>
      {text}
    </div>
  );
}
