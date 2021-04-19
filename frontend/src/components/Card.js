import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, price, imageUrl }) => {
  return (
    <Link to={`/product/${title}`}>
      <div
        className="w-64 border-black cursor-pointer hover:border my-10 mx-5"
        style={{
          height: "380px",
        }}
      >
        <img
          src={imageUrl}
          alt="img"
          className="object-cover w-full"
          style={{
            height: "260px",
          }}
        />

        <div className="mt-5 mx-2">
          <p className="text-sm">{title}</p>
          <p className="text-sm mt-1">${price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
