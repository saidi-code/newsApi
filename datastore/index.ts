import { CommentDao } from "./commentDao";
import { InMemoryDb } from "./inMemeoryDb";
import { LikeDao } from "./likeDao";
import { PostDao } from "./postDao";
import { UserDao } from "./userDao";

export interface Datastore extends UserDao, PostDao, CommentDao, LikeDao {}

export const db = new InMemoryDb();
