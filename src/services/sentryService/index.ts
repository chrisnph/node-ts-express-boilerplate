// You can also use CommonJS `require('@sentry/node')` instead of `import`
import * as sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import { NODE_ENV, SENTRY_DSN } from "../../config";

sentry.init({
  dsn: SENTRY_DSN,
  integrations: [new ProfilingIntegration()],
  // Performance Monitoring
  tracesSampleRate: NODE_ENV === ".env.prod" ? 0.5 : 1.0, // Capture 100% of the transactions, reduce in production!
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: NODE_ENV === ".env.prod" ? 0.2 : 1.0, // Capture 100% of the transactions, reduce in production!
});

export default sentry;
