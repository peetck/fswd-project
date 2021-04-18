import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { NORMAL_PRODUCTS_PAGINATION_QUERY } from "../graphql/queries/normalProductsPagination";

const Products = () => {
  const { data: products, loading, error } = useQuery(
    NORMAL_PRODUCTS_PAGINATION_QUERY,
    {
      variables: {
        page: 1,
        perPage: 3,
      },
    }
  );

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  console.log(products);

  return (
    <div>
      {products.normalProductsPagination.items.map((product) => (
        <p key={product._id}>
          _id: {product._id} - title: {product.title} -{" "}
          <Link to={`/product/${product.title}`}>detail</Link>
        </p>
      ))}
    </div>
  );
};

export default Products;
