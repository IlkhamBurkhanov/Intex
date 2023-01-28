import React from "react";
import { Link } from "react-router-dom";
import User from "./user.jpg";
import HomeImg from "../../Assets/Images/HeaderImgs/HomeImg.svg";

function UserDetails() {
  const user = [
    {
      title: "Номер телефона",
      text: "(90) 123 45 67",
    },
    {
      title: "Email",
      text: "Ubaydulla@abdullayev.gmail.com",
    },
    {
      title: "Дата рождение",
      text: "28.09.2002",
    },
    {
      title: "Дата регистрации",
      text: "28.09.2022",
    },
    {
      title: "Статус",
      text: "Актив",
    },
    {
      title: "Роль Ползователя",
      text: "Админ",
    },
  ];

  return (
    <>
      <div className="bg-white flex items-center w-full pt-1.5 pb-1.5 px-8">
        <Link className="flex items-center" to={"/"}>
          <img src={HomeImg} alt="Home Img" width="16" height="16" />
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link
          to="/userpage
      "
        >
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">Пользователи</h2>
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link
          to="/userDetails
      "
        >
          <h2 className="font-normal text-[#109EF4] text-xs ml-2.5">Абдулла Убайдуллаев</h2>
        </Link>
      </div>
      <div className="bg-white mx-[34px] mt-[30px] p-[30px] rounded-[10px] flex items-center">
        <div className="flex flex-col justify-center items-center pl-[30px]">
          <img className="w-[170px] h-[170px]" src={User} alt="" />
          <p className="font-medium text-[19.5px] leading-[26px] text-[#24283A] mt-5">
            Абдулла Убайдуллаев
          </p>
        </div>
        <div className="max-w-[760px] w-full ml-[50px]">
          <div className="w-full flex items-center justify-between mb-5">
            <p className="font-medium text-[19.5px] leading-[26px] text-[#24283A]">Информация</p>
            <button className="font-medium text-base text-[#109EF4]">Изменить</button>
          </div>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-[27px] p-5 border border-[#F2F2F2] rounded-[10px]">
            {user.length > 0 &&
              user.map((item, i) => (
                <li key={i}>
                  <h3 className="font-medium text-base text-[#24283A]">{item?.title}</h3>
                  <p className="font-normal p-4 text-base text-[#24283A]">{item?.text}</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
