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
      className="flex flex-col gap-4 rounded-md border border-line bg-sheet p-5 md:sticky md:top-6"
    >
      <h2 className="font-display text-xl font-bold">방명록 쓰기</h2>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-muted">
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
          className="rounded border border-line bg-paper px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-muted">
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
          className="resize-y rounded border border-line bg-paper px-3 py-2.5 font-display text-base leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
        <span className="self-end font-mono text-xs text-muted tabular-nums">
          {message.length} / 300
        </span>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded bg-accent px-4 py-2.5 font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "남기는 중…" : "남기기"}
      </button>

      <p
        aria-live="polite"
        className={`min-h-5 text-sm ${state.ok ? "text-muted" : "text-danger"}`}
      >
        {state.message}
      </p>
    </form>
  );
}
