import authServiceTypes from "../typings";
import errorHandler from "../../../utils/errorHandler";
import { compareSync } from "bcrypt";
import Users from "../../mongooseService/models/users";
import { sign, SignOptions } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../../config";

const login = async ({ username, password }: authServiceTypes.login) => {
  try {
    const user = await Users.findOne({ username });

    if (!user) {
      return {
        status: "error",
        data: {},
        error: `User does not exist`,
      };
    }

    if (!compareSync(password, user.password)) {
      return {
        status: "error",
        data: {},
        error: "Invalid Username or Password",
      };
    }

    const accessToken = sign(
      { username, userId: user._id.toString() },
      ACCESS_TOKEN_SECRET as string,
      { expiresIn: "24h" } as SignOptions
    );

    const refreshToken = sign(
      { username, userId: user._id.toString() },
      REFRESH_TOKEN_SECRET as string
    );

    return {
      status: "ok",
      data: {
        user: {
          _id: user._id,
          username: user.username,
          name: user.name,
          avatar: user.avatar,
        },
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    };
  } catch (error: any) {
    errorHandler({
      message: error.message || "failed to login",
      code: 500,
      others: error.stack,
    });
  }
};

export default login;
