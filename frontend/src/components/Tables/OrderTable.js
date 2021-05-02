import React from "react";

import OrderTableItem from "./OrderTableItem";

const OrderTable = ({ orders, onUpdate, onRemove }) => {
  return (
    <div className="overflow-auto">
      <div className="min-w-screen flex items-center justify-center">
        <div className="w-full">
          <div className="bg-white shadow-md rounded">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left uppercase">order id</th>
                  <th className="py-3 px-6 text-left uppercase">username</th>
                  <th className="py-3 px-6 text-left uppercase">user email</th>
                  <th className="py-3 px-6 text-center uppercase">
                    total price
                  </th>
                  <th className="py-3 px-6 text-center uppercase">
                    delivery status
                  </th>
                  <th className="py-3 px-6 text-center uppercase">
                    created at
                  </th>
                  <th className="py-3 px-6 text-center uppercase"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <OrderTableItem
                    order={order}
                    key={order._id}
                    onUpdate={onUpdate}
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

export default OrderTable;
