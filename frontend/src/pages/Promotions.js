import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

import Truncate from "react-truncate";
import ProductList from "../components/ProductList";

const PROMOTION_PRODUCTS_QUERY = gql`
  query {
    promotionProducts {
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
      priceAfterDiscount
      percent
    }
  }
`;

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
