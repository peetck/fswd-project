import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Truncate from "react-truncate";

import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data, loading } = useQuery(
    gql`
      query {
        orders {
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
          userId
        }
      }
    `
  );
  const [allOrders, setAllOrders] = useState(0);
  const [soldAll, setSoldAll] = useState(0);
  const [profit, setProfit] = useState(0);
  const capital = 10000;

  useEffect(() => {
    let sumProfit = 0;
    let sumAllProduct = 0;

    for (let counter in data?.orders) {
      sumProfit += Number(data?.orders[counter].totalPrice);
      for (let x in data?.orders[counter].products) {
        sumAllProduct += Number(data?.orders[counter].products[x].quantity);
      }
    }

    setProfit((sumProfit * 0.7) / capital);
    setSoldAll(sumAllProduct);
    setAllOrders(data?.orders.length);
  }, [data]);

  const sumProduct = () => {};

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader />
      </div>
    );
  }

  //console.log(data)

  return (
    <>
      <div className="font-sans bg-grey-lighter flex flex-col min-h-screen w-full">
        <div className="flex-grow container mx-auto sm:px-4 pt-6 pb-8">
          <div className="bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6">
            <div className="flex flex-col items-center px-6 lg:hidden">
              <div className="flex-grow flex-no-shrink py-6">
                <div className="text-grey-darker mb-2">
                  <span className="text-3xl align-top">+</span>
                  <span className="text-5xl">{soldAll}</span>
                  <span className="text-3xl align-top">EA</span>
                </div>
                <div className="text-green-light text-sm">SOLD ALL</div>
              </div>
              <div className="flex-grow flex-no-shrink py-6">
                <div className="text-grey-darker mb-2">
                  <span className="text-3xl align-top">
                    <span className="text-green align-top">+</span>
                  </span>
                  <span className="text-5xl">12,998</span>
                  <span className="text-3xl align-top">EA</span>
                </div>
                <div className="text-green-light text-sm">SOLD ALL DAILY</div>
              </div>
              <div className="flex-grow flex-no-shrink py-6">
                <div className="text-grey-darker mb-2">
                  <span className="text-3xl align-top">
                    <span className="text-green align-top">+</span>
                  </span>
                  <span className="text-5xl">154.47</span>
                  <span className="text-3xl align-top">%</span>
                </div>
                <div className="text-green-light text-sm">PROFIT</div>
              </div>
            </div>
            <div className="hidden lg:flex">
              <div className="w-1/3 text-center py-8">
                <div className="border-r">
                  <div className="text-grey-darker mb-2">
                    <span className="text-3xl align-top">+</span>
                    <span className="text-5xl">{soldAll}</span>
                    <span className="text-3xl align-top">EA</span>
                  </div>
                  <div className="text-sm uppercase text-grey tracking-wide">
                    SOLD ALL
                  </div>
                </div>
              </div>
              <div className="w-1/3 text-center py-8">
                <div className="border-r">
                  <div className="text-grey-darker mb-2">
                    <span className="text-3xl align-top">
                      <span className="text-green align-top">+</span>
                    </span>
                    <span className="text-5xl">12,998</span>
                    <span className="text-3xl align-top">EA</span>
                  </div>
                  <div className="text-sm uppercase text-grey tracking-wide">
                    SOLD ALL DAILY
                  </div>
                </div>
              </div>
              <div className="w-1/3 text-center py-8">
                <div>
                  <div className="text-grey-darker mb-2">
                    <span className="text-3xl align-top">
                      <span className="text-green align-top">+</span>
                    </span>
                    <span className="text-5xl">{profit.toFixed(2)}</span>
                    <span className="text-3xl align-top">%</span>
                  </div>
                  <div className="text-sm uppercase text-grey tracking-wide">
                    PROFIT
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-4">
            <div className="w-full mb-6 lg:mb-0 lg:w-1/2 px-4 flex flex-col">
              <div className="flex-grow flex flex-col bg-white border-t border-b sm:rounded sm:border shadow overflow-hidden">
                <div className="border-b">
                  <div className="flex justify-between px-6 -mb-px">
                    <h3 className="text-blue-dark py-4 font-normal text-lg">
                      ORDER DAILY
                    </h3>
                  </div>
                </div>
                <table>
                  <tbody className="text-gray-600 text-sm font-light">
                    {data.orders.map((order) => (
                      <tr
                        className="border-b border-gray-200 hover:bg-gray-100"
                        key={order._id}
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2">
                              <Truncate width={200}>{order._id}</Truncate>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left w-1/4">
                          <div className="flex items-center justify-center">
                            {String(order.deliveryStatus) === "false" ? (
                              <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                                {String(order.deliveryStatus)}
                              </span>
                            ) : (
                              <span className="bg-green-200 text-green-600 py-1 px-4 rounded-full text-xs">
                                {String(order.deliveryStatus)}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center xl:w-1/3 ">
                          <Truncate width={160}>
                            <span>
                              {order?.products.length <= 1
                                ? order?.products?.map((e) => {
                                    return e.quantity;
                                  })
                                : console.log("1")}{" "}
                              Piece
                            </span>
                          </Truncate>
                        </td>
                        <td className="py-3 px-6 text-center xl:w-full">
                          <Truncate width={160}>
                            <span>{order.totalPrice} Baht</span>
                          </Truncate>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-6 py-4 h-full relative">
                  <div className="absolute text-center text-grey inset-x-0 bottom-0 mb-5">
                    TOTAL ORDER DAILY {allOrders}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 px-4">
              <div className="bg-white border-t border-b sm:rounded sm:border shadow">
                <div className="border-b">
                  <div className="flex justify-between px-6 -mb-px">
                    <h3 className="text-blue-dark py-4 font-normal text-lg">
                      CHART
                    </h3>
                  </div>
                </div>
                <div>
                  <div className="text-center px-6 py-4">
                    <div className="py-8">
                      <div className="mb-4">
                        <svg
                          className="inline-block fill-current text-grey h-16 w-16"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M11.933 13.069s7.059-5.094 6.276-10.924a.465.465 0 0 0-.112-.268.436.436 0 0 0-.263-.115C12.137.961 7.16 8.184 7.16 8.184c-4.318-.517-4.004.344-5.974 5.076-.377.902.234 1.213.904.959l2.148-.811 2.59 2.648-.793 2.199c-.248.686.055 1.311.938.926 4.624-2.016 5.466-1.694 4.96-6.112zm1.009-5.916a1.594 1.594 0 0 1 0-2.217 1.509 1.509 0 0 1 2.166 0 1.594 1.594 0 0 1 0 2.217 1.509 1.509 0 0 1-2.166 0z" />
                        </svg>
                      </div>
                      <p className="text-2xl text-grey-darker font-medium mb-4">
                        NO CHART
                      </p>
                      <p className="text-grey max-w-xs mx-auto mb-6">
                        You've successfully linked transaction
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
