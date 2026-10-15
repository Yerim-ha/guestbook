-- 방명록 테이블: 글 하나가 한 줄(row)로 저장돼요
create table public.entries (
  id bigint generated always as identity primary key,
  name text not null check (char_length(trim(name)) between 1 and 20),
  message text not null check (char_length(trim(message)) between 1 and 300),
  created_at timestamptz not null default now()
);

-- 보안 규칙(RLS) 켜기: 켜는 순간 "허락한 것만" 할 수 있게 돼요
alter table public.entries enable row level security;

-- 누구나 글을 읽을 수 있어요
create policy "누구나 읽기"
  on public.entries for select
  to anon, authenticated
  using (true);

-- 누구나 글을 쓸 수 있어요 (수정·삭제 규칙은 없으므로 방문자는 못 해요)
create policy "누구나 쓰기"
  on public.entries for insert
  to anon, authenticated
  with check (true);

-- 웹사이트(anon 키)가 이 테이블을 읽고 쓸 수 있도록 허용
grant select, insert on table public.entries to anon, authenticated;

-- 실시간 갱신: 새 글이 생기면 열려 있는 화면에 바로 알려 줘요
alter publication supabase_realtime add table public.entries;
