import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import type { Project, Milestone } from '@/types/project';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load projects from database
  const loadProjects = async () => {
    if (!user) {
      setProjects([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Load projects with milestones and media
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select(`
          *,
          milestones (*),
          project_media (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (projectsError) {
        console.error('Error loading projects:', projectsError);
        toast({
          title: "Error loading projects",
          description: "Please try refreshing the page.",
          variant: "destructive",
        });
        return;
      }

      // Transform database data to match the Project type
      const transformedProjects: Project[] = (projectsData || []).map(project => ({
        id: project.id,
        name: project.name,
        description: project.description,
        contractorId: project.contractor_id,
        contractorName: project.contractor_name || '',
        startDate: project.start_date ? new Date(project.start_date) : new Date(),
        estimatedEndDate: project.end_date ? new Date(project.end_date) : new Date(),
        actualEndDate: undefined, // This would need to be tracked separately
        status: project.status as Project['status'],
        projectType: project.project_type as Project['projectType'],
        totalCost: project.total_cost ? Number(project.total_cost) : undefined,
        paidAmount: project.paid_amount ? Number(project.paid_amount) : 0,
        notes: project.notes,
        milestones: project.milestones.map((milestone: any) => ({
          id: milestone.id,
          title: milestone.title,
          description: milestone.description,
          dueDate: new Date(milestone.due_date),
          status: milestone.status,
          category: milestone.category,
          notes: milestone.notes,
          isPaymentMilestone: milestone.is_payment_milestone || false,
          paymentAmount: milestone.payment_amount ? Number(milestone.payment_amount) : undefined,
          completedDate: milestone.completed_date ? new Date(milestone.completed_date) : undefined,
        })),
        media: project.project_media.map((media: any) => ({
          id: media.id,
          url: media.url,
          type: media.type,
          caption: media.caption,
          category: media.category,
          timestamp: new Date(media.created_at),
        })),
        createdAt: new Date(project.created_at),
        updatedAt: new Date(project.updated_at),
      }));

      setProjects(transformedProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast({
        title: "Error loading projects",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Save project to database
  const saveProject = async (project: Project) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save projects.",
        variant: "destructive",
      });
      return;
    }

    try {
      const isNewProject = !project.id || project.id.includes('temp-');
      
      const projectData = {
        user_id: user.id,
        name: project.name,
        description: project.description,
        contractor_id: project.contractorId || null,
        contractor_name: project.contractorName,
        project_type: project.projectType,
        status: project.status,
        start_date: project.startDate?.toISOString().split('T')[0] || null,
        end_date: project.estimatedEndDate?.toISOString().split('T')[0] || null,
        total_cost: project.totalCost || null,
        paid_amount: project.paidAmount || 0,
        notes: project.notes || null,
      };

      let savedProjectId: string;

      if (isNewProject) {
        // Create new project
        const { data, error } = await supabase
          .from('projects')
          .insert(projectData)
          .select()
          .single();

        if (error) throw error;
        savedProjectId = data.id;

        toast({
          title: "Project created",
          description: "Your project has been saved successfully.",
        });
      } else {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', project.id);

        if (error) throw error;
        savedProjectId = project.id;

        toast({
          title: "Project updated",
          description: "Your changes have been saved successfully.",
        });
      }

      // Save milestones
      if (project.milestones && project.milestones.length > 0) {
        // Delete existing milestones if updating
        if (!isNewProject) {
          await supabase
            .from('milestones')
            .delete()
            .eq('project_id', savedProjectId);
        }

        // Insert new milestones
        const milestonesData = project.milestones.map(milestone => ({
          project_id: savedProjectId,
          title: milestone.title,
          description: milestone.description,
          due_date: milestone.dueDate.toISOString().split('T')[0],
          status: milestone.status,
          category: milestone.category,
          notes: milestone.notes,
          is_payment_milestone: milestone.isPaymentMilestone || false,
          payment_amount: milestone.paymentAmount || null,
          completed_date: milestone.completedDate?.toISOString() || null,
        }));

        const { error: milestonesError } = await supabase
          .from('milestones')
          .insert(milestonesData);

        if (milestonesError) {
          console.error('Error saving milestones:', milestonesError);
          // Don't fail the whole save for milestone errors
        }
      }

      // Reload projects to get the updated data
      await loadProjects();

    } catch (error: any) {
      console.error('Error saving project:', error);
      toast({
        title: "Error saving project",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Delete project
  const deleteProject = async (projectId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Project deleted",
        description: "The project has been removed successfully.",
      });

      // Reload projects
      await loadProjects();

    } catch (error: any) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error deleting project",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Update project milestone
  const updateProjectMilestone = async (projectId: string, milestoneId: string, updates: Partial<Milestone>) => {
    if (!user) return;

    try {
      const updateData: any = {};
      
      if (updates.status !== undefined) updateData.status = updates.status;
      if (updates.notes !== undefined) updateData.notes = updates.notes;
      if (updates.completedDate !== undefined) {
        updateData.completed_date = updates.completedDate?.toISOString() || null;
      }

      const { error } = await supabase
        .from('milestones')
        .update(updateData)
        .eq('id', milestoneId);

      if (error) throw error;

      // Reload projects to get updated data
      await loadProjects();

    } catch (error: any) {
      console.error('Error updating milestone:', error);
      toast({
        title: "Error updating milestone",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Load projects when user changes
  useEffect(() => {
    loadProjects();
  }, [user]);

  return {
    projects,
    loading,
    saveProject,
    deleteProject,
    updateProjectMilestone,
    loadProjects,
  };
};