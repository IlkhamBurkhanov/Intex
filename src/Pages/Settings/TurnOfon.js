import axios from "axios";
import React from "react";
import { useEffect } from "react";

const token = JSON.parse(window.localStorage.getItem("token"));
export const TurnOfon = ({ checked, onCliked, lang }) => {
  useEffect(() => {
    axios
      .put(
        "https://intex-shop-production.up.railway.app/api/sites/siteLangUpdate",
        {
          lang_name: lang,
          status: checked,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  }, [checked]);
  return (
    <div
      className={`bg-[#109EF4] cursor-pointer relative w-10 h-5 rounded-full ${
        checked ? "bg-[#109EF4]" : "bg-[#E0E5F2]"
      }`}
    >
      <span
        onClick={() => onCliked()}
        className={`w-2/5 h-4/5 absolute rounded-full bg-white top-0.5  transition-all duration-500 ${
          checked ? "left-[22px] " : "left-0.5"
        } `}
      ></span>
    </div>
  );
};
