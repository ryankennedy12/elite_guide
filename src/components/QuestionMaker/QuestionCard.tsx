
import React, { useState } from 'react';
import { Star, Edit3, Trash2, GripVertical, RefreshCw, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { WizardQuestionItem } from '@/data/wizard';

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

  const personalizeQuestion = (text: string): string => {
    if (!userConcern.trim()) {
      return text.replace(/\[.*?\]/g, 'the issue');
    }
    return text.replace(/\[.*?\]/g, userConcern.trim());
  };

  return (
    <TooltipProvider>
      <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
        isStarred ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-white hover:border-gray-300'
      } ${className}`}>
        <div className="flex items-start gap-3">
          {/* Action buttons column */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onStar}
                  size="sm"
                  variant="ghost"
                  className={`p-2 h-auto transition-colors ${
                    isStarred 
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Star className="w-4 h-4" fill={isStarred ? 'currentColor' : 'none'} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isStarred ? 'Remove from favorites' : 'Add to favorites'}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  size="sm"
                  variant="ghost"
                  className="p-2 h-auto bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit question</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onRefresh}
                  size="sm"
                  variant="ghost"
                  className="p-2 h-auto bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Get a different question</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onDelete}
                  size="sm"
                  variant="ghost"
                  className="p-2 h-auto bg-gray-100 text-red-600 hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove this question</p>
              </TooltipContent>
            </Tooltip>

            <div className="p-2 rounded bg-gray-100 text-gray-600 cursor-grab hover:bg-gray-200">
              <GripVertical className="w-4 h-4" />
            </div>
          </div>

          {/* Question content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Question</label>
                  <Textarea
                    value={editedQuestion}
                    onChange={(e) => setEditedQuestion(e.target.value)}
                    className="w-full text-base"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-green-700 mb-2 block">Pro Tip</label>
                  <Textarea
                    value={editedProTip}
                    onChange={(e) => setEditedProTip(e.target.value)}
                    className="w-full text-sm"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-red-700 mb-2 block">Red Flag</label>
                  <Textarea
                    value={editedRedFlag}
                    onChange={(e) => setEditedRedFlag(e.target.value)}
                    className="w-full text-sm"
                    rows={2}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveEdit} size="sm" className="bg-black text-white hover:bg-gray-800">
                    Save
                  </Button>
                  <Button onClick={handleCancelEdit} size="sm" variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-gray-800 text-base leading-tight pr-2">
                    {personalizeQuestion(question.question)}
                  </h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="ghost" className="p-1 h-auto flex-shrink-0">
                        <Info className="w-4 h-4 text-gray-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-sm">This question helps you understand the contractor's approach to {question.category.toLowerCase()}.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-r">
                    <span className="font-medium text-green-800">Pro Tip: </span>
                    <span className="text-green-700">{question.proTip}</span>
                  </div>
                  
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r">
                    <span className="font-medium text-red-800">Red Flag: </span>
                    <span className="text-red-700">{question.redFlag}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
