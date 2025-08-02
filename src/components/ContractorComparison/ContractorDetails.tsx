import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Phone,
  Mail,
  Globe,
  MapPin,
  Star,
  DollarSign,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Award,
  FileText
} from 'lucide-react';
import { Contractor, contractorScoreLabels } from '@/types/contractor';
import { elite12Data } from '@/data/elite12Data';

interface ContractorDetailsProps {
  contractor: Contractor;
  onBack: () => void;
  onEdit: () => void;
}

const ContractorDetails: React.FC<ContractorDetailsProps> = ({
  contractor,
  onBack,
  onEdit
}) => {
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Comparison
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{contractor.name}</h1>
            <p className="text-gray-600">Detailed contractor profile</p>
          </div>
        </div>
        <Button onClick={onEdit} className="bg-black text-white hover:bg-gray-800">
          Edit Details
        </Button>
      </div>

      {/* Overall Score Card */}
      {contractor.scores.overallScore && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Overall Assessment</h3>
                <div className="flex items-center gap-3">
                  <Badge className={`text-lg px-4 py-2 ${getScoreColor(contractor.scores.overallScore)}`}>
                    {contractor.scores.overallScore.toFixed(1)}/5
                  </Badge>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${
                          star <= getScoreStars(contractor.scores.overallScore)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    ({contractorScoreLabels[getScoreStars(contractor.scores.overallScore) as keyof typeof contractorScoreLabels]})
                  </span>
                </div>
              </div>
              
              {/* Score Breakdown */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { key: 'costScore', label: 'Cost Value', icon: DollarSign },
                  { key: 'warrantyScore', label: 'Warranty', icon: Shield },
                  { key: 'expertiseScore', label: 'Expertise', icon: Award },
                  { key: 'communicationScore', label: 'Communication', icon: Phone }
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">{label}:</span>
                    <Badge className={getScoreColor(contractor.scores[key as keyof typeof contractor.scores])}>
                      {contractor.scores[key as keyof typeof contractor.scores] || 'N/A'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact & Business Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact & Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Contact Details */}
            <div className="space-y-3">
              {contractor.contactInfo.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <span>{contractor.contactInfo.phone}</span>
                </div>
              )}
              {contractor.contactInfo.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span>{contractor.contactInfo.email}</span>
                </div>
              )}
              {contractor.contactInfo.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-gray-600" />
                  <a href={contractor.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {contractor.contactInfo.website}
                  </a>
                </div>
              )}
              {contractor.contactInfo.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span>{contractor.contactInfo.address}</span>
                </div>
              )}
            </div>

            <Separator />

            {/* Business Info */}
            <div className="space-y-3">
              {contractor.businessInfo.licenseNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-600">License Number:</span>
                  <span className="font-medium">{contractor.businessInfo.licenseNumber}</span>
                </div>
              )}
              {contractor.businessInfo.insuranceProvider && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Insurance:</span>
                  <span className="font-medium">{contractor.businessInfo.insuranceProvider}</span>
                </div>
              )}
              {contractor.businessInfo.yearsInBusiness && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Years in Business:</span>
                  <span className="font-medium">{contractor.businessInfo.yearsInBusiness}</span>
                </div>
              )}
              {contractor.businessInfo.bbbRating && (
                <div className="flex justify-between">
                  <span className="text-gray-600">BBB Rating:</span>
                  <Badge variant="outline">{contractor.businessInfo.bbbRating}</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Proposed Solution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Proposed Solution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contractor.proposedSolution.systemType && (
              <div>
                <span className="text-gray-600 text-sm">System Type:</span>
                <p className="font-medium">{contractor.proposedSolution.systemType}</p>
              </div>
            )}
            
            {contractor.proposedSolution.scopeOfWork && (
              <div>
                <span className="text-gray-600 text-sm">Scope of Work:</span>
                <p className="text-gray-800 leading-relaxed">{contractor.proposedSolution.scopeOfWork}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              {contractor.proposedSolution.timeline && (
                <div>
                  <span className="text-gray-600 text-sm">Timeline:</span>
                  <p className="font-medium">{contractor.proposedSolution.timeline}</p>
                </div>
              )}
              {contractor.proposedSolution.startDate && (
                <div>
                  <span className="text-gray-600 text-sm">Start Date:</span>
                  <p className="font-medium">{new Date(contractor.proposedSolution.startDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Cost Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {contractor.costBreakdown.laborCost && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Labor:</span>
                  <span className="font-medium">${contractor.costBreakdown.laborCost.toLocaleString()}</span>
                </div>
              )}
              {contractor.costBreakdown.materialsCost && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Materials:</span>
                  <span className="font-medium">${contractor.costBreakdown.materialsCost.toLocaleString()}</span>
                </div>
              )}
              {contractor.costBreakdown.permitsCost && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Permits:</span>
                  <span className="font-medium">${contractor.costBreakdown.permitsCost.toLocaleString()}</span>
                </div>
              )}
              
              {contractor.costBreakdown.additionalFees && contractor.costBreakdown.additionalFees.length > 0 && (
                <div>
                  <span className="text-gray-600 text-sm block mb-2">Additional Fees:</span>
                  {contractor.costBreakdown.additionalFees.map((fee, index) => (
                    <div key={index} className="flex justify-between text-sm ml-4">
                      <span className="text-gray-600">{fee.name}:</span>
                      <span>${fee.cost.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <Separator />
              
              {contractor.costBreakdown.totalCost && (
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Cost:</span>
                  <span className="text-green-600">${contractor.costBreakdown.totalCost.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div>
              {contractor.costBreakdown.paymentSchedule && (
                <div>
                  <span className="text-gray-600 text-sm">Payment Schedule:</span>
                  <p className="text-gray-800 leading-relaxed mt-1">{contractor.costBreakdown.paymentSchedule}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warranty Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Warranty Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {contractor.warranty.duration && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{contractor.warranty.duration}</span>
                </div>
              )}
              {contractor.warranty.emergencyResponse && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Emergency Response:</span>
                  <span className="font-medium">{contractor.warranty.emergencyResponse}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Transferable:</span>
                <span className="font-medium">
                  {contractor.warranty.transferable ? (
                    <Badge className="bg-green-100 text-green-800">Yes</Badge>
                  ) : (
                    <Badge variant="outline">No</Badge>
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {contractor.warranty.coverage && (
                <div>
                  <span className="text-gray-600 text-sm">Coverage:</span>
                  <p className="text-gray-800 leading-relaxed">{contractor.warranty.coverage}</p>
                </div>
              )}
              {contractor.warranty.exclusions && (
                <div>
                  <span className="text-gray-600 text-sm">Exclusions:</span>
                  <p className="text-gray-800 leading-relaxed">{contractor.warranty.exclusions}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Notes & Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Red Flags & Positives */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Red Flags */}
            {contractor.personalNotes.redFlags && contractor.personalNotes.redFlags.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h4 className="font-semibold text-red-800">Red Flags</h4>
                </div>
                <ul className="space-y-2">
                  {contractor.personalNotes.redFlags.map((flag, index) => (
                    <li key={index} className="flex items-start gap-2 text-red-700">
                      <span className="text-red-500 mt-1">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Positives */}
            {contractor.personalNotes.positives && contractor.personalNotes.positives.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">Positive Aspects</h4>
                </div>
                <ul className="space-y-2">
                  {contractor.personalNotes.positives.map((positive, index) => (
                    <li key={index} className="flex items-start gap-2 text-green-700">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{positive}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Overall Notes */}
            {contractor.personalNotes.overallNotes && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Overall Notes</h4>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">
                  {contractor.personalNotes.overallNotes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Communication Assessment */}
        <Card>
          <CardHeader>
            <CardTitle>Communication & Professionalism</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contractor.personalNotes.firstImpression && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">First Impression</h4>
                <p className="text-gray-700 leading-relaxed">{contractor.personalNotes.firstImpression}</p>
              </div>
            )}
            
            {contractor.personalNotes.communication && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Communication Style</h4>
                <p className="text-gray-700 leading-relaxed">{contractor.personalNotes.communication}</p>
              </div>
            )}
            
            {contractor.personalNotes.professionalism && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Professionalism</h4>
                <p className="text-gray-700 leading-relaxed">{contractor.personalNotes.professionalism}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Question Responses */}
      {(contractor.questionResponses.elite12Responses && Object.keys(contractor.questionResponses.elite12Responses).length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>Elite 12 Questions Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(contractor.questionResponses.elite12Responses).map(([questionKey, response]) => {
                const questionIndex = parseInt(questionKey.replace('q', '')) - 1;
                const questionData = elite12Data[questionIndex];
                
                if (!questionData || !response.answer) return null;
                
                return (
                  <div key={questionKey} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">
                        Q{questionIndex + 1}. {questionData.question}
                      </h4>
                      {response.rating > 0 && (
                        <Badge className={getScoreColor(response.rating)}>
                          {response.rating}/5
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded">
                      {response.answer}
                    </p>
                    {response.notes && (
                      <p className="text-gray-600 text-sm mt-2 italic">
                        Notes: {response.notes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* References */}
      {contractor.references.provided && contractor.references.provided.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>References & Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contractor.references.provided.map((ref, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <p className="font-medium">{ref.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Contact:</span>
                      <p className="font-medium">{ref.contact}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Project:</span>
                      <p className="font-medium">{ref.project}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContractorDetails;