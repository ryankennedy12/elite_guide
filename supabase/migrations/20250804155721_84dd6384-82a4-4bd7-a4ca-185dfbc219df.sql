-- Create trade_content table for managing dynamic content
CREATE TABLE public.trade_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trade trade_type NOT NULL,
  content_type TEXT NOT NULL, -- 'hero', 'cheat_sheet', 'elite_12', 'faq', etc.
  content_key TEXT NOT NULL, -- specific identifier like 'title', 'description', 'question_1'
  content_value TEXT NOT NULL, -- the actual content
  metadata JSONB DEFAULT '{}', -- additional data like order, category, etc.
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  
  UNIQUE(trade, content_type, content_key)
);

-- Create trade_questions table for dynamic question banks
CREATE TABLE public.trade_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trade trade_type NOT NULL,
  category TEXT NOT NULL, -- 'diagnostic', 'system', 'risk', etc.
  question TEXT NOT NULL,
  pro_tip TEXT NOT NULL,
  red_flag TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}', -- tags, difficulty, etc.
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.trade_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trade_questions ENABLE ROW LEVEL SECURITY;

-- RLS policies for trade_content
CREATE POLICY "Anyone can view active content" 
ON public.trade_content 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Service role can manage content" 
ON public.trade_content 
FOR ALL 
USING (true)
WITH CHECK (true);

-- RLS policies for trade_questions  
CREATE POLICY "Anyone can view active questions" 
ON public.trade_questions 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Service role can manage questions" 
ON public.trade_questions 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_trade_content_lookup ON public.trade_content(trade, content_type, is_active);
CREATE INDEX idx_trade_questions_lookup ON public.trade_questions(trade, category, is_active);
CREATE INDEX idx_trade_questions_order ON public.trade_questions(trade, category, order_index);

-- Create triggers for updated_at
CREATE TRIGGER update_trade_content_updated_at
  BEFORE UPDATE ON public.trade_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_trade_questions_updated_at
  BEFORE UPDATE ON public.trade_questions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();