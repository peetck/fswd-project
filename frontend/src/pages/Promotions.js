import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { PROMOTION_PRODUCTS_QUERY } from "../graphql/queries/promotionProducts";
import Truncate from "react-truncate";
import ProductList from "../components/ProductList";

const Promotions = () => {
  const { data: promotions, loading, error } = useQuery(
    PROMOTION_PRODUCTS_QUERY
  );

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      <div className="flex w-8/12 justify-center items-center flex-wrap mx-auto">
        {promotions.promotionProducts.map((product) => (
          <Link to={`/product/${product.title}`}>
            <div className="bg-white shadow-md transform transition ease-in hover:-translate-y-2 duration-75 m-2 h-64 flex flex-col justify-between">
              <div className=" text-grey-darker text-justify flex flex-col">
                <img
                  src={product.images[0]}
                  alt="can't load img"
                  className="w-44 h-44 flex self-center shadow-lg object-cover"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs uppercase mx-2 text-blue-darker">
                    <Truncate lines={2} width={120} trimWhitespace>
                      {product.title}
                    </Truncate>
                  </p>
                  <div>
                    <span className="uppercase bg-yellow-400 text-gray-800  p-1.5 text-xs shadow rounded mr-3">
                      {product.percent}% off
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-1 text-gray-900 text-justify flex flex-row justify-start border-t text-sm">
                ฿ {product.price}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    //   <div>
    //     <ProductList products={promotions.promotionProducts} />
    //   </div>
    // );
  );
};

export default Promotions;
