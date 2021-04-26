import React from "react";

const Input = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  multiple,
  rows,
  cols,
  children,
  disabled,
  required,
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
          disabled={disabled}
          required={required}
        />
      ) : type === "select" ? (
        <select
          name={name}
          className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          defaultValue="null"
          required={required}
        >
          <option value="">--------</option>
          {children}
        </select>
      ) : type === "file" ? (
        <label class="w-52 flex flex-col items-center px-4 py-3 bg-white text-blue rounded tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-indigo-600">
          <span class="material-icons">file_upload</span>
          <span class="mt-2 text-sm leading-normal">Select a file</span>
          <input
            type={type}
            name={name}
            className="hidden"
            multiple={multiple}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
          />
        </label>
      ) : (
        <input
          type={type}
          name={name}
          className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
        />
      )}
    </>
  );
};

export default Input;
