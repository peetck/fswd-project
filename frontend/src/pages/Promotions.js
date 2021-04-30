import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { PROMOTION_PRODUCTS_QUERY } from "../graphql/queries/promotionProducts";
import Truncate from "react-truncate";
import ProductList from "../components/ProductList";

const Promotions = () => {
  const { data: promotions, loading, error } = useQuery(
    PROMOTION_PRODUCTS_QUERY
  );

  if (loading) {
    return <h1>Loading ...</h1>;
  }
  console.log(promotions);
  return (
    <div className="flex flex-col">
      <div className="container flex flex-col mx-auto mt-14">
        <div className="flex uppercase text-2xl font-bold justify-center">
          all available promotions
        </div>

        <div className="flex flex-wrap justify-center mt-14">
          <ProductList products={promotions.promotionProducts} />
        </div>
      </div>
    </div>
  );
};

export default Promotions;
