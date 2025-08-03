import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft,
  Calendar,
  User,
  DollarSign,
  Edit,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Target,
  TrendingUp
} from 'lucide-react';
import { Project, Milestone, getProjectProgress, getOverdueMilestones, getUpcomingMilestones, projectTypeLabels } from '@/types/project';

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
  onEdit: () => void;
  onUpdateProject: (project: Project) => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  onBack,
  onEdit,
  onUpdateProject
}) => {
  const [editingMilestone, setEditingMilestone] = useState<string | null>(null);
  const [milestoneNotes, setMilestoneNotes] = useState<Record<string, string>>({});

  const progress = getProjectProgress(project);
  const overdueMilestones = getOverdueMilestones(project);
  const upcomingMilestones = getUpcomingMilestones(project, 7);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysFromNow = (date: Date) => {
    const now = new Date();
    const target = new Date(date);
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const toggleMilestoneStatus = (milestoneId: string) => {
    const updatedMilestones = project.milestones.map(milestone => {
      if (milestone.id === milestoneId) {
        const newStatus = milestone.status === 'completed' ? 'pending' : 'completed';
        return {
          ...milestone,
          status: newStatus,
          completedDate: newStatus === 'completed' ? new Date() : undefined
        };
      }
      return milestone;
    });

    const updatedProject = {
      ...project,
      milestones: updatedMilestones,
      updatedAt: new Date()
    };

    onUpdateProject(updatedProject);
  };

  const updateMilestoneNotes = (milestoneId: string, notes: string) => {
    const updatedMilestones = project.milestones.map(milestone => {
      if (milestone.id === milestoneId) {
        return { ...milestone, notes };
      }
      return milestone;
    });

    const updatedProject = {
      ...project,
      milestones: updatedMilestones,
      updatedAt: new Date()
    };

    onUpdateProject(updatedProject);
    setEditingMilestone(null);
  };

  const getMilestoneStatusColor = (milestone: Milestone) => {
    if (milestone.status === 'completed') return 'text-green-600';
    
    const daysFromNow = getDaysFromNow(milestone.dueDate);
    if (daysFromNow < 0) return 'text-red-600'; // Overdue
    if (daysFromNow <= 3) return 'text-yellow-600'; // Due soon
    return 'text-gray-600';
  };

  const getStatusBadgeColor = (status: Project['status']) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const completedMilestones = project.milestones.filter(m => m.status === 'completed').length;
  const totalPayments = project.milestones
    .filter(m => m.isPaymentMilestone && m.status === 'completed')
    .reduce((sum, m) => sum + (m.paymentAmount || 0), 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-gray-600">{projectTypeLabels[project.projectType]}</p>
          </div>
        </div>
        <Button onClick={onEdit} className="bg-black text-white hover:bg-gray-800">
          <Edit className="w-4 h-4 mr-2" />
          Edit Project
        </Button>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status & Progress */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5" />
              Project Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge className={getStatusBadgeColor(project.status)}>
                {project.status.replace('-', ' ')}
              </Badge>
              <span className="text-sm text-gray-600">
                {completedMilestones}/{project.milestones.length} milestones
              </span>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-gray-600">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Start Date:</span>
                <span className="font-medium">{formatDate(project.startDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Est. End Date:</span>
                <span className="font-medium">{formatDate(project.estimatedEndDate)}</span>
              </div>
              {project.actualEndDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Actual End:</span>
                  <span className="font-medium">{formatDate(project.actualEndDate)}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Financial Overview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Financial Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Cost:</span>
                <span className="font-medium">
                  {project.totalCost ? `$${project.totalCost.toLocaleString()}` : 'Not set'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Paid to Date:</span>
                <span className="font-medium">
                  ${(project.paidAmount || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Remaining:</span>
                <span className="font-medium">
                  ${((project.totalCost || 0) - (project.paidAmount || 0)).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Milestones:</span>
                <span className="font-medium">
                  ${totalPayments.toLocaleString()} completed
                </span>
              </div>
            </div>

            {project.totalCost && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Payment Progress</span>
                  <span className="text-sm text-gray-600">
                    {Math.round(((project.paidAmount || 0) / project.totalCost) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={((project.paidAmount || 0) / project.totalCost) * 100} 
                  className="h-2" 
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contractor Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5" />
              Contractor Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm text-gray-600">Company:</span>
              <p className="font-medium">{project.contractorName || 'Not specified'}</p>
            </div>
            
            {project.description && (
              <div>
                <span className="text-sm text-gray-600">Project Description:</span>
                <p className="text-sm text-gray-800 mt-1 leading-relaxed">{project.description}</p>
              </div>
            )}

            {project.notes && (
              <div>
                <span className="text-sm text-gray-600">Notes:</span>
                <p className="text-sm text-gray-800 mt-1 leading-relaxed">{project.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(overdueMilestones.length > 0 || upcomingMilestones.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {overdueMilestones.length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-red-800">Overdue Milestones</h3>
                </div>
                <div className="space-y-2">
                  {overdueMilestones.map(milestone => (
                    <div key={milestone.id} className="text-sm">
                      <span className="font-medium text-red-700">{milestone.title}</span>
                      <span className="text-red-600 ml-2">
                        ({Math.abs(getDaysFromNow(milestone.dueDate))} days overdue)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {upcomingMilestones.length > 0 && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-semibold text-yellow-800">Upcoming Milestones</h3>
                </div>
                <div className="space-y-2">
                  {upcomingMilestones.map(milestone => (
                    <div key={milestone.id} className="text-sm">
                      <span className="font-medium text-yellow-700">{milestone.title}</span>
                      <span className="text-yellow-600 ml-2">
                        ({getDaysFromNow(milestone.dueDate)} days)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Milestones Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Project Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {project.milestones.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No milestones defined for this project.</p>
                <Button onClick={onEdit} variant="outline" className="mt-4">
                  Add Milestones
                </Button>
              </div>
            ) : (
              project.milestones
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .map((milestone, index) => {
                  const daysFromNow = getDaysFromNow(milestone.dueDate);
                  const isOverdue = milestone.status !== 'completed' && daysFromNow < 0;
                  const isDueSoon = milestone.status !== 'completed' && daysFromNow >= 0 && daysFromNow <= 3;
                  
                  return (
                    <div key={milestone.id} className="relative">
                      {/* Timeline connector */}
                      {index < project.milestones.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200"></div>
                      )}
                      
                      <div className={`flex items-start gap-4 p-4 rounded-lg border ${
                        milestone.status === 'completed' 
                          ? 'bg-green-50 border-green-200' 
                          : isOverdue 
                          ? 'bg-red-50 border-red-200'
                          : isDueSoon
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-white border-gray-200'
                      }`}>
                        {/* Status Indicator */}
                        <div className="flex-shrink-0 mt-1">
                          <Checkbox
                            checked={milestone.status === 'completed'}
                            onCheckedChange={() => toggleMilestoneStatus(milestone.id)}
                            className="h-5 w-5"
                          />
                        </div>

                        {/* Milestone Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className={`font-semibold ${
                                milestone.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
                              }`}>
                                {milestone.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {milestone.category.replace('-', ' ')}
                                </Badge>
                                {milestone.isPaymentMilestone && (
                                  <Badge className="text-xs bg-green-100 text-green-800">
                                    Payment: ${milestone.paymentAmount?.toLocaleString()}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className={`text-sm font-medium ${getMilestoneStatusColor(milestone)}`}>
                                {formatDate(milestone.dueDate)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {milestone.status === 'completed' 
                                  ? 'Completed'
                                  : daysFromNow === 0 
                                  ? 'Due today'
                                  : daysFromNow < 0 
                                  ? `${Math.abs(daysFromNow)} days overdue`
                                  : `${daysFromNow} days remaining`
                                }
                              </div>
                            </div>
                          </div>

                          {milestone.description && (
                            <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                          )}

                          {milestone.completedDate && (
                            <div className="text-xs text-green-600 mb-2">
                              ✓ Completed on {formatDate(milestone.completedDate)}
                            </div>
                          )}

                          {/* Notes Section */}
                          <div className="mt-3">
                            {editingMilestone === milestone.id ? (
                              <div className="space-y-2">
                                <Textarea
                                  value={milestoneNotes[milestone.id] || milestone.notes || ''}
                                  onChange={(e) => setMilestoneNotes({
                                    ...milestoneNotes,
                                    [milestone.id]: e.target.value
                                  })}
                                  placeholder="Add notes about this milestone..."
                                  className="text-sm"
                                  rows={3}
                                />
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => updateMilestoneNotes(
                                      milestone.id, 
                                      milestoneNotes[milestone.id] || milestone.notes || ''
                                    )}
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    onClick={() => setEditingMilestone(null)}
                                    size="sm"
                                    variant="outline"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                {milestone.notes ? (
                                  <div className="bg-gray-50 p-2 rounded text-sm text-gray-700 mb-2">
                                    {milestone.notes}
                                  </div>
                                ) : null}
                                <Button
                                  onClick={() => {
                                    setEditingMilestone(milestone.id);
                                    setMilestoneNotes({
                                      ...milestoneNotes,
                                      [milestone.id]: milestone.notes || ''
                                    });
                                  }}
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                                >
                                  <FileText className="w-3 h-3 mr-1" />
                                  {milestone.notes ? 'Edit notes' : 'Add notes'}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Project Summary */}
      {project.status === 'completed' && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-800">Project Completed Successfully!</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-medium text-green-800">Duration</div>
                <div className="text-green-700">
                  {project.actualEndDate 
                    ? Math.ceil((new Date(project.actualEndDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24))
                    : 'N/A'
                  } days
                </div>
              </div>
              <div>
                <div className="font-medium text-green-800">Final Cost</div>
                <div className="text-green-700">
                  ${(project.totalCost || 0).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="font-medium text-green-800">Milestones</div>
                <div className="text-green-700">
                  {completedMilestones}/{project.milestones.length} completed
                </div>
              </div>
              <div>
                <div className="font-medium text-green-800">Contractor</div>
                <div className="text-green-700">
                  {project.contractorName || 'N/A'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectDetails;