import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { PROMOTION_PRODUCTS_QUERY } from "../graphql/queries/promotionProducts";

const Promotions = () => {
  const { data: promotions, loading, error } = useQuery(
    PROMOTION_PRODUCTS_QUERY
  );

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      {promotions.promotionProducts.map((product) => (
        <p key={product._id}>
          _id: {product._id} - title: {product.title} -{" "}
          <Link to={`/product/${product.title}`}>detail</Link>
        </p>
      ))}
    </div>
  );
};

export default Promotions;
