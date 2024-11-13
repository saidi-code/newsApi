import { GetUserReq, GetUserRes } from "../api";
import { ExpressHandler } from "../types";
import { db } from "../datastore";
import { User } from "@prisma/client";
export const userController = {
  getUser: (async (req, res) => {
    const { userId } = req.params;
    const user: User | undefined = await db.getUser(userId);
    if (!user) {
      return res.status(404).send({ error: "Not found" });
    }
    res.status(200).send({ user: user });
  }) as ExpressHandler<GetUserReq, GetUserRes>,
};
