import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ReferralRequest {
  action: 'send' | 'track_signup' | 'track_conversion';
  refereeEmail?: string;
  refereeId?: string;
  referralId?: string;
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

    const { action, refereeEmail, refereeId, referralId }: ReferralRequest = await req.json();

    // Get user from auth
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let result;

    switch (action) {
      case 'send':
        result = await sendReferral(supabaseClient, user.id, refereeEmail!);
        break;
      
      case 'track_signup':
        result = await trackSignup(supabaseClient, refereeId!, refereeEmail!);
        break;
      
      case 'track_conversion':
        result = await trackConversion(supabaseClient, referralId!);
        break;
      
      default:
        throw new Error('Invalid action');
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in referral processor:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

async function sendReferral(supabase: any, referrerId: string, refereeEmail: string) {
  console.log(`Sending referral from ${referrerId} to ${refereeEmail}`);

  // Check if referral already exists
  const { data: existing } = await supabase
    .from('referrals')
    .select('id')
    .eq('referrer_id', referrerId)
    .eq('referee_email', refereeEmail)
    .eq('status', 'sent')
    .single();

  if (existing) {
    throw new Error('Referral already sent to this email');
  }

  // Create referral record
  const { data: referral, error } = await supabase
    .from('referrals')
    .insert({
      referrer_id: referrerId,
      referee_email: refereeEmail,
      status: 'sent',
      reward_amount: 25.00, // $25 credit for successful referral
      reward_type: 'credit',
      metadata: {
        invite_code: generateInviteCode(),
        sent_at: new Date().toISOString(),
      }
    })
    .select('id, metadata')
    .single();

  if (error) {
    throw new Error(`Failed to create referral: ${error.message}`);
  }

  // Get referrer info for personalized email
  const { data: referrer } = await supabase
    .from('profiles')
    .select('display_name, email')
    .eq('user_id', referrerId)
    .single();

  // Track analytics
  await supabase.functions.invoke('analytics-processor', {
    body: {
      action: 'referral_sent',
      resource_type: 'referral',
      resource_id: referral.id,
      metadata: { referee_email: refereeEmail }
    }
  });

  // Create notification for referrer
  await supabase
    .from('notifications')
    .insert({
      user_id: referrerId,
      type: 'referral',
      title: 'Referral Sent!',
      message: `Your referral invitation has been sent to ${refereeEmail}. You'll earn $25 credit when they complete their first project!`,
      priority: 'normal',
    });

  return {
    success: true,
    referralId: referral.id,
    inviteCode: referral.metadata.invite_code,
    message: 'Referral sent successfully'
  };
}

async function trackSignup(supabase: any, refereeId: string, refereeEmail: string) {
  console.log(`Tracking signup for ${refereeEmail} (${refereeId})`);

  // Find pending referral
  const { data: referral, error } = await supabase
    .from('referrals')
    .update({
      referee_id: refereeId,
      status: 'signed_up',
      conversion_date: new Date().toISOString(),
    })
    .eq('referee_email', refereeEmail)
    .eq('status', 'sent')
    .select('id, referrer_id, reward_amount')
    .single();

  if (error || !referral) {
    console.log('No pending referral found for this email');
    return { success: false, message: 'No pending referral found' };
  }

  // Create notifications
  await Promise.all([
    // Notify referrer
    supabase
      .from('notifications')
      .insert({
        user_id: referral.referrer_id,
        type: 'referral',
        title: 'Referral Signed Up!',
        message: `Great news! ${refereeEmail} has signed up. You'll earn $${referral.reward_amount} when they complete their first project.`,
        priority: 'normal',
      }),
    
    // Notify referee
    supabase
      .from('notifications')
      .insert({
        user_id: refereeId,
        type: 'welcome',
        title: 'Welcome to the Community!',
        message: 'Thanks for joining through a referral! Complete your first project to help your friend earn a reward.',
        priority: 'normal',
      })
  ]);

  return {
    success: true,
    referralId: referral.id,
    message: 'Signup tracked successfully'
  };
}

async function trackConversion(supabase: any, referralId: string) {
  console.log(`Tracking conversion for referral ${referralId}`);

  // Update referral status
  const { data: referral, error } = await supabase
    .from('referrals')
    .update({
      status: 'completed',
      conversion_date: new Date().toISOString(),
    })
    .eq('id', referralId)
    .eq('status', 'signed_up')
    .select('referrer_id, referee_id, reward_amount, reward_type')
    .single();

  if (error || !referral) {
    throw new Error('Referral not found or already completed');
  }

  // Award achievement to referrer
  await supabase.functions.invoke('analytics-processor', {
    body: {
      action: 'referral_completed',
      resource_type: 'referral',
      resource_id: referralId,
      metadata: { reward_amount: referral.reward_amount }
    }
  });

  // Create success notifications
  await Promise.all([
    // Notify referrer
    supabase
      .from('notifications')
      .insert({
        user_id: referral.referrer_id,
        type: 'reward',
        title: 'Referral Reward Earned!',
        message: `Congratulations! You've earned $${referral.reward_amount} credit for your successful referral. The credit has been added to your account.`,
        priority: 'high',
      }),
    
    // Notify referee
    supabase
      .from('notifications')
      .insert({
        user_id: referral.referee_id,
        type: 'celebration',
        title: 'Project Completed!',
        message: 'Congratulations on completing your first project! Your friend has earned a referral reward thanks to you.',
        priority: 'normal',
      })
  ]);

  return {
    success: true,
    rewardAmount: referral.reward_amount,
    message: 'Conversion tracked and reward awarded'
  };
}

function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

serve(handler);