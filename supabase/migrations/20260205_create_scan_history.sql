-- Create scan history table
create table public.scan_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users on delete cascade,
  disease_name text,
  confidence numeric(4, 2),
  is_healthy boolean default false,
  image_url text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.scan_history enable row level security;

-- Create RLS policies
create policy "Users can view their own scan history"
  on public.scan_history for select
  using (auth.uid() = user_id);

create policy "Users can create their own scans"
  on public.scan_history for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own scans"
  on public.scan_history for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own scans"
  on public.scan_history for delete
  using (auth.uid() = user_id);

-- Create updated_at trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger scan_history_updated_at
  before update on public.scan_history
  for each row
  execute function update_updated_at_column();
