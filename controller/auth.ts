import expressAsyncHandler from "express-async-handler";
import { RequestHandler } from "express";
import { User } from "../types";
import {
  LoginUserReq,
  LoginUserRes,
  RegisterUserReq,
  RegisterUserRes,
} from "../api";
import { db } from "../datastore";
import { compareHasedPassword, generateToken, hashingPassword } from "../auth";
import { ExpressHandler } from "../types";
export const authController = {
  register: expressAsyncHandler(async (req, res): Promise<void> => {
    // # TODO
    // -validate user is exists
    // -get userId from session
    // -validation the user input (title and url not empty)
    // validate url is new , otherwhie add +1 to exist post
    if (
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.email ||
      !req.body.username ||
      !req.body.password
    ) {
      res.sendStatus(400).send({ error: "All fields are required" });
      return;
    }
    const existing =
      (await db.checkUserEmailIsExist(req.body.email)) ||
      (await db.checkUserUsernameIsExist(req.body.username));
    if (existing) {
      res.status(403).send({ error: "user already exists" });
      return;
    }
    const hashingPass = hashingPassword(req.body.password);
    const user: User = {
      id: crypto.randomUUID(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      password: hashingPass,
      isAdmin: false,
    };
    await db.register(user);
    const token: string = generateToken({ userId: user.id });
    res.status(201).send({ token: token });
  }) as ExpressHandler<RegisterUserReq, RegisterUserRes>,
  login: expressAsyncHandler(async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
      res.sendStatus(400);
      return;
    }
    const existing =
      (await db.checkUserEmailIsExist(login)) ||
      (await db.checkUserUsernameIsExist(login));
    if (!existing || !compareHasedPassword(password, existing.password)) {
      res.sendStatus(403);
      return;
    }
    const token = generateToken({ userId: existing.id });
    res.status(200).send({
      user: {
        firstname: existing.firstname,
        lastname: existing.lastname,
        email: existing.email,
        username: existing.email,
        id: existing.id,
      },
      token: token,
    });
  }) as ExpressHandler<LoginUserReq, LoginUserRes>,
};
