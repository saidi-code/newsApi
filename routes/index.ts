import { Router } from "express";
import PostRouter from "./post";
import authRoutes from "./auth";
const router = Router();
router.get("/healthz", (req, res) => {
  res.status(200).send({ status: "ok" });
});
router.use("/posts", PostRouter);
router.use("/users", authRoutes);
export default router;
