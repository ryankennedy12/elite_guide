
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Share2 } from 'lucide-react';

interface StickyExportBarProps {
  totalQuestions: number;
  mustAskCount: number;
  maybeCount: number;
  onPreview: () => void;
  onExport: () => void;
  onShare: () => void;
  isPreviewMode: boolean;
}

export const StickyExportBar: React.FC<StickyExportBarProps> = ({
  totalQuestions,
  mustAskCount,
  maybeCount,
  onPreview,
  onExport,
  onShare,
  isPreviewMode
}) => {
  if (totalQuestions === 0) {
    return (
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-2">Add questions to create your interview plan.</p>
          <Badge variant="outline" className="bg-gray-50 text-gray-600">
            {totalQuestions} questions
          </Badge>
        </div>
      </div>
    );
  }
  
  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {mustAskCount} Must Ask
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {maybeCount} Maybe
              </Badge>
            </div>
            <span className="text-sm text-gray-600 hidden sm:block">
              Your interview plan is ready!
            </span>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={onPreview}
              variant="outline"
              size="sm"
              className="hidden sm:flex"
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreviewMode ? 'Edit View' : 'Preview'}
            </Button>
            
            <Button
              onClick={onShare}
              variant="outline"
              size="sm"
              className="hidden sm:flex"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            
            <Button
              onClick={onExport}
              size="sm"
              className="bg-black text-white hover:bg-gray-800"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
