import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Truncate from "react-truncate";

import { NORMAL_PRODUCTS_QUERY } from "../../graphql/queries/normalProducts";
import Button from "../../components/Button";

const AdminProducts = () => {
  const history = useHistory();
  const { data: products, loading, error } = useQuery(NORMAL_PRODUCTS_QUERY);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="overflow-auto">
      <div className="min-w-screen flex items-center justify-center">
        <div className="w-full lg:w-5/6">
          <div className="bg-white shadow-md rounded my-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-center">Price</th>
                  <th className="py-3 px-6 text-center">Quantity</th>
                  <th className="py-3 px-6 text-center"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {products.normalProducts.map((product) => (
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-100"
                    key={product._id}
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2">
                          <img
                            className="w-6 h-6 rounded-full"
                            src={product.images[0]}
                          />
                        </div>
                        <div className="mr-2 ">{product.title}</div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <Truncate>{product.description}</Truncate>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        ${product.price}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                        x{product.quantity}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <Link
                          to={`/admin/product/${product._id}`}
                          className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                        >
                          <span className="material-icons">mode_edit</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
