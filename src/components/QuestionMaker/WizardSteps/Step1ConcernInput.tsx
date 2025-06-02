
import React from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface Step1ConcernInputProps {
  userConcern: string;
  onConcernChange: (concern: string) => void;
  onNext: () => void;
}

const scenarioOptions = [
  "Basement flooding",
  "Strange odors", 
  "Finished basement",
  "Flooded before",
  "Cracks in walls",
  "Musty crawl space", 
  "Sump-pump failure",
  "High radon",
  "Efflorescence",
  "Bowing walls",
  "Humidity issues",
  "Standing water"
];

const Step1ConcernInput: React.FC<Step1ConcernInputProps> = ({
  userConcern,
  onConcernChange,
  onNext
}) => {
  const handleSuggestionClick = (suggestion: string) => {
    onConcernChange(suggestion.toLowerCase());
  };

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl font-bold text-black mb-4">
          What's your main concern for this project?
        </CardTitle>
        <p className="text-gray-600 text-lg">
          Tell us what's happening so we can customize the right questions for your contractor interviews.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="max-w-2xl mx-auto">
          <Label htmlFor="concern" className="text-base font-medium">
            Describe your specific concern
          </Label>
          <Input
            id="concern"
            value={userConcern}
            onChange={(e) => onConcernChange(e.target.value)}
            placeholder="e.g. mold, water around foundation, musty smell, iron ochre, chronic pump failure, kids' health"
            className="mt-2 text-base p-4 h-auto"
          />
          <p className="text-sm text-gray-500 mt-2">
            Don't worry if you're not sure—just describe what you're seeing, smelling, or experiencing.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Label className="text-base font-medium mb-3 block">
            Or pick from these common scenarios
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {scenarioOptions.map((scenario) => (
              <Button
                key={scenario}
                onClick={() => handleSuggestionClick(scenario)}
                variant="outline"
                className="h-auto py-3 px-4 text-sm text-center whitespace-normal hover:bg-blue-50 hover:border-blue-500 transition-colors"
              >
                {scenario}
              </Button>
            ))}
          </div>
        </div>

        <div className="text-center pt-6">
          <Button
            onClick={onNext}
            size="lg"
            className="bg-black text-white hover:bg-gray-800 px-8"
          >
            Continue to Topic Selection
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            You can always come back and change this
          </p>
        </div>
      </CardContent>
    </>
  );
};

export default Step1ConcernInput;
