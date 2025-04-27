import { Router } from "express";
import exampleRouter from "./example/example.route.js";
import authRouter from "./auth/auth.route.js";

const router = Router();

router.use("/", exampleRouter);
router.use("/auth", authRouter);

export default router;
