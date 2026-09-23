-- ============================================================
-- Gangsheet Builder — security hardening v2.58.0 (23-09-2026)
-- NOG NIET UITGEVOERD. Draai dit in Supabase > SQL Editor.
-- Alles staat in één transactie: faalt er iets, dan verandert er niets.
-- ============================================================
begin;

-- ── 1. KRITIEK: geen zelf-promotie meer naar admin ──────────────
-- Probleem: de policy "Users can update own profile" laat een gebruiker
-- ALLE kolommen van zijn eigen profiel wijzigen, ook role/approved/blocked.
-- Oplossing: een trigger die gevoelige kolommen alleen door admins
-- (of server-side: service_role / SQL editor) laat wijzigen.
create or replace function public.protect_profile_privileged_columns()
returns trigger
language plpgsql
security invoker            -- bewust INVOKER: current_user = de echte aanroeper
set search_path = ''
as $$
begin
  -- Server-side (service_role, postgres, triggers als handle_new_user) mag alles
  if current_user not in ('anon', 'authenticated') then
    return new;
  end if;

  if tg_op = 'INSERT' then
    if not public.is_admin() then
      new.role     := 'user';
      new.approved := false;
      new.blocked  := false;
    end if;
    return new;
  end if;

  -- UPDATE
  if public.is_admin() then
    return new;
  end if;

  if new.role     is distinct from old.role
  or new.approved is distinct from old.approved
  or new.blocked  is distinct from old.blocked
  or new.id       is distinct from old.id
  or new.created_at is distinct from old.created_at
  or (new.email is distinct from old.email
      and new.email is distinct from (auth.jwt() ->> 'email')) then
    raise exception 'Niet toegestaan: alleen een beheerder kan rol of accountstatus wijzigen'
      using errcode = '42501';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_protect_privileged on public.profiles;
create trigger profiles_protect_privileged
  before insert or update on public.profiles
  for each row execute function public.protect_profile_privileged_columns();

-- ── 2. Goedkeuring/blokkade server-side afdwingen ───────────────
-- Nu checkt alleen de browser (auth.js) of iemand is goedgekeurd of
-- geblokkeerd. Via de API kan een niet-goedgekeurde of geblokkeerde
-- gebruiker gewoon projecten opslaan/lezen. Dit maakt het een DB-regel.
create or replace function public.is_active_user()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and approved = true and blocked = false
  );
$$;

drop policy if exists "Users can read own projects"   on public.projects;
drop policy if exists "Users can insert own projects" on public.projects;
drop policy if exists "Users can update own projects" on public.projects;
drop policy if exists "Users can delete own projects" on public.projects;

create policy "Users can read own projects" on public.projects
  for select to authenticated
  using (auth.uid() = user_id and public.is_active_user());
create policy "Users can insert own projects" on public.projects
  for insert to authenticated
  with check (auth.uid() = user_id and public.is_active_user());
create policy "Users can update own projects" on public.projects
  for update to authenticated
  using (auth.uid() = user_id and public.is_active_user())
  with check (auth.uid() = user_id and public.is_active_user());
create policy "Users can delete own projects" on public.projects
  for delete to authenticated
  using (auth.uid() = user_id and public.is_active_user());

-- Profiel-policies alleen voor ingelogde gebruikers (nu: rol "public")
alter policy "Users can read own profile"   on public.profiles to authenticated;
alter policy "Users can update own profile" on public.profiles to authenticated;
alter policy "Users can insert own profile" on public.profiles to authenticated;

-- ── 3. SECURITY DEFINER-functies niet publiek aanroepbaar ───────
-- (Supabase security advisor: 4 waarschuwingen)
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.is_admin()        from public, anon;
grant  execute on function public.is_admin()        to authenticated;   -- nodig voor RLS
revoke execute on function public.is_active_user()  from public, anon;
grant  execute on function public.is_active_user()  to authenticated;   -- nodig voor RLS

-- ── 4. anon hoeft niets met de tabellen (RLS blokkeert al, dit is extra slot)
revoke all on public.profiles, public.projects, public.usage_logs, public.app_settings from anon;
-- TRUNCATE valt buiten RLS; niemand via de API heeft het nodig
revoke truncate, trigger, references on public.profiles, public.projects, public.usage_logs, public.app_settings from authenticated;

-- ── 5. Veldvervalsing en invoer beperken (v2.58) ────────────────
-- usage_logs: alleen bekende acties, kleine metadata, en alleen voor actieve gebruikers
alter table public.usage_logs drop constraint if exists usage_logs_action_check;
alter table public.usage_logs add constraint usage_logs_action_check
  check (action in ('login','signup','save_project','delete_project','export_pdf'));
