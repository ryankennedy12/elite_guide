export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      feedback: {
        Row: {
          id: number
          rating: number
          feedback_text: string | null
          created_at: string
        }
        Insert: {
          id?: number
          rating: number
          feedback_text?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          rating?: number
          feedback_text?: string | null
          created_at?: string
        }
        Relationships: []
      }
      survey_responses: {
        Row: {
          id: number
          question: string
          answer: string
          created_at: string
        }
        Insert: {
          id?: number
          question: string
          answer: string
          created_at?: string
        }
        Update: {
          id?: number
          question?: string
          answer?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}