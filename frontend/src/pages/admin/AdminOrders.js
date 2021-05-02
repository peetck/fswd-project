import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";
import Truncate from "react-truncate";

const UPDATE_ORDER_MUTATION = gql`
  mutation($_id: MongoID!, $deliveryStatus: EnumOrderDeliveryStatus!) {
    updateOrder(_id: $_id, record: { deliveryStatus: $deliveryStatus }) {
      recordId
    }
  }
`;

const ORDERS_QUERY = gql`
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
`;
const AdminOrders = () => {
  const { data, loading, refetch } = useQuery(ORDERS_QUERY);

  const [removeOrder] = useMutation(gql`
    mutation($_id: MongoID!) {
      removeOrder(_id: $_id) {
        recordId
      }
    }
  `);

  const [updateOrder] = useMutation(UPDATE_ORDER_MUTATION);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div>
        <div className="overflow-x-auto">
          <div className="min-w-screen flex items-center justify-center overflow-hidden">
            <div className="w-full lg:w-5/6">
              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">OrderId</th>
                      <th className="py-3 px-6 text-left">UserId</th>
                      <th className="py-3 px-6 text-center">Total price</th>
                      <th className="py-3 px-6 text-center">Delivery Status</th>
                      <th className="py-3 px-6 text-center">Detail</th>
                    </tr>
                  </thead>
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
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <Truncate width={200}>
                              <span>{String(order.userId)}</span>
                            </Truncate>
                          </div>
                        </td>

                        <td className="py-3 px-6 text-center">
                          <Truncate width={160}>
                            <span>{order.totalPrice}</span>
                          </Truncate>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            {order.deliveryStatus === "Waiting" ? (
                              <span className="bg-red-200 text-yellow-500 py-1 px-3 rounded-full text-xs">
                                {order.deliveryStatus}
                              </span>
                            ) : (
                              <span className="bg-green-200 text-green-600 py-1 px-4 rounded-full text-xs">
                                {order.deliveryStatus}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <Link to={`/admin/order/${order._id}`}>
                                {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </Link>
                            </div>
                            <div
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                              onClick={async () => {
                                await updateOrder({
                                  variables: {
                                    _id: order._id,
                                    deliveryStatus: "Delivered",
                                  },
                                });
                                await refetch();
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </div>
                            <div
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                              onClick={async () => {
                                await removeOrder({
                                  variables: { _id: order._id },
                                });
                                await refetch();
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {data.orders.map((order) => (
        <h1 key={order._id}>
          {order._id} - <Link to={`/admin/order/${order._id}`}>detail</Link>
        </h1>
      ))} */}
    </div>
  );
};

export default AdminOrders;
