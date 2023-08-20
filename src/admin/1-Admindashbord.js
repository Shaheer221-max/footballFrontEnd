import React, { useEffect, useState, useRef } from "react";
import Calendar from "react-calendar";
import Header from "../Components/Header";
import "../styles/font.css";
import "react-calendar/dist/Calendar.css";
import "../styles/Dashboard.css";
import "../styles/background.css";
import { Link, NavLink } from "react-router-dom";
import axios from "../axios";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { io } from "socket.io-client";

import { Dropdown, Popconfirm } from "antd";
import { useSelector } from "react-redux";

import { message } from "antd";
import Spinner from "./Spinner";

// React Icons
import { MdDelete } from "react-icons/md";
import moment from "moment";

import { useDispatch } from "react-redux";
import getAge from "get-age";

export default function Dashboard() {
  const [openAddsubcatmodal, setopenAddsubcatmodal] = useState(false);
  const [opendeletemodal, setopendeletemodal] = useState(false);
  const [addschedule, setschedule] = useState(false);
  const [event, setevent] = useState(false);
  const [day, setDay, DayRef] = useState(false);
  const [month, setMonth] = useState(false);
  const [yearr, setyear] = useState(0);
  const [sceduleEvent, setSceduleEvent] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [getEvents, SetAllGetEvents] = useState([]);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  var currentyear = new Date().getFullYear();
  var year = currentyear + 7;

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state);

  const socket = useRef();

  const items = [
    {
      key: "1",
      label: (
        <a onClick={() => deleteSchedule()} className="btn btn-primary">
          Delete
        </a>
      ),
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDayChange = (event) => {
    // 👇 Get input value from "event"
    setDay(event.target.value);
    if (event.target.value > 31 || event.target.value < 1) {
      if (!event.target.value) {
        setError("Please fill date field");
      } else {
        setError("Wrong Date");
      }
    } else {
      setError(false);
    }
  };
  const handleMonthChange = (event) => {
    // 👇 Get input value from "event"
    setMonth(event.target.value);
    if (event.target.value > 12 || event.target.value < 1) {
      if (!event.target.value) {
        setError("Please fill month field");
      } else {
        setError("Wrong Month");
      }
    } else {
      setError(false);
    }
    //errorHandling()
  };
  const handleYearChange = (event) => {
    // 👇 Get input value from "event"
    setyear(event.target.value);
    if (event.target.value < 1970 || event.target.value > year) {
      if (!event.target.value) {
        setError("Please fill year field");
      } else {
        setError("Wrong Year");
      }
    } else {
      setError(false);
    }
    //errorHandling()
  };
  const handleSceduleEventChange = (event) => {
    // 👇 Get input value from "event"
    setSceduleEvent(event.target.value);
  };
  const handleTitleChange = (event) => {
    // 👇 Get input value from "event"
    setTitle(event.target.value);
  };

  const setOfDay = async (day) => {
    if (date === "" || title === "" || description === "") {
      message.error("Please fill all fields");
      return;
    } else {
      await axios
        .post(`${process.env.REACT_APP_API}/event/CreateOffday`, {
          date: date,
        })
        .then((res) => {
          message.success("Offday Added");
          setevent(false);
          setschedule(false);
        })
        .catch((error) => {
          message.error("Offday Not Added");
          setError(error.response.data);
        });
    }
  };

  const [offDays, setOffDay] = useState([]);

  const tileClassName = ({ date }) => {
    const apiDatesSet = new Set(
      offDays.map((apiDate) => new Date(apiDate).toDateString())
    );
    return apiDatesSet.has(date.toDateString()) ? "highlight" : "";
  };

  const data = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/event/getEvents`)
      .then((res) => {
        if (res.data.data !== res.data.data.Prototype) {
          SetAllGetEvents(
            res.data.data.doc.filter((data) => data.offDay == false)
          );
          SetAllGetEvents(
            res.data.data.doc
              .filter((data) => data.offDay == false)
              .sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
              })
          );
          // Set only dates not other data
          setOffDay(
            res.data.data.doc
              .filter((data) => data.offDay == true)
              .map((data) => {
                return new Date(data.date);
              })
          );
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const eventsceduling = async () => {
    setRefresh(false);
    if (date === "" || title === "" || description === "") {
      message.error("Please fill all fields");
      return;
    }
    await axios
      .post(`${process.env.REACT_APP_API}/event/CreateEvent`, {
        // date: `${day}-${month}-${yearr}`,
        date: date,
        title: title,
        description: description,
      })
      .then((res) => {
        message.success("Event Added");
        setRefresh(true);
        setevent(false);
        setschedule(false);
        setError(false);
      })
      .catch((error) => {
        message.error("Something went wrong");
        setError(error.response.data);
        console.log(error.response.data);
      });
  };

  const onChange = (date) => {
    // setschedule(true);
    setevent(true);
    setDate(date);
  };

  useEffect(() => {
    data();
  }, [refresh]);

  const deleteSchedule = async (id) => {
    setRefresh(false);
    await axios
      .delete(`${process.env.REACT_APP_API}/event/DeleteEvent/${id}`)
      .then((res) => {
        message.success("Event Deleted");
        setRefresh(true);
      })
      .catch((error) => {
        message.error("Something went wrong");
        console.log(error.response.data);
      });
  };

  const [player, setPlayer] = useState();

  const item = [
    {
      key: "1",
      label: (
        <Link
          to={{ pathname: "/userarea/playerprofile/profile" }}
          state={player}
        >
          <button>View Profile</button>
        </Link>
      ),
    },
    // {
    //   key: "2",
    //   label: (
    //     <button>
    //       Remove from Dashboard
    //     </button>
    //   ),
    // },
  ];

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    socket.current = io(`https://footballsocketioforchat.herokuapp.com`);
    const obj = { current: socket.current };
    console.log("Socket: ", obj);
    dispatch({ type: "SOCKET", payload: obj });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user?.user?._id);
  }, []);

  // Get Top Prospect

  const [topProspect, setTopProspect] = useState([]);
  const getTopProspect = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/evaluation/GetTopProspects`)
      .then((res) => {
        const uniquePlayersMap = {};

        const uniqueTopProspects = res.data.data.reduce((acc, prospect) => {
          const playerId = prospect.refOfPlayer.id;

          if (!uniquePlayersMap[playerId]) {
            uniquePlayersMap[playerId] = true;
            acc.push(prospect);
          }

          return acc;
        }, []);
        setTopProspect(uniqueTopProspects);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // Get Top Prospect
  React.useEffect(() => {
    getTopProspect();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="flex-col w-full">
        {/* Page Header */}
        <Header title={"Dashboard"} />
        <div className="h-[calc(100vh-95px)] overflow-y-auto">
          <div className="flex m-9">
            <div className="w-full " style={{ width: "100%" }}>
              {/* calender */}
              <h4 className="self-center  text-xl font-medium whitespace-nowrap   mb-9 text-white font-lexend">
                Calendar
              </h4>
              <div>
                <Calendar
                  className="bg-gray-400 text-red-500"
                  calendarType="Arabic"
                  onChange={onChange}
                  value={date}
                  minDate={new Date()}
                  tileClassName={tileClassName}
                />
              </div>
              {/* Cards Upcoming schedule */}
              <h4 className="self-center lexend text-white text-xl font-semibold whitespace-nowrap mt-10 mb-9 ">
                Upcoming Schedule
              </h4>
              <div className="grid grid-cols-2 gap-4 pr-4 lg:mt-[36px] ">
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={deleteSchedule}>Delete Schedule</MenuItem>
                </Menu>

                {getEvents.length > 0 ? (
                  getEvents?.map((val, ind) => (
                    <div
                      key={ind}
                      className="schedule flex py-1 pr-[0px] w-full h-full  rounded-xl relative  shadow-md bg-gray-800 "
                      style={{ width: "100%" }}
                    >
                      <div className=" border-4 rounded-r-full  border-green-500 mr-5 my-4"></div>
                      <div>
                        <h5 className="mb-2 mt-3 text-[16px] leading-5 lexend font-normal text-white">
                          {val.title}
                        </h5>

                        <p className="lexend text-white mt-2 mb-3 font-light text-sm ">
                          {val.description}
                        </p>
                        <div className="flex mb-4 gap-36 items-center mt-2">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <svg
                              width="20px"
                              height="20px"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17 2H16V1C16 0.4 15.6 0 15 0C14.4 0 14 0.4 14 1V2H6V1C6 0.4 5.6 0 5 0C4.4 0 4 0.4 4 1V2H3C1.3 2 0 3.3 0 5V6H20V5C20 3.3 18.7 2 17 2ZM0 17C0 18.7 1.3 20 3 20H17C18.7 20 20 18.7 20 17V8H0V17ZM15 10C15.6 10 16 10.4 16 11C16 11.6 15.6 12 15 12C14.4 12 14 11.6 14 11C14 10.4 14.4 10 15 10ZM15 14C15.6 14 16 14.4 16 15C16 15.6 15.6 16 15 16C14.4 16 14 15.6 14 15C14 14.4 14.4 14 15 14ZM10 10C10.6 10 11 10.4 11 11C11 11.6 10.6 12 10 12C9.4 12 9 11.6 9 11C9 10.4 9.4 10 10 10ZM10 14C10.6 14 11 14.4 11 15C11 15.6 10.6 16 10 16C9.4 16 9 15.6 9 15C9 14.4 9.4 14 10 14ZM5 10C5.6 10 6 10.4 6 11C6 11.6 5.6 12 5 12C4.4 12 4 11.6 4 11C4 10.4 4.4 10 5 10ZM5 14C5.6 14 6 14.4 6 15C6 15.6 5.6 16 5 16C4.4 16 4 15.6 4 15C4 14.4 4.4 14 5 14Z"
                                fill="#1DB954"
                              />
                            </svg>
                            <p className="text-[15px] leading-5 lexend  font-light ml-3   text-gray-400">
                              {val.date.split("T")[0]}
                            </p>
                          </div>
                          {/* <Dropdown
                        menu={{
                          items,
                        }}
                        placement="bottomLeft"
                        trigger={["click"]}
                      >
                        <button
                          onClick={(event) => {
                            setscheduleId(val._id);
                          }}
                          className="ml-auto"
                        >
                          <svg
                            className="ml-auto"
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
                        </button>
                      </Dropdown> */}

                          <Popconfirm
                            title="Delete Schedule"
                            description="Are you sure to delete this Schedule?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => deleteSchedule(val._id)}
                            className="ml-auto absolute right-5"
                            okButtonProps={{ className: "bg-red-500" }}
                          >
                            <MdDelete className="ml-auto text-2xl text-red-500 cursor-pointer" />
                          </Popconfirm>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <Spinner />
                )}
              </div>
            </div>

            <div className="w-full font-lexend">
              {/* Cards Top Prospects */}
              <h4 className="self-center text-xl font-lexend font-normal whitespace-nowrap  mb-9 text-white">
                Top Prospects
              </h4>
              <div className="grid grid-cols-2 gap-3.5  ">
                {topProspect?.map((val, ind) => {
                  return (
                    <div
                      key={ind}
                      className="prospects flex p-3 max-w-sm font-lexend w-full h-full  rounded-lg border  shadow-md  bg-gray-800 border-gray-700 "
                    >
                      <div className="w-full">
                        <div className="flex ">
                          <img
                            className=" w-12 h-12 rounded-full "
                            src={val?.refOfPlayer?.image}
                            alt="Bonnie image"
                          />
                          <div className="ml-4">
                            <h5 className="text-xl font-medium tracking-tight  text-white font-lexend">
                              {val.refOfPlayer?.name}
                            </h5>
                            <p className="text-[#7e7e7e] mt-1 text-base font-light font-lexend  ">
                              {val?.refOfPlayer?.email}
                            </p>
                          </div>
                          {/* <Dropdown
                          menu={{
                            items: item,
                          }}
                          placement="bottomRight"
                          trigger="click"
                        >
                          <svg
                            onClick={() => setPlayer(val?.refOfPlayer)}
                            className="ml-auto cursor-pointer"
                            width="6"
                            height="25"
                            viewBox="0 0 6 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 12.5003C6 12.1077 5.9224 11.7188 5.77164 11.356C5.62087 10.9932 5.3999 10.6636 5.12132 10.3859C4.84274 10.1082 4.51203 9.88799 4.14805 9.73771C3.78407 9.58744 3.39397 9.51009 3 9.51009C2.60603 9.51009 2.21593 9.58744 1.85195 9.73771C1.48797 9.88799 1.15726 10.1082 0.87868 10.3859C0.600105 10.6636 0.379125 10.9932 0.228361 11.356C0.0775971 11.7188 4.24432e-07 12.1077 4.07267e-07 12.5003C0.000181094 13.2934 0.316424 14.0539 0.879161 14.6146C1.4419 15.1752 2.20503 15.4901 3.00068 15.4899C3.79633 15.4897 4.55932 15.1745 5.1218 14.6136C5.68428 14.0527 6.00018 13.292 6 12.499L6 12.5003ZM6 2.99025C6 2.59756 5.9224 2.20872 5.77164 1.84593C5.62087 1.48313 5.3999 1.15349 5.12132 0.875823C4.84274 0.598153 4.51203 0.377893 4.14805 0.227619C3.78407 0.0773449 3.39397 -1.13913e-07 3 -1.31134e-07C2.60603 -1.48355e-07 2.21593 0.0773448 1.85195 0.227619C1.48797 0.377893 1.15726 0.598152 0.878681 0.875822C0.600105 1.15349 0.379126 1.48313 0.228362 1.84593C0.0775975 2.20872 8.40131e-07 2.59756 8.22967e-07 2.99025C0.00018151 3.78331 0.316425 4.54382 0.879162 5.10447C1.4419 5.66512 2.20503 5.97999 3.00068 5.97981C3.79633 5.97963 4.55932 5.66442 5.1218 5.10351C5.68428 4.5426 6.00018 3.78331 6 2.99025ZM6 22.0104C6 21.6178 5.9224 21.2289 5.77164 20.8661C5.62087 20.5033 5.3999 20.1737 5.12132 19.896C4.84274 19.6183 4.51203 19.3981 4.14805 19.2478C3.78407 19.0975 3.39396 19.0202 3 19.0202C2.60603 19.0202 2.21593 19.0975 1.85195 19.2478C1.48797 19.3981 1.15726 19.6183 0.87868 19.896C0.600104 20.1737 0.379125 20.5033 0.228361 20.8661C0.0775967 21.2289 8.73244e-09 21.6177 -8.43228e-09 22.0104C0.000180678 22.8035 0.316424 23.564 0.879161 24.1247C1.4419 24.6853 2.20503 25.0002 3.00068 25C3.79633 24.9998 4.55932 24.6846 5.1218 24.1237C5.68428 23.5628 6.00018 22.8035 6 22.0104Z"
                              fill="white"
                            />
                          </svg>
                        </Dropdown> */}
                        </div>
                        <div className="flex gap-3 mt-9 items-center">
                          {/* <div className="ml-2">
                          <h5 className="text-sm font-light leading-5 tracking-tight text-white ">
                            Age
                          </h5>
                          <p className=" text-sm font-light text-center text-[#7e7e7e] ">
                            {val?.dateOfBirth
                              ? getAge(val?.dateOfBirth?.split("T")[0])
                              : "N/A"}
                          </p>
                        </div> */}
                          {/* <div>
                          <h5 className="text-sm font-light leading-5 tracking-tight text-white ">
                            Position
                          </h5>
                          <p className="text-sm font-light text-center text-[#7e7e7e] lexend ">
                            {val?.refOfPlayer?.position}
                          </p>
                        </div> */}
                          <div>
                            <h5 className="text-sm font-light tracking-tight text-white ">
                              Avg Marks
                            </h5>
                            <p className=" text-sm text-center font-light text-[#7e7e7e] font-lexend ">
                              {Math.round(val?.avgScore)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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
              : " flex relative top-[60px] right-[600px]  z-50 w-52 h-24   bg-white rounded-xl justify-center content-center items-center"
          }
        >
          <div className="w-full">
            <h5 className="text-sm text-center  mb-4 mt-4 font-medium tracking-tight font-lexend  text-[#212121] ">
              <NavLink to={"/userarea/playerprofile/profile"}>
                <a href="/userarea/playerprofile/profile">View Profile</a>
              </NavLink>
            </h5>
            <div className="border-b-2 w-full border-[#212121]/50" />

            <h5
              className="text-[#212121] text-center mt-4 mb-4 text-sm font-normal font-lexend cursor-pointer  "
              onClick={() => setopenAddsubcatmodal(false)}
            >
              <a onClick={() => setopendeletemodal(true)}>
                {" "}
                Remove from Dashboard
              </a>
            </h5>
          </div>
        </div>
      </div>

      <div
        id="defaultModal"
        onClick={() => setopendeletemodal(false)}
        className={
          !opendeletemodal
            ? "hidden"
            : " flex absolute top-0 right-0 left-0  w-full h-screen   bg-black/90 justify-center items-center"
        }
      >
        <div className="relative p-4 w-full max-w-xl  ">
          <div className="relative bg-gradient-to-r from-[#000000]/24 to-[#000000]/81 backdrop-blur-[5px]  border-[border] border-2   rounded-2xl px-4 py-2">
            <button
              onClick={() => setopendeletemodal(false)}
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
            <h3 className="text-lg text-center font-lexend font-bold text-white">
              Confirmation
            </h3>

            <div className="p-3 ">
              <h3 className="text-lg text-center font-lexend font-normal text-white">
                Are you sure you want to delete Huzayfah?
              </h3>
            </div>
            <div className="flex items-center justify-center gap-3 mt-2 mb-10">
              <button className="inline-flex items-center py-2 px-7  text-sm font-medium text-black bg-white rounded-[4px] ">
                Delete
              </button>
              <button className="inline-flex items-center py-2 px-7  text-sm font-medium text-white bg-green-500 rounded-[4px] ">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* set date popup */}
      <div
        id="defaultModal"
        className={
          !addschedule
            ? "hidden"
            : " flex absolute top-0 right-0 left-0 z-50 w-full h-full  bg-black/70  bg-opacity-5 justify-center items-center"
        }
      >
        <div className="relative p-4 w-full max-w-lg  ">
          <div className="relative bg-gradient-to-r from-[#000000]/24 to-[#000000]/81 backdrop-blur-[5px]  border-[border] border-2   rounded-2xl px-4 py-2">
            <button
              onClick={() => setschedule(false)}
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
              Schedule event from the calender
            </h3>

            <div className="flex justify-center p-3 ">
              <input
                type="number"
                className="bg-[#808080]  text-white text-sm rounded-lg placeholder-lexend block  pl-10 p-2.5 mb-5 placeholder-white"
                placeholder="Day"
                required=""
                min="1"
                max="31"
                onChange={handleDayChange}
              />
              <input
                type="number"
                className="bg-[#808080]  text-white text-sm rounded-lg  placeholder-lexend  pl-10 p-2.5 mb-5 ml-3 placeholder-white"
                placeholder="Month"
                required=""
                min="1"
                max="12"
                onChange={handleMonthChange}
              />
              <input
                type="number"
                className="bg-[#808080] placeholder-lexend text-white text-sm rounded-lg  block  pl-10 p-2.5 mb-5 ml-3 placeholder-white"
                placeholder="Year"
                required=""
                min={1970}
                max={year}
                onChange={handleYearChange}
              />
            </div>
            {error ? (
              <>
                <div className="ml-10 pl-5 text-red-600 text-lg">{error}</div>
              </>
            ) : (
              <></>
            )}
            <div className="flex items-center justify-center my-2">
              <button
                onClick={setOfDay}
                className="inline-flex font-lexend mb-12 items-center py-2.5 px-8  text-sm font-normal text-white bg-green-500 rounded-[4px] m-2"
              >
                Set of Day
              </button>
              <button
                onClick={setevent}
                className="inline-flex font-lexend mb-12 items-center py-2.5 px-8  text-sm font-normal bg-white rounded-[4px] m-2"
              >
                Set Event
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* set event popup */}
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
              Schedule event from the calender
            </h3>

            <div className="justify-center p-3 ">
              <input
                type="text"
                className="bg-[#212121]  w-full text-white text-sm rounded-lg  block  pl-10 p-2.5 mb-5 placeholder-[#7E7E7E] placeholder-lexend"
                placeholder="Title"
                required=""
                onChange={handleTitleChange}
              />
              <textarea
                className="bg-[#212121]  w-full h-40 text-white text-sm rounded-lg  block  pl-10 p-2.5 mb-5 placeholder-[#7E7E7E] placeholder-lexend"
                placeholder="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
            {error ? (
              <>
                <div className="text-red-600 ml-2 text-lg">
                  Event canot be empty!
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="flex items-center justify-center my-2">
              <button
                onClick={eventsceduling}
                className="inline-flex font-lexend mb-12 items-center py-2.5 px-8  text-sm font-normal text-white bg-green-500 rounded-[4px] m-2"
              >
                Set Event
              </button>
              <button
                onClick={setOfDay}
                className="inline-flex font-lexend mb-12 items-center py-2.5 px-8  text-sm font-normal text-black bg-white rounded-[4px] m-2"
              >
                Set Off Day
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
