import React from "react";
import { Link } from "react-router-dom";


import ProductTableItem from "./ProductTableItem";

const ProductTable = ({ products }) => {
  return (
    <div className="overflow-auto">
      <div className="min-w-screen flex items-center justify-center">
        <div className="w-full">
          <div className="bg-white shadow-md rounded">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left" >Description</th>
                  <th className="py-3 px-6 text-center">Price</th>
                  <th className="py-3 px-6 text-center">Quantity</th>
                  <th className="py-3 px-6 text-center"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {products.map((product) => (
                  <ProductTableItem key={product._id} product={product} />
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
