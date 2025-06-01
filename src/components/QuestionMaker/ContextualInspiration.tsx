
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { InspirationCard } from './InspirationCard';

interface ContextualInspirationProps {
  userConcern: string;
  onSelectSuggestion: (suggestion: string) => void;
}

const getContextualSuggestions = (concern: string) => {
  const lowerConcern = concern.toLowerCase();
  
  if (lowerConcern.includes('water') || lowerConcern.includes('flood') || lowerConcern.includes('leak')) {
    return [
      { text: "What's your process for finding the exact source of water entry?", context: "Get specifics on diagnostics" },
      { text: "How do you ensure the repair will prevent future water issues?", context: "Focus on long-term solutions" },
      { text: "What happens if water returns after your repair?", context: "Test their warranty confidence" }
    ];
  }
  
  if (lowerConcern.includes('crack') || lowerConcern.includes('foundation')) {
    return [
      { text: "How do you determine if this crack is structural or cosmetic?", context: "Understand the severity" },
      { text: "What's your approach to monitoring crack progression?", context: "Look for thorough assessment" },
      { text: "Can you explain exactly how your repair method works?", context: "Test their expertise" }
    ];
  }
  
  if (lowerConcern.includes('smell') || lowerConcern.includes('mold') || lowerConcern.includes('humid')) {
    return [
      { text: "Do you test air quality before and after the work?", context: "Ensure health safety" },
      { text: "How do you prevent mold from returning?", context: "Focus on root causes" },
      { text: "What's included in your moisture control solution?", context: "Get complete scope" }
    ];
  }
  
  // Default suggestions for any concern
  return [
    { text: "What's the most common cause of this problem in homes like mine?", context: "Test their experience" },
    { text: "How will you prevent this issue from happening again?", context: "Focus on solutions" },
    { text: "What would you do differently if this were your own home?", context: "Get honest perspective" }
  ];
};

const generalSuggestions = [
  { text: "Can you walk me through your diagnostic process step by step?", context: "Understand their methodology" },
  { text: "What documentation will you provide throughout the project?", context: "Ensure accountability" },
  { text: "How do you handle unexpected complications during the work?", context: "Test problem-solving" },
  { text: "What's included in your quote versus what costs extra?", context: "Avoid surprise costs" }
];

export const ContextualInspiration: React.FC<ContextualInspirationProps> = ({
  userConcern,
  onSelectSuggestion
}) => {
  const [showMore, setShowMore] = useState(false);
  
  const contextualSuggestions = userConcern.trim() ? getContextualSuggestions(userConcern) : [];
  
  return (
    <div className="space-y-6">
      {contextualSuggestions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
              Based on your concern: {userConcern}
            </Badge>
          </div>
          <div className="space-y-3">
            {contextualSuggestions.map((suggestion, index) => (
              <InspirationCard
                key={index}
                suggestion={suggestion.text}
                context={suggestion.context}
                onSelect={onSelectSuggestion}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-800">Essential Questions</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMore(!showMore)}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            {showMore ? 'Show Less' : 'AI Brainstorm'}
          </Button>
        </div>
        
        <div className="space-y-3">
          {generalSuggestions.slice(0, showMore ? generalSuggestions.length : 2).map((suggestion, index) => (
            <InspirationCard
              key={index}
              suggestion={suggestion.text}
              context={suggestion.context}
              onSelect={onSelectSuggestion}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
