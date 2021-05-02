import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { toast } from "react-toastify";

import ProductTable from "../../components/Tables/ProductTable";
import Loader from "../../components/Loader";

const PROMOTION_PRODUCTS_QUERY = gql`
  query {
    promotionProducts {
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
      priceAfterDiscount
      percent
    }
  }
`;

const REMOVE_PROMOTION_PRODUCT_MUTATION = gql`
  mutation($_id: MongoID!) {
    removePromotionProduct(record: { _id: $_id }) {
      status
    }
  }
`;

const AdminPromotions = () => {
  const [removePromotionProduct] = useMutation(
    REMOVE_PROMOTION_PRODUCT_MUTATION
  );

  const { data: promotions, loading, error, refetch } = useQuery(
    PROMOTION_PRODUCTS_QUERY
  );

  const handleRemoveProduct = async (_id) => {
    await removePromotionProduct({
      variables: {
        _id: _id,
      },
    });
    toast.success("Remove promotion successfully");
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
      products={promotions.promotionProducts}
      onRemove={handleRemoveProduct}
    />
  );
};

export default AdminPromotions;
