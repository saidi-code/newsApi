import { Request, Response, RequestHandler } from "express";
import { db } from "../datastore";
import { Post } from "../types";
import expressAsyncHandler from "express-async-handler";

import {
  CreatePostReq,
  CreatePostRes,
  DeletePostReq,
  DeletePostRes,
  GetPosReq,
  GetPosRes,
  ListPostReq,
  ListPostRes,
  UpdatePostReq,
  UpdatePostRes,
} from "../api";
// export type ExpressHandler<Req, Res> = RequestHandler<
//   { [key: string]: string },
//   Partial<Res>,
//   Partial<Req>,
//   any
// >;
import { ExpressHandler } from "../types";
export const postController = {
  getListPost: expressAsyncHandler(async (req, res): Promise<void> => {
    // throw new Error("Oops!");
    const posts: Post[] = await db.postList();
    res.send({ posts });
  }) as ExpressHandler<ListPostReq, ListPostRes>,
  getPost: expressAsyncHandler(async (req, res): Promise<void> => {
    const { postId } = req.params;
    const post: Post | null = await db.getPost(postId);
    if (!post) {
      res.status(404).send({ error: "Not found!" });
    }
    res.send({ post: post });
  }) as ExpressHandler<GetPosReq, GetPosRes>,
  createPost: expressAsyncHandler(async (req, res): Promise<void> => {
    // # TODO
    // -validate user is exists
    // -get userId from session
    // -validation the user input (title and url not empty)
    // validate url is new , otherwhie add +1 to exist post
    //verify title is unique

    if (!req.body.title || !req.body.url) {
      // verify title and url is unique
      res.status(400).send({ error: "Bad Request!" });
      return;
    }
    const post: Post = {
      id: crypto.randomUUID(),
      title: req.body.title,
      url: req.body.url,
      userId: res.locals.userId,
      postedAt: Date.now(),
    };
    await db.createPost(post);
    res.sendStatus(200);
  }) as ExpressHandler<CreatePostReq, CreatePostRes>,

  deletePost: expressAsyncHandler(async (req, res): Promise<void> => {
    const { postId } = req.params;
    const deletedPost: Post | undefined = await db.deletePost(postId);
    if (!deletedPost) {
      res.status(404);
    }
    res.sendStatus(200);
  }) as ExpressHandler<DeletePostReq, DeletePostRes>,

  updatePost: expressAsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const updatedPost: Post = req.body;
      const { postId } = req.params;

      await db.updatePost(postId, updatedPost);

      res.sendStatus(200);
    }
  ) as ExpressHandler<UpdatePostReq, UpdatePostRes>,
};
