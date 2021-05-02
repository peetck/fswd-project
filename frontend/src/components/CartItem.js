import React, { Fragment } from "react";
import Truncate from "react-truncate";

import ProductQuantity from "./ProductQuantity";

const CartItem = ({
  imageUrl,
  title,
  color,
  size,
  quantity,
  price,
  priceAfterDiscount,
  type,
  removeFromCart,
  onAdd,
  onRemove,
  editable,
}) => {
  return (
    <Fragment>
      <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
        <div className="flex w-2/5 h-24">
          <img
            className="hidden lg:inline-block h-24 object-contain bg-solitude"
            src={imageUrl}
            width="100"
            height="100"
            alt={title}
          />
          <div className="flex flex-col justify-between ml-4 flex-grow">
            <Truncate className="font-bold text-sm" lines={2}>
              {title}
            </Truncate>
            <div className="flex flex-col">
              <span className="text-coolGray-400 text-xs">Color : {color}</span>
              <span className="text-coolGray-400 text-xs">Size : {size}</span>
            </div>
            <span
              className="font-bold hover:text-red-500 text-gray-500 text-xs cursor-pointer uppercase"
              onClick={removeFromCart}
            >
              Remove
            </span>
          </div>
        </div>

        <span className="justify-center w-1/5 text-sm hidden lg:flex">
          {type === "NormalProduct" ? (
            ` ฿${price}`
          ) : (
            <span>
              <del className="text-coolGray-400">฿{price}</del> ฿
              {priceAfterDiscount}
            </span>
          )}
        </span>

        <div className="flex justify-center w-2/5 lg:w-1/5">
          <ProductQuantity
            quantity={quantity}
            onAdd={onAdd}
            onRemove={onRemove}
            editable={editable}
          />
        </div>

        <span className="flex justify-center w-1/5 text-sm">
          ฿
          {type === "NormalProduct"
            ? price * quantity
            : priceAfterDiscount * quantity}
        </span>
      </div>
    </Fragment>
  );
};

export default CartItem;
