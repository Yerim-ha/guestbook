"use client";

// 글쓰기 칸이에요. 글자 수 세기, 버튼 잠그기처럼
// 방문자가 입력하는 동안 바로 반응해야 하는 부분이라 브라우저에서 실행돼요.

import { useActionState, useState } from "react";
import { addEntry, type FormState } from "./actions";

const initialState: FormState = { ok: false, message: "" };

export function GuestbookForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [state, formAction, pending] = useActionState(
    async (prev: FormState, formData: FormData) => {
      const result = await addEntry(prev, formData);
      // 저장에 성공하면 "남길 말" 칸만 비워요 (이름은 다음에도 쓰게 남겨 둬요)
      if (result.ok) setMessage("");
      return result;
    },
    initialState,
  );

  return (
    <form
      action={formAction}
      className="cat-card mt-6 flex flex-col gap-4 p-5"
    >
      {/* 카드 위에 쫑긋 솟은 치즈 고양이 귀 */}
      <svg
        aria-hidden
        viewBox="0 0 300 40"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-6 -top-[34px] h-9"
      >
        <g stroke="#4a2f1d" strokeWidth="2.5" strokeLinejoin="round">
          <path d="M18 39 L42 4 Q46 0 50 5 L78 39" fill="#f2a541" />
          <path d="M34 39 L45 18 L62 39" fill="#f6b6ae" stroke="none" />
          <path d="M222 39 L250 5 Q254 0 258 4 L282 39" fill="#f2a541" />
          <path d="M238 39 L255 18 L266 39" fill="#f6b6ae" stroke="none" />
        </g>
      </svg>

      <h2 className="font-display text-2xl">발자국 남기기</h2>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-base text-muted">
          이름
        </label>
        <input
          id="name"
          name="name"
          maxLength={20}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="예: 지나가던 고양이"
          className="rounded-xl border-2 border-line bg-paper px-3 py-2.5 text-base outline-none focus-visible:border-cheese"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-base text-muted">
          남길 말
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={300}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="반가웠어요! 다음에 또 올게요."
          className="resize-y rounded-xl border-2 border-line bg-paper px-3 py-2.5 text-base outline-none focus-visible:border-cheese"
        />
        <span className="self-end text-sm text-muted tabular-nums">
          {message.length} / 300
        </span>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-full border-2 border-ink bg-cheese px-4 py-2.5 font-display text-lg text-ink shadow-[0_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "꾹 찍는 중…" : "발도장 꾹 남기기"}
      </button>

      <p
        aria-live="polite"
        className={`min-h-6 text-base ${state.ok ? "text-ink" : "text-danger"}`}
      >
        {state.message}
      </p>
    </form>
  );
}
