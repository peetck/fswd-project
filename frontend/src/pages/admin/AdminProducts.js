import React from "react";
import { useQuery, gql } from "@apollo/client";

import ProductTable from "../../components/Tables/ProductTable";

const NORMAL_PRODUCTS_QUERY = gql`
  query {
    normalProducts {
      _id
      title
      description
      price
      images
      totalStock
      stock {
        quantity
        color
        size
      }
      type
      createdAt
      updatedAt
    }
  }
`;

const AdminProducts = () => {
  const { data: products, loading, error } = useQuery(NORMAL_PRODUCTS_QUERY);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return <ProductTable products={products.normalProducts} />;
};

export default AdminProducts;