alter table public.usage_logs drop constraint if exists usage_logs_metadata_size;
alter table public.usage_logs add constraint usage_logs_metadata_size
  check (pg_column_size(metadata) <= 2048);

-- profielvelden: redelijke lengtes (proeflogo is een PNG data-URL, max ~3 MB)
alter table public.profiles drop constraint if exists profiles_len_check;
alter table public.profiles add constraint profiles_len_check check (
      length(coalesce(display_name,'')) <= 200
  and length(coalesce(company_name,'')) <= 200
  and length(coalesce(email,''))        <= 320
  and length(coalesce(theme,''))        <= 20
  and length(coalesce(preferred_format,'')) <= 20
  and length(coalesce(preferred_unit,''))   <= 10
  and length(coalesce(preferred_lang,''))   <= 10
  and length(coalesce(proof_logo,''))   <= 3000000
  and (proof_logo is null or proof_logo like 'data:image/%')
);

-- projecten: naam begrensd, canvas max 20 MB
alter table public.projects drop constraint if exists projects_len_check;
alter table public.projects add constraint projects_len_check check (
      length(coalesce(name,'')) <= 200
  and pg_column_size(canvas_json) <= 20 * 1024 * 1024
);

-- logs alleen van actieve gebruikers (signup-event mag ook vóór goedkeuring)
alter policy "Users can insert own logs" on public.usage_logs
  with check (auth.uid() = user_id and (public.is_active_user() or action = 'signup'));

-- ── 6. Audit-log van admin-acties ───────────────────────────────
-- Wie heeft wie goedgekeurd, geblokkeerd of van rol veranderd? Wordt automatisch
-- gevuld door een trigger; alleen admins kunnen het lezen, niemand kan het wijzigen.
create table if not exists public.admin_audit_log (
  id          bigint generated always as identity primary key,
  at          timestamptz not null default now(),
  actor_id    uuid,
  target_id   uuid,
  action      text not null,
  old_value   jsonb,
  new_value   jsonb
);
alter table public.admin_audit_log enable row level security;
revoke all on public.admin_audit_log from anon, authenticated;
grant select on public.admin_audit_log to authenticated;
drop policy if exists "Admins can read audit log" on public.admin_audit_log;
create policy "Admins can read audit log" on public.admin_audit_log
  for select to authenticated using (public.is_admin());

create or replace function public.audit_profile_changes()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.role is distinct from old.role
  or new.approved is distinct from old.approved
  or new.blocked is distinct from old.blocked then
    insert into public.admin_audit_log (actor_id, target_id, action, old_value, new_value)
    values (auth.uid(), new.id, 'profile_status_change',
            jsonb_build_object('role', old.role, 'approved', old.approved, 'blocked', old.blocked),
            jsonb_build_object('role', new.role, 'approved', new.approved, 'blocked', new.blocked));
  end if;
  return new;
end;
$$;
revoke execute on function public.audit_profile_changes() from public, anon, authenticated;

drop trigger if exists profiles_audit on public.profiles;
create trigger profiles_audit
  after update on public.profiles
  for each row execute function public.audit_profile_changes();

-- ── 7. Thumbnails-bucket privé ───────────────────────────────────
-- Leeg en ongebruikt (0 bestanden, 0 projecten met thumbnail_path), maar stond
-- publiek. Privé maken voorkomt dat er later ongemerkt klantlogo's openbaar komen.
update storage.buckets set public = false where id = 'thumbnails';

commit;

-- ============================================================
-- CONTROLE NA AFLOOP (los uitvoeren)
-- ============================================================
-- a) Trigger staat erop:
--   select tgname from pg_trigger where tgrelid = 'public.profiles'::regclass and not tgisinternal;
-- b) Advisors opnieuw draaien: Dashboard > Advisors > Security (verwacht: alleen nog "leaked password protection")
-- c) Test in de builder met een gewoon account: profiel/thema/proeflogo opslaan moet nog werken.
-- d) Test als admin: goedkeuren, blokkeren, rol wijzigen moet nog werken.
-- f) Audit-log werkt: blokkeer/deblokkeer een testaccount en kijk in
--   select * from public.admin_audit_log order by at desc limit 5;
-- e) Wie is er nu admin? Controleer of dit alleen TPS-mensen zijn:
--   select email, display_name, created_at from public.profiles where role = 'admin';
