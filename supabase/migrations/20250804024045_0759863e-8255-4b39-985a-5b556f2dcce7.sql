-- Enhanced Review System
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  contractor_id UUID REFERENCES public.contractors(id),
  project_id UUID REFERENCES public.projects(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  pros TEXT[],
  cons TEXT[],
  verified BOOLEAN DEFAULT false,
  verification_date TIMESTAMP WITH TIME ZONE,
  helpful_count INTEGER DEFAULT 0,
  response_from_contractor TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'flagged', 'hidden', 'deleted')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Review Media (photos, videos)
CREATE TABLE public.review_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  caption TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Referral System
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID NOT NULL,
  referee_email TEXT NOT NULL,
  referee_id UUID,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'signed_up', 'completed', 'expired')),
  reward_amount DECIMAL(10,2),
  reward_type TEXT DEFAULT 'credit' CHECK (reward_type IN ('credit', 'cash', 'points')),
  conversion_date TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '30 days'),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User Activities for Analytics
CREATE TABLE public.user_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Notifications System
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  action_url TEXT,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  metadata JSONB DEFAULT '{}'::jsonb,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User Achievements System
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT,
  points INTEGER DEFAULT 0,
  badge_color TEXT DEFAULT '#3B82F6',
  requirements JSONB DEFAULT '{}'::jsonb,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id),
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb,
  UNIQUE(user_id, achievement_id)
);

-- Dashboard Analytics
CREATE TABLE public.dashboard_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  metric_name TEXT NOT NULL,
  metric_value DECIMAL(15,2),
  metadata JSONB DEFAULT '{}'::jsonb,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, metric_name, date)
);

-- Enable RLS on all new tables
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Reviews
CREATE POLICY "Users can view all active reviews" 
ON public.reviews FOR SELECT 
USING (status = 'active');

CREATE POLICY "Users can create their own reviews" 
ON public.reviews FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" 
ON public.reviews FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for Review Media
CREATE POLICY "Users can view review media for active reviews" 
ON public.review_media FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.reviews r 
  WHERE r.id = review_media.review_id AND r.status = 'active'
));

CREATE POLICY "Users can manage media for their reviews" 
ON public.review_media FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.reviews r 
  WHERE r.id = review_media.review_id AND r.user_id = auth.uid()
));

-- RLS Policies for Referrals
CREATE POLICY "Users can view their own referrals" 
ON public.referrals FOR SELECT 
USING (auth.uid() = referrer_id OR auth.uid() = referee_id);

CREATE POLICY "Users can create their own referrals" 
ON public.referrals FOR INSERT 
WITH CHECK (auth.uid() = referrer_id);

CREATE POLICY "Users can update their own referrals" 
ON public.referrals FOR UPDATE 
USING (auth.uid() = referrer_id);

-- RLS Policies for User Activities
CREATE POLICY "Users can view their own activities" 
ON public.user_activities FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can create user activities" 
ON public.user_activities FOR INSERT 
WITH CHECK (true);

-- RLS Policies for Notifications
CREATE POLICY "Users can view their own notifications" 
ON public.notifications FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" 
ON public.notifications FOR INSERT 
WITH CHECK (true);

-- RLS Policies for Achievements
CREATE POLICY "Everyone can view achievements" 
ON public.achievements FOR SELECT 
USING (active = true);

-- RLS Policies for User Achievements
CREATE POLICY "Users can view their own achievements" 
ON public.user_achievements FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can award achievements" 
ON public.user_achievements FOR INSERT 
WITH CHECK (true);

-- RLS Policies for Dashboard Analytics
CREATE POLICY "Users can view their own analytics" 
ON public.dashboard_analytics FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can create analytics" 
ON public.dashboard_analytics FOR INSERT 
WITH CHECK (true);

CREATE POLICY "System can update analytics" 
ON public.dashboard_analytics FOR UPDATE 
USING (true);

-- Triggers for updated_at timestamps
CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_referrals_updated_at
BEFORE UPDATE ON public.referrals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default achievements
INSERT INTO public.achievements (name, description, icon, points, badge_color) VALUES
('First Project', 'Created your first project', '🏠', 100, '#3B82F6'),
('First Review', 'Left your first contractor review', '⭐', 50, '#10B981'),
('Helpful Reviewer', 'Received 10 helpful votes on reviews', '👍', 200, '#8B5CF6'),
('Referral Champion', 'Successfully referred 5 friends', '🤝', 500, '#F59E0B'),
('Project Completer', 'Completed your first project', '🎉', 300, '#EF4444'),
('Budget Master', 'Completed a project under budget', '💰', 250, '#06B6D4'),
('Community Helper', 'Active community member for 6 months', '🌟', 1000, '#EC4899');

-- Indexes for performance
CREATE INDEX idx_reviews_contractor_id ON public.reviews(contractor_id);
CREATE INDEX idx_reviews_project_id ON public.reviews(project_id);
CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX idx_reviews_status ON public.reviews(status);
CREATE INDEX idx_referrals_referrer_id ON public.referrals(referrer_id);
CREATE INDEX idx_referrals_status ON public.referrals(status);
CREATE INDEX idx_user_activities_user_id ON public.user_activities(user_id);
CREATE INDEX idx_user_activities_created_at ON public.user_activities(created_at);
CREATE INDEX idx_notifications_user_id_read ON public.notifications(user_id, read);
CREATE INDEX idx_dashboard_analytics_user_id_date ON public.dashboard_analytics(user_id, date);