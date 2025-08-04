import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Users, MessageSquare, Trophy, Share2, Heart } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { ReviewSection } from '@/components/ReviewsReferrals/ReviewSection';
import { ReferralHub } from '@/components/ReviewsReferrals/ReferralHub';
import { FeedbackCenter } from '@/components/ReviewsReferrals/FeedbackCenter';
import { CommunityImpactDashboard } from '@/components/ReviewsReferrals/CommunityImpactDashboard';
import { AchievementsBadges } from '@/components/ReviewsReferrals/AchievementsBadges';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ReviewsReferrals = () => {
  const [activeTab, setActiveTab] = useState('reviews');
  const [userStats, setUserStats] = useState({
    reviewsCount: 0,
    referralsCount: 0,
    surveyCompletions: 0,
    communityImpact: 0
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadUserStats();
    }
  }, [user]);

  const loadUserStats = async () => {
    if (!user) return;

    try {
      // Load user's contribution stats
      const [feedbackResponse, surveyResponse] = await Promise.all([
        supabase
          .from('feedback')
          .select('id')
          .eq('user_id', user.id),
        supabase
          .from('survey_responses')
          .select('id')
          .eq('user_id', user.id)
      ]);

      setUserStats({
        reviewsCount: feedbackResponse.data?.length || 0,
        referralsCount: 0, // Will implement referral tracking
        surveyCompletions: surveyResponse.data?.length || 0,
        communityImpact: (feedbackResponse.data?.length || 0) * 10 + (surveyResponse.data?.length || 0) * 5
      });
    } catch (error) {
      console.error('Error loading user stats:', error);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'reviews_referrals_tab_change', {
        tab: value,
        user_id: user?.id
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-12 px-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-primary fill-primary/20" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Help Columbus Homeowners
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Your experience matters! Share reviews, refer friends, and help us build the ultimate homeowner resource for Columbus.
          </p>

          {/* User Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <Card className="p-4 text-center border-2 hover:border-primary/50 transition-colors">
              <Star className="h-6 w-6 text-amber-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{userStats.reviewsCount}</div>
              <div className="text-sm text-muted-foreground">Reviews</div>
            </Card>
            
            <Card className="p-4 text-center border-2 hover:border-primary/50 transition-colors">
              <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{userStats.referralsCount}</div>
              <div className="text-sm text-muted-foreground">Referrals</div>
            </Card>
            
            <Card className="p-4 text-center border-2 hover:border-primary/50 transition-colors">
              <MessageSquare className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{userStats.surveyCompletions}</div>
              <div className="text-sm text-muted-foreground">Surveys</div>
            </Card>
            
            <Card className="p-4 text-center border-2 hover:border-primary/50 transition-colors">
              <Trophy className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{userStats.communityImpact}</div>
              <div className="text-sm text-muted-foreground">Impact Points</div>
            </Card>
          </div>

          <AchievementsBadges userStats={userStats} />
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Referrals</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Feedback</span>
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Impact</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-6">
            <ReviewSection onReviewSubmitted={loadUserStats} />
          </TabsContent>

          <TabsContent value="referrals" className="space-y-6">
            <ReferralHub onReferralSent={loadUserStats} />
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <FeedbackCenter onFeedbackSubmitted={loadUserStats} />
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <CommunityImpactDashboard userStats={userStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReviewsReferrals;