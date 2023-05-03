import React, { useState } from "react";
import Header from "../Components/Header";
import "../styles/font.css";
import "../styles/font.css";
import axios from "axios";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import ReactPaginate from "react-paginate";

import { message } from "antd";

export default function PlayerareaAttendence() {
  const [openAddsubcatmodal, setopenAddsubcatmodal] = useState(false);
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const data = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/GetAllPlayers`)
      .then((res) => {
        console.log(res.data.data);
        setPlayers(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const [filter, setFilter] = useState([]);

  React.useEffect(() => {
    if (search === "") {
      setFilter(players);
      setAttendance(
        players.map((player) => ({ refOfPlayer: player._id, isPresent: false }))
      );
    } else {
      setFilter(
        players.filter((player) =>
          player.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, players]);

  const handleChangeAttendance = (index, value) => {
    const newAttendance = [...attendance];
    newAttendance[index].isPresent = value;
    setAttendance(newAttendance);
    console.log(newAttendance);
  };

  React.useEffect(() => {
    data();
  }, []);

  const date = new Date();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const day = date.getDate();

  // Pagination
  const [itemOffset, setItemOffset] = React.useState(0);
  const endOffset = itemOffset + 5;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = players.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(players.length / 5);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % players.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  // Create array of Players with their attendance
  const [attendance, setAttendance] = useState([]);

  const AddAttendance = async (id) => {
    if(todayAttendance){
      message.error("Attendance Already Marked");
      return;
    }
    console.log(attendance);
    await axios
      .post(
        `${process.env.REACT_APP_API}/attendance/MarkAttendance`,
        {
          attendance: attendance,
          isMarked: true,
        }
      )
      .then((res) => {
        setAttendance([]);
        console.log(res.data.data);
        message.success("Attendance Marked");
        getAttendance();
      })
      .catch((error) => {
        message.error("Attendance Not Marked");
        console.log(error.response.data);
      });
  };

  const [attendanceData, setAttendanceData] = useState([]);

  const getAttendance = async () => {
    const date = new Date().toISOString();
    await axios
      .get(
        `${process.env.REACT_APP_API}/attendance/GetAllAttendance`
      )
      .then((res) => {
        // Check if attendance is marked for today
        const todayAttendance = res.data.data.doc.find(
          (item) => item.date.split("T")[0] === date.split("T")[0]
        );
        if (todayAttendance) {
          setTodayAttendance(true);
        }
        console.log(todayAttendance);
        console.log(res.data.data.doc);
        setAttendanceData(res.data.data.doc);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  React.useEffect(() => {
    getAttendance();
  }, []);

  const [todayAttendance, setTodayAttendance] = useState(false);

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
                onChange={handleSearch}
              />
            </div>
            <button
              type="submit"
              className="inline-flex font-dm items-center py-2 px-5 ml-4 text-sm font-normal text-white bg-green-500 rounded-[4px] "
            >
              Search
            </button>
          </form>
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
            onClick={AddAttendance}
            // disabled={todayAttendance}
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
              </tr>
            </thead>
            <tbody>
              {filter.length > 0 ? (
                filter.map((val, ind) => (
                  <tr className="font-font-lexend border-bbg-gray-800 border-gray-700 text-center">
                    <th
                      scope="row"
                      className="py-4 px-3 font-medium whitespace-nowrap text-white"
                    >
                      {ind + 1}
                    </th>
                    <td className="py-4">
                      <div className="flex gap-2 font-lexend items-center justify-start">
                        <img
                          className=" w-12 h-12 rounded-full ml-36"
                          src={val?.image}
                          alt="Bonnie image"
                        />
                        {val.name}
                      </div>
                    </td>
                    <td className="py-4 font-lexend ">{val.email}</td>
                    <td className="py-4 font-lexend">{val.phone}</td>
                    <td className="py-4 pl-[254px]">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-[#00B307] bg-gray-100 rounded-lg border-gray-300 focus:ring-[#00B307]  focus:ring-2"
                        onChange={(e) => {
                          handleChangeAttendance(ind, e.target.checked);
                        }}
                        checked = {todayAttendance}
                        disabled={todayAttendance}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-white">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* pagination */}
        <div className="text-white justify-end flex">
          <ReactPaginate
            activeClassName={"item active "}
            breakClassName={"item break-me "}
            breakLabel={"..."}
            containerClassName={"pagination"}
            disabledClassName={"disabled-page"}
            marginPagesDisplayed={2}
            nextClassName={"item next "}
            nextLabel={
              <MdOutlineKeyboardArrowRight
                style={{ fontSize: 28, width: 150 }}
              />
            }
            onPageChange={handlePageClick}
            pageCount={pageCount}
            pageClassName={"item pagination-page "}
            pageRangeDisplayed={5}
            previousClassName={"item previous"}
            previousLabel={
              <MdOutlineKeyboardArrowLeft
                style={{ fontSize: 28, width: 150 }}
              />
            }
          />
        </div>
      </div>

      <div
        id="defaultModal"
        onClick={() => setopenAddsubcatmodal(false)}
        className={
          !openAddsubcatmodal
            ? "hidden"
            : " flex absolute top-0 right-0 left-0  w-full h-screen   bg-black/0 justify-center items-center"
        }
      >
        <div
          id="defaultModal"
          className={
            !openAddsubcatmodal
              ? "hidden"
              : " flex absolute right-24 mb-3   z-50 w-[150px] h-[80px]   bg-white rounded-xl justify-center content-center items-center"
          }
        >
          <div className="w-full ">
            <h5 className="text-sm text-center  mb-2 mt-3  font-medium tracking-tight font-lexend  text-[#212121] ">
              <a href="/playerprofile/profile">View Profile</a>
            </h5>
            <div className="border-b-2 w-full border-[#212121]/50" />

            <h5
              className="text-[#212121] text-center mt-3 mb-3  text-sm font-normal font-lexend cursor-pointer  "
              onClick={() => setopenAddsubcatmodal(false)}
            >
              <a href="/chat"> chat</a>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
