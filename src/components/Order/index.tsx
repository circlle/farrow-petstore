import React from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import TopBar from "../shared/TopBar";
import OrderDetail from "./OrderDetail";
import OrderList from "./OrderList";

function Order() {
  const { path } = useRouteMatch();
  return (
    <div>
      <TopBar title="Order" needBack={false} />
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
