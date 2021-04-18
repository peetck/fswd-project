import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

const Navbar = (props) => {
  const { user, logout } = useAuthContext();

  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-teal-500 mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
          <Link
            className="flex flex-no-shrink items-center mr-6 py-3 text-grey-darkest"
            to="/"
          >
            <img
              className="h-10 mr-2 w-10"
              src="favicon.webp"
              width="40px"
              height="40px"
              alt="logo"
            />
          </Link>
          {/* Hamburger Menu */}
          {/* <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
          >
            <span className="block relative w-6 h-px rounded-sm bg-white"></span>
            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
          </button> */}
        </div>
        <div className="lg:flex flex-grow items-center">
          <ul className="flex flex-col lg:flex-row list-none ml-auto">
            {user ? (
              <Fragment>
                {user.type === "AdminUser" ? (
                  <Fragment>
                    <li className="nav-item">
                      <Link
                        to="/admin/products"
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      >
                        admin products
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/admin/product/create"
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      >
                        create product
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/admin/promotions"
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      >
                        admin promotions
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/admin/promotion/create"
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      >
                        create promotion
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/admin/orders"
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      >
                        {/* <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i> */}
                        admin orders
                      </Link>
                    </li>
                  </Fragment>
                ) : (
                  <Fragment>
                    <li className="nav-item">
                      <Link
                        to="/products"
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      >
                        {/* <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i> */}
                        products
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/promotions"
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      >
                        {/* <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i> */}
                        promotions
                      </Link>
                    </li>
                  </Fragment>
                )}
                <li className="nav-item">
                  <Link
                    onClick={logout}
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  >
                    {/* <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i> */}
                    Logout
                  </Link>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  >
                    {/* <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i> */}
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  >
                    {/* <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i> */}
                    Login
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
