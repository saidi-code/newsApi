import { RequestHandler } from "express";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
}

export interface Post {
  id: string;
  title: string;
  url: string;
  userId: string;
  postedAt: Date;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  comment: string;
  postedAt: Date;
}

export interface TokenObject {
  userId: string;
}

type WithError<T> = T & { error: string };

export type ExpressHandler<Req, Res> = RequestHandler<
  { [key: string]: string },
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;
