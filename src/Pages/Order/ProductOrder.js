import React from "react";
import ThreeDotsSvg from "../../Assets/Images/ProductsImgs/threedots.svg";
import TableHeader from "../../components/TableHeader/TableHeader";
import Trash from "../../Assets/Images/ProductsImgs/trash.svg";
import TableRow2 from "../../components/TableRow/orderTable";
import axios from "axios";
import { useSelector } from "react-redux";
import THead from "../../components/THead/THead";
import TBody from "../../components/TBody/TBody";
import MButton from "../../BaseComponents/MButton/MButton";
import { useState } from "react";

export default function ProductOrder() {
  const [data, setData] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [checkedCount, setCheckedCount] = React.useState(0);
  const [limit, setLimit] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [sortBtn, setSortBtn] = useState(false);
  const [totalPage, setTotalpage] = React.useState(0);
  const [refresh, setRefresh] = React.useState(false);
  const [deleteAll, setDeleteAll] = React.useState([]);
  const [menuCatOpen, setMenuCatOpen] = useState(false);
  const env = process.env.REACT_APP_ALL_API;

  const token = JSON.parse(window.localStorage.getItem("token"));
  const languages = useSelector((state) => state.data.localization);
  const lang = useSelector((state) => state.data.lang);

  const search = useSelector((state) => state.data.search);

  function searchProduct(inputValue, data) {
    let regex = new RegExp(inputValue, "gi");
    const filterInput = data.filter((product) =>
      product[`name_${lang}`]?.match(regex)
    );

    return filterInput;
  }

  const handleChange = (evt) => {
    if (evt.target.checked) {
      setCheckedCount(checkedCount + 1);
    } else {
      setCheckedCount(checkedCount - 1);
    }
  };
  //intex-shop-production.up.railway.app/api/orders?page=0&limit=10

  https: React.useEffect(() => {
    axios
      .get(
        `https://intex-shop-production.up.railway.app/api/orders?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setData(res?.data.result);

        setTotalpage(res.data?.total_count.count);
      });
  }, [limit, page, token, refresh, sortBtn]);

  const IdArray = data.result?.map((res) => res.id);

  const DeleteAll = (e) => {
    axios
      .delete(
        `${env}orders/deleteAll`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            ids: isChecked ? IdArray : deleteAll,
          },
        }
      )
      .then((res) => {
        // (res, IdArray);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err, IdArray);
      });
  };
  // ("with id", deleteAll);

  // (deleteAll.length);
  const datas = [
    {
      title: languages[lang].main.numOrder,
      image: true,
      style: "w-[120px] justify-center",
    },
    {
      title: languages[lang].main.nameUser,
      image: true,
      style: "w-[132px] ",
    },
    {
      title: languages[lang].main.phone,
      image: false,
      style: "w-[162px]",
    },
    {
      title: languages[lang].main.address,
      image: false,
      style: "w-[200px]",
    },
    {
      title: languages[lang].main.product,
      image: true,
      style: "w-[110px]",
    },
    {
      title: languages[lang].main.ovarallPrice,
      image: true,
      style: "w-[132px]",
    },
    {
      title: languages[lang].main.timeOrder,
      image: false,
      style: "w-[114px]",
    },
    {
      title: languages[lang].main.status,
      image: false,
      style: "w-[118px]",
    },
  ];
  let sortData = sortBtn
    ? data.sort((a, b) => {
        const nameA = a.first_name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.first_name.toUpperCase(); // ignore upper and lowercase
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

  const vitalData = data.map((item) => {
    // console.log(item.created_at[0].slice(0, 10));
    return {
      mainId: item.ids,
      order_num: item.order_number,
      user_id: item?.user_id,
      data: [
        {
          title: item.order_number,
          style: "w-[120px] ",
          id: item.order_number,
          user_id: item?.user_id,
        },
        {
          title: item.first_name,
          style: "w-[132px]",
        },
        {
          title: item.phone,
          style: "w-[162px]",
        },
        {
          title: item.address,
          style: "w-[200px] underline underline-offset-4 text-blue-400",
        },
        {
          title: item.total_count,
          style: "w-[110px] pl-3",
        },
        {
          title: `${item.total_price} сум`,
          style: "w-[132px]",
        },
        {
          title: `${item.created_at[0].slice(0, 10)}`,
          style: "w-[114px]",
        },
        {
          title: item.name_ru ? item.name_ru : "нот статус",
          style: "w-[118px] flex justify-center",
          label: `label label_${item.name_en}`,
          statusStyle: "",
        },
      ],
    };
  });
  console.log(data);
  return (
    <>
      <div className="mb-4">
        <h2 className="text-navBarColor font-bold leading-8 text-2xl mb-4">
          {languages[lang].sitebar.order}
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
              placeholder={languages[lang].main.searchOrder}
              autoComplete="off"
              value={search}
              onChange={(e) => {
                // dispatch(searchProduction(e.target.value));
              }}
            />
          </div>
          <div className="flex items-center">
            <strong className="font-semibold text-base text-homeColor mr-2.5">
              {languages[lang].main.sort}
            </strong>
            <div
              // onClick={() => setSortBtn(!sortBtn)}
              onClick={() => setMenuCatOpen(!menuCatOpen)}
              className="w-homeSortWidth relative cursor-pointer mr-6 flex items-center justify-between  bg-headerInpBg p-3 rounded-xl"
            >
              <span className="font-medium text-sm  text-homeSortWrap">
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
              <ul
                className={` ${
                  menuCatOpen
                    ? "h-auto border-b-2  duration-200"
                    : "h-0  duration-200 overflow-hidden"
                }  w-[150px]  absolute rounded-lg  mt-[90px]  bg-headerInpBg `}
              >
                <li>
                  <span
                    className="font-normal  text-homeSortWrap text-sm py-2 pl-3 inline-block duration-150 text-black-black_thin cursor-pointer"
                    onClick={() => {
                      setMenuCatOpen(false);
                      // setClickMenu(false);
                      setSortBtn(!sortBtn);
                    }}
                  >
                    {sortBtn ? "By Default" : `${languages[lang].main.as}`}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border-b rounded-xl mb-[100px] ">
        <div className="flex py-3 px-4 items-center">
          <input
            className="mr-3 w-4 h-4 cursor-pointer"
            type="checkbox"
            onChange={() => setIsChecked(!isChecked)}
          />
          <span className="text-[#b9b9b9] mr-3">
            {isChecked ? data.length : 0}, {languages[lang].main.select}
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
        <div className="table-scroll overflow-x-scroll pb-2.5 bg-white">
          <table className="w-full pt-12">
            <THead data={datas} />
            <TBody
              vitalData={vitalData}
              linkUp="/order/update"
              isChecked={isChecked}
            />
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
    </>
  );
}
