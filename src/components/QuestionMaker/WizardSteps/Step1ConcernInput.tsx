
import React, { useState } from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface Step1ConcernInputProps {
  userConcern: string;
  onConcernChange: (concern: string) => void;
  onNext: () => void;
}

const commonScenarios = [
  { label: "Basement Flooding", description: "Water pooling or standing water in basement" },
  { label: "Strange Odors", description: "Musty, moldy, or unusual smells downstairs" },
  { label: "Finished Basement Issues", description: "Problems with completed basement spaces" },
  { label: "Flooded Before", description: "Previous flooding or water damage history" },
  { label: "Visible Cracks", description: "Cracks in walls, floor, or foundation" },
  { label: "Mold/Mildew", description: "Visible mold growth or mildew problems" },
  { label: "Sump Pump Issues", description: "Pump not working or cycling frequently" },
  { label: "High Humidity", description: "Excessive moisture or condensation issues" },
  { label: "Water Stains", description: "Discoloration on walls, floors, or ceiling" },
  { label: "Foundation Shifting", description: "Settlement, shifting, or structural concerns" },
  { label: "Leaky Windows/Wells", description: "Water coming through basement windows" },
  { label: "Remodeling/Finishing", description: "Planning to finish or renovate basement" },
  { label: "Not Sure", description: "General concerns or unsure of specific issue" }
];

const Step1ConcernInput: React.FC<Step1ConcernInputProps> = ({
  userConcern,
  onConcernChange,
  onNext
}) => {
  const [customInput, setCustomInput] = useState(userConcern);

  const handleScenarioSelect = (scenario: string) => {
    onConcernChange(scenario);
    setCustomInput(scenario);
  };

  const handleCustomInputChange = (value: string) => {
    setCustomInput(value);
    onConcernChange(value);
  };

  const canProceed = customInput.trim().length > 0;

  return (
    <TooltipProvider>
      <>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-black mb-4">
            What's Your Main Concern?
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Tell us what's happening so we can suggest the most relevant questions for your contractor interviews.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="max-w-4xl mx-auto">
            {/* Common Scenarios Grid */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Common Scenarios</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {commonScenarios.map((scenario, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleScenarioSelect(scenario.label)}
                        className={`p-3 text-left bg-white border-2 rounded-lg transition-all duration-200 hover:border-blue-300 hover:shadow-md ${
                          customInput === scenario.label 
                            ? 'border-blue-500 bg-blue-50 shadow-md' 
                            : 'border-gray-200'
                        }`}
                      >
                        <span className="text-sm font-medium text-gray-800 block">
                          {scenario.label}
                        </span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">{scenario.description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or describe your specific situation
                </label>
                <textarea
                  value={customInput}
                  onChange={(e) => handleCustomInputChange(e.target.value)}
                  placeholder="Describe what's happening in your basement or what you're concerned about..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Think about specific issues, timelines, or risks unique to your home.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-6 border-t">
            <Button
              onClick={onNext}
              disabled={!canProceed}
              size="lg"
              className="bg-black text-white hover:bg-gray-800 px-8"
            >
              Find Relevant Questions
            </Button>
          </div>
        </CardContent>
      </>
    </TooltipProvider>
  );
};

export default Step1ConcernInput;
