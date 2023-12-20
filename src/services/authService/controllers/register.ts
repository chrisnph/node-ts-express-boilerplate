import authServiceTypes from "../typings";
import errorHandler from "../../../utils/errorHandler";
import { genSalt, hash } from "bcrypt";
import Users from "../../mongooseService/models/users";

const register = async ({
  username,
  password,
  name,
  avatar,
}: authServiceTypes.register) => {
  try {
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);

    const getUser = await Users.findOne({ username });

    if (getUser) {
      return {
        status: "error",
        data: {},
        error: "Username is not available",
      };
    }

    const registerUser = new Users({
      username,
      password: hashedPassword,
      name,
      avatar,
    });

    const user = await registerUser.save();

    return {
      status: "ok",
      data: {
        _id: user._id,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
      },
    };
  } catch (error: any) {
    errorHandler({
      message: error.message || "failed to register account",
      code: 500,
      others: error.stack,
    });
  }
};

export default register;
