import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { NORMAL_PRODUCTS_PAGINATION_QUERY } from "../graphql/queries/normalProductsPagination";
import Card from "../components/Cards/Card"

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
          <Card
          key={product._id}
          title={product.title}
          imageUrl={product.images[0]}
          price={product.price}
        />
        ))}
      </div>
    </Fragment>
  );
};

export default Products;
