import React from "react";
import { useParams } from "react-router-dom";

const AdminUpdateProduct = () => {
  const { productId } = useParams();
  return <div>AdminUpdateProduct {productId}</div>;
};

export default AdminUpdateProduct;
