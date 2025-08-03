import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const MobileSheet: React.FC<MobileSheetProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:hidden">
      <Card className="w-full max-h-[90vh] overflow-hidden mobile-modal">
        {title && (
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="touch-target"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}
        <div className="overflow-y-auto mobile-sheet p-4">
          {children}
        </div>
      </Card>
    </div>
  );
};

export default MobileSheet;