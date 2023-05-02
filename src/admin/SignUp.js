import React, { useState, useContext } from "react";
import "../styles/Login.css";
import Hand from "../assets/Hand.png";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./ActiveUser";
// import axios from '../axios';
import GoogleLogin from "react-google-login";
import axios from "../axios";

export default function SignUp() {
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  const [pass, setPassword] = useState(false);
  const [phone, setPhone] = useState(false);
  const [error, setError] = useState(false);
  const [link, setLink] = useState("");
  const [refresh, setRefresh] = useState(false);

  const { currentUser, setUser } = useContext(AuthContext);
  const [admin, setadmin] = useState(false);

  const user = () => {
    setadmin(true);
    setUser("admin");
  };
  const user2 = () => {
    setadmin(false);
    setUser("coach");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handlePasswordChange = (event) => {
    // 👇 Get input value from "event"
    setPassword(event.target.value);
  };
  const createAdmin = async () => {
      setRefresh(true);
      await axios
        .post("https://football-backend-updated.herokuapp.com/users/signup", {
          password: pass,
          confirmPassword: pass,
          name: name,
          email: email,
          phone: phone,
          role: admin ? "Admin" : "Coach",
        })
        .then((response) => {
          setRefresh(false);
          console.log(response.data)
          // window.location.assign("/");
          // setLink("/");
        })
        .catch((error) => {
          setError(error.response.data);
          setLink("");
        });
  };

  return (
    <div className="register">
      <div className="flex-col w-full ">
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
                  onClick={user}
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
                  onClick={user}
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
          <h1 className= "text-lg text-[#7E7E7E] font-lexend">
            Signup to continue using panel
          </h1>
        </div>

        <div className="flex">
          <div className="flex-1"></div>
          {/* name text field */}
          <div className="flex-1 w-full p-2">
            <div className="bg-[#212121] rounded-lg mt-3">
              <label className=" text-[#7E7E7E]  text-sm font-lexend p-3">
                Name
              </label>
              <div className="flex">
                <div className="flex-1">
                  <input
                    type={"text"}
                    className={
                      "text-white font-lexend text-sm p-3 rounded-lg border-none placeholder-[#7E7E7E]white bg-[#212121]"
                    }
                    placeholder={"Enter your name"}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="flex-1 grow-0 mr-4 mb-1">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 0C7.71618 0.00311265 5.04727 1.11036 3.07882 3.07882C1.11036 5.04727 0.00311265 7.71618 0 10.5C0.00466427 13.2833 1.11241 15.9513 3.08053 17.9195C5.04865 19.8876 7.71666 20.9953 10.5 21C13.2848 21 15.9555 19.8938 17.9246 17.9246C19.8938 15.9555 21 13.2848 21 10.5C21 7.71523 19.8938 5.04451 17.9246 3.07538C15.9555 1.10625 13.2848 0 10.5 0ZM16.8865 16.5589C16.2968 15.3695 15.3865 14.3685 14.2581 13.669C13.1298 12.9694 11.8284 12.5991 10.5009 12.5998C9.17326 12.6005 7.87228 12.9721 6.7447 13.6729C5.61712 14.3737 4.70781 15.3756 4.11936 16.5656C2.54933 14.9373 1.67449 12.762 1.68 10.5C1.68 8.16079 2.60925 5.91739 4.26332 4.26332C5.91739 2.60925 8.16079 1.68 10.5 1.68C12.8392 1.68 15.0826 2.60925 16.7367 4.26332C18.3908 5.91739 19.32 8.16079 19.32 10.5C19.3253 12.7588 18.4527 14.9313 16.8865 16.5589ZM10.5 4.2C9.75239 4.2 9.02156 4.42169 8.39994 4.83704C7.77833 5.2524 7.29383 5.84275 7.00773 6.53346C6.72164 7.22416 6.64678 7.98419 6.79263 8.71744C6.93848 9.45069 7.29849 10.1242 7.82714 10.6529C8.35578 11.1815 9.02931 11.5415 9.76256 11.6874C10.4958 11.8332 11.2558 11.7584 11.9465 11.4723C12.6372 11.1862 13.2276 10.7017 13.643 10.0801C14.0583 9.45844 14.28 8.72761 14.28 7.98C14.28 7.4836 14.1822 6.99207 13.9923 6.53346C13.8023 6.07485 13.5239 5.65814 13.1729 5.30714C12.8219 4.95613 12.4052 4.6777 11.9465 4.48774C11.4879 4.29777 10.9964 4.2 10.5 4.2Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* Email field */}
            <div className="bg-[#212121] rounded-lg mt-3">
              <label className=" text-[#7E7E7E]  text-sm font-lexend p-3">
                Email
              </label>
              <div className="flex">
                <div className="flex-1">
                  <input
                    type={"email"}
                    className={
                      "text-white font-lexend text-sm p-3 rounded-lg border-none placeholder-[#7E7E7E] bg-[#212121]"
                    }
                    placeholder={"Enter your email"}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="flex-1 grow-0 mr-4 mb-1">
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
          </div>
          <div className="flex-1 w-full p-2">
            <div className="bg-[#212121] rounded-lg mt-3">
              {/* password text field */}
              <label className=" text-[#7E7E7E]  text-sm font-lexend p-3">
                Password
              </label>
              <div className="flex">
                <div className="flex-1">
                  <input
                    type={"password"}
                    className={
                      "text-white font-lexend text-sm p-3 rounded-lg border-none placeholder-[#7E7E7E] bg-[#212121]"
                    }
                    placeholder={"Enter your password"}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#212121] rounded-lg mt-3">
              {/* phone text field */}
              <label className=" text-[#7E7E7E]  text-sm font-lexend p-3">
                Phone
              </label>
              <div className="flex">
                <div className="flex-1">
                  <input
                    type={"phone"}
                    className={
                      "text-white font-lexend text-sm p-3 rounded-lg border-none placeholder-[#7E7E7E] bg-[#212121]"
                    }
                    placeholder={"Enter your phone number"}
                    onChange={handlePhoneChange}
                  />
                </div>
                <div className="flex-1 grow-0 mr-4 mb-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20ZM13.232 11.361L14.776 12.909C15.083 13.218 15.073 13.729 14.756 14.049L14.314 14.481L14.304 14.472C13.9336 14.7563 13.4936 14.9359 13.03 14.992C12.93 15.003 10.595 15.222 7.697 12.318C5.6 10.217 4.827 8.668 5.032 6.974C5.055 6.762 5.107 6.552 5.192 6.331C5.282 6.099 5.404 5.883 5.55 5.697L5.538 5.685L5.973 5.246C6.292 4.926 6.802 4.917 7.108 5.225L8.653 6.773C8.96 7.081 8.951 7.591 8.633 7.911L8.375 8.168L7.853 8.691C7.88141 8.74077 7.90941 8.79077 7.937 8.841L7.938 8.844C8.211 9.337 8.585 10.011 9.293 10.72C10.001 11.43 10.673 11.804 11.165 12.077L11.318 12.163L12.096 11.383C12.415 11.063 12.924 11.054 13.232 11.362V11.361Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Register button */}

          <div className="flex-1"></div>
        </div>
        {/* Login button */}

        <div className="flex">
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          {error ? (
            <>
              <div className="flex-1 p-2 pl-8 pr-8 mt-6">
                <div>
                  <p className="text-white font-lexend text-sm p-3 text-center">
                    {error}
                  </p>
                </div>
                <NavLink to="/">
                  <button
                    className="text-white rounded-lg font-lexend bg-[#1DB954] w-full text-sm  pt-4 pb-4"
                    onClick={createAdmin}
                  >
                    Register
                  </button>
                </NavLink>
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 p-2 pl-8 pr-8 mt-6">
                <NavLink to={link}>
                  <button
                    className="text-white rounded-lg font-lexend bg-[#1DB954] w-full text-sm  pt-4 pb-4"
                    onClick={createAdmin}
                  >
                    Register
                  </button>
                </NavLink>
              </div>
            </>
          )}

          <div className="flex-1"></div>
          <div className="flex-1"></div>
        </div>

        <div className="flex">
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1 text-center mr-10 pr-10">
            <div className="flex">
              <div className="flex-1 text-end">
                <h1 className="text-white font-lexend text-small">
                  already have an account?
                </h1>
              </div>
              <div className="flex-1 grow-0">
                <NavLink to={"/"}>
                  <h1 className="text-[#1DB954] font-lexend text-small">
                    Login
                  </h1>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
        </div>
        <hr className="w-[179px] bg-white text-center m-auto mt-7"></hr>

        <div className="flex mt-10">
          {/* Google button */}
          <div className="flex-1 text-end mr-2">
            <button className="border-[#212A39] border-[2px] rounded-lg">
              <div className="flex">
                <div className="flex-1 p-2 pl-10 grow-0">
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1118_564)">
                      <path
                        d="M28.9849 14.7706C28.9849 13.5825 28.8863 12.7155 28.6727 11.8164H14.7891V17.179H22.9385C22.7742 18.5116 21.887 20.5186 19.9153 21.8672L19.8877 22.0468L24.2774 25.3699L24.5816 25.3996C27.3747 22.8788 28.9849 19.1699 28.9849 14.7706Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M14.7892 28.9008C18.7817 28.9008 22.1335 27.6163 24.5817 25.4007L19.9154 21.8683C18.6667 22.7193 16.9908 23.3134 14.7892 23.3134C10.8788 23.3134 7.55985 20.7927 6.37675 17.3086L6.20333 17.323L1.63879 20.775L1.5791 20.9371C4.01077 25.6575 9.00562 28.9008 14.7892 28.9008Z"
                        fill="#34A853"
                      />
                      <path
                        d="M6.37688 17.3074C6.06471 16.4083 5.88404 15.4449 5.88404 14.4495C5.88404 13.4539 6.06471 12.4906 6.36045 11.5915L6.35218 11.4L1.73045 7.89258L1.57923 7.96286C0.577023 9.92169 0.00195312 12.1214 0.00195312 14.4495C0.00195312 16.7775 0.577023 18.9771 1.57923 20.9359L6.37688 17.3074Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M14.7892 5.58737C17.5659 5.58737 19.4389 6.75943 20.5069 7.7389L24.6802 3.75705C22.1171 1.42897 18.7817 0 14.7892 0C9.00562 0 4.01077 3.24324 1.5791 7.9636L6.36032 11.5923C7.55985 8.10816 10.8788 5.58737 14.7892 5.58737Z"
                        fill="#EB4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1118_564">
                        <rect width="29" height="29" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                {/* <div>
                                    <GoogleLogin
                                    
                                    clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                    buttonText = "Continue with Google"
                                    onSuccess = {handleLogin}
                                    onFailure = {handleFailure}
                                    cookiePlicy = {'single_host_origin'}
                                    >
                                            
                                        </GoogleLogin>
                                    </div> */}
                <div className="flex-1 w-45 p-2 pr-10 mt-2 ">
                  <p className="text-sm font-lexend text-white">
                    Continue with Google
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* facebook button */}

          <div className="flex-1">
            <button className="border-[#212A39] border-[2px] rounded-lg ml-2">
              <div className="flex">
                <div className="flex-1 p-2 pl-10 grow-0">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1118_569)">
                      <path
                        d="M26.4546 28C27.3079 28 27.9998 27.308 27.9998 26.4547V1.54533C27.9998 0.691673 27.3078 0 26.4546 0H1.54533C0.691673 0 0 0.691778 0 1.54533V26.4546C0 27.308 0.691673 27.9999 1.54533 27.9999H26.4546V28Z"
                        fill="#485A96"
                      />
                      <path
                        d="M19.3195 27.9996V17.1565H22.959L23.5039 12.9307H19.3194V10.2327C19.3194 9.00927 19.6591 8.17555 21.4136 8.17555L23.6512 8.1745V4.39501C23.2642 4.3436 21.9358 4.22852 20.3906 4.22852C17.1643 4.22852 14.9555 6.19778 14.9555 9.81435V12.9307H11.3066V17.1565H14.9555V27.9995H19.3195V27.9996Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1118_569">
                        <rect width="28" height="28" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="flex-1 w-45 p-2 pr-10 mt-2">
                  <p className="text-sm font-lexend text-white">
                    Continue with Facebook
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
