import expressAsyncHandler from "express-async-handler";
import { db } from "../datastore";
import { Comment, ExpressHandler } from "../types";
import {
  CreateCommentReq,
  CreateCommentRes,
  GetCommentListReq,
  GetCommentListRes,
} from "../api";
export const commentController = {
  createPost: expressAsyncHandler(async (req, res): Promise<void> => {
    // # TODO
    // -validate user is exists
    // -get userId from session
    // -validation the comment text

    const { postId } = req.params;
    if (!req.body.comment || !postId) {
      res.status(400).send({ error: "Bad Request!" });
      return;
    }
    const comment: Comment = {
      id: crypto.randomUUID(),
      comment: req.body.comment,
      postId: postId,
      userId: res.locals.userId,
      postedAt: new Date(Date.now()),
    };
    await db.createComment(comment);
    res.sendStatus(200);
  }) as ExpressHandler<CreateCommentReq, CreateCommentRes>,

  getCommentList: expressAsyncHandler(async (req, res): Promise<void> => {
    const { postId } = req.params;
    if (!postId) {
      res.status(400).send({ error: "Bad Request!" });
      return;
    }
    const comments: Comment[] = await db.commentList(postId);
    res.status(200).send({ comments: comments });
  }) as ExpressHandler<GetCommentListReq, GetCommentListRes>,
  updateComment: expressAsyncHandler(async (req, res): Promise<void> => {
    // # TODO
    // -validation the comment text

    const { commentId } = req.params;
    if (!req.body.comment || !commentId) {
      res.status(400).send({ error: "Bad Request!" });
      return;
    }

    await db.updateComment(commentId, req.body.comment);
    res.sendStatus(200);
  }) as ExpressHandler<CreateCommentReq, CreateCommentRes>,
  deleteComment: expressAsyncHandler(async (req, res): Promise<void> => {
    // # TODO
    // -validate user is exists
    // -get userId from session
    // -validation the comment text

    const { commentId } = req.params;
    if (!commentId) {
      res.status(400).send({ error: "Bad Request!" });
      return;
    }
    await db.deleteComment(commentId);
    res.sendStatus(200);
  }) as ExpressHandler<CreateCommentReq, CreateCommentRes>,
};
