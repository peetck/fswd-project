
import React from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Loader from "../../components/Loader";

import { Link } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";
import Truncate from "react-truncate";
import CartItem from "../../components/CartItem";


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

  if (loading) {
    return (
      <div className="flex justify-center mt-32">
        <Loader />
      </div>
    );
  }

  console.log(data)
  return (
    <div className="">

      <div className="flex justify-center mt-10">
        <div className="flex flex-col ml-2 pt-4 px-6">
          <div className="bg-coolGray-500 lg:order-1 lg:row-span-1 2xl:row-span-1 lg:col-span-2 rounded-lg shadow-xl mb-5 lg:mb-0 p-5 pt-8">
            <div className="mx-6 my-3 2xl:mx-10 mb-10">
             <center >
              <h1 className="text-white text-xl">{orderId}</h1>
             </center>
              {/* <div>
                <div className="flex justify-between pb-6 text-sm uppercase mt-11 items-end">
                  <h1 className="flex items-center text-lg">
                    {moment(data.order.createdAt).format("ll")}
                  </h1>
                  <h1 className="flex items-center text-lg">
                    {moment(data.order.createdAt).format("LT")}
                  </h1>
                </div>
              </div>
              */}
            </div>
            <div className="-mt-6 relative">
              <p className="text-green-400 text-xl 2xl:text-4xl font-bold px-7 lg:px-9 2xl:pt-6 2xl:mx-2">{data.order.deliveryStatus}</p>
              <br />
              <p className="text-white md:text-sm 2xl:text-3xl px-7 lg:px-9 mb-3 2xl:pb-8 2xl:mx-2">ORDER TOTAL :{data.order.totalPrice}</p>

              <br />
              <p className="text-white  font-medium md:text-sm 2xl:text-3xl px-7 lg:px-9 mb-3 2xl:pb-8 2xl:mx-2">SHIPPING ADDRESS : {data.order.deliveryAddress}</p>
              <br />
              <p className="text-white  font-medium md:text-sm 2xl:text-3xl px-7 lg:px-9 mb-3 2xl:pb-8 2xl:mx-2">PAYMENT METHOD : {data.order.paymentMethod
              }</p>
            </div>
          </div>
        </div>
      </div>
              
      <div className="flex justify-center  ">
        

        <div className="w-full lg:w-3/4 bg-white px-10 py-10 ">
        <div className="flex justify-between pb-6 text-sm uppercase mt-11 items-end border-b border-black">
                  <h1 className="flex items-center text-lg">
                    {moment(data.order.createdAt).format("ll")}
                  </h1>
                  <h1 className="flex items-center text-lg">
                    {moment(data.order.createdAt).format("LT")}
                  </h1>
                </div>

          <div className="flex justify-center mt-10 mb-5 -mx-8 px-6 ">
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


      </div>


    </div>

  );
};

export default AdminOrderDetail;
