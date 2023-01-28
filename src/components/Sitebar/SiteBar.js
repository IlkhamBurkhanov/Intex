import { useState } from "react";
import Logo from "../../Assets/Images/NavbarImgs/Site-logo.svg";
import { NavLink, Link } from "react-router-dom";
import DropIcon from "../../Assets/Images/HomeContentImg/Drop.svg";
import { Modal } from "../../components/Modal/Modal";
import { UserImg } from "../../Assets/Images/NavbarImgs/NavBarIcons";
import {
  ProductIcon,
  CallIcon,
  OrderICon,
  ExitICon,
  SettingsIcon,
} from "../../Assets/Images/NavbarImgs/NavBarIcons";
import { useSelector } from "react-redux";
export default function SiteBar() {
  const [innnerActice, setInnnerActice] = useState(false);
  const [categoryActive, setCategoryActive] = useState(false);
  const [atributActive, setAtributActive] = useState(false);
  const [navBarDrop, setNavBarDrop] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const languages = useSelector((state) => state.data.localization);
  const lang = useSelector((state) => state.data.lang);

  function handActive() {
    setInnnerActice(true);
    setCategoryActive(false);
    setAtributActive(false);
  }
  function handCategory() {
    setCategoryActive(true);
    setInnnerActice(false);
    setAtributActive(false);
  }
  function handAtribut() {
    setAtributActive(true);
    setCategoryActive(false);
    setInnnerActice(false);
  }

  function delteInnerlink() {
    setAtributActive(false);
    setCategoryActive(false);
    setInnnerActice(false);
    setNavBarDrop(false);
  }
  function openDropDown() {
    setNavBarDrop(!navBarDrop);
  }

  const Logout = () => {
    setShowModal(true);
    setAtributActive(false);
    setCategoryActive(false);
    setInnnerActice(false);
    setNavBarDrop(false);
  };

  const LogoutBtn = () => {
    setShowModal(false);
    window.localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="bg-white w-sitebarWidth h-[100vh] overflow-y-auto bottom-0 relative flex-shrink-0">
      <div className="pb-9  px-5">
        <div className="py-8 border-b-2">
          <Link to={"/"}>
            <img src={Logo} alt="Site Logo" width={180} height={17} />
          </Link>
        </div>
      </div>
      <div className="">
        <NavLink
          onClick={() => {
            delteInnerlink();
            openDropDown();
            setInnnerActice(true);
          }}
          className={`py-4 opacity-80 flex relative items-center px-6 text-sm leading-lead font-medium text-navBarColor`}
          to={"/"}
        >
          <ProductIcon />
          <span className="ml-navBarIcon">
            {languages[lang].header.products}
          </span>
          <img
            className={`absolute right-6 duration-200 -rotate-90 ${
              navBarDrop ? "rotate-0" : ""
            }`}
            src={DropIcon}
            alt="Drop IMg"
            width={10}
            height={9}
          />
        </NavLink>
        <ul
          className={` duration-500 ${
            navBarDrop
              ? "h-auto overflow-auto opacity-100"
              : "h-0 overflow-hidden opacity-0"
          }`}
        >
          <li>
            <Link
              onClick={handActive}
              className={`${
                innnerActice ? "anterActive" : ""
              } py-2.5 opacity-80 pl-14 block font-normal text-navBarColor text-sm`}
              to={"/"}
            >
              {languages[lang].sitebar.productList}
            </Link>
          </li>
          <li>
            <Link
              onClick={handCategory}
              className={`${
                categoryActive ? "anterActive" : ""
              } py-2.5 opacity-80 pl-14 block font-normal text-navBarColor text-sm`}
              to={"/category"}
            >
              {languages[lang].sitebar.category}
            </Link>
          </li>
          <li>
            <Link
              onClick={handAtribut}
              className={`${
                atributActive ? "anterActive" : ""
              } py-2.5 opacity-80 pl-14 block font-normal text-navBarColor text-sm  `}
              to={"/atribut"}
            >
              {languages[lang].sitebar.atribut}
            </Link>
          </li>
        </ul>
        <NavLink
          onClick={delteInnerlink}
          className="py-4 opacity-80 flex items-center px-6 text-sm leading-lead font-medium text-navBarColor"
          to={"/order"}
        >
          <OrderICon />
          <span className="ml-navBarIcon">{languages[lang].sitebar.order}</span>
        </NavLink>
        <NavLink
          onClick={delteInnerlink}
          className="py-4 opacity-80 flex items-center px-6 text-sm leading-lead font-medium text-navBarColor"
          to={"/callBack"}
        >
          <CallIcon />
          <span className="ml-navBarIcon">
            {languages[lang].sitebar.recall}
          </span>
        </NavLink>
        <NavLink
          onClick={delteInnerlink}
          className="py-4 opacity-80 flex items-center px-6 text-sm leading-lead font-medium text-navBarColor"
          to={"/userpage"}
        >
          <UserImg />
          <span className="ml-navBarIcon">Пользователи</span>
        </NavLink>
        <NavLink
          onClick={delteInnerlink}
          className="py-4 opacity-80 flex items-center px-6 text-sm leading-lead font-medium text-navBarColor"
          to={"/settings"}
        >
          <SettingsIcon />
          <span className="ml-navBarIcon">
            {languages[lang].sitebar.settings}
          </span>
        </NavLink>
        <button
          onClick={Logout}
          className={` py-4 opacity-80 flex items-center px-6 text-sm leading-lead font-medium text-navBarColor`}
        >
          <ExitICon />
          <span className="ml-navBarIcon">{languages[lang].sitebar.exit}</span>
        </button>
      </div>
      <div className="text-sm leading-lead pl-5 pb-5 text-navBarColor w-supportWidth absolute bottom-0">
        <p>
          Developed by{" "}
          <span className="text-supportColor">Support IT Solution </span>
        </p>
      </div>
      <Modal isVisible={showModal}>
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="relative w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-white">
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Вы уверены, что хотите покинуть сайт?
                </h3>
                <button
                  onClick={LogoutBtn}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Да, я уверен
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Нет, отменить
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
