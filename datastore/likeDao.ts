import { Like } from "../types";

export interface LikeDao {
  createLike(like: Like): Promise<void>;
  deleteLike(postId: string, userId: string): Promise<void>;
}
