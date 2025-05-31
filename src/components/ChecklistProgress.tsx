
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle } from 'lucide-react';

interface ChecklistProgressProps {
  completed: number;
  total: number;
  className?: string;
}

export const ChecklistProgress: React.FC<ChecklistProgressProps> = ({
  completed,
  total,
  className = ""
}) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-black flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Progress Tracker
        </h3>
        <span className="text-sm text-gray-600">
          {completed} of {total} complete
        </span>
      </div>
      
      <Progress value={percentage} className="h-3 mb-2" />
      
      <div className="text-center">
        <span className="text-2xl font-bold text-black">{percentage}%</span>
        <span className="text-sm text-gray-500 ml-1">Complete</span>
      </div>
      
      {percentage === 100 && (
        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-center">
          <span className="text-green-700 font-medium text-sm">🎉 All done! You're ready!</span>
        </div>
      )}
    </div>
  );
};
