import React, { Fragment, useState, useEffect } from "react";

import Input from "../Input";
import Button from "../Button";
import ProductStockTable from "../Tables/ProductStockTable";

const ProductStockForm = ({
  stock,
  addToStock,
  editStock,
  removeFromStock,
}) => {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [updatedQuantity, setUpdatedQuantity] = useState("");

  const handleEditButton = (st) => {
    setSelectedColor(st.color);
    setSelectedSize(st.size);
  };

  console.log(selectedColor, selectedSize, updatedQuantity);

  useEffect(() => {
    const index = stock.findIndex((st) => st.size === +selectedSize);

    if (selectedSize && index >= 0) {
      setUpdatedQuantity(
        stock.find(
          (st) => st.color === selectedColor && st.size === +selectedSize
        ).quantity
      );
    } else {
      setSelectedSize("");
      setUpdatedQuantity("");
    }
  }, [stock, selectedSize]);

  return (
    <Fragment>
      <div className="flex">
        <div className="flex flex-col flex-1 pr-20">
          <div className="my-4">
            <Input
              name="color"
              label="Color"
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className="my-4">
            <Input
              name="size"
              label="Size"
              type="text"
              value={size}
              onChange={(e) => {
                if (
                  !e.target.value ||
                  e.target.value.match(/^\d{1,}(\.\d{0,1})?$/)
                ) {
                  setSize(e.target.value.replace(/^0+/, ""));
                }
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
                setQuantity(
                  e.target.value.replace(/\D/, "").replace(/^0+/, "")
                );
              }}
            />
          </div>

          <div className="w-36 my-4">
            <Button onClick={() => addToStock(color, size, quantity)}>
              Add
            </Button>
          </div>
        </div>

        <div className="flex flex-col flex-1 border-l pl-20">
          <div className="my-4">
            <Input
              name="color"
              label="Color"
              type="select"
              value={selectedColor}
              onChange={(e) => {
                setSelectedColor(e.target.value);
                setSelectedSize("");
                setQuantity("");
              }}
            >
              {stock
                .filter(
                  (st, index, self) =>
                    self.findIndex((i) => i.color === st.color) === index
                )
                .map((st) => (
                  <option value={st.color}>{st.color}</option>
                ))}
            </Input>
          </div>

          <div className="my-4">
            <Input
              name="size"
              label="Size"
              type="select"
              value={selectedSize}
              disabled={!selectedColor}
              onChange={(e) => {
                setSelectedSize(e.target.value);
              }}
            >
              {stock
                .filter((st) => st.color === selectedColor)
                .map((st) => (
                  <option value={st.size}>{st.size}</option>
                ))}
            </Input>
          </div>

          <div className="my-4">
            <Input
              name="quantity"
              label="Quantity"
              type="text"
              value={updatedQuantity}
              disabled={!selectedColor || !selectedSize}
              onChange={(e) => {
                setUpdatedQuantity(e.target.value);
              }}
            />
          </div>

          <div className="w-36 my-4">
            <Button
              onClick={() => {
                editStock({
                  color: selectedColor,
                  size: selectedSize,
                  quantity: updatedQuantity,
                });
              }}
            >
              Update
            </Button>
          </div>
        </div>
      </div>

      <ProductStockTable
        stock={stock}
        removeFromStock={removeFromStock}
        handleEditButton={handleEditButton}
      />
    </Fragment>
  );
};

export default ProductStockForm;
