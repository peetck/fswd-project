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
            product {
              title
              type
              price
            }
            quantity
          }
          totalPrice
          deliveryAddress
          status
          createdAt
        }
      }
    `,
    {
      variables: {
        userId: user._id,
      },
      fetchPolicy: "network-only",
    }
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  console.log(data.orders);

  return (
    <div>
      {data.orders.map((order) => (
        <h1 key={order._id}>
          {order._id} - {order.totalPrice} -{" "}
          <Link to={`/customer/order/${order._id}`}>detail</Link>
        </h1>
      ))}
    </div>
  );
};

export default CustomerOrders;
