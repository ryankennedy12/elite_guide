
import React, { useState } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { WizardQuestionItem } from '@/data/wizard';
import QuestionCardActions from './QuestionCardActions';
import QuestionCardEditor from './QuestionCardEditor';
import QuestionCardContent from './QuestionCardContent';

interface QuestionCardProps {
  question: WizardQuestionItem;
  isStarred: boolean;
  userConcern: string;
  onStar: () => void;
  onEdit: (updates: Partial<WizardQuestionItem>) => void;
  onDelete: () => void;
  onRefresh: () => void;
  className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isStarred,
  userConcern,
  onStar,
  onEdit,
  onDelete,
  onRefresh,
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question.question);
  const [editedProTip, setEditedProTip] = useState(question.proTip);
  const [editedRedFlag, setEditedRedFlag] = useState(question.redFlag);

  const handleSaveEdit = () => {
    onEdit({
      question: editedQuestion,
      proTip: editedProTip,
      redFlag: editedRedFlag
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedQuestion(question.question);
    setEditedProTip(question.proTip);
    setEditedRedFlag(question.redFlag);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <TooltipProvider>
      <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
        isStarred ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-white hover:border-gray-300'
      } ${className}`}>
        <div className="flex items-start gap-3">
          {/* Action buttons column */}
          <QuestionCardActions
            isStarred={isStarred}
            onStar={onStar}
            onEdit={handleEdit}
            onRefresh={onRefresh}
            onDelete={onDelete}
          />

          {/* Question content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <QuestionCardEditor
                editedQuestion={editedQuestion}
                editedProTip={editedProTip}
                editedRedFlag={editedRedFlag}
                onQuestionChange={setEditedQuestion}
                onProTipChange={setEditedProTip}
                onRedFlagChange={setEditedRedFlag}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
              />
            ) : (
              <QuestionCardContent
                question={question}
                userConcern={userConcern}
              />
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
