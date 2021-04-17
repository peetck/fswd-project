import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import CustomerInfo from "./CustomerInfo";
import CustomerOrderDetail from "./CustomerOrderDetail";
import CustomerOrders from "./CustomerOrders";

const CustomerRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path} component={CustomerInfo} exact />
      <Route path={`${path}/orders`} component={CustomerOrders} exact />
      <Route
        path={`${path}/order/:orderId`}
        component={CustomerOrderDetail}
        exact
      />
    </Switch>
  );
};

export default CustomerRoute;
