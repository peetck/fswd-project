import React from "react";

const Button = ({
  children,
  onClick,
  disabled,
  type,
  checked,
  danger,
  small,
}) => {
  if (type === "checkbox") {
    return (
      <button
        className={
          disabled
            ? "bg-white text-sm text-gray-400 font-semibold py-2 px-5 rounded shadow border border-gray-200 mr-1"
            : `bg-white hover:bg-gray-100 text-sm text-gray-800 font-semibold py-2 px-5 shadow border focus:outline-none mr-1 flex relative ${
                checked ? "border-indigo-600" : "border-gray-200"
              }`
        }
        disabled={disabled}
        onClick={onClick}
      >
        {children}
        {checked && (
          <div className="absolute right-0 bottom-0">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#4f46e5"
              x="0"
              y="0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </button>
    );
  }

  return (
    <button
      className={`${
        disabled
          ? "bg-coolGray-400"
          : danger
          ? "bg-rose-600 hover:shadow-lg"
          : "bg-royal-blue hover:shadow-lg"
      } ${
        small ? "px-3 py-2 text-xs" : "px-6 py-3 text-sm"
      }  text-white font-bold uppercase rounded shadow outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
