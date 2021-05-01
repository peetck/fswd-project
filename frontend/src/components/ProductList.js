import React from "react";

import Card from "./Cards/Card";
import Loader from "./Loader";

const ProductList = ({ products, loading }) => {
  if (loading || !products) {
    return (
      <div className="my-8">
        <Loader />
      </div>
    );
  }

  return products.map((product) => (
    <Card
      key={product._id}
      title={product.title}
      imageUrl={product.images[0]}
      price={product.price}
      productType={product.type}
      percent={product.percent}
      priceAfterDiscount={product.priceAfterDiscount}
      sold={product.sold}
    />
  ));
};

export default ProductList;
