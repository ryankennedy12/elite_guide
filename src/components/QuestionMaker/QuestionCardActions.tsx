
import React from 'react';
import { Star, Edit3, Trash2, GripVertical, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface QuestionCardActionsProps {
  isStarred: boolean;
  onStar: () => void;
  onEdit: () => void;
  onRefresh: () => void;
  onDelete: () => void;
}

const QuestionCardActions: React.FC<QuestionCardActionsProps> = ({
  isStarred,
  onStar,
  onEdit,
  onRefresh,
  onDelete
}) => {
  return (
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
            onClick={onEdit}
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
  );
};

export default QuestionCardActions;
