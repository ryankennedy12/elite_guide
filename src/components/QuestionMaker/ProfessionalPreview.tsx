
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { type WizardState } from './WizardContainer';

interface ProfessionalPreviewProps {
  wizardState: WizardState;
  printMode?: boolean;
}

interface QuestionItem {
  id: string;
  text: string;
  type?: string;
  category?: string;
  priority?: string;
  proTip?: string;
  redFlag?: string;
}

export const ProfessionalPreview: React.FC<ProfessionalPreviewProps> = ({
  wizardState,
  printMode = false
}) => {
  const questions = Array.isArray(wizardState.customQuestions) 
    ? wizardState.customQuestions 
    : [];

  const groupedQuestions = questions.reduce((acc, question, index) => {
    const questionItem = typeof question === 'string' 
      ? { id: `q-${index}`, text: question, category: 'Custom Questions' }
      : question as QuestionItem;
    
    const category = questionItem.category || 'Custom Questions';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({ ...questionItem, index });
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className={`max-w-4xl mx-auto bg-white ${printMode ? 'p-8' : 'p-6 border rounded-lg shadow-sm'}`}>
      {/* Header */}
      <div className="text-center mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Contractor Interview Plan
        </h1>
        <p className="text-lg text-gray-600">
          Elite 12 Home Service Guide
        </p>
        {wizardState.userConcern && (
          <div className="mt-4">
            <Badge variant="outline" className="px-3 py-1 text-sm bg-blue-50 text-blue-700 border-blue-200">
              Main Concern: {wizardState.userConcern}
            </Badge>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">How to Use This Guide</h2>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Ask questions marked "Must Ask" first</li>
          <li>• Use "Maybe" questions if time permits</li>
          <li>• Take notes in the space provided after each question</li>
          <li>• Pay attention to Pro Tips and Red Flags</li>
        </ul>
      </div>

      {/* Questions by Category */}
      {Object.entries(groupedQuestions).map(([category, questions]) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            {category}
          </h3>
          
          <div className="space-y-6">
            {questions.map((question, idx) => (
              <div key={question.id || idx} className="border-l-4 border-gray-200 pl-4">
                <div className="flex items-start gap-3 mb-2">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600 flex-shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium leading-relaxed">
                      {question.text}
                    </p>
                    
                    {/* Priority Badge */}
                    {question.priority && question.priority !== 'remove' && (
                      <Badge 
                        variant="outline" 
                        className={`mt-2 text-xs ${
                          question.priority === 'must-ask'
                            ? 'bg-orange-50 text-orange-700 border-orange-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {question.priority === 'must-ask' ? '⭐ Must Ask' : '○ Maybe'}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Pro Tips and Red Flags */}
                {(question.proTip || question.redFlag) && (
                  <div className="ml-9 space-y-2 mt-3">
                    {question.proTip && (
                      <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-r">
                        <div className="text-xs font-semibold text-green-700 mb-1">💡 PRO TIP</div>
                        <p className="text-sm text-green-700">{question.proTip}</p>
                      </div>
                    )}
                    {question.redFlag && (
                      <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r">
                        <div className="text-xs font-semibold text-red-700 mb-1">🚩 RED FLAG</div>
                        <p className="text-sm text-red-700">{question.redFlag}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Notes Section */}
                <div className="ml-9 mt-3 p-3 bg-gray-50 rounded border-2 border-dashed border-gray-300">
                  <p className="text-xs text-gray-500 mb-2 font-medium">CONTRACTOR'S RESPONSE:</p>
                  <div className="h-16 w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="mt-12 pt-6 border-t text-center text-sm text-gray-500">
        <p>Generated by Elite 12 Home Service Guide</p>
        <p className="mt-1">For more resources, visit our website</p>
      </div>
    </div>
  );
};
