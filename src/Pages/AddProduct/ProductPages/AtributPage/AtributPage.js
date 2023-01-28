import { useState } from "react";
import { useFormik } from "formik";
import Dounload from "../../../../Assets/Images/HomeContentImg/dounload.svg";
import delterImgAdded from "../../../../Assets/Images/HomeContentImg/addedImgDel.svg";
import delterImgUnAdded from "../../../../Assets/Images/HomeContentImg/addUnUpload.svg";
import * as Yup from "yup";
// Images
import MButton from "../../../../BaseComponents/MButton/MButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const token = JSON.parse(window.localStorage.getItem("token"));

// const env = process.env.REACT_APP_ALL_API;
// const token = JSON.parse(window.localStorage.getItem("token"));
export default function AtributPage({
  infoPage,
  imgPage,
  atrPage,
  addProduct,
  setAddProduct,
}) {
  const [imgUrl, setImgUrl] = useState([]);
  const [getImg, setGetImg] = useState([]);
  const navigate = useNavigate();

  const initialValues = {
    en_name: "",
    en_price: "",
    en_salePrice: "",
    en_UserInfo: "",
  };
  const onSubmit = (values, { resetForm }) => {
    setAddProduct({
      ...addProduct,
      data_en: values,
    });
    axios
      .post(
        "https://intex-shop-production.up.railway.app/api/products",
        {
          name_uz: addProduct?.data_uz?.uz_name,
          name_ru: addProduct?.data_ru?.ru_name,
          name_en: addProduct?.data_en?.en_name,
          discount_price: addProduct.data_ru.ru_salePrice,
          price: addProduct.data_ru.ru_price,
          count: 0,
          about_uz: addProduct?.data_uz?.uz_UserInfo,
          about_ru: addProduct?.data_ru?.ru_UserInfo,
          about_en: addProduct?.data_en?.en_UserInfo,
          image: ["string"],
          category_id: 0,
          country_id: 0,
          status_id: 2,
          manufacturer_id: 0,
          attribute_id: [0],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          navigate("/");
        }
      })
      .catch((err) => err);

    // infoPage(true);
    // imgPage(false);
    // atrPage(false);
    // resetForm();
    // setAddProduct({
    //   ...addProduct,
    //   data_en: values,
    // });

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
    en_name: Yup.string().required("Required"),
    en_price: Yup.number().required("Required"),
    en_salePrice: Yup.number().required("Required"),
    en_UserInfo: Yup.string().required("Required"),
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
  };
  return (
    <div>
      <label className="text-base relative flex mt-5 flex-col w-full">
        Product name
        <input
          // value={addProduct?.data_ru.ru_name}
          defaultValue={addProduct?.name_en ? addProduct?.name_en : ""}
          type="text"
          name="en_name"
          id="name"
          placeholder="Frame pool Intex rectangular.."
          className=" mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
          // className={
          //   formik.touched.en_name && formik.errors.en_name
          //     ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
          //     : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
          // }
          minLength="3"
          maxLength="25"
          onChange={(e) =>
            setAddProduct({
              ...addProduct,
              name_en: e.target.value,
            })
          }
          // {...formik.getFieldProps("ru_name")}
        />
        {/* {formik.touched.en_name && formik.errors.en_name ? (
          <span className="text-red-600 text-xs absolute -bottom-4  left-2">
            {formik.errors.en_name}
          </span>
        ) : null} */}
      </label>
      <label className="text-base relative mt-8 flex flex-col">
        Product Description
        <textarea
          defaultValue={addProduct?.about_en ? addProduct?.about_en : ""}
          rows={8}
          name="en_UserInfo"
          id="name"
          placeholder="Enter Product Description"
          className="mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
          // className={
          //   formik.touched.en_UserInfo && formik.errors.en_UserInfo
          //     ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
          //     : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
          // }
          minLength="3"
          maxLength="25"
          onChange={(e) =>
            setAddProduct({
              ...addProduct,
              about_en: e.target.value,
            })
          }
          // {...formik.getFieldProps("ru_UserInfo")}
        />
        {/* {formik.touched.en_UserInfo && formik.errors.en_UserInfo ? (
          <span className="text-red-600 text-xs absolute -bottom-4 left-2">
            {formik.errors.en_UserInfo}
          </span>
        ) : null} */}
      </label>
    </div>
  );
}
