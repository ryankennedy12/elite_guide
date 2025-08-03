import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Project } from '@/types/project';
import ProjectList from '@/components/ProjectTracker/ProjectList';
import ProjectForm from '@/components/ProjectTracker/ProjectForm';
import ProjectDetails from '@/components/ProjectTracker/ProjectDetails';
import { useToast } from '@/hooks/use-toast';
import { useContentAccess } from '@/hooks/useContentAccess';

type ViewMode = 'list' | 'form' | 'details';

const ProjectTracker = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();

  useContentAccess();

  useEffect(() => {
    // Load saved projects
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      try {
        const data = JSON.parse(savedProjects);
        setProjects(data.map((p: any) => ({
          ...p,
          startDate: new Date(p.startDate),
          estimatedEndDate: new Date(p.estimatedEndDate),
          actualEndDate: p.actualEndDate ? new Date(p.actualEndDate) : undefined,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
          media: (p.media || []).map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          })),
          milestones: p.milestones.map((m: any) => ({
            ...m,
            dueDate: new Date(m.dueDate),
            completedDate: m.completedDate ? new Date(m.completedDate) : undefined
          }))
        })));
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    }
  }, []);

  // Check for upcoming milestones and show notifications
  useEffect(() => {
    const checkMilestones = () => {
      const now = new Date();
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      
      projects.forEach(project => {
        if (project.status !== 'active') return;
        
        project.milestones.forEach(milestone => {
          if (milestone.status === 'completed') return;
          
          const dueDate = new Date(milestone.dueDate);
          const isOverdue = dueDate < now;
          const isDueTomorrow = dueDate >= now && dueDate <= tomorrow;
          
          if (isOverdue) {
            const daysOverdue = Math.ceil((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
            toast({
              title: "Milestone Overdue",
              description: `"${milestone.title}" in ${project.name} is ${daysOverdue} day${daysOverdue !== 1 ? 's' : ''} overdue.`,
              variant: "destructive",
              duration: 5000,
            });
          } else if (isDueTomorrow) {
            toast({
              title: "Milestone Due Tomorrow",
              description: `"${milestone.title}" in ${project.name} is due tomorrow.`,
              duration: 4000,
            });
          }
        });
      });
    };

    // Check milestones on component mount
    if (projects.length > 0) {
      checkMilestones();
    }
  }, [projects, toast]);

  const saveProjects = (newProjects: Project[]) => {
    localStorage.setItem('projects', JSON.stringify(newProjects));
    setProjects(newProjects);
  };

  const handleSaveProject = (project: Project) => {
    const existingIndex = projects.findIndex(p => p.id === project.id);
    let newProjects: Project[];
    
    if (existingIndex >= 0) {
      newProjects = [...projects];
      newProjects[existingIndex] = project;
      toast({
        title: "Project updated",
        description: `${project.name} has been updated successfully.`,
      });
    } else {
      newProjects = [project, ...projects];
      toast({
        title: "Project created",
        description: `${project.name} has been added to your tracker.`,
      });
    }
    
    saveProjects(newProjects);
    setViewMode('list');
    setEditingProject(undefined);
  };

  const handleDeleteProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    const newProjects = projects.filter(p => p.id !== projectId);
    saveProjects(newProjects);
    
    toast({
      title: "Project deleted",
      description: `${project?.name} has been removed from your tracker.`,
    });
  };

  const handleUpdateProject = (updatedProject: Project) => {
    const newProjects = projects.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    );
    saveProjects(newProjects);
    setSelectedProject(updatedProject);
    
    toast({
      title: "Project updated",
      description: "Changes have been saved successfully.",
      duration: 2000,
    });
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'form':
        return (
          <ProjectForm
            project={editingProject}
            onSave={handleSaveProject}
            onCancel={() => {
              setViewMode('list');
              setEditingProject(undefined);
            }}
          />
        );
      
      case 'details':
        return selectedProject ? (
          <ProjectDetails
            project={selectedProject}
            onBack={() => setViewMode('list')}
            onEdit={() => {
              setEditingProject(selectedProject);
              setViewMode('form');
            }}
            onUpdateProject={handleUpdateProject}
          />
        ) : null;
      
      default:
        return (
          <ProjectList
            projects={projects}
            onAddProject={() => {
              setEditingProject(undefined);
              setViewMode('form');
            }}
            onViewProject={(project) => {
              setSelectedProject(project);
              setViewMode('details');
            }}
            onEditProject={(project) => {
              setEditingProject(project);
              setViewMode('form');
            }}
            onDeleteProject={handleDeleteProject}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default ProjectTracker;