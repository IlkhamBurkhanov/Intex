import axios from "axios";
import React, { useState } from "react";
import TableData from "../TableData/TableData";
// Images
import ThreeDotsSvg from "../../Assets/Images/ProductsImgs/threedots.svg";
import Trash from "../../Assets/Images/ProductsImgs/trash_1.svg";
import MFilter from "../../BaseComponents/MFilter/MFilter";
import { useSelector } from "react-redux";
const env = process.env.REACT_APP_ALL_API;

export default function TableCat({
  children,
  styles,
  data,
  isChecked,
  refresh,
  deleteAll,
  setDeleteAll,
}) {
  const [checker, setChecker] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const token = JSON.parse(window.localStorage.getItem("token"));

  const categoryResult = data?.ru;
  const languages = useSelector((state) => state.data.localization);
  const lang = useSelector((state) => state.data.lang);

  const handleCheck = (e) => {
    if (e.target.checked) {
      setChecker(true);
      e.target.checked = true;
      setDeleteAll([...deleteAll, data.id]);
    } else {
      setChecker(false);
      e.target.checked = false;
      deleteAll = deleteAll.filter((item) => item != data.id);
      setDeleteAll(deleteAll);
    }
  };

  // --- Delete Row
  const handlDelteUnik = (id) => {
    axios
      .delete(`${env}categories/deleteCategory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => refresh())
      .catch((err) => err);
  };

  // --- Close
  const close = (
    <svg
      className="flex items-center justify-center object-fill"
      width={20}
      height={20}
      viewPort="0 0 12 12"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="1" y1="15" x2="15" y2="1" stroke="black" strokeWidth="2" />
      <line x1="1" y1="1" x2="15" y2="15" stroke="black" strokeWidth="2" />
    </svg>
  );

  return (
    <>
      <tr className={`flex items-center border-b ${styles}`}>
        {children ? (
          children
        ) : (
          <>
            <TableData styles="w-11 pr-3 justify-center">
              <input
                className="inputs w-4 h-4"
                type="checkbox"
                checked={
                  checker === true && isChecked === false
                    ? true
                    : checker === false && isChecked === false
                    ? false
                    : checker === false && isChecked === true
                    ? true
                    : checker === true && isChecked === true
                    ? true
                    : true
                }
                onChange={(e) => handleCheck(e)}
              />
            </TableData>
            <TableData styles="w-[80px]">{data.id}</TableData>
            <TableData styles="w-[227px] truncate" image={false}>
              {lang === "ru"
                ? data.category_ru
                : lang === "uz"
                ? data.category_uz
                : lang === "en"
                ? data.category_en
                : ""}
            </TableData>
            <TableData styles="w-[250px]">{data.ru.length}</TableData>
            <TableData styles="min-w-[474px]">
              {categoryResult.map((item, index) => (
                <MFilter key={index} className="mx-1">
                  {item}
                </MFilter>
              ))}
            </TableData>
            <TableData styles="w-[95px] relative pl-0">
              <button
                className="mx-auto px-8 py-2"
                onClick={() => {
                  setIsClicked(!isClicked);
                }}
              >
                <img src={ThreeDotsSvg} alt="three dots icon" />
              </button>
              {isClicked ? (
                <ul className="bg-white w-[160px] absolute border rounded-lg shadow-lg space-y-2 z-40 -right-10">
                  <div className="relative">
                    <button
                      onClick={() => handlDelteUnik(data.id)}
                      type="button"
                      className="flex items-center relative px-2 py-[10px]"
                    >
                      <img
                        className="mr-2"
                        src={Trash}
                        alt="just a icon to edit"
                      />
                      <span className="block">
                        {languages[lang].main.delete}
                      </span>
                    </button>
                    <span
                      onClick={() => setIsClicked(false)}
                      className="ml-6 absolute top-[6px] cursor-pointer right-0 px-3 py-2"
                    >
                      {close}
                    </span>
                  </div>
                </ul>
              ) : null}
            </TableData>
          </>
        )}
      </tr>
    </>
  );
}
