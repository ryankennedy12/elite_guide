import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TradeType } from '@/types/trade';
import { WizardQuestionItem, WizardQuestionCategory } from '@/data/wizard/types';

interface UseTradeQuestionsResult {
  questions: WizardQuestionItem[];
  loading: boolean;
  error: string | null;
  getQuestionsByCategory: (category: WizardQuestionCategory) => WizardQuestionItem[];
  categories: WizardQuestionCategory[];
}

export const useTradeQuestions = (trade: TradeType): UseTradeQuestionsResult => {
  const [questions, setQuestions] = useState<WizardQuestionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('trade_questions')
          .select('*')
          .eq('trade', trade)
          .eq('is_active', true)
          .order('category')
          .order('order_index');

        if (fetchError) throw fetchError;

        const formattedQuestions: WizardQuestionItem[] = data?.map((item) => ({
          id: item.id,
          category: item.category as WizardQuestionCategory,
          question: item.question,
          proTip: item.pro_tip,
          redFlag: item.red_flag,
        })) || [];

        setQuestions(formattedQuestions);
      } catch (err) {
        console.error('Error fetching trade questions:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [trade]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(questions.map(q => q.category))];
    return uniqueCategories as WizardQuestionCategory[];
  }, [questions]);

  const getQuestionsByCategory = (category: WizardQuestionCategory): WizardQuestionItem[] => {
    return questions.filter(q => q.category === category);
  };

  return {
    questions,
    loading,
    error,
    getQuestionsByCategory,
    categories,
  };
};