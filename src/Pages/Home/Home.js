import React from "react";
import { Link } from "react-router-dom";
import HomeImg from "../../Assets/Images/HeaderImgs/HomeImg.svg";
import Mbutton from "../../BaseComponents/MButton/MButton";
import "../../BaseComponents/MButton/MButton.css";
import Products from "../Products/Products";
import { useSelector } from "react-redux";

export default function Home() {
  const languages = useSelector((state) => state.data.localization);
  const lang = useSelector((state) => state.data.lang);
  return (
    <>
      <div className="bg-white flex items-center w-full pt-1.5 pb-1.5 px-8">
        <Link className="flex items-center" to={"/"}>
          <img src={HomeImg} alt="Home Img" width="16" height="16" />
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link to="/">
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">
            {languages[lang].header.products}
          </h2>
        </Link>
      </div>
      <div className="pt-6 pb-8 overflow-y-auto h-[100vh] px-homeContentPadding">
        <Products></Products>
      </div>
    </>
  );
}
