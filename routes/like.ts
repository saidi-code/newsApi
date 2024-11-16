import { Router } from "express";
import { likeController } from "../controller/like";
import { authMiddleware } from "../middlewares/authMiddleeware";
const router = Router();

router.post("/new/:postId", authMiddleware, likeController.addLike);
router.delete("/remove/:postId", authMiddleware, likeController.deleteLike);
export default router;
