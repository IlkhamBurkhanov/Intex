/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../../Assets/Images/LoginImg/arrow.svg";
import Loader from "../../Assets/Images/LoginImg/loader.svg";
import SubmitBtn from "../../BaseComponents/SubmitFormBtn/Button";
import { toast, Toaster } from "react-hot-toast";
import ReactCodeInput from "react-code-input";
import OtpTimer from "otp-timer";
import "./login.css";

const env = process.env.REACT_APP_ALL_API;

function Verification() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState(JSON.parse(window.localStorage.getItem("email")));
  const navigate = useNavigate();

  const postRequest = async (e) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post(`${env}auth/forgot-password/confirm`, {
        email: email,
        confirmation_code: Number(password),
      })
      .then((res) => {
        if (res?.status === 200) {
          window.localStorage.setItem("password", password);
          navigate("/newPassword");
        }
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          toast.error("Ваш пароль неверен!");
        } else if (err?.response?.status === 409) {
          toast.error("Ваш пароль неверен!");
        } else if (err?.message === "Network Error") {
          toast.error("Сетевая ошибка");
        }
      })
      .finally(() => {
        setLoading(false);
        setPassword("");
      });
  };

  const handleSubmit = async (e) => {
    axios
      .post(`${env}admins/forgot-password`, {
        email: email,
      })
      .then((res) => {
        if (res?.status === 200) {
          toast.success("Код подтверждения отправить на почту!");
        }
      })
      .catch((err) => {
        if (err?.message === "Network Error") {
          toast.error("Сетевая ошибка");
        }
      });
  };

  return (
    <section>
      <div className="login_bg fixed inset-0 flex justify-center items-center">
        <div className="max-w-login_content w-full">
          <div className="flex flex-col text-center bg-white p-11 rounded-xl relative">
            <Toaster position="top-center" reverseOrder={false} />
            <Link
              to="/forget"
              className="bg-blue-form_btn flex items-center justify-center w-8 h-8 rounded-lg absolute left-6 top-6"
            >
              <img src={Arrow} alt="arrow" width={24} height={24} property={"true"} />
            </Link>
            <h1 className="font-bold text-3xl text-supportColor">INTEX-MARKET</h1>
            <p className="font-bold text-2xl text-navBarColor mt-3">Введите SMS-код</p>
            <p className="text-sm text-navBarColor mt-2 mb-5 w-10/12 mx-auto">
              Введите SMS-код, полученный на ваш Адрес электронной почты
            </p>
            <form className="flex flex-col text-center" onSubmit={postRequest}>
              <div className="flex justify-center">
                <ReactCodeInput
                  onChange={(e) => setPassword(e)}
                  value={password}
                  className={"space-x-6"}
                  inputStyle={{
                    font: "bold",
                    fontSize: "20px",
                    textAlign: "center",
                    width: "40px",
                    height: "50px",
                    outline: "none",
                    border: "2px solid #E3E5E5",
                    borderRadius: "8px",
                  }}
                  type="text"
                  fields={6}
                  autoComplete="off"
                  requered
                />
              </div>
              <div className="flex justify-end mt-6">
                <OtpTimer
                  style={{ fontSize: "60px" }}
                  textColor={"#109EF4"}
                  minutes={1}
                  seconds={60}
                  text=""
                  ButtonText="SMS ni qayta jo’natish"
                  background={"#fff"}
                  buttonColor={"#109EF4"}
                  resend={handleSubmit}
                />
              </div>
              <div className="mt-5">
                <SubmitBtn>
                  {loading ? (
                    <img className="mx-auto" src={Loader} alt="loader" width={28} height={28} />
                  ) : (
                    "Потвердить"
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

export default Verification;
