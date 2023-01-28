import React from "react";
import "./MLabel.css";

function MLabel({ type, children }) {
  return (
    <>
      <div className={`label ${type}`}>{children}</div>
    </>
  );
}

export default MLabel;
