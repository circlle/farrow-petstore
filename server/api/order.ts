import { Api } from "farrow-api";
import {
  Int,
  ObjectType,
  Boolean,
  String,
  Literal,
  Union,
  List,
  Nullable,
} from "farrow-schema";
import { OrderStatus as OrderStatusPrisma } from "@prisma/client";
import { prisma } from "../prisma";
import { UserContext } from "../hooks";
import { ApiService } from "farrow-api-server";
import { Pagination } from "./shared";
import { MaskUser } from "./user";
import { MaskPet, petToMaskPet } from "./pet";

export const OrderStatus = Union(
  Literal(OrderStatusPrisma.NEW),
  Literal(OrderStatusPrisma.CONFIRMED),
  Literal(OrderStatusPrisma.DELETED)
);
export class Order extends ObjectType {
  id = Int;
  petId = Int;
  userId = Int;
  shipDate = String;
  complete = Boolean;
  user = MaskUser;
  pet = MaskPet;
  status = OrderStatus;
}
export class SimpleOrder extends ObjectType {
  id = Int;
  petId = Int;
  userId = Int;
  shipDate = String;
  complete = Boolean;
  status = OrderStatus;
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
  order = SimpleOrder;
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
        shipDate: new Date(),
      },
    });
    return {
      type: "CREATE_ORDER_SUCCESS" as const,
      order: { ...newOrder, shipDate: newOrder.shipDate.toDateString() },
    };
  }
);

// ! get order list
export class GetOrderListInput extends ObjectType {
  pageIndex = Nullable(Int);
  pageSize = Nullable(Int);
}
export class GetOrderListSuccess extends ObjectType {
  type = Literal("GET_ORDER_LIST_SUCCESS");
  list = List(Order);
  pagination = Pagination;
}
export class GetOrderListUserInvalid extends ObjectType {
  type = Literal("USER_NOT_VALID");
  message = String;
}
export const GetOrderListOutput = Union(
  GetOrderListSuccess,
  GetOrderListUserInvalid
);
export const getOrderList = Api(
  {
    description: "get order list",
    input: GetOrderListInput,
    output: GetOrderListOutput,
  },
  async (input) => {
    const user = UserContext.assert();
    if (!user) {
      return {
        type: "USER_NOT_VALID" as const,
        message: "can't find user info",
      };
    }
    const userId = user.id;
    const pageIndex = input.pageIndex ?? 0;
    const pageSize = input.pageSize ?? 20;
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        orderBy: [{ id: "desc" }],
        skip: pageIndex * pageSize,
        take: pageSize,
        include: {
          user: true,
          pet: { include: { category: true, photos: true } },
        },
      }),
      prisma.pet.count(),
    ]);
    return {
      type: "GET_ORDER_LIST_SUCCESS" as const,
      list: orders.map((order) => {
        const { password, ...maskUser } = order.user;
        return {
          ...order,
          user: {
            ...maskUser,
            createdAt: maskUser.createdAt.toDateString(),
          },
          pet: petToMaskPet(order.pet),
          shipDate: order.shipDate.toDateString(),
        };
      }),
      pagination: { total, pageIndex, pageSize, count: orders.length },
    };
  }
);

export const service = ApiService({
  entries: {
    createOrder,
    getOrderList,
  },
});
