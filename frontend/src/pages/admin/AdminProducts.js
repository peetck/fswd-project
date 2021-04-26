import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Truncate from "react-truncate";

import { NORMAL_PRODUCTS_QUERY } from "../../graphql/queries/normalProducts";
import Button from "../../components/Button";
import ProductTable from "../../components/Tables/ProductTable";

const AdminProducts = () => {
  const { data: products, loading, error } = useQuery(NORMAL_PRODUCTS_QUERY);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return <ProductTable products={products.normalProducts} />;
};

export default AdminProducts;
