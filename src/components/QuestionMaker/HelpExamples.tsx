
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface HelpExamplesProps {
  onSelectExample: (example: string) => void;
}

const helpExamples = [
  "How do you handle working around a finished basement?",
  "What if I need to use my basement during the work?",
  "Do you offer financing options for this type of project?",
  "How will you protect my landscaping during installation?",
  "What happens if you find additional problems during the work?"
];

export const HelpExamples: React.FC<HelpExamplesProps> = ({
  onSelectExample
}) => {
  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <h4 className="font-medium text-blue-900 mb-2">Example custom questions:</h4>
        <ul className="space-y-1 text-sm text-blue-800">
          {helpExamples.map((example, index) => (
            <li 
              key={index} 
              className="cursor-pointer hover:text-blue-900 hover:underline"
              onClick={() => onSelectExample(example)}
            >
              • {example}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
