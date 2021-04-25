import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import { useUserContext } from "../../contexts/UserContext";

const CustomerOrders = () => {
  const { user } = useUserContext();

  const { data, loading } = useQuery(
    gql`
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
    `,
    {
      variables: {
        userId: user._id,
      },
    }
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  console.log(data);

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-1/2">
            <button className="w-full focus:outline-none hover:border-b-2 border-red-500 focus:border-b-2 focus:border-red-500 ">
            <h1>On Delivery</h1>
            </button>
          
            </div>
            <div className="w-1/2 ">
            <button className="w-full focus:outline-none focus:outline-none hover:border-b-2 border-red-500 focus:border-b-2 focus:border-red-500">
            <h1>Completed</h1>
            </button>
            </div>
          
       
          </div>
        </div>
      {data.orders.map((order) => (
        <div className="container mx-auto mt-10 mb-10 ">
          <div className="flex shadow-md">
            <div className="w-full">
              <div className="border-b mb-10 pb-3 flex justify-between m-5">
                <div className="font-semibold">Order ID : {order._id}</div>
                <div className="flex flex-row-reverse ">
                  <p className="border-l ml-5 pl-5">{order.createdAt}</p>
                  <p className="">[Shiping] Free Delivery</p>
                </div>
              </div>

              <div className=" flex justify-between mb-10">
                <div className="md:pl-20 flex-1">
                  <h1 className="text-4xl">Order Total : THB {order.totalPrice}</h1>
                  {order.paymentMethod === "CashOnDelivery"? 
                  <h1>Payment Method : Cash on delivery</h1>
                  :
                  <h1>Payment Method : Credit card</h1>
                  }
                </div>
                <div className="">
                  
                  {String(order.deliveryStatus) === 'false'? 
                  <h1 className="text-4xl text-orange-500 pr-24">On Delivery</h1>
                  :
                  <h1 className="text-4xl text-green-700 pr-24">Completed</h1>
                }
          
                  <h1>{order.deliveryAddress}</h1>
                </div>
                <div className="pr-16 mt-5">
                  <Link to={`/customer/order/${order._id}`}>
                    <h1 className="text-blue-500">OrderDetail </h1>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        // <h1 key={order._id}>
        //   {order._id} - {order.totalPrice} -{" "}
        //   <Link to={`/customer/order/${order._id}`}>detail</Link>
        // </h1>
      ))}
    </div>
  );
};

export default CustomerOrders;
