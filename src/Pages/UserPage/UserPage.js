import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import HomeImg from "../../Assets/Images/HeaderImgs/HomeImg.svg";
import MButton from "../../BaseComponents/MButton/MButton";
import { Modal } from "../../components/Modal/Modal";
import Close from "../../Assets/Images/SettingsImg/close.svg";
import Upload from "../../Assets/Images/UserImgs/upload.jpg";
import Cloud from "../../Assets/Images/UserImgs/cloud.svg";
import UploadImg from "../../Assets/Images/UserImgs/upload-img.svg";
import Flag from "../../Assets/Images/SettingsImg/flag.svg";
import Visible from "../../Assets/Images/LoginImg/Visible.png";
import IsVisible from "../../Assets/Images/LoginImg/IsVisible.png";
import THead from "../../components/THead/THead";
import TBody from "../../components/TBody/TBody";
import Trash from "../../Assets/Images/ProductsImgs/trash.svg";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

const env = process.env.REACT_APP_ALL_API;
const envImg = process.env.REACT_APP_IMAGE;

function UserPage() {
  const [getImg, setGetImg] = useState([]);
  const [image, setImage] = useState();
  const [showModal, setShowModal] = useState(false);
  // ------> Input States
  const [icon, setIcon] = useState(false);
  const [password, setPassword] = useState("");
  const [icon1, setIcon1] = useState(false);
  const [password1, setPassword1] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalpage] = useState(0);
  const languages = useSelector((state) => state.data.localization);
  const lang = useSelector((state) => state.data.lang);
  const [isChecked, setIsChecked] = useState(false);
  const [sortBtn, setSortBtn] = useState(false);

  // ------> Data
  const [products, setProducts] = useState([]);
  // const [admins, setAdmins] = useAdmins();

  // ------> User Informations States
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [surName, setSurName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const token = JSON.parse(window.localStorage.getItem("token"));
  const data = [
    {
      title: languages[lang].main.id ? languages[lang].main.id : "ID",
      image: true,
      style: "w-[65px]",
    },
    {
      title: languages[lang].main.nameUser,
      image: true,
      style: "w-[248px]",
    },
    {
      title: languages[lang].main.roleUser,
      image: true,
      style: "w-[170px]",
    },
    {
      title: languages[lang].main.status,
      image: false,
      style: "w-[140px]",
    },
    {
      title: languages[lang].main.lastActive,
      image: false,
      style: "w-[188px]",
    },
    {
      title: languages[lang].main.phone,
      image: true,
      style: "w-[162px]",
    },
    {
      title: languages[lang].main.birthday,
      image: false,
      style: "w-[120px]",
    },
  ];
  // ------> Get Users
  useEffect(() => {
    axios
      .get(`${env}users?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, page, limit, showModal, sortBtn]);
  console.log(products);
  let sortData = sortBtn
    ? products.sort((a, b) => {
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

  // ------> Table Row Information
  const vitalData = products?.map((item) => {
    return {
      mainId: item.id,
      data: [
        {
          title: item?.id,
          style: "w-[65px]",
        },
        {
          title: item?.first_name + " " + item?.last_name,
          image: item.user_image,
          style: "w-[248px] flex pl-3",
        },
        {
          title: item?.role ? item.role : "-",
          style: "w-[170px] pl-3",
        },
        {
          title: item?.status,
          style: "w-[140px] pl-3",
          textClass: `${
            item?.status
              ? "py-[5px] px-[10px] bg-[#0BCC23] rounded-[4px] text-xs "
              : ""
          } `,
        },
        {
          title: item?.created_at.slice(0, 10),
          style: "w-[188px] pl-3",
        },
        {
          title: item?.phone,
          style: "w-[162px]",
        },
        {
          title: item?.birth_date ? item.birth_date : "-",
          style: "w-[100px]",
        },
      ],
    };
  });

  // ------> Upload Img
  const uploadImg = (evt) => {
    setGetImg([
      {
        img: window.URL.createObjectURL(evt.target.files[0]),
      },
    ]);
    let formData = new FormData();
    formData.append("image", evt.target.files[0]);

    // ------> Get Image Url
    axios
      .post(`${env}media`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setImage(res?.data?.image))
      .catch((err) => console.log(err));
  };

  const userDeteals = {
    first_name: name,
    last_name: surName,
    password: password === password1 ? password : "",
    phone: "+998" + phoneNumber,
    email: null,
    birth_date: birthday,
    user_image: image ? image[0] : "",
    status: status,
    gender: null,
    role: role,
    is_active: true,
  };

  const userCreate = (e) => {
    e.preventDefault();

    axios
      .post(`${env}users`, userDeteals, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          axios
            .get(`${env}users`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setProducts(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        e.target.reset();
        setShowModal(false);
      });
  };

  const initialValues = {
    ru_price: "",
    ru_salePrice: "",
    phone: "",
  };

  const onSubmit = (values, { resetForm }) => {
    // axios
    //   .post(
    //     "https://intex-shop-production.up.railway.app/api/products",
    //     {
    //       name_uz: addProduct.name_uz,
    //       name_ru: addProduct.name_ru,
    //       name_en: addProduct.name_en,
    //       discount_price: values.ru_salePrice,
    //       price: values.ru_price,
    //       count: count,
    //       about_uz: addProduct.name_uz,
    //       about_ru: addProduct.about_ru,
    //       about_en: addProduct.about_en,
    //       image: image ? image : [""],
    //       category_id: categoryItem,
    //       country_id: 1,
    //       status_id: statusItem,
    //       manufacturer_id: 0,
    //       attribute_id: [0],
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .then(() => {
    //     console.log("Submitted");
    //     navigate("/");
    //   })
    //   .catch(() => {
    //     console.log("Internal error");
    //   });
    // const informationResult = {
    //   name_uz: values.uzName,
    // };
    // window.localStorage.setItem(
    //   "information",
    //   JSON.stringify(informationResult)
    // );
  };

  const validationSchema = Yup.object({
    ru_price: Yup.number().required("Required"),
    ru_salePrice: Yup.number().required("Required"),
    phone: Yup.string()
      .required("Zakas Numbers is required, at least 3 characters")
      .min(3, "Minimal 3 characters")
      .max(7, "Maximum 20 characters"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  console.log(products);
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
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">
            {languages[lang].sitebar.users}
          </h2>
        </Link>
      </div>
      <div className=" pb-8 overflow-scroll h-[100vh] ">
        <div className="pt-6 px-homeContentPadding ">
          <div className="mb-4">
            <h2 className="text-navBarColor font-bold leading-8 text-2xl mb-4">
              {languages[lang].sitebar.users}
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
                <button
                  onClick={() => setShowModal(true)}
                  className="add bg-filterBg text-center"
                >
                  {languages[lang].main.add}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[white]  rounded-xl mb-[100px] mx-8">
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
            <table className="w-full ">
              <THead data={data}></THead>
              <TBody
                vitalData={vitalData}
                urlRoute="users"
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

      {/* ---------------- Modal ------------------- */}
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="w-[730px] bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-addProductColor font-bold">
              Добавить пользователь
            </h2>
            <button onClick={() => setShowModal(false)} className="rounded-md">
              <img src={Close} width={25} height={25} alt={"close_image"} />
            </button>
          </div>
          <div className="mt-6">
            <div className="flex items-center">
              <div
                className={`flex justify-center text-center w-[163px] h-[163px] rounded-[10px] ${
                  getImg.length > 0
                    ? ""
                    : "border-2 border-dashed border-[#CDCDCD]"
                }`}
              >
                {getImg.length > 0 ? (
                  getImg.map((item, index) => (
                    <img
                      className="w-full object-cover rounded-[10px]"
                      key={index}
                      src={item.img}
                      alt="product_img"
                    />
                  ))
                ) : (
                  <div className="mt-12">
                    <img className="block mx-auto" src={Upload} alt="" />
                    <div className="flex items-center mt-3">
                      <img className="w-4 h-4" src={Cloud} alt="cloud_svg" />
                      <p className="ml-3 font-medium text-sm text-[#04009A]">
                        Загрузить
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="ml-4">
                <p className="mb-4 font-medium text-[#374151] text-sm">
                  Загрузите аватар
                </p>
                <label htmlFor="selectImg" className="inline-block">
                  <div className="flex justify-center items-center w-[200px] h-[44px] rounded-[8px] bg-bgUpload1 cursor-pointer">
                    <img className="w-5 h-5" src={UploadImg} alt="" />
                    <p className="ml-3 text-sm text-[#377DFF]">
                      Загрузить фото
                    </p>
                  </div>
                  <input
                    onChange={uploadImg}
                    className="visually-hidden"
                    id="selectImg"
                    type="file"
                  />
                </label>
              </div>
            </div>
          </div>
          <form onSubmit={userCreate} className="mt-8" autoComplete="off">
            <div className="grid grid-cols-2 gap-5">
              <label className="flex flex-col font-medium text-base text-addProductColor">
                Имя
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Введите ваше имя"
                  onChange={(e) => setName(e.target.value)}
                  className=" font-normal border border-[#E3E5E5] rounded-lg outline-none mt-2 h-11 px-4"
                  minLength="3"
                  maxLength="25"
                />
              </label>

              <label className="flex flex-col font-medium text-base text-addProductColor">
                Фамилия
                <input
                  required
                  type="text"
                  name="surname"
                  placeholder="Введите ваша фамилия"
                  onChange={(e) => setSurName(e.target.value)}
                  className=" font-normal border border-[#E3E5E5] rounded-lg outline-none mt-2 h-11 px-4"
                  minLength="3"
                  maxLength="25"
                />
              </label>

              <label className="relative text-base font-medium text-addProductColor">
                Номер телефона
                <div className="w-full bg-white flex items-center h-11 rounded-lg border border-solid text-addProductColor px-4 mt-2">
                  <img
                    src={Flag}
                    className="w-6 h-4"
                    width={22}
                    height={15}
                    alt="site_logo"
                  />
                  <p className="ml-1 text-base text-[#0E0F0F]">+998</p>
                  <input
                    required
                    title="Number length mustbe 9"
                    type="number"
                    placeholder="901234567"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="font-normal outline-none w-full ml-1 h-full p-2"
                  />
                </div>
              </label>

              <label
                className="text-15 relative flex flex-col text-addProductColor"
                htmlFor="date"
              >
                Дата рождение
                <input
                  required
                  id="date"
                  type="date"
                  placeholder="Select estimate time"
                  onChange={(e) => setBirthday(e.target.value)}
                  className={`date_bg date h-11 relative text-15 rounded-md pr-10 pl-3 mt-2 outline-none border text-black`}
                />
              </label>
              {/* ------ Select ------ */}
              <select
                placeholder="Статус"
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 relative text-base rounded-md pr-10 px-3 mt-2 outline-none border text-black"
                required
              >
                <option value="Статус" hidden>
                  Статус
                </option>
                <option value="registered">Registered</option>
                <option value="not_registered">Not_Registered</option>
              </select>
              <select
                placeholder="Выберите роль ползователя"
                onChange={(e) => setRole(e.target.value)}
                className="h-11 relative text-base rounded-md pr-10 px-3 mt-2 outline-none border text-black"
                required
              >
                <option value="Статус" hidden>
                  Роль Ползователя
                </option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
                <option value="user">User</option>
              </select>
              {/* ------ Password ------ */}
              <div className="relative mb-5">
                <input
                  id="outlined_successs"
                  value={password}
                  type={icon ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby="outlined_success_help"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-inputColor appearance-none dark:text-black dark:border-inputColor dark:focus:border-inputColor focus:outline-none focus:ring-0 focus:border-inputColor peer"
                  placeholder=" "
                  minLength={4}
                  maxLength={16}
                  required
                />
                {password ? (
                  <div
                    className="cursor-pointer absolute right-0 top-3 mr-2"
                    onClick={() => {
                      setIcon(!icon);
                    }}
                  >
                    {icon ? (
                      <img className="w-6" src={IsVisible} alt="show_image" />
                    ) : (
                      <img className="w-6" src={Visible} alt="show_image" />
                    )}
                  </div>
                ) : (
                  ""
                )}
                <label
                  htmlFor="outlined_successs"
                  className="absolute text-base text-inputPleacholderColor dark:text-inputPleacholderColor duration-300 transform -translate-y-4 scale-75 top-[5px] z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Пароль
                </label>
              </div>
              <div className="relative mb-5">
                <input
                  id="successs"
                  value={password1}
                  type={icon1 ? "text" : "password"}
                  onChange={(e) => setPassword1(e.target.value)}
                  aria-describedby="outlined_success_help"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-inputColor appearance-none dark:text-black dark:border-inputColor dark:focus:border-inputColor focus:outline-none focus:ring-0 focus:border-inputColor peer"
                  placeholder=" "
                  minLength={4}
                  maxLength={16}
                  required
                />
                {password1 ? (
                  <div
                    className="cursor-pointer absolute right-0 top-3 mr-2"
                    onClick={() => {
                      setIcon1(!icon1);
                    }}
                  >
                    {icon1 ? (
                      <img className="w-6" src={IsVisible} alt="show_image" />
                    ) : (
                      <img className="w-6" src={Visible} alt="show_image" />
                    )}
                  </div>
                ) : (
                  ""
                )}
                <label
                  htmlFor="successs"
                  className="absolute text-base text-inputPleacholderColor dark:text-inputPleacholderColor duration-300 transform -translate-y-4 scale-75 top-[5px] z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Потвердите пароль
                </label>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-[#F2F2F2] w-80 py-3 rounded-xl text-russuanColor font-medium text-lg"
              >
                Отменить
              </button>
              <button
                type="submit"
                className="bg-russuanColor w-80 py-3 rounded-xl text-[#fff] font-medium text-lg"
              >
                {"Сохранить"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default UserPage;
