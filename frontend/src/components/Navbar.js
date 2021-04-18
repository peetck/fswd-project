import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

const Navbar = (props) => {
  const { user, logout } = useAuthContext();

  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white mb-3 border-b border-coolGray-400">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
          <Link
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
            to="/"
          >
            Picnic shop
          </Link>
        </div>
        <div className="lg:flex flex-grow items-center">
          <ul className="flex flex-1 flex-col lg:flex-row list-none ml-auto">
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
                to="/products"
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
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
                  <span className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75 cursor-pointer">
                    <span class="material-icons mr-1">shopping_cart</span> cart
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75 cursor-pointer"
                    onClick={logout}
                  >
                    <span class="material-icons mr-1">person</span> {user.username}
                  </span>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
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
