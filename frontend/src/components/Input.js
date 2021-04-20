import React from "react";

const Input = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  rows,
  cols,
  children,
}) => {
  return (
    <>
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 resize-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          cols={cols}
        />
      ) : type === "select" ? (
        <select
          name={name}
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default Input;
