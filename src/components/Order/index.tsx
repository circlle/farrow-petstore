import React from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import OrderDetail from "./OrderDetail";
import OrderList from "./OrderList";

function Order() {
  const { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${path}`} exact>
          <OrderList />
        </Route>
        <Route path={`${path}/list`}>
          <OrderList />
        </Route>
        <Route path={`${path}/:orderId`}>
          <OrderDetail />
        </Route>
      </Switch>
    </div>
  );
}

export default Order;
