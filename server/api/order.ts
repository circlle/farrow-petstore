import { Api } from "farrow-api";
import {
  Int,
  ObjectType,
  Boolean,
  String,
  Literal,
  Union,
} from "farrow-schema";
import { prisma } from "../prisma";
import { UserContext } from "../hooks";
import { ApiService } from "farrow-api-server";
// export type Order = {
//   id: number
//   petId: number
//   userId: number
//   shipDate: Date
//   complete: boolean
// }
export class Order extends ObjectType {
  id = Int;
  petId = Int;
  userId = Int;
  shipDate = String;
  complete = Boolean;
}
// ! create order
export class CreateOrderInput extends ObjectType {
  petId = Int;
}
export class InvalidUser extends ObjectType {
  type = Literal("INVALID_USER");
  message = String;
}
export class CreateOrderSuccess extends ObjectType {
  type = Literal("CREATE_ORDER_SUCCESS");
  order = Order;
}
export const CreateOrderOutput = Union(InvalidUser, CreateOrderSuccess);

export const createOrder = Api(
  {
    description: "create a new order",
    input: CreateOrderInput,
    output: CreateOrderOutput,
  },
  async (input) => {
    const maybeUser = UserContext.assert();
    if (!maybeUser)
      return { type: "INVALID_USER" as const, message: "user info invalid" };
    const newOrder = await prisma.order.create({
      data: {
        petId: input.petId,
        userId: maybeUser.id,
        complete: false,
        shipDate: new Date().toDateString(),
      },
    });
    return {
      type: "CREATE_ORDER_SUCCESS" as const,
      order: { ...newOrder, shipDate: newOrder.shipDate.toDateString() },
    };
  }
);

export const service = ApiService({
  entries: {
    createOrder,
  },
});
