import React from "react";
import { Link, useHistory } from "react-router-dom";

import { useUserContext } from "../contexts/UserContext";
import Button from "../components/Button";
import CartItemList from "../components/CartItemList";

const Cart = () => {
  const history = useHistory();

  const { cart } = useUserContext();

  return (
    <div className="flex flex-col">
      <div className="container mx-auto my-7 min-w-min">
        <div className="flex flex-col lg:flex-row ">
          <div className="w-full lg:w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-bold text-2xl uppercase">Shopping Cart</h1>
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
                Quantity
              </h3>
              <h3 className="font-bold text-gray-600 text-xs uppercase w-1/5 text-center ">
                Total Price
              </h3>
            </div>

            <CartItemList editable />

            <div className="flex mt-10">
              <Link
                className="flex items-center font-bold text-royal-blue text-sm"
                to="/"
              >
                <span className="material-icons">keyboard_backspace</span>{" "}
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/4 px-8 py-10">
            <h1 className="font-bold text-2xl border-b pb-8 uppercase">
              Order Summary
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

            <div className="border-t mt-8">
              <div className="flex font-bold justify-between py-6 text-sm uppercase mt-11 items-end">
                <span>Total cost</span>
                <span className="text-xl">฿{cart?.totalPrice}</span>
              </div>

              <Button onClick={() => history.push("/checkout")}>
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
