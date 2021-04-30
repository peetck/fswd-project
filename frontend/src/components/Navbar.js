import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import { useUserContext } from "../contexts/UserContext";

const Navbar = (props) => {
  const { user, logout, cart } = useUserContext();

  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white border-coolGray-400 border-b lg:border-0">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
          <Link
            className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
            to="/"
          >
            Picnic shop
          </Link>
        </div>
        <div className="lg:flex flex-grow items-center">
          <ul className="flex flex-1 flex-col lg:flex-row list-none ml-auto">
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug hover:opacity-75"
                to="/products"
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug hover:opacity-75"
                to="/promotions"
              >
                Promotions
              </Link>
            </li>
          </ul>

          <ul className="flex flex-col lg:flex-row list-none ml-auto">
            {user ? (
              <Fragment>
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug hover:opacity-75 cursor-pointer"
                    to="/cart"
                  >
                    <span className="material-icons mr-1">shopping_cart</span>{" "}
                    cart(
                    {cart?.products?.length})
                  </Link>
                </li>

                <li className="user-dropdown nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug cursor-pointer hover:opacity-75"
                    to="/customer"
                  >
                    <span className="material-icons mr-1">person</span>
                    {user.username}
                  </Link>
                  <div className="user-dropdown-content absolute hidden w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link
                      className="flex items-center px-4 py-2 text-sm uppercase leading-snug cursor-pointer hover:opacity-75"
                      to="/customer/orders"
                    >
                      <span className="material-icons mr-1">list_alt</span>
                      my orders
                    </Link>

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
                  <Link
                    className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug hover:opacity-75"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug hover:opacity-75"
                    to="/register"
                  >
                    Register
                  </Link>
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
