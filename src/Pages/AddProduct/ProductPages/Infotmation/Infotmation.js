import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Modal } from "../../../../components/Modal/Modal";
import Label from "../../../../components/Label/Label";
import Dounload from "../../../../Assets/Images/HomeContentImg/dounload.svg";
import delterImgAdded from "../../../../Assets/Images/HomeContentImg/addedImgDel.svg";
import delterImgUnAdded from "../../../../Assets/Images/HomeContentImg/addUnUpload.svg";
import deleteIcon from "../../../../Assets/Images/ProductsImgs/deleteIcon.svg";
import * as Yup from "yup";
// Images
import MButton from "../../../../BaseComponents/MButton/MButton";
import { useRef } from "react";
import axios from "axios";
const env = process.env.REACT_APP_ALL_API;
const token = JSON.parse(window.localStorage.getItem("token"));
export default function AtributPage({
  infoPage,
  imgPage,
  atrPage,
  addProduct,
  setAddProduct,

  id,
}) {
  const [imgUrl, setImgUrl] = useState([]);
  const [getImg, setGetImg] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [statusItem, setStatusItem] = useState({});
  const [categoryItem, setCategoryItem] = useState({});
  const [datas, setDatas] = useState(
    JSON.parse(window.localStorage.getItem("atributes")) || []
  );

  const modalselectVal = useRef();
  let formdata = new FormData();
  let collectingImgs = [];
  const initialValues = {
    ru_name: "",
    ru_price: "",
    ru_salePrice: "",
    ru_UserInfo: "",
  };
  const onSubmit = (values, { resetForm }) => {
    infoPage(false);
    imgPage(true);
    atrPage(false);
    // resetForm();
    setAddProduct({
      ...addProduct,
      data_ru: values,
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
    ru_name: Yup.string().required("Required"),
    ru_price: Yup.number().required("Required"),
    ru_salePrice: Yup.number().required("Required"),
    ru_UserInfo: Yup.string().required("Required"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const findNewImg = (evt) => {
    setGetImg([
      ...getImg,
      {
        img: window.URL.createObjectURL(evt.target.files[0]),
        id: getImg.length ? getImg[getImg.length - 1].id + 1 : 0,
      },
    ]);
    if (evt.target && evt.target.files[0]) {
      setImgUrl([
        ...imgUrl,
        {
          id: imgUrl.length ? imgUrl[imgUrl.length - 1].id + 1 : 0,
          url: evt.target.files[0],
        },
      ]);
    }
    imgUrl.map((item) => collectingImgs.push(item.url));
    for (const item of collectingImgs) {
      formdata.append("image", item);
    }
    axios
      .post(`${env}media`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
        }
      })
      .catch((err) => err);
  };
  const handleSubmitSelect = (evt) => {
    evt.preventDefault();
    setShowModal(false);
  };
  // console.log(initialValues);
  function changeStatus(event) {
    setStatusItem(event.target.value);
  }
  function changeCategory(event) {
    setCategoryItem(event.target.value);
  }

  return (
    <div>
      <label className="text-base relative flex mt-5 flex-col w-full">
        Название продукта
        <input
          // defaultValue="nima gaap"
          defaultValue={addProduct?.name_ru ? addProduct?.name_ru : ""}
          type="text"
          name="ru_name"
          id="name"
          placeholder="Каркасный басейн Intex прямоуголь.."
          className=" mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
          // className={
          //   formik.touched.ru_name && formik.errors.ru_name
          //     ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
          //     : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
          // }
          minLength="3"
          maxLength="40"
          onChange={(e) =>
            setAddProduct({
              ...addProduct,
              name_ru: e.target.value,
            })
          }
          // {...formik.getFieldProps("ru_name")}
        />
        {/* {formik.touched.ru_name && formik.errors.ru_name ? (
            <span className="text-red-600 text-xs absolute -bottom-4  left-2">
              {formik.errors.ru_name}
            </span>
          ) : null} */}
      </label>
      <label className="text-base relative mt-8 flex flex-col">
        Описание продукта
        <textarea
          defaultValue={addProduct?.about_ru ? addProduct?.about_ru : ""}
          rows={8}
          name="ru_UserInfo"
          id="name"
          placeholder="Введите Описание продукта"
          className="mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
          // className={
          //   formik.touched.ru_UserInfo && formik.errors.ru_UserInfo
          //     ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
          //     : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
          // }
          minLength="3"
          maxLength="150"
          onChange={(e) =>
            setAddProduct({
              ...addProduct,
              about_ru: e.target.value,
            })
          }
        />
      </label>
    </div>
  );
}
