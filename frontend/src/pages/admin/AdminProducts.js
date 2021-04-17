import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { NORMAL_PRODUCTS_QUERY } from "../../graphql/queries/normalProducts";

const AdminProducts = () => {
  const { loading, error, data } = useQuery(NORMAL_PRODUCTS_QUERY);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {data.normalProducts.items.map((product) => (
        <Link key={product._id} to={`/admin/product/${product._id}`}>
          <p>{product.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default AdminProducts;
