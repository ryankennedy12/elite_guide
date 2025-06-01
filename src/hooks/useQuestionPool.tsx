
import { useState, useCallback, useMemo } from 'react';
import { wizardQuestionBank, WizardQuestionItem, WizardQuestionCategory } from '@/data/wizard';

interface UseQuestionPoolProps {
  selectedCategories: WizardQuestionCategory[];
  userConcern: string;
  starredQuestionIds: Set<string>;
}

export const useQuestionPool = ({
  selectedCategories,
  userConcern,
  starredQuestionIds
}: UseQuestionPoolProps) => {
  const [excludedQuestionIds, setExcludedQuestionIds] = useState<Set<string>>(new Set());

  // Filter questions by selected categories and user concern
  const relevantQuestions = useMemo(() => {
    let filtered = wizardQuestionBank;

    // Filter by categories if any are selected
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(q => selectedCategories.includes(q.category));
    }

    // If user has a specific concern, prioritize questions that might be more relevant
    if (userConcern.trim()) {
      const concernLower = userConcern.toLowerCase();
      const priorityQuestions = filtered.filter(q => 
        q.question.toLowerCase().includes('the issue') ||
        q.question.toLowerCase().includes('[') ||
        q.proTip.toLowerCase().includes(concernLower) ||
        q.redFlag.toLowerCase().includes(concernLower)
      );
      
      // Mix priority questions with others, but favor priority ones
      const otherQuestions = filtered.filter(q => !priorityQuestions.includes(q));
      filtered = [...priorityQuestions, ...otherQuestions];
    }

    return filtered;
  }, [selectedCategories, userConcern]);

  // Get available questions (not starred, not excluded)
  const availableQuestions = useMemo(() => {
    return relevantQuestions.filter(q => 
      !starredQuestionIds.has(q.id) && 
      !excludedQuestionIds.has(q.id)
    );
  }, [relevantQuestions, starredQuestionIds, excludedQuestionIds]);

  // Get a specific number of questions for display
  const getQuestionsForDisplay = useCallback((count: number = 10): WizardQuestionItem[] => {
    return availableQuestions.slice(0, count);
  }, [availableQuestions]);

  // Get a random question from available pool
  const getRandomQuestion = useCallback((): WizardQuestionItem | null => {
    if (availableQuestions.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
  }, [availableQuestions]);

  // Exclude a question from future selection
  const excludeQuestion = useCallback((questionId: string) => {
    setExcludedQuestionIds(prev => new Set([...prev, questionId]));
  }, []);

  // Reset excluded questions
  const resetExcluded = useCallback(() => {
    setExcludedQuestionIds(new Set());
  }, []);

  return {
    availableQuestions,
    getQuestionsForDisplay,
    getRandomQuestion,
    excludeQuestion,
    resetExcluded,
    totalAvailable: availableQuestions.length
  };
};
