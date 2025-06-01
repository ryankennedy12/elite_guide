
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GripVertical, 
  Star, 
  Edit3, 
  Trash2, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface QuestionPlanCardProps {
  question: {
    id: string;
    text: string;
    type: 'starred' | 'custom';
    category?: string;
    isStarred?: boolean;
    proTip?: string;
    redFlag?: string;
  };
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStar: () => void;
  isDragging?: boolean;
}

export const QuestionPlanCard: React.FC<QuestionPlanCardProps> = ({
  question,
  index,
  onEdit,
  onDelete,
  onToggleStar,
  isDragging = false
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <TooltipProvider>
      <Card className={`transition-all duration-200 ${
        isDragging ? 'shadow-lg scale-105 rotate-1' : 'shadow-sm hover:shadow-md'
      } ${question.isStarred ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-white'}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {/* Drag Handle */}
            <div className="cursor-grab hover:cursor-grabbing p-2 rounded hover:bg-gray-100 transition-colors">
              <GripVertical className="w-5 h-5 text-gray-400" />
            </div>
            
            {/* Question Number */}
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-sm font-semibold text-gray-600">{index + 1}</span>
            </div>
            
            {/* Question Content */}
            <div className="flex-1 min-w-0">
              <p className="text-gray-800 leading-relaxed font-medium mb-2">{question.text}</p>
              
              {/* Tags */}
              <div className="flex items-center gap-2 mb-3">
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    question.type === 'starred' 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : 'bg-green-50 text-green-700 border-green-200'
                  }`}
                >
                  {question.type === 'starred' ? 'Pre-built' : 'Custom'}
                </Badge>
                
                {question.category && (
                  <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                    {question.category}
                  </Badge>
                )}
                
                {question.isStarred && (
                  <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                    Must-ask
                  </Badge>
                )}
              </div>
              
              {/* Pro Tips / Red Flags Toggle */}
              {(question.proTip || question.redFlag) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto mb-2"
                >
                  {showDetails ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
                  View tips & notes
                </Button>
              )}
              
              {/* Collapsible Details */}
              {showDetails && (question.proTip || question.redFlag) && (
                <div className="space-y-2 mt-3 p-3 bg-gray-50 rounded-lg border">
                  {question.proTip && (
                    <div>
                      <div className="text-xs font-semibold text-green-700 mb-1">💡 PRO TIP</div>
                      <p className="text-sm text-gray-700">{question.proTip}</p>
                    </div>
                  )}
                  {question.redFlag && (
                    <div>
                      <div className="text-xs font-semibold text-red-700 mb-1">🚩 RED FLAG</div>
                      <p className="text-sm text-gray-700">{question.redFlag}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-1 flex-shrink-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onToggleStar}
                    size="sm"
                    variant="ghost"
                    className={`p-2 h-8 w-8 ${
                      question.isStarred 
                        ? 'text-orange-600 hover:bg-orange-50' 
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <Star className="w-4 h-4" fill={question.isStarred ? 'currentColor' : 'none'} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{question.isStarred ? 'Remove from must-ask' : 'Mark as must-ask'}</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onEdit}
                    size="sm"
                    variant="ghost"
                    className="p-2 h-8 w-8 text-gray-400 hover:bg-gray-100"
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
                    onClick={onDelete}
                    size="sm"
                    variant="ghost"
                    className="p-2 h-8 w-8 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove question</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
