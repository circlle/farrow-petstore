import {
  Int,
  ObjectType,
  Type,
  Nullable,
  Union,
  Literal,
  pick,
} from "farrow-schema";
import { Api } from "farrow-api";
import { prisma } from "../prisma";
import { verifyPassword, hashPassword } from "../security/passwordMask";
import { sign as jwtSign } from "../security/jwt";
import { either } from "fp-ts";
import { ApiService } from "farrow-api-server";
import { UserContext } from "../hooks";
export class User extends ObjectType {
  id = Int;
  username = String;
  password = {
    desctiption: "need mask",
    [Type]: String,
  };
  email = Nullable(String);
  avatar = Nullable(String);
  createdAt = String;
}

export const MaskUser = pick(User, [
  "id",
  "username",
  "email",
  "avatar",
  "createdAt"
]);
MaskUser.displayName = "MaskUser"

// ! create user
export class CreateUserInput extends ObjectType {
  username = {
    [Type]: String,
  };
  email = {
    [Type]: Nullable(String),
  };
  password = {
    [Type]: String,
  };
  avatar = {
    [Type]: Nullable(String),
  };
}

export class CreateUserHashFailed extends ObjectType {
  type = Literal("CREATE_USER_HASH_FAILED");
  message = String;
}
export class CreateUserExist extends ObjectType {
  type = Literal("CREATE_USER_EXIST");
  message = String;
}
export class CreatedUserSuccess extends ObjectType {
  type = Literal("CREATE_USER_SUCCESS");
  user = MaskUser;
}

export const CreateUserOutput = Union(
  CreatedUserSuccess,
  CreateUserExist,
  CreateUserHashFailed
);

export const createUser = Api(
  {
    description: "create an new user",
    input: CreateUserInput,
    output: CreateUserOutput,
  },
  async (input) => {
    const maybeExistUser = await prisma.user.findUnique({
      where: { username: input.username },
    });
    if (maybeExistUser)
      return {
        type: "CREATE_USER_EXIST" as const,
        message: `user ${maybeExistUser.username} already exist`,
      };
    const maybePassword = await hashPassword(input.password);
    if (either.isRight(maybePassword))
      return {
        type: "CREATE_USER_HASH_FAILED" as const,
        message: maybePassword.right,
      };
    const hashedPassword = maybePassword.left;

    const { password, ...maskUser } = await prisma.user.create({
      data: {
        ...input,
        password: hashedPassword,
        createdAt: new Date(),
      },
    });
    return {
      type: "CREATE_USER_SUCCESS" as const,
      user: { ...maskUser, createdAt: maskUser.createdAt.toDateString() },
    };
  }
);

// ! login
export class LoginInput extends ObjectType {
  username = {
    [Type]: String,
  };
  password = {
    [Type]: String,
  };
}

export class LoginSuccess extends ObjectType {
  __typename = Literal("LOGIN_SUCCESS");
  token = String;
}
export class UserNotFound extends ObjectType {
  __typename = Literal("USER_NOT_FOUND");
  message = String;
  username = String;
}
export class PasswordError extends ObjectType {
  __typename = Literal("PASSWORD_ERROR");
  message = String;
}
export class LoginOutput extends ObjectType {
  data = Union(LoginSuccess, UserNotFound, PasswordError);
}

export const login = Api(
  {
    description: "login with username and password",
    input: LoginInput,
    output: LoginOutput,
  },
  // todo fix
  async (input) => {
    // UserNotFound
    const maybeUser = await prisma.user.findUnique({
      where: { username: input.username },
    });
    if (!maybeUser)
      return {
        data: {
          __typename: "USER_NOT_FOUND" as const,
          message: "user not found",
          username: input.username,
        },
      };

    // PasswordError
    const maybeValidPasword = await verifyPassword(
      maybeUser.password,
      input.password
    );
    if (either.isRight(maybeValidPasword))
      return {
        data: {
          __typename: "PASSWORD_ERROR" as const,
          message: maybeValidPasword.right,
        },
      };

    // LoginSuccess
    const token = jwtSign(maybeUser);
    return { data: { __typename: "LOGIN_SUCCESS" as const, token } };
  }
);

// ! get user info
export class GetUserInfoInput extends ObjectType {}
export class GetUserInfoSuccess extends ObjectType {
  type = Literal("GET_USER_INFO_SUCCESS");
  user = MaskUser;
}
export class GetUserInfoFail extends ObjectType {
  type = Literal("GET_USER_INFO_FAIL");
  message = String;
}
export const GetUserInfoOutput = Union(GetUserInfoSuccess, GetUserInfoFail);
export const getUserInfo = Api(
  {
    description: "get user info",
    input: GetUserInfoInput,
    output: GetUserInfoOutput,
  },
  async (input) => {
    const verifiedUser = UserContext.get();
    if (!verifiedUser)
      return { type: "GET_USER_INFO_FAIL" as const, message: "invalid user" };
    const maybeUser = await prisma.user.findUnique({
      where: { id: verifiedUser.id },
    });
    if (!maybeUser)
      return { type: "GET_USER_INFO_FAIL" as const, message: "invalid user" };

    const { password, ...maskUser } = maybeUser;
    return {
      type: "GET_USER_INFO_SUCCESS" as const,
      user: { ...maskUser, createdAt: maskUser.createdAt.toDateString() },
    };
  }
);

// ! get user by id
export class GetUserByIdInput extends ObjectType {
  id = Int;
}

export class GetUserByIdSuccess extends ObjectType {
  type = Literal("GET_USER_BY_ID_SUCCESS");
  user = MaskUser;
}
export class GetUserByIdNotFound extends ObjectType {
  type = Literal("GET_USER_BY_ID_NOT_FOUND");
  message = String;
}
export const GetUserByIdOutput = Union(GetUserByIdSuccess, GetUserByIdNotFound);

export const getUserById = Api(
  {
    description: "get user by id",
    input: GetUserByIdInput,
    output: GetUserByIdOutput,
  },
  async (input) => {
    const maybeUser = await prisma.user.findUnique({ where: { id: input.id } });
    if (!maybeUser)
      return {
        type: "GET_USER_BY_ID_NOT_FOUND" as const,
        message: "user not found",
      };
    const { password, ...maskUser } = maybeUser;
    return {
      type: "GET_USER_BY_ID_SUCCESS" as const,
      user: { ...maskUser, createdAt: maskUser.createdAt.toDateString() },
    };
  }
);

export const service = ApiService({
  entries: {
    login,
    createUser,
    getUserInfo,
    getUserById,
  },
});
