import React, { Fragment } from "react";

const ProductQuantity = ({ quantity, onRemove, onAdd, editable }) => {
  if (!editable) {
    return <span className="text-base mx-3 text-center">{quantity}</span>;
  }

  return (
    <Fragment>
      <span
        class="material-icons cursor-pointer select-none hover:opacity-75"
        onClick={onRemove}
      >
        remove_circle_outline
      </span>
      <span className="text-base mx-3 text-center">{quantity}</span>
      <span
        class="material-icons cursor-pointer select-none hover:opacity-75"
        onClick={onAdd}
      >
        add_circle_outline
      </span>
    </Fragment>
  );
};

export default ProductQuantity;
