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

// Input validation functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && email.length <= 254 && emailRegex.test(email);
}

function validateUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return typeof uuid === 'string' && uuidRegex.test(uuid);
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create service role client for system operations
    const supabaseServiceRole = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const body = await req.json();
    
    if (!body || typeof body !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Invalid request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { action, refereeEmail, refereeId, referralId }: ReferralRequest = body;

    // Validate inputs based on action
    if (action === 'send' && (!refereeEmail || !validateEmail(refereeEmail))) {
      return new Response(
        JSON.stringify({ error: 'Valid email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if ((action === 'track_signup' || action === 'track_conversion') && refereeId && !validateUUID(refereeId)) {
      return new Response(
        JSON.stringify({ error: 'Valid user ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'track_conversion' && (!referralId || !validateUUID(referralId))) {
      return new Response(
        JSON.stringify({ error: 'Valid referral ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

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
        result = await sendReferral(supabaseServiceRole, supabaseClient, user.id, refereeEmail!);
        break;
      
      case 'track_signup':
        result = await trackSignup(supabaseServiceRole, refereeId!, refereeEmail!);
        break;
      
      case 'track_conversion':
        result = await trackConversion(supabaseServiceRole, referralId!);
        break;
      
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in referral processor:', error);
    // Don't leak internal error details
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

async function sendReferral(supabaseServiceRole: any, supabaseClient: any, referrerId: string, refereeEmail: string) {
  console.log(`Sending referral from ${referrerId} to ${refereeEmail}`);

  // Check if referral already exists
  const { data: existing } = await supabaseClient
    .from('referrals')
    .select('id')
    .eq('referrer_id', referrerId)
    .eq('referee_email', refereeEmail)
    .eq('status', 'sent')
    .single();

  if (existing) {
    throw new Error('Referral already sent to this email');
  }

  // Create referral record using service role
  const { data: referral, error } = await supabaseServiceRole
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
  const { data: referrer } = await supabaseClient
    .from('profiles')
    .select('display_name, email')
    .eq('user_id', referrerId)
    .single();

  // Track analytics
  await supabaseClient.functions.invoke('analytics-processor', {
    body: {
      action: 'referral_sent',
      resource_type: 'referral',
      resource_id: referral.id,
      metadata: { referee_email: refereeEmail }
    }
  });

  // Create notification for referrer using service role
  await supabaseServiceRole
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

async function trackSignup(supabaseServiceRole: any, refereeId: string, refereeEmail: string) {
  console.log(`Tracking signup for ${refereeEmail} (${refereeId})`);

  // Find pending referral and update using service role
  const { data: referral, error } = await supabaseServiceRole
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

  // Create notifications using service role
  await Promise.all([
    // Notify referrer
    supabaseServiceRole
      .from('notifications')
      .insert({
        user_id: referral.referrer_id,
        type: 'referral',
        title: 'Referral Signed Up!',
        message: `Great news! ${refereeEmail} has signed up. You'll earn $${referral.reward_amount} when they complete their first project.`,
        priority: 'normal',
      }),
    
    // Notify referee
    supabaseServiceRole
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

async function trackConversion(supabaseServiceRole: any, referralId: string) {
  console.log(`Tracking conversion for referral ${referralId}`);

  // Update referral status using service role
  const { data: referral, error } = await supabaseServiceRole
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

  // Create success notifications using service role
  await Promise.all([
    // Notify referrer
    supabaseServiceRole
      .from('notifications')
      .insert({
        user_id: referral.referrer_id,
        type: 'reward',
        title: 'Referral Reward Earned!',
        message: `Congratulations! You've earned $${referral.reward_amount} credit for your successful referral. The credit has been added to your account.`,
        priority: 'high',
      }),
    
    // Notify referee
    supabaseServiceRole
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