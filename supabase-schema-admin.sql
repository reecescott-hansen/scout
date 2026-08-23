-- Scout — admin dashboard access, locked to reecemsh@gmail.com only.
-- Run this in the Supabase SQL Editor (after the original supabase-schema.sql).

-- Lets your account read every row in `activity` (not just your own +
-- friends'), so the admin panel can show real usage numbers.
create policy "Admin email can view all activity"
  on public.activity for select
  using (auth.email() = 'reecemsh@gmail.com');

-- Same for `friendships`, so the admin panel can show a total friendship count.
create policy "Admin email can view all friendships"
  on public.friendships for select
  using (auth.email() = 'reecemsh@gmail.com');
