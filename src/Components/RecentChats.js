import React, { useState, useEffect, useContext } from "react";
import "../styles/font.css";
import axios from "../axios";
import { AuthContext } from "../admin/ActiveUser";
import Moment from "react-moment";
import { Link } from "react-router-dom";
export default function RecentChats(props) {
  const [players, setPlayers] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [coach, setCoach] = useState(false);
  const [data, setData] = useState(false);
  const { id, setActiveId } = useContext(AuthContext);
  const [arrayCopy, setArrayCopy] = useState(false);
  const [arrayCopyAdmin, setArrayCopyAdmin] = useState(false);
  const [arrayCopyCoach, setArrayCopyCoach] = useState(false);
  const [arrayCopyData, setDataCopy] = useState([]);
  const [search, setSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  const token = localStorage.getItem("token");

  const getUser = async () => {
    await axios
      .get("https://football-backend-updated.herokuapp.com/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.doc.id);
        setActiveId(res.data.data.doc.id);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleSearchChange = (event) => {
    // 👇 Get input value from "event"
    setSearch(event.target.value);
    let all = allUsers.filter((val) => val.name == event.target.value);
    console.log(allUsers.filter((val) => val.name == event.target.value));
    setDataCopy(allUsers.filter((val) => val.name == event.target.value));
  };
  const handlePlayersSearch = (event) => {
    setArrayCopy([...players.filter(checkNames)]);
    handleAdminSearch();
  };
  const handleAdminSearch = (event) => {
    setArrayCopyAdmin([...admin.filter(checkNames)]);
    handleCoachSearch();
  };
  const handleCoachSearch = (event) => {
    setArrayCopyCoach([...coach.filter(checkNames)]);
  };

  const checkNames = (val) => {
    if (val.name.toUpperCase().includes(search.toUpperCase())) {
      return val.name;
    }
  };
  const checkChats = (val) => {
    if (val.reciever.toUpperCase().includes(search.toUpperCase())) {
      return val.reciever;
    }
  };

  const selectChat = async (val) => {
    console.log("Value", val);
    const second = val.members.filter((val) => val._id !== id)[0].id;
    const res = await axios.get(`/conversation/find/${id}/${second}`);
    localStorage.setItem("conversationId", res.data.data._id);
    // props.history.push(`/chat/${res.data.data._id}`);
  };

  const getData = async () => {
    await axios
      .get(`https://football-backend-updated.herokuapp.com/conversation/${id}`)
      .then((res) => {
        console.log("Sajjad: ", res.data.currentUser);
        console.log(res.data.data);
        setUsers(res.data.data);
        setCurrentUser(res.data.currentUser);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getAllUsers = async () => {
    await axios
      .get(`https://football-backend-updated.herokuapp.com/users/GetAllUsers`)
      .then((res) => {
        console.log(res.data.data.doc);
        setAllUsers(res.data.data.doc);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const createChat = async (to) => {
    console.log(to);
    await axios
      .post("https://football-backend-updated.herokuapp.com/conversation/", {
        receiverId: to.id,
        senderId: id,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getData();
    getUser();
    getAllUsers();
  }, [id]);

  return (
    <>
      <div className="">
        <div className="font-lexend mt-12 ">
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5  text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              className="bg-[#212121]  text-[rgba(255, 255, 255, 0.53)] text-sm text-white rounded-md w-full pl-10 p-2.5   placeholder-gray-400"
              placeholder="Search User"
              required=""
              onChange={handleSearchChange}
            />
          </div>

          <div>
            <>
              {arrayCopyData.length > 0 ? (
                arrayCopyData.map((val, ind) => {
                  return (
                    <div
                      className=" mt-10 mb-8 cursor-pointer"
                      onClick={() => {
                        createChat(val, "chat");
                      }}
                    >
                      <div className="flex w-full">
                        {val.img !== "no image" ? (
                          <>
                            <img
                              className=" w-12 h-12 rounded-full "
                              src={val.image}
                              alt="Bonnie image"
                            />
                          </>
                        ) : (
                          <>
                            <div className=" w-12 h-12 rounded-full bg-white"></div>
                          </>
                        )}
                        <div>
                          <div className="flex-1 grow-1 ml-3">
                            <h5 className="text-lg font-lexend font-medium tracking-tight  text-white">
                              {val.name}
                            </h5>
                            <p className="font-normal font-lexend text-sm  mt-0 text-[#777777]">
                              {/* {val.messg.slice(0, 25)} */}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium ml-[20px] text-xs mt-2 text-[#777777]">
                            <Moment fromNow>{val.date}</Moment>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : users.length > 0 ? (
                <>
                  {users.map((val, ind) => {
                    return (
                      <Link to={{pathname: `/chat/${val._id}`}} state = {val}>
                      <div
                        className=" mt-10 mb-8 cursor-pointer"
                        // onClick={() => {
                        //   selectChat(val, "chat");
                        // }}
                      >
                        <div className="flex w-full">
                          {val.members.map((val, ind) => {
                            return (
                              <>
                                {val.id == currentUser ? (
                                  ""
                                ) : (
                                  <img
                                    className=" w-12 h-12 rounded-full "
                                    src={val.image}
                                    alt="Bonnie image"
                                  />
                                )}
                              </>
                            );
                          })}
                          <div>
                            <div className="flex-1 grow-1 ml-3">
                              <h5 className="text-lg font-lexend font-medium tracking-tight  text-white">
                                {val.members.map((val, ind) => {
                                  return (
                                    <>{val.id == currentUser ? "" : val.name}</>
                                  );
                                })}
                              </h5>
                              <p className="font-normal font-lexend text-sm  mt-0 text-[#777777]">
                                {val.lastMessage.slice(0, 25)}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium ml-[20px] text-xs mt-2 text-[#777777]">
                              <Moment fromNow>{val.date}</Moment>
                            </p>
                          </div>
                        </div>
                      </div>
                      </Link>
                    );
                  })}
                </>
              ) : (
                <>
                  {allUsers.map((val, ind) => {
                    return (
                      <div
                        className=" mt-10 mb-8 cursor-pointer"
                        onClick={() => {
                          createChat(val, "chat");
                        }}
                      >
                        <div className="flex w-full">
                          {val.img !== "no image" ? (
                            <>
                              <img
                                className=" w-12 h-12 rounded-full "
                                src={val.image}
                                alt="Bonnie image"
                              />
                            </>
                          ) : (
                            <>
                              <div className=" w-12 h-12 rounded-full bg-white"></div>
                            </>
                          )}
                          <div>
                            <div className="flex-1 grow-1 ml-3">
                              <h5 className="text-lg font-lexend font-medium tracking-tight  text-white">
                                {val.name}
                              </h5>
                              <p className="font-normal font-lexend text-sm  mt-0 text-[#777777]">
                                {/* {val.messg.slice(0, 25)} */}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium ml-[20px] text-xs mt-2 text-[#777777]">
                              {/* <Moment fromNow>{val.date}</Moment> */}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
}
