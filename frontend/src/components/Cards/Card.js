import React from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";

const Card = ({ title, price, imageUrl }) => {
  return (
    <Link to={`/product/${title}`}>
      <div className="bg-white shadow-md transform transition ease-in hover:-translate-y-2 duration-75 m-2 h-64 flex flex-col justify-between">
        <div className=" text-grey-darker text-justify flex flex-col">
          <img
            src={imageUrl}
            alt="can't load img"
            className="w-44 h-44 flex self-center shadow-lg object-cover"
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs uppercase mx-2 text-blue-darker">
              <Truncate lines={2} width={120} trimWhitespace>
                {title}
              </Truncate>
            </p>
          </div>
          {/* <div>
              <span className="uppercase bg-yellow-400 text-gray-800  p-1.5 text-xs shadow rounded ml-2">
                25% off
              </span>
            </div> */}
        </div>
        <div className="p-1 text-gray-900 text-justify flex flex-row justify-start border-t text-sm">
          ฿ {price}
        </div>
      </div>
    </Link>
  );
};

export default Card;
