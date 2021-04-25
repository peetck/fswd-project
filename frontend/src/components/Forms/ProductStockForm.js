import React, { Fragment } from "react";

import Input from "../Input";
import Button from "../Button";
import ProductStockTable from "../Tables/ProductStockTable";

const ProductStockForm = ({
  color,
  size,
  quantity,
  onChange,
  stock,
  addToStock,
  removeFromStock,
}) => {
  return (
    <Fragment>
      <div className="my-4">
        <Input
          name="color"
          label="Color"
          type="text"
          value={color}
          onChange={(e) => {
            onChange(e);
          }}
        />
      </div>

      <div className="my-4">
        <Input
          name="size"
          label="Size"
          type="text"
          value={size}
          onChange={(e) => {
            onChange(e);
          }}
        />
      </div>

      <div className="my-4">
        <Input
          name="quantity"
          label="Quantity"
          type="text"
          value={quantity}
          onChange={(e) => {
            onChange(e);
          }}
        />
      </div>

      <div className="w-36 my-4">
        <Button onClick={addToStock}> Add</Button>
      </div>

      <ProductStockTable stock={stock} removeFromStock={removeFromStock} />
    </Fragment>
  );
};

export default ProductStockForm;
