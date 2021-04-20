import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { NORMAL_PRODUCTS_PAGINATION_QUERY } from "../graphql/queries/normalProductsPagination";
import Truncate from "react-truncate";

const Products = () => {
  const { data: products, loading, error } = useQuery(
    NORMAL_PRODUCTS_PAGINATION_QUERY,
    {
      variables: {
        page: 1,
        perPage: 6,
      },
    }
  );

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  console.log(products);

  return (
    <Fragment>
      <div className="flex px-12 py-6 w-10/12 justify-center items-center flex-wrap mx-auto">
        {products.normalProductsPagination.items.map((product) => (
          <Link to={`/product/${product.title}`}>
            <div className="bg-white shadow-md transform transition ease-in hover:-translate-y-2 duration-75 m-2 h-64 flex flex-col justify-between">
              <div className=" text-grey-darker text-justify flex flex-col">
                <img
                  src={product.images[0]}
                  alt="Some image"
                  className="w-44 h-44 flex self-center shadow-lg object-cover"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs uppercase mx-2 text-blue-darker">
                    <Truncate lines={2} width={120} trimWhitespace>
                      {product.title}
                    </Truncate>
                  </p>
                </div>
                {/* <div>
              <span className="uppercase bg-yellow-400 text-gray-800  p-1.5 text-xs shadow rounded ml-2">
                25% off
              </span>
            </div> */}
              </div>
              <div className="p-1 text-gray-900 text-justify flex flex-row justify-start border-t text-sm">
                ฿ {product.price}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Fragment>
  );
};

export default Products;
