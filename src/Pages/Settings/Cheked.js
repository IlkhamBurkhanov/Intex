import React from "react";
import Checked from "./checked.svg";

export const Cheked = ({ checked, Clicked }) => {
  return (
    <div className="ml-[130px]">
      <label className="cursor-pointer relative">
        <input
          onClick={Clicked}
          type="checkbox"
          className={`appearance-none h-5 w-5 border-[1px] rounded-full ${
            checked ? "bg-blue-500 " : " border-blue-500 "
          } `}
        />
        <img
          src={Checked}
          alt="Icon"
          className={`text-8xl absolute h-[18px] w-[16px]  text-blue-400 left-0.5 -top-[3px] ${
            checked ? "block" : "hidden"
          }`}
        />
      </label>
    </div>
  );
};
