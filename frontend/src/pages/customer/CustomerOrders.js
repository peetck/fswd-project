import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import moment from "moment";
import { toast } from "react-toastify";

import { useUserContext } from "../../contexts/UserContext";
import Loader from "../../components/Loader";
import WithCustomerSideBar from "../../components/WithCustomerSideBar";

const ORDERS_QUERY = gql`
  query($userId: MongoID!) {
    orders(filter: { userId: $userId }) {
      _id
      products {
        title
        type
        priceAfterDiscount
        percent
        price
        quantity
        color
        size
      }
      totalPrice
      deliveryAddress
      deliveryStatus
      createdAt
      paymentMethod
    }
  }
`;

const CustomerOrders = () => {
  const { user } = useUserContext();

  const { data, loading, error } = useQuery(ORDERS_QUERY, {
    variables: {
      userId: user._id,
    },
  });

  if (error) {
    toast.error(error.message);
  }

  if (loading) {
    return (
      <div className="flex justify-center mt-32">
        <Loader />
      </div>
    );
  }

  return (
    <WithCustomerSideBar>
      <div className="w-3/6">
        <div className="flex flex-1 flex-col">
          {data.orders.map((order) => (
            <Link
              key={order._id}
              to={`/customer/order/${order._id}`}
              className="flex flex-1 px-5 py-4 mt-4 border rounded-xl justify-between items-center select-none cursor-pointer hover:opacity-80"
            >
              <div>
                <h1 className="text-royal-blue text-xl font-bold">
                  ฿{order.totalPrice}
                </h1>

                <h1 className="text-sm text-coolGray-400 mt-2">
                  {moment(order.createdAt).format("LT")}
                </h1>

                <h1 className="text-sm text-coolGray-400">
                  {moment(order.createdAt).format("ll")}
                </h1>
              </div>

              <div className="text-3xl mr-8 text-green-600">{"WAITING"}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-96 mr-14 hidden lg:block lg:ml-20">
        <img
          src={
            process.env.PUBLIC_URL + "/images/069-shipping-package-colour.svg"
          }
          className="w-full h-full"
        />
      </div>
    </WithCustomerSideBar>
  );
};

export default CustomerOrders;
