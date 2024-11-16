export const BASE_URL: string = "http://134.122.27.174/api/v1";
export type endpointConfig = {
  url: string;
  method: "GET" | "POST" | "DELETE" | "PUT";
  auth: boolean;
};
export enum endpoints {
  health = "health",
  login = "login",
  register = "register",
  //posts
  getPosts = "getPosts",
  getPost = "getPost",
  createPost = "createPost",
  deletePost = "deletePost",
  updatePost = "updatePost",

  //comments
  createComment = "createComment",
  postCommentList = "postCommentList",
  updateComment = "updateComment",
  deleteComment = "deleteComment",
  //likes
  addLike = "addLike",
  deleteLike = "deleteLike",
}
export const ENDPOINT_CONFIG: { [key in endpoints]: endpointConfig } = {
  [endpoints.health]: {
    url: `${BASE_URL}/healthz`,
    method: "GET",
    auth: false,
  },
  [endpoints.login]: {
    url: `${BASE_URL}/users/login`,
    method: "POST",
    auth: false,
  },
  [endpoints.register]: {
    url: `${BASE_URL}/users/register`,
    method: "POST",
    auth: false,
  },
  [endpoints.getPosts]: {
    url: `${BASE_URL}/posts`,
    method: "GET",
    auth: false,
  },
  [endpoints.getPost]: {
    url: `${BASE_URL}/posts/:postId`,
    method: "GET",
    auth: false,
  },
  [endpoints.createPost]: {
    url: `${BASE_URL}/posts`,
    method: "POST",
    auth: true,
  },
  [endpoints.updatePost]: {
    url: `${BASE_URL}/posts/:postId`,
    method: "PUT",
    auth: true,
  },
  [endpoints.deletePost]: {
    url: `${BASE_URL}/posts/:postId`,
    method: "DELETE",
    auth: true,
  },
  [endpoints.postCommentList]: {
    url: `${BASE_URL}/comments/:postId`,
    method: "GET",
    auth: true,
  },
  [endpoints.createComment]: {
    url: `${BASE_URL}/comments`,
    method: "POST",
    auth: true,
  },
  [endpoints.updateComment]: {
    url: `${BASE_URL}/comments/:commentId`,
    method: "PUT",
    auth: true,
  },
  [endpoints.deleteComment]: {
    url: `${BASE_URL}/comments/:commentId`,
    method: "DELETE",
    auth: true,
  },
  [endpoints.addLike]: {
    url: `${BASE_URL}/:postId`,
    method: "POST",
    auth: true,
  },
  [endpoints.deleteLike]: {
    url: `${BASE_URL}/:postId`,
    method: "DELETE",
    auth: true,
  },
};
