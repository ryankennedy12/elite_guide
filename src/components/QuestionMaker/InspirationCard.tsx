
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface InspirationCardProps {
  suggestion: string;
  context?: string;
  onSelect: (suggestion: string) => void;
}

export const InspirationCard: React.FC<InspirationCardProps> = ({
  suggestion,
  context,
  onSelect
}) => {
  return (
    <Card className="cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 border-gray-200 bg-white shadow-sm">
      <CardContent className="p-4" onClick={() => onSelect(suggestion)}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-800 leading-relaxed font-medium">{suggestion}</p>
            {context && (
              <p className="text-xs text-blue-600 mt-2 font-medium">💡 {context}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
