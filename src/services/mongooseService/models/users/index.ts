import { Schema, model } from "mongoose";
import UsersTypes from "./typings";

const usersSchema: Schema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      first: {
        type: String,
      },
      last: {
        type: String,
      },
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

const Users = model<UsersTypes.mongoUsers>("User", usersSchema);

export default Users;
