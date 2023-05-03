// import React from "react";
// import Header from "../Components/Header";
// import "../styles/font.css"
// import axios from "axios";
// import { NavLink } from "react-router-dom";
// import {
//   MdOutlineKeyboardArrowLeft,
//   MdOutlineKeyboardArrowRight,
// } from "react-icons/md";
// import ReactPaginate from "react-paginate";
// import Spinner from "../admin/Spinner";
// export default function PlayerareaPlayers() {

//   const [players, setPlayers] = React.useState([]);

//   const data = async () => {
//     await axios
//       .get("${process.env.REACT_APP_API}/users/GetAllPlayers")
//       .then((res) => {
//         console.log(res.data.data);
//         setPlayers(res.data.data);
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//       });
//   };

//   React.useEffect(() => {
//     data();
//   }, []);

//   // Pagination
//   const [itemOffset, setItemOffset] = React.useState(0);
//   const endOffset = itemOffset + 5;
//   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//   const currentItems = players.slice(itemOffset, endOffset);
//   const pageCount = Math.ceil(players.length / 5);

//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * 5) % players.length;
//     console.log(
//       `User requested page number ${event.selected}, which is offset ${newOffset}`
//     );
//     setItemOffset(newOffset);
//   };

//   return (
//     <div className="flex-col w-full ">
//       <Header title={"Players Area"} />
//       <h4 className="self-center font-lexend text-xl font-semibold whitespace-nowrap text-white mx-9 mt-8 mb-[26px]">
//         Players
//       </h4>

//       <div className="flex items-center justify-start gap-10 ml-10 mr-12 mt-5 mb-12">
//         <form className="flex items-center w-full">
//           <div className="relative w-full">
//             <div className="flex w-[591px]  absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
//               <svg
//                 aria-hidden="true"
//                 className="w-5 h-5   text-gray-400"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </div>
//             <input
//               type="text"
//               className="w-1/2 bg-[#212121]    text-sm rounded-lg block  pl-10 p-2.5  placeholder-gray-400 text-white "
//               placeholder="Search Players"
//               required=""
//             />
//           </div>
//           <button
//             className="text-white font-dm bg-green-500 ml-auto  focus:outline-none font-normal rounded-[4px] text-sm px-6 py-2 text-center inline-flex items-center"
//             type="button"
//           >
//            Group
//             <svg
//               className="ml-2 w-4 h-4"
//               aria-hidden="true"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M19 9l-7 7-7-7"
//               ></path>
//             </svg>
            
//           </button>
//         </form>
//       </div>

//       {/* Player Card */}

//       <div className="grid grid-cols-7 gap-y-5 mr-9 ml-10 sm:gap-4 xl:gap-5 2xl:grid-cols-8  ">
//         {
        
//         players.length > 0 ? (
//           players.map((val, ind) => {
//             const change = ind % 2 == 0;
           
//             return (
//               <NavLink to={{ pathname: "/playerprofile/profile" }} state = {{ val }}>
//                 <div className="max-w-[141px] bg-transparent">
//                 <a href=""><img className="rounded-[4px] h-36 w-36" src={val.image} alt="" /></a>
  
//                 <div className="p-2 font-lexend">
//                   <h5 className="mb-0 mt-3 text-lg text-center  font-normal tracking-tight  text-white">
//                     {val.name}
//                   </h5>
//                   <p className="mb-3 text-sm sm:text-xs font-normal text-center  text-[#7e7e7e]">
//                     {val.position}
//                   </p>
//                 </div>
//               </div>
//               </NavLink>
//             );
//           })
//         ) : (
//           <div className="flex justify-center items-center">
//             {/* <h1 className="text-white">No Data Found</h1> */}
//             {/* Add Loader */}
//             <Spinner />
//           </div>
//         )
        
//         }
//       </div>

//       {/* pagination */}

