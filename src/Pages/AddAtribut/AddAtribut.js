import axios from "axios";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form } from "formik";
import FormikControl from "../../BaseComponents/FormInput/FormikControl";
import DropDown from "../../BaseComponents/DropDown/DropDown";
import MButton from "../../BaseComponents/MButton/MButton";

import {
  TagsInputEng,
  TagsInputRu,
  TagsInputUz,
} from "../../BaseComponents/TagsInput/TagsInput";
// --- Images
import HomeImg from "../../Assets/Images/HeaderImgs/HomeImg.svg";
import DropImg from "../../Assets/Images/HomeContentImg/Drop.svg";
import { useNavigate } from "react-router-dom";
const env = process.env.REACT_APP_ALL_API;

export default function AddAtribut() {
  const [navBarDrop, setNavBarDrop] = useState(false);
  const [navBarDrop1, setNavBarDrop1] = useState(false);
  const [navBarDrop2, setNavBarDrop2] = useState(false);
  const [info, setInfo] = useState([]);
  const [tags_ru, setTags_ru] = useState([]);
  const [tags_uz, setTags_uz] = useState([]);
  const [tags_en, setTags_en] = useState([]);

  const navigate = useNavigate();

  const token = JSON.parse(window.localStorage.getItem("token"));

  const dropdownOptions = [
    { key: "Выберите тип ввода", value: "" },
    { key: "dropdown", value: "dropdown" },
    { key: "radio button", value: "radio button" },
    { key: "checkbox", value: "checkbox" },
  ];

  const initialValues = {
    name_ru: "",
    selectOptions: "",
    name_eng: "",
    name_uz: "",
  };

  const validationSchema = Yup.object({
    name_ru: Yup.string().required("Required"),
    selectOptions: Yup.string().required("Required"),
    name_eng: Yup.string().required("Required"),
    name_uz: Yup.string().required("Required"),
  });

  const onSubmit = (values, { resetForm }) => {
    let arr = [];
    arr.push({
      attribute_ru: values.name_ru,
      attribute_uz: values.name_uz,
      attribute_en: values.name_eng,
      view: values.selectOptions,
      attribute_id: null,
    });
    if (tags_en.length === 0 || tags_ru.length === 0 || tags_uz.length === 0) {
      return;
    }

    if (
      tags_en.length !== tags_ru.length ||
      tags_en.length !== tags_uz.length
    ) {
      return;
    }
    if (
      tags_en.length === tags_ru.length &&
      tags_en.length === tags_uz.length
    ) {
      for (let i = 0; i < tags_en.length; i++) {
        arr.push({
          attribute_ru: tags_ru[i],
          attribute_uz: tags_uz[i],
          attribute_en: tags_en[i],
          view: values.selectOptions,
          attribute_id: null,
        });
      }
      setInfo([arr]);
    } else {
      toast.error(" Network Error! ");
    }

    axios
      .post(`${env}attributes`, arr, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Successfully attribute reated!");
          setTimeout(() => {
            navigate("/atribut");
          }, 1000);
          // res;
        }
      })
      .catch((err) => {
        toast.error("Internal Error");
        setTimeout(() => {
          navigate("/atribut");
        }, 1000);
      });

    resetForm();
    setTags_en(tags_en.length === 0);
    setTags_uz(tags_uz.length === 0);
    setTags_ru(tags_ru.length === 0);
  };

  // let type = 'click'
  useEffect(() => {}, [info, setInfo]);

  return (
    <>
      <div className="bg-white flex items-center w-full pt-1.5 pb-1.5 px-8">
        <Link className="flex items-center" to={"/"}>
          <img src={HomeImg} alt="Home Img" width="16" height="16" />
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link to="/atribut">
          <h2 className="font-normal text-supportColor text-xs ml-2.5">
            Атрибуты
          </h2>
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link to="">
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">
            Добавить атрибуть
          </h2>
        </Link>
      </div>

      <div className="py-6 overflow-scroll h-[100vh] px-headerPaddingX pb-28">
        <div className="mb-6">
          <h2 className="font-bold text-2xl leading-8">Добавить атрибуть</h2>
        </div>

        <div className="bg-white p-6 rounded-xl">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <DropDown
                  dropName="Русский"
                  imgAlt="dropimg"
                  wDrop="12"
                  hdrop="9"
                  downClick={() => setNavBarDrop(!navBarDrop)}
                  imgURL={DropImg}
                  rotateDelete={navBarDrop ? "-rotate-180" : "-rotate-0"}
                >
                  <div
                    className={
                      navBarDrop
                        ? "h-auto overflow-auto"
                        : "h-0 overflow-hidden"
                    }
                  >
                    <div className="flex mb-6">
                      <FormikControl
                        control="input"
                        type="name_ru"
                        id="name_ru"
                        label="Название атрибута"
                        name="name_ru"
                        autoComplete="off"
                        placeholder="Введите название атрибута"
                        className="w-mainInputWidth"
                      />
                      <span className="ml-5"></span>
                      <FormikControl
                        control="select"
                        label="Тип ввода"
                        name="selectOptions"
                        options={dropdownOptions}
                        className="w-mainInputWidth"
                      />
                    </div>
                    <TagsInputRu tags_ru={tags_ru} setTags_ru={setTags_ru} />
                  </div>
                </DropDown>
                <DropDown
                  dropName="English"
                  imgAlt="dropimg"
                  wDrop="12"
                  hdrop="9"
                  downClick={() =>
                    setNavBarDrop1(!navBarDrop1) && setNavBarDrop(false)
                  }
                  imgURL={DropImg}
                  rotateDelete={navBarDrop1 ? "-rotate-180" : "-rotate-0"}
                >
                  <div
                    className={
                      navBarDrop1
                        ? "h-auto overflow-auto"
                        : "h-0 overflow-hidden"
                    }
                  >
                    <div className="flex mb-6">
                      <FormikControl
                        control="input"
                        type="name_eng"
                        id="name_eng"
                        label="Название атрибута"
                        name="name_eng"
                        autoComplete="off"
                        placeholder="Введите название атрибута"
                        className="w-mainInputWidth"
                      />
                      <span className="ml-5"></span>
                      <FormikControl
                        control="select"
                        label="Тип ввода"
                        name="selectOptions"
                        options={dropdownOptions}
                        className="w-mainInputWidth"
                      />
                    </div>
                    <TagsInputEng tags_en={tags_en} setTags_en={setTags_en} />
                  </div>
                </DropDown>
                <DropDown
                  dropName="O'zbek"
                  imgAlt="dropimg"
                  wDrop="12"
                  hdrop="9"
                  downClick={() => setNavBarDrop2(!navBarDrop2)}
                  imgURL={DropImg}
                  rotateDelete={navBarDrop2 ? "-rotate-180" : "-rotate-0"}
                >
                  <div
                    className={
                      navBarDrop2
                        ? "h-auto overflow-auto"
                        : "h-0 overflow-hidden"
                    }
                  >
                    <div className="flex mb-6">
                      <FormikControl
                        control="input"
                        type="name_uz"
                        id="name_uz"
                        label="Название атрибута"
                        name="name_uz"
                        autoComplete="off"
                        placeholder="Введите название атрибута"
                        className="w-mainInputWidth"
                      />
                      <span className="ml-5"></span>
                      <FormikControl
                        control="select"
                        label="Тип ввода"
                        name="selectOptions"
                        options={dropdownOptions}
                        className="w-mainInputWidth"
                      />
                    </div>
                    <TagsInputUz tags_uz={tags_uz} setTags_uz={setTags_uz} />
                  </div>
                </DropDown>

                <div className="flex justify-center mt-6">
                  <MButton BType="reject">Отменить</MButton>
                  <MButton type="submit" BType="next" className="ml-5">
                    Добавить
                  </MButton>
                </div>

                <Toaster position="bottom-right" reverseOrder={false} />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
