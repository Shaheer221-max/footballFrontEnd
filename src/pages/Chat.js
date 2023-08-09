import React, { useState, useContext, useEffect } from "react";
import RecentChats from "../Components/RecentChats";
import "../styles/font.css";
import ChatBox from "../Components/ChatBox";
import ChatParentalProfile from "../Components/ChatParentalProfile";
import axios from "axios";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { Divider, message, Modal } from "antd";
import { useSelector } from "react-redux";

export default function Chat() {
  const hiddenFileInput = React.useRef(null);
  const [chat, setChat] = useState([]);
  const [userId, setUserId] = useState();
  const [name, setGroupName] = useState("");
  const [image, setImage] = useState();
  const [url, setUrl] = useState();
  const [players, setPlayers] = useState([]);
  const [members, setMembers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const navigation = useNavigate();

  const { user } = useSelector((state) => state);

  const createGroup = async () => {
    if (name === "") {
      message.error("Please Enter Group Name");
      return;
    }
    if (url === ""){
      message.error("Please upload group picture");
      return;
    }
    setRefresh(true);
    await axios
      .post(
        `${process.env.REACT_APP_API}/groupconversation/CreateGroupChat`,
        {
          title: name,
          Members: members,
          groupimage: url,
        }
      )
      .then((res) => {
        setRefresh(false);
        message.success("Group Created");
        navigation(`/chat/group/${res.data.data.groupchat._id}`);
        setGroupName("");
        // setMembers([]);
        setIsModalOpen(false);
        console.log('response',res.data.data);
      })
      .catch((error) => {
        // message.error("Group Not Created");
        console.log(error);
      });
  };

  const params = useParams();

  const token = localStorage.getItem("token");

  const getUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserId(res.data.data.doc.id);
      })
      .catch((error) => {
      });
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange1 = (event) => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("upload_preset", "player_image");
    axios
      .post("https://api.cloudinary.com/v1_1/dyapmvalo/image/upload", data)
      .then((res) => {

        setImage(res.data.url);
        setUrl(res.data.url);
      })
      .catch((err) => {
   
      });
  };

  const AllMessages = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API}/message/${params.id}`
      )
      .then((res) => {
    
        setChat(res.data);
      })
      .catch((error) => {
      
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    getUser();
    AllMessages();
    getPlayers();
  }, [params.id, refresh]);

  const getPlayers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/GetAllPlayers`)
      .then((res) => {
        setPlayers(res.data.data);
      })
      .catch((error) => {
  
      });
  };
  const isMember = (id) => members.some((member) => member._id === id);
  const toggleMember = (player) => {
    if (isMember(player._id)) {
      setMembers(members.filter((member) => member._id !== player._id));
    } else {
      setMembers([...members, player]);
    }
  };

  return (
    <>
      <div className="flex-col w-full font-lexend">
        <Modal
          footer={null}
          title="Create New Chat Group"
          className="custom-modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
        >
          <Divider className="#333333" />
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
            {/* <svg
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
            </svg> */}
            <input
              style={{ backgroundColor: "transparent", border: "none" }}
              type="text"
              placeholder="Group Name"
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div
            onClick={handleClick}
            className="cursor-pointer mt-3 font-lexend flex items-center gap-5 py-4 px-4 text-white/80 text-xs rounded-md  bg-[#212121]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.625 0H4.375C1.95967 0.00224297 0.00224297 1.95967 0 4.375V30.625C0.00224297 33.0403 1.95967 34.9978 4.375 35H30.625C33.0403 34.9978 34.9978 33.0403 35 30.625V4.375C34.9978 1.95967 33.0403 0.00224297 30.625 0ZM4.375 33.25C2.92589 33.2484 1.7516 32.0741 1.75 30.625V21.4819L8.33472 14.8972C9.53175 13.7043 11.4682 13.7043 12.6653 14.8972L30.9834 33.2136C30.8651 33.23 30.7477 33.2499 30.625 33.25H4.375ZM33.25 30.625C33.2493 31.2871 32.9955 31.8848 32.5908 32.3465L20.4875 20.2443L22.3347 18.3972C23.5318 17.2043 25.4682 17.2043 26.6653 18.3972L33.25 24.9819V30.625ZM33.25 22.5074L27.9026 17.16C26.0223 15.2836 22.9777 15.2836 21.0974 17.16L19.2503 19.0071L13.9026 13.6599C11.9986 11.8416 9.00143 11.8416 7.09741 13.6599L1.75 19.0073V4.375C1.7516 2.92589 2.92589 1.7516 4.375 1.75H30.625C32.0741 1.7516 33.2484 2.92589 33.25 4.375V22.5074Z"
                fill="white"
              />
            </svg>

            <div>Upload Group Picture</div>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange1}
              style={{ display: "none" }}
            />
          </div>
          <div className="mt-3">
            <div className=" gap-5 py-4 px-4 text-white/80 text-xs rounded-md  bg-[#212121]">
              <h5>Add Members</h5>
              <div className="flex flex-col items-left mt-2 gap-2">
                {players.map((player) => (
                  <div className="flex items-center mt-4 gap-2">
                    <img
                      src={player.image}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-md">{player.name}</p>

                    {/* + Sign SVG */}
                    {isMember(player._id)? (
                      <svg
                        className="ml-auto cursor-pointer"
                        width="16"
                        height="16"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => toggleMember(player)}
                      >
                        <path
                          d="M9 0C4.0275 0 0 4.0275 0 9C0 13.9725 4.0275 18 9 18C13.9725 18 18 13.9725 18 9C18 4.0275 13.9725 0 9 0ZM13.5 9.9H4.5V8.1H13.5V9.9Z"
                          fill="#FF0000"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer ml-auto"
                        onClick={() => toggleMember(player)}
                      >
                        <path
                          d="M12.5 0C5.596 0 0 5.596 0 12.5C0 19.404 5.596 25 12.5 25C19.404 25 25 19.404 25 12.5C25 5.596 19.404 0 12.5 0ZM19 13.5H13.5V19C13.5 19.2652 13.3946 19.5196 13.2071 19.7071C13.0196 19.8946 12.7652 20 12.5 20C12.2348 20 11.9804 19.8946 11.7929 19.7071C11.6054 19.5196 11.5 19.2652 11.5 19V13.5H6C5.73478 13.5 5.48043 13.3946 5.29289 13.2071C5.10536 13.0196 5 12.7652 5 12.5C5 12.2348 5.10536 11.9804 5.29289 11.7929C5.48043 11.6054 5.73478 11.5 6 11.5H11.5V6C11.5 5.73478 11.6054 5.48043 11.7929 5.29289C11.9804 5.10536 12.2348 5 12.5 5C12.7652 5 13.0196 5.10536 13.2071 5.29289C13.3946 5.48043 13.5 5.73478 13.5 6V11.5H19C19.2652 11.5 19.5196 11.6054 19.7071 11.7929C19.8946 11.9804 20 12.2348 20 12.5C20 12.7652 19.8946 13.0196 19.7071 13.2071C19.5196 13.3946 19.2652 13.5 19 13.5Z"
                          fill="#1DB954"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* <Link to="/chat"> */}
            <button
              className="bg-green-500 p-2 rounded-sm mt-4 h-[44px] px-7 text-16 text-white font-lexand"
              style={{ fontSize: 16, fontWeight: 300 }}
              onClick={createGroup}
            >
              Create
            </button>
            {/* </Link> */}
          </div>
        </Modal>

        <div
          style={{ display: "flex", alignItems: "center" }}
          className="mt-[32px] ml-9 mb-9"
        >
          <h1 className="text-white text-[32px]">Chats</h1>
          <button
            onClick={() => {
              showModal();
            }}
            className="self-center text-20 font-medium bg-green-500 p-2 rounded-md text-white whitespace-nowrap  ml-9"
          >
            Create New Chat Group
          </button>
        </div>

        <div className="flex   divide-x divide-[#7e7e7e] h-[calc(100vh-115px)] overflow-y-auto">
          {/* left side-bar details  */}
          <div className="w-[40%] ml-8">
            <RecentChats refresh={refresh} />
          </div>

          {/* center Post */}

          <div className="w-full mb-5">
            <ChatBox id={params.id} />
          </div>

          <div className="mb-4">
            <ChatParentalProfile />
          </div>
        </div>
      </div>
    </>
  );
}
