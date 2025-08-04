import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface DashboardStats {
  activeProjects: number;
  totalInvestment: number;
  totalSpent: number;
  completedProjects: number;
  reviewsWritten: number;
  successfulReferrals: number;
  nextMilestone: {
    title: string;
    daysUntil: number;
  } | null;
}

interface ProjectOverview {
  id: string;
  name: string;
  status: string;
  progress: number;
  contractor: string;
  budget: number;
  spent: number;
  nextMilestone: {
    title: string;
    dueDate: string;
  } | null;
}

interface Activity {
  id: string;
  action: string;
  resource_type?: string;
  created_at: string;
  metadata: any;
}

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  created_at: string;
  priority: string;
}

interface Achievement {
  id: string;
  earned_at: string;
  achievements: {
    name: string;
    description: string;
    icon: string;
    points: number;
    badge_color: string;
  };
}

interface FinancialSummary {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  budgetUsedPercentage: number;
  upcomingPayments: number;
  nextPayment: {
    amount: number;
    dueDate: string;
    description: string;
  } | null;
}

interface DashboardData {
  stats: DashboardStats;
  projects: {
    active: any[];
    recent: any[];
    overview: ProjectOverview[];
  };
  activities: Activity[];
  notifications: Notification[];
  achievements: Achievement[];
  insights: Array<{
    type: 'info' | 'warning' | 'success';
    title: string;
    message: string;
  }>;
  financial: FinancialSummary;
  performance: {
    projectCompletionRate: number;
    onTimePerformance: number;
    averageProjectDuration: number;
    totalSavings: number;
  };
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data: dashboardData, error: fetchError } = await supabase.functions.invoke('dashboard-data');

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      setData(dashboardData);
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const trackActivity = async (action: string, resourceType?: string, resourceId?: string, metadata?: any) => {
    if (!user) return;

    try {
      await supabase.functions.invoke('analytics-processor', {
        body: {
          action,
          resource_type: resourceType,
          resource_id: resourceId,
          metadata: metadata || {}
        }
      });
    } catch (error) {
      console.error('Error tracking activity:', error);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      // Refresh data to update unread notifications
      await fetchDashboardData();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    const channels: any[] = [];

    // Subscribe to notifications
    const notificationsChannel = supabase
      .channel('dashboard-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchDashboardData();
        }
      )
      .subscribe();

    channels.push(notificationsChannel);

    // Subscribe to project changes
    const projectsChannel = supabase
      .channel('dashboard-projects')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchDashboardData();
        }
      )
      .subscribe();

    channels.push(projectsChannel);

    // Subscribe to user achievements
    const achievementsChannel = supabase
      .channel('dashboard-achievements')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_achievements',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchDashboardData();
        }
      )
      .subscribe();

    channels.push(achievementsChannel);

    return () => {
      channels.forEach(channel => {
        supabase.removeChannel(channel);
      });
    };
  }, [user]);

  return {
    data,
    loading,
    error,
    refresh: fetchDashboardData,
    trackActivity,
    markNotificationAsRead
  };
};