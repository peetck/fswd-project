import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { toast } from "react-toastify";

import ProductTable from "../../components/Tables/ProductTable";
import Loader from "../../components/Loader";

const NORMAL_PRODUCTS_QUERY = gql`
  query {
    normalProducts {
      _id
      title
      description
      price
      images
      totalStock
      stock {
        quantity
        color
        size
      }
      sold
      type
      createdAt
    }
  }
`;

const REMOVE_NORMAL_PRODUCT_MUTATION = gql`
  mutation($_id: MongoID!) {
    removeNormalProduct(_id: $_id) {
      recordId
    }
  }
`;

const AdminProducts = () => {
  const [removeNormalProduct] = useMutation(REMOVE_NORMAL_PRODUCT_MUTATION);

  const { data: products, loading, error, refetch } = useQuery(
    NORMAL_PRODUCTS_QUERY
  );

  const handleRemoveProduct = async (_id) => {
    await removeNormalProduct({
      variables: {
        _id: _id,
      },
    });
    toast.success("Remove product successfully");
    await refetch();
  };

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

  return (
    <ProductTable
      products={products.normalProducts}
      onRemove={handleRemoveProduct}
    />
  );
};

export default AdminProducts;
