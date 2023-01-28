import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MButton from "../../BaseComponents/MButton/MButton";
// Images
import HomeImg from "../../Assets/Images/HeaderImgs/HomeImg.svg";
import THead from "../../components/THead/THead";
import TBody from "../../components/TBody/TBody";
import Trash from "../../Assets/Images/ProductsImgs/trash.svg";

const env = process.env.REACT_APP_ALL_API;

const data = [
  {
    title: "ID",
    image: true,
    style: "w-20",
  },
  {
    title: "Имя",
    image: true,
    style: "w-[393px]",
  },

  {
    title: "Номер телефона",
    image: true,
    style: "w-[249px]",
  },
  {
    title: "Дата рождение",
    image: false,
    style: "w-[258px]",
  },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalpage] = useState(0);
  // const [loader, setLoader] = useState([]);

  const token = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {
    // setLoader(true);
    axios
      .get(
        "https://intex-shop-production.up.railway.app/api/consultations?page=0&limit=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setProducts(res?.data.result);
      })
      .finally(() => {
        // setLoader(false);
      });
  }, [token]);
  console.log(products);
  // ------> Table Row Information
  const vitalData = products.map((item) => {
    return {
      mainId: item.id,
      data: [
        {
          title: item.id,
          style: "w-20",
        },
        {
          title: item.name,

          style: "w-[393px] flex pl-3",
        },
        {
          title: item.phone,
          style: "w-[249px] pl-3",
        },
        {
          title: item.created_at.slice(0, 10),
          style: "w-[258px] pl-3",
        },
      ],
    };
  });

  return (
    <>
      <div className="bg-white flex items-center w-full pt-1.5 pb-1.5 px-8">
        <Link className="flex items-center" to={"/"}>
          <img src={HomeImg} alt="Home Img" width="16" height="16" />
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link to="/callBack">
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">
            Обратный связ
          </h2>
        </Link>
      </div>
      <div className="pt-6 pb-8 px-homeContentPadding overflow-y-scroll h-[100vh]">
        <div>
          <h2 className="text-navBarColor font-bold leading-8 text-2xl mb-4">
            Обратный связ
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
            </div>
          </div>
        </div>

        <div className="bg-[white] mt-4 rounded-xl mb-[100px]">
          <div className="flex py-3 px-3 items-center z-50">
            <input
              className="mr-3 w-[18px] h-[18px] cursor-pointer"
              type="checkbox"
            />
            <span className="text-[#b9b9b9] mr-3">0, Выбрано</span>
            <img className="cursor-pointer" src={Trash} alt="Trash icon" />
          </div>

          <div className="table-scroll overflow-x-scroll">
            <table className="w-full">
              <THead data={data}></THead>
              <TBody vitalData={vitalData} urlRoute="consultations"></TBody>
            </table>
          </div>
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
    </>
  );
}
