-- Fix search_path security warnings for functions
DROP FUNCTION IF EXISTS public.log_security_event(text, jsonb);
DROP FUNCTION IF EXISTS public.validate_user_ownership(text, uuid, uuid);

-- Recreate functions with proper search_path
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type text,
  event_data jsonb DEFAULT '{}'::jsonb
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.user_activities (
    user_id,
    action,
    resource_type,
    metadata
  ) VALUES (
    auth.uid(),
    'security_event',
    event_type,
    event_data
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_user_ownership(
  table_name text,
  record_id uuid,
  user_id_to_check uuid DEFAULT auth.uid()
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  is_owner boolean := false;
BEGIN
  CASE table_name
    WHEN 'projects' THEN
      SELECT EXISTS(SELECT 1 FROM public.projects WHERE id = record_id AND user_id = user_id_to_check) INTO is_owner;
    WHEN 'reviews' THEN
      SELECT EXISTS(SELECT 1 FROM public.reviews WHERE id = record_id AND user_id = user_id_to_check) INTO is_owner;
    WHEN 'notes' THEN
      SELECT EXISTS(SELECT 1 FROM public.notes WHERE id = record_id AND user_id = user_id_to_check) INTO is_owner;
    ELSE
      is_owner := false;
  END CASE;
  
  RETURN is_owner;
END;
$$;