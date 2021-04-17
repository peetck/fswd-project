import React from "react";
import { useParams } from "react-router-dom";

const CustomerOrderDetail = () => {
  const { orderId } = useParams();

  return <div>CustomerOrderDetail {orderId}</div>;
};

export default CustomerOrderDetail;
