import React from "react";
import THead from "../../components/THead/THead";
import TBody from "../../components/TBody/TBody";
import { Link } from "react-router-dom";
import AtributeProducts from "./AtributeTable";
import MButton from "../../BaseComponents/MButton/MButton";
// Styles
import "../../BaseComponents/MButton/MButton.css";
// Images
import HomeImg from "../../Assets/Images/HeaderImgs/HomeImg.svg";
import { useSelector, useDispatch } from "react-redux";
import { searchProduction } from "../../redux/siteDataReducer";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Trash from "../../Assets/Images/ProductsImgs/trash.svg";

const data = [
  {
    title: "ID",
    image: false,
    style: "w-[80px] justify-center",
  },
  {
    title: "Название товара",
    image: false,
    style: "w-[300px] ",
  },
  {
    title: "Вид формы",
    image: false,
    style: "w-[190px]",
  },
  {
    title: "Значение атрибута",
    image: false,
    style: "w-[480px]",
  },
];

export default function Home() {
  const search = useSelector((state) => state.data.search);
  const [atr, setAtr] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [deleteAll, setDeleteAll] = React.useState([]);
  const languages = useSelector((state) => state.data.localization);
  const lang = useSelector((state) => state.data.lang);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalpage] = useState(0);

  // ----------------------------------------

  useEffect(() => {
    axios
      .get(
        "https://intex-shop-production.up.railway.app/api/attributes?page=0&limit=10"
      )
      .then((res) => {
        setAtr(res?.data.result);
      })
      .catch((err) => console.error(err))
      .finally(() => {});
  }, []);
  console.log(atr);
  const vitalData = atr.map((item) => {
    return {
      mainId: item.id,
      data: [
        {
          title: item?.id,
          style: "w-[80px] flex justify-center",
        },
        {
          title: item?.attribute_en,
          style: "w-[300px] flex pl-3 items-center",
        },
        {
          title: item?.view,
          style: "w-[190px] flex pl-3 items-center",
        },
        {
          title: item.en[0] ? item.en : "-",
          style: "w-[480px] flex pl-3 items-center",
        },
      ],
    };
  });
  console.log(vitalData);
  return (
    <div>
      <div className="bg-white flex items-center w-full pt-1.5 pb-1.5 px-8">
        <Link className="flex items-center" to={"/"}>
          <img src={HomeImg} alt="Home Img" width="16" height="16" />
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link to="/atribut">
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">
            Атрибуты
          </h2>
        </Link>
      </div>
      <div className="pt-6 pb-8 px-homeContentPadding h-[100vh] ">
        <div className=" mb-4">
          <h2 className="text-navBarColor font-bold leading-8 text-2xl mb-4">
            Атрибуты
          </h2>
          <div className="bg-white py-3 px-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center">
              <MButton BType="filter bg-filterBg" type="button">
                Фильтр
              </MButton>
              <input
                id="homeSearch"
                className="py-3 ml-4 w-homeInpWidth outline-none pl-9 pr-3 rounded-xl bg-headerInpBg"
                type="text"
                placeholder="Поиск товара"
                autoComplete="off"
                value={search}
                onChange={(e) => {
                  // dispatch(searchProduction(e.target.value))
                }}
              />
            </div>
            <div className="flex items-center">
              <strong className="font-semibold text-base text-homeColor mr-2.5">
                Сортировка
              </strong>
              <div className="w-homeSortWidth cursor-pointer mr-6 flex items-center justify-between bg-headerInpBg p-3 rounded-xl">
                <span className="font-medium text-sm text-homeSortWrap">
                  По А-Я
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
              <Link to="/addAtribut" className="add bg-filterBg" type="button">
                Добавить
              </Link>
            </div>
          </div>
        </div>
        <div className=" w-full rounded-t-xl bg-white">
          <div className="flex py-3 px-4 items-center z-50">
            <input type="checkbox" className="mr-3 w-4 h-4 cursor-pointer" />
            <span className="text-[#b9b9b9] mr-3">0, Выбрано</span>
            <img className="cursor-pointer" src={Trash} alt="Trash icon" />
          </div>
          <table className="w-full">
            <THead data={data}></THead>
            <TBody vitalData={vitalData} urlRoute="attributes"></TBody>
          </table>
          <div className="flex border-t mt-2.5 p-3 justify-between items-center pr-5">
            <div className="flex">
              <select
                className="rounded-md bg-[#f2f2f2] outline-none w-12 px-1 mr-3"
                onChange={(evt) => setLimit(evt.target.value)}
              >
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
              <span className="m-0 mr-3 text-paginationColor text-sm">
                Элементы на каждой странице
              </span>
              <span className="text-sm text-paginationButtonColor">
                1-5 из {totalPage} предметов
              </span>
            </div>
            <div className="flex items-center">
              <input
                className="w-12 text-center outline-none text-sm text-paginationButtonColor rounded-md bg-[#f2f2f2]  "
                type="nubmer"
                value={page}
                onChange={(evt) => setPage(evt.target.value)}
                maxLength={1}
              />
              <span className="mr-3.5 text-sm text-paginationButtonColor">
                из {totalPage / limit} страниц
              </span>
              <span className="flex">
                <button
                  onClick={() => (page ? setPage(page - 1) : null)}
                  className="mr-4 text-paginationButtonColor"
                >
                  &#60;
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  className=" text-paginationButtonColor"
                >
                  &#62;
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
