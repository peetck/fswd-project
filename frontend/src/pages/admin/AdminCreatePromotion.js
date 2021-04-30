import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { NORMAL_PRODUCTS_QUERY } from "../../graphql/queries/normalProducts";
import { CREATE_PROMOTION_PRODUCT_MUTATION } from "../../graphql/mutations/createPromotionProduct";
import Truncate from "react-truncate";

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
      <div className="bg-white rounded-lg p-6 m-5 mt-7">
        <div className="flex flex-col">
          <div className="my-2">
            <Input
              name="product"
              label="Product"
              type="select"
              value={product}
              defaultValue="default"
              onChange={(e) => {
                setProduct(e.target.value);
              }}
            >
              {products?.normalProducts.map((product) => (
                <option value={product._id} key={product._id}>
                  {product.title}
                </option>
              ))}
            </Input>
          </div>

          <div className="my-2">
            <Input
              name="percentageDiscount"
              placeholder="Percentage discount"
              label="Percentage discount"
              type="text"
              value={percent}
              onChange={(e) => {
                if (
                  !e.target.value ||
                  e.target.value.match(/^\d{1,}(\.\d{0,2})?$/)
                ) {
                  setPercent(e.target.value.replace(/^0+/, ""));
                }
              }}
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button onClick={handleSubmit}>Create Promotion</Button>
        </div>
      </div>
    </form>
    // <form onSubmit={handleSubmit}>
    //   <select
    //   className="border p-2 rounded"
    //     value={product}
    //     defaultValue="default"
    //     onChange={(e) => {
    //       setProduct(e.target.value);
    //     }}
    //   >
    //     <option value="default">--select--</option>
    //     {products?.normalProducts.map((product) => (
    //       <option value={product._id} key={product._id}>
    //         {product.title}
    //       </option>
    //     ))}
    //   </select>

    //   <p>
    //     Percent:{" "}
    //     <input
    //       type="text"
    //       value={percent}
    //       onChange={(e) => setPercent(e.target.value)}
    //     />
    //   </p>

    //   <input type="submit" value="Create Promotion" />
    // </form>
  );
};

export default AdminCreatePromotion;
