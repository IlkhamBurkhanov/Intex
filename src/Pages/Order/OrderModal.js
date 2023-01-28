import axios from "axios";
import CloseSvg from "../../Assets/Images/NavbarImgs/close.svg";
import uzbFlag from "../../Assets/Images/HeaderImgs/uzb-flag.svg";
import addressLogo from "../../Assets/Images/NavbarImgs/addresLogo.svg";
import { useState } from "react";
import Calendar from "../../Assets/Images/NavbarImgs/date.svg";

const env = process.env.REACT_APP_ALL_API;

function OrderModal({ isShown, onClosed, items, refreshed }) {
  // eslint-disable-next-line no-unused-vars
  const [updateOrder, setUpdateOrder] = useState({});
  const [status, setStatus] = useState("1");

  if (!isShown) return null;
  const token = JSON.parse(window.localStorage.getItem("token"));

  const handleUpdate = (e) => {
    axios
      .patch(
        `${env}orders/update`,
        {
          id: items.id,
          order: {
            name: updateOrder.name ? updateOrder.name : items.name,
            phone: updateOrder.phone ? updateOrder.phone : items.phone,
            address: updateOrder.address ? updateOrder.address : items.address,
            location: {
              x: 49.9,
              y: 62.2,
            },
            order_number: updateOrder.order_number
              ? updateOrder.order_number
              : items.order_number,
            status_id: +status,
          },
          bascet: [
            {
              count: updateOrder.count ? updateOrder.count : items.count,
              product_id: 0,
              order_id: 0,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        ("Submitted");
        refreshed();
      })
      .catch(() => {
        ("Internal error");
      });
    e.preventDefault();
    onClosed();
  };

  const handleClose = (e) => {
    e.preventDefault();
    onClosed();
  };

  const handleClick = (e) => {
    if (e.target.id === "wrapper") onClosed();
  };
  function changeStatus(event) {
    setStatus(event.target.value);
  }

  return (
    <tr
      onClick={handleClick}
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center overflow-y-scroll h-[100vh] z-50 "
    >
      <td className=" bg-white rounded-xl w-orderModal max-h-[700px] z-50">
        <form className=" flex flex-col">
          <div className="flex flex-row pt-7 pb-6 px-6 items-center justify-between">
            <h1 className="font-bold text-2xl	text-addProductColor">Изменить</h1>
            <img onClick={handleClose} src={CloseSvg} alt="x" />
          </div>

          <div className=" flex flex-wrap  px-6 justify-between">
            <div className="relative">
              <p className="text-base font-medium h-4 mb-3">Номер заказа</p>
              <input
                value={items.order_number}
                onChange={(e) =>
                  setUpdateOrder({
                    ...updateOrder,
                    order_number: e.target.value,
                  })
                }
                type="number"
                name="orders"
                id="orders"
                className="bg-white w-submitBtnsWidth outline-0 h-12 rounded-lg border border-solid  border-borderColor text-addProductColor p-4"
                minLength="3"
                maxLength="25"
              />
            </div>
            <div className="relative">
              <p className="text-base font-medium h-4 mb-3">Имя</p>
              <input
                defaultValue={items.name}
                onChange={(e) =>
                  setUpdateOrder({
                    ...updateOrder,
                    name: e.target.value,
                  })
                }
                type="text"
                name="name"
                id="name"
                className="bg-white w-submitBtnsWidth outline-0 h-12  rounded-lg border border-solid  border-borderColor text-addProductColor  p-4"
                minLength="3"
                maxLength="25"
              />
            </div>
            <div className="relative">
              <p className="text-base font-medium h-4 mb-3 mt-8">
                Номер телефона
              </p>
              <div className="bg-white w-submitBtnsWidth flex items-center h-12  rounded-lg border border-solid  border-borderColor text-addProductColor  p-4">
                <img
                  src={uzbFlag}
                  className="w-6 h-4"
                  width={22}
                  height={15}
                  alt="site_logo"
                />
                <span className="text-base inline text-black ml-1">+998</span>
                <input
                  defaultValue={items.phone}
                  onChange={(e) =>
                    setUpdateOrder({
                      ...updateOrder,
                      phone: e.target.value,
                    })
                  }
                  type="number"
                  name="number"
                  id="number"
                  placeholder="(90) 123 45 67"
                  className=" outline-none w-full sm:ml-4 h-full p-2 "
                />
              </div>
            </div>
            <div className="relative">
              <p className="text-base font-medium h-4 mb-3 mt-8">Адрес</p>
              <div className="bg-white w-submitBtnsWidth flex items-center justify-between h-12  rounded-lg border border-solid  border-borderColor text-addProductColor  p-4">
                <input
                  defaultValue={items.address}
                  onChange={(e) =>
                    setUpdateOrder({
                      ...updateOrder,
                      address: e.target.value,
                    })
                  }
                  type="text"
                  name="address"
                  id="address"
                  className="outline-0"
                  minLength="3"
                  maxLength="25"
                />

                <img
                  src={addressLogo}
                  className="w-4 h-5"
                  width={16}
                  height={18}
                  alt="site_logo"
                />
              </div>
            </div>
            <div className="relative">
              <p className="text-base font-medium h-4 mb-3 mt-8">
                Кол-во продуктов
              </p>
              <input
                defaultValue={items.count}
                onChange={(e) =>
                  setUpdateOrder({
                    ...updateOrder,
                    count: e.target.value,
                  })
                }
                type="text"
                name="numberproduct"
                id="numberproduct"
                className="bg-white w-submitBtnsWidth outline-0 h-12  rounded-lg border border-solid  border-borderColor text-addProductColor  p-4"
                minLength="1"
                maxLength="10"
              />
            </div>
            <div className="relative">
              <p className="text-base font-medium h-4 mb-3 mt-8">Обшая цена</p>
              <div className="bg-white w-submitBtnsWidth flex items-center justify-between h-12  rounded-lg border border-solid  border-borderColor text-addProductColor  p-4">
                <p className="outline-0">{items.summa}</p>
                <p className="text-base font-normal">Сум</p>
              </div>
            </div>
            <div className="relative">
              <p className="text-base font-medium h-4 text-addProductColor mb-3 mt-8">
                Цена со скидкой
              </p>
              <div className="bg-white w-submitBtnsWidth flex items-center justify-between h-12 rounded-lg border border-solid  border-borderColor text-addProductColor  p-4">
                <p className="outline-0">{items.discount_summa}</p>
                <p className="text-base font-normal">Сум</p>
              </div>
            </div>
            <div className="relative">
              <p className="text-base font-medium h-4 mb-3 mt-8">Cтатус</p>
              <select
                value={status}
                type="change"
                onChange={changeStatus}
                id="status"
                className="bg-white w-submitBtnsWidth outline-0 items-center  h-12  rounded-lg border border-solid  border-borderColor text-addProductColor px-4"
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
            <div className="relative">
              <p className="text-base font-medium h-4 mb-3 mt-8">
                Время заказа
              </p>
              <div className="flex flex-row justify-between items-center bg-white w-submitBtnsWidth  h-12 outline-0 rounded-lg border border-solid  border-borderColor text-addProductColor  p-4">
                <p className="">
                  {items.created_at.slice(0, 10)}{" "}
                  <span className="pl-2">{items.created_at.slice(11, 16)}</span>
                </p>
                <img src={Calendar} alt="logo" className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="flex flex-row px-6 pt-8 pb-7 justify-between">
            <button
              onClick={handleClose}
              className="py-3 px-[121px] text-[#2B3D91] font-medium border border-solid bg-languageBg rounded-lg "
            >
              Отменить
            </button>
            <button
              onClick={handleUpdate}
              className="py-3 px-[121px] text-white font-medium border border-solid bg-loginBtn rounded-lg "
            >
              Сохранить
            </button>
          </div>
        </form>
      </td>
    </tr>
  );
}

export default OrderModal;
