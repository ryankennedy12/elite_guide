import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Calendar, 
  User, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Image,
  FileText
} from 'lucide-react';
import { Project, getProjectProgress, getOverdueMilestones, projectTypeLabels } from '@/types/project';

interface ProjectListProps {
  projects: Project[];
  onAddProject: () => void;
  onViewProject: (project: Project) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onAddProject,
  onViewProject,
  onEditProject,
  onDeleteProject
}) => {
  const getStatusColor = (status: Project['status']) => {
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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const getDaysRemaining = (endDate: Date) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-inter-tight font-bold text-3xl md:text-4xl text-black mb-2">
            Project Timeline Tracker
          </h1>
          <p className="text-gray-600">
            Manage your waterproofing projects from start to finish
          </p>
        </div>
        <Button
          onClick={onAddProject}
          className="bg-black text-white hover:bg-gray-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const progress = getProjectProgress(project);
            const overdueMilestones = getOverdueMilestones(project);
            const daysRemaining = getDaysRemaining(project.estimatedEndDate);
            
            return (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                        {project.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status.replace('-', ' ')}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {projectTypeLabels[project.projectType]}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        onClick={() => onEditProject(project)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => onDeleteProject(project.id)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                  {/* Media Count */}
                  {project.media && project.media.length > 0 && (
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                      <div className="flex items-center gap-1">
                        <Image className="w-3 h-3" />
                        <span>{project.media.filter(m => m.type === 'image').length} photos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>{project.media.filter(m => m.type === 'pdf' || m.type === 'document').length} docs</span>
                      </div>
                    </div>
                  )}


                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-600">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Key Info */}
                  <div className="space-y-2 text-sm">
                    {project.contractorName && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{project.contractorName}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">
                        {formatDate(project.startDate)} - {formatDate(project.estimatedEndDate)}
                      </span>
                    </div>

                    {project.totalCost && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">
                          ${project.totalCost.toLocaleString()}
                        </span>
                      </div>
                    )}

                    {/* Timeline Status */}
                    {project.status === 'active' && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className={`text-sm ${
                          daysRemaining < 0 ? 'text-red-600' : 
                          daysRemaining <= 3 ? 'text-yellow-600' : 'text-gray-700'
                        }`}>
                          {daysRemaining < 0 
                            ? `${Math.abs(daysRemaining)} days overdue`
                            : daysRemaining === 0 
                            ? 'Due today'
                            : `${daysRemaining} days remaining`
                          }
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Alerts */}
                  {overdueMilestones.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded p-2">
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="text-red-700 text-xs font-medium">
                          {overdueMilestones.length} overdue milestone{overdueMilestones.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  )}

                  {project.status === 'completed' && (
                    <div className="bg-green-50 border border-green-200 rounded p-2">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-green-700 text-xs font-medium">
                          Project completed successfully!
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button
                    onClick={() => onViewProject(project)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start Tracking Your First Project
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Once you've hired a contractor, create a project to track milestones, 
              payments, and progress from start to finish.
            </p>
            <Button
              onClick={onAddProject}
              className="bg-black text-white hover:bg-gray-800"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Project
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      {projects.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-900 mb-4">Project Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-medium text-blue-800">Total Projects</div>
                <div className="text-blue-700 text-lg font-semibold">{projects.length}</div>
              </div>
              <div>
                <div className="font-medium text-blue-800">Active</div>
                <div className="text-blue-700 text-lg font-semibold">
                  {projects.filter(p => p.status === 'active').length}
                </div>
              </div>
              <div>
                <div className="font-medium text-blue-800">Completed</div>
                <div className="text-blue-700 text-lg font-semibold">
                  {projects.filter(p => p.status === 'completed').length}
                </div>
              </div>
              <div>
                <div className="font-medium text-blue-800">Total Investment</div>
                <div className="text-blue-700 text-lg font-semibold">
                  ${projects.reduce((sum, p) => sum + (p.totalCost || 0), 0).toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectList;