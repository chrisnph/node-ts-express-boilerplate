import express from "express";
import cors from "cors";
import sentry from "./services/sentryService";
import { NODE_ENV, PORT } from "./config";
import router from "./routes";
import { connectToMongo } from "./services/mongooseService";

const port = PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

NODE_ENV !== ".env.local" && app.use(sentry.Handlers.errorHandler());

app.listen(port, async () => {
  try {
    await connectToMongo();

    console.log(`connected to mongoDB, listening on port ${port}`);
  } catch (error) {
    console.error(error);

    NODE_ENV !== ".env.local" && sentry.captureException(error);
  }
});

export default app;
