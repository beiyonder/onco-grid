export interface Database {
  public: {
    Tables: {
      pilot_profiles: {
        Row: {
          user_id: string;
          display_name: string;
          role: "coordinator" | "oncologist" | "site" | "auditor";
          organization: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          display_name?: string;
          role?: "coordinator" | "oncologist" | "site" | "auditor";
          organization?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          display_name?: string;
          organization?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      trial_rooms: {
        Row: { id: string; trial_id: string; created_by: string; created_at: string };
        Insert: { id?: string; trial_id: string; created_by: string; created_at?: string };
        Update: never;
        Relationships: [];
      };
      trial_room_members: {
        Row: {
          room_id: string;
          user_id: string;
          room_role: "coordinator" | "oncologist" | "site" | "auditor";
          can_author_official_response: boolean;
          joined_at: string;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      trial_room_messages: {
        Row: {
          id: string;
          room_id: string;
          author_id: string;
          body: string;
          authority: "general" | "authorized_site_response";
          source_url: string | null;
          reply_to_id: string | null;
          resolved_at: string | null;
          resolved_by: string | null;
          created_at: string;
        };
        Insert: {
          room_id: string;
          author_id: string;
          body: string;
          authority?: "general" | "authorized_site_response";
          source_url?: string | null;
          reply_to_id?: string | null;
        };
        Update: never;
        Relationships: [];
      };
      referral_handoffs: {
        Row: {
          id: string;
          relay_reference: string;
          trial_id: string;
          created_by: string;
          owner_id: string;
          recipient_organization: string;
          purpose: "operational_screening_request" | "source_clarification" | "site_contact_coordination";
          state: "draft" | "ready" | "acknowledged" | "closed";
          created_at: string;
          updated_at: string;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      referral_handoff_participants: {
        Row: {
          handoff_id: string;
          user_id: string;
          participant_role: "sender" | "recipient" | "observer";
          joined_at: string;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      referral_handoff_events: {
        Row: {
          id: number;
          handoff_id: string;
          actor_id: string;
          event_type: "created" | "participant_added" | "ready" | "acknowledged" | "closed";
          from_state: "draft" | "ready" | "acknowledged" | "closed" | null;
          to_state: "draft" | "ready" | "acknowledged" | "closed";
          created_at: string;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      ensure_trial_room: { Args: { requested_trial_id: string }; Returns: string };
      add_trial_room_member: { Args: { room: string; new_member: string; requested_role: string }; Returns: undefined };
      resolve_trial_room_message: { Args: { message: string }; Returns: undefined };
      create_no_phi_handoff: {
        Args: {
          requested_trial_id: string;
          recipient_user: string;
          recipient_org: string;
          requested_purpose: string;
        };
        Returns: string;
      };
      advance_no_phi_handoff: { Args: { handoff: string; requested_state: string }; Returns: undefined };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type PilotProfile = Database["public"]["Tables"]["pilot_profiles"]["Row"];
export type PilotRoomMessage = Database["public"]["Tables"]["trial_room_messages"]["Row"];
export type PilotHandoff = Database["public"]["Tables"]["referral_handoffs"]["Row"];
export type PilotHandoffEvent = Database["public"]["Tables"]["referral_handoff_events"]["Row"];
