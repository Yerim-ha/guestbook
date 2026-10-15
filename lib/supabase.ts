import { createClient } from "@supabase/supabase-js";

// Supabase 창고에 접속하는 "통역사"를 하나 만들어 두고, 앱 전체에서 같이 써요.
// 주소와 출입증(키)은 .env.local 파일에서 읽어 와요.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

// 방명록 글 한 개의 모양 (3-2에서 만든 표의 칸과 같아요)
export type Entry = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};