//       <div className="text-white justify-end flex">
//           <ReactPaginate
//             activeClassName={"item active "}
//             breakClassName={"item break-me "}
//             breakLabel={"..."}
//             containerClassName={"pagination"}
//             disabledClassName={"disabled-page"}
//             marginPagesDisplayed={2}
//             nextClassName={"item next "}
//             nextLabel={
//               <MdOutlineKeyboardArrowRight
//                 style={{ fontSize: 28, width: 150 }}
//               />
//             }
//             onPageChange={handlePageClick}
//             pageCount={pageCount}
//             pageClassName={"item pagination-page "}
//             pageRangeDisplayed={5}
//             previousClassName={"item previous"}
//             previousLabel={
//               <MdOutlineKeyboardArrowLeft
//                 style={{ fontSize: 28, width: 150 }}
//               />
//             }
//           />
//         </div>
//       </div>
//   );
// }


import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import "../styles/font.css";
import { NavLink } from "react-router-dom";
import axios from "../axios";
import ReactPaginate from "react-paginate";

// React Icons
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function Parents() {
  const [data, setData] = useState([]);
  const [openAddsubcatmodal, setopenAddsubcatmodal] = useState(false);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [playersJoined, setPlayersJoined] = useState(0);
  const [playersLeft, setPlayersLeft] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [parent, setParent] = useState([]);
  const [search, setSearch] = useState("");

  // getting players from database
  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/GetAllUsers`)
      .then((res) => {
        setTotalPlayers(res?.data?.result);
        setData(res?.data?.data?.doc?.filter((item) => item.role === "Parent"));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getParents = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/GetAllUsers`)
      .then((res) => {
        console.log(res?.data?.data?.doc.filter((item) => item.role === "Parent"));
        setParent(res?.data?.data?.doc.filter((item) => item.role === "Parent"));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    if(search === ""){
      setFilteredData(data)
    }else{
      setFilteredData(
        data.filter((item) => {
          return item.name.toLowerCase().includes(search.toLowerCase());
        }
      )
    )
    }
  }, [search, data]);

  useEffect(() => {
    getData();
    getParents();
  }, []);

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
        {/* Page Header */}
        <Header title={"User Area"} />
        {/* Title Of the Page */}
        <div
          className="flex-row"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="flex-row">
            <button className="self-center text-20 font-medium text-white whitespace-nowrap  ml-9 mt-[32px]">
              Parents
            </button>
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
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                className="bg-[#212121]  text-white p-5  text-sm rounded-lg block w-full pl-10 p-2.5   border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Parents"
                required=""
                onChange={(e) => {setSearch(e.target.value)}}
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
                <th scope="col" className="py-3 justify-start">
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
                <th scope="col" className="py-3 pl-2">
                  Son of
                </th>
                <th scope="col" className="py-3 px-3 ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ?  (
                  filteredData.map((object, index) => {
                    const parents = parent.find((parent) => parent.refOfPlayer === object._id);
                    return (
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
                          className="flex gap-4 items-center justify-left font-lexend"
                          style={{ marginLeft: "15rem" }}
                          
                        >
                          <img
                            className=" w-10 h-10 rounded-full "
                            src={object.image}
                          />
                          <p className="font-medium font-lexend"> {object.name} </p>
                        </div>
                      </td>
                      <td
                        className="py-4 text-left font-lexend"
                        
                      >
                        {object.email}
                      </td>
                      <td className="py-4 font-lexend" >
                        {object.phone}
                      </td>
                      <td className="py-4 font-lexend" >
                        {object.datedjoined.split("T")[0]}
                      </td>
                      <td className="py-4 font-lexend" >
                        {parents ? <>{parents?.name}</> : <>-</>}
                      </td>

                      <td>
                        <div className="flex pl-3 gap-10 justify-center">
                          <NavLink
                            to={{ pathname: "/userarea/playerprofile/profile" }}
                            state={object}
                          >
                            <button className="bg-blue-500 p-2 rounded-sm font-lexend">
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
                                <NavLink
                                  to={{
                                    pathname: "/userarea/playerprofile/profile",
                                  }}
                                  state={object}
                                >
                                  <a href="">View Profile</a>
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
                  )})): (
                <div className="flex justify-center mt-3 w-full h-96">
                  <p className="text-[#818181] font-dm font-normal text-lg">
                    Loading ...
                  </p>
                </div>
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
