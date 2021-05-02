import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import CartItem from "../../components/CartItem";
import Input from "../../components/Input";

const ORDER_QUERY = gql`
  query($order_Id: MongoID!) {
    order(_id: $order_Id) {
      products {
        title
        price
        priceAfterDiscount
        percent
        color
        size
        quantity
        type
        imageUrl
      }
      deliveryAddress
      deliveryStatus
      createdAt
      totalPrice
      paymentMethod
    }
  }
`;

const AdminOrderDetail = () => {
  const { orderId } = useParams();
  const { data, loading, error } = useQuery(ORDER_QUERY, {
    variables: {
      order_Id: orderId,
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
    <div className="flex flex-col mx-8">
      <div className="container mx-auto my-7 min-w-min">
        <div className="flex flex-col lg:flex-row ">
          <div className="w-full lg:w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-bold uppercase text-2xl">
                Order no: {orderId}
              </h1>
              <h2 className="font-bold text-2xl uppercase hidden sm:inline-block">
                {data.order.products.length} Items
              </h2>
            </div>
            <div className="flex justify-center mt-10 mb-5 -mx-8 px-6">
              <h3 className="font-bold text-gray-600 text-xs uppercase w-2/5">
                Product
              </h3>
              <h3 className="font-bold text-gray-600 text-xs uppercase w-1/5 text-center hidden lg:block">
                Unit Price
              </h3>
              <h3 className="font-bold text-gray-600 text-xs uppercase w-2/5 text-center lg:w-1/5">
                Amount
              </h3>
              <h3 className="font-bold text-gray-600 text-xs uppercase w-1/5 text-center ">
                Item Subtotal
              </h3>
            </div>

            {data.order.products.map((product) => (
              <CartItem
                key={uuidv4()}
                title={product.title}
                color={product.color}
                price={product.price}
                type={product.type}
                quantity={product.quantity}
                priceAfterDiscount={product.priceAfterDiscount}
                size={product.size}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
          <div className="w-full lg:w-1/4 px-8 py-10">
            <h1 className="font-bold text-2xl border-b pb-8 uppercase">
              Information
            </h1>

            <div className="text-center my-8 uppercase border-b pb-8 text-royal-blue text-4xl">
              ฿{data.order.totalPrice}
            </div>

            <div
              className={`text-center text-4xl my-8 uppercase ${
                data.order.deliveryStatus === "Waiting"
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
            >
              {data.order.deliveryStatus}
            </div>

            <div className="flex flex-col justify-between mb-5 border-t mt-8">
              <span className="font-bold text-sm uppercase mt-8">
                Payment Method
              </span>
              <div className="mt-6">
                <div className="flex items-center justify-between w-full bg-white rounded-md border p-4 focus:outline-none">
                  <label className="flex items-center">
                    <span className="ml-2 text-sm text-gray-700">
                      {data.order.paymentMethod === "CreditCard"
                        ? "Credit Card"
                        : "Cash on Delivery"}
                    </span>
                  </label>

                  <span className="material-icons">
                    {data.order.paymentMethod === "CreditCard"
                      ? "credit_card"
                      : "paid"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between mb-5 border-t mt-8">
              <span className="font-bold text-sm uppercase mt-8">
                Delivery Address
              </span>

              <div className="mt-6">
                <Input
                  name="address"
                  value={data.order.deliveryAddress}
                  rows={3}
                  type="textarea"
                  disabled
                />
              </div>
            </div>

            <div className="border-t mt-8">
              <div className="flex justify-between pb-6 text-sm uppercase mt-11 items-end">
                <h1 className="flex items-center text-lg">
                  {moment(data.order.createdAt).format("ll")}
                </h1>
                <h1 className="flex items-center text-lg">
                  {moment(data.order.createdAt).format("LT")}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
