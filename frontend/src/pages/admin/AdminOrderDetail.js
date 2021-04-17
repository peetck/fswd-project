import React from "react";
import { useParams } from "react-router";

const AdminOrderDetail = () => {
  const { orderId } = useParams();
  return <div>AdminOrderDetail {orderId}</div>;
};

export default AdminOrderDetail;
