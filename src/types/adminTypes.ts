export type admin = {
  id?: string;
  name: string;
  phone: string;
  birth_date: string;
  /** UI field; mapped to `admin_role` for the backend. */
  role: string;
  admin_role?: string;
  password: string;
};
