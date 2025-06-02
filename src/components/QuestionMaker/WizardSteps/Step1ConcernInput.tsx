
import React from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface Step1ConcernInputProps {
  userConcern: string;
  onConcernChange: (concern: string) => void;
  onNext: () => void;
}

const expandedScenarios = [
  { name: "Basement Flooding", tooltip: "Standing water or recurring flood issues" },
  { name: "Strange Odors", tooltip: "Musty, sewage, or unusual smells in basement" },
  { name: "Finished Basement", tooltip: "Living space conversion or renovation plans" },
  { name: "Flooded Before", tooltip: "Previous water damage or flooding history" },
  { name: "Visible Cracks", tooltip: "Foundation or wall cracks you can see" },
  { name: "Mold/Mildew", tooltip: "Visible growth or suspected mold issues" },
  { name: "Sump Pump Issues", tooltip: "Pump failures, noise, or maintenance needs" },
  { name: "High Humidity", tooltip: "Excessive moisture or condensation problems" },
  { name: "Water Stains", tooltip: "Discoloration on walls, floors, or ceiling" },
  { name: "Foundation Shifting", tooltip: "Settlement, movement, or structural concerns" },
  { name: "Leaky Windows/Wells", tooltip: "Water coming through window wells or frames" },
  { name: "Not Sure", tooltip: "General concerns or multiple issues" }
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
    <TooltipProvider>
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
              placeholder="e.g. basement flooding, strange odors, visible cracks, sump pump problems"
              className="mt-2 text-base p-4 h-auto"
            />
            <p className="text-sm text-gray-500 mt-2">
              Don't worry if you're not sure—just describe what you're seeing, smelling, or experiencing.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Label className="text-base font-medium mb-3 block">
              Or pick from these common scenarios
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {expandedScenarios.map((scenario) => (
                <Tooltip key={scenario.name}>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => handleSuggestionClick(scenario.name)}
                      variant="outline"
                      className="h-auto py-4 px-4 text-sm text-left whitespace-normal hover:bg-blue-50 hover:border-blue-500 transition-all duration-200"
                    >
                      {scenario.name}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{scenario.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
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
    </TooltipProvider>
  );
};

export default Step1ConcernInput;
