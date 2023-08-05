import React, { useState, useEffect, useRef } from "react";
import LeftSideChat from "./LeftSideChat";
import "../styles/font.css";
import "../styles/scrollbar.css";
import { Divider, Dropdown, message, Modal, Popconfirm } from "antd";
import axios from "axios";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Tooltip } from "antd";
import RightSideChatGroup from "./RightSideChatGroup";
import LeftSideChatGroup from "./LeftSideChatGroup";

export default function GroupChatBox(props) {
  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chat, setChat] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const hiddenFileInput = React.useRef(null);

  const params = useParams();
  const location = useLocation();

  const user = useSelector((state) => state.user);

  const [conversation, setConversation] = React.useState();

  const getCurrentConversation = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API}/groupconversation/GetGroupChatById/${location.state._id}`
      )
      .then((res) => {
        setConversation(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getCurrentConversation();
  }, [refresh]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const handleOk1 = () => {
    setIsModalOpen1(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const onClick = ({ key }) => {
    if (key === "0") {
      showModal();
    }
    if (key === "1") {
      showModal1();
    }
  };

  const navigate = useNavigate();

  // Delete Group
  const deleteGroup = async () => {
    setRefresh(true);
    await axios
      .delete(
        `${process.env.REACT_APP_API}/groupconversation/DeleteGroupChat/${params.id}`
      )
      .then((res) => {
        message.success("Group Chat Deleted Successfully");
        setRefresh(false);
        setConversations([]);
        navigate("/chat");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const items = [
    {
      label: <p>Group Members</p>,
      key: "0",
    },
    {
      label: <p>Add Members</p>,
      key: "1",
    },
    {
      label: (
        <Popconfirm
          title="Delete Chat"
          description="Are you sure to delete this Chat?"
          okText="Yes"
          cancelText="No"
          onConfirm={deleteGroup}
          okButtonProps={{ className: "bg-red-500" }}
        >
          <p>Delete Group</p>
        </Popconfirm>
      ),
      key: "2",
    },
  ];

  const [url, setUrl] = useState();

  const AllMessages = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API}/groupconversation/messages/${params.id}`
      )
      .then((res) => {
        setChat(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  React.useEffect(() => {
    AllMessages();
  }, [params.id, refresh]);

  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [sendChat, setSendChat] = useState("");

  useEffect(() => {
    user?.socket?.current?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    // setLastMessage(arrivalMessage?.text);
    arrivalMessage &&
      conversation.Members?.map((data) => {
        if (data?.id === arrivalMessage.sender) {
          return true;
        }
      }) &&
      setChat((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("upload_preset", "player_image");
    //data.append("cloud_name","dyapmvalo");
    axios
      .post("https://api.cloudinary.com/v1_1/dyapmvalo/image/upload", data)
      .then((res) => {
        setUrl(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendMsg = async () => {
    user?.socket?.current?.emit("sendMessage", {
      senderId: user.user._id,
      receiverId: conversation?.Members?.filter(
        (item) => item._id !== user.user._id
      )[0]._id,
      text: sendChat,
    });
    await axios
      .post(
        `${process.env.REACT_APP_API}/groupconversation/send/${params.id}`,
        {
          sender: user.user._id,
          content: url ? url : sendChat,
        }
      )
      .then((res) => {
        setSendChat("");
        setUrl("");
      })
      .catch((error) => {
        console.log(error);
      });
    AllMessages();
  };
  const handleChangeMsg = (event) => {
    setSendChat(event.target.value);
    console.log(sendChat);
  };

  const messageEl = useRef(null);
  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  const [players, setPlayers] = React.useState([]);
  const [openMembers, setOpenMembers] = React.useState(false);

  const AllPlayers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/GetAllPlayers`)
      .then((res) => {
        // Set Players that are not in location.state.members
        setPlayers(
          res?.data?.data?.filter(
            (item) =>
              !conversation?.Members?.some((player) => player._id === item._id)
          )
        );
        console.log(
          res?.data?.data?.filter(
            (item) =>
              !conversation?.Members?.some((player) => player._id === item._id)
          )
        );
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const addMember = async (id) => {
    setRefresh(true);
    setPlayers([...players, id]);
    await axios
      .post(
        `${process.env.REACT_APP_API}/groupconversation/AddMemberInGroupChat/${id.id}&${params.id}`
      )
      .then((res) => {
        message.success("Member Added");
        getCurrentConversation();
        AllPlayers();
        setRefresh(false);
        setOpenMembers(false);
        setIsModalOpen(false);
        AllPlayers();
        setIsModalOpen1(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const removeMember = async (id) => {
    setRefresh(true);
    setPlayers(players.filter((item) => item._id !== id));
    await axios
      .post(
        `${process.env.REACT_APP_API}/groupconversation/RemoveMemberFromGroupChat/${id}&${params.id}`
      )
      .then((res) => {
        setRefresh(false);
        getCurrentConversation();
        AllPlayers();
        message.success("Member Removed");
        setOpenMembers(false);
        AllPlayers();
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  React.useEffect(() => {
    AllPlayers();
  }, [params.id, refresh]);

  const [search, setSearch] = React.useState("");
  const [filtered, setFiltered] = React.useState([]);

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
    setFiltered(
      conversation?.Members?.filter((player) =>
        player.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const [filteredUsers, setFilteredUsers] = React.useState([]);

  React.useEffect(() => {
    if (search === "") {
      setFilteredUsers(players);
    } else {
      setFilteredUsers(
        players?.filter((player) =>
          player.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, players, refresh]);

  const handleChangeSearch1 = (event) => {
    setSearch(event.target.value);
  };

  const [conversations, setConversations] = useState(null);
  const getConversation = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API}/groupconversation/GetGroupChatById/${params.id}`
      )
      .then((res) => {
        setConversations(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  React.useEffect(() => {
    getConversation();
  }, [params.id, refresh]);

  return (
    <>
      <div className="font-lexend">
        <Modal
          footer={null}
          title="Group Members"
          className="custom-modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
        >
          <Divider
            style={{
              backgroundColor:
                "linear-gradient(108.13deg, rgba(185, 185, 185, 0.04) 37.66%, rgba(255, 255, 255, 0.06) 88.26%)",
            }}
          />
          <div
            className="linear"
            style={{
              backgroundColor:
                "linear-gradient(108.13deg, rgba(185, 185, 185, 0.04) 37.66%, rgba(255, 255, 255, 0.06) 88.26%)",
              display: "flex",
              alignItems: "center",
              padding: 8,
              borderRadius: 5,
            }}
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
            <input
              style={{ backgroundColor: "transparent", border: "none" }}
              type="text"
              placeholder="Search"
              onChange={handleChangeSearch}
            />
          </div>
          {search !== ""
            ? filtered?.map((data) => {
                return (
                  <div
                    className="mt-6"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Link
                      to={{ pathname: "/userarea/playerprofile/profile" }}
                      state={data}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={data.image}
                          style={{ width: 35, height: 35 }}
                          className="rounded-full mr-2"
                          alt=""
                        />
                        <p className="text-white text-16 font-medium">
                          {data.name}
                        </p>
                      </div>
                    </Link>
                    <svg
                      className="ml-auto cursor-pointer"
                      width="16"
                      height="16"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => removeMember(data.id)}
                    >
                      <path
                        d="M9 0C4.0275 0 0 4.0275 0 9C0 13.9725 4.0275 18 9 18C13.9725 18 18 13.9725 18 9C18 4.0275 13.9725 0 9 0ZM13.5 9.9H4.5V8.1H13.5V9.9Z"
                        fill="#FF0000"
                      />
                    </svg>
                  </div>
                );
              })
            : conversation?.Members?.map((data) => {
                return (
                  <div
                    className="mt-6"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Link
                      to={{ pathname: "/userarea/playerprofile/profile" }}
                      state={data}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={data.image}
                          style={{ width: 35, height: 35 }}
                          className="rounded-full mr-2"
                          alt=""
                        />
                        <p className="text-white text-16 font-medium">
                          {data.name}
                        </p>
                      </div>
                    </Link>
                    <svg
                      className="ml-auto cursor-pointer"
                      width="16"
                      height="16"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => removeMember(data.id)}
                    >
                      <path
                        d="M9 0C4.0275 0 0 4.0275 0 9C0 13.9725 4.0275 18 9 18C13.9725 18 18 13.9725 18 9C18 4.0275 13.9725 0 9 0ZM13.5 9.9H4.5V8.1H13.5V9.9Z"
                        fill="#FF0000"
                      />
                    </svg>
                  </div>
                );
              })}
        </Modal>

        <Modal
          footer={null}
          title="Add Members"
          className="custom-modal"
          open={isModalOpen1}
          onOk={handleOk1}
          onCancel={handleCancel1}
          centered
        >
          <Divider
            style={{
              backgroundColor:
                "linear-gradient(108.13deg, rgba(185, 185, 185, 0.04) 37.66%, rgba(255, 255, 255, 0.06) 88.26%)",
            }}
          />
          <div
            className="linear"
            style={{
              backgroundColor:
                "linear-gradient(108.13deg, rgba(185, 185, 185, 0.04) 37.66%, rgba(255, 255, 255, 0.06) 88.26%)",
              display: "flex",
              alignItems: "center",
              padding: 8,
              borderRadius: 5,
            }}
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
            <input
              style={{ backgroundColor: "transparent", border: "none" }}
              type="text"
              placeholder="Search"
              onChange={handleChangeSearch1}
            />
          </div>
          {filteredUsers.map((data) => {
            return (
              <div
                className="mt-6"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Link
                  to={{ pathname: "/userarea/playerprofile/profile" }}
                  state={data}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={data.image}
                      style={{ width: 35, height: 35 }}
                      className="rounded-full mr-2"
                      alt=""
                    />
                    <p className="text-white text-16 font-medium">
                      {data.name}
                    </p>
                  </div>
                </Link>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer ml-auto"
                  onClick={() => {
                    // handleAddMember(val);
                    addMember(data);
                  }}
                >
                  <path
                    d="M12.5 0C5.596 0 0 5.596 0 12.5C0 19.404 5.596 25 12.5 25C19.404 25 25 19.404 25 12.5C25 5.596 19.404 0 12.5 0ZM19 13.5H13.5V19C13.5 19.2652 13.3946 19.5196 13.2071 19.7071C13.0196 19.8946 12.7652 20 12.5 20C12.2348 20 11.9804 19.8946 11.7929 19.7071C11.6054 19.5196 11.5 19.2652 11.5 19V13.5H6C5.73478 13.5 5.48043 13.3946 5.29289 13.2071C5.10536 13.0196 5 12.7652 5 12.5C5 12.2348 5.10536 11.9804 5.29289 11.7929C5.48043 11.6054 5.73478 11.5 6 11.5H11.5V6C11.5 5.73478 11.6054 5.48043 11.7929 5.29289C11.9804 5.10536 12.2348 5 12.5 5C12.7652 5 13.0196 5.10536 13.2071 5.29289C13.3946 5.48043 13.5 5.73478 13.5 6V11.5H19C19.2652 11.5 19.5196 11.6054 19.7071 11.7929C19.8946 11.9804 20 12.2348 20 12.5C20 12.7652 19.8946 13.0196 19.7071 13.2071C19.5196 13.3946 19.2652 13.5 19 13.5Z"
                    fill="#1DB954"
                  />
                </svg>
              </div>
            );
          })}
        </Modal>

        <div className="w-full my-6 ">
          {/* Profile OF the User */}
          <div className="flex items-center gap-2 pb-5 px-5 ml-4 border-b border-grey-500">
            <>
              <>
                <img
                  className=" w-10 h-10 rounded-full "
                  src={conversations?.groupimage}
                  alt="Bonnie image"
                />
                <div className="flex-col">
                  <h3 className="text-white">{conversations?.name}</h3>
                  <Avatar.Group
                    maxCount={2}
                    maxStyle={{
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                    }}
                  >
                    {conversations?.Members?.map((player) => (
                      <Tooltip title={player.name} placement="top">
                        <Avatar src={player.image} />
                      </Tooltip>
                    ))}
                  </Avatar.Group>
                </div>
              </>
            </>

            <div className="ml-auto">
              <Dropdown
                placement="bottomRight"
                menu={{
                  items,
                  onClick,
                }}
                trigger={["click"]}
              >
                <svg
                  width="19"
                  height="5"
                  viewBox="0 0 19 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                >
                  <path
                    d="M9.201 5.68597e-08C8.91196 5.07687e-08 8.62575 0.0569305 8.35871 0.167541C8.09168 0.278152 7.84904 0.440276 7.64466 0.644658C7.44028 0.84904 7.27815 1.09168 7.16754 1.35871C7.05693 1.62575 7 1.91196 7 2.201C7 2.49004 7.05693 2.77625 7.16754 3.04329C7.27815 3.31032 7.44028 3.55296 7.64466 3.75734C7.84904 3.96172 8.09168 4.12385 8.35871 4.23446C8.62575 4.34507 8.91196 4.402 9.201 4.402C9.78474 4.40187 10.3445 4.16985 10.7572 3.75699C11.1699 3.34413 11.4016 2.78424 11.4015 2.2005C11.4014 1.61676 11.1693 1.05698 10.7565 0.644304C10.3436 0.231631 9.78374 -0.000132534 9.2 5.68597e-08H9.201ZM2.201 5.68597e-08C1.91196 5.07687e-08 1.62575 0.0569305 1.35871 0.167541C1.09168 0.278152 0.84904 0.440276 0.644658 0.644658C0.440276 0.84904 0.278152 1.09168 0.167541 1.35871C0.0569305 1.62575 0 1.91196 0 2.201C0 2.49004 0.0569305 2.77625 0.167541 3.04329C0.278152 3.31032 0.440276 3.55296 0.644658 3.75734C0.84904 3.96172 1.09168 4.12385 1.35871 4.23446C1.62575 4.34507 1.91196 4.402 2.201 4.402C2.78474 4.40187 3.34452 4.16985 3.7572 3.75699C4.16987 3.34413 4.40163 2.78424 4.4015 2.2005C4.40137 1.61676 4.16935 1.05698 3.75649 0.644304C3.34363 0.231631 2.78374 -0.000132534 2.2 5.68597e-08H2.201ZM16.201 5.68597e-08C15.912 5.07687e-08 15.6258 0.0569305 15.3587 0.167541C15.0917 0.278152 14.849 0.440276 14.6447 0.644658C14.4403 0.84904 14.2782 1.09168 14.1675 1.35871C14.0569 1.62575 14 1.91196 14 2.201C14 2.49004 14.0569 2.77625 14.1675 3.04329C14.2782 3.31032 14.4403 3.55296 14.6447 3.75734C14.849 3.96172 15.0917 4.12385 15.3587 4.23446C15.6258 4.34507 15.912 4.402 16.201 4.402C16.7847 4.40187 17.3445 4.16985 17.7572 3.75699C18.1699 3.34413 18.4016 2.78424 18.4015 2.2005C18.4014 1.61676 18.1693 1.05698 17.7565 0.644304C17.3436 0.231631 16.7837 -0.000132534 16.2 5.68597e-08H16.201Z"
                    fill="white"
                  />
                </svg>
              </Dropdown>
            </div>
          </div>

          {/* Chat Of The  */}
          <div
            className=" lg:h-[420px] overflow-y-scroll scrollbar"
            id="chat-window"
            ref={messageEl}
          >
            <>
              {chat.map((val, ind) => {
                return (
                  <div>
                    {ind === 0 ? (
                      <>
                        <div className="flex items-center py-4 mx-10">
                          <div className="flex-grow h-px bg-gray-400"></div>

                          <span className="flex-shrink text-base font-dm text-[#ffffff] px-4  font-normal">
                            {today === val.timestamp.slice(0, 10) ? (
                              <>Today</>
                            ) : (
                              <>{val.timestamp.slice(0, 10)}</>
                            )}
                          </span>

                          <div className="flex-grow h-px bg-gray-400"></div>
                        </div>
                      </>
                    ) : (
                      <>
                        {val?.createdAt?.slice(0, 10).toString() !==
                        chat[ind - 1]?.createdAt?.slice(0, 10).toString() ? (
                          <>
                            <div className="flex items-center py-4 mx-10">
                              <div className="flex-grow h-px bg-gray-400"></div>

                              <span className="flex-shrink text-base font-dm text-[#ffffff] px-4  font-normal">
                                {val?.createdAt?.slice(0, 10)}
                              </span>

                              <div className="flex-grow h-px bg-gray-400"></div>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}

                    {val.sender !== user.user.id ? (
                      <>
                        <div className="mt-5">
                          <LeftSideChatGroup message={val} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <RightSideChatGroup message={val} />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="my-[20px] mx-10 mb-10">
        <div className="relative">
          <div
            className="cursor-pointer absolute top-3.5 right-2"
            onClick={sendMsg}
          >
            <svg
              width="15"
              height="12"
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.48647 12.7028L9.95408 11.2092C10.6209 11.076 10.6209 10.8592 9.95408 10.726L2.48647 9.23244C2.04167 9.14364 1.60847 8.71004 1.51967 8.26564L0.0260634 0.798029C-0.107537 0.130828 0.285664 -0.179173 0.903665 0.106027L23.6913 10.6232C24.1029 10.8132 24.1029 11.122 23.6913 11.312L0.903665 21.8293C0.285664 22.1145 -0.107537 21.8045 0.0260634 21.1373L1.51967 13.6696C1.60847 13.2252 2.04167 12.7916 2.48647 12.7028Z"
                fill="white"
              />
            </svg>
          </div>
          <div
            onClick={handleClick}
            className=" mb-10 cursor-pointer absolute top-3 right-10"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9156 5.40889L7.30684 13.0926C6.58192 13.8258 6.17479 14.8196 6.17479 15.8556C6.17479 16.8916 6.58192 17.8853 7.30684 18.6186C8.03289 19.3507 9.01703 19.7618 10.0431 19.7618C11.0692 19.7618 12.0534 19.3507 12.7794 18.6186L19.261 12.0756C19.3785 11.9592 19.4721 11.8205 19.5363 11.6675C19.6004 11.5144 19.6339 11.35 19.6347 11.1838C19.6355 11.0176 19.6037 10.8529 19.5411 10.6992C19.4785 10.5455 19.3863 10.4058 19.2699 10.2883C19.1535 10.1708 19.0152 10.0777 18.8629 10.0145C18.7107 9.9513 18.5475 9.91919 18.3829 9.92003C18.2183 9.92087 18.0555 9.95464 17.9039 10.0194C17.7523 10.0842 17.6149 10.1786 17.4997 10.2973L11.0181 16.8404C10.7591 17.1006 10.4086 17.2467 10.0431 17.2467C9.6777 17.2467 9.32715 17.1006 9.06813 16.8404C8.80995 16.5791 8.66496 16.2251 8.66496 15.856C8.66496 15.4869 8.80995 15.1329 9.06813 14.8716L16.6769 7.18797C17.4284 6.43121 18.4465 6.00623 19.508 6.00623C20.5694 6.00623 21.5875 6.43121 22.339 7.18797C22.7118 7.56264 23.0074 8.00819 23.2086 8.49887C23.4099 8.98954 23.5128 9.51561 23.5115 10.0467C23.5129 10.5778 23.41 11.1039 23.2087 11.5945C23.0075 12.0852 22.7119 12.5308 22.339 12.9054L13.8026 21.5248C12.5505 22.789 10.8856 23.4842 9.11426 23.4842C7.3429 23.4842 5.68058 22.789 4.42839 21.5248C1.84348 18.915 1.84348 14.6701 4.42839 12.0603L14.2379 2.15556C14.3555 2.03924 14.4491 1.90053 14.5132 1.74746C14.5774 1.5944 14.6108 1.43002 14.6117 1.26382C14.6125 1.09762 14.5807 0.9329 14.5181 0.77919C14.4555 0.625479 14.3633 0.485826 14.2469 0.368303C14.1305 0.250781 13.9922 0.157722 13.8399 0.0945074C13.6877 0.0312927 13.5245 -0.000823373 13.3599 1.60394e-05C13.1953 0.000855452 13.0325 0.0346337 12.8809 0.0993978C12.7293 0.164162 12.5919 0.258627 12.4766 0.37733L2.6671 10.2821C-0.889032 13.8716 -0.889032 19.7135 2.6671 23.303C4.38897 25.0414 6.67865 26 9.1151 26C11.5515 26 13.8412 25.0414 15.5639 23.303L24.1003 14.6837C26.6332 12.1264 26.6332 7.96701 24.1003 5.40973C21.5699 2.855 17.4485 2.85246 14.9165 5.40973L14.9156 5.40889Z"
                fill="white"
              />
            </svg>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>
          <input
            type="text"
            className="bg-[#212121]   text-white text-sm placeholder-lexend text-lexend rounded-md w-full pl-10 p-2.5  placeholder-gray-400"
            placeholder="Type Message Here"
            required=""
            onChange={handleChangeMsg}
            value={sendChat}
          />
        </div>
      </div>
    </>
  );
}
