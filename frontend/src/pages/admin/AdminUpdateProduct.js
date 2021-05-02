import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ProductForm from "../../components/Forms/ProductForm";
import Loader from "../../components/Loader";

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

  if (error) {
    toast.error(error.message);
  }

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader />
      </div>
    );
  }

  return <ProductForm product={data?.productById} />;
};

export default AdminUpdateProduct;
