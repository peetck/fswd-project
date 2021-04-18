import React from "react";
import { useQuery } from "@apollo/client";

import { PROMOTION_PRODUCTS_QUERY } from "../../graphql/queries/promotionProducts";

const AdminPromotions = () => {
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
          _id: {product._id} - title: {product.title}
        </p>
      ))}
    </div>
  );
};

export default AdminPromotions;
