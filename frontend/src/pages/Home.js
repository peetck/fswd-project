import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { NORMAL_PRODUCTS_QUERY } from "../graphql/queries/normalProducts";
import { PROMOTION_PRODUCTS_QUERY } from "../graphql/queries/promotionProducts";

const Home = (props) => {
  const {
    data: products,
    loading: loadingProducts,
    error: errorProducts,
  } = useQuery(NORMAL_PRODUCTS_QUERY);
  const {
    data: promotions,
    loading: loadingPromotions,
    error: errorPromotions,
  } = useQuery(PROMOTION_PRODUCTS_QUERY);

  return (
    <div>
      <h1>Products List</h1>
      {products?.normalProducts.map((product) => (
        <p key={product._id}>
          _id: {product._id} - title: {product.title} -{" "}
          <Link to={`/product/${product.title}`}>detail</Link>
        </p>
      ))}

      <h1>Promotions List</h1>
      {promotions?.promotionProducts.map((product) => (
        <p key={product._id}>
          _id: {product._id} - title: {product.title} -{" "}
          <Link to={`/product/${product.title}`}>detail</Link>
        </p>
      ))}
    </div>
  );
};

export default Home;
