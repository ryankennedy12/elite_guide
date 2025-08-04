import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface Referral {
  id: string;
  referee_email: string;
  status: string;
  reward_amount: number;
  reward_type: string;
  conversion_date?: string;
  expires_at: string;
  created_at: string;
  metadata: any;
}

export const useReferrals = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchReferrals = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      setReferrals(data || []);
    } catch (err: any) {
      console.error('Error fetching referrals:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendReferral = async (email: string) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase.functions.invoke('referral-processor', {
        body: {
          action: 'send',
          refereeEmail: email
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Referral Sent!",
        description: `Your referral invitation has been sent to ${email}. You'll earn $25 credit when they complete their first project!`,
      });

      // Refresh referrals list
      await fetchReferrals();
      return true;
    } catch (err: any) {
      console.error('Error sending referral:', err);
      toast({
        title: "Error",
        description: err.message || "Failed to send referral",
        variant: "destructive",
      });
      return false;
    }
  };

  const getStats = () => {
    const totalSent = referrals.length;
    const completed = referrals.filter(r => r.status === 'completed').length;
    const pending = referrals.filter(r => r.status === 'sent').length;
    const signedUp = referrals.filter(r => r.status === 'signed_up').length;
    const totalEarned = referrals
      .filter(r => r.status === 'completed')
      .reduce((sum, r) => sum + r.reward_amount, 0);

    return {
      totalSent,
      completed,
      pending,
      signedUp,
      totalEarned,
      conversionRate: totalSent > 0 ? (completed / totalSent) * 100 : 0
    };
  };

  useEffect(() => {
    if (user) {
      fetchReferrals();
    }
  }, [user]);

  // Set up real-time subscription for referral updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('referrals-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'referrals',
          filter: `referrer_id=eq.${user.id}`
        },
        () => {
          fetchReferrals();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    referrals,
    loading,
    error,
    sendReferral,
    refresh: fetchReferrals,
    stats: getStats()
  };
};