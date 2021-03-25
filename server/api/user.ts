import { Int, ObjectType, Type, Nullable, Union, Literal } from "farrow-schema";
import { ValidatorType, createSchemaValidator } from "farrow-schema/validator";
import { UserStatus } from "@prisma/client";
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
  status = {
    [Type]: Nullable(
      Union(
        Literal(UserStatus.AVAILABLE),
        Literal(UserStatus.PENDING),
        Literal(UserStatus.SOLD)
      )
    ),
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
  status = {
    [Type]: Nullable(
      Union(
        Literal(UserStatus.AVAILABLE),
        Literal(UserStatus.PENDING),
        Literal(UserStatus.SOLD)
      )
    ),
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
  status = {
    [Type]: Nullable(
      Union(
        Literal(UserStatus.AVAILABLE),
        Literal(UserStatus.PENDING),
        Literal(UserStatus.SOLD)
      )
    ),
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
  token = String;
}
export class UserNotFound extends ObjectType {
  message = String;
  username = String;
}
export class PasswordError extends ObjectType {
  message = String;
}
export class LoginOutput extends ObjectType {
  data = {
    [Type]: Union(LoginSuccess, UserNotFound, PasswordError),
  };
}

export const login = Api(
  {
    description: "login with username and password",
    input: LoginInput,
    output: LoginOutput,
  },
  async (input) => {
    // UserNotFound
    const maybeUser = await prisma.user.findUnique({
      where: { username: input.username },
    });
    if (!maybeUser)
      return { data: { message: "user not found", username: input.username } };

    // PasswordError
    const maybeValidPasword = await verifyPassword(
      maybeUser.password,
      input.password
    );
    if (either.isRight(maybeValidPasword))
      return { data: { message: maybeValidPasword.right } };

    // LoginSuccess
    const token = jwtSign(maybeUser);
    return { data: { token } };
  }
);


export const service = ApiService({
  entries: {
    login,
    createUser
  }
})