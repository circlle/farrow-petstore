import { HttpMiddleware } from "farrow-http";
import { isSome } from "fp-ts/lib/Option";
import { createContext } from "farrow-pipeline";
import { verify } from "../security/jwt";
import { getUserById } from "../api/user";

interface ContextUser {
  id: number;
  username: string;
  email: string | undefined;
}
export const TOKEN_FILED = "petstore_token";
const UserContext = createContext<ContextUser | null>(null);

const UserProvider = (): HttpMiddleware => {
  return async (request, next) => {
    const token = request?.cookies?.[TOKEN_FILED];
    if (!token) {
      return next();
    }
    const maybeJwtInfo = await verify(token);
    if (isSome(maybeJwtInfo)) {
      const jwtInfo = maybeJwtInfo.value;
      const userId = jwtInfo.id;
      const maybeUser = await getUserById({ id: userId });
      if (maybeUser.type === "GET_USER_BY_ID_NOT_FOUND") {
        return next();
      } else {
        const user: ContextUser = {
          id: maybeUser.user.id,
          username: maybeUser.user.username,
          email: maybeUser.user.email,
        };
        UserContext.set(user);
        return next()
      }
    } else {
      return next();
    }
  };
};

export { UserContext };
export { UserProvider };
