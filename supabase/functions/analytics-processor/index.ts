import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalyticsRequest {
  action: string;
  resource_type?: string;
  resource_id?: string;
  metadata?: Record<string, any>;
}

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

    const { action, resource_type, resource_id, metadata }: AnalyticsRequest = await req.json();

    // Get user from auth
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Track user activity
    const { error: activityError } = await supabaseClient
      .from('user_activities')
      .insert({
        user_id: user.id,
        action,
        resource_type,
        resource_id,
        metadata: metadata || {},
        ip_address: clientIP,
        user_agent: userAgent,
      });

    if (activityError) {
      console.error('Error tracking activity:', activityError);
    }

    // Process analytics based on action type
    await processAnalytics(supabaseClient, user.id, action, metadata || {});

    // Check for achievement triggers
    await checkAchievements(supabaseClient, user.id, action, resource_type);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in analytics processor:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

async function processAnalytics(supabase: any, userId: string, action: string, metadata: Record<string, any>) {
  const today = new Date().toISOString().split('T')[0];

  try {
    switch (action) {
      case 'project_created':
        await updateDashboardMetric(supabase, userId, 'total_projects', 1, today);
        await updateDashboardMetric(supabase, userId, 'active_projects', 1, today);
        break;
      
      case 'project_completed':
        await updateDashboardMetric(supabase, userId, 'completed_projects', 1, today);
        await updateDashboardMetric(supabase, userId, 'active_projects', -1, today);
        break;
      
      case 'review_created':
        await updateDashboardMetric(supabase, userId, 'total_reviews', 1, today);
        break;
      
      case 'referral_sent':
        await updateDashboardMetric(supabase, userId, 'referrals_sent', 1, today);
        break;
      
      case 'page_view':
        await updateDashboardMetric(supabase, userId, 'page_views', 1, today);
        break;

      case 'budget_saved':
        const savings = metadata.amount || 0;
        await updateDashboardMetric(supabase, userId, 'total_savings', savings, today);
        break;
    }
  } catch (error) {
    console.error('Error processing analytics:', error);
  }
}

async function updateDashboardMetric(supabase: any, userId: string, metricName: string, value: number, date: string) {
  const { data: existing } = await supabase
    .from('dashboard_analytics')
    .select('metric_value')
    .eq('user_id', userId)
    .eq('metric_name', metricName)
    .eq('date', date)
    .single();

  if (existing) {
    await supabase
      .from('dashboard_analytics')
      .update({ 
        metric_value: parseFloat(existing.metric_value) + value,
        created_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('metric_name', metricName)
      .eq('date', date);
  } else {
    await supabase
      .from('dashboard_analytics')
      .insert({
        user_id: userId,
        metric_name: metricName,
        metric_value: value,
        date,
      });
  }
}

async function checkAchievements(supabase: any, userId: string, action: string, resourceType?: string) {
  try {
    switch (action) {
      case 'project_created':
        await checkAndAwardAchievement(supabase, userId, 'First Project');
        break;
      
      case 'review_created':
        await checkAndAwardAchievement(supabase, userId, 'First Review');
        break;
      
      case 'project_completed':
        await checkAndAwardAchievement(supabase, userId, 'Project Completer');
        break;
      
      case 'referral_sent':
        const referralCount = await getMetricValue(supabase, userId, 'referrals_sent');
        if (referralCount >= 5) {
          await checkAndAwardAchievement(supabase, userId, 'Referral Champion');
        }
        break;
    }
  } catch (error) {
    console.error('Error checking achievements:', error);
  }
}

async function checkAndAwardAchievement(supabase: any, userId: string, achievementName: string) {
  // Check if user already has this achievement
  const { data: existing } = await supabase
    .from('user_achievements')
    .select('id')
    .eq('user_id', userId)
    .eq('achievement_id', supabase
      .from('achievements')
      .select('id')
      .eq('name', achievementName)
      .single()
    );

  if (!existing) {
    // Get achievement
    const { data: achievement } = await supabase
      .from('achievements')
      .select('id, name, points')
      .eq('name', achievementName)
      .single();

    if (achievement) {
      // Award achievement
      await supabase
        .from('user_achievements')
        .insert({
          user_id: userId,
          achievement_id: achievement.id,
        });

      // Create notification
      await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          type: 'achievement',
          title: 'Achievement Unlocked!',
          message: `Congratulations! You've earned the "${achievement.name}" achievement and ${achievement.points} points!`,
          priority: 'normal',
        });
    }
  }
}

async function getMetricValue(supabase: any, userId: string, metricName: string): Promise<number> {
  const { data } = await supabase
    .from('dashboard_analytics')
    .select('metric_value')
    .eq('user_id', userId)
    .eq('metric_name', metricName)
    .order('date', { ascending: false })
    .limit(1)
    .single();

  return data ? parseFloat(data.metric_value) : 0;
}

serve(handler);