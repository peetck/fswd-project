import React from "react";

import CardStat from "./Cards/CardStat";

const AdminHeader = () => {
  return (
    <div className="flex flex-wrap items-center justify-center w-full md:h-80 bg-blueGray-800 px-8">
      <CardStat title="อิอิ" number="6,148" />
      <CardStat title="อิอิ" number="6,148" />
      <CardStat title="อิอิ" number="6,148" />
      <CardStat title="อิอิ" number="6,148" />
    </div>
  );
};

export default AdminHeader;
