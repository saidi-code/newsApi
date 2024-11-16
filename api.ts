import { Post, User, Comment } from "./types";
//Post APIs
export interface ListPostReq {}
export interface ListPostRes {
  posts: Post[];
}

export type CreatePostReq = Pick<Post, "title" | "url" | "postedAt" | "userId">;
export interface CreatePostRes {}

export interface GetPosReq {}
export interface GetPosRes {
  post: Post | null;
}

export interface DeletePostReq {}
export interface DeletePostRes {}

export interface UpdatePostReq {
  post: Post;
}
export interface UpdatePostRes {}

//Auth Api
export type RegisterUserReq = Pick<
  User,
  "firstname" | "lastname" | "email" | "password" | "username"
>;
export interface RegisterUserRes {
  token: string;
}

export interface LoginUserReq {
  login: string;
  password: string;
}
export type LoginUserRes = {
  user: Pick<User, "firstname" | "lastname" | "email" | "id" | "username">;
  token: string;
};

//User Api
export interface GetUserReq {}
export type GetUserRes = {
  user: User;
};
//comment Api
export type CreateCommentReq = Pick<Comment, "comment">;
export interface CreateCommentRes {}

export interface GetCommentListReq {}
export interface GetCommentListRes {
  comments: Comment[];
}

export interface UpdateCommentReq {
  comment: string;
}
export interface UpdateCommentRes {}

export interface DeleteCommentReq {}
export interface DeleteCommentRes {}

export interface AddLikeReq {}
export interface AddLikeRes {}
