import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { PRODUCT_BY_TITLE_QUERY } from "../graphql/queries/productByTitle";

const ProductDetail = () => {
  const { productSlug } = useParams();

  const { data: product, loading, error } = useQuery(PRODUCT_BY_TITLE_QUERY, {
    variables: {
      title: productSlug,
    },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {product.productByTitle._id} - {product.productByTitle.title} -{" "}
      {product.productByTitle.description}
    </div>
  );
};

export default ProductDetail;
