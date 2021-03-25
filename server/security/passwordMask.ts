import argon2 from "argon2";
import { either } from "fp-ts";

export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await argon2.hash(password);
    return either.left(hashedPassword);
  } catch (error) {
    return either.right("error when hash password");
  }
};

export const verifyPassword = async (
  hashedPassword: string,
  password: string
): Promise<either.Left<true> | either.Right<string>> => {
  try {
    const matched = await argon2.verify(hashedPassword, password);
    return matched ? either.left(true) : either.right("password error");
  } catch (error) {
    return either.right("verify password internal error");
  }
};
