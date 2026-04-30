import type { Request, Response, NextFunction } from "express";
import requestResponse from "../utils/response.ts";

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = err.status || 500;

  return res
    .status(status)
    .json(
      status === 500
        ? requestResponse.internalError()
        : requestResponse.error(status, err.message),
    );
};

export default errorHandler;
