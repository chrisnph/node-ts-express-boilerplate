import ErrorHandlerTypes from "./typings";

const errorHandler = (errorInfo: ErrorHandlerTypes.CatchException) => {
  const errorOthers =
    errorInfo?.others?.split("\n")[1]?.split("/")?.slice(-3) ||
    errorInfo?.others;

  throw {
    ...errorInfo,
    others: errorOthers,
  };
};

export default errorHandler;
