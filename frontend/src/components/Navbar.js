import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

import { useUserContext } from "../contexts/UserContext";

const Navbar = (props) => {
  const { user, logout, cart } = useUserContext();

  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white border-coolGray-400 border-b lg:border-0">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
          <NavLink
            className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
            to="/"
            activeClassName="text-royal-blue font-bold"
            exact
          >
            Picnic shop
          </NavLink>
        </div>
        <div className="lg:flex flex-grow items-center">
          <ul className="flex flex-1 flex-col lg:flex-row list-none ml-auto">
            <li className="nav-item">
              <NavLink
                className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug hover:opacity-75"
                to="/products"
                activeClassName="text-royal-blue font-bold"
                exact
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug hover:opacity-75"
                to="/promotions"
                activeClassName="text-royal-blue font-bold"
                exact
              >
                Promotions
              </NavLink>
            </li>
          </ul>

          <ul className="flex flex-col lg:flex-row list-none ml-auto">
            {user ? (
              <Fragment>
                <li className="nav-item">
                  <NavLink
                    className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug hover:opacity-75 cursor-pointer"
                    to="/cart"
                    activeClassName="text-royal-blue font-bold"
                    exact
                  >
                    <span className="material-icons mr-1">shopping_cart</span>{" "}
                    cart(
                    {cart?.products?.length})
                  </NavLink>
                </li>

                <li className="user-dropdown nav-item">
                  {/* <NavLink
                    className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug cursor-pointer hover:opacity-75"
                    to="/customer"
                     activeClassName="text-royal-blue font-bold"
                    exact
                  >
                    <span className="material-icons mr-1">person</span>
                    {user.username}
                  </NavLink> */}

                  <span className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug cursor-pointer hover:opacity-75">
                    <span className="material-icons mr-1">person</span>
                    {user.username}
                  </span>

                  <div className="user-dropdown-content absolute hidden w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <NavLink
                      className="flex items-center px-4 py-2 text-sm uppercase leading-snug cursor-pointer hover:opacity-75"
                      to="/customer"
                      activeClassName="text-royal-blue font-bold"
                      exact
                    >
                      <span className="material-icons mr-1">badge</span>
                      my Account
                    </NavLink>

                    <NavLink
                      className="flex items-center px-4 py-2 text-sm uppercase leading-snug cursor-pointer hover:opacity-75"
                      to="/customer/orders"
                      activeClassName="text-royal-blue font-bold"
                      exact
                    >
                      <span className="material-icons mr-1">list_alt</span>
                      my orders
                    </NavLink>

                    <div
                      className="flex items-center px-4 py-2 text-sm uppercase leading-snug cursor-pointer hover:opacity-75"
                      onClick={logout}
                    >
                      <span className="material-icons mr-1">logout</span>Logout
                    </div>
                  </div>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="nav-item">
                  <NavLink
                    className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug hover:opacity-75"
                    to="/login"
                    activeClassName="text-royal-blue font-bold"
                    exact
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug hover:opacity-75"
                    to="/register"
                    activeClassName="text-royal-blue font-bold"
                    exact
                  >
                    Register
                  </NavLink>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
