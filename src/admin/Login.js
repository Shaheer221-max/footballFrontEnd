import React, { useContext, useReducer, useState } from "react";
import "../styles/Login.css";
import Hand from "../assets/Hand.png";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./ActiveUser";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

export const Login = () => {
  const [pass, setPass] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const { currentUser, setUser } = useContext(AuthContext);
  const [admin, setadmin] = useState(currentUser);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [link, setLink] = useState("");
  const [email, setEmail] = useState(false);
  const [passw, setPassword] = useState(false);
  const { id, setActiveId } = useContext(AuthContext);

  const navigate = useNavigate();

  // Dispatch Action to Redux Store
  const dispatch = useDispatch();

  const chPass = () => {
    setChangePass(true);
  };

  const password = () => {
    setPass(true);
  };

  const user1 = () => {
    setadmin(true);

    setUser("admin");
  };
  const user2 = () => {
    setadmin(false);
    setUser("coach");
  };

  const handleEmailChange = (event) => {
    // 👇 Get input value from "event"
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    // 👇 Get input value from "event"
    setPassword(event.target.value);
  };

  const login = async () => {
    setRefresh(true);
    if (admin === true) {
      await axios
        .post(`${process.env.REACT_APP_API}/users/signin`, {
          password: passw,
          email: email,
        })
        .then((res) => {
          setRefresh(false);
          if (res.data.status === "fail") {
            message.error(res.data.message);
          }
          if (res.data.status === "success") {
            if (res?.data?.data?.user?.role === "Admin") {
              message.success("Logged In Successfully");
              dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data });
              console.log(res.data);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("current", "Admin");
              setActiveId(email);
              navigate("/dashboard");
            } else {
              message.error("Please Login as an Admin");
            }
          }
        })
        .catch((error) => {
          setError(error.response.data);
          setLink("");
        });
    } else {
      await axios
        .post(`${process.env.REACT_APP_API}/users/signin`, {
          password: passw,
          email: email,
        })
        .then((res) => {
          setRefresh(false);
          console.log(res?.data);
          if (res?.data?.status == "fail") {
            message.error(res?.data?.message);
          }
          if (res?.data?.status == "success") {
            console.log(res?.data?.data?.user?.role);
            if (res?.data?.data?.user?.role == "Coach") {
              message.success("Logged In Successfully");
              console.log("Coach Logged In");
              navigate("/dashboard");
              dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data });
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("current", "Coach");
              setActiveId(email);
            } else {
              message.error("Please Login as a Coach");
            }
          }
        })
        .catch((error) => {
          setError(error.response.data);
        });
    }
  };

  return (
    <div className="login">
      <div className="flex-col w-full">
        {admin === true ? (
          <>
            <div className="flex">
              <div className="flex-1 text-center mt-20">
                <button
                  className="font-lexend p-3 w-40 rounded-sm font-md bg-white text-black "
                  onClick={user2}
                >
                  Coach
                </button>

                <button
                  className="bg-[#1DB954] p-3 w-40 font-lexend rounded-sm font-md text-white"
                  onClick={user1}
                >
                  Admin
                </button>
              </div>
            </div>
            <div>
              <img className="m-auto mt-10" src={Hand} />
            </div>
            <div className="text-center mt-2">
              <h1 className="text-white text-4xl font-bold font-lexend">
                Welcome Admin!
              </h1>
            </div>
          </>
        ) : (
          <>
            <div className="flex">
              <div className="flex-1 text-center mt-20">
                <button
                  className="bg-[#1DB954] p-3 w-40 font-lexend rounded-sm font-md text-white "
                  onClick={user2}
                >
                  Coach
                </button>

                <button
                  className="font-lexend p-3 w-40 rounded-sm font-md bg-white text-black"
                  onClick={user1}
                >
                  Admin
                </button>
              </div>
            </div>
            <div>
              <img className="m-auto mt-10" src={Hand} />
            </div>
            <div className="text-center mt-2">
              <h1 className="text-white text-4xl font-bold font-lexend">
                Welcome Coach!
              </h1>
            </div>
          </>
        )}

        <div className="text-center mt-2">
          <h1 className="text-white text-lg text-[#7E7E7E] font-lexend">
            Please login to continue
          </h1>
        </div>

        {/* Email text field */}
        <div className="flex justify-center items-center">
          <div className="flex-1"></div>
          <div className="flex-1  justify-center  mt-2 grow-0">
            <div className="bg-[#212121] rounded-lg p-2">
              <label className=" text-[#7E7E7E]  w-full text-sm font-lexend ">
                Email
              </label>
              <div className="flex">
                <div className="flex-1 w-full ">
                  <input
                    type={"email"}
                    className={
                      "text-white w-full  font-lexend text-sm   rounded-lg border-none placeholder-[#7E7E7E] bg-[#212121]"
                    }
                    placeholder={"Enter your email adress"}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="flex-1 grow-0 p-2">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 1.65414V1.17284C0 0.861783 0.125111 0.563467 0.347811 0.343517C0.57051 0.123567 0.872555 0 1.1875 0L17.8125 0C18.1274 0 18.4295 0.123567 18.6522 0.343517C18.8749 0.563467 19 0.861783 19 1.17284V1.65414L9.5 7.51834L0 1.65414ZM9.81469 8.70731C9.7203 8.76549 9.61127 8.79634 9.5 8.79634C9.38873 8.79634 9.2797 8.76549 9.18531 8.70731L0 3.03721V12.9012C0 13.2123 0.125111 13.5106 0.347811 13.7306C0.57051 13.9505 0.872555 14.0741 1.1875 14.0741H17.8125C18.1274 14.0741 18.4295 13.9505 18.6522 13.7306C18.8749 13.5106 19 13.2123 19 12.9012V3.03721L9.81469 8.70731Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* password text field */}

            <div className="bg-[#212121] rounded-lg mt-3 p-2">
              <label className=" text-[#7E7E7E]  w-full text-sm font-lexend mr-60">
                Password
              </label>

              <input
                type={"password"}
                className={
                  "text-white w-full font-lexend text-sm  mr-11 rounded-lg border-none placeholder-[#7E7E7E] bg-[#212121]"
                }
                placeholder={"Enter your password"}
                onChange={handlePasswordChange}
              />
            </div>
            {/* Forgot Password */}

            <div className="flex">
              <div className="flex-1"></div>
              <div className="flex-1">
                <button
                  className="w-40  text-[#7E7E7E] text-end font-lexend text-sm ml-9 pt-3 pb-3"
                  onClick={password}
                >
                  Forgot Password?
                </button>
              </div>
            </div>
            {/* Login button */}
            <div className="w-full">
              {error ? (
                <>
                  <div>
                    <p className="text-white font-lexend text-sm p-3 text-center">
                      {error}
                    </p>
                  </div>
                  <button
                    className="text-white rounded-lg font-lexend bg-[#1DB954] w-full text-sm  pt-4 pb-4"
                    onClick={login}
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-white flex justify-center rounded-lg font-lexend bg-[#1DB954] w-full text-sm  pt-4 pb-4"
                    onClick={login}
                  >
                    {refresh ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
                        ></path>
                      </svg>
                    ) : (
                      "Login"
                    )}
                  </button>
                </>
              )}
            </div>
            <div className="w-full ">
              <NavLink to={"/SignUp"}>
                <button className="text-white rounded-lg font-lexend bg-[#535353] w-full text-sm mt-3  pt-4 pb-4">
                  Register
                </button>
              </NavLink>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>

      {/* forgot password */}
      <div
        id="defaultModal"
        className={
          !pass
            ? "hidden"
            : " flex absolute top-0 right-0 left-0 z-50 w-full h-full  bg-[black/70]  bg-opacity-5 justify-center items-center"
        }
      >
        <div className="relative p-4 w-full max-w-lg  ">
          <div className="relative bg-[#2C2C2C] backdrop-blur-[5px]    rounded-2xl px-4 py-2">
            <button
              onClick={() => setPass(false)}
              type="button"
              className="text-gray-400 bg-white bg-transparent rounded-full  p-0.5 ml-auto flex items-center "
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 0C11.2311 0 8.52431 0.821086 6.22202 2.35943C3.91973 3.89777 2.12532 6.08427 1.06569 8.64243C0.00606596 11.2006 -0.271181 14.0155 0.269012 16.7313C0.809205 19.447 2.14258 21.9416 4.10051 23.8995C6.05845 25.8574 8.55301 27.1908 11.2687 27.731C13.9845 28.2712 16.7994 27.9939 19.3576 26.9343C21.9157 25.8747 24.1022 24.0803 25.6406 21.778C27.1789 19.4757 28 16.7689 28 14C28 10.287 26.525 6.72601 23.8995 4.1005C21.274 1.475 17.713 0 14 0ZM14 26C11.6266 26 9.30655 25.2962 7.33316 23.9776C5.35977 22.6591 3.8217 20.7849 2.91345 18.5922C2.0052 16.3995 1.76756 13.9867 2.23058 11.6589C2.69361 9.33114 3.83649 7.19295 5.51472 5.51472C7.19296 3.83649 9.33115 2.6936 11.6589 2.23058C13.9867 1.76755 16.3995 2.00519 18.5922 2.91345C20.7849 3.8217 22.6591 5.35977 23.9776 7.33316C25.2962 9.30655 26 11.6266 26 14C26 17.1826 24.7357 20.2348 22.4853 22.4853C20.2348 24.7357 17.1826 26 14 26Z"
                  fill="#FF0000"
                />
                <path
                  d="M20.7099 7.28994C20.617 7.19621 20.5064 7.12182 20.3845 7.07105C20.2627 7.02028 20.132 6.99414 19.9999 6.99414C19.8679 6.99414 19.7372 7.02028 19.6154 7.07105C19.4935 7.12182 19.3829 7.19621 19.2899 7.28994L13.9999 12.5899L8.70994 7.28994C8.52164 7.10164 8.26624 6.99585 7.99994 6.99585C7.73364 6.99585 7.47824 7.10164 7.28994 7.28994C7.10164 7.47824 6.99585 7.73364 6.99585 7.99994C6.99585 8.26624 7.10164 8.52164 7.28994 8.70994L12.5899 13.9999L7.28994 19.2899C7.19621 19.3829 7.12182 19.4935 7.07105 19.6154C7.02028 19.7372 6.99414 19.8679 6.99414 19.9999C6.99414 20.132 7.02028 20.2627 7.07105 20.3845C7.12182 20.5064 7.19621 20.617 7.28994 20.7099C7.3829 20.8037 7.4935 20.8781 7.61536 20.9288C7.73722 20.9796 7.86793 21.0057 7.99994 21.0057C8.13195 21.0057 8.26266 20.9796 8.38452 20.9288C8.50638 20.8781 8.61698 20.8037 8.70994 20.7099L13.9999 15.4099L19.2899 20.7099C19.3829 20.8037 19.4935 20.8781 19.6154 20.9288C19.7372 20.9796 19.8679 21.0057 19.9999 21.0057C20.132 21.0057 20.2627 20.9796 20.3845 20.9288C20.5064 20.8781 20.617 20.8037 20.7099 20.7099C20.8037 20.617 20.8781 20.5064 20.9288 20.3845C20.9796 20.2627 21.0057 20.132 21.0057 19.9999C21.0057 19.8679 20.9796 19.7372 20.9288 19.6154C20.8781 19.4935 20.8037 19.3829 20.7099 19.2899L15.4099 13.9999L20.7099 8.70994C20.8037 8.61698 20.8781 8.50638 20.9288 8.38452C20.9796 8.26266 21.0057 8.13195 21.0057 7.99994C21.0057 7.86793 20.9796 7.73722 20.9288 7.61536C20.8781 7.4935 20.8037 7.3829 20.7099 7.28994Z"
                  fill="#FF0000"
                />
              </svg>
            </button>
            <h3 className="text-lg mt-4 mb-4 text-center font-normal font-lexend text-white">
              Forgot Password?
            </h3>
            <p className="text-sm mt-4 mb-4 text-center font-normal font-lexend text-[#AFAFAF]">
              Enter Email or Phone to get password changing link
            </p>

            <div className="flex justify-center p-3 pl-10 pr-10 ">
              <input
                type="text"
                className="bg-[#212121]  text-white text-sm rounded-lg w-full pl-10 p-3 mb-5 placeholder-white"
                placeholder="Email or Phone"
                required=""
                min={1}
                max={31}
              />
            </div>
            <div className="flex items-center justify-center my-2">
              <button
                onClick={chPass}
                className="inline-flex font-lexend mb-2 items-center py-2.5 px-10 text-sm font-normal text-white bg-green-500 rounded-lg "
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* change pass */}
      <div
        id="defaultModal"
        className={
          !changePass
            ? "hidden"
            : " flex absolute top-0 right-0 left-0 z-50 w-full h-full  bg-black/70  bg-opacity-5 justify-center items-center"
        }
      >
        <div className="relative p-4 w-full max-w-lg  ">
          <div className="relative bg-[#2C2C2C] backdrop-blur-[5px]    rounded-2xl px-4 py-2">
            <button
              onClick={() => !setPass(false) + !setChangePass(false)}
              type="button"
              className="text-gray-400 bg-white bg-transparent rounded-full  p-0.5 ml-auto flex items-center "
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 0C11.2311 0 8.52431 0.821086 6.22202 2.35943C3.91973 3.89777 2.12532 6.08427 1.06569 8.64243C0.00606596 11.2006 -0.271181 14.0155 0.269012 16.7313C0.809205 19.447 2.14258 21.9416 4.10051 23.8995C6.05845 25.8574 8.55301 27.1908 11.2687 27.731C13.9845 28.2712 16.7994 27.9939 19.3576 26.9343C21.9157 25.8747 24.1022 24.0803 25.6406 21.778C27.1789 19.4757 28 16.7689 28 14C28 10.287 26.525 6.72601 23.8995 4.1005C21.274 1.475 17.713 0 14 0ZM14 26C11.6266 26 9.30655 25.2962 7.33316 23.9776C5.35977 22.6591 3.8217 20.7849 2.91345 18.5922C2.0052 16.3995 1.76756 13.9867 2.23058 11.6589C2.69361 9.33114 3.83649 7.19295 5.51472 5.51472C7.19296 3.83649 9.33115 2.6936 11.6589 2.23058C13.9867 1.76755 16.3995 2.00519 18.5922 2.91345C20.7849 3.8217 22.6591 5.35977 23.9776 7.33316C25.2962 9.30655 26 11.6266 26 14C26 17.1826 24.7357 20.2348 22.4853 22.4853C20.2348 24.7357 17.1826 26 14 26Z"
                  fill="#FF0000"
                />
                <path
                  d="M20.7099 7.28994C20.617 7.19621 20.5064 7.12182 20.3845 7.07105C20.2627 7.02028 20.132 6.99414 19.9999 6.99414C19.8679 6.99414 19.7372 7.02028 19.6154 7.07105C19.4935 7.12182 19.3829 7.19621 19.2899 7.28994L13.9999 12.5899L8.70994 7.28994C8.52164 7.10164 8.26624 6.99585 7.99994 6.99585C7.73364 6.99585 7.47824 7.10164 7.28994 7.28994C7.10164 7.47824 6.99585 7.73364 6.99585 7.99994C6.99585 8.26624 7.10164 8.52164 7.28994 8.70994L12.5899 13.9999L7.28994 19.2899C7.19621 19.3829 7.12182 19.4935 7.07105 19.6154C7.02028 19.7372 6.99414 19.8679 6.99414 19.9999C6.99414 20.132 7.02028 20.2627 7.07105 20.3845C7.12182 20.5064 7.19621 20.617 7.28994 20.7099C7.3829 20.8037 7.4935 20.8781 7.61536 20.9288C7.73722 20.9796 7.86793 21.0057 7.99994 21.0057C8.13195 21.0057 8.26266 20.9796 8.38452 20.9288C8.50638 20.8781 8.61698 20.8037 8.70994 20.7099L13.9999 15.4099L19.2899 20.7099C19.3829 20.8037 19.4935 20.8781 19.6154 20.9288C19.7372 20.9796 19.8679 21.0057 19.9999 21.0057C20.132 21.0057 20.2627 20.9796 20.3845 20.9288C20.5064 20.8781 20.617 20.8037 20.7099 20.7099C20.8037 20.617 20.8781 20.5064 20.9288 20.3845C20.9796 20.2627 21.0057 20.132 21.0057 19.9999C21.0057 19.8679 20.9796 19.7372 20.9288 19.6154C20.8781 19.4935 20.8037 19.3829 20.7099 19.2899L15.4099 13.9999L20.7099 8.70994C20.8037 8.61698 20.8781 8.50638 20.9288 8.38452C20.9796 8.26266 21.0057 8.13195 21.0057 7.99994C21.0057 7.86793 20.9796 7.73722 20.9288 7.61536C20.8781 7.4935 20.8037 7.3829 20.7099 7.28994Z"
                  fill="#FF0000"
                />
              </svg>
            </button>
            <h3 className="text-lg mt-4 mb-4 text-center font-normal font-lexend text-white">
              Changing Password
            </h3>

            <div className="flex justify-center pl-10 pr-10 ">
              <input
                type="text"
                className="bg-[#212121]  text-white text-sm rounded-lg w-full pl-10 p-3 mb-3 placeholder-[#ACA9A9]"
                placeholder="Enter new Password"
                required=""
                min={1}
                max={31}
              />
            </div>
            <div className="flex justify-center pl-10 pr-10 ">
              <input
                type="text"
                className="bg-[#212121]  text-white text-sm rounded-lg w-full pl-10 p-3 mb-4 placeholder-[#ACA9A9]"
                placeholder="Confirm Password"
                required=""
                min={1}
                max={31}
              />
            </div>
            <div className="flex items-center justify-center my-2">
              <button
                onClick={() => !setPass(false) + !setChangePass(false)}
                className="inline-flex font-lexend mb-12 items-center py-2.5 px-8  text-sm font-normal text-white bg-green-500 rounded-lg m-2"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MemoisezedChildA = React.memo(Login);
