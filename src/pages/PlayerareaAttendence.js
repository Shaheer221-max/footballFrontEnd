import React, { useState } from "react";
import Header from "../Components/Header";
import "../styles/font.css"
import pfp from "../assets/pfp.png";
import "../styles/font.css"
import axios from "axios";
export default function PlayerareaAttendence() {
  const [openAddsubcatmodal, setopenAddsubcatmodal] = useState(false);
  const [opendeletemodal, setopendeletemodal] = useState(false);
  const [players, setPlayers] = useState([]);

  const data = async () => {
    await axios
      .get("https://football-backend-updated.herokuapp.com/users/GetAllPlayers")
      .then((res) => {
        console.log(res.data.data);
        setPlayers(res.data.data);
        // setPage(res.data.data.doc);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  React.useEffect(() => {
    data();
  }, []);

  const date = new Date();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const day = date.getDate();

  return (
    <>
      <div className="flex-col w-full">
        {/* Page Header */}
        <Header title={"Players Area"} />
        {/* Title Of the Page */}
        <h4 className="self-center text-xl font-medium text-white font-lexend whitespace-nowrap  ml-9 mt-[32px] ">
          Attendance
        </h4>
        {/* Search Button  */}
        <div className="flex items-center justify-start gap-10 mx-9 my-5 font-dm">
          <form className="flex items-center w-1/2">

            <div className="relative w-full font-dm">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                className="bg-[#212121]  text-white  text-sm rounded-lg block w-full pl-10 p-2.5   border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Players"
                required=""
              />
            </div>
            <button
              type="submit"
              className="inline-flex font-dm items-center py-2 px-5 ml-4 text-sm font-normal text-white bg-green-500 rounded-[4px] "
            >
              Search
            </button>

            
          </form>
          <button
            className="text-white font-dm bg-green-500 ml-auto text-sm  focus:outline-none font-normal rounded-[4px]  px-4 py-2 text-center inline-flex items-center"
            type="button"
          >
           Group
            <svg
              className="ml-2 w-4 h-4"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
            
          </button>
        </div>
       
        {/* Header Of Table  */}
        <div className="flex items-center  mx-10 my-5 font-dm">
          <label className="text-white mr-[18px] text-xl font-dm font-normal ">
            {month} {day},{year}
          </label>
          <svg
          className=""
            width="24"
            height="27"
            viewBox="0 0 27 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.6 3.69922H3.7C2.20883 3.69922 1 4.90805 1 6.39922V25.2992C1 26.7904 2.20883 27.9992 3.7 27.9992H22.6C24.0912 27.9992 25.3 26.7904 25.3 25.2992V6.39922C25.3 4.90805 24.0912 3.69922 22.6 3.69922Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.55 1V6.4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.75 1V6.4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 11.8008H25.3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <button
            type="button"
            className="text-black bg-white ml-9 font-dm  font-normal rounded-[4px] text-base px-9 py-[6px] mr-2 "
          >
            Mark Done
          </button>
         

         
        </div>
        {/* Table Of user  */}
        <div className="overflow-x-auto   font-lexend relative mx-10 my-5 font-dm rounded-xl">
          <table className="font-dm w-full text-sm text-left text-gray-500  bg-gradient-to-r from-[#212A39]/100 to-[#3A3A3A]/0 ">
            <thead className=" font-dm text-base font-normal text-[#fffff]/0.81 uppercase  border-b">
              <tr className="text-center ">
                <th scope="col" className="py-3 pl-3">
                  Id
                </th>
                <th scope="col" className="py-3 pl-2">
                  User
                </th>
                <th scope="col" className="py-3 pl-2">
                  Email
                </th>
                <th scope="col" className="py-3 pl-2">
                  Phone
                </th>
                <th scope="col" className="py-3 pl-[256px]">
                  Status
                </th>
                <th scope="col" className="py-3 px-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {players.map((val, ind) => (
                <tr className="font-dm border-bbg-gray-800 border-gray-700 text-center">
                  <th
                    scope="row"
                    className="py-4 px-3 font-medium whitespace-nowrap text-white"
                  >
                    {ind + 1}
                  </th>
                  <td className="py-4 pl-4 ">
                    <div className="flex gap-2 items-center">
                      <img
                        className=" w-12 h-12 rounded-full"
                        src={pfp}
                        alt="Bonnie image"
                      />
                      {val.name}
                    </div>
                  </td>
                  <td className="py-4 ">{val.email}</td>
                  <td className="py-4 ">{val.phone}</td>
                  <td className="py-4 pl-[254px]">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#00B307] bg-gray-100 rounded-lg border-gray-300 focus:ring-[#00B307]  focus:ring-2"
                    />
                  </td>
                  <td>
                    <div className="flex pl-3 gap-10 items-center">
                      View Profile
                      <svg
                      onClick={() => setopenAddsubcatmodal(true)}
                        width="19"
                        height="5"
                        viewBox="0 0 19 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.201 5.68597e-08C8.91196 5.07687e-08 8.62575 0.0569305 8.35871 0.167541C8.09168 0.278152 7.84904 0.440276 7.64466 0.644658C7.44028 0.84904 7.27815 1.09168 7.16754 1.35871C7.05693 1.62575 7 1.91196 7 2.201C7 2.49004 7.05693 2.77625 7.16754 3.04329C7.27815 3.31032 7.44028 3.55296 7.64466 3.75734C7.84904 3.96172 8.09168 4.12385 8.35871 4.23446C8.62575 4.34507 8.91196 4.402 9.201 4.402C9.78474 4.40187 10.3445 4.16985 10.7572 3.75699C11.1699 3.34413 11.4016 2.78424 11.4015 2.2005C11.4014 1.61676 11.1693 1.05698 10.7565 0.644304C10.3436 0.231631 9.78374 -0.000132534 9.2 5.68597e-08H9.201ZM2.201 5.68597e-08C1.91196 5.07687e-08 1.62575 0.0569305 1.35871 0.167541C1.09168 0.278152 0.84904 0.440276 0.644658 0.644658C0.440276 0.84904 0.278152 1.09168 0.167541 1.35871C0.0569305 1.62575 0 1.91196 0 2.201C0 2.49004 0.0569305 2.77625 0.167541 3.04329C0.278152 3.31032 0.440276 3.55296 0.644658 3.75734C0.84904 3.96172 1.09168 4.12385 1.35871 4.23446C1.62575 4.34507 1.91196 4.402 2.201 4.402C2.78474 4.40187 3.34452 4.16985 3.7572 3.75699C4.16987 3.34413 4.40163 2.78424 4.4015 2.2005C4.40137 1.61676 4.16935 1.05698 3.75649 0.644304C3.34363 0.231631 2.78474 -0.000132534 2.201 5.68597e-08ZM16.201 5.68597e-08C15.912 5.07687e-08 15.6258 0.0569305 15.3587 0.167541C15.0917 0.278152 14.849 0.440276 14.6447 0.644658C14.4403 0.84904 14.2782 1.09168 14.1675 1.35871C14.0569 1.62575 14 1.91196 14 2.201C14 2.49004 14.0569 2.77625 14.1675 3.04329C14.2782 3.31032 14.4403 3.55296 14.6447 3.75734C14.849 3.96172 15.0917 4.12385 15.3587 4.23446C15.6258 4.34507 15.912 4.402 16.201 4.402C16.7847 4.40187 17.3445 4.16985 17.7572 3.75699C18.1699 3.34413 18.4016 2.78424 18.4015 2.2005C18.4014 1.61676 18.1693 1.05698 17.7565 0.644304C17.3436 0.231631 16.7847 -0.000132534 16.201 5.68597e-08Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* pagination */}
        <div className="flex items-center justify-end font-lexend">
          <h4 className="self-center text-xl font-normal whitespace-nowrap text-white mr-4 my-5 ">
            Page
          </h4>
          <svg
            width="11"
            height="19"
            viewBox="0 0 11 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.3725 0.3675C9.8825 -0.1225 9.0925 -0.1225 8.6025 0.3675L0.2925 8.6775C-0.0975 9.0675 -0.0975 9.6975 0.2925 10.0875L8.6025 18.3975C9.0925 18.8875 9.8825 18.8875 10.3725 18.3975C10.8625 17.9075 10.8625 17.1175 10.3725 16.6275L3.1325 9.3775L10.3825 2.1275C10.8625 1.6475 10.8625 0.8475 10.3725 0.3675Z"
              fill="#7E7E7E"
            />
          </svg>
          <h4 className="self-center text-xl font-normal whitespace-nowrap text-white ml-3 mr-4 my-5 ">
            1
          </h4>
          <svg
            width="11"
            height="19"
            viewBox="0 0 11 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.369687 0.3675C0.859687 -0.1225 1.64969 -0.1225 2.13969 0.3675L10.4497 8.6775C10.8397 9.0675 10.8397 9.6975 10.4497 10.0875L2.13969 18.3975C1.64969 18.8875 0.859687 18.8875 0.369687 18.3975C-0.120313 17.9075 -0.120313 17.1175 0.369687 16.6275L7.60969 9.3775L0.359689 2.1275C-0.120311 1.6475 -0.120313 0.8475 0.369687 0.3675Z"
              fill="white"
            />
          </svg>
          <h4 className="self-center text-xl font-normal whitespace-nowrap text-white mx-4 my-5 ">
            out of 22
          </h4>
        </div>
      </div>

      <div
        id="defaultModal"
        onClick={()=>setopenAddsubcatmodal(false)}
        className={!openAddsubcatmodal?"hidden":" flex absolute top-0 right-0 left-0  w-full h-screen   bg-black/0 justify-center items-center"}
      >
     <div
        id="defaultModal"
       
        className={!openAddsubcatmodal?"hidden":" flex absolute right-24 mb-3   z-50 w-[150px] h-[80px]   bg-white rounded-xl justify-center content-center items-center"}
      >
         <div className="w-full ">
                      <h5 className="text-sm text-center  mb-2 mt-3  font-medium tracking-tight font-lexend  text-[#212121] ">
                        <a href="/playerprofile/profile">View Profile</a>
                      </h5>
                      <div className="border-b-2 w-full border-[#212121]/50" />
                     
                      <h5 className="text-[#212121] text-center mt-3 mb-3  text-sm font-normal font-lexend cursor-pointer  " onClick={() => setopenAddsubcatmodal(false)} >
                      <a href="/chat"  > chat</a>
                      </h5>
                    </div>
      </div>
      </div>

      

    </>
  );
}
