import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

import ProductForm from "../../components/Forms/ProductForm";

const PRODUCT_BY_ID_QUERY = gql`
  query($_id: MongoID!) {
    productById(_id: $_id) {
      _id
      title
      description
      price
      images
      stock {
        color
        size
        quantity
      }
    }
  }
`;

const AdminUpdateProduct = () => {
  const { productId } = useParams();

  const { data, loading, error } = useQuery(PRODUCT_BY_ID_QUERY, {
    variables: {
      _id: productId,
    },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <ProductForm product={data?.productById._id} />;
};

export default AdminUpdateProduct;
