import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import PromotionForm from "../../components/Forms/PromotionForm";

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
      type
      createdAt
      updatedAt
    }
  }
`;

const CREATE_PROMOTION_PRODUCT_MUTATION = gql`
  mutation($_id: MongoID!, $percent: Float!) {
    createPromotionProduct(record: { _id: $_id, percent: $percent }) {
      _id
      percent
    }
  }
`;

const AdminCreatePromotion = () => {
  const history = useHistory();

  const { data: products, loading, error: errorProducts } = useQuery(
    NORMAL_PRODUCTS_QUERY
  );
  const [createPromotionProduct] = useMutation(
    CREATE_PROMOTION_PRODUCT_MUTATION
  );

  const handleSubmit = async (e, product, percent) => {
    e.preventDefault();
    try {
      if (!product) {
        throw new Error("Please select product first");
      }

      if (isNaN(percent.trim())) {
        throw new Error("Percent must be a number");
      }

      if (+percent.trim() < 1 || +percent.trim() > 100) {
        throw new Error("Percent must be in range 1 to 100");
      }

      await createPromotionProduct({
        variables: {
          _id: product,
          percent: +percent.trim(),
        },
      });

      toast.success("Create promotion product successfully");
      history.push("/admin/promotions");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (errorProducts) {
    toast.error(errorProducts.message);
  }

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <PromotionForm
      products={products?.normalProducts}
      onSubmit={handleSubmit}
    />
  );
};

export default AdminCreatePromotion;
