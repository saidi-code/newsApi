import { Post } from "../types";

export interface PostDao {
  createPost(post: Post): Promise<void>;
  postList(): Promise<Post[]>;
  getPost(postId: string): Promise<Post | null>;
  updatePost(postId: string, data: Post): Promise<void>;
  deletePost(postId: string): Promise<Post | undefined>;
}
