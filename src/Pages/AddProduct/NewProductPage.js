import { useEffect, useState } from "react";
import Information from "./ProductPages/Infotmation/Infotmation";
import ProductImgs from "./ProductPages/ProductImages/Images";
import AtributPage from "./ProductPages/AtributPage/AtributPage";
import Line from "./../../BaseComponents/Line/Line";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeImg from "../../Assets/Images/HeaderImgs/HomeImg.svg";
import axios from "axios";
import { useFormik } from "formik";
import { Modal } from "../../components/Modal/Modal";
import Label from "../../components/Label/Label";
import Dounload from "../../Assets/Images/HomeContentImg/dounload.svg";
import delterImgAdded from "../../Assets/Images/HomeContentImg/addedImgDel.svg";
import delterImgUnAdded from "../../Assets/Images/HomeContentImg/addUnUpload.svg";
import deleteIcon from "../../Assets/Images/ProductsImgs/deleteIcon.svg";
import * as Yup from "yup";
// Images
import MButton from "../../BaseComponents/MButton/MButton";
import { useRef } from "react";
// import axios from "axios";
const env = process.env.REACT_APP_ALL_API;
const token = JSON.parse(window.localStorage.getItem("token"));

export default function AddProduct() {
  const [info, setInfo] = useState(true);
  const [img, setImg] = useState(false);
  const [atr, setAtr] = useState(false);
  const [langData, setLangData] = useState([]);
  const [addProduct, setAddProduct] = useState({});
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState([]);
  const [count, setCount] = useState(0);
  const languages = useSelector((state) => state.data.localization);
  const lang = useSelector((state) => state.data.lang);
  const env = process.env.REACT_APP_ALL_API;

  const navigate = useNavigate();

  // newwwwwwwwwwwww
  const [imgUrl, setImgUrl] = useState([]);
  const [getImg, setGetImg] = useState([]);
  const [image, setImage] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [statusItem, setStatusItem] = useState(1);
  const [categoryItem, setCategoryItem] = useState(1);
  const [datas, setDatas] = useState(
    JSON.parse(window.localStorage.getItem("atributes")) || []
  );

  const modalselectVal = useRef();
  let formdata = new FormData();
  let collectingImgs = [];
  const initialValues = {
    ru_price: "",
    ru_salePrice: "",
  };
  const onSubmit = (values, { resetForm }) => {
    axios
      .post(
        "https://intex-shop-production.up.railway.app/api/products",
        {
          name_uz: addProduct.name_uz,
          name_ru: addProduct.name_ru,
          name_en: addProduct.name_en,
          discount_price: values.ru_salePrice,
          price: values.ru_price,
          count: count,
          about_uz: addProduct.name_uz,
          about_ru: addProduct.about_ru,
          about_en: addProduct.about_en,
          image: image ? image : [""],
          category_id: categoryItem,
          country_id: 1,
          status_id: statusItem,
          manufacturer_id: 0,
          attribute_id: [0],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        console.log("Internal error");
      });

    const informationResult = {
      name_uz: values.uzName,
    };
    window.localStorage.setItem(
      "information",
      JSON.stringify(informationResult)
    );
  };
  function handldelete(id) {
    let newTodo = getImg.filter((e) => e.id !== id);
    let newDelImg = imgUrl.filter((e) => e.id !== id);
    setGetImg(newTodo);
    setImgUrl(newDelImg);
  }
  const validationSchema = Yup.object({
    ru_price: Yup.number().required("Required"),
    ru_salePrice: Yup.number().required("Required"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  useEffect(() => {
    imgUrl.map((item) => {
      formdata.append("image", item.url);
    });
    axios
      .post(`${env}media`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          setImage(res?.data.image);
        }
      })
      .catch((err) => err);
  }, [imgUrl]);

  const findNewImg = (evt) => {
    setGetImg([
      ...getImg,
      {
        img: window.URL.createObjectURL(evt.target.files[0]),
        id: getImg.length ? getImg.length + 1 : 0,
      },
    ]);
    if (evt.target && evt.target.files[0]) {
      setImgUrl([
        ...imgUrl,
        {
          id: imgUrl.length ? imgUrl.length + 1 : 0,
          url: evt.target.files[0],
        },
      ]);
    }
  };

  const handleSubmitSelect = (evt) => {
    evt.preventDefault();
    setShowModal(false);
  };

  function changeStatus(event) {
    setStatusItem(event.target.value);
  }
  function changeCategory(event) {
    setCategoryItem(event.target.value);
  }

  useEffect(() => {
    axios
      .get(`${env}sites`)
      .then((res) => {
        setLangData(res.data);
      })
      .catch((err) => console.error(err));
    axios
      .get(
        "https://intex-shop-production.up.railway.app/api/categories/getAll?page=0&limit=10"
      )
      .then((res) => {
        setCategory(res.data.result);
      })
      .catch((err) => console.error(err));
    axios
      .get(" https://intex-shop-production.up.railway.app/api/status-products")
      .then((res) => {
        setStatus(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="bg-white flex items-center w-full pt-1.5 pb-1.5 px-8">
        <Link className="flex items-center" to={"/"}>
          <img src={HomeImg} alt="Home Img" width="16" height="16" />
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link to="/">
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">
            {languages[lang].header.products}
          </h2>
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link to="/addProduct">
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">
            Добавить продуктов
          </h2>
        </Link>
      </div>
      <div className="py-6 overflow-scroll h-[100vh] px-headerPaddingX">
        <div className="mb-6">
          <h2 className="font-bold text-2xl leading-8">
            {languages[lang].main.addProduct}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-xl mb-[100px]">
          <div>
            <form
              onSubmit={(e) => {
                formik.handleSubmit(e);
                formik.values = initialValues;
              }}
              className="mt-[23px] mb-[40px]"
            >
              <div className="flex justify-between border-b-2 pb-6 mb-6">
                <div className="w-[30%]">
                  <h2 className="font-bold text-lg mb-6 text-[#2B3D90]">
                    Информация и изображение{" "}
                  </h2>

                  <div className="space-y-6 mt-6">
                    <label className="text-base flex relative flex-col">
                      Цена
                      <input
                        type="number"
                        name="ru_price"
                        id="price"
                        placeholder="1 290 000"
                        className={
                          formik.touched.ru_price && formik.errors.ru_price
                            ? "  h-12 w-[340px] mt-3 text-base rounded-lg p-2 sm:p-4 outline-none border border-red-600"
                            : "  h-12 w-[340px] mt-3 text-base rounded-lg p-2 sm:p-4 outline-none border border-gray-input_radius"
                        }
                        minLength="3"
                        maxLength="25"
                        {...formik.getFieldProps("ru_price")}
                      />
                      {formik.touched.ru_price && formik.errors.ru_price ? (
                        <span className="text-red-600 text-xs absolute -bottom-1 sm:-bottom-5 left-2">
                          {formik.errors.ru_price}
                        </span>
                      ) : null}
                    </label>
                    <label className="text-base flex relative flex-col">
                      Цена со скидкой
                      <input
                        type="number"
                        name="ru_salePrice"
                        id="salePrice"
                        placeholder="1 290 000"
                        className={
                          formik.touched.ru_salePrice &&
                          formik.errors.ru_salePrice
                            ? "  h-12 w-[340px] mt-3 text-base rounded-lg p-2 sm:p-4 outline-none border border-red-600 "
                            : "  h-12 w-[340px] mt-3 text-base rounded-lg p-2 sm:p-4 outline-none border border-gray-input_radius  "
                        }
                        minLength="3"
                        maxLength="25"
                        {...formik.getFieldProps("ru_salePrice")}
                      />
                      {formik.touched.ru_salePrice &&
                      formik.errors.ru_salePrice ? (
                        <span className="text-red-600 text-xs absolute -bottom-1 sm:-bottom-5 left-2">
                          {formik.errors.ru_salePrice}
                        </span>
                      ) : null}
                    </label>

                    <label className="text-base flex flex-col">
                      Категория
                      <select
                        value={categoryItem}
                        type="change"
                        onChange={changeCategory}
                        id="status"
                        className="  h-12 w-[340px] mt-3 text-base rounded-lg p-2 sm:p-3 outline-none border border-gray-input_radius"
                      >
                        {category
                          ? category.map((item) => {
                              return (
                                <option
                                  key={item?.id}
                                  className="text-black text-"
                                  value={item?.id}
                                >
                                  {item.category_ru}
                                </option>
                              );
                            })
                          : null}
                      </select>
                    </label>
                    <label className="text-base flex justify-between">
                      <div className="flex flex-col">
                        Статус
                        <select
                          value={statusItem}
                          type="change"
                          onChange={changeStatus}
                          id="status"
                          className="  h-12 w-[170px] mt-3 text-base rounded-lg p-2 sm:p-3 outline-none border border-gray-input_radius"
                        >
                          {status
                            ? status.map((item) => {
                                return (
                                  <option
                                    key={item?.id}
                                    className="text-black text-"
                                    value={item?.id}
                                  >
                                    {item.status_ru}
                                  </option>
                                );
                              })
                            : null}
                        </select>
                      </div>
                      <div className="flex flex-col">
                        Count
                        <input
                          required
                          placeholder="120"
                          onChange={(e) => setCount(e.target.value)}
                          type="number"
                          className="h-12 w-[150px] flex mt-3 text-base rounded-lg p-2 sm:p-3 outline-none border border-gray-input_radius"
                        />
                      </div>
                    </label>
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-lg text-[#2B3D90]">
                        Атрибуты
                      </h2>
                      <button
                        onClick={() => setShowModal(true)}
                        type="button"
                        className="text-sm text-[#109EF4]"
                      >
                        + Добавить атрибуть
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-[65%]">
                  <div>
                    <ul className="flex items-center list-none space-x-4 w-addProductListWidth border-b-2">
                      {langData.map((item) => (
                        <li
                          key={item.address_ru}
                          onClick={() => {
                            setInfo(true);
                            setImg(false);
                            setAtr(false);
                          }}
                          className={` font-medium relative cursor-pointer text-sm text-addProductLinks leading-lead pb-2.5`}
                        >
                          {item.lang_ru ? "Pусский язык" : ""}
                          {info ? <Line /> : ""}
                        </li>
                      ))}
                      {langData.map((item) => (
                        <li
                          key={item.address_uz}
                          onClick={() => {
                            setInfo(false);
                            setImg(true);
                            setAtr(false);
                          }}
                          className={` font-medium relative cursor-pointer text-sm text-addProductLinks leading-lead pb-2.5`}
                        >
                          {item.lang_uz ? "Узбекский язык" : ""}
                          {img ? <Line /> : ""}
                        </li>
                      ))}
                      {langData.map((item) => (
                        <li
                          key={item.address_en}
                          onClick={() => {
                            setInfo(false);
                            setImg(false);
                            setAtr(true);
                          }}
                          className={` font-medium relative cursor-pointer text-sm text-addProductLinks leading-lead pb-2.5`}
                        >
                          {item.lang_en ? "Aнглийский язык" : ""}
                          {atr ? <Line /> : ""}
                        </li>
                      ))}
                    </ul>
                    <div>
                      {langData.map((item) =>
                        item.lang_ru ? (
                          info ? (
                            <Information
                              key={item.id}
                              infoPage={setInfo}
                              imgPage={setImg}
                              atrPage={setAtr}
                              addProduct={addProduct}
                              setAddProduct={setAddProduct}
                            />
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )
                      )}
                      {langData.map((item) =>
                        item.lang_uz ? (
                          img ? (
                            <ProductImgs
                              key={item.id}
                              infoPage={setInfo}
                              imgPage={setImg}
                              atrPage={setAtr}
                              addProduct={addProduct}
                              setAddProduct={setAddProduct}
                            />
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )
                      )}
                      {langData.map((item) =>
                        item.lang_uz ? (
                          atr ? (
                            <AtributPage
                              key={item.id}
                              infoPage={setInfo}
                              imgPage={setImg}
                              atrPage={setAtr}
                              addProduct={addProduct}
                              setAddProduct={setAddProduct}
                            />
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex justify-center border-b-2">
                <div>
                  <div className="flex items-center mt-1 mb-2 space-x-2">
                    <h2 className="font-[550]   text-lg text-[#2B3D90]">
                      Изображение
                    </h2>
                    <button onClick={() => setShowModal1(true)} type="button">
                      <p className="font-medium text-bold text-[#2B3D90]">
                        | Выбрать медиа
                      </p>
                    </button>
                  </div>
                  <label className="inline-block mb-4   ">
                    <input
                      onChange={findNewImg}
                      className="hidden"
                      type="file"
                    />
                    <div className="cursor-pointer w-productImgUploadWidth py-8 bg-bgUpload rounded-xl text-center">
                      <img
                        className="mx-auto mb-1"
                        src={Dounload}
                        alt="dounload"
                        width="60"
                        height="60"
                      />
                      <p>Загрузите изображения продукта</p>
                    </div>
                  </label>
                  <div className="flex space-x-2.5">
                    {getImg.map((item) => (
                      <div key={Math.random()} className="relative mb-4">
                        <img
                          className="rounded-xl object-cover w-[163px] h-[116px] shadow-lg"
                          src={item.img}
                          alt="Upload img"
                          width="163"
                          height="116"
                        />
                        <div className="flex cursor-pointer items-center space-x-2 absolute top-2.5 right-2">
                          <img
                            src={delterImgUnAdded}
                            alt="delete img"
                            width="32"
                            height="32"
                          />
                          <img
                            onClick={() => handldelete(item.id)}
                            src={delterImgAdded}
                            alt="delete img"
                            width="32"
                            height="32"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-5 mt-6">
                <Link to="/">
                  <MButton BType="reject" type="reset">
                    Отменить
                  </MButton>
                </Link>
                <MButton BType="next" type="submit">
                  Submit
                </MButton>
              </div>
            </form>

            <Modal isVisible={showModal1} onClose={() => setShowModal1(false)}>
              <div className="w-[730px]">Rasmlar keladi</div>
            </Modal>
            <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
              <div className="w-[730px]">
                <div className="flex mb-6 items-center justify-between">
                  <h2 className="font-bold text-[24px] leading-[32px] text-[#24283A]">
                    Добавить атрибуть
                  </h2>
                  <button onClick={() => setShowModal(false)}>
                    <img
                      src={deleteIcon}
                      width={32}
                      height={32}
                      alt="delete icon"
                    />
                  </button>
                </div>
                <Label
                  datas={datas}
                  setDatas={setDatas}
                  gettingName={"attributes/attributes"}
                  localName={"atributes"}
                  renderName={"attribute_ru"}
                  handleSubmitSelect={handleSubmitSelect}
                >
                  <label className="flex flex-col">
                    Тип атрибуты
                    <select
                      ref={modalselectVal}
                      className="w-[330px] mt-3 rounded-lg border-2 outline-none p-4 border-[#E3E5E5]"
                    >
                      {datas.length > 0 &&
                        datas.map((item) => (
                          <option key={item.id}>{item.attribute_ru}</option>
                        ))}
                    </select>
                  </label>
                  <div className="flex items-center mt-6 justify-between">
                    <button
                      type="reset"
                      className="w-[48%] py-3 bg-[#F2F2F2] font-medium text-lg leading-[120%] rounded-xl text-[#2B3D91]"
                    >
                      Отменить
                    </button>
                    <button
                      type="submit"
                      className="w-[48%] py-3 bg-[#2B3D90] font-medium text-lg leading-[120%] rounded-xl text-[#fff]"
                    >
                      Добавить
                    </button>
                  </div>
                </Label>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
