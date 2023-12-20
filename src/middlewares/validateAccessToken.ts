import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify, decode } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config";

interface PayloadTypes extends JwtPayload {
  username?: string;
}

declare module "express-serve-static-core" {
  interface Request {
    username: string;
  }
}

const validateAccessToken = (
  req: Request,
  res: Response,
  Next: NextFunction
) => {
  const reqHeader = req.headers["authorization"];
  const token = reqHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
        status: "error",
        error: "token is required",
    });
  }

  if (!ACCESS_TOKEN_SECRET) {
    return res.status(500).json({
        status: "error",
        error: "access token is not configured",
    });
  }

  verify(token, ACCESS_TOKEN_SECRET, (error) => {
    if (error) {
      return res.status(401).json({
        status: "error",
        error: "invalid token",
      });
    }

    const payload = decode(token) as PayloadTypes;

    if (!payload?.username) {
      return res.status(500).json({
        status: "error",
        error: "malformed token payload",
      });
    }

    req.username = payload.username;

    Next();
  });
};

export default validateAccessToken;
