import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import "../styles/font.css";
import pfp from "../assets/pfp.png";
import { NavLink } from "react-router-dom";
import axios from "../axios";

export default function VerificationCenter() {
  const [staticdata, setStaticData] = useState(false);
  const [openAddsubcatmodal, setopenAddsubcatmodal] = useState(false);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [coach, setCoach] = useState(0);
  const [playersJoined, setPlayersJoined] = useState(0);
  const [playersLeft, setPlayersLeft] = useState(0);
  const [searchPlayer, setSearchPlayer] = useState(false);
  const [search, setSearch] = useState(false);
  const [staticdataCopy, setStaticDataCopy] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(false);
  const [playersPerPage] = useState(10);
  let next = false;
  let Playerdata;
  // seting value
  const handleSearchChange = (event) => {
    // 👇 Get input value from "event"
    setSearchPlayer(event.target.value);
  };

  useEffect(() => {
    data();
  }, []);

  // getting players from database
  const data = async () => {
    console.log("in data");
    let res = await axios
      .get("https://football-backend-updated.herokuapp.com/users/GetAllPlayers")
      .then((res) => {
        console.log(res.data.data.filter((val) => val.active === "pending"));
        if (res.data.data !== res.data.data.Prototype) {
          setStaticData(
            res.data.data.filter((val) => val.active === "pending")
          );
          Playerdata = res.data.data.filter((val) => val.active === "pending");
          setPage(Playerdata);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    await axios
      .get("https://football-backend-updated.herokuapp.com/users/GetAllCoaches")
      .then((response) => {
        setCoach(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    setPage(Playerdata);
  };

  const approve = (id) => {
    axios
      .patch(
        `https://football-backend-updated.herokuapp.com/users/updateUser/${id}`,
        {
          active: "active",
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  const unapprove = (id) => {
    axios.delete(
        `https://football-backend-updated.herokuapp.com/users/deleteUser/${id}`
        )
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    }

  const setPage = (data) => {
    const current = currentPage;
    if (nextPage) {
      // current = current + 1
    }
    const indexOfLastPage = current * playersPerPage;
    const indexOfFirstPage = indexOfLastPage - playersPerPage;
    let page = [];
    page = data.slice(indexOfFirstPage, indexOfLastPage);
    setStaticData(page);
    setTotalPages(Math.ceil(data.length / playersPerPage));
    console.log("Current pages", currentPage);
    console.log(
      "Index Of 1st",
      indexOfFirstPage,
      "Last Index",
      indexOfLastPage,
      "next",
      next
    );
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      let current = currentPage;
      setCurrentPage((prev) => setCurrentPage(prev + 1));
      console.log(currentPage);
      next = true;
      data();
    }
  };

  const backPage = () => {
    if (currentPage > 1) {
      let current = currentPage;
      setCurrentPage(current - 1);
      data();
    }
  };

  // searching players
  const searchInPlayer = (e) => {
    e.preventDefault();
    setStaticDataCopy([...staticdata.filter(checkNames)]);
  };

  const checkNames = (val) => {
    console.log(staticdataCopy);
    if (val.name.toUpperCase().includes(searchPlayer.toUpperCase())) {
      return val.name;
    }
  };

  // profile
  const openProfile = (index) => {
    let arr;
    if (staticdataCopy) {
      arr = [...staticdataCopy];
    } else {
      arr = [...staticdata];
    }
    arr.map((val, ind) => {
      val.isPlayer = false;
    });
    arr[index].isPlayer = true;
    setStaticData(arr);
  };
  const closeProfile = (index) => {
    let arr;
    if (staticdataCopy) {
      arr = [...staticdataCopy];
    } else {
      arr = [...staticdata];
    }
    arr[index].isPlayer = false;
    setStaticData(arr);
  };

  return (
    <>
      <div className="flex-col w-full">
        {/* Page Header */}
        <Header title={"Verification Center"} />
        <p className="text-white text-20 font-medium ml-9 mt-[32px]">
          Approvals
        </p>
        {/* Title Of the Page */}
        <div
          className="flex-col"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="flex-row">
            <button className="self-center text-20 font-medium bg-white p-2 px-9 text-black rounded-sm whitespace-nowrap  ml-9 mt-[32px]">
              Players
            </button>
            <NavLink to="/verificationCenter/coach">
              <button className="self-center text-18 font-medium bg-green-500 p-2 px-9 rounded-sm text-white whitespace-nowrap  ml-1 mt-[32px] ">
                Coaches
              </button>
            </NavLink>
          </div>

          {/* <div className="flex-row mr-7" style={{ display: "flex" }}>
            <button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="self-center text-18 font-medium p-2 px-6 rounded-sm whitespace-nowrap  ml-4 mt-[32px] bg-blue-400 text-white"
            >
              <img
                src={require("./images/filter.png")}
                className="mr-2 w-[16px] h-[16px]"
                alt=""
              />
              Filter
            </button>
            <button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="self-center text-20 font-medium bg-green-500 p-2 rounded-sm px-6 text-white whitespace-nowrap  ml-4 mt-[32px]"
            >
              <svg
                style={{ width: 16, height: 16, marginRight: 8 }}
                className="svg-icon search-icon"
                aria-labelledby="title desc"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 19.9 19.7"
              >
                <title id="title">Search Icon</title>
                <desc id="desc">A magnifying glass icon.</desc>
                <g className="search-path" fill="none" stroke="#FFFFFF">
                  <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
                  <circle cx="8" cy="8" r="7" />
                </g>
              </svg>
              Search
            </button>
          </div> */}

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
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="bg-[#212121]  text-white p-5  text-sm rounded-lg block w-full pl-10 p-2.5   border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search Players"
                  required=""
                  onChange={handleSearchChange}
                />
              </div>

              <button
                className="inline-flex font-dm font-lexend placeholder-lexend items-center py-4 px-6 ml-4 text-sm font-normal text-white bg-green-500 rounded-[4px] "
                onClick={searchInPlayer}
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Table Of user  */}
        <div className="overflow-x-auto   font-lexend relative mx-10 my-8 font-dm rounded-xl">
          <table className="font-dm w-full text-sm text-left text-white  bg-gradient-to-r from-[#2F2F2F]/100 to-[#3A3A3A]/0 ">
            <thead className=" font-dm text-base font-normal text-white/0.81 border-[#7E7E7E] border-b">
              <tr
                className="text-center font-DM-sans"
                onClick={() => setopenAddsubcatmodal(false)}
              >
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
                <th scope="col" className="py-3 pl-2">
                  Date Applied
                </th>
                <th scope="col" className="py-3 px-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {staticdataCopy !== false ? (
                <>
                  {/* if searched */}
                  {staticdataCopy.map((object, index) => (
                    <tr className="font-dm border-[#7E7E7E] border-b text-center">
                      <th
                        scope="row"
                        className="py-4 font-medium whitespace-nowrap text-white"
                        onClick={() => setopenAddsubcatmodal(false)}
                      >
                        #{index + 1}
                      </th>
                      <td className="py-4 ">
                        <div
                          className="flex gap-2 items-center ml-7"
                          onClick={() => closeProfile(index)}
                        >
                          <img
                            className=" w-10 h-10 rounded-full "
                            src={object.image}
                          />
                          <p> {object.name} </p>
                        </div>
                      </td>
                      <td className="py-4" onClick={() => closeProfile(index)}>
                        {object.email}
                      </td>
                      <td className="py-4 " onClick={() => closeProfile(index)}>
                        {object.phone}
                      </td>
                      <td className="py-4 " onClick={() => closeProfile(index)}>
                        {object.datedjoined.split("T")[0]}
                      </td>
                      <td className="py-4 ">
                        <button onClick={() => approve(object._id)} className="bg-green-500 pl-3 pr-3 pt-1 pb-1 mr-2 rounded-sm">
                          Approve
                        </button>
                        <button onClick={() => unapprove(object._id)} className="bg-red-500 pl-3 pr-3 pt-1 pb-1 rounded-sm">
                          Un Approve
                        </button>
                      </td>

                      <td>
                        <div className="flex pl-3 gap-10 justify-center">
                          <NavLink to={"/userarea/playerprofile/profile"}>
                            <p className="text-blue-500">View Attachments</p>{" "}
                          </NavLink>
                          <div className="mt-2">
                            <svg
                              onClick={() => openProfile(index)}
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
                        </div>
                      </td>
                      {/* view profile */}
                      <tr>
                        <div
                          id="defaultModal"
                          onClick={() => closeProfile(index)}
                          className={
                            !object.isPlayer
                              ? "hidden"
                              : " flex  mt-3  bg-black/0 justify-center items-center"
                          }
                        >
                          <div
                            id="defaultModal"
                            className={
                              !object.isPlayer
                                ? "hidden"
                                : " flex absolute right-0 mb-3 mt-3  z-50 w-[150px] h-[80px]   bg-white rounded-xl justify-center content-center items-center"
                            }
                          >
                            <div className="w-full ">
                              <h5 className="text-sm text-center  mb-2 mt-3  font-medium tracking-tight font-lexend  text-[#212121] ">
                                <NavLink to={"/userarea/playerprofile/profile"}>
                                  <a href="userarea/playerprofile/profile">
                                    View Profile
                                  </a>
                                </NavLink>
                              </h5>
                              <div className="border-b-2 w-full border-[#212121]/50" />

                              <h5
                                className="text-[#212121] text-center mt-3 mb-3  text-sm font-normal font-lexend cursor-pointer  "
                                onClick={() => setopenAddsubcatmodal(false)}
                              >
                                <NavLink to={"chat"}>
                                  <a href="/chat"> chat</a>
                                </NavLink>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </tr>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {staticdata === false ? (
                    <></>
                  ) : (
                    // if not searched
                    <>
                      {staticdata.map((object, index) => (
                        <tr className="font-dm border-[#7E7E7E] border-b text-center">
                          <th
                            scope="row"
                            className="py-4 font-medium whitespace-nowrap text-white"
                            onClick={() => closeProfile(index)}
                          >
                            #{index + 1}
                          </th>
                          <td className="py-4 ">
                            <div
                              className="flex gap-2 items-center ml-7"
                              onClick={() => closeProfile(index)}
                            >
                              <img
                                className=" w-10 h-10 rounded-full "
                                src={object.image}
                              />
                              <p> {object.name} </p>
                            </div>
                          </td>
                          <td
                            className="py-4"
                            onClick={() => closeProfile(index)}
                          >
                            {object.email}
                          </td>
                          <td
                            className="py-4 "
                            onClick={() => closeProfile(index)}
                          >
                            {object.phone}
                          </td>
                          <td
                            className="py-4 "
                            onClick={() => closeProfile(index)}
                          >
                            {object.datedjoined.split("T")[0]}
                          </td>
                          <td
                            className="py-4 "
                          >
                            <button onClick={() => approve(object._id)} className="bg-green-500 pl-3 pr-3 pt-1 pb-1 mr-2 rounded-sm">
                              Approve
                            </button>
                            <button onClick={() => unapprove(object._id)} className="bg-red-500 pl-3 pr-3 pt-1 pb-1 rounded-sm">
                              Un Approve
                            </button>
                          </td>

                          <td>
                            <div className="flex pl-3 gap-10 justify-center">
                              <NavLink to={"/userarea/playerprofile/profile"}>
                                <p className="text-blue-500">
                                  View Attachments
                                </p>{" "}
                              </NavLink>
                              <div className="mt-2">
                                <svg
                                  onClick={() => openProfile(index)}
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
                            </div>
                          </td>
                          {/* view profile */}
                          <tr>
                            <div
                              id="defaultModal"
                              onClick={() => closeProfile(index)}
                              className={
                                !object.isPlayer
                                  ? "hidden"
                                  : " flex  mt-3  bg-black/0 justify-center items-center"
                              }
                            >
                              <div
                                id="defaultModal"
                                className={
                                  !object.isPlayer
                                    ? "hidden"
                                    : " flex absolute right-0 mb-3 mt-3  z-50 w-[150px] h-[80px]   bg-white rounded-xl justify-center content-center items-center"
                                }
                              >
                                <div className="w-full ">
                                  <h5 className="text-sm text-center  mb-2 mt-3  font-medium tracking-tight font-lexend  text-[#212121] ">
                                    <NavLink
                                      to={"/userarea/playerprofile/profile"}
                                    >
                                      <a href="userarea/playerprofile/profile">
                                        Remove Account
                                      </a>
                                    </NavLink>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </tr>
                        </tr>
                      ))}
                    </>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
        {/* pagination */}
        <div className="flex items-center justify-end font-lexend">
          <h4 className="self-center text-xl font-normal whitespace-nowrap text-white mr-4 my-5 ">
            Page
          </h4>
          <div onClick={backPage}>
            <svg
              width="11"
              height="19"
              viewBox="0 0 11 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3725 0.3675C9.8825 -0.1225 9.0925 -0.1225 8.6025 0.3675L0.2925 8.6775C-0.0975 9.0675 -0.0975 9.6975 0.2925 10.0875L8.6025 18.3975C9.0925 18.8875 9.8825 18.8875 10.3725 18.3975C10.8625 17.9075 10.8625 17.1175 10.3725 16.6275L3.1325 9.3775L10.3825 2.1275C10.8625 1.6475 10.8625 0.8475 10.3725 0.3675Z"
                fill="white"
              />
            </svg>
          </div>

          <h4 className="self-center text-xl font-normal whitespace-nowrap text-white ml-3 mr-4 my-5 ">
            {currentPage}
          </h4>
          <div onClick={nextPage}>
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
          </div>

          <h4 className="self-center text-xl font-normal whitespace-nowrap text-white mx-4 my-5 ">
            out of {totalPages}
          </h4>
        </div>
      </div>
    </>
  );
}
