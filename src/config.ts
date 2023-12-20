import { config } from "dotenv";

config({
  path: `environments/${process.env.NODE_ENV}` || "environments/.env.local",
});

export const {
  NODE_ENV,
  MONGODB_CONNECTION_STRING,
  SENTRY_DSN,
  PORT,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
} = process.env;
