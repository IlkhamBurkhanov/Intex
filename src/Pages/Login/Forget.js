import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../../Assets/Images/LoginImg/arrow.svg";
import Loader from "../../Assets/Images/LoginImg/loader.svg";
import SubmitBtn from "../../BaseComponents/SubmitFormBtn/Button";
import { toast, Toaster } from "react-hot-toast";
import "./login.css";

const env = process.env.REACT_APP_ALL_API;

function Forget() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const postRequest = async (e) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post(`${env}auth/forgot-password`, {
        email: email,
      })
      .then((res) => {
        if (res?.status === 200) {
          window?.localStorage.setItem("email", JSON.stringify(email));
          navigate("/verification");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 400) {
          toast.error("Ваш эл.почта неверен");
        } else if (err?.message === "Network Error") {
          toast.error("Сетевая ошибка");
        } else if (err.status === 409) {
          toast.error(err?.message);
        } else if (err?.response?.status === 503) {
          toast.error("Эта эл.почта не зарегистрирована!");
        }
      })
      .finally(() => {
        setLoading(false);
        setEmail("");
      });
  };

  return (
    <section>
      <div className="login_bg fixed inset-0 flex justify-center items-center">
        <div className="max-w-login_content w-full">
          <div className="flex flex-col text-center bg-white p-11 rounded-xl relative">
            <Toaster position="top-center" reverseOrder={false} />
            <Link
              to="/"
              className="bg-blue-form_btn flex items-center justify-center w-8 h-8 rounded-lg absolute left-6 top-6"
            >
              <img
                src={Arrow}
                alt="arrow"
                width={24}
                height={24}
                property={"true"}
              />
            </Link>
            <h1 className="font-bold text-3xl text-supportColor">
              INTEX-MARKET
            </h1>
            <p className="font-bold text-2xl text-navBarColor mt-3">
              Сброс пароля
            </p>
            <p className="text-sm text-navBarColor mt-2 mb-5 w-10/12 mx-auto">
              Для сброса пароля на ваш номер телефона придет SMS-сообщение,
              через которое вы сможете обновить пароль.
            </p>
            <form
              className="flex flex-col text-center"
              onSubmit={postRequest}
              autoComplete="off"
            >
              <div className="relative">
                <input
                  value={email}
                  type="text"
                  id="floating_outlineds"
                  className="block px-2.5 pb-2 pt-4 w-full text-sm bg-transparent rounded-lg border border-inputColor appearance-none dark:text-black dark:border-inputColor dark:focus:border-inputColor focus:outline-none focus:ring-0 peer"
                  placeholder=" "
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={50}
                  required
                />
                <label
                  htmlFor="floating_outlineds"
                  className="absolute text-base text-black dark:text-inputPleacholderColor duration-300 transform -translate-y-4 scale-75 top-[5px] z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Эл.почта
                </label>
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

export default Forget;
