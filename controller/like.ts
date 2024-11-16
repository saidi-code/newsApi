import expressAsyncHandler from "express-async-handler";
import { ExpressHandler } from "../types";
import { db } from "../datastore";
import { Like } from "../types";
import { AddLikeReq, AddLikeRes } from "../api";
export const likeController = {
  addLike: expressAsyncHandler(async (req, res): Promise<void> => {
    const { postId } = req.params;
    if (!postId) {
      // verify title and url is unique
      res.status(400).send({ error: "Bad Request!" });
      return;
    }
    const like: Like = {
      id: crypto.randomUUID(),
      postId: postId,
      userId: res.locals.userId,
    };
    await db.createLike(like);
    res.sendStatus(200);
  }) as ExpressHandler<AddLikeReq, AddLikeRes>,
  deleteLike: expressAsyncHandler(async (req, res): Promise<void> => {
    const { postId } = req.params;
    const userId = res.locals.userId;
    if (!postId) {
      // verify title and url is unique
      res.status(400).send({ error: "Bad Request!" });
      return;
    }
    await db.deleteLike(postId, userId);
    res.sendStatus(200);
  }) as ExpressHandler<AddLikeReq, AddLikeRes>,
};
