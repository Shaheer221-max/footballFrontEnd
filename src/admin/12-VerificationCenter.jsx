import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import "../styles/font.css";
import pfp from "../assets/pfp.png";
import { NavLink } from "react-router-dom";
import axios from "../axios";
import Spinner from "./Spinner";
import { message, Modal } from "antd";

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

  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleButtonClick = (url) => {
    setImageUrl(url);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  let next = false;
  let Playerdata;
  // seting value
  const handleSearchChange = (event) => {
    // 👇 Get input value from "event"
    setSearchPlayer(event.target.value);
  };

  useEffect(() => {
    data();
  }, [staticdata]);

  // getting players from database
  const data = async () => {
    console.log("in data");
    let res = await axios
      .get(`${process.env.REACT_APP_API}/users/GetAllPlayers`)
      .then((res) => {
        // console.log(res.data.data.filter((val) => val.active === "pending"));
        // if (res.data.data !== res.data.data.Prototype) {
        //   setStaticData(
        //     res.data.data.filter((val) => val.active === "pending")
        //   );
        //   Playerdata = res.data.data.filter((val) => val.active === "pending");

        setPage(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    await axios
      .get(`${process.env.REACT_APP_API}/users/GetAllCoaches`)
      .then((response) => {
        setCoach(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    setPage(Playerdata);
  };

  const approve = (id) => {
    console.log(id);
    axios
      .put(`${process.env.REACT_APP_API}/users/updateUser/${id}`, {
        active: "active",
      })
      .then((response) => {
        message.success("Player Approved");
        console.log(response);
        const updatedData = staticdata.filter((object) => object._id !== id);
        setStaticData(updatedData);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const unapproved = (id) => {
    axios
      .put(`${process.env.REACT_APP_API}/users/updateUser/${id}`, {
        active: "pending",
      })
      .then((response) => {
        message.success("Player Un Approved");
        console.log(response);
        const updatedData = staticdata.filter((object) => object._id !== id);
        setStaticData(updatedData);
      })
      .catch((error) => {
        console.log(error.response.data);
        Modal.error({
          title: "Error",
          content: "An error occurred while deleting the player.",
        });
      });
  };

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
        <div className="h-[calc(100vh-95px)] overflow-y-auto">
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
          <table className="font-dm w-full text-sm text-left text-white bg-gradient-to-r from-[#2F2F2F]/100 to-[#3A3A3A]/0">
            <thead className="font-dm text-base font-normal text-white/0.81 border-[#7E7E7E] border-b">
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
                <th scrope="col" className="py-3 pl-2">
                  Action
                </th>
                <th scrope="col" className="py-3 pl-2">
               
                </th>
              </tr>
            </thead>
            <tbody>
              {staticdata.length > 0 || staticdataCopy.length > 0 ? (
                staticdataCopy !== false ? (
                  <>
                    {/* if searched */}
                    {staticdataCopy.map((object, index) => (
                      <tr
                        className="font-dm border-[#7E7E7E] border-b text-center"
                        key={index}
                      >
                        <th
                          scope="row"
                          className="py-4 font-medium whitespace-nowrap text-white"
                        >
                          #{index + 1}
                        </th>
                        <td className="py-4">
                          <div
                            className="flex gap-2 items-center ml-7"
                            onClick={() => closeProfile(index)}
                          >
                            <img
                              className="w-10 h-10 rounded-full"
                              src={object.image}
                              alt="User"
                            />
                            <p>{object.name}</p>
                          </div>
                        </td>
                        <td
                          className="py-4"
                          onClick={() => closeProfile(index)}
                        >
                          {object.email}
                        </td>
                        <td
                          className="py-4"
                          onClick={() => closeProfile(index)}
                        >
                          {object.phone}
                        </td>
                        <td
                          className="py-4"
                          onClick={() => closeProfile(index)}
                        >
                          {object.datedjoined.split("T")[0]}
                        </td>
                        <td
                          className="py-4"
                          onClick={() => closeProfile(index)}
                        >
                          {object.active}
                        </td>
                        <td className="py-4">
                          {/* {object.active === "active" ? ( */}
                            <button
                              onClick={() => {
                                console.log("Approve button clicked");
                                approve(object._id);
                              }}
                              className="bg-green-500 pl-3 pr-3 pt-1 pb-1 mr-2 rounded-sm"
                            >
                              Approve
                            </button>
                          {/* ) : ( */}
                            <button
                              onClick={() => {
                                console.log("Unapprove button clicked");
                                unapproved(object._id);
                              }}
                              className="bg-red-500 pl-3 pr-3 pt-1 pb-1 rounded-sm"
                            >
                              Unapprove
                            </button>
                          {/* )} */}
                        </td>
                        <td>
                          <div className="flex pl-3 gap-10 justify-center">
                            <NavLink to={"/userarea/playerprofile/profile"}>
                              <p className="text-blue-500">View Attachments</p>
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
                                  d="M9.201 5.68597e-07C9.201 -1.49611e-06 9.28085 -1.73437e-07 9.33985 4.16649e-07C9.39885 8.06735e-07 9.45885 4.22465e-07 9.51785 4.71235e-07C9.57685 5.20006e-07 9.65671 5.68597e-07 9.65671 5.68597e-07C9.65671 5.68597e-07 9.57685 5.68597e-07 9.51785 5.68597e-07C9.45885 5.68597e-07 9.39885 5.68597e-07 9.33985 5.68597e-07C9.28085 5.68597e-07 9.201 5.68597e-07 9.201 5.68597e-07Z"
                                  fill="#9CA3AF"
                                />
                                <path
                                  d="M9.201 3.73243e-07C9.201 3.73243e-07 9.28085 4.39691e-07 9.33985 3.94357e-07C9.39885 3.49024e-07 9.45885 3.0369e-07 9.51785 2.58357e-07C9.57685 2.13023e-07 9.65671 1.6769e-07 9.65671 1.6769e-07C9.65671 1.6769e-07 9.57685 2.13023e-07 9.51785 2.58357e-07C9.45885 3.0369e-07 9.39885 3.49024e-07 9.33985 3.94357e-07C9.28085 4.39691e-07 9.201 3.73243e-07 9.201 3.73243e-07Z"
                                  fill="#9CA3AF"
                                />
                                <path
                                  d="M9.201 5.68597e-07C9.201 5.68597e-07 9.28085 5.68597e-07 9.33985 5.68597e-07C9.39885 5.68597e-07 9.45885 5.68597e-07 9.51785 5.68597e-07C9.57685 5.68597e-07 9.65671 5.68597e-07 9.65671 5.68597e-07C9.65671 5.68597e-07 9.57685 5.68597e-07 9.51785 5.68597e-07C9.45885 5.68597e-07 9.39885 5.68597e-07 9.33985 5.68597e-07C9.28085 5.68597e-07 9.201 5.68597e-07 9.201 5.68597e-07Z"
                                  fill="#9CA3AF"
                                />
                              </svg>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  // if no search
                  <>
                    {staticdata.map((object, index) => (
                      <tr
                        className="font-dm border-[#7E7E7E] border-b text-center"
                        key={index}
                      >
                        <th
                          scope="row"
                          className="py-4 font-medium whitespace-nowrap text-white"
                        >
                          #{index + 1}
                        </th>
                        <td className="py-4">
                          <div
                            className="flex gap-2 items-center ml-7"
                            onClick={() => closeProfile(index)}
                          >
                            <img
                              className="w-10 h-10 rounded-full"
                              src={object.image}
                              alt="User"
                            />
                            <p>{object.name}</p>
                          </div>
                        </td>
                        <td
                          className="py-4"
                          onClick={() => closeProfile(index)}
                        >
                          {object.email}
                        </td>
                        <td
                          className="py-4"
                          onClick={() => closeProfile(index)}
                        >
                          {object.phone}
                        </td>
                        <td
                          className="py-4"
                          onClick={() => closeProfile(index)}
                        >
                          {object.datedjoined.split("T")[0]}
                        </td>
                        <td className="py-4">
                          {/* {object.active === "pending" ? ( */}
                            <button
                              onClick={() => {
                                console.log("Approve button clicked");
                                approve(object._id);
                              }}
                              className="bg-green-500 pl-3 pr-3 pt-1 pb-1 mr-2 rounded-sm"
                            >
                              Approve
                            </button>
                          {/* ) : ( */}
                            <button
                              onClick={() => {
                                console.log("Unapprove button clicked");
                                unapproved(object._id);
                              }}
                              className="bg-red-500 pl-3 pr-3 pt-1 pb-1 rounded-sm"
                            >
                              Unapprove
                            </button>
                          {/* )} */}
                        </td>
                        <td>
                          <div className="flex pl-3 gap-10 justify-center">
                            <button
                              onClick={() =>
                                handleButtonClick(
                                  object.FeeSlipPhoto // Replace with the actual image URL
                                )
                              }
                              className="text-blue-500"
                            >
                              View Attachments
                            </button>

                            <Modal
                              visible={showModal}
                              onCancel={closeModal}
                              footer={null}
                              destroyOnClose
                            >
                              <img
                                src={imageUrl}
                                alt="Attachment"
                                style={{
                                  width: "100%",
                                  maxHeight: "400px",
                                  objectFit: "contain",
                                }}
                              />
                            </Modal>
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
                                  d="M9.201 5.68597e-07C9.201 5.68597e-07 9.28085 5.68597e-07 9.33985 5.68597e-07C9.39885 5.68597e-07 9.45885 5.68597e-07 9.51785 5.68597e-07C9.57685 5.68597e-07 9.65671 5.68597e-07 9.65671 5.68597e-07C9.65671 5.68597e-07 9.57685 5.68597e-07 9.51785 5.68597e-07C9.45885 5.68597e-07 9.39885 5.68597e-07 9.33985 5.68597e-07C9.28085 5.68597e-07 9.201 5.68597e-07 9.201 5.68597e-07Z"
                                  fill="#9CA3AF"
                                />
                                <path
                                  d="M9.201 3.73243e-07C9.201 3.73243e-07 9.28085 4.39691e-07 9.33985 3.94357e-07C9.39885 3.49024e-07 9.45885 3.0369e-07 9.51785 2.58357e-07C9.57685 2.13023e-07 9.65671 1.6769e-07 9.65671 1.6769e-07C9.65671 1.6769e-07 9.57685 2.13023e-07 9.51785 2.58357e-07C9.45885 3.0369e-07 9.39885 3.49024e-07 9.33985 3.94357e-07C9.28085 4.39691e-07 9.201 3.73243e-07 9.201 3.73243e-07Z"
                                  fill="#9CA3AF"
                                />
                                <path
                                  d="M9.201 5.68597e-07C9.201 5.68597e-07 9.28085 5.68597e-07 9.33985 5.68597e-07C9.39885 5.68597e-07 9.45885 5.68597e-07 9.51785 5.68597e-07C9.57685 5.68597e-07 9.65671 5.68597e-07 9.65671 5.68597e-07C9.65671 5.68597e-07 9.57685 5.68597e-07 9.51785 5.68597e-07C9.45885 5.68597e-07 9.39885 5.68597e-07 9.33985 5.68597e-07C9.28085 5.68597e-07 9.201 5.68597e-07 9.201 5.68597e-07Z"
                                  fill="#9CA3AF"
                                />
                              </svg>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                )
              ) : (
                // if no data
                <tr>
                  <td colSpan="6" className="py-8 text-center text-white">
                    No data found
                  </td>
                </tr>
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
      </div>
    </>
  );
}
