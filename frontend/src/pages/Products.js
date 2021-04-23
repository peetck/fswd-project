import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { NORMAL_PRODUCTS_PAGINATION_QUERY } from "../graphql/queries/normalProductsPagination";
import Card from "../components/Cards/Card";

const Products = () => {
  const [inputMin, setInputmin] = useState("");
  const [inputMax, setInputmax] = useState("");
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
  console.log(inputMin);
  console.log(inputMax);

  return (
    <Fragment>
      <div className="flex px-10 py-6 w-9/12 justify-between mx-auto">
        <div className="flex flex-col py-10">
          <label className="block text-sm font-medium text-gray-700">
            Min Price
          </label>
          <div className="mt-1 relative rounded-md shadow-sm mb-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">$</span>
            </div>
            <input
              type="number"
              name="price"
              id="price"
              className="block w-52 pl-7 pr-12 text-sm border border-black rounded-md"
              placeholder="0.00"
              onChange={(e) => setInputmin(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center text-gray-500 text-sm pr-2">
              THB
            </div>
          </div>
          <label className="block text-sm font-medium text-gray-700">
            Max Price
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">$</span>
            </div>
            <input
              type="number"
              name="price"
              id="price"
              className="block w-52 pl-7 pr-12 text-sm border border-black rounded-md"
              placeholder="0.00"
              onChange={(e) => setInputmax(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center text-gray-500 text-sm pr-2">
              THB
            </div>
          </div>
        </div>
        <div className="flex w-8/12 justify-center items-center flex-wrap mx-auto">
          {products?.normalProductsPagination?.items.map((product) =>
            inputMin == "" && inputMax == "" ? (
              <Card
                key={product._id}
                title={product.title}
                imageUrl={product.images[0]}
                price={product.price}
              />
            ) : product.price >= inputMin && product.price <= inputMax ? (
              <Card
                key={product._id}
                title={product.title}
                imageUrl={product.images[0]}
                price={product.price}
              />
            ) : product.price >= inputMin && inputMax == "" ? (
              <Card
                key={product._id}
                title={product.title}
                imageUrl={product.images[0]}
                price={product.price}
              />
            ) : product.price <= inputMax && inputMin == ""? (
              <Card
                key={product._id}
                title={product.title}
                imageUrl={product.images[0]}
                price={product.price}
              />
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Products;
