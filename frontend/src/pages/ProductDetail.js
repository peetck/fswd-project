import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { PRODUCT_BY_TITLE_QUERY } from "../graphql/queries/productByTitle";
import { useUserContext } from "../contexts/UserContext";

const ProductDetail = () => {
  const { productSlug } = useParams();
  const { updateCart } = useUserContext();

  const { data: product, loading, error } = useQuery(PRODUCT_BY_TITLE_QUERY, {
    variables: {
      title: productSlug,
    },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  console.log(product);

  return (
    <div>
      {product.productByTitle._id} - {product.productByTitle.title} -{" "}
      {product.productByTitle.description}
      <button onClick={() => updateCart(product.productByTitle._id, 1, false)}>
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductDetail;
