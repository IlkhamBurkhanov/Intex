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
        <div className="mb-4">
          <h2 className="text-navBarColor font-bold leading-8 text-2xl mb-4">
            {languages[lang].sitebar.productList}
          </h2>
          <div className="bg-white py-3 px-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center">
              <Mbutton BType="filter bg-filterBg" type="button">
                {languages[lang].main.filter}
              </Mbutton>
              <input
                id="homeSearch"
                className="py-3 ml-4 w-homeInpWidth outline-none pl-9 pr-3 rounded-xl bg-headerInpBg"
                type="text"
                placeholder={languages[lang].main.searchProduct}
                autoComplete="off"
              />
            </div>
            <div className="flex items-center">
              <strong className="font-semibold text-base text-homeColor mr-2.5">
                {languages[lang].main.sort}
              </strong>
              <div className="w-homeSortWidth cursor-pointer mr-6 flex items-center justify-between bg-headerInpBg p-3 rounded-xl">
                <span className="font-medium text-sm text-homeSortWrap">
                  {languages[lang].main.as}
                </span>
                <svg
                  width="24"
                  height="22"
                  viewBox="0 0 24 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 11L12 14L15 11"
                    stroke="#04009A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <Link to={"/addProduct"} className="add bg-filterBg">
                {languages[lang].main.add}
              </Link>
            </div>
          </div>
        </div>
        <Products></Products>
      </div>
    </>
  );
}
