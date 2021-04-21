import React from "react";
import { useMutation } from "@apollo/client";

import { CREATE_ORDER_MUTATION } from "../graphql/mutations/createOrder";
import { useUserContext } from "../contexts/UserContext";

const Checkout = () => {
  const { user, cart, refetchCart } = useUserContext();

  const [createOrder] = useMutation(CREATE_ORDER_MUTATION);

  const handleConfirm = async () => {
    await createOrder({
      variables: {
        deliveryAddress: "DUMMY ADDRESS",
        userId: user._id,
      },
    });
    await refetchCart();
  };

  return (
    <div>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default Checkout;
