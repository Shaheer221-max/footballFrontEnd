import React, { useState, useEffect, useContext } from "react";
import "../styles/font.css";
import axios from "../axios";
import { AuthContext } from "../admin/ActiveUser";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../admin/Spinner";
export default function RecentChats(props) {
  const { id, setActiveId } = useContext(AuthContext);
  const [arrayCopyData, setDataCopy] = useState([]);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [groups, setGroups] = useState([]);
  const [groupConversation, setGroupConversation] = useState([]);

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    // 👇 Get input value from "event"
    setSearch(event.target.value);
    // 👇 Filter data based on input value
    const filteredData = allUsers.filter((val) =>
      val.name.toLowerCase().startsWith(event.target.value.toLowerCase())
    );
    // Filter Group Data
    const filteredGroupData = groupConversation.filter((val) =>
      val.name.toLowerCase().startsWith(event.target.value.toLowerCase())
    );

    // Combine Both Data
    const combinedData = filteredData.concat(filteredGroupData);
    setDataCopy(combinedData);
  };

  const selectChat = async (val) => {
    console.log("Value", val);
    const second = val?.members?.filter((val) => val._id !== id)[0].id;
    const res = await axios.get(
      `${process.env.REACT_APP_API}/conversation/find/${id}/${second}`
    );
    localStorage.setItem("conversationId", res.data.data._id);
  };

  const user = useSelector((state) => state.user);

  const getData = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API}/conversation/${user?.user?.id}`
      )
      .then((res) => {
        console.log(res.data.data);

        // Get Unique Conversation
        const uniqueConversation = res?.data?.data?.filter(
          (v, i, a) =>
            a.findIndex((t) => t.members[0].id === v.members[0].id) === i
        );
        console.log("Unique Conversation", uniqueConversation);
        setUsers(uniqueConversation);
        setCurrentUser(res.data.currentUser);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const [filteredGroups, setFilteredGroups] = useState([]);
  const getGroupConversation = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API}/groupconversation/GetGroupChat/${user?.user?.id}`
      )
      .then((res) => {
        console.log(res.data.data);
        setGroupConversation(res.data.data.reverse());
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  React.useEffect(() => {
    console.log("Group Filter: ", search);
    if (search === "") {
      setFilteredGroups(groupConversation);
    } else {
      console.log(
        "Group Filter: ",
        groupConversation.filter((group) =>
          group.name.toLowerCase().includes(search.toLowerCase())
        )
      );
      setFilteredGroups(
        groupConversation.filter((group) =>
          group.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, groupConversation]);

  const getGroups = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/group/GetAllGroups`)
      .then((res) => {
        console.log(res.data.data.doc);
        setGroups(res.data.data.doc);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getAllUsers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/GetAllUsers`)
      .then((res) => {
        console.log(res.data.data.doc);
        // Get All Users Except Current User
        const filteredUsers = res.data.data.doc.filter(
          (user) => user.id !== id
        );
        setAllUsers(filteredUsers);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const createChat = async (to) => {
    await axios
      .post(`${process.env.REACT_APP_API}/conversation/`, {
        receiverId: to.id,
        senderId: user?.user?.id,
      })
      .then((res) => {
        navigate(`/chat/${res.data._id}`);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getData();
    getAllUsers();
    getGroups();
    getGroupConversation();
  }, [id, props]);

  return (
    <>
      <div className="">
        <div className="font-lexend mt-12 ">
          <div className="relative mr-8">
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

          <div
            className="lg:h-[480px] overflow-y-scroll scrollbar"
            style={{ overflowX: "hidden" }}
          >
            <>
              {arrayCopyData.length > 0 ||
              users.length > 0 ||
              allUsers.length > 0 ? (
                search !== "" ? (
                  arrayCopyData.map((val, ind) => {
                    return (
                      <div
                        className=" mt-10 mb-8 cursor-pointer"
                        onClick={() => {
                          val.image
                            ? createChat(val, "chat")
                            : navigate(`/chat/group/${val._id}`);
                        }}
                      >
                        <div className="flex w-full">
                          {val.img !== "no image" ? (
                            <>
                              <img
                                className=" w-12 h-12 rounded-full "
                                src={val.image ? val.image : val.groupimage}
                                alt="Bonnie image"
                              />
                            </>
                          ) : (
                            <>
                              <div className=" w-12 h-12 rounded-full bg-white"></div>
                            </>
                          )}
                          <div>
                            <div className="flex grow-1 ml-3">
                              <h5 className="text-md mr-3 font-lexend font-medium tracking-tight  text-white">
                                {val.name}
                              </h5>

                              <div className="inline-flex font-dm items-center py-1 px-5  text-xs font-medium text-white bg-green-500 rounded-md ">
                                {val.role ? val.role : "Group"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : users.length > 0 ? (
                  <>
                    {users.map((val, ind) => {
                      return (
                        val?.lastMessage !== "" && (
                        <Link to={{ pathname: `/chat/${val._id}` }} state={val}>
                          <div
                            className=" mt-10 cursor-pointer"
                            onClick={() => {
                              selectChat(val, "chat");
                            }}
                          >
                            <div className="flex align-middle w-full">
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
                                  <div className="flex">
                                    <h5 className="text-md mr-2 font-lexend font-medium tracking-tight  text-white">
                                      {val.members.map((val, ind) => {
                                        return (
                                          <>
                                            {val.id == currentUser
                                              ? ""
                                              : val.name}
                                          </>
                                        );
                                      })}
                                    </h5>
                                    {/* Badge */}
                                    <div className="inline-flex font-dm items-center py-1 px-5  text-xs font-medium text-white bg-green-500 rounded-md ">
                                      {val.members.map((val, ind) => {
                                        return (
                                          <>
                                            {val.id == currentUser
                                              ? ""
                                              : val.role}
                                          </>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  <p className="font-normal font-lexend text-sm  mt-0 text-[#777777]">
                                    {val?.lastMessage?.slice(0, 25)}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className="font-medium ml-[20px] text-xs mt-2 text-[#777777]">
                                  {/* <Moment fromNow>{val.createdAt}</Moment> */}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                      );
                    })}
                  </>
                ) : (
                  <>
                    {allUsers.map((val, ind) => {
                      return (
                        <div
                          className=" mt-10 cursor-pointer"
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
                )
              ) : (
                <Spinner />
              )}

              {search === "" ? (
                <div className="mt-8">
                  {filteredGroups.length > 0 ? (
                    filteredGroups.map((val, ind) => {
                      return (
                        val.messages.length > 0 ? (
                        <Link
                          to={{ pathname: `/chat/group/${val._id}` }}
                          state={val}
                        >
                          <div
                            className="mb-8 cursor-pointer"
                            onClick={() => {
                              selectChat(val, "chat");
                            }}
                          >
                            <div className="flex w-full align-middle">
                              <img
                                className=" w-12 h-12 rounded-full "
                                src={val.groupimage}
                                alt="Bonnie image"
                              />
                              <div className="flex-1 grow-1 ml-3">
                                <div className="flex">
                                  <h5 className="font-lexend mr-2 font-medium tracking-tight text-md text-white">
                                    {val.name}
                                  </h5>
                                  <div className="inline-flex font-dm items-center py-1 px-5  text-xs font-medium text-white bg-green-500 rounded-md ">
                                    Group
                                  </div>
                                </div>
                                <p className="font-normal font-lexend text-sm  mt-0 text-[#777777]">
                                  {val?.messages[
                                    val?.messages?.length - 1
                                  ]?.content?.slice(0, 25)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        ) : (
                          <></>
                        )
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
}
