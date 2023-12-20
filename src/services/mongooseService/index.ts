import { connect } from "mongoose";
import { MONGODB_CONNECTION_STRING } from "../../config";
import errorHandler from "../../utils/errorHandler";

export const connectToMongo = async () => {
  try {
    if (!MONGODB_CONNECTION_STRING) {
      return errorHandler({
        message: "invalid mongoDB connection string",
        code: 500,
        others: "env",
      });
    }

    connect(MONGODB_CONNECTION_STRING as any);
  } catch (error: any) {
    errorHandler({
      message: error.message || "failed to connect to mongoDB",
      code: 500,
      others: error.stack,
    });
  }
};
