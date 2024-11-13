import { NextFunction } from "express";
import { ExpressHandler } from "../types";
import { verifyToken } from "../auth";
import { db } from "../datastore";
import { User } from "../types";

export const authMiddleware = (async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  try {
    const payload = verifyToken(token);
    const user: User | undefined = await db.getUser(payload.userId);
    if (!user) {
      throw "Not found";
    }
    res.locals.userId = user.id;
    res.locals.isAdmin = user.isAdmin;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Bad token" });
  }
}) as ExpressHandler<any, any>;
