import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";

import ProductTable from "../../components/Tables/ProductTable";
import { PROMOTION_PRODUCTS_QUERY } from "../../graphql/queries/promotionProducts";

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
