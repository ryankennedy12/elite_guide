import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get user from auth
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const dashboardData = await generateDashboardData(supabaseClient, user.id);

    return new Response(JSON.stringify(dashboardData), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error generating dashboard data:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

async function generateDashboardData(supabase: any, userId: string) {
  console.log(`Generating dashboard data for user ${userId}`);

  // Get all data in parallel
  const [
    projects,
    analytics,
    activities,
    notifications,
    achievements,
    reviews,
    referrals
  ] = await Promise.all([
    getProjects(supabase, userId),
    getAnalytics(supabase, userId),
    getRecentActivities(supabase, userId),
    getUnreadNotifications(supabase, userId),
    getUserAchievements(supabase, userId),
    getUserReviews(supabase, userId),
    getReferrals(supabase, userId)
  ]);

  // Calculate derived metrics
  const stats = calculateStats(projects, analytics, reviews, referrals);
  const insights = generateInsights(projects, activities, achievements);

  return {
    stats,
    projects: {
      active: projects.filter(p => ['planning', 'in_progress'].includes(p.status)),
      recent: projects.slice(0, 5),
      overview: generateProjectOverview(projects)
    },
    activities: activities.slice(0, 10),
    notifications: notifications.slice(0, 5),
    achievements,
    insights,
    financial: calculateFinancialSummary(projects),
    performance: calculatePerformanceMetrics(analytics, projects)
  };
}

async function getProjects(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      milestones (
        id, title, status, due_date, completed_date, 
        payment_amount, is_payment_milestone
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to fetch projects: ${error.message}`);
  return data || [];
}

async function getAnalytics(supabase: any, userId: string) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data, error } = await supabase
    .from('dashboard_analytics')
    .select('*')
    .eq('user_id', userId)
    .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
    .order('date', { ascending: false });

  if (error) throw new Error(`Failed to fetch analytics: ${error.message}`);
  return data || [];
}

async function getRecentActivities(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from('user_activities')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) throw new Error(`Failed to fetch activities: ${error.message}`);
  return data || [];
}

async function getUnreadNotifications(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .eq('read', false)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to fetch notifications: ${error.message}`);
  return data || [];
}

async function getUserAchievements(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from('user_achievements')
    .select(`
      *,
      achievements (name, description, icon, points, badge_color)
    `)
    .eq('user_id', userId)
    .order('earned_at', { ascending: false });

  if (error) throw new Error(`Failed to fetch achievements: ${error.message}`);
  return data || [];
}

async function getUserReviews(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to fetch reviews: ${error.message}`);
  return data || [];
}

async function getReferrals(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from('referrals')
    .select('*')
    .eq('referrer_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to fetch referrals: ${error.message}`);
  return data || [];
}

