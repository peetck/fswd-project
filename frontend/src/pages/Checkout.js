import React from "react";
import { useMutation, gql } from "@apollo/client";

import { useUserContext } from "../contexts/UserContext";

const Checkout = () => {
  const { user, cart, refetchCart, token } = useUserContext();

  const [createOrder] = useMutation(
    gql`
      mutation($userId: MongoID!, $deliveryAddress: String!) {
        createOrder(
          record: { userId: $userId, deliveryAddress: $deliveryAddress }
        ) {
          recordId
        }
      }
    `
  );

  const handleConfirm = async () => {
    await createOrder({
      variables: {
        userId: user._id,
        deliveryAddress: "DUMMY ADDRESS",
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    await refetchCart();
  };

  console.log(cart);

  return (
    <div>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default Checkout;
