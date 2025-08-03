import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Crown } from 'lucide-react';
import { Contractor } from '@/types/contractor';

interface MobileComparisonViewProps {
  contractors: Contractor[];
  selectedWinner?: string;
  onEditContractor: (contractor: Contractor) => void;
  onSelectWinner: (contractorId: string) => void;
}

const MobileComparisonView: React.FC<MobileComparisonViewProps> = ({
  contractors,
  selectedWinner,
  onEditContractor,
  onSelectWinner
}) => {
  if (contractors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No contractors to compare yet.</p>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 6) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {contractors.map((contractor) => (
        <Card 
          key={contractor.id} 
          className={`mobile-card relative ${
            selectedWinner === contractor.id ? 'ring-2 ring-yellow-400 bg-yellow-50' : ''
          }`}
        >
          {selectedWinner === contractor.id && (
            <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
              <Crown className="w-4 h-4 text-yellow-800" />
            </div>
          )}
          
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">{contractor.name}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  {contractor.scores?.overallScore && (
                    <Badge className={`${getScoreColor(contractor.scores.overallScore)}`}>
                      Score: {contractor.scores.overallScore.toFixed(1)}/10
                    </Badge>
                  )}
                  {contractor.costBreakdown?.totalCost && (
                    <Badge variant="outline">
                      {formatCurrency(contractor.costBreakdown.totalCost)}
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                onClick={() => onEditContractor(contractor)}
                size="sm"
                variant="ghost"
                className="touch-target"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Key Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Timeline:</span>
                <div className="font-medium">
                  {contractor.proposedSolution?.timeline || 'Not specified'}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Warranty:</span>
                <div className="font-medium">
                  {contractor.warranty?.duration || 'Not specified'}
                </div>
              </div>
              <div>
                <span className="text-gray-500">License:</span>
                <div className="font-medium">
                  {contractor.businessInfo?.licenseNumber || 'Not provided'}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Years:</span>
                <div className="font-medium">
                  {contractor.businessInfo?.yearsInBusiness || 'Unknown'}
                </div>
              </div>
            </div>

            {/* Red Flags */}
            {contractor.personalNotes?.redFlags && contractor.personalNotes.redFlags.length > 0 && (
              <div>
                <span className="text-red-600 text-sm font-medium">Red Flags:</span>
                <div className="mt-1 space-y-1">
                  {contractor.personalNotes.redFlags.map((flag, index) => (
                    <div key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                      {flag}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => onSelectWinner(contractor.id)}
                variant={selectedWinner === contractor.id ? "default" : "outline"}
                className="flex-1 touch-target"
                size="sm"
              >
                {selectedWinner === contractor.id ? 'Winner' : 'Select Winner'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MobileComparisonView;