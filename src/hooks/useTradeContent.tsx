import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TradeType } from '@/types/trade';

interface TradeContent {
  content_key: string;
  content_value: string;
  metadata?: any;
}

interface UseTradeContentResult {
  content: Record<string, string>;
  loading: boolean;
  error: string | null;
  getContent: (key: string, fallback?: string) => string;
}

export const useTradeContent = (
  trade: TradeType,
  contentType: string
): UseTradeContentResult => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('trade_content')
          .select('content_key, content_value, metadata')
          .eq('trade', trade)
          .eq('content_type', contentType)
          .eq('is_active', true)
          .order('content_key');

        if (fetchError) throw fetchError;

        const contentMap: Record<string, string> = {};
        data?.forEach((item: TradeContent) => {
          contentMap[item.content_key] = item.content_value;
        });

        setContent(contentMap);
      } catch (err) {
        console.error('Error fetching trade content:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [trade, contentType]);

  const getContent = (key: string, fallback = '') => {
    return content[key] || fallback;
  };

  return {
    content,
    loading,
    error,
    getContent,
  };
};