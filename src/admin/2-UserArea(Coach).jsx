import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import "../styles/font.css";
import "../styles/background.css";
import { Link, NavLink } from "react-router-dom";
import axios from "../axios";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ReactPaginate from "react-paginate";

// React Icons
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function UserAreaCoach() {
  const [data, setData] = useState([]);
  const [openAddsubcatmodal, setopenAddsubcatmodal] = useState(false);
  const [coach, setCoach] = useState(0);
  const [search, setSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  // getting players from database
  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/GetAllCoaches`)
      .then((res) => {
        console.log(res.data.data);
        setCoach(res.data.result);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (search == "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) => {
          return item.name.toLowerCase().includes(search.toLowerCase());
        })
      );
    }
  }, [search, data]);

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 5;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = filteredData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredData.length / 5);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % filteredData.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="flex-col w-full">
        <Header title={"User Area"} />
        <div
          className="flex-row"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="flex-row">
            <button className="self-center text-18 font-medium  text-white whitespace-nowrap  ml-9 mt-[32px] ">
              Coaches
            </button>
            <NavLink to="/userarea/">
              <button className="self-center text-18 font-medium bg-green-500 p-2 rounded-md text-white whitespace-nowrap  ml-9 mt-[32px] ">
                View Players
              </button>
            </NavLink>
          </div>
        </div>

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
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                className="bg-[#212121]  text-white p-5  text-sm rounded-lg block w-full pl-10 p-2.5   border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Players"
                required=""
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              className="inline-flex font-dm font-lexend placeholder-lexend items-center py-4 px-6 ml-4 text-sm font-normal text-white bg-green-500 rounded-[4px] "
              // onClick={searchInPlayer}
            >
              Search
            </button>
          </form>
        </div>

        {/* Header Of Table  */}
        <div className="flex mx-10 mt-10">
          <div className="mx-2 w-64 ">
            <div className="flex rounded-lg text-lg text-left text-white  bg-zinc-800 p-18">
              <div className="mt-3 ml-2 mb-3 pt-3 pb-3 pl-3">
                <svg
                  width="78"
                  height="78"
                  viewBox="0 0 78 78"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="39" cy="39" r="39" fill="#FF7878" />
                  <path
                    d="M58.9993 39.4971C59.0932 25.5439 44.9713 15.5253 31.7914 20.1357C12.8142 26.9145 13.6276 53.5759 32.96 59.2201C45.849 62.9343 59.1137 52.8924 58.9993 39.4971ZM53.1518 36.4625C52.3586 35.8863 52.0283 34.8598 52.3313 33.9273V33.9273C52.9242 32.1031 55.2747 31.8319 55.8858 33.6502C55.9962 33.9787 56.0971 34.3104 56.1885 34.6449C56.6811 36.4476 54.6638 37.5609 53.1518 36.4625V36.4625ZM45.7841 23.1071V23.1071C45.9969 22.9624 46.2413 22.8575 46.4731 22.9695C48.583 23.9886 50.4707 25.3991 52.0514 27.1398C52.19 27.2924 52.1852 27.5164 52.1237 27.7132V27.7132L50.4056 32.9998C49.9749 34.3251 48.9706 35.3862 47.671 35.889V35.889C46.2036 36.4567 44.5485 36.241 43.2756 35.3162L41.5373 34.0532C40.2793 33.1391 39.5348 31.678 39.5348 30.1229V30.1229C39.5348 28.5677 40.2793 27.1066 41.5374 26.1925L45.7841 23.1071ZM42.8773 41.5976C42.2578 43.5045 40.4807 44.7959 38.4758 44.7959V44.7959C36.4707 44.7959 34.6936 43.5046 34.0742 41.5975V41.5975C33.4549 39.6908 34.1339 37.6018 35.7558 36.4234V36.4234C37.3779 35.2449 39.5745 35.2448 41.1965 36.4234V36.4234C42.8183 37.6019 43.4968 39.691 42.8773 41.5976V41.5976ZM39.0433 21.1493C41.0298 21.2101 41.4977 23.6031 39.8898 24.7713V24.7713C39.0466 25.384 37.9047 25.3841 37.0614 24.7714V24.7714C35.4535 23.6033 35.9216 21.2103 37.9081 21.1493C38.2864 21.1377 38.665 21.1377 39.0433 21.1493ZM30.4777 22.9701C30.7091 22.858 30.954 22.9622 31.1665 23.1071V23.1071L35.414 26.1928C36.672 27.1067 37.4164 28.5676 37.4164 30.1225V30.1225C37.4164 31.6774 36.672 33.1383 35.4141 34.0522L33.6749 35.3157C32.4021 36.2404 30.7469 36.4561 29.2796 35.8884V35.8884C27.9799 35.3855 26.9756 34.3244 26.5449 32.9991L24.8268 27.7125V27.7125C24.7642 27.521 24.7611 27.299 24.8956 27.149C26.4603 25.4032 28.3696 23.9917 30.4777 22.9701ZM23.7989 36.4624C22.2871 37.5605 20.27 36.4474 20.7624 34.6449C20.8538 34.3104 20.9547 33.9788 21.065 33.6504C21.6759 31.8321 24.0264 32.1033 24.6193 33.9275V33.9275C24.9223 34.8598 24.592 35.8863 23.7989 36.4624V36.4624ZM20.7124 44.2236C20.2877 42.6241 21.1118 41.0326 22.4506 40.0599L24.4884 38.5795C25.7612 37.6548 27.4163 37.4391 28.8835 38.0068V38.0068C30.1833 38.5097 31.1876 39.5709 31.6182 40.8963L32.4598 43.4867C32.8983 44.8366 32.6363 46.3161 31.761 47.4333V47.4333C30.9529 48.4648 29.7154 49.0673 28.4051 49.0673H25.6728C23.8994 49.0673 22.2113 48.1476 21.5133 46.5174C21.1929 45.7689 20.9183 44.9993 20.7124 44.2236ZM27.5041 54.21C26.1008 53.1623 26.9778 51.1857 28.729 51.1857V51.1857C29.6207 51.1857 30.4131 51.7599 30.6885 52.608V52.608C31.2216 54.2492 29.6473 55.6824 28.2172 54.7166C27.9756 54.5534 27.7378 54.3845 27.5041 54.21ZM37.2995 57.817C35.5351 57.7041 34.1431 56.3829 33.5968 54.7014L32.8799 52.4949C32.4414 51.145 32.7033 49.6655 33.5786 48.5483V48.5483C34.3868 47.5168 35.6243 46.9143 36.9346 46.9143H40.016C41.3263 46.9143 42.5638 47.5168 43.3719 48.5483V48.5483C44.2472 49.6655 44.5092 51.145 44.0706 52.4949L43.354 54.7007C42.8076 56.3826 41.4151 57.7039 39.6503 57.8169C38.8674 57.8671 38.0821 57.8671 37.2995 57.817ZM48.7326 54.7168C47.3025 55.6826 45.7282 54.2494 46.2612 52.6082V52.6082C46.5367 51.76 47.3291 51.1857 48.2209 51.1857V51.1857C49.9721 51.1857 50.8491 53.1623 49.4459 54.2101C49.2121 54.3846 48.9742 54.5536 48.7326 54.7168ZM55.4373 46.5164C54.7392 48.1471 53.0507 49.0673 51.2769 49.0673H48.5455C47.2352 49.0673 45.9976 48.4648 45.1895 47.4333V47.4333C44.3142 46.3161 44.0522 44.8366 44.4908 43.4867L45.3323 40.8963C45.7629 39.5709 46.7673 38.5097 48.067 38.0068V38.0068C49.5343 37.4391 51.1893 37.6548 52.4621 38.5795L54.4993 40.0595C55.8385 41.0324 56.6627 42.6245 56.2377 44.2244C56.0319 44.9995 55.7575 45.7685 55.4373 46.5164Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="flex-1 mt-3 mt-8 ml-3">
                <h1 className="text-3xl font-bold">{coach}</h1>
                <h3 className="text-lg">Total Coaches</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Table Of user  */}
        <div className="overflow-x-auto   font-lexend relative mx-10 my-5 font-dm rounded-xl">
          <table className="font-dm w-full text-sm text-left text-white  bg-gradient-to-r from-[#2F2F2F]/100 to-[#3A3A3A]/0 ">
            <thead className=" font-dm text-base font-normal text-white/0.81 border-[#7E7E7E] border-b">
              <tr
                className="text-center font-DM-sans"
                onClick={() => setopenAddsubcatmodal(false)}
              >
                <th scope="col" className="py-3 pl-3">
                  Id
                </th>
                <th scope="col" className="py-3 pl-2 text-center">
                  User
                </th>
                <th scope="col" className="py-3 pl-2 text-left">
                  Email
                </th>
                <th scope="col" className="py-3 pl-2">
                  Phone
                </th>
                <th scope="col" className="py-3 pl-2">
                  Date Joined
                </th>
                <th scope="col" className="py-3 px-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((object, index) => (
                  <tr className="font-dm border-[#7E7E7E] border-b text-center">
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <Link
                        to={{
                          pathname: "/userarea/playerprofile/profile",
                        }}
                        state={object}
                      >
                        <MenuItem>View Profile</MenuItem>
                      </Link>
                      <Link to="/chat">
                        <MenuItem>Chat</MenuItem>
                      </Link>
                    </Menu>
                    <th
                      scope="row"
                      className="py-4 font-medium whitespace-nowrap text-white"
                      onClick={() => setopenAddsubcatmodal(false)}
                    >
                      #{index + 1}
                    </th>
                    <td className="py-4 ">
                      <div
                        className="flex gap-4 items-center justify-left"
                        style={{ marginLeft: "15rem" }}
                      >
                        <img
                          className=" w-10 h-10 rounded-full "
                          src={object.image}
                        />
                        <p> {object.name} </p>
                      </div>
                    </td>
                    <td className="py-4 text-left">{object.email}</td>
                    <td className="py-4 ">{object.phone}</td>
                    <td className="py-4 ">
                      {object.datedjoined.split("T")[0]}
                    </td>

                    <td>
                      <div className="flex pl-3 gap-10 justify-center">
                        <NavLink
                          to={{
                            pathname: "/userarea/coachprofile/profile",
                          }}
                          state={object}
                        >
                          <button className="bg-blue-500 p-2 rounded-sm">
                            View Profile
                          </button>
                        </NavLink>
                      </div>
                    </td>
                    {/* view profile */}
                    <tr>
                      <div
                        id="defaultModal"
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
                ))
              ) : (
                <div className="flex justify-center mt-3 w-full h-96">
                  <p className="text-[#818181] font-dm font-normal text-lg">
                    No Product Found
                  </p>
                </div>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
              <MdOutlineKeyboardArrowRight style={{ fontSize: 28, width: 150 }} />
            }
            onPageChange={handlePageClick}
            pageCount={pageCount}
            pageClassName={"item pagination-page "}
            pageRangeDisplayed={5}
            previousClassName={"item previous"}
            previousLabel={
              <MdOutlineKeyboardArrowLeft style={{ fontSize: 28, width: 150 }} />
            }
          />
        </div>
      </div>
    </>
  );
}
