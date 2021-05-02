import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import OrderTable from "../../components/Tables/OrderTable";

const UPDATE_ORDER_MUTATION = gql`
  mutation($_id: MongoID!, $deliveryStatus: EnumOrderDeliveryStatus!) {
    updateOrder(_id: $_id, record: { deliveryStatus: $deliveryStatus }) {
      recordId
    }
  }
`;

const REMOVE_ORDER_MUTATION = gql`
  mutation($_id: MongoID!) {
    removeOrder(_id: $_id) {
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
      user {
        username
        email
      }
    }
  }
`;
const AdminOrders = () => {
  const [removeOrder] = useMutation(REMOVE_ORDER_MUTATION);
  const [updateOrder] = useMutation(UPDATE_ORDER_MUTATION);

  const { data, loading, error, refetch } = useQuery(ORDERS_QUERY);

  const handleUpdateOrder = async (orderId) => {
    await updateOrder({
      variables: {
        _id: orderId,
        deliveryStatus: "Delivered",
      },
    });

    toast.success("Update order delivery status successfully");

    await refetch();
  };

  const handleRemoveOrder = async (orderId) => {
    await removeOrder({
      variables: {
        _id: orderId,
      },
    });

    toast.success("Cancel order successfully");

    await refetch();
  };

  if (error) {
    toast.error(error.message);
  }

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <OrderTable
      orders={data.orders}
      onUpdate={handleUpdateOrder}
      onRemove={handleRemoveOrder}
    />
  );
};

export default AdminOrders;
