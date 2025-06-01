
import React from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface SmartSuggestionsProps {
  suggestions: string[];
  onUseSuggestion: (suggestion: string) => void;
}

export const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({
  suggestions,
  onUseSuggestion
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">Smart suggestions:</Label>
      <div className="space-y-1">
        {suggestions.map((suggestion, index) => (
          <Card key={index} className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-3" onClick={() => onUseSuggestion(suggestion)}>
              <p className="text-sm text-gray-700">{suggestion}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
