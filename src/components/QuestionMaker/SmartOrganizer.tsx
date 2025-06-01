
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpDown, Lightbulb } from 'lucide-react';

interface SmartOrganizerProps {
  onAutoOrganize: () => void;
  totalQuestions: number;
}

export const SmartOrganizer: React.FC<SmartOrganizerProps> = ({
  onAutoOrganize,
  totalQuestions
}) => {
  if (totalQuestions === 0) return null;
  
  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-blue-900 mb-2">Pro Interview Flow</h4>
            <p className="text-sm text-blue-800 mb-3">
              Start with your top concern, then cover methodology, timeline, and save cost questions for last to get the best results.
            </p>
            <Button
              onClick={onAutoOrganize}
              variant="outline"
              size="sm"
              className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Smart Organize
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
