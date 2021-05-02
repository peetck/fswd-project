import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import Truncate from "react-truncate";
import moment from "moment";

import Button from "../Button";

const ProductTableItem = ({ product, onRemove }) => {
  const history = useHistory();

  return (
    <Fragment>
      <tr className="border-b border-gray-200  hover:bg-gray-100">
        <td className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center font-bold">
            <div>{product._id}</div>
          </div>
        </td>

        <td className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center">
            <div>{product.title}</div>
          </div>
        </td>

        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
            <Truncate lines={1}>{product.description}</Truncate>
          </div>
        </td>

        <td className="py-3 px-6 text-center">
          <div className="flex items-center justify-center uppercase">
            {product.type === "PromotionProduct" ? (
              <span>
                <del className="text-coolGray-400">฿{product.price}</del> ฿
                {product.priceAfterDiscount} ({product.percent}% off)
              </span>
            ) : (
              `฿${product.price}`
            )}
          </div>
        </td>

        <td className="py-3 px-6 text-center">
          <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
            x{product.totalStock}
          </span>
        </td>

        <td className="py-3 px-6 text-center">
          <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
            x{product.sold}
          </span>
        </td>

        <td className="py-3 px-6 text-center">
          <div className="flex items-center justify-center">
            <div>{moment(product.createdAt).format("LL")}</div>
          </div>
        </td>

        <td className="py-3 px-6 text-center">
          <div className="flex">
            <div className="mr-3">
              <Button
                small
                onClick={() =>
                  history.push(
                    `/admin/${
                      product.type === "NormalProduct" ? "product" : "promotion"
                    }/${product._id}`
                  )
                }
              >
                edit
              </Button>
            </div>
            <Button danger small onClick={() => onRemove(product._id)}>
              remove
            </Button>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

export default ProductTableItem;
