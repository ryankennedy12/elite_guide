
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface InteractiveCheckboxProps {
  id: string;
  text: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  priority?: boolean;
  tooltip?: string;
}

export const InteractiveCheckbox: React.FC<InteractiveCheckboxProps> = ({
  id,
  text,
  checked,
  onChange,
  priority = false,
  tooltip
}) => {
  return (
    <TooltipProvider>
      <div className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 ${
        priority ? 'border-l-4 border-yellow-500 bg-yellow-50/50' : ''
      }`}>
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onChange}
          className="mt-1 h-5 w-5 data-[state=checked]:bg-black data-[state=checked]:border-black"
        />
        
        <div className="flex-1 flex items-start gap-2">
          <label 
            htmlFor={id} 
            className={`text-sm leading-relaxed cursor-pointer transition-colors ${
              checked ? 'text-gray-500 line-through' : 'text-gray-700'
            }`}
          >
            {text}
          </label>
          
          {tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help flex-shrink-0 mt-0.5" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        
        {priority && (
          <div className="flex-shrink-0">
            <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-medium">
              Critical
            </span>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};
