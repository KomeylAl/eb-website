export type CommentableType = "doctor" | "post" | "workshop";

export interface Comment {
  id: string;
  commentable_type: CommentableType;
  commentable_id: string;
  user_id: string | null;
  first_name: string;
  last_name: string;
  author_name: string;
  /** Only present in admin responses */
  phone?: string | null;
  body: string;
  rating: number;
  approved: boolean;
  user?: unknown;
  created_at: string;
  updated_at: string;
}

export interface CreateCommentPayload {
  commentable_type: CommentableType;
  commentable_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  body: string;
  rating: number;
}
