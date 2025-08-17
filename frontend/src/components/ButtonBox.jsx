import React from "react";

function ButtonBox({ text = "Button", type = "submit", className = "", prop }) {
  return (
    <div>
      <button
        type={type}
        className={`rounded-2xl text-sm border border-gray-400 p-2 ${className}`}
        {...prop}
      >
        {text}	
      </button>
    </div>
  );
}

export default ButtonBox;
