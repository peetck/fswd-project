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
      <div className="bg-white shadow rounded-lg p-6 m-5 mt-7">

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label for="name" className="bg-white text-gray-600 px-1">Title *</label>
              </p>
            </div>
            <p>
              <select
                className="border-outline p-2 rounded w-full"
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
            </p>
          </div>
          <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label for="username" className="bg-white text-gray-600 px-1">Percent *</label>
              </p>
            </div>
            <p>
              <div class="flex flex-row mt-1">
                <span class="flex items-center bg-grey-lighter rounded rounded-r-none px-3 font-bold text-grey-darker">%</span>
                <input
                  type="text"
                  value={percent}
                  onChange={(e) => setPercent(e.target.value)}
                  className="py-1 px-1 outline-none block h-full w-full"
                />
              </div>
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <input type="submit" value="Create Promotion" className="bg-gray-700 p-3 text-white w-3/4" />
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
