import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

const AdminUpdateProduct = () => {
  const { productId } = useParams();

  return <h1>Admin update product</h1>;
};

export default AdminUpdateProduct;
