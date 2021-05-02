import React, { Fragment } from "react";

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
  checked,
  readOnly,
}) => {
  return (
    <Fragment>
      {label && (
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor={name}
        >
          {label}
        </label>
      )}
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
        <label className="w-52 flex flex-col items-center px-4 py-3 bg-white text-blue rounded tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-indigo-600">
          <span className="material-icons">file_upload</span>
          <span className="mt-2 text-sm leading-normal">Select a file</span>
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
      ) : type === "radio" ? (
        <input
          type={type}
          name={name}
          className="h-5 w-5 text-royal-blue"
          checked={checked}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
        />
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
    </Fragment>
  );
};

export default Input;
