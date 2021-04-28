import React, { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Link, Redirect } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const OmiseCard = window.OmiseCard;

const Checkout = () => {
  const { user, cart, refetchCart, token } = useUserContext();
  const [radioChecked, setRadioChecked] = useState("");

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

  const selectionPayment = () => {
    if (radioChecked == "credit") handleCreditCard();
    else makeOrder("CashOnDelivery");
  };

  console.log(cart);

  return (
    <div>
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10 justify-center mx-44">
          <div className="w-2/3 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Confirm Checkout</h1>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-3/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                Price
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>
            {cart?.products.map((product, index) => (
              <>
                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-3/5">
                    <div className="w-20">
                      <img
                        className="h-24"
                        src={product.product.images[0]}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-center ml-4 flex-grow">
                      <span className="font-bold text-sm">
                        {product.product.title}
                      </span>
                      <span className="text-gray-600 text-xs">
                        Color : {product.color}
                      </span>
                      <span className="text-gray-600 text-xs">
                        Size : {product.size}
                      </span>
                    </div>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    $
                    {product.product.type === "NormalProduct"
                      ? product.product.price
                      : product.product.priceAfterDiscount}{" "}
                    x {product.quantity} EA
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    $
                    {product.product.type === "NormalProduct"
                      ? product.product.price * product.quantity
                      : product.product.priceAfterDiscount * product.quantity}
                  </span>
                </div>
              </>
            ))}
            <Link to="/cart">
              <a className="flex font-semibold text-indigo-600 text-sm mt-10">
                <svg
                  className="fill-current mr-2 text-indigo-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Back to Cart
              </a>
            </Link>
          </div>
          <div id="summary" className="w-1/3 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Information
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items {cart?.products?.length}
              </span>
              <span className="font-semibold text-sm">${cart?.totalPrice}</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm">
                Payment Option
              </label>
              <div className="mt-6">
                <button className="flex items-center justify-between w-full bg-white rounded-md border-2 border-blue-500 p-4 focus:outline-none">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="options"
                      value="credit"
                      className="form-radio h-5 w-5 text-blue-600"
                      onClick={(e) => setRadioChecked(e.target.value)}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Credit Card
                    </span>
                  </label>
                  {/* icon payment */}
                  {/* <span className="text-gray-600 text-sm">$18</span> */}
                </button>
                <button className="mt-6 flex items-center justify-between w-full bg-white rounded-md border p-4 focus:outline-none">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="options"
                      value="cash"
                      className="form-radio h-5 w-5 text-blue-600"
                      onClick={(e) => setRadioChecked(e.target.value)}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Cash on Delivery
                    </span>
                  </label>
                  {/* icon payment */}
                  {/* <span class="text-gray-600 text-sm">$26</span> */}
                </button>
              </div>
            </div>

            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase mt-20">
                <span>Total Payment</span>
                <span>${cart?.totalPrice}</span>
              </div>
              {radioChecked != "" ? (
                <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                onClick={selectionPayment}>
                  place order
                </button>
              ) : (
                <button className="bg-indigo-200 font-semibold py-3 text-sm text-white uppercase w-full focus:outline-none">
                  place order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <button onClick={() => makeOrder("CashOnDelivery")}>
    //     cash on delivery
    //   </button>
    //   <button onClick={handleCreditCard}>credit card</button>
    // </div>
  );
};

export default Checkout;
