import React from "react";
import { useQuery, gql } from "@apollo/client";

import ProductTable from "../../components/Tables/ProductTable";

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

const AdminPromotions = () => {
  const { data: promotions, loading, error } = useQuery(
    PROMOTION_PRODUCTS_QUERY
  );

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return <ProductTable products={promotions.promotionProducts} />;
};

export default AdminPromotions;
