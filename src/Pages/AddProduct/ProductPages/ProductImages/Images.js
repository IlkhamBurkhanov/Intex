import { useState } from "react";
import { useFormik } from "formik";
import Dounload from "../../../../Assets/Images/HomeContentImg/dounload.svg";
import delterImgAdded from "../../../../Assets/Images/HomeContentImg/addedImgDel.svg";
import delterImgUnAdded from "../../../../Assets/Images/HomeContentImg/addUnUpload.svg";
import * as Yup from "yup";
// Images
import MButton from "../../../../BaseComponents/MButton/MButton";
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
  const initialValues = {
    uz_name: "",
    uz_price: "",
    uz_salePrice: "",
    uz_UserInfo: "",
  };
  const onSubmit = (values, { resetForm }) => {
    infoPage(false);
    imgPage(false);
    atrPage(true);
    // resetForm();
    setAddProduct({
      ...addProduct,
      data_uz: values,
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
    uz_name: Yup.string().required("Required"),
    uz_price: Yup.number().required("Required"),
    uz_salePrice: Yup.number().required("Required"),
    uz_UserInfo: Yup.string().required("Required"),
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
        Mahsulot nomi
        <input
          // value={addProduct?.data_ru.ru_name}
          defaultValue={addProduct?.name_uz ? addProduct?.name_uz : ""}
          type="text"
          name="uz_name"
          id="name"
          placeholder="Ramka hovuzi Intex to'rtburchak.."
          className="mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
          // className={
          //   formik.touched.uz_name && formik.errors.uz_name
          //     ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
          //     : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
          // }
          minLength="3"
          maxLength="25"
          onChange={(e) =>
            setAddProduct({
              ...addProduct,
              name_uz: e.target.value,
            })
          }
          // {...formik.getFieldProps("ru_name")}
        />
      </label>
      <label className="text-base relative mt-8 flex flex-col">
        Mahsulot tavsifi
        <textarea
          defaultValue={addProduct?.about_uz ? addProduct?.about_uz : ""}
          rows={8}
          name="uz_UserInfo"
          id="name"
          placeholder="Mahsulot tavsifini kiriting"
          className=" mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
          // className={
          //   formik.touched.uz_UserInfo && formik.errors.uz_UserInfo
          //     ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
          //     : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
          // }
          minLength="3"
          maxLength="25"
          onChange={(e) =>
            setAddProduct({
              ...addProduct,
              about_uz: e.target.value,
            })
          }
          // {...formik.getFieldProps("ru_UserInfo")}
        />
        {/* {formik.touched.uz_UserInfo && formik.errors.uz_UserInfo ? (
          <span className="text-red-600 text-xs absolute -bottom-4 left-2">
            {formik.errors.uz_UserInfo}
          </span>
        ) : null} */}
      </label>
    </div>
  );
}
