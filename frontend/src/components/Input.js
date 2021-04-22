import React from "react";

const Input = ({
  label,
  type,
  name,
  placeholder,
  defaultValue,
  value,
  onChange,
  multiple,
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
          className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 resize-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          cols={cols}
        />
      ) : type === "select" ? (
        <select
          name={name}
          className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
        >
          {children}
        </select>
      ) : type === "file" ? (
        <input
          type={type}
          name={name}
          className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          multiple={multiple}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          name={name}
          className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default Input;
