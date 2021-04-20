import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const AdminOrders = () => {
  const { data, loading } = useQuery(
    gql`
      query {
        orders {
          _id
          products {
            product {
              title
              type
              price
            }
          }
          totalPrice
          deliveryAddress
          status
          createdAt
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
        <h1 key={order._id}>
          {order._id} - <Link to={`/admin/order/${order._id}`}>detail</Link>
        </h1>
      ))}
    </div>
  );
};

export default AdminOrders;
