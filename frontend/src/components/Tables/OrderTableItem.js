import React, { Fragment } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

import Button from "../Button";

const OrderTableItem = ({ order, onUpdate, onRemove }) => {
  const history = useHistory();

  return (
    <Fragment>
      <tr className="border-b border-gray-200  hover:bg-gray-100">
        <td className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center font-bold">
            <div>{order._id}</div>
          </div>
        </td>

        <td className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center">
            <div>{order.user.username}</div>
          </div>
        </td>

        <td className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center">
            <div>{order.user.email}</div>
          </div>
        </td>

        <td className="py-3 px-6 text-center">
          <div className="flex items-center justify-center">
            ฿{order.totalPrice}
          </div>
        </td>

        <td className="py-3 px-6 text-center">
          <span
            className={`py-1 px-3 rounded-full text-sm text-white ${
              order.deliveryStatus === "Waiting"
                ? "bg-yellow-500"
                : "bg-green-600"
            }`}
          >
            {order.deliveryStatus}
          </span>
        </td>

        <td className="py-3 px-6 text-center">
          <div className="flex items-center justify-center">
            <div>{moment(order.createdAt).format("LL")}</div>
          </div>
        </td>

        <td className="py-3 px-6 text-center">
          <div className="flex">
            <div className="mr-1">
              <Button
                small
                onClick={() => history.push(`/admin/order/${order._id}`)}
              >
                detail
              </Button>
            </div>

            {order.deliveryStatus === "Waiting" ? (
              <Button small onClick={() => onUpdate(order._id)}>
                update status
              </Button>
            ) : (
              <Button small disabled>
                update status
              </Button>
            )}

            <Button danger small onClick={() => onRemove(order._id)}>
              cancel
            </Button>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

export default OrderTableItem;
