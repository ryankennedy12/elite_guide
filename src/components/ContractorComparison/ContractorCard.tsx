import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Edit, 
  Trash2, 
  Star, 
  Phone, 
  Mail, 
  Globe, 
  DollarSign,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Contractor } from '@/types/contractor';

interface ContractorCardProps {
  contractor: Contractor;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
  isSelected?: boolean;
  showComparison?: boolean;
}

const ContractorCard: React.FC<ContractorCardProps> = ({
  contractor,
  onEdit,
  onDelete,
  onViewDetails,
  isSelected = false,
  showComparison = false
}) => {
  const [showFullNotes, setShowFullNotes] = useState(false);

  const getScoreColor = (score?: number) => {
    if (!score) return 'bg-gray-100 text-gray-600';
    if (score >= 4.5) return 'bg-green-100 text-green-800';
    if (score >= 3.5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getScoreStars = (score?: number) => {
    if (!score) return 0;
    return Math.round(score);
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${
      isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white'
    }`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-gray-900 mb-2">
              {contractor.name}
            </CardTitle>
            
            {/* Contact Info */}
            <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
              {contractor.contactInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  <span>{contractor.contactInfo.phone}</span>
                </div>
              )}
              {contractor.contactInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  <span>{contractor.contactInfo.email}</span>
                </div>
              )}
              {contractor.contactInfo.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  <span>Website</span>
                </div>
              )}
            </div>

            {/* Overall Score */}
            {contractor.scores?.overallScore && (
              <div className="flex items-center gap-2 mb-3">
                <Badge className={getScoreColor(contractor.scores.overallScore)}>
                  Overall: {contractor.scores.overallScore.toFixed(1)}/5
                </Badge>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= getScoreStars(contractor.scores?.overallScore)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1 ml-4">
            <Button
              onClick={onEdit}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              onClick={onDelete}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {/* Cost */}
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <div>
              <div className="font-medium">Total Cost</div>
              <div className="text-gray-600">
                {contractor.costBreakdown.totalCost 
                  ? `$${contractor.costBreakdown.totalCost.toLocaleString()}`
                  : 'Not provided'
                }
              </div>
            </div>
          </div>

          {/* Warranty */}
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <div>
              <div className="font-medium">Warranty</div>
              <div className="text-gray-600">
                {contractor.warranty.duration || 'Not specified'}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600" />
            <div>
              <div className="font-medium">Timeline</div>
              <div className="text-gray-600">
                {contractor.proposedSolution.timeline || 'Not provided'}
              </div>
            </div>
          </div>

          {/* License */}
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <div>
              <div className="font-medium">Licensed</div>
              <div className="text-gray-600">
                {contractor.businessInfo.licenseNumber ? 'Yes' : 'Not verified'}
              </div>
            </div>
          </div>
        </div>

        {/* Red Flags */}
        {contractor.personalNotes.redFlags && contractor.personalNotes.redFlags.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="font-medium text-red-800 text-sm">Red Flags</span>
            </div>
            <ul className="text-sm text-red-700 space-y-1">
              {contractor.personalNotes.redFlags.slice(0, 2).map((flag, index) => (
                <li key={index}>• {flag}</li>
              ))}
              {contractor.personalNotes.redFlags.length > 2 && (
                <li className="text-red-600">+ {contractor.personalNotes.redFlags.length - 2} more</li>
              )}
            </ul>
          </div>
        )}

        {/* Personal Notes Preview */}
        {contractor.personalNotes.overallNotes && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="font-medium text-gray-800 text-sm mb-1">Notes</div>
            <p className="text-sm text-gray-700 line-clamp-2">
              {showFullNotes 
                ? contractor.personalNotes.overallNotes
                : contractor.personalNotes.overallNotes.substring(0, 100) + 
                  (contractor.personalNotes.overallNotes.length > 100 ? '...' : '')
              }
            </p>
            {contractor.personalNotes.overallNotes.length > 100 && (
              <button
                onClick={() => setShowFullNotes(!showFullNotes)}
                className="text-blue-600 text-xs mt-1 hover:underline"
              >
                {showFullNotes ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={onViewDetails}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            View Details
          </Button>
          {showComparison && (
            <Button
              onClick={onEdit}
              size="sm"
              className="bg-black text-white hover:bg-gray-800"
            >
              Edit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractorCard;