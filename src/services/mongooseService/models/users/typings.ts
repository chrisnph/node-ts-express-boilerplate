import { Document } from "mongoose";

declare namespace UsersTypes {
  export interface mongoUsers extends Document {
    username: string;
    password: string;
    name: {
      first: string;
      last: string;
    };
    avatar: string;
  }
}

export default UsersTypes;
