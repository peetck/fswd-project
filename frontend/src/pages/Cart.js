import React, { Fragment } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
import Truncate from "react-truncate";

import { useUserContext } from "../contexts/UserContext";
import Button from "../components/Button";
import ProductQuantity from "../components/ProductQuantity";

const PRODUCT_BY_ID_MUTATION = gql`
  query($_id: MongoID!) {
    productById(_id: $_id) {
      stock {
        color
        size
        quantity
      }
    }
  }
`;

const Cart = () => {
  const history = useHistory();

  const { user, cart, updateCart } = useUserContext();

  const [productById, { data, loading, error }] = useLazyQuery(
    PRODUCT_BY_ID_MUTATION
  );

  const handleQuantity = async (n, index) => {
    productById();

    if (
      cart.products[index].quantity + n <= 0 ||
      cart.products[index].quantity + n >
        cart.products[index].product.stock.find(
          (st) =>
            st.color === cart.products[index].color &&
            st.size === cart.products[index].size
        ).quantity
    ) {
      return;
    }
    updateCart(
      cart.products[index].productId,
      n,
      cart.products[index].color,
      cart.products[index].size,
      false
    );
  };

  return (
    <div className="flex flex-col">
      <div className="container mx-auto my-7 shadow-md min-w-min">
        <div className="flex flex-col lg:flex-row ">
          <div className="w-full lg:w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-bold text-2xl uppercase">Shopping Cart</h1>
              <h2 className="font-bold text-2xl uppercase hidden sm:inline-block">
                {cart?.products?.length} Items
              </h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-bold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-bold text-gray-600 text-xs uppercase w-1/5 text-center hidden lg:block">
                Price
              </h3>
              <h3 className="font-bold text-gray-600 text-xs uppercase w-2/5 text-center lg:w-1/5">
                Quantity
              </h3>
              <h3 className="font-bold text-gray-600 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>
            {cart?.products.map((product, index) => (
              <Fragment>
                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-2/5 h-24">
                    <img
                      className="hidden lg:inline-block h-24 object-contain bg-solitude"
                      src={product.product.images[0]}
                      width="100"
                      height="100"
                      alt=""
                    />
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <Truncate className="font-bold text-sm" lines={2}>
                        {product.product.title}
                      </Truncate>
                      <div className="flex flex-col">
                        <span className="text-coolGray-400 text-xs">
                          Color : {product.color}
                        </span>
                        <span className="text-coolGray-400 text-xs">
                          Size : {product.size}
                        </span>
                      </div>
                      <span
                        className="font-bold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
                        onClick={() =>
                          updateCart(
                            product.productId,
                            0,
                            product.color,
                            product.size,
                            true
                          )
                        }
                      >
                        Remove
                      </span>
                    </div>
                  </div>

                  <span className="justify-center w-1/5 text-sm hidden lg:flex">
                    {product.product.type === "NormalProduct" ? (
                      ` ฿${product.product.price}`
                    ) : (
                      <p>
                        <del className="text-coolGray-400">
                          ฿{product.product.price}
                        </del>{" "}
                        ฿{product.product.priceAfterDiscount}
                      </p>
                    )}
                  </span>

                  <div className="flex justify-center w-2/5 lg:w-1/5">
                    <ProductQuantity
                      quantity={product.quantity}
                      onAdd={() => handleQuantity(1, index)}
                      onRemove={() => handleQuantity(-1, index)}
                    />
                  </div>

                  <span className="flex justify-center w-1/5 text-sm">
                    ฿
                    {product.product.type === "NormalProduct"
                      ? product.product.price * product.quantity
                      : product.product.priceAfterDiscount * product.quantity}
                  </span>
                </div>
              </Fragment>
            ))}

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
              <div className="flex font-bold justify-between py-6 text-sm uppercase mt-20 items-end">
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

// {/* {cart.map((product) => (
//   <h1 key={product.productId}>
//     {product.productId} x {product.quantity} -
//     <button
//       onClick={() =>
//         updateCart(
//           product.productId,
//           0,
//           true,
//           product.color,
//           product.size
//         )
//       }
//     >
//       [Remove]
//     </button>
//   </h1>
// ))}

// <Link to="/checkout">CHECKOUT</Link> */}
