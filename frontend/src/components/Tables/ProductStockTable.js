import React from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "../Button";

const ProductStockTable = ({ stock, removeFromStock, handleEditButton }) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen flex items-center justify-center overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-4">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-center">Size</th>
                  <th className="py-3 px-6 text-center">Color</th>
                  <th className="py-3 px-6text-center">Quantity</th>
                  <th className="py-3 px-6text-center"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {stock.length !== 0 ? (
                  stock.map((st) => {
                    return (
                      <tr
                        className="border-b border-gray-200 hover:bg-gray-100"
                        key={uuidv4()}
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            <div className="mr-2 ">
                              <span>{st.size}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center justify-center">
                            <div className="mr-2">
                              <span>{st.color}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            <span>{st.quantity}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            <Button onClick={() => handleEditButton(st)}>
                              edit
                            </Button>
                            <Button onClick={() => removeFromStock(st)}>
                              remove
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="py-3 px-6" colSpan={4}>
                      <div className="flex items-center justify-center">
                        <div className="mr-2">
                          <span>No Data.</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductStockTable;
