import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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

const App = () => {
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
        <Route path="/cart" component={Cart} exact />
        <Route path="/checkout" component={Checkout} exact />
        <Route path="/payment" component={Payment} exact />
        <Route path="/customer" component={CustomerRoute} />
        <Route path="/admin" component={AdminRoute} />
      </Switch>
    </Router>
  );

  return routes;
};

export default App;
