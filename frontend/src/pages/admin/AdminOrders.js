import React from "react";
import { useQuery, gql } from "@apollo/client";

const AdminOrders = () => {
  const { data, loading } = useQuery(
    gql`
      query {
        orders {
          products {
            product
            quantity
          }
          deliveryAddress
          status
          userId
          _id
        }
      }
    `,
    {
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
        <h1 key={order._id}>{order._id}</h1>
      ))}
    </div>
  );
};

export default AdminOrders;
