import React from "react";

const ProductCheckbox = ({ selectedColor, stock, selectedSize }) => {
  const color = sizes?.map((size) => {
    for (let prod of product.product.stock) {
      if (
        (selectedColor ? prod.color === selectedColor : true) &&
        prod.size === size &&
        prod.quantity > 0
      ) {
        return (
          <button
            key={size}
            className={`${
              size === selectedSize
                ? "border border-indigo-600"
                : "border border-white"
            } bg-white hover:bg-gray-100 text-sm text-gray-800 font-semibold py-2 px-5 shadow  focus:outline-none mr-1 flex relative`}
            onClick={() =>
              size === selectedSize ? setSelectedSize() : setSelectedSize(size)
            }
          >
            {size}
            {size === selectedSize ? (
              <div className="absolute right-0 bottom-0">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#4f46e5"
                  x="0"
                  y="0"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            ) : (
              ""
            )}
          </button>
        );
      }
    }
    return (
      <button
        key={size}
        disabled
        className="bg-white text-sm text-gray-400 font-semibold py-2 px-5 rounded shadow border border-gray-200 mr-1"
      >
        {size}
      </button>
    );
  });

  return <div></div>;
};

export default ProductCheckbox;
