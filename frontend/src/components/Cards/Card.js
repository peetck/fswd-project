import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";

const Card = ({
  title,
  price,
  imageUrl,
  productType,
  percent,
  priceAfterDiscount,
  sold
}) => {
  return (
    <Link to={`/product/${title}`}>
      <div className="bg-white transform shadow-lg transition ease-in hover:-translate-y-2 duration-75 m-8 w-56 h-80 flex flex-col justify-between">
        <div className="text-grey-darker text-justify flex flex-col">
          <img
            src={imageUrl}
            alt={imageUrl}
            className="w-full h-56 flex self-center shadow-md object-contain bg-solitude"
          />
          <div className="flex items-center justify-between mt-2">
            <Truncate lines={2} width={120} className="text-sm uppercase px-2">
              {title}
            </Truncate>

            {productType === "PromotionProduct" && (
              <div>
                <span className="uppercase bg-yellow-400 text-gray-800  p-1.5 text-xs shadow rounded mr-3">
                  {percent}% off
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="py-1 px-2 flex flex-row justify-between items-center border-t">
          <div className="text-royal-blue font-bold text-lg">
            {productType === "PromotionProduct" ? (
              <p>
                <del className="text-coolGray-400 font-normal text-base">
                  ฿{price}
                </del>{" "}
                ฿{priceAfterDiscount}
              </p>
            ) : (
              `฿${price}`
            )}
          </div>
          <div className="text-sm text-coolGray-400">{sold} sold</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
