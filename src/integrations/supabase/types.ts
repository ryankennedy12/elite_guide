export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      contractor_comparisons: {
        Row: {
          contractors: Json
          created_at: string
          criteria: Json
          id: string
          notes: string | null
          recommendation: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          contractors?: Json
          created_at?: string
          criteria?: Json
          id?: string
          notes?: string | null
          recommendation?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          contractors?: Json
          created_at?: string
          criteria?: Json
          id?: string
          notes?: string | null
          recommendation?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      contractors: {
        Row: {
          business_info: Json | null
          contact_info: Json | null
          created_at: string
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          business_info?: Json | null
          contact_info?: Json | null
          created_at?: string
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          business_info?: Json | null
          contact_info?: Json | null
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string
          feedback_text: string | null
          id: string
          rating: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          feedback_text?: string | null
          id?: string
          rating: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          feedback_text?: string | null
          id?: string
          rating?: number
          user_id?: string | null
        }
        Relationships: []
      }
      milestones: {
        Row: {
          category: string
          completed_date: string | null
          created_at: string
          description: string | null
          due_date: string
          id: string
          is_payment_milestone: boolean | null
          notes: string | null
          payment_amount: number | null
          project_id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          completed_date?: string | null
          created_at?: string
          description?: string | null
          due_date: string
          id?: string
          is_payment_milestone?: boolean | null
          notes?: string | null
          payment_amount?: number | null
          project_id: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          completed_date?: string | null
          created_at?: string
          description?: string | null
          due_date?: string
          id?: string
          is_payment_milestone?: boolean | null
          notes?: string | null
          payment_amount?: number | null
          project_id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          content: string
          contractor_name: string | null
          created_at: string
          follow_up_notes: string[] | null
          id: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          contractor_name?: string | null
          created_at?: string
          follow_up_notes?: string[] | null
          id?: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          contractor_name?: string | null
          created_at?: string
          follow_up_notes?: string[] | null
          id?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          phone: string | null
          preferences: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          preferences?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          preferences?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      project_media: {
        Row: {
          caption: string | null
          category: string | null
          created_at: string
          id: string
          project_id: string
          type: string
          url: string
        }
        Insert: {
          caption?: string | null
          category?: string | null
          created_at?: string
          id?: string
          project_id: string
          type: string
          url: string
        }
        Update: {
          caption?: string | null
          category?: string | null
          created_at?: string
          id?: string
          project_id?: string
          type?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          contractor_contact: string | null
          contractor_id: string | null
          contractor_name: string | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          name: string
          notes: string | null
          paid_amount: number | null
          project_type: string
          start_date: string | null
          status: string
          total_cost: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          contractor_contact?: string | null
          contractor_id?: string | null
          contractor_name?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          notes?: string | null
          paid_amount?: number | null
          project_type: string
          start_date?: string | null
          status?: string
          total_cost?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          contractor_contact?: string | null
          contractor_id?: string | null
          contractor_name?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          notes?: string | null
          paid_amount?: number | null
          project_type?: string
          start_date?: string | null
          status?: string
          total_cost?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_responses: {
        Row: {
          answer: string
          created_at: string
          id: string
          question: string
          user_id: string | null
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          question: string
          user_id?: string | null
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          question?: string
          user_id?: string | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
