-- Create enum for supported trades
CREATE TYPE public.trade_type AS ENUM (
  'waterproofing',
  'hvac',
  'roofing', 
  'electrical',
  'plumbing',
  'general_contractor',
  'flooring',
  'painting',
  'landscaping',
  'windows_doors'
);

-- Add trade column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN primary_trade trade_type DEFAULT 'waterproofing',
ADD COLUMN interested_trades trade_type[] DEFAULT ARRAY['waterproofing']::trade_type[];

-- Add trade columns to projects table
ALTER TABLE public.projects 
ADD COLUMN trade trade_type DEFAULT 'waterproofing';

-- Add trade specialties to contractors table
ALTER TABLE public.contractors 
ADD COLUMN trade_specialties trade_type[] DEFAULT ARRAY['waterproofing']::trade_type[];

-- Create index for trade-based queries
CREATE INDEX idx_profiles_primary_trade ON public.profiles(primary_trade);
CREATE INDEX idx_projects_trade ON public.projects(trade);
CREATE INDEX idx_contractors_trade_specialties ON public.contractors USING GIN(trade_specialties);

-- Update existing records to have waterproofing as default
UPDATE public.profiles SET primary_trade = 'waterproofing', interested_trades = ARRAY['waterproofing']::trade_type[] WHERE primary_trade IS NULL;
UPDATE public.projects SET trade = 'waterproofing' WHERE trade IS NULL;
UPDATE public.contractors SET trade_specialties = ARRAY['waterproofing']::trade_type[] WHERE trade_specialties IS NULL;