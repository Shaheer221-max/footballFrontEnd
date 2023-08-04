import React, { useState, useContext, useEffect } from "react";
import RecentChats from "../Components/RecentChats";
import "../styles/font.css";
import ChatBox from "../Components/ChatBox";
import ChatParentalProfile from "../Components/ChatParentalProfile";
import axios from "axios";
import { useParams, useLocation, Link } from "react-router-dom";
import { Divider, message, Modal } from "antd";
import { useSelector } from "react-redux";

export default function CoachChat() {
  const hiddenFileInput = React.useRef(null);
  const [img, setImg] = useState(false);
  const [Recievername, setRecieverName] = useState(false);
  const [to, setTo] = useState(false);
  const [status, setStatus] = useState(false);
  const [sendChat, setSendChat] = useState("");
  const [phone, setPhone] = useState(false);
  const [position, setPosition] = useState(false);
  const [Senderphone, setSenderPhone] = useState(false);
  const [Senderposition, setSenderPosition] = useState(false);
  const [Sendername, setSenderName] = useState(false);
  const [SenderImg, setSenderImg] = useState(false);
  const [chat, setChat] = useState([]);
  const [userId, setUserId] = useState();
  const [name, setGroupName] = useState("");
  const [image, setImage] = useState();
  const [url, setUrl] = useState();
  const [players, setPlayers] = useState([]);
  const [members, setMembers] = useState([]);

  const { user } = useSelector((state) => state);
  console.log(user.socket);

  const createGroup = async () => {
    if (name === "" || members.length === 0) {
      message.error("Please Enter Group Name");
      return;
    }
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
        message.success("Group Created");
        
        setImage("")
        setIsModalOpen(false);
        console.log(res.data.data);
      })
      .catch((error) => {
        // message.error("Group Not Created");
        console.log(error);
      });
  };

  const params = useParams();
  console.log("Params: ", params.id);

  const location = useLocation();
  console.log("Location: ", location);

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
        console.log(error.response.data);
      });
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange1 = (event) => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("upload_preset", "player_image");
    //data.append("cloud_name","dyapmvalo");
    axios
      .post("https://api.cloudinary.com/v1_1/dyapmvalo/image/upload", data)
      .then((res) => {
        console.log(res.data.url);
        setImage(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("upload_preset", "player_image");
    //data.append("cloud_name","dyapmvalo");
    axios
      .post("https://api.cloudinary.com/v1_1/dyapmvalo/image/upload", data)
      .then((res) => {
        console.log(res.data.url);
        setUrl(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AllMessages = async () => {
    console.log("first");
    await axios
      .get(
        `${process.env.REACT_APP_API}/message/${params.id}`
      )
      .then((res) => {
        console.log(res.data);
        setChat(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const sendMsg = async () => {
    console.log("second", user.user._id);
    user.socket.current.emit("sendMessage", {
      senderId: user.user._id,
      receiverId: location?.state?.members?.filter(
        (item) => item._id !== user.user._id
      )[0]._id,
      text: sendChat,
    });
    await axios
      .post(`${process.env.REACT_APP_API}/message/`, {
        conversationId: params.id,
        sender: user.user._id,
        text: url ? url : sendChat,
      })
      .then((res) => {
        setSendChat("");
        setUrl("");
        console.log(res.data);
        console.log("msg sent");
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
  }, [params.id]);

  const getPlayers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/GetAllPlayers`)
      .then((res) => {
        console.log("Players: ", res.data.data);
        setPlayers(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
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
                    {
                      isMember(player._id) ? (
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
            <Link to="/chat">
              <button
                className="bg-green-500 p-2 rounded-sm mt-4 h-[44px] px-7 text-16 text-white font-lexand"
                style={{ fontSize: 16, fontWeight: 300 }}
                onClick={createGroup}
              >
                Create
              </button>
            </Link>
          </div>
        </Modal>
        {/* Page Header */}
        {/* <Header title={"Chats"} /> */}
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="mt-[32px] ml-9 mb-9"
        >
          <h1 className="text-white text-[32px]">Chats</h1>
          <button
            onClick={() => {
              console.log("clicked");
              showModal();
            }}
            className="self-center text-20 font-medium bg-green-500 p-2 rounded-md text-white whitespace-nowrap  ml-9"
          >
            Create New Chat Group
          </button>
        </div>
        <div className="flex   divide-x divide-[#7e7e7e] h-screen mb-10">
          {/* left side-bar details  */}
          <div className="w-2/5 ml-8 mr-3">
            <RecentChats
              setRecieverName={setRecieverName}
              setState={setStatus}
              setTo={setTo}
              setImg={setImg}
              setPosition={setPosition}
              setPhone={setPhone}
              setChat={setChat}
              setSenderName={setSenderName}
              setSenderImg={setSenderImg}
              setSenderPhone={setSenderPhone}
              setSenderPosition={setSenderPosition}
            />
          </div>

          {/* center Post */}

          <div className=" w-full mb-5">
            <ChatBox id={params.id} />
            <>
              {/* <div className="my-[20px] mx-10 mb-10">
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
              </div> */}
            </>
          </div>

          {/* right side-bar parent profile */}

          <div className="  mr-10 mb-4  w-1/4">
            <ChatParentalProfile
              RecieverName={Recievername}
              status={status}
              to={to}
              img={img}
              phone={phone}
              position={position}
            />
          </div>
        </div>
      </div>
    </>
  );
}
