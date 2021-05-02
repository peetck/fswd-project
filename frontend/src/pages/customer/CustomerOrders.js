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
              className="flex flex-1 p-5 my-4 border rounded-xl justify-between items-center select-none cursor-pointer transform transition ease-in hover:-translate-y-1 duration-75"
            >
              <div>
                <h1 className="text-royal-blue text-xl font-bold">
                  ฿{order.totalPrice}
                </h1>

                <h1 className="text-xs text-coolGray-400 mt-2 uppercase">
                  {moment(order.createdAt).format("LT")}
                </h1>

                <h1 className="text-xs text-coolGray-400 uppercase">
                  {moment(order.createdAt).format("ll")}
                </h1>

                <h1 className="text-xs text-coolGray-400 uppercase">
                  order no: {order._id}
                </h1>
              </div>

              <div
                className={`text-3xl mr-8 uppercase ${
                  order.deliveryStatus === "Waiting"
                    ? "text-yellow-500"
                    : "text-green-600"
                }`}
              >
                {order.deliveryStatus}
              </div>
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
          alt="shipping-package"
        />
      </div>
    </WithCustomerSideBar>
  );
};

export default CustomerOrders;
