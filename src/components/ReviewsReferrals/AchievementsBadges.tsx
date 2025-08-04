import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Star, Users, MessageSquare, Target, Crown, Heart, Zap } from 'lucide-react';

interface AchievementsBadgesProps {
  userStats: {
    reviewsCount: number;
    referralsCount: number;
    surveyCompletions: number;
    communityImpact: number;
  };
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  requirement: number;
  points: number;
  type: 'reviews' | 'referrals' | 'surveys' | 'impact';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const AchievementsBadges = ({ userStats }: AchievementsBadgesProps) => {
  const achievements: Achievement[] = [
    // Review Achievements
    {
      id: 'first_review',
      title: 'First Review',
      description: 'Submit your first review',
      icon: Star,
      requirement: 1,
      points: 10,
      type: 'reviews',
      rarity: 'common'
    },
    {
      id: 'reviewer',
      title: 'Active Reviewer',
      description: 'Submit 5 reviews',
      icon: Star,
      requirement: 5,
      points: 50,
      type: 'reviews',
      rarity: 'rare'
    },
    {
      id: 'super_reviewer',
      title: 'Super Reviewer',
      description: 'Submit 15 reviews',
      icon: Trophy,
      requirement: 15,
      points: 150,
      type: 'reviews',
      rarity: 'epic'
    },

    // Referral Achievements
    {
      id: 'first_referral',
      title: 'Community Builder',
      description: 'Make your first referral',
      icon: Users,
      requirement: 1,
      points: 15,
      type: 'referrals',
      rarity: 'common'
    },
    {
      id: 'referral_champion',
      title: 'Referral Champion',
      description: 'Successfully refer 5 people',
      icon: Crown,
      requirement: 5,
      points: 100,
      type: 'referrals',
      rarity: 'epic'
    },

    // Survey Achievements
    {
      id: 'first_survey',
      title: 'Voice Heard',
      description: 'Complete your first survey',
      icon: MessageSquare,
      requirement: 1,
      points: 5,
      type: 'surveys',
      rarity: 'common'
    },
    {
      id: 'survey_enthusiast',
      title: 'Survey Enthusiast',
      description: 'Complete 10 surveys',
      icon: Target,
      requirement: 10,
      points: 75,
      type: 'surveys',
      rarity: 'rare'
    },

    // Impact Achievements
    {
      id: 'helper',
      title: 'Community Helper',
      description: 'Reach 50 impact points',
      icon: Heart,
      requirement: 50,
      points: 0,
      type: 'impact',
      rarity: 'common'
    },
    {
      id: 'champion',
      title: 'Columbus Champion',
      description: 'Reach 150 impact points',
      icon: Zap,
      requirement: 150,
      points: 0,
      type: 'impact',
      rarity: 'rare'
    },
    {
      id: 'legend',
      title: 'Community Legend',
      description: 'Reach 300 impact points',
      icon: Crown,
      requirement: 300,
      points: 0,
      type: 'impact',
      rarity: 'legendary'
    }
  ];

  const isAchievementUnlocked = (achievement: Achievement): boolean => {
    switch (achievement.type) {
      case 'reviews':
        return userStats.reviewsCount >= achievement.requirement;
      case 'referrals':
        return userStats.referralsCount >= achievement.requirement;
      case 'surveys':
        return userStats.surveyCompletions >= achievement.requirement;
      case 'impact':
        return userStats.communityImpact >= achievement.requirement;
      default:
        return false;
    }
  };

  const getProgress = (achievement: Achievement): number => {
    let current: number;
    switch (achievement.type) {
      case 'reviews':
        current = userStats.reviewsCount;
        break;
      case 'referrals':
        current = userStats.referralsCount;
        break;
      case 'surveys':
        current = userStats.surveyCompletions;
        break;
      case 'impact':
        current = userStats.communityImpact;
        break;
      default:
        current = 0;
    }
    return Math.min((current / achievement.requirement) * 100, 100);
  };

  const getRarityColor = (rarity: Achievement['rarity']): string => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary':
        return 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRarityBadgeColor = (rarity: Achievement['rarity']): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (rarity) {
      case 'common':
        return 'outline';
      case 'rare':
        return 'secondary';
      case 'epic':
        return 'default';
      case 'legendary':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const unlockedAchievements = achievements.filter(isAchievementUnlocked);
  const nextAchievements = achievements
    .filter(a => !isAchievementUnlocked(a))
    .sort((a, b) => getProgress(b) - getProgress(a))
    .slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            🏆 Your Achievements ({unlockedAchievements.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {unlockedAchievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <Card
                  key={achievement.id}
                  className={`p-3 border-2 ${getRarityColor(achievement.rarity)} transition-all hover:scale-105`}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5" />
                      <div>
                        <div className="font-medium text-sm">{achievement.title}</div>
                        <div className="text-xs opacity-75">{achievement.description}</div>
                      </div>
                      <Badge 
                        variant={getRarityBadgeColor(achievement.rarity)}
                        className="text-xs ml-auto"
                      >
                        {achievement.rarity}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Next Achievements */}
      {nextAchievements.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            🎯 Almost There (Next Achievements)
          </h3>
          <div className="space-y-2">
            {nextAchievements.map((achievement) => {
              const IconComponent = achievement.icon;
              const progress = getProgress(achievement);
              let current: number;
              switch (achievement.type) {
                case 'reviews':
                  current = userStats.reviewsCount;
                  break;
                case 'referrals':
                  current = userStats.referralsCount;
                  break;
                case 'surveys':
                  current = userStats.surveyCompletions;
                  break;
                case 'impact':
                  current = userStats.communityImpact;
                  break;
                default:
                  current = 0;
              }

              return (
                <Card key={achievement.id} className="p-3 border opacity-60 hover:opacity-80 transition-opacity">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{achievement.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {current}/{achievement.requirement}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mb-1">{achievement.description}</div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div
                            className="bg-primary h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {achievement.rarity}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Achievement Summary */}
      <div className="text-center pt-2">
        <div className="text-sm text-muted-foreground">
          {unlockedAchievements.length} of {achievements.length} achievements unlocked
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-1">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
            style={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};