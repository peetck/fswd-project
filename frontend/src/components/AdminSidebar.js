import React from "react";
import { NavLink } from "react-router-dom";

import { useUserContext } from "../contexts/UserContext";

const AdminSidebar = (props) => {
  const { logout } = useUserContext();

  return (
    <div className="md:flex flex-col md:flex-row md:min-h-screen md:w-64 w-full shadow-xl">
      <div className="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
        <div className="flex-shrink-0 px-8 py-4 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="md:block text-left md:pb-6 mr-0 inline-block whitespace-nowrap text-lg uppercase font-bold p-4 px-0">
              Picnic shop admin
            </span>

            <span
              className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500 cursor-pointer md:hidden"
              onClick={logout}
            >
              <div className="flex items-center">
                <span className="material-icons mr-1">logout</span>
                Logout
              </div>
            </span>
          </div>

          <hr className="my-4 md:min-w-full" />

          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Overview
          </h6>

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <NavLink
                className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                activeClassName="text-royal-blue font-bold"
                exact
                to="/admin"
              >
                <div className="flex items-center">
                  <span className="material-icons mr-1">dashboard</span>
                  Dashboard
                </div>
              </NavLink>
            </li>
          </ul>

          <hr className="my-4 md:min-w-full" />

          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Admin Products
          </h6>

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <NavLink
                className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                activeClassName="text-royal-blue font-bold"
                exact
                to="/admin/products"
              >
                <div className="flex items-center">
                  <span className="material-icons mr-1">inventory_2</span>
                  Products
                </div>
              </NavLink>
            </li>
            <li className="items-center">
              <NavLink
                className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                activeClassName="text-royal-blue font-bold"
                exact
                to="/admin/product/create"
              >
                <div className="flex items-center">
                  <span class="material-icons mr-1"> add_circle_outline </span>
                  Create Product
                </div>
              </NavLink>
            </li>
          </ul>

          <hr className="my-4 md:min-w-full" />

          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Admin Promotions
          </h6>

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <NavLink
                className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                activeClassName="text-royal-blue font-bold"
                exact
                to="/admin/promotions"
              >
                <div className="flex items-center">
                <span class="material-icons mr-1">local_offer</span>
                  Promotions
                </div>
              </NavLink>
            </li>
            <li className="items-center">
              <NavLink
                className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                activeClassName="text-royal-blue font-bold"
                exact
                to="/admin/promotion/create"
              >
                <div className="flex items-center">
                  <span className="material-icons mr-1">add_circle_outline</span>
                  Create Promotion
                </div>
              </NavLink>
            </li>
          </ul>

          <hr className="my-4 md:min-w-full" />

          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Admin Orders
          </h6>

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <NavLink
                className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                activeClassName="text-royal-blue font-bold"
                exact
                to="/admin/orders"
              >
                <div className="flex items-center">
                <span class="material-icons mr-1">receipt</span>
                  Orders
                </div>
              </NavLink>
            </li>
          </ul>

          <hr className="my-4 md:min-w-full" />

          <ul className="md:flex-col md:min-w-full md:flex flex-col list-none hidden">
            <li className="items-center">
              <span
                className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500 cursor-pointer"
                onClick={logout}
              >
                <div className="flex items-center">
                  <span className="material-icons mr-1">logout</span>
                  Logout
                </div>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
