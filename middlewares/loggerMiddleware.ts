import { NextFunction, Request, Response } from "express";

export const loogerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    "method - " +
      req.method +
      " URL - " +
      `${req.protocol}://${req.get("host")}${req.originalUrl}` +
      " body - " +
      JSON.stringify(req.body)
  );
  next();
};
