import React from "react";

import ProductTableItem from "./ProductTableItem";

const ProductTable = ({ products, onRemove }) => {
  return (
    <div className="overflow-auto">
      <div className="min-w-screen flex items-center justify-center">
        <div className="w-full">
          <div className="bg-white shadow-md rounded">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left uppercase">product id</th>
                  <th className="py-3 px-6 text-left uppercase">Title</th>
                  <th className="py-3 px-6 text-left uppercase">Description</th>
                  <th className="py-3 px-6 text-center uppercase">Price</th>
                  <th className="py-3 px-6 text-center uppercase">Quantity</th>
                  <th className="py-3 px-6 text-center uppercase">Sold</th>

                  <th className="py-3 px-6 text-center uppercase">
                    created at
                  </th>
                  <th className="py-3 px-6 text-center uppercase"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {products.map((product) => (
                  <ProductTableItem
                    product={product}
                    key={product._id}
                    onRemove={onRemove}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
