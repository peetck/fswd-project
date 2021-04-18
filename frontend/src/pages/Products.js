import React from "react";
import { useQuery } from "@apollo/client";

import { NORMAL_PRODUCTS_QUERY } from "../graphql/queries/normalProducts";

const Products = () => {
  const { data: products, loading, error } = useQuery(NORMAL_PRODUCTS_QUERY);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      {products.normalProducts.map((product) => (
        <p key={product._id}>
          _id: {product._id} - title: {product.title}
        </p>
      ))}
    </div>
  );
};

export default Products;
