import React, { forwardRef } from "react";

function InputBox({
  label,
  type = "text",
  placeholder,
  className = "",
  props,
}) {
  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor={label}
        className="font-medium text-sm text-gray-400 capitalize"
      >
        {label}
      </label>
      <input
        type={type}
        required
        id={label}
        placeholder={placeholder}
        className={`${className}`}
        {...props}
      />
    </div>
  );
}

export default InputBox;
