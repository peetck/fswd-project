import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

const PRODUCT_BY_ID_QUERY = gql`
  query($_id: MongoID!) {
    productById(_id: $_id) {
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
  const { promotionId } = useParams();

  const [percent, setPercent] = useState("");

  const [updatePromotionProduct] = useMutation(
    UPDATE_PROMOTION_PRODUCT_MUTATION
  );

  const { data, loading, error } = useQuery(PRODUCT_BY_ID_QUERY, {
    variables: {
      _id: promotionId,
    },
  });

  useEffect(() => {
    if (data) {
      setPercent(data.productById.percent);
    }
  }, [data]);

  const handleSubmit = async () => {
    await updatePromotionProduct({
      variables: {
        percent: +percent,
        _id: promotionId,
      },
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Input label="title" value={data?.productById.title} disabled />

      <Input value={percent} onChange={(e) => setPercent(e.target.value)} />

      <Button onClick={handleSubmit}>UPDATE discount price</Button>
    </div>
  );
};

export default AdminUpdatePromotion;
