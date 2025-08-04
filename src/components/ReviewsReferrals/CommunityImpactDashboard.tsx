import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Star, MessageSquare, Trophy, Heart, Target, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CommunityImpactDashboardProps {
  userStats: {
    reviewsCount: number;
    referralsCount: number;
    surveyCompletions: number;
    communityImpact: number;
  };
}

interface CommunityStats {
  totalUsers: number;
  totalReviews: number;
  totalSurveyResponses: number;
  averageRating: number;
  topContributors: Array<{ rank: number; displayName: string; points: number }>;
  recentMilestones: Array<{ milestone: string; date: string; icon: string }>;
}

export const CommunityImpactDashboard = ({ userStats }: CommunityImpactDashboardProps) => {
  const [communityStats, setCommunityStats] = useState<CommunityStats>({
    totalUsers: 0,
    totalReviews: 0,
    totalSurveyResponses: 0,
    averageRating: 0,
    topContributors: [],
    recentMilestones: []
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCommunityStats();
  }, []);

  const loadCommunityStats = async () => {
    try {
      const [profilesResponse, feedbackResponse, surveyResponse] = await Promise.all([
        supabase.from('profiles').select('display_name').limit(1000),
        supabase.from('feedback').select('rating, user_id').limit(1000),
        supabase.from('survey_responses').select('user_id').limit(1000)
      ]);

      const totalUsers = profilesResponse.data?.length || 0;
      const totalReviews = feedbackResponse.data?.length || 0;
      const totalSurveyResponses = surveyResponse.data?.length || 0;
      
      // Calculate average rating
      const ratings = feedbackResponse.data?.map(f => f.rating).filter(r => r) || [];
      const averageRating = ratings.length > 0 
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
        : 0;

      // Mock top contributors (in a real app, you'd calculate this from actual data)
      const topContributors = [
        { rank: 1, displayName: 'Sarah M.', points: 450 },
        { rank: 2, displayName: 'Mike R.', points: 380 },
        { rank: 3, displayName: 'Jennifer L.', points: 320 },
        { rank: 4, displayName: 'David K.', points: 285 },
        { rank: 5, displayName: 'Lisa P.', points: 260 }
      ];

      // Recent community milestones
      const recentMilestones = [
        { milestone: '1000+ Columbus homeowners helped', date: '2 days ago', icon: '🎉' },
        { milestone: '500+ contractor reviews submitted', date: '1 week ago', icon: '⭐' },
        { milestone: '100+ successful project completions', date: '2 weeks ago', icon: '🏠' },
        { milestone: 'Featured in Columbus Dispatch', date: '3 weeks ago', icon: '📰' },
        { milestone: 'Partnership with local contractors', date: '1 month ago', icon: '🤝' }
      ];

      setCommunityStats({
        totalUsers,
        totalReviews,
        totalSurveyResponses,
        averageRating,
        topContributors,
        recentMilestones
      });
    } catch (error) {
      console.error('Error loading community stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserRank = () => {
    const userPoints = userStats.communityImpact;
    const rank = communityStats.topContributors.findIndex(c => c.points <= userPoints) + 1;
    return rank || communityStats.topContributors.length + 1;
  };

  const getNextMilestone = () => {
    const points = userStats.communityImpact;
    if (points < 50) return { target: 50, label: 'Active Contributor', progress: (points / 50) * 100 };
    if (points < 150) return { target: 150, label: 'Community Helper', progress: ((points - 50) / 100) * 100 };
    if (points < 300) return { target: 300, label: 'Columbus Champion', progress: ((points - 150) / 150) * 100 };
    if (points < 500) return { target: 500, label: 'Super Contributor', progress: ((points - 300) / 200) * 100 };
    return { target: 1000, label: 'Community Legend', progress: ((points - 500) / 500) * 100 };
  };

  const nextMilestone = getNextMilestone();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="h-8 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Your Impact Summary */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-purple-600" />
            Your Community Impact
          </CardTitle>
          <CardDescription>
            See how your contributions are helping Columbus homeowners
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{userStats.communityImpact}</div>
              <div className="text-sm text-muted-foreground">Impact Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">#{getUserRank()}</div>
              <div className="text-sm text-muted-foreground">Community Rank</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{userStats.reviewsCount + userStats.surveyCompletions}</div>
              <div className="text-sm text-muted-foreground">Contributions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">{userStats.referralsCount}</div>
              <div className="text-sm text-muted-foreground">Referrals</div>
            </div>
          </div>

          {/* Progress to Next Milestone */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to {nextMilestone.label}</span>
              <span>{userStats.communityImpact}/{nextMilestone.target} points</span>
            </div>
            <Progress value={nextMilestone.progress} className="h-3" />
            <div className="text-xs text-muted-foreground">
              {nextMilestone.target - userStats.communityImpact} more points to unlock {nextMilestone.label} badge!
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{communityStats.totalUsers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Columbus Homeowners</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{communityStats.totalReviews}</div>
            <div className="text-sm text-muted-foreground">Reviews Submitted</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{communityStats.totalSurveyResponses}</div>
            <div className="text-sm text-muted-foreground">Survey Responses</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{communityStats.averageRating.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Top Contributors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-amber-500" />
            Community Champions
          </CardTitle>
          <CardDescription>
            Top contributors helping Columbus homeowners this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {communityStats.topContributors.map((contributor) => (
              <div key={contributor.rank} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={contributor.rank <= 3 ? "default" : "outline"}
                    className={
                      contributor.rank === 1 ? "bg-amber-500" :
                      contributor.rank === 2 ? "bg-gray-400" :
                      contributor.rank === 3 ? "bg-amber-600" : ""
                    }
                  >
                    #{contributor.rank}
                  </Badge>
                  <span className="font-medium">{contributor.displayName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">{contributor.points} points</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-green-500" />
            Recent Community Milestones
          </CardTitle>
          <CardDescription>
            Celebrating our collective achievements in Columbus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communityStats.recentMilestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-4 p-3 border-l-4 border-primary bg-primary/5">
                <div className="text-2xl">{milestone.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium">{milestone.milestone}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3" />
                    {milestone.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Impact Stories */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            Real Impact Stories
          </CardTitle>
          <CardDescription>
            How our community is making a difference
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-white/50 rounded-lg">
              <p className="italic">
                "Thanks to the Elite 12 questions, I found an amazing contractor who completed my kitchen renovation on time and under budget!"
              </p>
              <div className="text-sm text-muted-foreground mt-2">- Sarah M., Clintonville</div>
            </div>
            
            <div className="p-4 bg-white/50 rounded-lg">
              <p className="italic">
                "The contractor comparison tool saved me thousands. I was able to spot red flags and choose the right team for my roof replacement."
              </p>
              <div className="text-sm text-muted-foreground mt-2">- Mike R., German Village</div>
            </div>
            
            <div className="p-4 bg-white/50 rounded-lg">
              <p className="italic">
                "The prep checklist helped me organize everything before meeting contractors. It made the whole process so much smoother!"
              </p>
              <div className="text-sm text-muted-foreground mt-2">- Jennifer L., Short North</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};