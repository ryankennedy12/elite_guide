-- CRITICAL SECURITY FIXES: Phase 1 - RLS Policy Hardening

-- Fix dangerous system table policies - Replace overly permissive policies with service role only
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;
DROP POLICY IF EXISTS "System can create user activities" ON public.user_activities;
DROP POLICY IF EXISTS "System can create analytics" ON public.dashboard_analytics;
DROP POLICY IF EXISTS "System can update analytics" ON public.dashboard_analytics;
DROP POLICY IF EXISTS "System can award achievements" ON public.user_achievements;

-- Create secure service role only policies for system operations
CREATE POLICY "Service role can manage notifications"
ON public.notifications
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role can manage user activities"
ON public.user_activities
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role can manage analytics"
ON public.dashboard_analytics
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role can manage user achievements"
ON public.user_achievements
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Add missing RLS policies for reviews table
CREATE POLICY "Users can delete their own reviews"
ON public.reviews
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Fix referrals policies - users shouldn't update referee_id
DROP POLICY IF EXISTS "Users can update their own referrals" ON public.referrals;
CREATE POLICY "Users can update their own referral details"
ON public.referrals
FOR UPDATE
TO authenticated
USING (auth.uid() = referrer_id)
WITH CHECK (auth.uid() = referrer_id AND referee_id IS NOT DISTINCT FROM referee_id);

-- Add service role policy for referral processing
CREATE POLICY "Service role can update referral status"
ON public.referrals
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Ensure feedback table has proper RLS
CREATE POLICY "Users can view their own feedback"
ON public.feedback
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Add audit logging function for sensitive operations
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type text,
  event_data jsonb DEFAULT '{}'::jsonb
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Create function to validate user ownership for edge functions
CREATE OR REPLACE FUNCTION public.validate_user_ownership(
  table_name text,
  record_id uuid,
  user_id_to_check uuid DEFAULT auth.uid()
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
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