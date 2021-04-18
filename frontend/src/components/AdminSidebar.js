import React from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

const AdminSidebar = (props) => {
  const { logout } = useAuthContext();

  return (
    <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        <span className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
          Picnic shop admin
        </span>

        <div className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ">
          <hr className="my-4 md:min-w-full" />

          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Overview
          </h6>

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <Link
                className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                to="/admin"
              >
                <div className="flex items-center">
                  <span className="material-icons mr-1">dashboard</span>
                  Dashboard
                </div>
              </Link>
            </li>
          </ul>

          <hr className="my-4 md:min-w-full" />

          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Admin Products
          </h6>

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <Link
                className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                to="/admin/products"
              >
                <div className="flex items-center">
                  <span className="material-icons mr-1">inventory_2</span>
                  Products
                </div>
              </Link>
            </li>
            <li className="items-center">
              <Link
                className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                to="/admin/product/create"
              >
                <div className="flex items-center">
                  <span className="material-icons mr-1">inventory_2</span>
                  Create Product
                </div>
              </Link>
            </li>
          </ul>

          <hr className="my-4 md:min-w-full" />

          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Admin Promotions
          </h6>

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <Link
                className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                to="/admin/promotions"
              >
                <div className="flex items-center">
                  <span className="material-icons mr-1">inventory_2</span>
                  Promotions
                </div>
              </Link>
            </li>
            <li className="items-center">
              <Link
                className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                to="/admin/promotion/create"
              >
                <div className="flex items-center">
                  <span className="material-icons mr-1">inventory_2</span>
                  Create Promotion
                </div>
              </Link>
            </li>
          </ul>

          <hr className="my-4 md:min-w-full" />

          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Admin Orders
          </h6>

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <Link
                className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                to="/admin/orders"
              >
                <div className="flex items-center">
                  <span className="material-icons mr-1">inventory_2</span>
                  Orders
                </div>
              </Link>
            </li>
          </ul>

          <hr className="my-4 md:min-w-full" />

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
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
    </nav>
  );
};

export default AdminSidebar;
