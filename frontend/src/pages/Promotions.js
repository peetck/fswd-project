import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { PROMOTION_PRODUCTS_QUERY } from "../graphql/queries/promotionProducts";
import ProductList from "../components/ProductList";

const Promotions = () => {
  const { data: promotions, loading, error } = useQuery(
    PROMOTION_PRODUCTS_QUERY
  );

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      <ProductList products={promotions.promotionProducts} />
    </div>
  );
};

export default Promotions;
