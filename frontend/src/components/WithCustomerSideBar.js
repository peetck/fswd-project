import React from "react";
import { NavLink } from "react-router-dom";

const WithCustomerSideBar = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div className="container mx-auto my-7 min-w-min">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full bg-white px-10 py-10">
            <div className="flex flex-col justify-between border-b pb-5">
              <h1 className="font-bold text-2xl uppercase">My Account</h1>
              <h2 className="text-sm uppercase mt-1 text-coolGray-400">
                Manage and protect your account
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-col w-full lg:border-r lg:w-1/6">
                <NavLink
                  className="flex items-center mt-10 uppercase cursor-pointer text-sm lg:ml-5"
                  to="/customer"
                  activeClassName="text-royal-blue font-bold"
                  exact
                >
                  <span class="material-icons mr-2">account_circle</span>
                  Profile
                </NavLink>

                <NavLink
                  className="flex items-center my-10 uppercase cursor-pointer text-sm lg:ml-5"
                  to="/customer/orders"
                  activeClassName="text-royal-blue font-bold"
                  exact
                >
                  <span class="material-icons mr-2">description</span>
                  my orders
                </NavLink>
              </div>

              <div className="flex flex-row w-5/6 my-5 justify-between lg:m-10">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithCustomerSideBar;
