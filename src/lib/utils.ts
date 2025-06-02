
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateQuestionList(wizardState: any) {
  const { selectedCategories, customQuestions, starredQuestions, questionOrder } = wizardState;
  
  // This is a simplified implementation - you may need to adjust based on your actual data structure
  const questions: Array<{ id: string; content: string; category?: string }> = [];
  
  // Add questions from selected categories (this would need to be implemented based on your category data)
  if (selectedCategories && selectedCategories.length > 0) {
    selectedCategories.forEach((category: any) => {
      if (category.questions) {
        category.questions.forEach((question: any) => {
          questions.push({
            id: question.id || `cat-${questions.length}`,
            content: question.content || question.question || question,
            category: category.name || category.title
          });
        });
      }
    });
  }
  
  // Add custom questions
  if (customQuestions && customQuestions.length > 0) {
    customQuestions.forEach((question: string, index: number) => {
      questions.push({
        id: `custom-${index}`,
        content: question,
        category: 'Custom'
      });
    });
  }
  
  // Filter by starred questions if any are specified
  if (starredQuestions && starredQuestions.size > 0) {
    return questions.filter(q => starredQuestions.has(q.id));
  }
  
  // Apply custom order if specified
  if (questionOrder && questionOrder.length > 0) {
    const orderedQuestions: typeof questions = [];
    questionOrder.forEach(questionId => {
      const question = questions.find(q => q.id === questionId);
      if (question) {
        orderedQuestions.push(question);
      }
    });
    // Add any questions not in the order list
    questions.forEach(question => {
      if (!questionOrder.includes(question.id)) {
        orderedQuestions.push(question);
      }
    });
    return orderedQuestions;
  }
  
  return questions;
}
