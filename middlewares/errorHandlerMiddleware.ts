import { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Uncaught error", err);
  res
    .status(500)
    .send("Oops an excpected error occurred,please try again later");
};
