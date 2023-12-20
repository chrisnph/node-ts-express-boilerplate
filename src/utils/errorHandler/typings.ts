declare namespace ErrorHandlerTypes {
  export interface CatchException {
    ok?: boolean;
    code?: number;
    message?: string;
    others?: any;
  }
}

export default ErrorHandlerTypes;
