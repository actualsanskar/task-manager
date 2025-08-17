import React from "react";

function BorderBox({ className, children }) {
  return (
    <div className={`rounded-2xl p-4 shadow ${className}`}>{children}</div>
  );
}

export default BorderBox;
