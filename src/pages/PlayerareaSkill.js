import React, { useState } from "react";
import Header from "../Components/Header";
import ReactPaginate from "react-paginate";
import "../styles/font.css";
import axios from "axios";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { message } from "antd";

export default function PlayerareaSkill() {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const day = date.getDate();

  // Get All Players

  const [players, setPlayers] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);

  const getPlayers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/GetAllPlayers`)
      .then((res) => {
        console.log(res.data.data);
        setPlayers(res.data.data);
      });
  };
  React.useEffect(() => {
    getPlayers();
  }, []);

  const [search, setSearch] = React.useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    console.log(players);
    if (search === "") {
      setFiltered(players);
    } else {
      const filtered = players.filter((player) => {
        return player.name.toLowerCase().includes(search.toLowerCase());
      });
      setFiltered(filtered);
    }
  }, [search, players]);

  // Get All Skills
  const [skills, setSkills] = React.useState([]);
  const [skill, setSkill] = React.useState();

  const getSkills = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/skill/GetAllSkills`)
      .then((res) => {
        console.log(res.data.data.doc);
        setSkills(res.data.data.doc);
      });
  };

  React.useEffect(() => {
    getSkills();
  }, []);

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 5;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = filtered.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filtered.length / 5);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % filtered.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const addEvaluation = async (id) => {
    if (evaluations.length > 0) {
      message.error("You have already evaluated this player today");
      return;
    }
    const data = {
      refOfPlayer: id,
      refOfSkill: skill,
      scores: score,
      date: new Date().toISOString().split("T")[0],
      isMarked: true,
    };
    console.log(data);
    await axios
      .post(
        `${process.env.REACT_APP_API}/evaluation/Evaluate`,
        data
      )
      .then((res) => {
        message.success("Evaluation Added Successfully");
        console.log(res.data);
      })
      .catch((err) => {
        message.error("Error");
        console.log(err);
      });
  };

  // Get All SubSkills
  const [subSkills, setSubSkills] = React.useState([]);

  const getSubSkills = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API}/skill/GetAllSubSkillsOfSkill/${skill}`
      )
      .then((res) => {
        console.log("Skill: ", res?.data?.data[0]?.subskills);
        setSubSkills(res?.data?.data[0]?.subskills);
      });
  };

  React.useEffect(() => {
    getSubSkills();
  }, [skill]);

  const handleSkill = (e) => {
    console.log("Skill: ", e.target.value);
    setSkill(e.target.value);
  };

  const [score, setScore] = React.useState([]);
  const handleScore = (e, ind, id) => {
    setId(id);
    console.log("Score: ", e.target.value);
    const newScore = [...score];
    // Converting string to number
    newScore[ind] = parseInt(e.target.value);
    // Converting string to number
    setScore(newScore);
    console.log("New Score: ", newScore);
  }

  // Get All Evaluations
  const [evaluations, setEvaluations] = React.useState([]);
  const [id, setId] = React.useState();

  const getEvaluations = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API}/evaluation/ViewEvaluationsByDateOfPlayer/${id}&${new Date().toISOString().split('T')[0]}`
      )
      .then((res) => {
        console.log(res.data.data);
        setEvaluations(res.data.data);
      });
  };

  React.useEffect(() => {
    getEvaluations();
  }, [id]);


  return (
    <>
      <div className="flex-col w-full ">
        <Header title={"Players Area"} />
        <h4 className="font-lexend self-center text-xl font-medium whitespace-nowrap text-white mx-9 mt-8 mb-[26] ">
          Skills Evaluations
        </h4>
        {/* Search Button  */}
        <div className="flex items-center justify-start gap-10 mx-10 my-5 font-dm">
          <form className="flex items-center w-1/2 font-dm">
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5  text-gray-400"
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
                className=" font-dm text-sm rounded-lg  block w-full pl-10 p-2.5  bg-[#212121] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Players"
                required=""
                onChange={handleSearch}
              />
            </div>
            <button
              type="submit"
              className="font-lexend inline-flex items-center py-2.5 px-5 ml-2 text-sm font-normal text-white bg-green-500 rounded-[4px] "
            >
              Search
            </button>
          </form>
          <div className="font-dm gap-4 ml-auto pl-4">
            {/* Display Skills in the Button */}

            <select
              onChange={handleSkill}
              className="bg-green-500 p-2 rounded-md text-white"
            >
              {skills.map((skill) => {
                return (
                  <option value={skill._id} key={skill._id}>
                    {skill.skillname}
                  </option>
                );
              })}
            </select>
          </div>
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
        </div>
        {/* Table Of user  */}
        <div className="overflow-x-auto relative mx-10 my-5 font-dm rounded-xl">
          <table className="w-full text-sm text-left  text-gray-400 bg-gradient-to-r from-[#212A39]/100 to-[#3A3A3A]/20 ">
            <thead className="text-sm font-normal  font-dm  text-[#ffffff]/80   border-b">
              <tr className="text-center  ">
                <th scope="col" className="pt-5 pb-3 px-6 text-left">
                  Player Name
                </th>
                {subSkills.map((subSkill) => {
                  return (
                    <th scope="col" className="pt-5 pb-3 px-6">
                      {subSkill.subskillname}
                    </th>
                  );
                })}
                <th scope="col" className="pt-5 pb-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((val, ind) => (
                  <tr className=" font-dm border-b  border-gray-700 text-center">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium  whitespace-nowrap text-white"
                    >
                      <div className=" font-dm flex gap-2 items-center">
                        <img
                          className=" w-12 h-12 rounded-full"
                          src={val.image}
                          alt="Bonnie image"
                        />
                        {val.name}
                      </div>
                    </th>
                    {subSkills.map((subSkill, ind) => {
                      return (
                        <td className="py-4 px-6">
                          <select
                            onChange={(e) => handleScore(e, ind, val.id)}
                            className="bg-[#0C0E14] p-0.5 text-white"
                          >
                            <option value={5}>5</option>
                            <option value={4}>4</option>
                            <option value={3}>3</option>
                            <option value={2}>2</option>
                            <option value={1}>1</option>
                          </select>
                        </td>
                      );
                    })}
                    <td>
                      <button
                        type="button"
                        className="text-black bg-white ml-9 font-dm  font-normal rounded-[4px] text-base px-9 py-[6px] mr-2 "
                        onClick={() => addEvaluation(val.id)}
                      >
                        Mark Done
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className=" font-dm border-b  border-gray-700 text-center">
                  <td className="py-4 px-6 font-medium  whitespace-nowrap text-white">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* pagination */}
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
    </>
  );
}
