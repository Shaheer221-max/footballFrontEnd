import React, { useState } from "react";
import Header from "./Header";

// Import React Icons
import { FiUser } from "react-icons/fi";
import { AiTwotoneLock } from "react-icons/ai";
import { BsToggleOff, BsFillPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

const Modal = ({ notifications, onClose }) => {
  return (
    <div className="fixed inset-0  flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-black p-6 rounded-lg overflow-y-scroll mb-10 mt-10 h-[450px]">
        <h2 className="text-xl text-white font-bold mb-4">Notifications</h2>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index} className="mb-4">
              <h3 className="font-bold text-white mb-1">{notification.Content}</h3>
              <hr></hr>
            </li>
          ))}
        </ul>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function Settings() {
  const [event, setevent] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openPic, setOpenPic] = useState(false);
  const [addschedule, setschedule] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setNewPassword] = useState("");
  const [oldPasword, setOldPassword] = useState("");
  const [url, setUrl] = useState("");
  const [notifications, setNotifications] = useState([])
  const [showModal, setShowModal] = useState(false);

  const user = useSelector((state) => state.user);
  console.log(user.user);

  const token = localStorage.getItem("token");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  const changePassword = async () => {
    console.log(user.user, user.user.email, password, token);
    await axios
      .put(
        `${process.env.REACT_APP_API}/users/updatePassword`,
        {
          password: oldPasword,
          email: user.user.email,
          newpassword: password,
          confirmPassword: confirmPassword,
        }
      )
      .then((res) => {
        message.success("Password Changed Successfully");
        console.log(res.data);
        setevent(false);
        setschedule(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "player_image");
    //data.append("cloud_name","dyapmvalo");
    axios
      .post("https://api.cloudinary.com/v1_1/dyapmvalo/image/upload", data)
      .then(async (res) => {
        setUrl(res.data.url);
        await axios
          .put(
            `${process.env.REACT_APP_API}/users/updateUser/${user.user._id}`,
            {
              image: res.data.url,
            }
          )
          .then((res) => {
            getUser();
            message.success("Profile Picture Changed Successfully");
            setOpenPic(false);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeEmail = async () => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/users/updateUser/${user.user._id}`,
        {
          email,
        }
      )
      .then((res) => {
        message.success("Email Changed Successfully");
        getUser();
        console.log(res.data);
        setevent(false);
        setschedule(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dispatch = useDispatch();

  const getCoachNotifications = async() => {
      await axios.get(`${process.env.REACT_APP_API}/generalnotification/GetCoachesAllGeneralNotifications`)
      .then((res) => {
        setNotifications(res.data.data)
      })
      .catch((err) => console.log("err"))

    
  }

  const getUser = async () => {
    if (token) {
      const user = await axios.get(
        `${process.env.REACT_APP_API}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "GET_USER", payload: user.data.data.doc });
    }
  };

  React.useEffect(() => {
    getUser();
    getCoachNotifications()
  }, [dispatch]);
  return (
    <div className="flex-col w-full">
      <Header title={"Settings"} />

      <div className="flex-col w-75 h-ful">
        <div className="flex-col w-7/12 h-full border-b-2 ml-7 border-white">
          <h3 className="text-green-600 pt-7 pb-7">Security</h3>
        </div>
        <div
          className="flex justify-between align-middle w-7/12 h-full border-b-2 ml-7 border-white cursor-pointer"
          onClick={() => setevent(true)}
        >
          <h3 className="text-white pt-7 pb-7">Change Password</h3>
          <AiTwotoneLock className="text-green-600 mt-7" />
        </div>
        <div
          className="w-7/12 h-ful ml-7 cursor-pointer flex justify-between align-middle"
          onClick={() => setOpenEmail(true)}
        >
          <h3 className="text-white pt-7 pb-7">Change Email/Username</h3>
          <FiUser className="text-green-600 mt-7" />
        </div>

        <div className="flex-col w-7/12 h-full border-b-2 ml-7 border-white">
          <h3 className="text-green-600 pt-7 pb-7">General</h3>
        </div>
        <Link>
          <div onClick={openModal} className="flex justify-between align-middle w-7/12 h-full border-b-2 ml-7 border-white">
            <h3 className="text-white pt-7 pb-7">Notifications</h3>
            <BsToggleOff className="text-green-600 mt-7" />
          </div>
        </Link>
        <div
          className="flex justify-between align-middle w-7/12 h-ful ml-7 cursor-pointer"
          onClick={() => setOpenPic(true)}
        >
          <h3 className="text-white pt-7 pb-7">Change Profile Picture</h3>
          <BsFillPencilFill className="text-green-600 mt-7" />
        </div>
      </div>

      <div
        id="defaultModal"
        className={
          !event
            ? "hidden"
            : " flex absolute top-0 right-0 left-0 z-50 w-full h-full  bg-black/70  bg-opacity-5 justify-center items-center"
        }
      >
        <div className="relative p-4 w-full max-w-lg  ">
          <div className="relative bg-gradient-to-r from-[#000000]/24 to-[#000000]/81 backdrop-blur-[5px]  border-[border] border-2   rounded-2xl px-4 py-2">
            <button
              onClick={() => !setevent(false) + !setschedule(false)}
              type="button"
              className="text-gray-400 bg-white bg-transparent rounded-full  p-0.5 ml-auto flex items-center "
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <h3 className="text-lg mt-4 mb-4 text-center font-normal font-lexend text-white">
              Changing Password
            </h3>

            <div className="justify-center p-3 ">
              <input
                type="password"
                className="bg-[#212121]  w-full text-white text-sm rounded-lg  block  pl-10 p-2.5 mb-5 placeholder-[#7E7E7E] placeholder-lexend"
                placeholder="Enter Old Password"
                required=""
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <input
                type="password"
                className="bg-[#212121]  w-full text-white text-sm rounded-lg  block  pl-10 p-2.5 mb-5 placeholder-[#7E7E7E] placeholder-lexend"
                placeholder="Enter New Password"
                required=""
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                className="bg-[#212121]  w-full text-white text-sm rounded-lg  block  pl-10 p-2.5 mb-5 placeholder-[#7E7E7E] placeholder-lexend"
                placeholder="Confirm New Password"
                required=""
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-center my-2">
              <button
                onClick={() => changePassword()}
                className="inline-flex font-lexend mb-12 items-center py-2.5 px-8  text-sm font-normal text-white bg-green-500 rounded-[4px] m-2"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id="defaultModal"
        className={
          !openEmail
            ? "hidden"
            : " flex absolute top-0 right-0 left-0 z-50 w-full h-full  bg-black/70  bg-opacity-5 justify-center items-center"
        }
      >
        <div className="relative p-4 w-full max-w-lg  ">
          <div className="relative bg-gradient-to-r from-[#000000]/24 to-[#000000]/81 backdrop-blur-[5px]  border-[border] border-2   rounded-2xl px-4 py-2">
            <button
              onClick={() => !setOpenEmail(false)}
              type="button"
              className="text-gray-400 bg-white bg-transparent rounded-full  p-0.5 ml-auto flex items-center "
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <h3 className="text-lg mt-4 mb-4 text-center font-normal font-lexend text-white">
              Changing Email
            </h3>

            <div className="justify-center p-3 ">
              <input
                type="email"
                className="bg-[#212121]  w-full text-white text-sm rounded-lg  block  pl-10 p-2.5 mb-5 placeholder-[#7E7E7E] placeholder-lexend"
                placeholder="Enter New Email"
                required=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-center my-2">
              <button
                onClick={() => changeEmail()}
                className="inline-flex font-lexend mb-12 items-center py-2.5 px-8  text-sm font-normal text-white bg-green-500 rounded-[4px] m-2"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id="defaultModal"
        className={
          !openPic
            ? "hidden"
            : " flex absolute top-0 right-0 left-0 z-50 w-full h-full  bg-black/70  bg-opacity-5 justify-center items-center"
        }
      >
        <div className="relative p-4 w-full max-w-lg  ">
          <div className="relative bg-gradient-to-r from-[#000000]/24 to-[#000000]/81 backdrop-blur-[5px]  border-[border] border-2   rounded-2xl px-4 py-2">
            <button
              onClick={() => !setOpenPic(false)}
              type="button"
              className="text-gray-400 bg-white bg-transparent rounded-full  p-0.5 ml-auto flex items-center "
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <h3 className="text-lg mt-4 mb-4 text-center font-normal font-lexend text-white">
              Change Profile Picture
            </h3>

            <div
              className="justify-center mt-4"
              style={{ display: "flex", alignSelf: "center" }}
            >
              <img
                src={url ? url : user?.user?.image}
                alt=""
                className="w-[128px] h-[128px] rounded-full justify-center"
              />
            </div>
            <div
              className="justify-center p-3 mt-3"
              style={{ display: "flex", alignSelf: "center" }}
            >
              <label htmlFor="files" className="cursor-pointer inline-flex font-lexend mb-12 justify-center items-center py-2.5 px-8  text-sm font-normal text-white bg-green-500 rounded-[4px] m-2">
                Upload Profile Picture
              </label>
              <input
                type="file"
                name="file"
                id="files"
                style={{ display: "none" }}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal notifications={notifications} onClose={closeModal} />
      )}
    </div>
  );
}
