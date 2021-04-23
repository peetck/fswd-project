import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import AdminSidebar from "./components/AdminSidebar";
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
import { useUserContext } from "./contexts/UserContext";

const App = () => {
  const { user } = useUserContext();

  let routes;

  if (!user) {
    routes = (
      <Fragment>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/products" component={Products} exact />
          <Route path="/product/:productSlug" component={ProductDetail} exact />
          <Route path="/promotions" component={Promotions} exact />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Fragment>
    );
  } else if (user.type === "CustomerUser") {
    routes = (
      <Fragment>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/products" component={Products} exact />
          <Route path="/product/:productSlug" component={ProductDetail} exact />
          <Route path="/promotions" component={Promotions} exact />
          <Route path="/cart" component={Cart} exact />
          <Route path="/checkout" component={Checkout} exact />
          <Route path="/payment" component={Payment} exact />
          <Route path="/customer" component={CustomerRoute} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Fragment>
    );
  } else {
    routes = (
      <Fragment>
        <div className="flex flex-col md:flex-row">
          <AdminSidebar />
          <Switch>
            <Route path="/admin" component={AdminRoute} />
            <Route>
              <Redirect to="/admin" />
            </Route>
          </Switch>
        </div>
      </Fragment>
    );
  }

  // if (!user) {
  //   return <h1>Loading...</h1>;
  // }

  return <Router basename={process.env.PUBLIC_URL}>{routes}</Router>;
};

export default App;
