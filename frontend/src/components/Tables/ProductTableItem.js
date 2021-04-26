import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";

const ProductTableItem = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <tr
        className="border-b border-gray-200 cursor-pointer hover:bg-gray-100"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <td className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center">
            <div className="mr-2">
              <img className="w-6 h-6 rounded-full" src={product.images[0]} />
            </div>
            <div className="mr-2 ">{product.title}</div>
          </div>
        </td>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
            <Truncate lines={3}>{product.description}</Truncate>
          </div>
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex items-center justify-center">
            ${product.price}
          </div>
        </td>
        <td className="py-3 px-6 text-center">
          <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
            x{product.totalStock}
          </span>
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex item-center justify-center">
            <div
              className="w-4 m-2 transform cursor-pointer hover:text-purple-500 hover:scale-110"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span class="material-icons">
                {isOpen ? "expand_less" : "expand_more"}
              </span>
            </div>

            <Link
              to={`/admin/product/${product._id}`}
              className="w-4 m-2 transform hover:text-purple-500 hover:scale-110"
            >
              <span className="material-icons">mode_edit</span>
            </Link>

            <div
              className="w-4 m-2 transform cursor-pointer hover:text-purple-500 hover:scale-110"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span class="material-icons">delete</span>
            </div>
          </div>
        </td>
      </tr>
      {isOpen && (
        <tr className="border-b border-gray-200">
          <td className="py-3 px-6 text-left whitespace-nowrap" colSpan="5">
            <div className="flex flex-col">
              <b>INFORMATION</b>
              <p> Product ID : {product._id}</p>
              <p>Created At: {product.createdAt}</p>
              <p> Updated At: {product.updatedAt}</p>
              <b>STOCK</b>
              {product.stock.map((st) => (
                <p>
                  Color: {st.color}, Size: {st.size} - {st.quantity}
                </p>
              ))}
            </div>
          </td>
        </tr>
      )}
    </Fragment>
  );
};

export default ProductTableItem;
