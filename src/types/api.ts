export type ApiMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type ApiResponse<T> = {
  message?: string;
  data: T;
  errors?: Record<string, string[]> | null;
};

/** BFF-normalized list shape (compatible with existing UI). */
export type PaginatedResponse<T> = {
  message?: string;
  data: T[];
  meta: ApiMeta;
};

export type UserType = "admin" | "doctor" | "client";

export type AdminRole =
  | "boss"
  | "manager"
  | "author"
  | "receptionist"
  | "accountant";

export type AuthUser = {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  birth_date?: string | null;
  address?: string | null;
  type: UserType;
  admin_role?: AdminRole | null;
  /** Normalized for existing UI (maps from admin_role). */
  role?: AdminRole | string | null;
  doctor_profile?: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
};
