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
        perPage: 100,
      },
    }
  );

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  console.log(products);

  return (
    <Fragment>
      <div className="flex  py-8 w-full justify-center items-center">
        {products.normalProductsPagination.items.map((product) => (
          <div className="bg-white shadow-md hover:border-coolGray-400 border duration-200 m-2">
            <div className=" text-grey-darker text-justify flex flex-col">
              <img
                src={product.images[0]}
                alt="Some image"
                className="w-44 h-36 flex self-center shadow-lg mb-4 object-cover"
              />
              <div className="flex items-center justify-between mb-5">
                <p className=" text-sm uppercase mx-2 text-blue-darker">
                  <Truncate lines={2} width={160}>
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
            <div className="p-1 mt-1 text-gray-900 text-justify flex flex-row justify-start border-t ">
              <span class="material-icons">attach_money</span>
              {product.price}
            </div>
          </div>
        ))}
      </div>
    </Fragment>

    // <div>
    //    {products.normalProductsPagination.items.map((product) => (
    //      <p key={product._id}>
    //       _id: {product._id} - title: {product.title} -{" "}
    //        <Link to={`/product/${product.title}`}>detail</Link>
    //      </p>
    //    ))}
    //  </div>
  );
};

export default Products;
