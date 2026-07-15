-- Voeg email kolom toe aan profiles tabel
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email text;

-- Vul bestaande profielen met email uit auth.users
UPDATE profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id
  AND p.email IS NULL;

-- Update de DB-trigger zodat email automatisch wordt overgenomen bij nieuwe registraties
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, company_name, email, approved)
  VALUES (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', ''),
    coalesce(new.raw_user_meta_data->>'company_name', ''),
    new.email,
    false
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email;
  RETURN new;
END;
$$;
