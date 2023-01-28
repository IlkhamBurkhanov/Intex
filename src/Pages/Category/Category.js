import React from "react";
import { Link } from "react-router-dom";
import ProductsCategory from "./CategoryTable";
import MButton from "../../BaseComponents/MButton/MButton";
// Images
import HomeImg from "../../Assets/Images/HeaderImgs/HomeImg.svg";
// Style
import "../../BaseComponents/MButton/MButton.css";
import { useSelector, useDispatch } from "react-redux";
import { searchProduction } from "../../redux/siteDataReducer";

export default function Home() {
  const search = useSelector((state) => state.data.search);
  const languages = useSelector((state) => state.data.localization);
  const lang = useSelector((state) => state.data.lang);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="bg-white flex items-center w-full pt-1.5 pb-1.5 px-8">
        <Link className="flex items-center" to={"/"}>
          <img src={HomeImg} alt="Home Img" width="16" height="16" />
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link to="/category">
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">
            {languages[lang].sitebar.category}
          </h2>
        </Link>
      </div>
      <div className="h-[100vh] overflow-auto">
        <div className="pt-6 pb-8 px-homeContentPadding ">
          <div>
            <h2 className="text-navBarColor font-bold leading-8 text-2xl mb-4">
              {languages[lang].sitebar.category}
            </h2>
            <div className="bg-white py-3 px-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center">
                <MButton BType="filter bg-filterBg" type="button">
                  {languages[lang].main.filter}
                </MButton>
                <input
                  id="homeSearch"
                  className="py-3 ml-4 w-homeInpWidth outline-none pl-9 pr-3 rounded-xl bg-headerInpBg"
                  type="text"
                  placeholder={languages[lang].main.searchProduct}
                  autoComplete="off"
                  value={search}
                  onChange={(e) => {
                    dispatch(searchProduction(e.target.value));
                  }}
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
                <Link to={"/addCategory"} className="add bg-filterBg">
                  {languages[lang].main.add}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="px-[30px]">
          <ProductsCategory />
        </div>
      </div>
    </div>
  );
}
