import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  DollarSign, 
  Shield, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Phone,
  Award
} from 'lucide-react';
import { Contractor } from '@/types/contractor';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileComparisonView from './MobileComparisonView';

interface ComparisonTableProps {
  contractors: Contractor[];
  onEditContractor: (contractor: Contractor) => void;
  onSelectWinner: (contractorId: string) => void;
  selectedWinner?: string;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  contractors,
  onEditContractor,
  onSelectWinner,
  selectedWinner
}) => {
  const isMobile = useIsMobile();
  if (contractors.length === 0) {
    return (
      <Card className="mobile-card">
        <CardContent className="text-center py-12">
          <p className="text-gray-500 text-lg">No contractors to compare yet.</p>
          <p className="text-gray-400 text-sm mt-2">Add contractors to see the comparison table.</p>
        </CardContent>
      </Card>
    );
  }

  // Use mobile view on small screens
  if (isMobile) {
    return (
      <MobileComparisonView
        contractors={contractors}
        selectedWinner={selectedWinner}
        onEditContractor={onEditContractor}
        onSelectWinner={onSelectWinner}
      />
    );
  }

  const getScoreColor = (score?: number) => {
    if (!score) return 'bg-gray-100 text-gray-600';
    if (score >= 4.5) return 'bg-green-100 text-green-800';
    if (score >= 3.5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getBestValue = (contractors: Contractor[], field: string) => {
    const values = contractors.map(c => {
      const keys = field.split('.');
      let value: any = c;
      for (const key of keys) {
        value = value?.[key];
      }
      return value;
    }).filter(Boolean);
    
    if (field.includes('Cost')) {
      return Math.min(...values.filter(v => typeof v === 'number'));
    }
    if (field.includes('Score')) {
      return Math.max(...values.filter(v => typeof v === 'number'));
    }
    return null;
  };

  const isHighlight = (contractor: Contractor, field: string, bestValue: any) => {
    if (!bestValue) return false;
    
    const keys = field.split('.');
    let value: any = contractor;
    for (const key of keys) {
      value = value?.[key];
    }
    
    return value === bestValue;
  };

  const bestTotalCost = getBestValue(contractors, 'costBreakdown.totalCost');
  const bestOverallScore = getBestValue(contractors, 'scores.overallScore');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contractor Comparison</h2>
        <p className="text-gray-600">Compare all contractors side-by-side to make an informed decision</p>
      </div>

      {/* Mobile: Card View */}
      <div className="md:hidden space-y-4">
        {contractors.map((contractor) => (
          <Card key={contractor.id} className={`${
            selectedWinner === contractor.id ? 'ring-2 ring-green-500 bg-green-50' : ''
          }`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{contractor.name}</CardTitle>
                {selectedWinner === contractor.id && (
                  <Badge className="bg-green-500 text-white">
                    <Award className="w-3 h-3 mr-1" />
                    Selected
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="font-medium">Total Cost</div>
                    <div className={`${isHighlight(contractor, 'costBreakdown.totalCost', bestTotalCost) ? 'font-bold text-green-600' : 'text-gray-600'}`}>
                      {contractor.costBreakdown.totalCost 
                        ? `$${contractor.costBreakdown.totalCost.toLocaleString()}`
                        : 'Not provided'
                      }
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <div>
                    <div className="font-medium">Overall Score</div>
                    <div className={`${isHighlight(contractor, 'scores.overallScore', bestOverallScore) ? 'font-bold text-green-600' : 'text-gray-600'}`}>
                      {contractor.scores.overallScore 
                        ? `${contractor.scores.overallScore.toFixed(1)}/5`
                        : 'Not rated'
                      }
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-medium">Warranty</div>
                    <div className="text-gray-600">
                      {contractor.warranty.duration || 'Not specified'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <div>
                    <div className="font-medium">Timeline</div>
                    <div className="text-gray-600">
                      {contractor.proposedSolution.timeline || 'Not provided'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Red Flags */}
              {contractor.personalNotes.redFlags && contractor.personalNotes.redFlags.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                    <span className="text-xs font-medium text-red-800">
                      {contractor.personalNotes.redFlags.length} Red Flag(s)
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => onEditContractor(contractor)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onSelectWinner(contractor.id)}
                  size="sm"
                  className={`flex-1 ${
                    selectedWinner === contractor.id 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-black hover:bg-gray-800'
                  }`}
                >
                  {selectedWinner === contractor.id ? 'Selected' : 'Select'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop: Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-sm overflow-hidden">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left p-4 font-semibold text-gray-900">Contractor</th>
              <th className="text-left p-4 font-semibold text-gray-900">Total Cost</th>
              <th className="text-left p-4 font-semibold text-gray-900">Overall Score</th>
              <th className="text-left p-4 font-semibold text-gray-900">Warranty</th>
              <th className="text-left p-4 font-semibold text-gray-900">Timeline</th>
              <th className="text-left p-4 font-semibold text-gray-900">Red Flags</th>
              <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contractors.map((contractor, index) => (
              <tr 
                key={contractor.id} 
                className={`border-b hover:bg-gray-50 ${
                  selectedWinner === contractor.id ? 'bg-green-50 border-green-200' : ''
                }`}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-semibold text-gray-900">{contractor.name}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        {contractor.contactInfo.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {contractor.contactInfo.phone}
                          </span>
                        )}
                        {contractor.businessInfo.licenseNumber && (
                          <Badge variant="outline" className="text-xs">
                            Licensed
                          </Badge>
                        )}
                      </div>
                    </div>
                    {selectedWinner === contractor.id && (
                      <Award className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </td>
                
                <td className="p-4">
                  <div className={`font-semibold ${
                    isHighlight(contractor, 'costBreakdown.totalCost', bestTotalCost) 
                      ? 'text-green-600 bg-green-100 px-2 py-1 rounded' 
                      : 'text-gray-900'
                  }`}>
                    {contractor.costBreakdown.totalCost 
                      ? `$${contractor.costBreakdown.totalCost.toLocaleString()}`
                      : 'Not provided'
                    }
                  </div>
                  {isHighlight(contractor, 'costBreakdown.totalCost', bestTotalCost) && (
                    <div className="text-xs text-green-600 font-medium">Lowest Cost</div>
                  )}
                </td>
                
                <td className="p-4">
                  {contractor.scores.overallScore ? (
                    <div className="flex items-center gap-2">
                      <Badge className={`${getScoreColor(contractor.scores.overallScore)} ${
                        isHighlight(contractor, 'scores.overallScore', bestOverallScore) 
                          ? 'ring-2 ring-green-500' 
                          : ''
                      }`}>
                        {contractor.scores.overallScore.toFixed(1)}/5
                      </Badge>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= Math.round(contractor.scores.overallScore!)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">Not rated</span>
                  )}
                  {isHighlight(contractor, 'scores.overallScore', bestOverallScore) && (
                    <div className="text-xs text-green-600 font-medium">Highest Score</div>
                  )}
                </td>
                
                <td className="p-4">
                  <div className="text-gray-900">
                    {contractor.warranty.duration || 'Not specified'}
                  </div>
                  {contractor.warranty.transferable && (
                    <Badge variant="outline" className="text-xs mt-1">
                      Transferable
                    </Badge>
                  )}
                </td>
                
                <td className="p-4">
                  <div className="text-gray-900">
                    {contractor.proposedSolution.timeline || 'Not provided'}
                  </div>
                  {contractor.proposedSolution.startDate && (
                    <div className="text-xs text-gray-600 mt-1">
                      Start: {new Date(contractor.proposedSolution.startDate).toLocaleDateString()}
                    </div>
                  )}
                </td>
                
                <td className="p-4">
                  {contractor.personalNotes.redFlags && contractor.personalNotes.redFlags.length > 0 ? (
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-red-600 font-medium text-sm">
                        {contractor.personalNotes.redFlags.length}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 text-sm">None</span>
                    </div>
                  )}
                </td>
                
                <td className="p-4">
                  <div className="flex gap-1">
                    <Button
                      onClick={() => onEditContractor(contractor)}
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => onSelectWinner(contractor.id)}
                      size="sm"
                      className={`${
                        selectedWinner === contractor.id 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-black hover:bg-gray-800'
                      }`}
                    >
                      {selectedWinner === contractor.id ? '✓' : 'Select'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      {contractors.length > 1 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-900 mb-4">Quick Comparison Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-medium text-blue-800">Cost Range</div>
                <div className="text-blue-700">
                  ${Math.min(...contractors.map(c => c.costBreakdown.totalCost || 0).filter(Boolean)).toLocaleString()} - 
                  ${Math.max(...contractors.map(c => c.costBreakdown.totalCost || 0).filter(Boolean)).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="font-medium text-blue-800">Avg Score</div>
                <div className="text-blue-700">
                  {(contractors.reduce((sum, c) => sum + (c.scores.overallScore || 0), 0) / contractors.length).toFixed(1)}/5
                </div>
              </div>
              <div>
                <div className="font-medium text-blue-800">Licensed</div>
                <div className="text-blue-700">
                  {contractors.filter(c => c.businessInfo.licenseNumber).length}/{contractors.length}
                </div>
              </div>
              <div>
                <div className="font-medium text-blue-800">With Red Flags</div>
                <div className="text-blue-700">
                  {contractors.filter(c => c.personalNotes.redFlags && c.personalNotes.redFlags.length > 0).length}/{contractors.length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComparisonTable;