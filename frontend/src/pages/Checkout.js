import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

import { useUserContext } from "../contexts/UserContext";

const OmiseCard = window.OmiseCard;

const Checkout = () => {
  const { user, cart, refetchCart, token } = useUserContext();

  useEffect(() => {
    OmiseCard.configure({
      publicKey: process.env.REACT_APP_OMISE_PUBLIC_KEY,
      currency: "thb",
      frameLabel: "PICNIC SHOP",
      submitLabel: "PAY NOW",
      defaultPaymentMethod: "credit_card",
    });
  }, []);

  const [createOrder] = useMutation(
    gql`
      mutation(
        $userId: MongoID!
        $deliveryAddress: String!
        $paymentMethod: EnumOrderPaymentMethod!
      ) {
        createOrder(
          record: {
            userId: $userId
            deliveryAddress: $deliveryAddress
            paymentMethod: $paymentMethod
          }
        ) {
          recordId
        }
      }
    `
  );

  const [makePayment] = useMutation(gql`
    mutation($amount: Float!, $token: String!) {
      makePayment(record: { amount: $amount, token: $token }) {
        status
      }
    }
  `);

  const makeOrder = async (paymentMethod) => {
    console.log(paymentMethod);
    await createOrder({
      variables: {
        userId: user._id,
        deliveryAddress: "DUMMY ADDRESS",
        paymentMethod: paymentMethod,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    await refetchCart();
  };

  const handleCreditCard = async () => {
    OmiseCard.open({
      frameDescription: "Invoice #3847",
      amount: cart?.totalPrice * 100,
      onCreateTokenSuccess: async (token) => {
        const response = await makePayment({
          variables: {
            amount: cart?.totalPrice * 100,
            token: token,
          },
        });

        if (response.data.makePayment.status === "successful") {
          await makeOrder("CreditCard");
        }
      },
      onFormClosed: () => {},
    });
  };

  console.log(cart);

  return (
    <div>
      <button onClick={() => makeOrder("CashOnDelivery")}>
        cash on delivery
      </button>
      <button onClick={handleCreditCard}>credit card</button>
    </div>
  );
};

export default Checkout;
