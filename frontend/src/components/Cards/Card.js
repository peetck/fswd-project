import React from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";

const Card = ({ title, price, imageUrl, productType, percent, description }) => {
  return (
    <Link to={`/product/${title}`}>
      <div className="max-w-xs rounded  shadow-md my-2 shadow h-full border m-1">
        <div className="flex justify-center mt-10 ml-10 mr-10">
          <img class="w-56 h-56 object-cover shadow-md" src={imageUrl} />
        </div>
        <div class="ml-10 mr-10 mt-10">
          <div class="font-bold text-gray-500 text-lg mb-2 ">{title}</div>
          <p class="text-gray-500 text-base">
            {description}
          </p>
          <div className="mb-10 mt-8">
          
            {productType === "promotionProduct"?
            <>
            <p class="text-gray-500 ">
              THB {price * (percent/100)}
            </p>
            <div className="flex">
            <p class="text-gray-500 text-sm">From</p>
            <p class="text-gray-500 ml-2 line-through text-sm">THB {price}</p>
            <p class="text-red-500 ml-2 text-red-600 text-sm ml-5"> save - THB{price - (price * (percent/100))}</p>
               </div>
               </>
            :
            <p class="text-gray-500 ">
              THB {price}
            </p>
            }

         

            </div>
        </div>

      </div>
      {/* <div className="bg-white shadow-md transform transition ease-in hover:-translate-y-2 duration-75 m-2 h-64 flex flex-col justify-between">
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
          </div> */}
      {/* <div>
              <span className="uppercase bg-yellow-400 text-gray-800  p-1.5 text-xs shadow rounded ml-2">
                25% off
              </span>
            </div> */}
      {/* </div>
        <div className="p-1 text-gray-900 text-justify flex flex-row justify-start border-t text-sm">
          ฿ {price}
        </div>
      </div> */}
    </Link>
  );
};

export default Card;
