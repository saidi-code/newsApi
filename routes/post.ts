import { request, Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleeware";
import { onlyForAdminMiddleware } from "../middlewares/onlyForAdminMiddleware";
import { postController } from "../controller/post";
const router = Router();
router.get(
  "/",
  authMiddleware,
  onlyForAdminMiddleware,
  postController.getListPost
);
router.get("/:postId", postController.getPost);
router.post("/", authMiddleware, postController.createPost);
router.delete(
  "/:postId",
  authMiddleware,
  onlyForAdminMiddleware,
  postController.deletePost
);
router.put("/:postId", authMiddleware, postController.updatePost);
export default router;
