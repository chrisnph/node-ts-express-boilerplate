import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import errorHandler from "../../utils/errorHandler";
import add from "./controllers/add";
import UsersTypes from "../mongooseService/models/users/typings";
import validateAccessToken from "../../middlewares/validateAccessToken";
import remove from "./controllers/remove";
import tasksServiceTypes from "./typings";
import edit from "./controllers/edit";
import all from "./controllers/all";
import { IResponse } from "../../typings";

const tasksServiceRouter = express.Router();

tasksServiceRouter.get(
  "/all",
  validateAccessToken,
  async (req: Request, res: Response) => {
    try {
      const results = (await all(req.username)) as IResponse;

      return res.status(201).json(results);
    } catch (error: any) {
      errorHandler({
        message: error.message || "failed to retrieve tasks",
        code: 500,
        others: error.stack,
      });
    }
  }
);

const tasksAddValidation = [
  check("title").isString().notEmpty().isLength({ min: 3 }),
];

tasksServiceRouter.post(
  "/add",
  tasksAddValidation,
  validateAccessToken,
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const results = await add({
        title: req.body.title,
        username: req.username,
      });

      if (results && results.data) {
        res.status(201).json({
          status: results.status,
          data: results.data,
        });
      }

      return results;
    } catch (error: any) {
      errorHandler({
        message: error.message || "failed to add task",
        code: 500,
        others: error.stack,
      });
    }
  }
);

tasksServiceRouter.delete(
  "/remove/:id",
  validateAccessToken,
  async (req: Request, res: Response) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({ error: "invalid task id" });
      }

      const results = await remove({
        id: req.params.id,
        username: req.username,
      });

      if (!results?.data) {
        return res.status(404).json({ error: "task not found" });
      }

      res.status(201).json({
        status: results.status,
        data: results.data,
      });
    } catch (error: any) {
      errorHandler({
        message: error.message || "failed to remove task",
        code: 500,
        others: error.stack,
      });
    }
  }
);

const tasksEditValidation = [
  check("title").isString(),
  check("status").isString(),
];

tasksServiceRouter.patch(
  "/edit/:id",
  tasksEditValidation,
  validateAccessToken,
  async (req: Request, res: Response) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({ error: "invalid task id" });
      }

      if (Object.keys(req.body).length < 1) {
        return res.status(400).json({
          status: "error",
          data: {},
          error: "please supply at least a field",
        });
      }

      const editReqBody: tasksServiceTypes.editReqBody = {};

      for (const field in req.body) {
        editReqBody[field] = req.body[field];
      }

      editReqBody.username = req.username;

      const results = await edit({
        id: req.params.id,
        ...editReqBody,
      });

      if (!results?.data) {
        return res.status(404).json({ error: "task not found" });
      }

      res.status(201).json({
        status: results.status,
        data: results.data,
      });
    } catch (error: any) {
      errorHandler({
        message: error.message || "failed to edit task",
        code: 500,
        others: error.stack,
      });
    }
  }
);

export default tasksServiceRouter;
