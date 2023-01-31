import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MButton from "../../BaseComponents/MButton/MButton";
// Images
import HomeImg from "../../Assets/Images/HeaderImgs/HomeImg.svg";
import THead from "../../components/THead/THead";
import TBody from "../../components/TBody/TBody";
import Trash from "../../Assets/Images/ProductsImgs/trash.svg";
import { useSelector } from "react-redux";

const env = process.env.REACT_APP_ALL_API;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [totalPage, setTotalpage] = useState(0);
  const [sortBtn, setSortBtn] = useState(false);
  const languages = useSelector((state) => state.data.localization);
  const lang = useSelector((state) => state.data.lang);
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
  let sortData = sortBtn
    ? products.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      })
    : null;
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
  const data = [
    {
      title: languages[lang].main.id ? languages[lang].main.id : "ID",
      image: true,
      style: "w-20",
    },
    {
      title: languages[lang].main.nameUser,
      image: true,
      style: "w-[393px]",
    },

    {
      title: languages[lang].main.phone,
      image: true,
      style: "w-[249px]",
    },
    {
      title: languages[lang].main.birthday,
      image: false,
      style: "w-[258px]",
    },
  ];

  return (
    <>
      <div className="bg-white flex items-center w-full pt-1.5 pb-1.5 px-8">
        <Link className="flex items-center" to={"/"}>
          <img src={HomeImg} alt="Home Img" width="16" height="16" />
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link to="/callBack">
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">
            {languages[lang].sitebar.recall}
          </h2>
        </Link>
      </div>
      <div className="pt-6 pb-8 px-homeContentPadding overflow-y-scroll h-[100vh]">
        <div>
          <h2 className="text-navBarColor font-bold leading-8 text-2xl mb-4">
            {languages[lang].sitebar.recall}
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
              />
            </div>
            <div className="flex items-center">
              <strong className="font-semibold text-base text-homeColor mr-2.5">
                {languages[lang].main.sort}
              </strong>
              <div
                onClick={() => setSortBtn(!sortBtn)}
                className="w-homeSortWidth cursor-pointer mr-6 flex items-center justify-between bg-headerInpBg p-3 rounded-xl"
              >
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
            </div>
          </div>
        </div>

        <div className="bg-[white] mt-4 rounded-xl mb-[100px]">
          <div className="flex py-3 px-3 items-center z-50">
            <input
              className="mr-3 w-4 h-4 cursor-pointer"
              type="checkbox"
              onChange={() => setIsChecked(!isChecked)}
            />
            <span className="text-[#b9b9b9] mr-3">
              {isChecked ? products.length : 0}, {languages[lang].main.select}
            </span>
            <svg
              // onClick={isChecked ? DeleteAll : null}
              className="cursor-pointer"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5584 4.35842C16.2167 4.22508 14.875 4.12508 13.525 4.05008V4.04175L13.3417 2.95841C13.2167 2.19175 13.0334 1.04175 11.0834 1.04175H8.90005C6.95838 1.04175 6.77505 2.14175 6.64172 2.95008L6.46672 4.01675C5.69172 4.06675 4.91672 4.11675 4.14172 4.19175L2.44172 4.35842C2.09172 4.39175 1.84172 4.70008 1.87505 5.04175C1.90838 5.38342 2.20838 5.63342 2.55838 5.60008L4.25838 5.43342C8.62505 5.00008 13.0251 5.16675 17.4417 5.60842C17.4667 5.60842 17.4834 5.60842 17.5084 5.60842C17.8251 5.60842 18.1 5.36675 18.1334 5.04175C18.1584 4.70008 17.9084 4.39175 17.5584 4.35842Z"
                fill={`${isChecked ? "#ED2939" : "#CDCDCD"}`}
              />
              <path
                d="M16.025 6.78325C15.825 6.57492 15.55 6.45825 15.2666 6.45825H4.73329C4.44995 6.45825 4.16662 6.57492 3.97495 6.78325C3.78329 6.99159 3.67495 7.27492 3.69162 7.56659L4.20829 16.1166C4.29995 17.3833 4.41662 18.9666 7.32495 18.9666H12.675C15.5833 18.9666 15.7 17.3916 15.7916 16.1166L16.3083 7.57492C16.325 7.27492 16.2166 6.99159 16.025 6.78325ZM11.3833 14.7916H8.60829C8.26662 14.7916 7.98329 14.5083 7.98329 14.1666C7.98329 13.8249 8.26662 13.5416 8.60829 13.5416H11.3833C11.725 13.5416 12.0083 13.8249 12.0083 14.1666C12.0083 14.5083 11.725 14.7916 11.3833 14.7916ZM12.0833 11.4583H7.91662C7.57495 11.4583 7.29162 11.1749 7.29162 10.8333C7.29162 10.4916 7.57495 10.2083 7.91662 10.2083H12.0833C12.425 10.2083 12.7083 10.4916 12.7083 10.8333C12.7083 11.1749 12.425 11.4583 12.0833 11.4583Z"
                fill={`${isChecked ? "#ED2939" : "#CDCDCD"}`}
              />
            </svg>
          </div>

          <div className="table-scroll overflow-x-scroll">
            <table className="w-full">
              <THead data={data}></THead>
              <TBody
                vitalData={vitalData}
                urlRoute="consultations"
                isChecked={isChecked}
              ></TBody>
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
                {languages[lang].main.elementsPage}
              </span>
              <span className="text-sm text-paginationButtonColor">
                1-5 из {languages[lang].main.itemsNumb} {totalPage}
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
                из {Math.floor(totalPage / limit)} {languages[lang].main.pages}
              </span>
              <span className="flex">
                <button
                  className="mr-4 text-paginationButtonColor"
                  onClick={() => {
                    page === 0 ? setPage(0) : setPage(page - 1);
                  }}
                >
                  &#60;
                </button>
                <button
                  className=" text-paginationButtonColor"
                  onClick={() => {
                    page === Math.floor(totalPage / limit)
                      ? setPage(Math.floor(totalPage / limit))
                      : setPage(page + 1);
                  }}
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
