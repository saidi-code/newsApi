import { request, Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleeware";
import { onlyForAdminMiddleware } from "../middlewares/onlyForAdminMiddleware";
import { commentController } from "../controller/comments";
const router = Router();

router.post("/:postId", authMiddleware, commentController.createPost);
router.get("/:postId", commentController.getCommentList);
router.put("/:commentId", authMiddleware, commentController.updateComment);
router.delete("/:commentId", authMiddleware, commentController.deleteComment);

export default router;
