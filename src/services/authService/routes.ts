import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import errorHandler from "../../utils/errorHandler";
import register from "./controllers/register";
import login from "./controllers/login";
import UsersTypes from "../mongooseService/models/users/typings";
import { IResponse } from "../../typings";

const authServiceRouter = express.Router();

const registerValidation = [
  check("username").isString().notEmpty().isLength({ min: 6 }),
  check("password").isString().notEmpty().isLength({ min: 8 }),
  check("name.first").isString().notEmpty(),
  check("name.last").isString().notEmpty(),
  check("avatar").isString().notEmpty(),
];

authServiceRouter.post(
  "/register",
  registerValidation,
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const results = (await register({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        avatar: req.body.avatar,
      })) as IResponse;

      return res.status(201).json(results);
    } catch (error: any) {
      errorHandler({
        message: error.message || "failed to register account",
        code: 500,
        others: error.stack,
      });
    }
  }
);

const loginValidation = [
  check("username").isString().notEmpty().isLength({ min: 6 }),
  check("password").isString().notEmpty().isLength({ min: 8 }),
];

authServiceRouter.post(
  "/login",
  loginValidation,
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const results = (await login({
        username: req.body.username,
        password: req.body.password,
      })) as IResponse;

      return res.status(201).json(results);
    } catch (error: any) {
      errorHandler({
        message: error.message || "failed to login",
        code: 500,
        others: error.stack,
      });
    }
  }
);

export default authServiceRouter;
