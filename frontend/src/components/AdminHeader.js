import React from "react";

import CardStat from "./Cards/CardStat";

const AdminHeader = () => {
  return (
    <div className="flex flex-wrap items-center justify-center w-full md:h-80 bg-blueGray-800 px-8">
      <CardStat
        title="All Time Revenue"
        number="$6,148"
        color="bg-green-600"
        iconName="attach_money"
      />
      <CardStat
        title="All Time Orders"
        number="6,148"
        color="bg-indigo-600"
        iconName="shopping_bag"
      />
      <CardStat
        title="Today Revenue"
        number="6,148"
        color="bg-green-600"
        iconName="attach_money"
      />
      <CardStat
        title="Today Orders"
        number="6,148"
        color="bg-indigo-600"
        iconName="shopping_bag"
      />
    </div>
  );
};

export default AdminHeader;
