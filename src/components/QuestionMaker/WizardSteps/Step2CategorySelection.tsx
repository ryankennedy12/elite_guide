import React from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  FileText, 
  AlertTriangle, 
  Shield, 
  Clock, 
  Heart, 
  DollarSign, 
  CheckSquare, 
  Users, 
  Zap 
} from 'lucide-react';
import { wizardQuestionCategories, categoryDescriptions, type WizardQuestionCategory } from '@/data/wizard';

interface Step2CategorySelectionProps {
  selectedCategories: WizardQuestionCategory[];
  onCategoryToggle: (categories: WizardQuestionCategory[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const categoryIcons: Record<WizardQuestionCategory, React.ReactNode> = {
  'Diagnostic / Investigation': <Search className="w-5 h-5" />,
  'System Selection': <FileText className="w-5 h-5" />,
  'Risk / Failure / Proof': <AlertTriangle className="w-5 h-5" />,
  'Warranty / Contract': <Shield className="w-5 h-5" />,
  'Timeline / Project Management': <Clock className="w-5 h-5" />,
  'Health / Safety / Air Quality': <Heart className="w-5 h-5" />,
  'Cost & Value': <DollarSign className="w-5 h-5" />,
  'Compliance / Code': <CheckSquare className="w-5 h-5" />,
  'Customer Experience': <Users className="w-5 h-5" />,
  'Emergency / Backup': <Zap className="w-5 h-5" />
};

const Step2CategorySelection: React.FC<Step2CategorySelectionProps> = ({
  selectedCategories,
  onCategoryToggle,
  onNext,
  onBack
}) => {
  const handleCategoryClick = (category: WizardQuestionCategory) => {
    const newSelection = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    onCategoryToggle(newSelection);
  };

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl font-bold text-black mb-4">
          What do you want to focus on with your contractor?
        </CardTitle>
        <p className="text-gray-600 text-lg">
          Select the topics that matter most to you. We'll show you the best questions for each area.
        </p>
        {selectedCategories.length > 0 && (
          <Badge variant="secondary" className="mt-2">
            {selectedCategories.length} topic{selectedCategories.length !== 1 ? 's' : ''} selected
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {wizardQuestionCategories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`p-4 rounded-lg border-2 text-left transition-all hover:scale-[1.02] ${
                  isSelected
                    ? 'border-black bg-gray-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {categoryIcons[category]}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-sm mb-1 ${
                      isSelected ? 'text-black' : 'text-gray-800'
                    }`}>
                      {category}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {categoryDescriptions[category]}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-center pt-6">
          <p className="text-sm text-gray-500 mb-4">
            Don't worry if you're not sure—just pick the topics that seem most important.
          </p>
          <div className="flex justify-center gap-3">
            <Button
              onClick={onBack}
              variant="outline"
              size="lg"
            >
              Back
            </Button>
            <Button
              onClick={onNext}
              disabled={selectedCategories.length === 0}
              size="lg"
              className="bg-black text-white hover:bg-gray-800 px-8"
            >
              Continue to Questions ({selectedCategories.length} topic{selectedCategories.length !== 1 ? 's' : ''})
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default Step2CategorySelection;
