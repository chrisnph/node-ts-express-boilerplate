import express from "express";
import authServiceRouter from "../services/authService/routes";
import tasksServiceRouter from "../services/tasksService/routes";

const router = express.Router();

router.use("/auth", authServiceRouter);
router.use("/task", tasksServiceRouter);


export default router;
