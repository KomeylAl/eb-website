export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  notifiable_type?: string | null;
  notifiable_id?: string | null;
  priority: "low" | "normal" | "medium" | "high";
  delivery_channels?: string[] | null;
  meta?: Record<string, any> | null;
  status?: string;
  scheduled_at?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface User {
  id: string;
  name: string;
  type: "admin" | "doctor" | "client";
  admin_role?: string | null;
  role?: string | null;
}

export interface AuthTokens {
  token: string;
  access_token?: string;
  user: User;
}

export interface NotificationEvent {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  meta: Record<string, any> | null;
  created_at: string;
}
