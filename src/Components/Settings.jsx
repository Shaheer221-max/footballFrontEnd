import React, {useState} from "react";
import Header from "./Header";

// Import React Icons
import { FiUser } from "react-icons/fi";
import { AiTwotoneLock } from "react-icons/ai";
import { BsToggleOff, BsFillPencilFill } from "react-icons/bs";

export default function Settings() {
  const [event, setevent] = useState(false);
  const [addschedule, setschedule] = useState(false);
  const [password, setPassword] = useState('');

    const changePassword = () => {
        
    }
  return (
    <div className="flex-col w-full">
      <Header title={"Settings"} />

      <div className="flex-col w-75 h-ful">
        <div className="flex-col w-7/12 h-full border-b-2 ml-7 border-white">
          <h3 className="text-green-600 pt-7 pb-7">Security</h3>
        </div>
        <div className="flex justify-between align-middle w-7/12 h-full border-b-2 ml-7 border-white cursor-pointer" onClick={() => setevent(true)}>
          <h3 className="text-white pt-7 pb-7">Change Password</h3>
          <AiTwotoneLock className="text-green-600 mt-7" />
        </div>
        <div className="w-7/12 h-ful ml-7 flex justify-between align-middle">
          <h3 className="text-white pt-7 pb-7">Change Email/Username</h3>
          <FiUser className="text-green-600 mt-7" />
        </div>

        <div className="flex-col w-7/12 h-full border-b-2 ml-7 border-white">
          <h3 className="text-green-600 pt-7 pb-7">General</h3>
        </div>
        <div className="flex justify-between align-middle w-7/12 h-full border-b-2 ml-7 border-white">
          <h3 className="text-white pt-7 pb-7">Notifications</h3>
          <BsToggleOff className="text-green-600 mt-7" />
        </div>
        <div className="flex justify-between align-middle w-7/12 h-ful ml-7">
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
                type="text"
                className="bg-[#212121]  w-full text-white text-sm rounded-lg  block  pl-10 p-2.5 mb-5 placeholder-[#7E7E7E] placeholder-lexend"
                placeholder="Enter New Password"
                required="" />
                <input
                type="text"
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
    </div>
  );
}
