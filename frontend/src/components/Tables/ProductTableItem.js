import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import Truncate from "react-truncate";
import moment from "moment";

const ProductTableItem = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [removeNormalProduct] = useMutation(
    gql`
      mutation($_id: MongoID!) {
        removeNormalProduct(_id: $_id) {
          recordId
        }
      }
    `
  );

  const [removePromotionProduct] = useMutation(
    gql`
      mutation($_id: MongoID!) {
        removePromotionProduct(record: { _id: $_id }) {
          status
        }
      }
    `
  );

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
        <td className="py-3 px-6 text-center">
          <div className="flex items-center">
            <Truncate lines={3}>{product.description}</Truncate>
          </div>
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex items-center justify-center">
            $
            {product.type === "PromotionProduct"
              ? `${product.priceAfterDiscount} from ${product.price}`
              : product.price}
          </div>
        </td>
        <td className="py-3 px-6 text-center">
          <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
            x{product.totalStock}
          </span>
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex item-center justify-center">
            <div className="w-4 m-2 transform cursor-pointer hover:text-purple-500 hover:scale-110">
              <span className="material-icons">
                {isOpen ? "expand_less" : "expand_more"}
              </span>
            </div>

            <Link
              to={`/admin/${
                product.type === "NormalProduct" ? "product" : "promotion"
              }/${product._id}`}
              className="w-4 m-2 transform hover:text-purple-500 hover:scale-110"
            >
              <span className="material-icons">mode_edit</span>
            </Link>

            <div
              className="w-4 m-2 transform cursor-pointer hover:text-purple-500 hover:scale-110"
              onClick={() => {
                if (product.type === "NormalProduct") {
                  removeNormalProduct({
                    variables: {
                      _id: product._id,
                    },
                  });
                } else {
                  removePromotionProduct({
                    variables: {
                      _id: product._id,
                    },
                  });
                }
              }}
            >
              <span className="material-icons">delete</span>
            </div>
          </div>
        </td>
      </tr>
      {isOpen && (
        <tr className="border-b border-gray-200">
          <td className="text-left whitespace-nowrap align-top">
            <tr className="text-gray-600 uppercase text-sm align-top">
              <th className="px-6 pt-3 text-left">STOCK</th>
            </tr>
            <tr>
              <td className="px-6 pt-3 pb-3 text-left whitespace-nowrap align-top">
                <div className="flex flex-col ">
                  {product.stock.map((st) => (
                    <p>
                      Color: {st.color}, Size: {st.size} - {st.quantity}
                    </p>
                  ))}
                </div>
              </td>
            </tr>
          </td>
          <td className="text-left whitespace-nowrap align-top" colSpan="5">
            <tr className="text-gray-600 uppercase text-sm align-top">
              {/* <th className="px-6 pt-3 text-left">Product ID</th> */}
              <th className="px-6 pt-3 text-left">Created At</th>
              <th className="px-6 pt-3 text-left">Last Updated At</th>
            </tr>
            <tr>
              {/* <td className="px-6 pt-3 text-left whitespace-nowrap align-top">
                <div className="flex flex-col ">
                  <p>{product._id}</p>
                </div>
              </td> */}
              <td className="px-6 pt-3 pb-3 text-left whitespace-nowrap align-top">
                <div className="flex flex-col ">
                  <div className="overflow-hidden">
                    <p className="font-semibold float-left">Date :</p>
                    <p className="float-right">
                      {moment(product.createdAt).format("DD/MM/YYYY")}
                    </p>
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-semibold float-left mr-1">Time : </p>
                    <p className="float-right">
                      {moment(product.createdAt).format("hh:mm:ss A")}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 pt-3 pb-3 text-left whitespace-nowrap align-top">
                <div className="flex flex-col">
                  <div className="overflow-hidden">
                    <p className="font-semibold float-left">Date :</p>
                    <p className="float-right">
                      {moment(product.updatedAt).format("DD/MM/YYYY")}
                    </p>
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-semibold float-left mr-1">Time : </p>
                    <p className="float-right">
                      {moment(product.updatedAt).format("hh:mm:ss A")}
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </td>
        </tr>
      )}
    </Fragment>
  );
};

export default ProductTableItem;
