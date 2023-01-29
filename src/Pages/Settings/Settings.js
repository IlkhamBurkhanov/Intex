import axios from "axios";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
// Images
import HomeImg from "../../Assets/Images/HeaderImgs/HomeImg.svg";
import EditImg from "../../Assets/Images/SettingsImg/edit.svg";
import Close from "../../Assets/Images/SettingsImg/close.svg";
import Flag from "../../Assets/Images/SettingsImg/flag.svg";
import Add from "../../Assets/Images/SettingsImg/add.svg";
import { useSelector } from "react-redux";

const env = process.env.REACT_APP_ALL_API;

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  // --- Datas
  const [data, setData] = useState({});
  const [address, setAddress] = useState({});
  const [links, setLinks] = useState([]);
  const [createLinkTitle, setCreateLinkTitle] = useState("");
  const [createLinkText, setCreateLinkText] = useState("");
  const languages = useSelector((state) => state.data.localization);
  const lang = useSelector((state) => state.data.lang);

  const token = JSON.parse(window.localStorage.getItem("token"));

  // --- Контактная информация get
  useEffect(() => {
    setLoading(true);

    axios
      .get(`${env}sites`)
      .then((res) => {
        setData(res.data[0]);
        setAddress(res.data[0]);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [token]);

  // --- Cоциальные сети get
  useEffect(() => {
    axios
      .get(`${env}social-networks`)
      .then((res) => {
        setLinks(res.data);
      })
      .catch((err) => console.error(err));
  }, [token]);

  // --- First informatios put
  const putData = (e) => {
    e.preventDefault();

    setSubLoading(true);
    axios
      .put(
        `${env}sites`,
        {
          id: address?.id,
          email: address?.email,
          address_ru: address?.address_ru,
          address_uz: address?.address_en,
          address_en: address?.address_en,
          phone: address?.phone,
          work_uz: address?.work_en,
          work_ru: address?.work_ru,
          work_en: address?.work_en,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res?.status === 200) {
          axios.get(`${env}sites`).then((res) => {
            setData(res?.data[0]);
            setAddress(res?.data[0]);
          });
          toast.success("Успешно отправлено!");
        }
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          toast.error("Неверный запрос!");
        } else if (err?.message === "Network Error") {
          toast.error("Сетевая ошибка!");
        }
      })
      .finally(() => {
        setShowModal(false);
        setSubLoading(false);
      });
  };

  // --- Cоциальные сети put
  const putDataLink = (e) => {
    e.preventDefault();

    setSubLoading(true);
    axios
      .put(`${env}social-networks`, links, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          axios.get(`${env}social-networks`).then((res) => {
            setLinks(res?.data);
          });
          toast.success("Успешно отправлено!");
        }
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          toast.error("Неверный запрос!");
        } else if (err?.message === "Network Error") {
          toast.error("Сетевая ошибка!");
        }
      })
      .finally(() => {
        setShowModal1(false);
        setSubLoading(false);
      });
  };

  // --- Delete Link
  const linkDelete = (id, e) => {
    e.preventDefault();

    axios
      .delete(`${env}social-networks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          console.log(res);
          axios.get(`${env}social-networks`).then((data) => {
            setLinks(data?.data);
          });
        }
      })
      .catch((err) => console.error(err));
  };

  // --- Add Link
  const AddLink = (e) => {
    e.preventDefault();

    setSubLoading(true);
    axios
      .post(
        `${env}social-networks`,
        {
          name: createLinkTitle,
          link: createLinkText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res?.status === 201) {
          axios
            .get(`${env}social-networks`)
            .then((res) => {
              setLinks(res.data);
            })
            .catch((err) => console.error(err));
          toast.success("Создать ссылку!");
        }
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          toast.error("Вы ввели неверную ссылку!");
        } else if (err?.message === "Network Error") {
          toast.error("Сетевая ошибка!");
        }
      })
      .finally(() => {
        setShowModal2(false);
        setSubLoading(false);
        setCreateLinkTitle("");
        setCreateLinkText("");
      });
  };

  // --- Loaders
  const loader = (
    <svg
      aria-hidden="true"
      className="mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-400 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );

  const loaderButton = (
    <svg
      className="inline mr-2 w-6 h-6 text-text-white animate-spin dark:text-white fill-gray-400 dark:fill-gray-400"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );

  return (
    <div className="overflow-y-scroll h-[100vh]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white flex items-center w-full pt-1.5 pb-1.5 px-8">
        <Link className="flex items-center" to={"/"}>
          <img src={HomeImg} alt="Home Img" width="16" height="16" />
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link
          to="/settings
        "
        >
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">
            {languages[lang].sitebar.settings}
          </h2>
        </Link>
      </div>
      <div className="px-7 pt-6 mb-40">
        <h1 className="font-bold text-navBarColor text-2xl">
          {" "}
          {languages[lang].sitebar.settings}
        </h1>
        <div className="w-full mt-4 bg-white rounded-xl px-6 py-7">
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg text-navBarColor font-bold">
                {languages[lang].main.contactInfo}
              </h2>
              <button
                onClick={() => setShowModal(true)}
                className="p-1"
                type="button"
              >
                <img src={EditImg} alt="edit" />
              </button>
            </div>
            <div className="grid grid-cols-2 w-[80%] gap-5 space-x-16 mt-6">
              <div>
                <div>
                  <h3 className="font-bold text-base text-supportColor mb-2">
                    {languages[lang].main.address}
                  </h3>
                  <p className="text-sm text-navBarColor">
                    {loading ? loader : data.address_ru}
                  </p>
                </div>
                <div className="mt-6">
                  <h3 className="font-bold text-base text-supportColor mb-2">
                    {languages[lang].main.phone}
                  </h3>
                  <p className="text-sm text-navBarColor">
                    {loading ? loader : data.phone}
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <h3 className="font-bold text-base text-supportColor mb-2">
                    E-mail
                  </h3>
                  <p className="text-sm text-navBarColor">
                    {loading ? loader : data.email}
                  </p>
                </div>
                <div className="mt-6">
                  <h3 className="font-bold text-base text-supportColor mb-2">
                    {languages[lang].main.schedule}
                  </h3>
                  <p className="text-sm text-navBarColor">
                    {loading ? loader : data.work_ru}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ------- */}
          <span className="flex w-full h-[2px] bg-lineColor mt-11 mb-6"></span>
          {/* ------- */}
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg text-navBarColor font-bold">
                {languages[lang].main.socialMedia}
              </h2>
              <div className="flex items-center">
                <button
                  onClick={() => setShowModal2(true)}
                  className="p-1 mr-2 block"
                  type="button"
                >
                  <img className="w-8 h-8" src={Add} alt="edit" />
                </button>
                <button
                  onClick={() => setShowModal1(true)}
                  className="p-1"
                  type="button"
                >
                  <img src={EditImg} alt="edit" />
                </button>
              </div>
            </div>
            <div className="w-[80%] grid grid-cols-2  mt-6 ">
              {loading
                ? loader
                : links.length > 0 &&
                  links?.map((data) => (
                    <div className="mb-8" key={data.id}>
                      <h3 className="font-bold text-base text-supportColor mb-2">
                        {data.name}
                      </h3>
                      <a href={data.link} className="text-sm text-navBarColor">
                        {data.link}
                      </a>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Edit_1 --- */}
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="w-730">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-addProductColor font-bold">
              Изменить информацию
            </h2>
            <button onClick={() => setShowModal(false)} className="rounded-md">
              <img src={Close} width={25} height={25} alt={"close_image"} />
            </button>
          </div>
          <div className="mt-6">
            <form onSubmit={putData}>
              <label className="flex flex-col text-base text-addProductColor font-medium">
                Адрес
                <input
                  className="font-normal border border-[#E3E5E5] rounded-lg outline-none mt-2 h-11 px-3"
                  name="address"
                  type="text"
                  value={address.address_ru}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      address_ru: e.target.value,
                    })
                  }
                />
              </label>
              <div className="grid grid-cols-2 gap-5 mt-5">
                <label className="relative text-base font-medium text-addProductColor">
                  Номер телефона
                  <div className="bg-white w-submitBtnsWidth flex items-center h-11 rounded-lg border border-solid  border-borderColor text-addProductColor p-4 mt-2">
                    <img
                      src={Flag}
                      className="w-6 h-4"
                      width={22}
                      height={15}
                      alt="site_logo"
                    />
                    <input
                      type="text"
                      placeholder="(90) 123 45 67"
                      className="font-normal outline-none w-full ml-1 h-full p-2"
                      value={address.phone}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                </label>

                <label className="flex flex-col text-base text-addProductColor font-medium">
                  E-mail
                  <input
                    className="font-normal border border-[#E3E5E5] rounded-lg outline-none mt-2 h-11 px-3"
                    type="text"
                    value={address.email}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        email: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-5 mt-5">
                <label className="flex flex-col text-base text-addProductColor font-medium">
                  График работы
                  <input
                    className="font-normal border border-[#E3E5E5] rounded-lg outline-none mt-2 h-11 px-3"
                    name="address"
                    type="text"
                    value={address.work_ru}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        work_ru: e.target.value.trim(),
                      })
                    }
                  />
                </label>
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
                  {subLoading ? loaderButton : "Сохранить"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      {/* --- Edit_2 --- */}
      <Modal
        isVisible={showModal1}
        onClose={() => setShowModal1(false)}
        className="overflow-y-scroll h-[95vh]"
      >
        <div className="w-730">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-addProductColor font-bold">
              Изменить информацию
            </h2>
            <button onClick={() => setShowModal1(false)} className="rounded-md">
              <img src={Close} width={25} height={25} alt={"close_image"} />
            </button>
          </div>
          <div className="mt-6">
            <form
              className="space-y-6"
              onSubmit={putDataLink}
              autoComplete="off"
            >
              {links.length > 0 &&
                links.map((item) => (
                  <label
                    key={item.id}
                    className="flex flex-col text-base text-addProductColor font-medium"
                  >
                    {item.name}
                    <input
                      className="font-normal border border-[#E3E5E5] rounded-lg outline-none mt-2 h-11 px-3"
                      type="text"
                      value={item.link}
                      onChange={(e) =>
                        setLinks(() => {
                          return links.map((link) => {
                            if (item.id === link.id) {
                              return {
                                ...link,
                                link: e.target.value,
                              };
                            } else {
                              return link;
                            }
                          });
                        })
                      }
                    />
                    <button
                      onClick={(e) => linkDelete(item.id, e)}
                      type="button"
                      className="w-fit text-start text-base text-red-deleteColor mt-2"
                    >
                      - Удалить социальную сеть
                    </button>
                  </label>
                ))}
              {/* ----- */}
              {/* <span className="flex w-full h-[2px] bg-lineColor mt-11 mb-6"></span> */}
              {/* ----- */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal1(false)}
                  className="bg-[#F2F2F2] w-80 py-3 rounded-xl text-russuanColor font-medium text-lg"
                >
                  Отменить
                </button>
                <button
                  type="submit"
                  className="bg-russuanColor w-80 py-3 rounded-xl text-[#fff] font-medium text-lg"
                >
                  {subLoading ? loaderButton : "Сохранить"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      {/* --- Add Links --- */}
      <Modal isVisible={showModal2} onClose={() => setShowModal2(false)}>
        <h2 className="text-2xl text-addProductColor font-bold">
          Добавить социальную сеть
        </h2>
        <form className="mt-6" autoComplete="off" onSubmit={AddLink}>
          <label className="flex flex-col text-base text-addProductColor font-medium w-1/2  ">
            Тип социальный сеть
            <input
              className="font-normal border border-[#E3E5E5] rounded-lg outline-none mt-2 h-11 px-3"
              name="address"
              type="text"
              placeholder="Выберите тип социальной сети..."
              value={createLinkTitle}
              onChange={(e) => setCreateLinkTitle(e.target.value.trim())}
              required
            />
          </label>
          <label className="flex flex-col text-base text-addProductColor font-medium mt-3">
            Линк
            <input
              className="font-normal border border-[#E3E5E5] rounded-lg outline-none mt-2 h-11 px-3"
              name="address"
              type="text"
              placeholder="Введите ссылку на  социальную сеть..."
              value={createLinkText}
              onChange={(e) => setCreateLinkText(e.target.value.trim())}
              required
            />
          </label>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setShowModal2(false)}
              className="bg-[#F2F2F2] w-72 py-3 rounded-xl text-russuanColor font-medium text-lg"
            >
              Отменить
            </button>
            <button
              type="submit"
              className="bg-russuanColor w-72 py-3 ml-8 rounded-xl text-[#fff] font-medium text-lg"
            >
              {subLoading ? loaderButton : "Сохранить"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
