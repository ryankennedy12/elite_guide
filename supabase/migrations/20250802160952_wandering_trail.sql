/*
  # Create feedback and survey tables

  1. New Tables
    - `feedback`
      - `id` (integer, primary key, auto-increment)
      - `rating` (integer, required)
      - `feedback_text` (text, optional)
      - `created_at` (timestamp with timezone, default now)
    - `survey_responses`
      - `id` (integer, primary key, auto-increment)
      - `question` (text, required)
      - `answer` (text, required)
      - `created_at` (timestamp with timezone, default now)

  2. Security
    - Enable RLS on both tables
    - Add policies for anonymous users to insert data
*/

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id SERIAL PRIMARY KEY,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create survey_responses table
CREATE TABLE IF NOT EXISTS survey_responses (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anonymous inserts (for feedback collection)
CREATE POLICY "Allow anonymous feedback submission"
  ON feedback
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous survey responses"
  ON survey_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Optional: Allow reading aggregated data (for analytics)
CREATE POLICY "Allow reading feedback for analytics"
  ON feedback
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow reading survey responses for analytics"
  ON survey_responses
  FOR SELECT
  TO anon
  USING (true);