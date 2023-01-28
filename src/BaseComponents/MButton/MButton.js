import React from "react";
import "./MButton.css";

function MButton({ BType, type, className, children, onClick }) {
  return (
    <button className={`btn ${BType} ${className}  `} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default MButton;