function calculateStats(projects: any[], analytics: any[], reviews: any[], referrals: any[]) {
  const activeProjects = projects.filter(p => ['planning', 'in_progress'].includes(p.status));
  const completedProjects = projects.filter(p => p.status === 'completed');
  
  const totalInvestment = projects.reduce((sum, p) => sum + (parseFloat(p.total_cost) || 0), 0);
  const totalSpent = projects.reduce((sum, p) => sum + (parseFloat(p.paid_amount) || 0), 0);
  
  const successfulReferrals = referrals.filter(r => r.status === 'completed');
  
  // Find next milestone
  const nextMilestone = findNextMilestone(activeProjects);

  return {
    activeProjects: activeProjects.length,
    totalInvestment: totalInvestment,
    totalSpent: totalSpent,
    completedProjects: completedProjects.length,
    reviewsWritten: reviews.length,
    successfulReferrals: successfulReferrals.length,
    nextMilestone: nextMilestone ? {
      title: nextMilestone.title,
      daysUntil: Math.ceil((new Date(nextMilestone.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    } : null
  };
}

function findNextMilestone(projects: any[]) {
  const upcomingMilestones = projects
    .flatMap(p => p.milestones || [])
    .filter(m => m.status === 'pending' && new Date(m.due_date) > new Date())
    .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
  
  return upcomingMilestones[0] || null;
}

function generateProjectOverview(projects: any[]) {
  return projects.slice(0, 3).map(project => {
    const milestones = project.milestones || [];
    const completedMilestones = milestones.filter(m => m.status === 'completed');
    const progress = milestones.length > 0 ? (completedMilestones.length / milestones.length) * 100 : 0;
    
    const nextMilestone = milestones
      .filter(m => m.status === 'pending')
      .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())[0];

    return {
      id: project.id,
      name: project.name,
      status: project.status,
      progress: Math.round(progress),
      contractor: project.contractor_name || 'TBD',
      budget: parseFloat(project.total_cost) || 0,
      spent: parseFloat(project.paid_amount) || 0,
      nextMilestone: nextMilestone ? {
        title: nextMilestone.title,
        dueDate: nextMilestone.due_date
      } : null
    };
  });
}

function generateInsights(projects: any[], activities: any[], achievements: any[]) {
  const insights = [];

  // Budget insights
  const overBudgetProjects = projects.filter(p => 
    parseFloat(p.paid_amount) > parseFloat(p.total_cost)
  );
  
  if (overBudgetProjects.length > 0) {
    insights.push({
      type: 'warning',
      title: 'Budget Alert',
      message: `${overBudgetProjects.length} project(s) are over budget. Consider reviewing expenses.`
    });
  }

  // Achievement insights
  if (achievements.length >= 3) {
    insights.push({
      type: 'success',
      title: 'Achievement Milestone',
      message: `Great job! You've unlocked ${achievements.length} achievements and earned ${achievements.reduce((sum, a) => sum + (a.achievements?.points || 0), 0)} points.`
    });
  }

  // Activity insights
  const recentActivityCount = activities.filter(a => 
    new Date(a.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  if (recentActivityCount > 10) {
    insights.push({
      type: 'info',
      title: 'High Activity',
      message: `You've been very active this week with ${recentActivityCount} actions. Keep up the momentum!`
    });
  }

  return insights;
}

function calculateFinancialSummary(projects: any[]) {
  const totalBudget = projects.reduce((sum, p) => sum + (parseFloat(p.total_cost) || 0), 0);
  const totalSpent = projects.reduce((sum, p) => sum + (parseFloat(p.paid_amount) || 0), 0);
  const remaining = totalBudget - totalSpent;
  
  // Calculate upcoming payments from milestones
  const upcomingPayments = projects
    .flatMap(p => p.milestones || [])
    .filter(m => m.is_payment_milestone && m.status === 'pending')
    .reduce((sum, m) => sum + (parseFloat(m.payment_amount) || 0), 0);

  return {
    totalBudget,
    totalSpent,
    remaining,
    budgetUsedPercentage: totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0,
    upcomingPayments,
    nextPayment: findNextPayment(projects)
  };
}

function findNextPayment(projects: any[]) {
  const paymentMilestones = projects
    .flatMap(p => p.milestones || [])
    .filter(m => m.is_payment_milestone && m.status === 'pending')
    .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
  
  return paymentMilestones[0] ? {
    amount: parseFloat(paymentMilestones[0].payment_amount),
    dueDate: paymentMilestones[0].due_date,
    description: paymentMilestones[0].title
  } : null;
}

function calculatePerformanceMetrics(analytics: any[], projects: any[]) {
  const completedProjects = projects.filter(p => p.status === 'completed');
  const onTimeCompletions = completedProjects.filter(p => {
    if (!p.end_date || !p.start_date) return false;
    const plannedDuration = new Date(p.end_date).getTime() - new Date(p.start_date).getTime();
    const actualEndDate = new Date(p.updated_at).getTime();
    return actualEndDate <= new Date(p.end_date).getTime();
  });

  return {
    projectCompletionRate: projects.length > 0 ? (completedProjects.length / projects.length) * 100 : 0,
    onTimePerformance: completedProjects.length > 0 ? (onTimeCompletions.length / completedProjects.length) * 100 : 0,
    averageProjectDuration: calculateAverageProjectDuration(completedProjects),
    totalSavings: calculateTotalSavings(analytics)
  };
}

function calculateAverageProjectDuration(projects: any[]) {
  if (projects.length === 0) return 0;
  
  const durations = projects
    .filter(p => p.start_date && p.end_date)
    .map(p => {
      const start = new Date(p.start_date).getTime();
      const end = new Date(p.end_date).getTime();
      return (end - start) / (1000 * 60 * 60 * 24); // days
    });

  return durations.length > 0 ? durations.reduce((sum, d) => sum + d, 0) / durations.length : 0;
}

function calculateTotalSavings(analytics: any[]) {
  const savingsEntries = analytics.filter(a => a.metric_name === 'total_savings');
  return savingsEntries.reduce((sum, entry) => sum + parseFloat(entry.metric_value), 0);
}

serve(handler);