import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Download, Users, BarChart3 } from 'lucide-react';
import { Contractor } from '@/types/contractor';
import ContractorCard from '@/components/ContractorComparison/ContractorCard';
import ContractorForm from '@/components/ContractorComparison/ContractorForm';
import ComparisonTable from '@/components/ContractorComparison/ComparisonTable';
import ContractorDetails from '@/components/ContractorComparison/ContractorDetails';
import { useToast } from '@/hooks/use-toast';
import { useContentAccess } from '@/hooks/useContentAccess';

type ViewMode = 'list' | 'comparison' | 'form' | 'details';

const ContractorComparison = () => {
  const { toast } = useToast();
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingContractor, setEditingContractor] = useState<Contractor | undefined>();
  const [selectedContractor, setSelectedContractor] = useState<Contractor | undefined>();
  const [selectedWinner, setSelectedWinner] = useState<string>('');

  useContentAccess();

  useEffect(() => {
    // Load saved contractors
    const savedContractors = localStorage.getItem('contractors');
    if (savedContractors) {
      try {
        const data = JSON.parse(savedContractors);
        setContractors(data.map((c: any) => ({
          ...c,
          createdAt: new Date(c.createdAt),
          updatedAt: new Date(c.updatedAt)
        })));
      } catch (error) {
        console.error('Error loading contractors:', error);
      }
    }

    // Load selected winner
    const savedWinner = localStorage.getItem('selectedContractor');
    if (savedWinner) {
      setSelectedWinner(savedWinner);
    }
  }, []);

  const saveContractors = (newContractors: Contractor[]) => {
    localStorage.setItem('contractors', JSON.stringify(newContractors));
    setContractors(newContractors);
  };

  const handleSaveContractor = (contractor: Contractor) => {
    const existingIndex = contractors.findIndex(c => c.id === contractor.id);
    let newContractors: Contractor[];
    
    if (existingIndex >= 0) {
      newContractors = [...contractors];
      newContractors[existingIndex] = contractor;
      toast({
        title: "Contractor updated",
        description: `${contractor.name} has been updated successfully.`,
      });
    } else {
      newContractors = [contractor, ...contractors];
      toast({
        title: "Contractor added",
        description: `${contractor.name} has been added to your comparison.`,
      });
    }
    
    saveContractors(newContractors);
    setViewMode('list');
    setEditingContractor(undefined);
  };

  const handleDeleteContractor = (contractorId: string) => {
    const contractor = contractors.find(c => c.id === contractorId);
    const newContractors = contractors.filter(c => c.id !== contractorId);
    saveContractors(newContractors);
    
    if (selectedWinner === contractorId) {
      setSelectedWinner('');
      localStorage.removeItem('selectedContractor');
    }
    
    toast({
      title: "Contractor removed",
      description: `${contractor?.name} has been removed from your comparison.`,
    });
  };

  const handleSelectWinner = (contractorId: string) => {
    setSelectedWinner(contractorId);
    localStorage.setItem('selectedContractor', contractorId);
    
    const contractor = contractors.find(c => c.id === contractorId);
    toast({
      title: "Contractor selected! 🎉",
      description: `You've selected ${contractor?.name} as your preferred contractor.`,
      duration: 4000,
    });
  };

  const handleExportComparison = () => {
    const selectedContractorData = contractors.find(c => c.id === selectedWinner);
    
    const sections = [
      '=== CONTRACTOR COMPARISON REPORT ===',
      '',
      `Generated: ${new Date().toLocaleDateString()}`,
      `Total Contractors Evaluated: ${contractors.length}`,
      selectedContractorData ? `Selected Contractor: ${selectedContractorData.name}` : '',
      '',
      '=== CONTRACTOR DETAILS ===',
      ''
    ];

    contractors.forEach((contractor, index) => {
      sections.push(`${index + 1}. ${contractor.name.toUpperCase()}`);
      sections.push(`   Contact: ${contractor.contactInfo.phone || 'N/A'}`);
      sections.push(`   Total Cost: ${contractor.costBreakdown.totalCost ? `$${contractor.costBreakdown.totalCost.toLocaleString()}` : 'Not provided'}`);
      sections.push(`   Overall Score: ${contractor.scores.overallScore ? `${contractor.scores.overallScore.toFixed(1)}/5` : 'Not rated'}`);
      sections.push(`   Warranty: ${contractor.warranty.duration || 'Not specified'}`);
      sections.push(`   Timeline: ${contractor.proposedSolution.timeline || 'Not provided'}`);
      
      if (contractor.personalNotes.redFlags && contractor.personalNotes.redFlags.length > 0) {
        sections.push(`   Red Flags: ${contractor.personalNotes.redFlags.length}`);
        contractor.personalNotes.redFlags.forEach(flag => {
          sections.push(`     - ${flag}`);
        });
      }
      
      if (contractor.personalNotes.overallNotes) {
        sections.push(`   Notes: ${contractor.personalNotes.overallNotes}`);
      }
      
      sections.push('');
    });

    if (selectedContractorData) {
      sections.push('=== RECOMMENDATION ===');
      sections.push(`Selected: ${selectedContractorData.name}`);
      sections.push(`Reason: Highest overall score and best fit for project requirements`);
      sections.push('');
    }

    sections.push('---');
    sections.push('Created with The Elite 12: Basement Waterproofing Contractor Screening Guide');

    const content = sections.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contractor-comparison-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report downloaded! 📊",
      description: "Your contractor comparison report has been saved.",
      duration: 3000,
    });
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'form':
        return (
          <ContractorForm
            contractor={editingContractor}
            onSave={handleSaveContractor}
            onCancel={() => {
              setViewMode('list');
              setEditingContractor(undefined);
            }}
          />
        );
      
      case 'details':
        return selectedContractor ? (
          <ContractorDetails
            contractor={selectedContractor}
            onBack={() => setViewMode('list')}
            onEdit={() => {
              setEditingContractor(selectedContractor);
              setViewMode('form');
            }}
          />
        ) : null;
      
      case 'comparison':
        return (
          <ComparisonTable
            contractors={contractors}
            onEditContractor={(contractor) => {
              setEditingContractor(contractor);
              setViewMode('form');
            }}
            onSelectWinner={handleSelectWinner}
            selectedWinner={selectedWinner}
          />
        );
      
      default:
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <h1 className="font-inter-tight font-bold text-4xl md:text-5xl text-black mb-4">
                Contractor Comparison Tool
              </h1>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Organize and compare multiple contractor bids, track their responses to your questions, 
                and make an informed decision based on objective criteria.
              </p>
            </div>

            {/* Quick Stats */}
            {contractors.length > 0 && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-900">{contractors.length}</div>
                      <div className="text-sm text-blue-700">Contractors</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-900">
                        {contractors.filter(c => c.scores.overallScore && c.scores.overallScore >= 4).length}
                      </div>
                      <div className="text-sm text-blue-700">High Rated (4+)</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-900">
                        {contractors.filter(c => c.personalNotes.redFlags && c.personalNotes.redFlags.length === 0).length}
                      </div>
                      <div className="text-sm text-blue-700">No Red Flags</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-900">
                        {contractors.filter(c => c.businessInfo.licenseNumber).length}
                      </div>
                      <div className="text-sm text-blue-700">Licensed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  setEditingContractor(undefined);
                  setViewMode('form');
                }}
                className="bg-black text-white hover:bg-gray-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Contractor
              </Button>
              
              {contractors.length >= 2 && (
                <Button
                  onClick={() => setViewMode('comparison')}
                  variant="outline"
                  className="border-black text-black hover:bg-gray-50"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Compare All ({contractors.length})
                </Button>
              )}
              
              {contractors.length > 0 && (
                <Button
                  onClick={handleExportComparison}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              )}
            </div>

            {/* Contractors Grid */}
            {contractors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contractors.map((contractor) => (
                  <ContractorCard
                    key={contractor.id}
                    contractor={contractor}
                    onEdit={() => {
                      setEditingContractor(contractor);
                      setViewMode('form');
                    }}
                    onDelete={() => handleDeleteContractor(contractor.id)}
                    onViewDetails={() => {
                      setSelectedContractor(contractor);
                      setViewMode('details');
                    }}
                    isSelected={selectedWinner === contractor.id}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Start Building Your Contractor Database
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Add contractors as you interview them. Track their responses, 
                    compare costs and warranties, and make an informed decision.
                  </p>
                  <Button
                    onClick={() => {
                      setEditingContractor(undefined);
                      setViewMode('form');
                    }}
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Contractor
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Help Section */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-black mb-3">💡 How to Use the Contractor Comparison Tool</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <h4 className="font-medium text-black mb-2">Getting Started:</h4>
                    <ul className="space-y-1">
                      <li>• Add each contractor after your initial meeting</li>
                      <li>• Record their responses to the Elite 12 Questions</li>
                      <li>• Input cost breakdowns and warranty details</li>
                      <li>• Rate their communication and professionalism</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-black mb-2">Making Decisions:</h4>
                    <ul className="space-y-1">
                      <li>• Use the comparison table to see all contractors side-by-side</li>
                      <li>• Look for red flags and note any concerning patterns</li>
                      <li>• Consider overall scores alongside your gut feeling</li>
                      <li>• Export your final report for family review</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation Breadcrumb */}
        {viewMode !== 'list' && (
          <div className="mb-6">
            <Button
              onClick={() => setViewMode('list')}
              variant="ghost"
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back to Contractor List
            </Button>
          </div>
        )}

        {renderContent()}
      </main>
    </div>
  );
};

export default ContractorComparison;