import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

import { useUserContext } from "../contexts/UserContext";

const Cart = () => {
  const { user, cart, updateCart } = useUserContext();

  console.log(cart);

  return (
    <div>
      {cart.map((product) => (
        <h1 key={product.productId}>
          {product.productId} x {product.quantity} -{" "}
          <button
            onClick={() =>
              updateCart(
                product.productId,
                0,
                true,
                product.color,
                product.size
              )
            }
          >
            [Remove]
          </button>
        </h1>
      ))}

      <Link to="/checkout">CHECKOUT</Link>
    </div>
  );
};

export default Cart;
