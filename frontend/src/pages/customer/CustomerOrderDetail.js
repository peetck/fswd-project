import { useQuery, gql } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";

const CustomerOrderDetail = () => {
  const { orderId } = useParams();

  // TODO: fetch order
  const { data, loading } = useQuery(
    gql`
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
          }
          deliveryAddress
          deliveryStatus
          userId
          updatedAt
          createdAt
          totalPrice
        }
      }
    `,
    {
      variables: {
        order_Id: orderId,
      },
    }
  );
  console.log(data)

  return (
    <div>

      {/* <h1>{data && data.order.totalPrice}</h1> */}
      <div className="container mx-auto mt-10 mb-10 ">

        <div className="flex shadow-md">
          <div className="w-full">
            <div className="border-b mb-10 pb-3 flex justify-between m-5">
              <div className="font-semibold">
                Order ID : {orderId}
              </div>
              <div>
                Create order at : {data && data.order.createdAt}
                </div>
            </div>
            <div className="flex pl-20 pr-20 uppercase  text-gray-600 text-xs m-10">
            <div className="w-3/12 ">
              Title
              </div>
              <div className="w-1/12">
              Color
              </div>
              <div className="w-1/12">
              Size
              </div>
              <div className="w-1/12">
              Quantity
              </div>
              <div className="w-1/12 ml-9">
              Price
              </div>
              <div className="w-1/12">
              Total
              </div>
              <div className="w-1/12 mr-8">
              Promotion
              </div>
              <div className="w-1/12">
              Discount?
              </div>
              </div>

                {data && data.order.products.map((product, index) => (
                  <>
                    <div className="flex pl-20 pr-20 m-10 p-5 border-b shadow">
                      <div className="w-3/12">
                        {product.title}
                      </div >
                      <div className="w-1/12 pl-1">
                        {product.color}
                      </div>
                      <div className="w-1/12 pl-1">
                        {product.size}
                      </div>
                      <div className="w-1/12 pl-5">
                        {product.quantity}
                      </div>


                      {product.type === 'PromotionProduct' ?
                        <>
                        <div className="w-1/12 pl-8">
                         { data.order.totalPrice/ product.quantity }

                          </div>
                          <div className="w-1/12 pl-8">
                           {data.order.totalPrice}
                          </div>
                          <div className="w-1/12 pl-12">
                            -{product.percent}%
                          </div>
                          <div className="w-1/12 pl-20">
                            {product.priceAfterDiscount}
                          </div>

                        </>
                        :
                        <>
                          <div className="w-1/12">
                          {data.order.totalPrice/ product.quantity}
                          </div>
                          <div className="w-1/12">
                            {product.price}
                            </div>
                        </>
                      }

                    </div>

                  </>
                ))}

                <div className="flex flex-row-reverse border-t ml-10 mr-10 mb-10">
                  <div className="mt-10">
                      <h1 className="text-4xl text-green-700">Complete</h1>
                      <h1>UserId : {data && data.order.userId}</h1>
                      <h1>Total Price : {data && data.order.totalPrice}</h1>
                      <h1>Address : {data && data.order.deliveryAddress}</h1>
                      {data && data.order.updatedAt ? <h1>Update Status At : {data.order.updatedAt}</h1>:<></>}

                    </div>

                  </div>

          </div>
        </div>
      </div>
    </div>
  )
};

export default CustomerOrderDetail;
