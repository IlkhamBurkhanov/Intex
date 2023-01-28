import React from "react";
import Sort from "../../Assets/Images/TableImgs/sort.svg";

export default function THead({ data }) {
  return (
    <thead className="bg-[#f2f2f2]">
      <tr className="flex items-center">
        <th className="w-11 flex justify-center">
          <input className="w-[18px] h-[18px]" type="checkbox" />
        </th>
        {data.length &&
          data.map((i, a) => {
            return (
              <th
                className={`${i.style} flex justify-start items-center py-3 pl-3`}
                key={a}
              >
                <span className="text-sm text-[#464A4D] font-medium">
                  {i.title}
                </span>
                {i.image ? (
                  <img className="ml-2.5" src={Sort} alt="sort icon" />
                ) : null}
              </th>
            );
          })}
      </tr>
    </thead>
  );
}
