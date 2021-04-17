import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import AdminCreateProduct from "./AdminCreateProduct";
import AdminCreatePromotion from "./AdminCreatePromotion";
import AdminDashboard from "./AdminDashboard";
import AdminOrderDetail from "./AdminOrderDetail";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminPromotions from "./AdminPromotions";
import AdminUpdateProduct from "./AdminUpdateProduct";
import AdminUpdatePromotion from "./AdminUpdatePromotion";

const AdminRoute = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} component={AdminDashboard} exact />
      <Route path={`${path}/products`} component={AdminProducts} exact />
      <Route
        path={`${path}/product/create`}
        component={AdminCreateProduct}
        exact
      />
      <Route
        path={`${path}/product/:productId`}
        component={AdminUpdateProduct}
        exact
      />
      <Route path={`${path}/promotions`} component={AdminPromotions} exact />
      <Route
        path={`${path}/promotion/create`}
        component={AdminCreatePromotion}
        exact
      />
      <Route
        path={`${path}/promotion/:promotionId`}
        component={AdminUpdatePromotion}
        exact
      />
      <Route path={`${path}/orders`} component={AdminOrders} exact />
      <Route
        path={`${path}/order/:orderId`}
        component={AdminOrderDetail}
        exact
      />
    </Switch>
  );
};

export default AdminRoute;
