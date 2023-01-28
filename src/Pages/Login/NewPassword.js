/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import Visible from "../../Assets/Images/LoginImg/Visible.png";
import IsVisible from "../../Assets/Images/LoginImg/IsVisible.png";
import Loader from "../../Assets/Images/LoginImg/loader.svg";
import SubmitBtn from "../../BaseComponents/SubmitFormBtn/Button";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import "./login.css";

const env = process.env.REACT_APP_ALL_API;

function NewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState(false);
  const [icon1, setIcon1] = useState(false);
  const [verificationPassword, setVerificationPassword] = useState(
    JSON.parse(window.localStorage.getItem("password"))
  );
  const navigate = useNavigate();

  const postRequest = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (newPassword === newPassword1) {
      axios
        .post(`${env}auth/reset_password`, {
          password: newPassword,
          varification_number: verificationPassword,
        })
        .then((res) => {
          if (res.status === 200) {
            navigate("/");
          }
        })
        .catch((err) => {
          if (err?.message === "Network Error") {
            toast.error("Сетевая ошибка");
          }
        })
        .finally(() => {
          setNewPassword("");
          setNewPassword1("");
          setLoading(false);
        });
    } else {
      toast.error("Ваши пароли не совпадают!");
      setNewPassword("");
      setNewPassword1("");
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="login_bg fixed inset-0 flex justify-center items-center">
        <div className="max-w-login_content w-full">
          <div className="flex flex-col text-center bg-white p-11 rounded-xl relative">
            <Toaster position="top-center" reverseOrder={false} />
            <h1 className="font-bold text-3xl text-supportColor">INTEX-MARKET</h1>
            <p className="font-bold text-2xl text-navBarColor mt-8 mb-6">Введите новый пароль</p>
            <form className="flex flex-col text-center" onSubmit={postRequest}>
              <div className="mb-6">
                <div className="relative">
                  <input
                    value={newPassword}
                    type={icon ? "text" : "password"}
                    onChange={(e) => setNewPassword(e.target.value)}
                    id="outlined_success"
                    aria-describedby="outlined_success_help"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-inputColor appearance-none dark:text-black dark:border-inputColor dark:focus:border-inputColor focus:outline-none focus:ring-0 focus:border-inputColor peer pr-10"
                    placeholder=" "
                    required
                    minLength={4}
                    maxLength={16}
                  />
                  {newPassword ? (
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
                    htmlFor="outlined_success"
                    className="absolute text-base text-inputPleacholderColor dark:text-inputPleacholderColor duration-300 transform -translate-y-4 scale-75 top-[5px] z-10 origin-[0] bg-white dark:bg-white px-3 peer-focus:px-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Введите новый пароль
                  </label>
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    value={newPassword1}
                    type={icon1 ? "text" : "password"}
                    onChange={(e) => setNewPassword1(e.target.value)}
                    id="outlined_successed"
                    aria-describedby="outlined_success_help"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-inputColor appearance-none dark:text-black dark:border-inputColor dark:focus:border-inputColor focus:outline-none focus:ring-0 focus:border-inputColor peer pr-10"
                    placeholder=" "
                    required
                    minLength={4}
                    maxLength={16}
                  />
                  {newPassword1 ? (
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
                    htmlFor="outlined_successed"
                    className="absolute text-base text-inputPleacholderColor dark:text-inputPleacholderColor duration-300 transform -translate-y-4 scale-75 top-[5px] z-10 origin-[0] bg-white dark:bg-white px-3 peer-focus:px-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Введите новый пароль
                  </label>
                </div>
              </div>
              <div className="mt-5">
                <SubmitBtn>
                  {loading ? (
                    <img className="mx-auto" src={Loader} alt="loader" width={28} height={28} />
                  ) : (
                    "Отправить СМС"
                  )}
                </SubmitBtn>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewPassword;
