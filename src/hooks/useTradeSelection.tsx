import { useState, useEffect } from 'react';
import { TradeType, tradeDefinitions } from '@/types/trade';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useTradeSelection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTrade, setSelectedTrade] = useState<TradeType>('waterproofing');
  const [interestedTrades, setInterestedTrades] = useState<TradeType[]>(['waterproofing']);
  const [loading, setLoading] = useState(true);

  // Load user's trade preferences
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadTradePreferences = async () => {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('primary_trade, interested_trades')
          .eq('user_id', user.id)
          .single();

        if (profile) {
          setSelectedTrade(profile.primary_trade || 'waterproofing');
          setInterestedTrades(profile.interested_trades || ['waterproofing']);
        }
      } catch (error) {
        console.error('Error loading trade preferences:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTradePreferences();
  }, [user]);

  // Update user's primary trade
  const updatePrimaryTrade = async (trade: TradeType) => {
    if (!user) {
      setSelectedTrade(trade);
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ primary_trade: trade })
        .eq('user_id', user.id);

      if (error) throw error;

      setSelectedTrade(trade);
      
      // Add to interested trades if not already there
      if (!interestedTrades.includes(trade)) {
        await updateInterestedTrades([...interestedTrades, trade]);
      }

      toast({
        title: "Trade Updated",
        description: `Primary trade set to ${tradeDefinitions[trade].name}`,
      });
    } catch (error) {
      console.error('Error updating primary trade:', error);
      toast({
        title: "Error",
        description: "Failed to update trade preference",
        variant: "destructive",
      });
    }
  };

  // Update user's interested trades
  const updateInterestedTrades = async (trades: TradeType[]) => {
    if (!user) {
      setInterestedTrades(trades);
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ interested_trades: trades })
        .eq('user_id', user.id);

      if (error) throw error;

      setInterestedTrades(trades);
    } catch (error) {
      console.error('Error updating interested trades:', error);
      toast({
        title: "Error",
        description: "Failed to update interested trades",
        variant: "destructive",
      });
    }
  };

  return {
    selectedTrade,
    interestedTrades,
    loading,
    updatePrimaryTrade,
    updateInterestedTrades,
  };
};