-- Scout — Supabase schema for Friends, Activity Feed, and In-App Sharing
-- Run this whole file once in the Supabase SQL Editor (Project → SQL Editor → New query).

-- ═══════════════════════════════════════════
-- PROFILES
-- ═══════════════════════════════════════════
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  name text,
  grade text,
  gpa text,
  major text,
  location text,
  bio text,
  interests jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by authenticated users"
  on public.profiles for select
  using (auth.role() = 'authenticated');

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- ═══════════════════════════════════════════
-- FRIENDSHIPS
-- ═══════════════════════════════════════════
create table public.friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references public.profiles(id) on delete cascade not null,
  addressee_id uuid references public.profiles(id) on delete cascade not null,
  status text not null default 'pending' check (status in ('pending','accepted')),
  created_at timestamptz default now(),
  unique (requester_id, addressee_id)
);

alter table public.friendships enable row level security;

create policy "Users can view their own friendships"
  on public.friendships for select
  using (auth.uid() = requester_id or auth.uid() = addressee_id);

create policy "Users can send friend requests"
  on public.friendships for insert
  with check (auth.uid() = requester_id);

create policy "Addressee can update friendship status"
  on public.friendships for update
  using (auth.uid() = addressee_id);

create policy "Either party can delete a friendship"
  on public.friendships for delete
  using (auth.uid() = requester_id or auth.uid() = addressee_id);

-- ═══════════════════════════════════════════
-- ACTIVITY  (powers the "friends are applying to…" feed)
-- ═══════════════════════════════════════════
create table public.activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  opp_id text not null,
  opp_name text not null,
  opp_org text,
  opp_type text,
  action text not null check (action in ('saved','applied','interview','accepted')),
  created_at timestamptz default now()
);

alter table public.activity enable row level security;

create policy "Users can view their own activity and friends' activity"
  on public.activity for select
  using (
    auth.uid() = user_id
    or exists (
      select 1 from public.friendships f
      where f.status = 'accepted'
        and ((f.requester_id = auth.uid() and f.addressee_id = activity.user_id)
          or (f.addressee_id = auth.uid() and f.requester_id = activity.user_id))
    )
  );

create policy "Users can insert their own activity"
  on public.activity for insert
  with check (auth.uid() = user_id);

-- ═══════════════════════════════════════════
-- SHARES  (in-app "share this opportunity with a friend")
-- ═══════════════════════════════════════════
create table public.shares (
  id uuid primary key default gen_random_uuid(),
  from_user uuid references public.profiles(id) on delete cascade not null,
  to_user uuid references public.profiles(id) on delete cascade not null,
  opp_id text not null,
  opp_name text not null,
  message text,
  created_at timestamptz default now()
);

alter table public.shares enable row level security;

create policy "Users can view shares sent or received"
  on public.shares for select
  using (auth.uid() = from_user or auth.uid() = to_user);

create policy "Users can send shares"
  on public.shares for insert
  with check (auth.uid() = from_user);
