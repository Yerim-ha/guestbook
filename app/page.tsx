// 첫 화면(localhost:3000)이에요. 제목 + 글쓰기 칸 + 글 목록을 배치해요.

import { Suspense } from "react";
import { GuestbookForm } from "./guestbook-form";
import { EntryList } from "./entry-list";
import { LiveUpdates } from "./live-updates";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-10 md:py-14">
      <LiveUpdates />
      <header className="flex flex-col gap-2">
        <span className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
          Guestbook · 방명록
        </span>
        <h1 className="font-display text-3xl font-bold text-balance md:text-5xl">
          다녀간 흔적을 남겨 주세요
        </h1>
        <p className="max-w-prose text-muted">
          이름과 한마디를 적어 주세요. 남긴 글은 이 사이트에 오는 모두에게 보여요.
        </p>
      </header>

      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <GuestbookForm />

        <section aria-labelledby="list-title" className="flex min-w-0 flex-col gap-3">
          <h2
            id="list-title"
            className="border-b border-line pb-2.5 font-display text-xl font-bold"
          >
            남겨진 글
          </h2>
          {/* 글을 불러오는 동안에는 안내 문구를 먼저 보여 줘요 */}
          <Suspense fallback={<p className="py-8 text-center text-muted">글을 불러오는 중이에요…</p>}>
            <EntryList />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
