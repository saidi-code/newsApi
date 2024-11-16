import { Comment } from "../types";

export interface CommentDao {
  createComment(comment: Comment): Promise<void>;
  commentList(postId: string): Promise<Comment[]>;
  updateComment(commentId: string, comment: string): Promise<void>;
  deleteComment(commentId: string): Promise<void>;
}
