import React, { useEffect, useState } from "react";
import DropDown from "../../BaseComponents/DropDown/DropDown";
import DropImg from "../../Assets/Images/HomeContentImg/Drop.svg";
import FormikControl from "../../BaseComponents/FormInput/FormikControl";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, setIn } from "formik";
import {
  TagsInputEng,
  TagsInputRu,
  TagsInputUz,
} from "../../BaseComponents/TagsInput/TagsCategory";
import axios from "axios";
const token = JSON.parse(window.localStorage.getItem("token"));
const env = process.env.REACT_APP_ALL_API;
export default function AddCategory() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(true);
  const [enShowContent, setEnShowContent] = useState(false);
  const [uzShowContent, setUzShowContent] = useState(false);
  const [tags_ru, setTags_ru] = useState([]);
  const [tags_en, setTags_en] = useState([]);
  const [tags_uz, setTags_uz] = useState([]);
  const initialValues = {
    ruPoolName: "",
    enPoolName: "",
    uzPoolName: "",
  };
  const validationSchema = Yup.object({
    ruPoolName: Yup.string().required("Required"),
    enPoolName: Yup.string().required("Required"),
    uzPoolName: Yup.string().required("Required"),
  });
  const dawnElClick = () => {
    setShowContent(!showContent);
    setEnShowContent(false);
    setUzShowContent(false);
  };
  const engClickedcategory = () => {
    setEnShowContent(!enShowContent);
    setShowContent(false);
    setUzShowContent(false);
  };
  const uzClickedcategory = () => {
    setUzShowContent(!uzShowContent);
    setEnShowContent(false);
    setShowContent(false);
  };
  const [info, setInfo] = useState([]);
  const onSubmit = (values, { resetForm }) => {
    let arr = [];
    arr.push({
      category_ru: values.ruPoolName,
      category_uz: values.uzPoolName,
      category_en: values.enPoolName,
      category_id: null,
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
          category_ru: tags_ru[i],
          category_uz: tags_uz[i],
          category_en: tags_en[i],
          category_id: 0,
        });
      }
      setInfo([arr]);
    } else {
      // (" Network Error! ");
    }

    axios
      .post(`${env}categories`, arr, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          navigate("/category");
        }
      })
      .catch((err) => err);

    // (values);
    resetForm();
    setTags_ru(tags_ru.length === 0);
    setTags_en(tags_en.length === 0);
    setTags_uz(tags_uz.length === 0);
    // arr;
  };
  useEffect(() => {
    // info;
  }, [info, setInfo]);

  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl mb-6">Добавить категорию</h2>
      <div className="bg-white p-6 rounded-xl">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <DropDown
                downClick={dawnElClick}
                dropName={"Русский"}
                wDrop={12}
                hdrop={9}
                imgURL={DropImg}
                imgAlt={"Drop img"}
                rotateDelete={
                  showContent
                    ? "-rotate-180 duration-300"
                    : "-rotate-0 duration-300"
                }
              >
                <div
                  className={`${
                    showContent ? "h-auto overflow-auto" : "h-0 overflow-hidden"
                  } duration-300`}
                >
                  <div className="flex items-end justify-between">
                    <FormikControl
                      className={"w-[35%]"}
                      control="input"
                      type="name"
                      id="name"
                      label="Название категорию"
                      name="ruPoolName"
                      placeholder="Каркасный бассейны."
                    />
                    <div className="min-h-[48px] w-[62%]">
                      <TagsInputRu tags_ru={tags_ru} setTags_ru={setTags_ru} />
                    </div>
                  </div>
                </div>
              </DropDown>
              <DropDown
                downClick={engClickedcategory}
                dropName={"English"}
                wDrop={12}
                hdrop={9}
                imgURL={DropImg}
                imgAlt={"Drop img"}
                rotateDelete={
                  enShowContent
                    ? "-rotate-180 duration-300"
                    : "-rotate-0 duration-300"
                }
              >
                <div
                  className={`${
                    enShowContent
                      ? "h-auto overflow-auto"
                      : "h-0 overflow-hidden"
                  } duration-300`}
                >
                  <div className="flex items-end justify-between">
                    <FormikControl
                      className={"w-[35%]"}
                      control="input"
                      type="name"
                      id="name"
                      label="Название категорию"
                      name="enPoolName"
                      placeholder="Каркасный бассейны."
                    />
                    <div className="min-h-[48px] w-[62%]">
                      <TagsInputEng tags_en={tags_en} setTags_en={setTags_en} />
                    </div>
                  </div>
                </div>
              </DropDown>
              <DropDown
                downClick={uzClickedcategory}
                dropName={"O’zbekcha"}
                wDrop={12}
                hdrop={9}
                imgURL={DropImg}
                imgAlt={"Drop img"}
                rotateDelete={
                  uzShowContent
                    ? "-rotate-180 duration-300"
                    : "-rotate-0 duration-300"
                }
              >
                <div
                  className={`${
                    uzShowContent
                      ? "h-auto overflow-auto"
                      : "h-0 overflow-hidden"
                  } duration-300`}
                >
                  <div className="flex items-end justify-between">
                    <FormikControl
                      className={"w-[35%]"}
                      control="input"
                      type="name"
                      id="name"
                      label="Название категорию"
                      name="uzPoolName"
                      placeholder="Каркасный бассейны."
                    />
                    <div className="min-h-[48px] w-[62%]">
                      <TagsInputUz tags_uz={tags_uz} setTags_uz={setTags_uz} />
                    </div>
                  </div>
                </div>
              </DropDown>
              <div className="flex mt-6 pb-8 items-center justify-center space-x-5">
                <Link to="/category">
                  <button
                    className="py-3 bg-resetBtn rounded-2xl w-submitBtnsWidth text-russuanColor font-bold text-lg"
                    type="reset"
                  >
                    Отменить
                  </button>
                </Link>
                <button
                  className="py-3 text-white rounded-2xl w-submitBtnsWidth bg-submitBtnBg font-bold text-lg"
                  type="submit"
                >
                  Cледующий
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
