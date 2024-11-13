import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TokenObject } from "./types";

export const generateToken = (obj: TokenObject): string => {
  const secret = getJWT();
  return jwt.sign(obj, secret, { expiresIn: "1h" });
};
export const verifyToken = (token: string): TokenObject => {
  return jwt.verify(token, getJWT()) as TokenObject;
};
const getJWT = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("missing jwt secret");
    process.exit(1);
  }
  return secret;
};

const getSalt = (): string => {
  const salt = bcrypt.genSaltSync(10);
  if (!salt) {
    console.error("missing bcrypt salt");
    process.exit(1);
  }
  return salt;
};

export const hashingPassword = (password: string): string => {
  const salt = getSalt();
  return bcrypt.hashSync(password, salt);
};

export const compareHasedPassword = (
  password: string,
  hashedPassword: string
): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};
