import { Like } from "../types";

export interface LikeDao {
  createLike(like: Like): Promise<void>;
  deleLike(likeId: string): Promise<void>;
}
