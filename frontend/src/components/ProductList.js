import React from "react";

import Card from "./Cards/Card";

const ProductList = ({ products }) => {
  return (
    <div className='flex'>
      {products
        ? products.map((product) => (
            <Card
              key={product._id}
              title={product.title}
              imageUrl={product.images[0]}
              price={product.price}
              productType="normalProduct"
              description={product.description}
            />
          ))
        : "ไม่มีไอควาย"}
    </div>
  );
};

export default ProductList;
