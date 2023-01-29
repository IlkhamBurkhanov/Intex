import React from "react";
import EditModal from "../EditionModal/Modal";
import MFilter from "../../BaseComponents/MFilter/MFilter";
import axios from "axios";
import { useState } from "react";
import { changeUserID, changeOrderNum } from "../../redux/siteDataReducer";

// ------> Css
import "./TBody.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const env = process.env.REACT_APP_ALL_API;

export default function TBody({ vitalData, urlRoute, linkUp, isChecked }) {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(0);
  const [orderNum, setOrderNum] = useState("");
  console.log(vitalData);
  const dispatch = useDispatch();
  useEffect(() => {
    setData(vitalData);
  }, [vitalData]);
  const handleSaved = () => {
    setUserId(vitalData.user_id);
    setOrderNum(vitalData.order_num);
  };
  const token = JSON.parse(window.localStorage.getItem("token"));
  const handleDelete = (e, id) => {
    if (e.target.matches(".deleteBtn")) {
      axios.delete(`${env}${urlRoute}/${id.mainId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData([...data.filter((item) => item.mainId !== id.mainId)]);
    }
    dispatch(changeUserID(id?.user_id));
    dispatch(changeOrderNum(id?.order_num));
  };

  const handleScroll = () => {
    console.log("scrolling");
  };
  console.log(data);
  return (
    <tbody className="bg-white" onScroll={handleScroll}>
      <tr className="h-2.5 bg-[#E5E5E5]"></tr>
      {data.length > 0 &&
        data.map((el, i) => {
          return (
            <tr
              key={i}
              className="flex items-center border-t last:border-b"
              onClick={(e) => handleDelete(e, el)}
            >
              <td className="w-11 flex justify-center">
                <input
                  className="w-[18px] h-[18px] cursor-pointer"
                  type="checkbox"
                  name={`input${i}`}
                  checked={isChecked}
                />
              </td>
              {el.data.map((a, i) => {
                return (
                  <td
                    key={i}
                    className={`flex items-center py-3 pl-3 cursor-pointer ${a.style}`}
                  >
                    {a.image ? (
                      <img
                        className="w-6 h-6 rounded-full mr-[6px]"
                        src={`https://intex-shop-production.up.railway.app/${a.image}`}
                        alt="basseyn"
                      />
                    ) : null}

                    {typeof a.title === "object" && a.title != null ? (
                      a?.title?.map((el, i) =>
                        el.length ? (
                          <MFilter key={i}>{el}</MFilter>
                        ) : (
                          <span key={i}></span>
                        )
                      )
                    ) : (
                      <span
                        className={`${a.textClass} ${
                          a?.label ? a?.label : "text-[#24283A] text-sm"
                        } truncate text-sm`}
                      >
                        {a?.title}
                      </span>
                    )}
                  </td>
                );
              })}
              <EditModal
                modalId={i}
                linkUp={linkUp}
                handleSaved={handleSaved}
              ></EditModal>
            </tr>
          );
        })}
    </tbody>
  );
}
