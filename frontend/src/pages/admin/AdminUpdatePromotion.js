import React from "react";
import { useParams } from "react-router-dom";

const AdminUpdatePromotion = () => {
  const { promotionId } = useParams();
  return <div>AdminUpdatePromotion {promotionId}</div>;
};

export default AdminUpdatePromotion;
