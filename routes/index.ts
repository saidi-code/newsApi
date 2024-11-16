import { Router } from "express";
import PostRouter from "./post";
import authRoutes from "./auth";
import commentRoutes from "./comment";
const router = Router();
router.get("/healthz", (req, res) => {
  res.status(200).send({ status: "OK ✌️" });
});
router.use("/posts", PostRouter);
router.use("/users", authRoutes);
router.use("/comments", commentRoutes);
export default router;
