export interface Contractor {
  id: string;
  name: string;
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
    website?: string;
  };
  businessInfo: {
    licenseNumber?: string;
    insuranceProvider?: string;
    yearsInBusiness?: number;
    bbbRating?: string;
    googleRating?: number;
  };
  proposedSolution: {
    systemType?: string;
    materials?: string[];
    scopeOfWork?: string;
    timeline?: string;
    startDate?: string;
  };
  costBreakdown: {
    laborCost?: number;
    materialsCost?: number;
    permitsCost?: number;
    totalCost?: number;
    paymentSchedule?: string;
    additionalFees?: { name: string; cost: number }[];
  };
  warranty: {
    duration?: string;
    coverage?: string;
    exclusions?: string;
    transferable?: boolean;
    emergencyResponse?: string;
  };
  questionResponses: {
    elite12Responses?: Record<string, { answer: string; rating: number; notes?: string }>;
    customResponses?: Record<string, { answer: string; rating: number; notes?: string }>;
  };
  references: {
    provided?: { name: string; contact: string; project: string }[];
    verified?: boolean;
    reviewSources?: { platform: string; rating: number; url?: string }[];
  };
  personalNotes: {
    firstImpression?: string;
    communication?: string;
    professionalism?: string;
    redFlags?: string[];
    positives?: string[];
    overallNotes?: string;
  };
  scores: {
    costScore?: number;
    warrantyScore?: number;
    expertiseScore?: number;
    communicationScore?: number;
    overallScore?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ContractorComparison {
  contractors: Contractor[];
  criteria: {
    costWeight: number;
    warrantyWeight: number;
    expertiseWeight: number;
    communicationWeight: number;
  };
  notes: string;
  recommendation?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const contractorScoreLabels = {
  1: 'Poor',
  2: 'Below Average', 
  3: 'Average',
  4: 'Good',
  5: 'Excellent'
};

export const defaultCriteria = {
  costWeight: 25,
  warrantyWeight: 25,
  expertiseWeight: 30,
  communicationWeight: 20
};