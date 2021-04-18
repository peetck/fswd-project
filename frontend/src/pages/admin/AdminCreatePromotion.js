import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { NORMAL_PRODUCTS_QUERY } from "../../graphql/queries/normalProducts";
import { CREATE_PROMOTION_PRODUCT_MUTATION } from "../../graphql/mutations/createPromotionProduct";

const AdminCreatePromotion = () => {
  const [product, setProduct] = useState();
  const [percent, setPercent] = useState();

  const { data: products, loading, error } = useQuery(NORMAL_PRODUCTS_QUERY);
  const [createPromotionProduct] = useMutation(
    CREATE_PROMOTION_PRODUCT_MUTATION
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPromotionProduct({
        variables: {
          _id: product,
          percent: +percent,
        },
      });
      console.log(product, percent);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={product}
        defaultValue="default"
        onChange={(e) => {
          setProduct(e.target.value);
        }}
      >
        <option value="default">--select--</option>
        {products?.normalProducts.map((product) => (
          <option value={product._id} key={product._id}>
            {product.title}
          </option>
        ))}
      </select>

      <p>
        Percent:{" "}
        <input
          type="text"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
        />
      </p>

      <input type="submit" value="Create Promotion" />
    </form>
  );
};

export default AdminCreatePromotion;
