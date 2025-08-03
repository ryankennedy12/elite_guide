export interface Milestone {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  category: 'preparation' | 'excavation' | 'installation' | 'inspection' | 'payment' | 'cleanup' | 'warranty';
  notes?: string;
  completedDate?: Date;
  isPaymentMilestone?: boolean;
  paymentAmount?: number;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  contractorId?: string; // Links to contractor from comparison tool
  contractorName?: string; // Fallback if no contractor ID
  startDate: Date;
  estimatedEndDate: Date;
  actualEndDate?: Date;
  status: 'planning' | 'active' | 'completed' | 'on-hold' | 'cancelled';
  milestones: Milestone[];
  totalCost?: number;
  paidAmount?: number;
  projectType: 'interior-waterproofing' | 'exterior-waterproofing' | 'sump-pump' | 'foundation-repair' | 'drainage' | 'other';
  notes?: string;
  media?: MediaItem[]; // Photos, documents, and other files
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'pdf' | 'document' | 'video';
  caption: string;
  timestamp: Date;
  category?: 'before' | 'during' | 'after' | 'warranty' | 'invoice' | 'permit' | 'other';
  tags?: string[];
  projectPhase?: string; // Links to milestone or project phase
}

export const mediaTypes = [
  'image',
  'pdf', 
  'document',
  'video'
] as const;

export const mediaCategories = [
  'before',
  'during',
  'after',
  'warranty',
  'invoice',
  'permit',
  'other'
] as const;

export const mediaCategoryLabels = {
  'before': 'Before Work',
  'during': 'During Work',
  'after': 'After Completion',
  'warranty': 'Warranty Documents',
  'invoice': 'Invoices & Receipts',
  'permit': 'Permits & Approvals',
  'other': 'Other'
};

export const mediaTypeLabels = {
  'image': 'Photo/Image',
  'pdf': 'PDF Document',
  'document': 'Document',
  'video': 'Video'
};

export const milestoneCategories = [
  'preparation',
  'excavation', 
  'installation',
  'inspection',
  'payment',
  'cleanup',
  'warranty'
] as const;

export const projectTypes = [
  'interior-waterproofing',
  'exterior-waterproofing', 
  'sump-pump',
  'foundation-repair',
  'drainage',
  'other'
] as const;

export const projectTypeLabels = {
  'interior-waterproofing': 'Interior Waterproofing',
  'exterior-waterproofing': 'Exterior Waterproofing',
  'sump-pump': 'Sump Pump Installation',
  'foundation-repair': 'Foundation Repair',
  'drainage': 'Drainage System',
  'other': 'Other'
};

export const milestoneTemplates = {
  'interior-waterproofing': [
    { title: 'Initial Site Preparation', category: 'preparation', daysFromStart: 0 },
    { title: 'Basement Clearing & Protection', category: 'preparation', daysFromStart: 1 },
    { title: 'Concrete Cutting & Excavation', category: 'excavation', daysFromStart: 2 },
    { title: 'Drain Tile Installation', category: 'installation', daysFromStart: 3 },
    { title: 'Sump Pump Installation', category: 'installation', daysFromStart: 4 },
    { title: 'Concrete Restoration', category: 'installation', daysFromStart: 5 },
    { title: 'System Testing', category: 'inspection', daysFromStart: 6 },
    { title: 'Final Cleanup', category: 'cleanup', daysFromStart: 7 },
    { title: 'Final Payment', category: 'payment', daysFromStart: 7, isPayment: true },
    { title: 'Warranty Documentation', category: 'warranty', daysFromStart: 8 }
  ],
  'sump-pump': [
    { title: 'Site Assessment & Preparation', category: 'preparation', daysFromStart: 0 },
    { title: 'Basin Excavation', category: 'excavation', daysFromStart: 1 },
    { title: 'Pump Installation', category: 'installation', daysFromStart: 1 },
    { title: 'Discharge Line Setup', category: 'installation', daysFromStart: 2 },
    { title: 'System Testing & Calibration', category: 'inspection', daysFromStart: 2 },
    { title: 'Final Payment', category: 'payment', daysFromStart: 2, isPayment: true },
    { title: 'Warranty & Maintenance Guide', category: 'warranty', daysFromStart: 3 }
  ]
};

export const getProjectProgress = (project: Project): number => {
  if (project.milestones.length === 0) return 0;
  const completedMilestones = project.milestones.filter(m => m.status === 'completed').length;
  return Math.round((completedMilestones / project.milestones.length) * 100);
};

export const getOverdueMilestones = (project: Project): Milestone[] => {
  const now = new Date();
  return project.milestones.filter(m => 
    m.status !== 'completed' && new Date(m.dueDate) < now
  );
};

export const getUpcomingMilestones = (project: Project, days: number = 7): Milestone[] => {
  const now = new Date();
  const futureDate = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
  
  return project.milestones.filter(m => 
    m.status !== 'completed' && 
    new Date(m.dueDate) >= now && 
    new Date(m.dueDate) <= futureDate
  );
};