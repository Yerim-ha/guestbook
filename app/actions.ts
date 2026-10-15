"use server";

// 이 파일의 함수는 방문자의 브라우저가 아니라 "서버"에서 실행돼요.
// 글쓰기 버튼을 누르면 여기로 내용이 전달되고, 여기서 Supabase에 저장해요.

import { refresh } from "next/cache";
import { supabase } from "@/lib/supabase";

export type FormState = {
  ok: boolean;
  message: string;
};

export async function addEntry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // 1) 내용 검사: 비어 있거나 너무 길면 저장하지 않고 이유를 알려 줘요
  if (!name) return { ok: false, message: "이름을 적어 주세요." };
  if (name.length > 20) return { ok: false, message: "이름은 20자까지 쓸 수 있어요." };
  if (!message) return { ok: false, message: "남길 말을 적어 주세요." };
  if (message.length > 300) return { ok: false, message: "남길 말은 300자까지 쓸 수 있어요." };

  // 2) Supabase의 entries 표에 한 줄 추가
  const { error } = await supabase.from("entries").insert({ name, message });
  if (error) {
    console.error("방명록 저장 실패:", error.message);
    return { ok: false, message: "글을 남기지 못했어요. 잠시 후 다시 시도해 주세요." };
  }

  // 3) 화면을 새로 그려서 방금 쓴 글이 목록에 보이게 해요
  refresh();
  return { ok: true, message: "방명록에 남겼어요. 고마워요!" };
}
