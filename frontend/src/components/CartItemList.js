import React from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import { useUserContext } from "../contexts/UserContext";
import CartItem from "./CartItem";
import Loader from "./Loader";

const CartItemList = ({ editable }) => {
  const { cart, updateCart } = useUserContext();

  const handleQuantity = async (n, index) => {
    if (cart.products[index].quantity + n <= 0) {
      return;
    }

    if (
      cart.products[index].quantity + n >
      cart.products[index].product.stock.find(
        (st) =>
          st.color === cart.products[index].color &&
          st.size === cart.products[index].size
      ).quantity
    ) {
      return toast.error(
        "You have reached the maximum quantity available for this item"
      );
    }

    updateCart(
      cart.products[index].productId,
      n,
      cart.products[index].color,
      cart.products[index].size,
      false
    );
  };

  if (!cart) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  return cart.products.map((product, index) => (
    <CartItem
      key={uuidv4()}
      title={product.product.title}
      color={product.color}
      imageUrl={product.product.images[0]}
      price={product.product.price}
      type={product.product.type}
      quantity={product.quantity}
      priceAfterDiscount={product.product.priceAfterDiscount}
      size={product.size}
      onAdd={() => handleQuantity(1, index)}
      onRemove={() => handleQuantity(-1, index)}
      removeFromCart={() =>
        updateCart(product.productId, 0, product.color, product.size, true)
      }
      editable={editable}
    />
  ));
};

export default CartItemList;
