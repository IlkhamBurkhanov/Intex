import React from "react";
import FilterSvg from "../../Assets/Images/ProductsImgs/sort.svg";

export default function TableHeader({ children, sortIcon, styles }) {
  return (
    <th className={`flex font-medium leading-6 pl-3 ${styles ? styles : ""}`}>
      {children}
      {sortIcon ? (
        <img className="ml-2" src={FilterSvg} alt="filter  icon" />
      ) : (
        ""
      )}
    </th>
  );
}
