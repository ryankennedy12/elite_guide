/*
  # Comprehensive Database Schema for Elite 12 Waterproofing Guide

  1. New Tables
    - `users` - User profiles and preferences
    - `contractors` - Contractor information and evaluations
    - `contractor_responses` - Responses to Elite 12 questions
    - `custom_questions` - User-generated questions
    - `notes` - User notes and observations
    - `reminders` - Maintenance and follow-up reminders
    - `documents` - File attachments for contractors
    - `feedback` - User feedback and ratings (if not exists)
    - `survey_responses` - Survey data collection (if not exists)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Allow anonymous feedback and survey submissions

  3. Features Enabled
    - Complete contractor comparison and evaluation
    - Custom question generation and tracking
    - Document management with file references
    - Reminder and maintenance tracking
    - User feedback collection
*/

-- Create users table for user profiles
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contractors table
CREATE TABLE IF NOT EXISTS contractors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  contact_info JSONB DEFAULT '{}',
  business_info JSONB DEFAULT '{}',
  proposed_solution JSONB DEFAULT '{}',
  cost_breakdown JSONB DEFAULT '{}',
  warranty JSONB DEFAULT '{}',
  references JSONB DEFAULT '{}',
  personal_notes JSONB DEFAULT '{}',
  scores JSONB DEFAULT '{}',
  is_selected BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contractor responses table for Elite 12 questions
CREATE TABLE IF NOT EXISTS contractor_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contractor_id UUID REFERENCES contractors(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  question_text TEXT NOT NULL,
  answer TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,
  response_type TEXT DEFAULT 'elite12' CHECK (response_type IN ('elite12', 'custom')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create custom questions table
CREATE TABLE IF NOT EXISTS custom_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  category TEXT,
  pro_tip TEXT,
  red_flag TEXT,
  is_starred BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create notes table
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  contractor_id UUID REFERENCES contractors(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  note_type TEXT DEFAULT 'custom-question' CHECK (note_type IN ('custom-question', 'contractor-response', 'personal-observation', 'action-item')),
  contractor_name TEXT,
  follow_up_notes TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reminders table
CREATE TABLE IF NOT EXISTS reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  contractor_id UUID REFERENCES contractors(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  reminder_date DATE NOT NULL,
  reminder_time TIME,
  reminder_type TEXT DEFAULT 'maintenance' CHECK (reminder_type IN ('warranty', 'maintenance', 'follow-up', 'inspection', 'custom')),
  is_completed BOOLEAN DEFAULT FALSE,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_pattern TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create documents table for file management
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  contractor_id UUID REFERENCES contractors(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  storage_path TEXT NOT NULL,
  document_type TEXT DEFAULT 'contract' CHECK (document_type IN ('contract', 'bid', 'photo', 'inspection', 'warranty', 'permit', 'other')),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create feedback table if it doesn't exist
CREATE TABLE IF NOT EXISTS feedback (
  id SERIAL PRIMARY KEY,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT,
  user_agent TEXT,
  page_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create survey responses table if it doesn't exist
CREATE TABLE IF NOT EXISTS survey_responses (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  session_id TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE contractor_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create policies for contractors table
CREATE POLICY "Users can read own contractors"
  ON contractors
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own contractors"
  ON contractors
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own contractors"
  ON contractors
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own contractors"
  ON contractors
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for contractor responses table
CREATE POLICY "Users can read own contractor responses"
  ON contractor_responses
  FOR SELECT
  TO authenticated
  USING (contractor_id IN (SELECT id FROM contractors WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert own contractor responses"
  ON contractor_responses
  FOR INSERT
  TO authenticated
  WITH CHECK (contractor_id IN (SELECT id FROM contractors WHERE user_id = auth.uid()));

CREATE POLICY "Users can update own contractor responses"
  ON contractor_responses
  FOR UPDATE
  TO authenticated
  USING (contractor_id IN (SELECT id FROM contractors WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete own contractor responses"
  ON contractor_responses
  FOR DELETE
  TO authenticated
  USING (contractor_id IN (SELECT id FROM contractors WHERE user_id = auth.uid()));

-- Create policies for custom questions table
CREATE POLICY "Users can read own custom questions"
  ON custom_questions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own custom questions"
  ON custom_questions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own custom questions"
  ON custom_questions
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own custom questions"
  ON custom_questions
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for notes table
CREATE POLICY "Users can read own notes"
  ON notes
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own notes"
  ON notes
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own notes"
  ON notes
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own notes"
  ON notes
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for reminders table
CREATE POLICY "Users can read own reminders"
  ON reminders
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own reminders"
  ON reminders
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own reminders"
  ON reminders
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own reminders"
  ON reminders
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for documents table
CREATE POLICY "Users can read own documents"
  ON documents
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own documents"
  ON documents
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own documents"
  ON documents
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own documents"
  ON documents
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for feedback table (allow anonymous submissions)
CREATE POLICY "Allow anonymous feedback submission"
  ON feedback
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow reading feedback for analytics"
  ON feedback
  FOR SELECT
  TO anon
  USING (true);

-- Create policies for survey responses table (allow anonymous submissions)
CREATE POLICY "Allow anonymous survey responses"
  ON survey_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow reading survey responses for analytics"
  ON survey_responses
  FOR SELECT
  TO anon
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contractors_user_id ON contractors(user_id);
CREATE INDEX IF NOT EXISTS idx_contractor_responses_contractor_id ON contractor_responses(contractor_id);
CREATE INDEX IF NOT EXISTS idx_custom_questions_user_id ON custom_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id);
CREATE INDEX IF NOT EXISTS idx_notes_contractor_id ON notes(contractor_id);
CREATE INDEX IF NOT EXISTS idx_reminders_user_id ON reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_date ON reminders(reminder_date);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_contractor_id ON documents(contractor_id);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at);
CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at ON survey_responses(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contractors_updated_at BEFORE UPDATE ON contractors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contractor_responses_updated_at BEFORE UPDATE ON contractor_responses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_custom_questions_updated_at BEFORE UPDATE ON custom_questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON notes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reminders_updated_at BEFORE UPDATE ON reminders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();