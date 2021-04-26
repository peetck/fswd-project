import React from "react";

const Button = ({ children, onClick, disabled, type }) => {
  if (disabled) {
    return (
      <button
        disabled
        className="bg-gray-500 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className="bg-indigo-600 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
