/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import useToken from "../../Hook/useToken";
import Visible from "../../Assets/Images/LoginImg/Visible.png";
import IsVisible from "../../Assets/Images/LoginImg/IsVisible.png";
import Loader from "../../Assets/Images/LoginImg/loader.svg";
import SubmitBtn from "../../BaseComponents/SubmitFormBtn/Button";
import { toast, Toaster } from "react-hot-toast";
import "./login.css";

const env = process.env.REACT_APP_ALL_API;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [icon, setIcon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [__, setToken] = useToken();

  const postRequest = async (e) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post(`${env}auth/admin/login`, {
        phone: email,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res?.data?.token) {
          setToken(res?.data?.token);
        } else if (res?.status === 201) {
          toast.success("Successfull sent!");
        }
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          toast.error("Эл.адрес или пароль неверны");
        } else if (err?.response?.status === 400) {
          toast.error("Ошибка электронной почты");
        } else if (err?.message === "Network Error") {
          toast.error(err?.message);
        }
      })
      .finally(() => {
        setLoading(false);
        setEmail("");
        setPassword("");
      });
  };

  return (
    <section>
      <div className="login_bg fixed inset-0 flex justify-center items-center">
        <div className="max-w-login_content w-full">
          <div className="flex flex-col text-center bg-white p-11 rounded-xl">
            <Toaster position="top-center" reverseOrder={false} />
            <h1 className="font-bold text-3xl text-supportColor">
              INTEX-MARKET
            </h1>
            <p className="font-bold text-2xl text-navBarColor mt-4 mb-5">
              Авторизоваться
            </p>
            <form
              className="flex flex-col text-center"
              onSubmit={postRequest}
              autoComplete="off"
            >
              <div className="relative mb-5">
                <input
                  value={email}
                  type="text"
                  id="floating_outlined"
                  className="block px-2.5 pb-2 pt-4 w-full text-sm bg-transparent rounded-lg border border-inputColor appearance-none dark:text-black dark:border-inputColor dark:focus:border-inputColor focus:outline-none focus:ring-0 peer"
                  placeholder=" "
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={45}
                  required
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-base text-inputPleacholderColor dark:text-inputPleacholderColor duration-300 transform -translate-y-4 scale-75 top-[5px] z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Эл.адрес
                </label>
              </div>
              <div>
                <div className="relative  mb-5">
                  <input
                    value={password}
                    type={icon ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    id="outlined_successs"
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
              </div>
              <div className="flex justify-between mt-">
                <label className="flex items-center font-medium text-sm text-navBarColor cursor-pointer">
                  <input
                    className="w-4 h-4 mr-2 cursor-pointer"
                    type="checkbox"
                  />
                  Запомнить меня
                </label>
                <Link
                  to="/forget"
                  className="font-medium text-sm text-forgotPasswordColor bg-white pl-1"
                >
                  Забыли пароль?
                </Link>
              </div>
              <div className="mt-5">
                <SubmitBtn>
                  {loading ? (
                    <img
                      className="mx-auto"
                      src={Loader}
                      alt="loader"
                      width={28}
                      height={28}
                    />
                  ) : (
                    "Войти"
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

export default Login;
