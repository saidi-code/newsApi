import { NextFunction } from "express";
import { ExpressHandler } from "../types";

export const onlyForAdminMiddleware = ((req, res, next) => {
  const isAdmin: boolean = res.locals.isAdmin;
  console.log("isAdmin middleware");
  if (!isAdmin) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  next();
}) as ExpressHandler<any, any>;
