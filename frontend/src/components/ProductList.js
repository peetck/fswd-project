import React from "react";

import Card from "./Cards/Card";

const ProductList = ({ products }) => {
  return products
    ? products.map((product) => (
        <Card
          key={product._id}
          title={product.title}
          imageUrl={product.images[0]}
          price={product.price}
          productType={product.type}
          percent={product.percent}
          priceAfterDiscount={product.priceAfterDiscount}
        />
      ))
    : "No no no";
};

export default ProductList;
