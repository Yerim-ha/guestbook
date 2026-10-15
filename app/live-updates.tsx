"use client";

// 실시간 갱신 담당이에요. 화면에는 아무것도 그리지 않고,
// Supabase의 "새 글 알림" 채널을 듣고 있다가 새 글이 오면 목록을 다시 불러와요.

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function LiveUpdates() {
  const router = useRouter();

  useEffect(() => {
    // entries 표에 새 줄(INSERT)이 생기면 알려 달라고 등록해요
    const channel = supabase
      .channel("entries-live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "entries" },
        () => router.refresh(), // 새 글 도착! 목록을 새로 그려요
      )
      .subscribe();

    // 페이지를 떠나면 채널을 끊어요
    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  return null;
}
