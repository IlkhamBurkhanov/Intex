import React from "react";
import { Link } from "react-router-dom";
import HomeImg from "../../Assets/Images/HeaderImgs/HomeImg.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
// import axios from "axios";
// import CloseSvg from "../../Assets/Images/NavbarImgs/close.svg";
// import uzbFlag from "../../Assets/Images/HeaderImgs/uzb-flag.svg";
// import addressLogo from "../../Assets/Images/NavbarImgs/addresLogo.svg";
// import { useState } from "react";
// import Calendar from "../../Assets/Images/NavbarImgs/date.svg";
export const UpdateOrder = () => {
  const orderNumber = useSelector((state) => state.data.orderNum);
  const userId = useSelector((state) => state.data.userId);
  const token = JSON.parse(window.localStorage.getItem("token"));
  const [data, setData] = useState([]);
  const [updateOrder, setUpdateOrder] = useState({});
  const [status, setStatus] = useState(data[0]?.order_status_ru);
  // const UserID = JSON.parse(window.localStorage.getItem("UserId"));
  // const OrderNum = JSON.parse(window.localStorage.getItem("OrderNumber"));
  console.log(orderNumber);
  console.log(userId);

  //intex-shop-production.up.railway.app/api/orders/50?order_number=%23100053
  React.useEffect(() => {
    axios
      .get(
        `  https://intex-shop-production.up.railway.app/api/orders/${userId}?order_number=%23${orderNumber.slice(
          1
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setData(res?.data);

        // setTotalpage(res.data?.total_count.count);
      })
      .catch((err) => console.log(err));
  }, [token]);

  // https://intex-shop-production.up.railway.app/api/orders

  const handleUpdate = (e) => {
    axios
      .patch(
        "https://intex-shop-production.up.railway.app/api/orders",
        {
          count: 0,
          product_id: 0,
          order_number: "string",
          user_id: 0,
          product_sub_attr_id: [0],
          status_id: 0,
          payment_type: "cash",
          comment: "string",
          country: "string",
          region: "string",
          address: "string",
          floor: "string",
          price: 0,
          delivery_type: "free",
          id: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        console.log("Submitted");
        // refreshed();
      })
      .catch(() => {
        console.log("Internal error");
      });
    e.preventDefault();
    // onClosed();
  };
  // console.log(status);
  // console.log(updateOrder);
  function changeStatus(event) {
    setStatus(event.target.value);
  }
  return (
    <div>
      <div className="bg-white flex items-center w-full pt-1.5 pb-1.5 px-8">
        <Link className="flex items-center" to={"/"}>
          <img src={HomeImg} alt="Home Img" width="16" height="16" />
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link to="/order">
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">
            {orderNumber}
          </h2>
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link to="/order">
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">
            Заказы
          </h2>
        </Link>
      </div>
      <div className="pt-6 pb-8 px-homeContentPadding overflow-scroll h-[100vh] ">
        <div className="mb-4">
          <h2 className="text-navBarColor font-bold leading-8 text-2xl mb-4">
            Заказы
          </h2>
        </div>

        <div className="  bg-white rounded-xl mb-[120px]">
          <div className="flex flex-wrap p-[30px] ">
            <div className="w-[220px]">
              <div className="relative">
                <p className="text-base font-[550] text-[#24283A] h-3 mb-4">
                  Имя
                </p>
                <input
                  value={data[0]?.first_name}
                  type="string"
                  name="orders"
                  id="orders"
                  className="bg-white w-full outline-0 py-2 rounded-lg border border-solid  border-[#E3E5E5] text-addProductColor p-4"
                  minLength="3"
                  maxLength="25"
                />
              </div>
            </div>
            <div className="w-[220px] ml-5">
              <div className="relative">
                <p className="text-base font-[550] text-[#24283A] h-3 mb-4">
                  Номер телефона
                </p>
                <input
                  value={data[0]?.phone}
                  type="string"
                  name="orders"
                  id="orders"
                  className="bg-white w-full outline-0 py-2 rounded-lg border border-solid  border-borderColor text-addProductColor p-4"
                  minLength="3"
                  maxLength="25"
                />
              </div>
            </div>
            <div className="w-[500px] ml-5">
              <div className="relative">
                <p className="text-base font-[550] text-[#24283A] h-3 mb-4">
                  Адрес
                </p>
                <input
                  defaultValue={data[0]?.address}
                  onChange={(e) =>
                    setUpdateOrder({
                      ...updateOrder,
                      order_address: e.target.value,
                    })
                  }
                  type="string"
                  name="orders"
                  id="orders"
                  className="bg-white w-full outline-0 py-2 rounded-lg border border-solid  border-borderColor text-addProductColor p-4"
                  minLength="3"
                />
              </div>
            </div>

            <div className="w-[840px] mt-[30px]">
              <div className="relative">
                <p className="text-base font-[550] text-[#24283A] h-3 mb-3">
                  Товары
                </p>
              </div>
            </div>
            <div className="w-[120px] ml-5 mt-[30px]">
              <div className="relative">
                <p className="text-base font-[550] text-[#24283A] h-3 mb-3">
                  Кол-во
                </p>
              </div>
            </div>
            {data?.map((item, i) => {
              return (
                <>
                  <div className="w-[840px] my-[12px]">
                    <div className="relative">
                      <input
                        defaultValue={item?.product_name_ru}
                        // onChange={(e) =>
                        //   setUpdateOrder({
                        //     ...updateOrder,
                        //     order_product: e.target.value,
                        //   })
                        // }
                        type="string"
                        name="orders"
                        id="orders"
                        className="bg-white w-full outline-0 py-2 rounded-lg border border-solid  border-borderColor text-addProductColor p-4"
                        minLength="3"
                      />
                    </div>
                  </div>
                  <div className="w-[120px] ml-5 my-3">
                    <div className="relative">
                      <input
                        defaultValue={item?.count}
                        onChange={(e) =>
                          setUpdateOrder({
                            ...updateOrder,
                            order_count: e.target.value,
                          })
                        }
                        type="number"
                        name="orders"
                        id="orders"
                        className="bg-white w-full outline-0 py-2 rounded-lg border border-solid  border-borderColor text-addProductColor p-4"
                        minLength="3"
                        maxLength="25"
                      />
                    </div>
                  </div>
                </>
              );
            })}

            <div className="w-full text-blue-500 font-[550] text-[#24283A] mt-4">
              <span className="font-bold">+ </span>Добавить товары
            </div>
            <div className="w-[295px] mt-[30px]">
              <div className="relative">
                <p className="text-base font-[550] text-[#24283A] h-4 mb-3">
                  Статус
                </p>
                {/* <input
                  defaultValue={data[0]?.order_status_ru}
                  onChange={(e) =>
                    setUpdateOrder({
                      ...updateOrder,
                      order_status: e.target.value,
                    })
                  }
                  type="string"
                  name="orders"
                  id="orders"
                  className="bg-white w-full outline-0 py-2 rounded-lg border border-solid  border-borderColor text-addProductColor p-4"
                  minLength="3"
                  maxLength="25"
                /> */}
                <select
                  value={status}
                  type="change"
                  onChange={changeStatus}
                  id="status"
                  className="bg-white w-full outline-0 py-2 rounded-lg border border-solid  border-borderColor text-addProductColor p-4"
                >
                  <option className="text-black text-lg" value="1">
                    Оплачен
                  </option>
                  <option className=" text-black text-lg" value="2">
                    Отменен
                  </option>
                  <option className="text-black text-lg" value="3">
                    В ожидании
                  </option>
                  <option className="text-black text-lg" value="4">
                    В проссесе
                  </option>
                </select>
              </div>
            </div>
            <div className="w-[295px] ml-5 mt-[30px]">
              <div className="relative">
                <p className="text-base font-[550] text-[#24283A] h-4 mb-3">
                  Время заказа
                </p>
                <input
                  value={data[0]?.created_at.slice(0, 10)}
                  type="string"
                  name="orders"
                  id="orders"
                  className="bg-white w-full outline-0 py-2 rounded-lg border border-solid  border-borderColor text-addProductColor p-4"
                  minLength="3"
                  maxLength="25"
                />
              </div>
            </div>
            <div className="w-[350px] ml-5 mt-[30px]">
              <div className="relative">
                <p className="text-base font-[550] text-[#24283A] h-4 mb-3">
                  Обшая цена{" "}
                </p>
                <input
                  value={data[0]?.total_price}
                  type="string"
                  name="orders"
                  id="orders"
                  className="bg-white w-full outline-0 py-2 rounded-lg border border-solid  border-borderColor text-addProductColor p-4"
                  minLength="3"
                  maxLength="25"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-end px-[30px] pb-[30px] gap-5">
            <Link to="/order">
              <button
                onClick={() => console.log("Cancel")}
                className="w-[200px] rounded-xl p-3 bg-[#F2F2F2]"
              >
                Отменить
              </button>
            </Link>
            <Link to="/order">
              <button
                onClick={() => console.log("Saved")}
                className="w-[200px] rounded-xl p-3 bg-[#2B3D90] text-white"
              >
                Сохранить
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
