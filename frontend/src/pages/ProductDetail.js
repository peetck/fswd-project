import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productSlug } = useParams();

  return <div>ProductDetail {productSlug}</div>;
};

export default ProductDetail;
