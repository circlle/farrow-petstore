import { Int, ObjectType, Type, Nullable, Union, Literal } from "farrow-schema";
import { ValidatorType, createSchemaValidator } from "farrow-schema/validator";
import { Api } from "farrow-api";
import { prisma } from "../prisma";
import { verifyPassword, hashPassword } from "../security/passwordMask";
import { sign as jwtSign } from "../security/jwt";
import { either } from "fp-ts";
import { ApiService } from "farrow-api-server";

export class DateStringType extends ValidatorType<Date> {
  outputType = "Date";
  validate(input: unknown) {
    if (input instanceof Date) {
      return this.Ok(input);
    }
    if (typeof input === "number" || typeof input === "string") {
      return this.Ok(new Date(input));
    }
    return this.Err(`${input} is not a valid date`);
  }
}

export class User extends ObjectType {
  id = {
    [Type]: Int,
  };
  username = {
    [Type]: String,
  };
  password = {
    desctiption: "need mask",
    [Type]: String,
  };
  email = {
    [Type]: Nullable(String),
  };
  avatar = {
    [Type]: Nullable(String),
  };
  createdAt = {
    [Type]: String,
  };
}

export class MaskUser extends ObjectType {
  id = {
    [Type]: Int,
  };
  username = {
    [Type]: String,
  };
  email = {
    [Type]: Nullable(String),
  };
  avatar = {
    [Type]: Nullable(String),
  };
  createdAt = {
    [Type]: String,
  };
}

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

export class CreateUserFailed extends ObjectType {
  message = String;
}
export class CreatedUserSuccess extends ObjectType {
  user = {
    [Type]: MaskUser,
  };
}

export class CreateUserOutput extends ObjectType {
  data = {
    [Type]: Union(CreatedUserSuccess, CreateUserFailed),
  };
}

export const createUser = Api(
  {
    description: "create an new user",
    input: CreateUserInput,
    output: CreateUserOutput,
  },
  async (input) => {
    const maybePassword = await hashPassword(input.password);
    if (either.isRight(maybePassword))
      return { data: { message: maybePassword.right } };

    const hashedPassword = maybePassword.left;

    const { password, ...maskUser } = await prisma.user.create({
      data: {
        ...input,
        password: hashedPassword,
        createdAt: new Date(),
      },
    });
    return {
      data: {
        user: { ...maskUser, createdAt: maskUser.createdAt.toDateString() },
      },
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

export const service = ApiService({
  entries: {
    login,
    createUser,
  },
});
