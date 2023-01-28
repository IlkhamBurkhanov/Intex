import React from "react";

function MFilter({ children, className }) {
  return (
    <span className={` ${className} py-1 px-2 bg-[#9CDAFF] rounded-md  text-xs text-[#24283A] leading-4 ml-1.5 first:ml-0`}>
      {children}
    </span>
  );
}

export default MFilter;
