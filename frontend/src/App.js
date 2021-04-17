import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Promotions from "./pages/Promotions";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";

import AdminRoute from "./pages/admin/AdminRoute";
import CustomerRoute from "./pages/customer/CustomerRoute";
import { useAuthContext } from "./contexts/AuthContext";

const App = () => {
  const { user } = useAuthContext();

  const routes = (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/products" component={Products} exact />
        <Route path="/product/:productSlug" component={ProductDetail} exact />
        <Route path="/promotions" component={Promotions} exact />

        {user &&
          (user?.type === "AdminUser" ? (
            <Route path="/admin" component={AdminRoute} />
          ) : (
            <Fragment>
              <Route path="/cart" component={Cart} exact />
              <Route path="/checkout" component={Checkout} exact />
              <Route path="/payment" component={Payment} exact />
              <Route path="/customer" component={CustomerRoute} />
            </Fragment>
          ))}
      </Switch>
    </Router>
  );

  return routes;
};

export default App;
