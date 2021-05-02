import React, { useEffect, useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";
import moment from "moment";

import Input from "../components/Input";
import Button from "../components/Button";
import CartItemList from "../components/CartItemList";
import Loader from "../components/Loader";

const OmiseCard = window.OmiseCard;

OmiseCard.configure({
  publicKey: process.env.REACT_APP_OMISE_PUBLIC_KEY,
  currency: "thb",
  frameLabel: "PICNIC SHOP",
  submitLabel: "PAY NOW",
  defaultPaymentMethod: "credit_card",
});

const CUSTOMER_USER_QUERY = gql`
  query($_id: MongoID!) {
    customerUser(_id: $_id) {
      address
      email
    }
  }
`;

const CREATE_ORDER_MUTATION = gql`
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
`;

const MAKE_PAYMENT_MUTATION = gql`
  mutation(
    $amount: Float!
    $token: String!
    $email: String!
    $userId: MongoID!
    $deliveryAddress: String!
  ) {
    makePayment(
      record: {
        amount: $amount
        token: $token
        email: $email
        userId: $userId
        deliveryAddress: $deliveryAddress
      }
    ) {
      status
    }
  }
`;

const Checkout = () => {
  const history = useHistory();

  const { user, cart, refetchCart, token } = useUserContext();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");

  const [createOrder] = useMutation(CREATE_ORDER_MUTATION);
  const [makePayment] = useMutation(MAKE_PAYMENT_MUTATION);

  const { data, loading, error } = useQuery(CUSTOMER_USER_QUERY, {
    variables: {
      _id: user._id,
    },
  });

  useEffect(() => {
    if (data?.customerUser?.address) {
      setAddress(data.customerUser.address);
    }
  }, [data]);

  const makeOrder = async () => {
    try {
      if (paymentMethod === "CreditCard") {
        if (cart.products.length === 0) {
          throw new Error("Cart is empty");
        }
        await chargeCreditCard();
      } else if (paymentMethod === "CashOnDelivery") {
        await createOrder({
          variables: {
            userId: user._id,
            deliveryAddress: address,
            paymentMethod: paymentMethod,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });
        await refetchCart();
        history.push("/customer/orders");
      } else {
        throw new Error("Please select payment method first");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const chargeCreditCard = async () => {
    OmiseCard.open({
      frameDescription: `Invoice Date: ${moment(new Date()).format("L")}`,
      amount: cart?.totalPrice * 100,
      onCreateTokenSuccess: async (omiseToken) => {
        const response = await makePayment({
          variables: {
            amount: cart?.totalPrice * 100,
            token: omiseToken,
            email: data?.customerUser?.email,
            userId: user._id,
            deliveryAddress: address,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        if (response.data.makePayment.status === "successful") {
          await refetchCart();
          history.push("/customer/orders");
        }
      },
      onFormClosed: () => {},
    });
  };

  if (error) {
    toast.error(error.message);
  }

  if (loading) {
    return (
      <div className="flex justify-center mt-32">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="container mx-auto my-7 min-w-min">
        <div className="flex flex-col lg:flex-row ">
          <div className="w-full lg:w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-bold text-2xl uppercase">Checkout</h1>
              <h2 className="font-bold text-2xl uppercase hidden sm:inline-block">
                {cart?.products?.length} Items
              </h2>
            </div>
            <div className="flex justify-center mt-10 mb-5 -mx-8 px-6">
              <h3 className="font-bold text-gray-600 text-xs uppercase w-2/5">
                Product
              </h3>
              <h3 className="font-bold text-gray-600 text-xs uppercase w-1/5 text-center hidden lg:block">
                Unit Price
              </h3>
              <h3 className="font-bold text-gray-600 text-xs uppercase w-2/5 text-center lg:w-1/5">
                Amount
              </h3>
              <h3 className="font-bold text-gray-600 text-xs uppercase w-1/5 text-center ">
                Item Subtotal
              </h3>
            </div>

            <CartItemList />

            <div className="flex mt-10">
              <Link
                className="flex items-center font-bold text-royal-blue text-sm uppercase"
                to="/cart"
              >
                <span className="material-icons">keyboard_backspace</span> back
                to cart
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/4 px-8 py-10">
            <h1 className="font-bold text-2xl border-b pb-8 uppercase">
              Information
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-bold text-sm uppercase">
                {cart?.products?.length} Items
              </span>
              <span className="text-sm">฿{cart?.totalPrice}</span>
            </div>

            <div className="flex justify-between mb-5">
              <span className="font-bold text-sm uppercase">Shipping</span>
              <span className="text-sm uppercase">Free</span>
            </div>

            <div className="flex flex-col justify-between mb-5 border-t mt-8">
              <span className="font-bold text-sm uppercase mt-8">
                Payment Method
              </span>
              <div className="mt-6">
                <div
                  className="flex items-center justify-between w-full bg-white rounded-md border p-4 focus:outline-none cursor-pointer"
                  onClick={() => setPaymentMethod("CreditCard")}
                >
                  <label className="flex items-center">
                    <Input
                      type="radio"
                      name="paymentMethod"
                      value="CreditCard"
                      checked={paymentMethod === "CreditCard"}
                      readOnly
                    />

                    <span className="ml-2 text-sm text-gray-700">
                      Credit Card
                    </span>
                  </label>

                  <span className="material-icons">credit_card</span>
                </div>
                <div
                  className="mt-6 flex items-center justify-between w-full bg-white rounded-md border p-4 focus:outline-none cursor-pointer"
                  onClick={() => setPaymentMethod("CashOnDelivery")}
                >
                  <label className="flex items-center">
                    <Input
                      type="radio"
                      name="paymentMethod"
                      value="CashOnDelivery"
                      checked={paymentMethod === "CashOnDelivery"}
                      readOnly
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Cash on Delivery
                    </span>
                  </label>
                  <span className="material-icons">paid</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between mb-5 border-t mt-8">
              <span className="font-bold text-sm uppercase mt-8">
                Delivery Address
              </span>

              <div className="mt-6">
                <Input
                  name="address"
                  value={address}
                  rows={3}
                  type="textarea"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="border-t mt-8">
              <div className="flex font-bold justify-between pb-6 text-sm uppercase mt-11 items-end">
                <span>Total Payment</span>
                <span className="text-xl">฿{cart?.totalPrice}</span>
              </div>

              <Button onClick={makeOrder}>Place Order</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
