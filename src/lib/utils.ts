
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { wizardQuestionBank } from '@/data/wizard'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateQuestionList(wizardState: any) {
  const { selectedCategories, customQuestions, starredQuestions, questionOrder } = wizardState;
  
  const questions: Array<{ id: string; content: string; category?: string }> = [];
  
  // Add starred questions from the question bank
  if (starredQuestions && starredQuestions.size > 0) {
    wizardQuestionBank.forEach((question) => {
      if (starredQuestions.has(question.id)) {
        // Replace placeholders with user concern if present
        let content = question.question;
        if (wizardState.userConcern) {
          content = content.replace(/\[.*?\]/g, wizardState.userConcern);
        }
        
        questions.push({
          id: question.id,
          content: content,
          category: question.category
        });
      }
    });
  }
  
  // Add custom questions from Step 4
  if (customQuestions && customQuestions.length > 0) {
    customQuestions.forEach((question: string, index: number) => {
      questions.push({
        id: `custom-${index}`,
        content: question,
        category: 'Custom'
      });
    });
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
