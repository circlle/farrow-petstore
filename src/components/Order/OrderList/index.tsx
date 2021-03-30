import React, { useEffect, useState } from "react";
import { api as OrderApi, Order } from "@server-api/order";
import OrderItem from "./OrderItem";
function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    OrderApi.getOrderList({ pageIndex: 0, pageSize: 20 }).then((data) => {
      if (data.type === "USER_NOT_VALID") {
        // todo better error handle
        console.log(data.message);
      } else if (data.type === "GET_ORDER_LIST_SUCCESS") {
        setOrders(data.list);
      }
    });
  }, []);
  return (
    <div>
      {orders.map((order) => {
        return (
          <div key={order.id}>
            <OrderItem order={order} />
          </div>
        );
      })}
    </div>
  );
}

export default OrderList;
