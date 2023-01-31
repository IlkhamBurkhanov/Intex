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
        <ProductsCategory />
      </div>
    </div>
  );
}
