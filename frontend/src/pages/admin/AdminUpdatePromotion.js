import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import PromotionForm from "../../components/Forms/PromotionForm";

const PRODUCT_BY_ID_QUERY = gql`
  query($_id: MongoID!) {
    productById(_id: $_id) {
      _id
      title
      ... on PromotionProduct {
        percent
      }
    }
  }
`;

const UPDATE_PROMOTION_PRODUCT_MUTATION = gql`
  mutation($_id: MongoID!, $percent: Float!) {
    updatePromotionProduct(_id: $_id, record: { percent: $percent }) {
      recordId
    }
  }
`;

const AdminUpdatePromotion = () => {
  const history = useHistory();

  const { promotionId } = useParams();

  const [updatePromotionProduct] = useMutation(
    UPDATE_PROMOTION_PRODUCT_MUTATION
  );

  const { data, loading, error: errorProduct } = useQuery(PRODUCT_BY_ID_QUERY, {
    variables: {
      _id: promotionId,
    },
  });

  const handleSubmit = async (e, product, percent) => {
    e.preventDefault();
    try {
      if (isNaN(percent.trim())) {
        throw new Error("Percent must be a number");
      }

      if (+percent.trim() < 1 || +percent.trim() > 100) {
        throw new Error("Percent must be in range 1 to 100");
      }

      await updatePromotionProduct({
        variables: {
          percent: +percent.trim(),
          _id: product._id,
        },
      });
      toast.success("Update promotion product successfully");
      history.push("/admin/promotions");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (errorProduct) {
    toast.error(errorProduct.message);
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
      onSubmit={handleSubmit}
      isUpdate
      promotionProduct={data.productById}
    />
  );
};

export default AdminUpdatePromotion;
