import { LoginUserRes } from "../api";
import { User } from "../types";

export interface UserDao {
  register(user: User): Promise<void>;
  checkUserEmailIsExist(email: string): Promise<User | null>;
  checkUserUsernameIsExist(username: string): Promise<User | null>;
  getUser(userId: string): Promise<User | undefined>;
}
