// 첫 화면이에요. 제목 + 글쓰기 칸 + 글 목록을 배치해요.

import { Suspense } from "react";
import { GuestbookForm } from "./guestbook-form";
import { EntryList } from "./entry-list";
import { LiveUpdates } from "./live-updates";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-10 md:py-14">
      <LiveUpdates />
      <header className="flex flex-col gap-2">
        <span className="w-fit rounded-full border-2 border-ink bg-mint px-3 py-0.5 font-display text-sm">
          고양이 방명록
        </span>
        <h1 className="font-display text-4xl text-balance md:text-5xl">
          다녀간 발자국을 남겨 주세요
        </h1>
        <p className="max-w-prose text-base text-muted">
          이름과 한마디를 적어 주세요. 글마다 다른 고양이가 발바닥 도장을 꾹 찍어 줘요.
        </p>
      </header>

      <div className="grid items-start gap-12 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <GuestbookForm />

        <section aria-labelledby="list-title" className="cat-card flex min-w-0 flex-col gap-1 p-5 md:mt-6">
          <h2 id="list-title" className="font-display text-2xl">
            남겨진 발자국
          </h2>
          {/* 글을 불러오는 동안에는 안내 문구를 먼저 보여 줘요 */}
          <Suspense fallback={<p className="py-8 text-center text-muted">발자국을 불러오는 중이에요…</p>}>
            <EntryList />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
