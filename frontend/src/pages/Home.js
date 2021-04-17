import React from "react";
import { useQuery } from "@apollo/client";

import { NORMAL_PRODUCTS_QUERY } from "../graphql/queries/normalProducts";
import { PROMOTION_PRODUCTS_QUERY } from "../graphql/queries/promotionProducts";

const Home = (props) => {
  const { loading: loadingN, error: errorN, data: dataN } = useQuery(
    NORMAL_PRODUCTS_QUERY
  );
  const { loading: loadingP, error: errorP, data: dataP } = useQuery(
    PROMOTION_PRODUCTS_QUERY
  );

  if (loadingN || loadingP) {
    return <h1>Loading...</h1>;
  }

  if (errorN || errorP) {
    console.log(errorN || errorP);
  }

  return (
    <h1>
      Products
      {dataN.normalProducts.items.map((product) => (
        <p key={product._id}>
          {product._id} - {product.title}
          <img src={product.images[1]} alt="" />
        </p>
      ))}
      <hr />
      Promotions
      {dataP.promotionProducts.map((product) => (
        <p key={product._id}>
          {product._id} - {product.title}
          <img src={product.images[1]} alt="" />
        </p>
      ))}
    </h1>
  );
};

export default Home;
