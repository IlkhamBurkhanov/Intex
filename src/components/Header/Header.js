import React, { useState } from "react";
import DropIcon from "../../Assets/Images/NavbarImgs/dropIcon.svg";
import ruFlag from "../../Assets/Images/HeaderImgs/ru-flag.svg";
import usaFlag from "../../Assets/Images/HeaderImgs/usa-flag.svg";
import uzbFlag from "../../Assets/Images/HeaderImgs/uzb-flag.svg";
import Notification from "../../Assets/Images/HeaderImgs/notification.svg";
import avatar from "../../Assets/Images/HeaderImgs/avatar.svg";
import { useSelector, useDispatch } from "react-redux";
import { changeLang } from "../../redux/siteDataReducer";
import jwt from "jwt-decode";

export default function Header() {
  const [down, setDown] = useState(false);
  const [flagImg, setFlagImg] = useState(ruFlag);
  const [langName, setLangName] = useState("Ру");

  const lang = useSelector((state) => state.data.lang);
  const dispatch = useDispatch();

  const chooseName = (evt) => {
    if (evt.target.textContent === "Uz") {
      setLangName("Uz");
      setFlagImg(uzbFlag);
      dispatch(changeLang("uz"));
    }
    if (evt.target.textContent === "Us") {
      setLangName("Us");
      setFlagImg(usaFlag);
      dispatch(changeLang("en"));
    }
    if (evt.target.textContent === "Ру") {
      setLangName("Ру");
      setFlagImg(ruFlag);
      dispatch(changeLang("ru"));
    }
  };
  const chooseImg = (evt) => {
    if (evt.target.alt === "uzb") {
      setFlagImg(uzbFlag);
      setLangName("Uz");
    }
    if (evt.target.alt === "usa") {
      setFlagImg(usaFlag);
      setLangName("Us");
    }
    if (evt.target.alt === "ru") {
      setFlagImg(ruFlag);
      setLangName("Ру");
    }
  };
  // const token = JSON.parse(window.localStorage.getItem("token"));
  // const aliw = jwt(token);
  // console.log(aliw.image);

  return (
    <div className="bg-white w-full py-headerPaddingTopBottom px-headerPaddingX border-b-2 flex items-center justify-end">
      <div className="flex items-center space-x-8">
        <div
          onClick={() => setDown(!down)}
          className="flex z-30 items-center cursor-pointer bg-defaultBtnBg rounded-lg py-2.5 pl-2 pr-2 relative"
        >
          <img src={flagImg} alt="ru" width="28" height="20" />
          <span className="ml-2.5">{langName}</span>
          <img
            className={`${
              down ? "-rotate-180" : "-rotate-0"
            } duration-200 ml-2.5`}
            src={DropIcon}
            alt="Drop img"
            width="12"
            height="8"
          />
          <ul
            className={`bg-defaultBtnBg w-full z-10 absolute left-0 translate-y-bottom duration-300 rounded-lg ${
              down
                ? "translate-y-[77px] h-auto opacity-1"
                : "opacity-0 overflow-hidden h-0"
            } `}
          >
            <li
              onClick={chooseName}
              className="flex items-center pt-3 pl-3 pb-1.5"
            >
              <img
                onClick={chooseImg}
                className="mr-2.5"
                src={uzbFlag}
                alt="uzb"
                width="28"
                height="20"
              />
              Uz
            </li>
            <li
              onClick={chooseName}
              className="flex items-center pt-1.5 pl-3 pb-1.5"
            >
              <img
                onClick={chooseImg}
                className="mr-2.5"
                src={usaFlag}
                alt="usa"
                width="28"
                height="20"
              />
              Us
            </li>
            <li
              onClick={chooseName}
              className="flex  items-center pl-3 pt-1.5 pb-3"
            >
              <img
                onClick={chooseImg}
                className="mr-2.5"
                src={ruFlag}
                alt="ru"
                width="28"
                height="20"
              />
              Ру
            </li>
          </ul>
        </div>

        <div className="flex cursor-pointer items-center justify-center w-10 h-10 rounded-headerNotif bg-defaultBtnBg">
          <img
            src={Notification}
            alt="notification img"
            width="24"
            height="24"
          />
        </div>
        <div className="flex cursor-pointer items-center justify-center w-10 h-10 rounded-headerNotif bg-defaultBtnBg">
          <img
            // className="w-10 cursor-pointer object-cover h-10 rounded-headerNotif"
            src={
              avatar

              // ? avatar
              // : `https://intex-shop-production.up.railway.app/${aliw.image}`
            }
            alt="notification img"
            width="17"
            height="19"
          />
        </div>
      </div>
    </div>
  );
}
