import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Save, X, Plus, Minus } from 'lucide-react';
import { Project, Milestone, projectTypes, projectTypeLabels, milestoneCategories, milestoneTemplates } from '@/types/project';
import { Contractor } from '@/types/contractor';

interface ProjectFormProps {
  project?: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSave,
  onCancel
}) => {
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [formData, setFormData] = useState<Project>(() => {
    if (project) return project;
    
    return {
      id: '',
      name: '',
      description: '',
      contractorId: '',
      contractorName: '',
      startDate: new Date(),
      estimatedEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      status: 'planning',
      milestones: [],
      projectType: 'interior-waterproofing',
      totalCost: 0,
      paidAmount: 0,
      notes: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  });

  useEffect(() => {
    // Load contractors from localStorage
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

  const handleContractorChange = (contractorId: string) => {
    const selectedContractor = contractors.find(c => c.id === contractorId);
    updateFormData('contractorId', contractorId);
    updateFormData('contractorName', selectedContractor?.name || '');
    
    // Auto-populate cost if available
    if (selectedContractor?.costBreakdown.totalCost) {
      updateFormData('totalCost', selectedContractor.costBreakdown.totalCost);
    }
  };

  const generateMilestones = () => {
    const template = milestoneTemplates[formData.projectType as keyof typeof milestoneTemplates];
    if (!template) return;

    const startDate = new Date(formData.startDate);
    const newMilestones: Milestone[] = template.map((milestone, index) => {
      const dueDate = new Date(startDate);
      dueDate.setDate(startDate.getDate() + milestone.daysFromStart);
      
      return {
        id: `milestone-${Date.now()}-${index}`,
        title: milestone.title,
        description: '',
        dueDate,
        status: 'pending',
        category: milestone.category as Milestone['category'],
        isPaymentMilestone: milestone.isPayment || false,
        paymentAmount: milestone.isPayment ? (formData.totalCost || 0) * 0.25 : undefined
      };
    });

    updateFormData('milestones', newMilestones);
  };

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: `milestone-${Date.now()}`,
      title: '',
      description: '',
      dueDate: new Date(),
      status: 'pending',
      category: 'installation'
    };
    
    updateFormData('milestones', [...formData.milestones, newMilestone]);
  };

  const updateMilestone = (index: number, updates: Partial<Milestone>) => {
    const newMilestones = [...formData.milestones];
    newMilestones[index] = { ...newMilestones[index], ...updates };
    updateFormData('milestones', newMilestones);
  };

  const removeMilestone = (index: number) => {
    const newMilestones = formData.milestones.filter((_, i) => i !== index);
    updateFormData('milestones', newMilestones);
  };

  const handleSave = () => {
    const projectToSave: Project = {
      ...formData,
      id: formData.id || Date.now().toString(),
      updatedAt: new Date()
    };
    
    onSave(projectToSave);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">
              {project ? 'Edit Project' : 'Create New Project'}
            </CardTitle>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-black text-white hover:bg-gray-800">
                <Save className="w-4 h-4 mr-2" />
                Save Project
              </Button>
              <Button onClick={onCancel} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Basement Waterproofing Project"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="projectType">Project Type</Label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value) => updateFormData('projectType', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {projectTypeLabels[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="contractor">Contractor</Label>
                <Select
                  value={formData.contractorId || ''}
                  onValueChange={handleContractorChange}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a contractor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No contractor selected</SelectItem>
                    {contractors.map(contractor => (
                      <SelectItem key={contractor.id} value={contractor.id}>
                        {contractor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!formData.contractorId && (
                  <Input
                    value={formData.contractorName || ''}
                    onChange={(e) => updateFormData('contractorName', e.target.value)}
                    placeholder="Or enter contractor name manually"
                    className="mt-2"
                  />
                )}
              </div>

              <div>
                <Label htmlFor="status">Project Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => updateFormData('status', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate.toISOString().split('T')[0]}
                  onChange={(e) => updateFormData('startDate', new Date(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="estimatedEndDate">Estimated End Date</Label>
                <Input
                  id="estimatedEndDate"
                  type="date"
                  value={formData.estimatedEndDate.toISOString().split('T')[0]}
                  onChange={(e) => updateFormData('estimatedEndDate', new Date(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="totalCost">Total Project Cost</Label>
                <Input
                  id="totalCost"
                  type="number"
                  value={formData.totalCost || ''}
                  onChange={(e) => updateFormData('totalCost', parseFloat(e.target.value) || 0)}
                  placeholder="15000"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="paidAmount">Amount Paid So Far</Label>
                <Input
                  id="paidAmount"
                  type="number"
                  value={formData.paidAmount || ''}
                  onChange={(e) => updateFormData('paidAmount', parseFloat(e.target.value) || 0)}
                  placeholder="5000"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder="Brief description of the work being performed..."
              className="mt-1"
            />
          </div>

          {/* Milestones Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-lg font-semibold">Project Milestones</Label>
              <div className="flex gap-2">
                <Button
                  onClick={generateMilestones}
                  variant="outline"
                  size="sm"
                  disabled={formData.milestones.length > 0}
                >
                  Generate Template
                </Button>
                <Button
                  onClick={addMilestone}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Milestone
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {formData.milestones.map((milestone, index) => (
                <Card key={milestone.id} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm">Title</Label>
                      <Input
                        value={milestone.title}
                        onChange={(e) => updateMilestone(index, { title: e.target.value })}
                        placeholder="Milestone title"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm">Due Date</Label>
                      <Input
                        type="date"
                        value={new Date(milestone.dueDate).toISOString().split('T')[0]}
                        onChange={(e) => updateMilestone(index, { dueDate: new Date(e.target.value) })}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm">Category</Label>
                      <Select
                        value={milestone.category}
                        onValueChange={(value) => updateMilestone(index, { category: value as Milestone['category'] })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {milestoneCategories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category.replace('-', ' ')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-end gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`payment-${index}`}
                          checked={milestone.isPaymentMilestone || false}
                          onCheckedChange={(checked) => updateMilestone(index, { isPaymentMilestone: checked as boolean })}
                        />
                        <Label htmlFor={`payment-${index}`} className="text-sm">Payment</Label>
                      </div>
                      <Button
                        onClick={() => removeMilestone(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {milestone.isPaymentMilestone && (
                    <div className="mt-3">
                      <Label className="text-sm">Payment Amount</Label>
                      <Input
                        type="number"
                        value={milestone.paymentAmount || ''}
                        onChange={(e) => updateMilestone(index, { paymentAmount: parseFloat(e.target.value) || 0 })}
                        placeholder="Payment amount"
                        className="mt-1 max-w-xs"
                      />
                    </div>
                  )}
                  
                  <div className="mt-3">
                    <Label className="text-sm">Description</Label>
                    <Textarea
                      value={milestone.description || ''}
                      onChange={(e) => updateMilestone(index, { description: e.target.value })}
                      placeholder="Milestone description or notes..."
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                </Card>
              ))}
              
              {formData.milestones.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500 mb-4">No milestones added yet</p>
                  <div className="flex gap-2 justify-center">
                    <Button
                      onClick={generateMilestones}
                      variant="outline"
                      size="sm"
                    >
                      Generate Template Milestones
                    </Button>
                    <Button
                      onClick={addMilestone}
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Custom Milestone
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Project Notes */}
          <div>
            <Label htmlFor="notes">Project Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => updateFormData('notes', e.target.value)}
              placeholder="Additional notes, concerns, or important details about this project..."
              className="mt-1"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectForm;