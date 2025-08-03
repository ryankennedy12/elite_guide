import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Minus, Save, X } from 'lucide-react';
import { Contractor, contractorScoreLabels } from '@/types/contractor';
import { elite12Data } from '@/data/elite12Data';

interface ContractorFormProps {
  contractor?: Contractor;
  onSave: (contractor: Contractor) => void;
  onCancel: () => void;
}

const ContractorForm: React.FC<ContractorFormProps> = ({
  contractor,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<Contractor>(() => {
    if (contractor) return contractor;
    
    return {
      id: '',
      name: '',
      contactInfo: {},
      businessInfo: {},
      proposedSolution: {},
      costBreakdown: { additionalFees: [] },
      warranty: {},
      questionResponses: { elite12Responses: {}, customResponses: {} },
      references: { provided: [], reviewSources: [] },
      personalNotes: { redFlags: [], positives: [] },
      scores: {},
      createdAt: new Date(),
      updatedAt: new Date()
    };
  });

  const [customQuestions, setCustomQuestions] = useState<string[]>([]);

  useEffect(() => {
    // Load custom questions from localStorage
    const savedNotes = localStorage.getItem('customNotes');
    if (savedNotes) {
      try {
        const data = JSON.parse(savedNotes);
        if (data.generatedQuestions) {
          setCustomQuestions(data.generatedQuestions);
        }
      } catch (error) {
        console.error('Error loading custom questions:', error);
      }
    }
  }, []);

  const updateFormData = (path: string, value: any) => {
    setFormData(prev => {
      const keys = path.split('.');
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const addAdditionalFee = () => {
    const newFees = [...(formData.costBreakdown.additionalFees || []), { name: '', cost: 0 }];
    updateFormData('costBreakdown.additionalFees', newFees);
  };

  const removeAdditionalFee = (index: number) => {
    const newFees = formData.costBreakdown.additionalFees?.filter((_, i) => i !== index) || [];
    updateFormData('costBreakdown.additionalFees', newFees);
  };

  const addReference = () => {
    const newRefs = [...(formData.references.provided || []), { name: '', contact: '', project: '' }];
    updateFormData('references.provided', newRefs);
  };

  const addReviewSource = () => {
    const newSources = [...(formData.references.reviewSources || []), { platform: '', rating: 0 }];
    updateFormData('references.reviewSources', newSources);
  };

  const addRedFlag = () => {
    const newFlags = [...(formData.personalNotes.redFlags || []), ''];
    updateFormData('personalNotes.redFlags', newFlags);
  };

  const addPositive = () => {
    const newPositives = [...(formData.personalNotes.positives || []), ''];
    updateFormData('personalNotes.positives', newPositives);
  };

  const calculateOverallScore = () => {
    const scores = formData.scores;
    if (!scores.costScore || !scores.warrantyScore || !scores.expertiseScore || !scores.communicationScore) {
      return 0;
    }
    
    // Default weights
    const weights = { cost: 0.25, warranty: 0.25, expertise: 0.30, communication: 0.20 };
    
    return (
      scores.costScore * weights.cost +
      scores.warrantyScore * weights.warranty +
      scores.expertiseScore * weights.expertise +
      scores.communicationScore * weights.communication
    );
  };

  const handleSave = () => {
    const contractorToSave: Contractor = {
      ...formData,
      id: formData.id || Date.now().toString(),
      scores: {
        ...formData.scores,
        overallScore: calculateOverallScore()
      },
      updatedAt: new Date()
    };
    
    onSave(contractorToSave);
  };

  return (
    <div className="max-w-4xl mx-auto mobile-padding">
      <Card className="mobile-card">
        <CardHeader className="mobile-padding">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-xl sm:text-2xl">
              {contractor ? 'Edit Contractor' : 'Add New Contractor'}
            </CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button onClick={handleSave} className="bg-black text-white hover:bg-gray-800 touch-target flex-1 sm:flex-none">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={onCancel} variant="outline" className="touch-target flex-1 sm:flex-none">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="mobile-padding mobile-form">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto">
              <TabsTrigger value="basic" className="touch-target text-xs sm:text-sm">Basic</TabsTrigger>
              <TabsTrigger value="solution" className="touch-target text-xs sm:text-sm">Solution</TabsTrigger>
              <TabsTrigger value="cost" className="touch-target text-xs sm:text-sm">Cost</TabsTrigger>
              <TabsTrigger value="warranty" className="touch-target text-xs sm:text-sm">Warranty</TabsTrigger>
              <TabsTrigger value="questions" className="touch-target text-xs sm:text-sm">Questions</TabsTrigger>
              <TabsTrigger value="notes" className="touch-target text-xs sm:text-sm">Notes</TabsTrigger>
            </TabsList>

            {/* Basic Information */}
            <TabsContent value="basic" className="space-y-6 mobile-stack">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mobile-gap">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Company Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      placeholder="ABC Waterproofing"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.contactInfo.phone || ''}
                      onChange={(e) => updateFormData('contactInfo.phone', e.target.value)}
                      placeholder="(614) 555-0123"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.contactInfo.email || ''}
                      onChange={(e) => updateFormData('contactInfo.email', e.target.value)}
                      placeholder="info@abcwaterproofing.com"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.contactInfo.website || ''}
                      onChange={(e) => updateFormData('contactInfo.website', e.target.value)}
                      placeholder="www.abcwaterproofing.com"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="license">License Number</Label>
                    <Input
                      id="license"
                      value={formData.businessInfo.licenseNumber || ''}
                      onChange={(e) => updateFormData('businessInfo.licenseNumber', e.target.value)}
                      placeholder="OH-12345"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="insurance">Insurance Provider</Label>
                    <Input
                      id="insurance"
                      value={formData.businessInfo.insuranceProvider || ''}
                      onChange={(e) => updateFormData('businessInfo.insuranceProvider', e.target.value)}
                      placeholder="State Farm, Allstate, etc."
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="years">Years in Business</Label>
                    <Input
                      id="years"
                      type="number"
                      value={formData.businessInfo.yearsInBusiness || ''}
                      onChange={(e) => updateFormData('businessInfo.yearsInBusiness', parseInt(e.target.value) || 0)}
                      placeholder="15"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bbb">BBB Rating</Label>
                    <Input
                      id="bbb"
                      value={formData.businessInfo.bbbRating || ''}
                      onChange={(e) => updateFormData('businessInfo.bbbRating', e.target.value)}
                      placeholder="A+, A, B+, etc."
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Proposed Solution */}
            <TabsContent value="solution" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="systemType">System Type</Label>
                  <Input
                    id="systemType"
                    value={formData.proposedSolution.systemType || ''}
                    onChange={(e) => updateFormData('proposedSolution.systemType', e.target.value)}
                    placeholder="Interior drain tile, exterior waterproofing, etc."
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="scopeOfWork">Scope of Work</Label>
                  <Textarea
                    id="scopeOfWork"
                    value={formData.proposedSolution.scopeOfWork || ''}
                    onChange={(e) => updateFormData('proposedSolution.scopeOfWork', e.target.value)}
                    placeholder="Detailed description of what work will be performed..."
                    className="mt-1 min-h-[120px]"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timeline">Timeline</Label>
                    <Input
                      id="timeline"
                      value={formData.proposedSolution.timeline || ''}
                      onChange={(e) => updateFormData('proposedSolution.timeline', e.target.value)}
                      placeholder="2-3 days, 1 week, etc."
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="startDate">Proposed Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.proposedSolution.startDate || ''}
                      onChange={(e) => updateFormData('proposedSolution.startDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Cost Breakdown */}
            <TabsContent value="cost" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="laborCost">Labor Cost</Label>
                    <Input
                      id="laborCost"
                      type="number"
                      value={formData.costBreakdown.laborCost || ''}
                      onChange={(e) => updateFormData('costBreakdown.laborCost', parseFloat(e.target.value) || 0)}
                      placeholder="5000"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="materialsCost">Materials Cost</Label>
                    <Input
                      id="materialsCost"
                      type="number"
                      value={formData.costBreakdown.materialsCost || ''}
                      onChange={(e) => updateFormData('costBreakdown.materialsCost', parseFloat(e.target.value) || 0)}
                      placeholder="3000"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="permitsCost">Permits Cost</Label>
                    <Input
                      id="permitsCost"
                      type="number"
                      value={formData.costBreakdown.permitsCost || ''}
                      onChange={(e) => updateFormData('costBreakdown.permitsCost', parseFloat(e.target.value) || 0)}
                      placeholder="200"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="totalCost">Total Cost</Label>
                    <Input
                      id="totalCost"
                      type="number"
                      value={formData.costBreakdown.totalCost || ''}
                      onChange={(e) => updateFormData('costBreakdown.totalCost', parseFloat(e.target.value) || 0)}
                      placeholder="8500"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="paymentSchedule">Payment Schedule</Label>
                    <Textarea
                      id="paymentSchedule"
                      value={formData.costBreakdown.paymentSchedule || ''}
                      onChange={(e) => updateFormData('costBreakdown.paymentSchedule', e.target.value)}
                      placeholder="25% down, 50% at start, 25% on completion"
                      className="mt-1"
                    />
                  </div>
                  
                  {/* Additional Fees */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Additional Fees</Label>
                      <Button
                        onClick={addAdditionalFee}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Fee
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {formData.costBreakdown.additionalFees?.map((fee, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={fee.name}
                            onChange={(e) => {
                              const newFees = [...(formData.costBreakdown.additionalFees || [])];
                              newFees[index].name = e.target.value;
                              updateFormData('costBreakdown.additionalFees', newFees);
                            }}
                            placeholder="Fee name"
                            className="flex-1"
                          />
                          <Input
                            type="number"
                            value={fee.cost}
                            onChange={(e) => {
                              const newFees = [...(formData.costBreakdown.additionalFees || [])];
                              newFees[index].cost = parseFloat(e.target.value) || 0;
                              updateFormData('costBreakdown.additionalFees', newFees);
                            }}
                            placeholder="0"
                            className="w-24"
                          />
                          <Button
                            onClick={() => removeAdditionalFee(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Warranty */}
            <TabsContent value="warranty" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="warrantyDuration">Warranty Duration</Label>
                    <Input
                      id="warrantyDuration"
                      value={formData.warranty.duration || ''}
                      onChange={(e) => updateFormData('warranty.duration', e.target.value)}
                      placeholder="5 years, lifetime, etc."
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="warrantyCoverage">What's Covered</Label>
                    <Textarea
                      id="warrantyCoverage"
                      value={formData.warranty.coverage || ''}
                      onChange={(e) => updateFormData('warranty.coverage', e.target.value)}
                      placeholder="Materials, labor, water intrusion, etc."
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="transferable"
                      checked={formData.warranty.transferable || false}
                      onCheckedChange={(checked) => updateFormData('warranty.transferable', checked)}
                    />
                    <Label htmlFor="transferable">Warranty is transferable to new owners</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="warrantyExclusions">Exclusions</Label>
                    <Textarea
                      id="warrantyExclusions"
                      value={formData.warranty.exclusions || ''}
                      onChange={(e) => updateFormData('warranty.exclusions', e.target.value)}
                      placeholder="Acts of God, homeowner negligence, etc."
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="emergencyResponse">Emergency Response Time</Label>
                    <Input
                      id="emergencyResponse"
                      value={formData.warranty.emergencyResponse || ''}
                      onChange={(e) => updateFormData('warranty.emergencyResponse', e.target.value)}
                      placeholder="24 hours, same day, etc."
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Questions & Responses */}
            <TabsContent value="questions" className="space-y-6">
              {/* Elite 12 Questions */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Elite 12 Questions Responses</h3>
                <div className="space-y-4">
                  {elite12Data.map((q, index) => (
                    <Card key={index} className="p-4">
                      <div className="mb-3">
                        <h4 className="font-medium text-sm text-gray-900 mb-2">
                          Q{index + 1}. {q.question}
                        </h4>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <Label className="text-xs">Their Answer</Label>
                          <Textarea
                            value={formData.questionResponses.elite12Responses?.[`q${index + 1}`]?.answer || ''}
                            onChange={(e) => {
                              const responses = { ...formData.questionResponses.elite12Responses };
                              if (!responses[`q${index + 1}`]) responses[`q${index + 1}`] = { answer: '', rating: 0 };
                              responses[`q${index + 1}`].answer = e.target.value;
                              updateFormData('questionResponses.elite12Responses', responses);
                            }}
                            placeholder="Record their response here..."
                            className="mt-1 h-20"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-xs">Quality Rating</Label>
                          <Select
                            value={formData.questionResponses.elite12Responses?.[`q${index + 1}`]?.rating?.toString() || ''}
                            onValueChange={(value) => {
                              const responses = { ...formData.questionResponses.elite12Responses };
                              if (!responses[`q${index + 1}`]) responses[`q${index + 1}`] = { answer: '', rating: 0 };
                              responses[`q${index + 1}`].rating = parseInt(value);
                              updateFormData('questionResponses.elite12Responses', responses);
                            }}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Rate 1-5" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(contractorScoreLabels).map(([score, label]) => (
                                <SelectItem key={score} value={score}>
                                  {score} - {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Custom Questions */}
              {customQuestions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Custom Questions Responses</h3>
                  <div className="space-y-4">
                    {customQuestions.map((question, index) => (
                      <Card key={index} className="p-4">
                        <div className="mb-3">
                          <h4 className="font-medium text-sm text-gray-900 mb-2">
                            {question}
                          </h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <Label className="text-xs">Their Answer</Label>
                            <Textarea
                              value={formData.questionResponses.customResponses?.[`custom${index}`]?.answer || ''}
                              onChange={(e) => {
                                const responses = { ...formData.questionResponses.customResponses };
                                if (!responses[`custom${index}`]) responses[`custom${index}`] = { answer: '', rating: 0 };
                                responses[`custom${index}`].answer = e.target.value;
                                updateFormData('questionResponses.customResponses', responses);
                              }}
                              placeholder="Record their response here..."
                              className="mt-1 h-20"
                            />
                          </div>
                          
                          <div>
                            <Label className="text-xs">Quality Rating</Label>
                            <Select
                              value={formData.questionResponses.customResponses?.[`custom${index}`]?.rating?.toString() || ''}
                              onValueChange={(value) => {
                                const responses = { ...formData.questionResponses.customResponses };
                                if (!responses[`custom${index}`]) responses[`custom${index}`] = { answer: '', rating: 0 };
                                responses[`custom${index}`].rating = parseInt(value);
                                updateFormData('questionResponses.customResponses', responses);
                              }}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Rate 1-5" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(contractorScoreLabels).map(([score, label]) => (
                                  <SelectItem key={score} value={score}>
                                    {score} - {label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Notes & Scores */}
            <TabsContent value="notes" className="space-y-6">
              {/* Scoring */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Overall Scoring</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'costScore', label: 'Cost Value' },
                    { key: 'warrantyScore', label: 'Warranty' },
                    { key: 'expertiseScore', label: 'Expertise' },
                    { key: 'communicationScore', label: 'Communication' }
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <Label className="text-sm">{label}</Label>
                      <Select
                        value={formData.scores[key as keyof typeof formData.scores]?.toString() || ''}
                        onValueChange={(value) => updateFormData(`scores.${key}`, parseInt(value))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Rate 1-5" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(contractorScoreLabels).map(([score, label]) => (
                            <SelectItem key={score} value={score}>
                              {score} - {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
                
                {calculateOverallScore() > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="font-medium text-blue-900">
                      Calculated Overall Score: {calculateOverallScore().toFixed(1)}/5
                    </div>
                  </div>
                )}
              </div>

              {/* Personal Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="firstImpression">First Impression</Label>
                    <Textarea
                      id="firstImpression"
                      value={formData.personalNotes.firstImpression || ''}
                      onChange={(e) => updateFormData('personalNotes.firstImpression', e.target.value)}
                      placeholder="Professional, on time, knowledgeable..."
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="communication">Communication Style</Label>
                    <Textarea
                      id="communication"
                      value={formData.personalNotes.communication || ''}
                      onChange={(e) => updateFormData('personalNotes.communication', e.target.value)}
                      placeholder="Clear explanations, patient with questions..."
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="professionalism">Professionalism</Label>
                    <Textarea
                      id="professionalism"
                      value={formData.personalNotes.professionalism || ''}
                      onChange={(e) => updateFormData('personalNotes.professionalism', e.target.value)}
                      placeholder="Appearance, punctuality, respect for property..."
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="overallNotes">Overall Notes</Label>
                    <Textarea
                      id="overallNotes"
                      value={formData.personalNotes.overallNotes || ''}
                      onChange={(e) => updateFormData('personalNotes.overallNotes', e.target.value)}
                      placeholder="General thoughts, gut feeling, concerns..."
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Red Flags & Positives */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-red-700 font-medium">Red Flags</Label>
                    <Button
                      onClick={addRedFlag}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {formData.personalNotes.redFlags?.map((flag, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={flag}
                          onChange={(e) => {
                            const newFlags = [...(formData.personalNotes.redFlags || [])];
                            newFlags[index] = e.target.value;
                            updateFormData('personalNotes.redFlags', newFlags);
                          }}
                          placeholder="Describe the red flag..."
                          className="flex-1 border-red-200"
                        />
                        <Button
                          onClick={() => {
                            const newFlags = formData.personalNotes.redFlags?.filter((_, i) => i !== index) || [];
                            updateFormData('personalNotes.redFlags', newFlags);
                          }}
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-green-700 font-medium">Positives</Label>
                    <Button
                      onClick={addPositive}
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-200"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {formData.personalNotes.positives?.map((positive, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={positive}
                          onChange={(e) => {
                            const newPositives = [...(formData.personalNotes.positives || [])];
                            newPositives[index] = e.target.value;
                            updateFormData('personalNotes.positives', newPositives);
                          }}
                          placeholder="Describe the positive aspect..."
                          className="flex-1 border-green-200"
                        />
                        <Button
                          onClick={() => {
                            const newPositives = formData.personalNotes.positives?.filter((_, i) => i !== index) || [];
                            updateFormData('personalNotes.positives', newPositives);
                          }}
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractorForm;