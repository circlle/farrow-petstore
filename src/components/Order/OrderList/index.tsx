import React, { useEffect, useState, useReducer } from "react";
import { api as OrderApi, Order } from "@server-api/order";
import OrderItem from "./OrderItem";

export type State = { orders: Order[] };
export type Action =
  | {
      type: "INIT";
      payload: Order[];
    }
  | {
      type: "UPDATE_ONE_ORDER";
      payload: Order;
    }
  | {
      type: "DELETE_ONE_ORDER";
      payload: number;
    };
const initState: State = { orders: [] };
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INIT":
      return { orders: action.payload };
    case "UPDATE_ONE_ORDER":
      return {
        orders: state.orders.map((order) => {
          if (order.id !== action.payload.id) return order;
          return {
            ...order,
            ...action.payload,
          };
        }),
      };
    case "DELETE_ONE_ORDER":
      return {
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    default:
      return state;
  }
}

function OrderList() {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    OrderApi.getOrderList({ pageIndex: 0, pageSize: 20 }).then((data) => {
      if (data.type === "USER_NOT_VALID") {
        // todo better error handle
        console.log(data.message);
      } else if (data.type === "GET_ORDER_LIST_SUCCESS") {
        dispatch({ type: "INIT", payload: data.list });
      }
    });
  }, []);
  return (
    <div>
      {state.orders.map((order) => {
        return (
          <div key={order.id}>
            <OrderItem dispatch={dispatch} order={order} />
          </div>
        );
      })}
    </div>
  );
}

export default OrderList;
