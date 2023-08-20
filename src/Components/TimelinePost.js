import React, { useContext } from "react";
import "../styles/font.css";
import "../styles/background.css";
import { useState, useEffect } from "react";
import axios from "../axios";
import Moment from "react-moment";

import { Dropdown, message } from "antd";
import { useSelector } from "react-redux";
import Spinner from "../admin/Spinner";
import { AuthContext } from "../admin/ActiveUser";
import moment from "moment";

export default function TimelinePost(props) {
  const [post, SetPost] = useState([]);
  const [likeId, setLikeId] = useState(false);
  const [likes, setLikes] = useState(false);
  const [like, setLike] = useState([]);
  const [comment, setComment] = useState([]);
  const [postId, setPostId] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [load, setLoad] = useState([]);
  const [likeLoading, setLikeLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  const { user } = useSelector((state) => state);

  const handleClick = (index) => {
    const newCommentsOpen = [...load];
    newCommentsOpen[index] = !load[index];
    setLoad(newCommentsOpen);
  };

  const handleChange1 = (index, event) => {
    const newComments = [...comment];
    newComments[index] = event.target.value;
    setComment(newComments);
  };

  const [replies, setReply] = useState([]);
  const handleChange2 = (index, event) => {
    const newComments = [...comment];
    newComments[index] = event.target.value;
    setReply(newComments);
  };

  // getting all posts
  const memberName = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/newsfeed/GetAllNewsFeed`)
      .then((res) => {
        SetPost(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    memberName();
  }, [refresh, user]);

  const addLike = async (val) => {
    setLikeLoading(true);
    await axios
      .post(`${process.env.REACT_APP_API}/like/PostLike`, {
        refOfNewsfeed: val._id,
        refOfUser: user.user.id,
      })
      .then((response) => {
        setLikeLoading(false);
        setLikes(true);
        setLikeId(response.data.data.doc._id);
        memberName();
      });
  };

  const deleteLike = async (val) => {
    setLikeLoading(true);
    await axios
      .post(`${process.env.REACT_APP_API}/like/DeleteLike`, {
        refOfNewsfeed: val._id,
        refOfUser: user.user.id,
      })
      .then((response) => {
        setLikeLoading(false);
        console.log("like removed");
        setLikes(false);
        memberName();
      });
  };

  const AddComment = async (val, ind) => {
    console.log("in add comment", val, comment[ind]);
    setRefresh(true);
    setCommentLoading(true);
    await axios
      .post(`${process.env.REACT_APP_API}/comment/PostComment`, {
        refOfNewsfeed: val._id,
        comment: comment[ind],
        refOfUser: user.user.id,
      })
      .then((response) => {
        setCommentLoading(false);
        message.success("Comment Added");
        setRefresh(false);
        setComment("");
        console.log("commented");
        // memberName();
      });
  };

  // Reply Comment
  const ReplyComment = async (val, ind) => {
    console.log("in reply comment", val, replies[ind]);
    setRefresh(true);
    setCommentLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_API}/comment/AddReplyToComment/${val._id}`,
        {
          text: replies[ind],
          refOfUser: user.user.id,
        }
      )
      .then((response) => {
        setCommentLoading(false);
        message.success("Reply Added");
        setReply("");
        setRefresh(false);
        setComment("");
        console.log("commented");
        console.log(response.data);
        // memberName();
      });
  };

  const [load1, setLoad1] = useState([]);
  // When i click on reply button it will show the input field
  const reply = (index) => {
    console.log("in reply", index);
    const newCommentsOpen = [...load1];
    newCommentsOpen[index] = !load1[index];
    setLoad1(newCommentsOpen);
  };

  // delete Post
  const deletePost = async () => {
    setRefresh(true);
    console.log("in delete post", postId);
    await axios
      .delete(`${process.env.REACT_APP_API}/newsfeed/DeleteNewsFeed/${postId}`)
      .then((response) => {
        setRefresh(false);
        message.success("Post Deleted");
        console.log("post deleted");
        // memberName();
      });
  };

  const sharePost = async (val) => {
    setRefresh(true);
    await axios
      .post(`${process.env.REACT_APP_API}/newsfeed/ShareNewsFeed`, {
        refOfUser: user.user.id,
        status: val.status,
        image: val.image,
        video: val.video,
        refOfGroup: val.refOfGroup,
      })
      .then(() => {
        message.success("Post Shared");
        setRefresh(false);
      });
  };

  const items = [
    {
      label: <a onClick={deletePost}>Delete Post</a>,
      key: "0",
    },
  ];

  const hiddenFileInputphoto = React.useRef(null);
  const hiddenFileInputvideo = React.useRef(null);
  const [postt, setpostt] = useState("");
  const [img, setimg] = useState(false);
  const [vid, setvid] = useState(false);
  const [posts, setPost] = useState([]);
  const { id, setActiveId } = useContext(AuthContext);
  const [Activemage, setActiveImage] = useState(false);
  const [selected, setSelected] = useState(false);
  const [name, setName] = useState(false);
  // const [refresh, setRefresh] = useState(false);
  const [video, setVideo] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const token = localStorage.getItem("token");

  // const {user} = useSelector((state) => state);

  function formatDuration(createdDate) {
    const now = new Date();
    const durationInSeconds = Math.floor((now - new Date(createdDate)) / 1000);

    const minutes = Math.floor(durationInSeconds / 60);
    const hours = Math.floor(durationInSeconds / (60 * 60));
    const days = Math.floor(durationInSeconds / (60 * 60 * 24));
    const weeks = Math.floor(durationInSeconds / (60 * 60 * 24 * 7));
    const months = Math.floor(durationInSeconds / (60 * 60 * 24 * 30.44)); // Average days in a month
    const years = Math.floor(durationInSeconds / (60 * 60 * 24 * 365));

    if (years > 0) return years === 1 ? "1y" : `${years}y`;
    if (months > 0) return months === 1 ? "1m" : `${months}m`;
    if (weeks > 0) return weeks === 1 ? "1w" : `${weeks}w`;
    if (days > 0) return days === 1 ? "1d" : `${days}d`;
    if (hours > 0) return hours === 1 ? "1h" : `${hours}h`;
    if (minutes > 0) return minutes === 1 ? "1min" : `${minutes}mins`;

    return "Just now";
  }

  //currently time is in utc we are converting it to localtime.
  function convertUtcToLocalTime(utcTimestamp) {
    const localTime = new Date(utcTimestamp).toLocaleTimeString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });

    return localTime;
  }

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setActiveId(res.data.data.doc.id);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  React.useEffect(() => {
    getData();
  }, [refresh]);

  const date = new Date();
  const handleClickphoto = (event) => {
    hiddenFileInputphoto.current.click();
  };
  const handleClickvideo = (event) => {
    hiddenFileInputvideo.current.click();
  };
  const handleChangephoto = (event) => {
    setName(event.target.files[0].name);
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("upload_preset", "player_image");
    data.append("height", 300); // set height
    data.append("width", 500);
    //data.append("cloud_name","dyapmvalo");
    axios
      .post("https://api.cloudinary.com/v1_1/dyapmvalo/image/upload", data)
      .then((res) => {
        setimg(res.data.url);
        setvid(false);
        setSelected(true);
        console.log(res.data.url);
      })
      .catch((err) => {
        console.log("Image not Selected");
      });
  };
  const handleChangevideo = (event) => {
    setName(event.target.files[0].name);
    setVideo(event.target.files[0]);
  };

  const handlePostChange = (event) => {
    setpostt(event.target.value);
  };

  const sendPost = async () => {
    if (postt === "" && !img && !video) {
      message.error("Post not Uploaded");
      return;
    }
    setPostLoading(true);
    setRefresh(true);
    if (video) {
      const data = new FormData();
      data.append("file", video);
      data.append("upload_preset", "player_image");
      data.append("refOfUser", user.user.id);
      data.append("status", postt);
      await axios
        .post(`${process.env.REACT_APP_API}/newsfeed/PostNewsFeed`, data)
        .then((res) => {
          setRefresh(false);
          setPostLoading(false);
          message.success("Post Uploaded");
          SetPost([res.data.data, ...post]);
          SetPost(post.reverse());
          setpostt("");
          setimg("");
          setName("");
        })
        .catch((error) => {
          console.log(error);
          message.error("Post not Uploaded");
        });
    } else {
      setRefresh(true);
      await axios
        .post(`${process.env.REACT_APP_API}/newsfeed/PostNewsFeed`, {
          refOfUser: user.user.id,
          status: postt,
          image: img,
        })
        .then((res) => {
          setRefresh(false);
          setPostLoading(false);          
          SetPost([res.data.data, ...post]);
          SetPost(post.reverse());
          message.success("Post Uploaded");
          setimg("");
          setpostt("");
          setName("");

        })
        .catch((error) => {
          console.log(error);
          message.error("Post not Uploaded");
        });
    }
  };

  return (
    <div className="">
      <div className="mx-[22px] ">
        <div className=" px-7 pt-8 pb-6 font-lexend lg:w-full min-w-sm text-center bg-[#212121] rounded-lg  ">
          <div className=" gap-5 flex mt-2">
            {user.user ? (
              <>
                <img
                  className=" w-10 h-10 rounded-full "
                  src={user?.user.image}
                  alt="Bonnie image"
                />
              </>
            ) : (
              <>
                <div className=" w-10 h-10 rounded-full bg-white"></div>
              </>
            )}

            <input
              type="text"
              className="w-full bg-[#1A1A1A] font-lexend  placeholder-lexend text-white text-sm font-normal rounded-lg block  pl-7 py-2.5  placeholder-gray-400 "
              placeholder="Post something"
              required=""
              onChange={handlePostChange}
              value={postt}
            />
          </div>
          {selected ? (
            <div>
              <p className="text-white text-sm text-left ml-10 pl-5 pt-2"></p>
            </div>
          ) : (
            <></>
          )}
          <div className="mt-5">
            <div className="flex ml-14 ">
              <button
                onClick={handleClickphoto}
                className="inline-flex ml-1   py-2 px-4 text-sm font-normal text-white bg-[#191919] rounded-2xl "
              >
                <svg
                  className="mr-3"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V15C0 15.7956 0.316071 16.5587 0.87868 17.1213C1.44129 17.6839 2.20435 18 3 18H15C15.7956 18 16.5587 17.6839 17.1213 17.1213C17.6839 16.5587 18 15.7956 18 15V3C18 2.20435 17.6839 1.44129 17.1213 0.87868C16.5587 0.316071 15.7956 0 15 0ZM3 2H15C15.2652 2 15.5196 2.10536 15.7071 2.29289C15.8946 2.48043 16 2.73478 16 3V11.36L12.8 8.63C12.3042 8.22204 11.6821 7.99899 11.04 7.99899C10.3979 7.99899 9.7758 8.22204 9.28 8.63L2 14.7V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2Z"
                    fill="#D5D5D5"
                  />
                  <path
                    d="M5 7C5.82843 7 6.5 6.32843 6.5 5.5C6.5 4.67157 5.82843 4 5 4C4.17157 4 3.5 4.67157 3.5 5.5C3.5 6.32843 4.17157 7 5 7Z"
                    fill="#D5D5D5"
                  />
                </svg>
                Photo
              </button>
              <input
                type="file"
                ref={hiddenFileInputphoto}
                onChange={handleChangephoto}
                style={{ display: "none" }}
              />
              <button
                onClick={handleClickvideo}
                className="inline-flex  py-2 ml-[15px] px-4 text-sm font-normal text-white bg-[#191919] rounded-2xl"
              >
                <svg
                  className="mr-3"
                  width="22"
                  height="18"
                  viewBox="0 0 22 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 3.58826V14.4157C21.999 15.366 21.6195 16.2771 20.9449 16.949C20.2702 17.621 19.3555 17.999 18.4014 18H3.6025C2.64738 17.999 1.73167 17.6206 1.0563 16.9479C0.380922 16.2752 0.00103987 15.3631 0 14.4117V3.58826C0.00103987 2.63691 0.380922 1.72483 1.0563 1.05212C1.73167 0.379416 2.64738 0.00103576 3.6025 0H18.3975C19.3526 0.00103576 20.2683 0.379416 20.9437 1.05212C21.6191 1.72483 21.999 2.63691 22 3.58826ZM10.0179 13.1596L14.5711 10.4204C14.8199 10.2706 15.0257 10.0593 15.1686 9.80707C15.3115 9.5548 15.3865 9.27007 15.3865 8.98043C15.3865 8.6908 15.3115 8.40607 15.1686 8.1538C15.0257 7.90153 14.8199 7.69026 14.5711 7.54043L10.0179 4.84044C9.76205 4.68729 9.47 4.60456 9.17157 4.60069C8.87314 4.59682 8.57903 4.67196 8.31931 4.81842C8.05959 4.96488 7.84357 5.17741 7.69335 5.43428C7.54312 5.69116 7.46407 5.98316 7.46429 6.28043V11.7391C7.46147 12.0373 7.53956 12.3307 7.6903 12.5883C7.84105 12.8459 8.05886 13.0581 8.32071 13.2026C8.5737 13.345 8.85908 13.4204 9.14964 13.4217C9.45786 13.4162 9.75847 13.3255 10.0179 13.1596V13.1596ZM9.20857 6.18261L13.7618 8.92174C13.7789 8.93176 13.7931 8.94605 13.8029 8.96321C13.8128 8.98037 13.818 8.9998 13.818 9.01956C13.818 9.03933 13.8128 9.05876 13.8029 9.07592C13.7931 9.09308 13.7789 9.10737 13.7618 9.11739L9.20857 11.8565C9.18978 11.8684 9.16791 11.8745 9.14567 11.8741C9.12342 11.8738 9.10177 11.8669 9.08339 11.8544C9.06501 11.842 9.0507 11.8244 9.04222 11.8039C9.03375 11.7834 9.03149 11.7609 9.03571 11.7391V6.28043C9.03483 6.25965 9.0399 6.23905 9.05033 6.22104C9.06077 6.20302 9.07614 6.18833 9.09464 6.1787C9.11266 6.17388 9.13163 6.17388 9.14964 6.1787C9.1691 6.17271 9.19009 6.17411 9.20857 6.18261ZM4.32143 7.04348V4.69565C4.32143 4.48809 4.23865 4.28903 4.0913 4.14226C3.94395 3.9955 3.7441 3.91304 3.53571 3.91304C3.32733 3.91304 3.12748 3.9955 2.98013 4.14226C2.83278 4.28903 2.75 4.48809 2.75 4.69565V7.04348C2.75 7.25104 2.83278 7.4501 2.98013 7.59687C3.12748 7.74363 3.32733 7.82609 3.53571 7.82609C3.7441 7.82609 3.94395 7.74363 4.0913 7.59687C4.23865 7.4501 4.32143 7.25104 4.32143 7.04348Z"
                    fill="#1DB954"
                  />
                </svg>
                Video
              </button>
              <input
                type="file"
                ref={hiddenFileInputvideo}
                onChange={handleChangevideo}
                style={{ display: "none" }}
              />
              <button
                onClick={sendPost}
                className="inline-flex  py-2 px-7 ml-auto text-sm font-normal text-white bg-green-500 rounded-[4px] "
              >
                {postLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                ) : (
                  "Post"
                )}
              </button>
            </div>
          </div>
          {img ? (
            <div className="text-white mt-5">
              <img src={img} alt="" className="w-full h-full" />
            </div>
          ) : null}
          {name && !img ? (
            <div className="text-white mt-5">
              <p>{name}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className=" mx-[22px] my-10  ">
        {post.length > 0 ? (
          <>
            {post.map((val, ind) => {
              return (
                <>
                  {/* if post img */}
                  <div className="mt-5 px-4 pb-2 font-lexend lg:w-full min-w-sm text-center bg-[#212121] rounded-lg  ">
                    <div className="flex items-center gap-2  mb-8 ml-4">
                      <img
                        className=" mt-[34px] w-9 h-9 rounded-full "
                        src={val?.refOfUser?.image}
                        alt="Bonnie image"
                      />

                      <div className="mt-[31px]">
                        <div className="flex align-middle">
                          {/* <p className="font-lexend font-normal text-left text-xs text-gray-400">
                            {val?.refOfUser?.email}
                          </p> */}
                          <h5 className="text-base  font-normal tracking-tight text-white">
                            {val?.refOfUser?.name}
                          </h5>
                          <div className="inline-flex font-dm ml-3 items-center px-[10px]  text-xs font-medium text-white bg-green-500 rounded-md ">
                            {val?.refOfUser?.role}
                          </div>
                        </div>
                        <div className="flex font-lexend mt-1  items-center gap-4">
                          <h5 className="text-xs  font-normal tracking-tight text-white">
                            {convertUtcToLocalTime(val?.time)}
                          </h5>

                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 9 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="4.5" cy="4.5" r="4.5" fill="#1DB954" />
                          </svg>

                          <h5 className=" text-xs font-light tracking-tight text-white">
                            {moment(val?.time).format("dddd, MMMM Do YYYY")}
                          </h5>
                        </div>
                      </div>
                      <Dropdown
                        menu={{
                          items,
                        }}
                        trigger={["click"]}
                      >
                        <button
                          className="ml-auto"
                          onClick={() => setPostId(val._id)}
                        >
                          <svg
                            className="ml-auto"
                            width="19"
                            height="5"
                            viewBox="0 0 19 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.201 5.68597e-08C8.91196 5.07687e-08 8.62575 0.0569305 8.35871 0.167541C8.09168 0.278152 7.84904 0.440276 7.64466 0.644658C7.44028 0.84904 7.27815 1.09168 7.16754 1.35871C7.05693 1.62575 7 1.91196 7 2.201C7 2.49004 7.05693 2.77625 7.16754 3.04329C7.27815 3.31032 7.44028 3.55296 7.64466 3.75734C7.84904 3.96172 8.09168 4.12385 8.35871 4.23446C8.62575 4.34507 8.91196 4.402 9.201 4.402C9.78474 4.40187 10.3445 4.16985 10.7572 3.75699C11.1699 3.34413 11.4016 2.78424 11.4015 2.2005C11.4014 1.61676 11.1693 1.05698 10.7565 0.644304C10.3436 0.231631 9.78374 -0.000132534 9.2 5.68597e-08H9.201ZM2.201 5.68597e-08C1.91196 5.07687e-08 1.62575 0.0569305 1.35871 0.167541C1.09168 0.278152 0.84904 0.440276 0.644658 0.644658C0.440276 0.84904 0.278152 1.09168 0.167541 1.35871C0.0569305 1.62575 0 1.91196 0 2.201C0 2.49004 0.0569305 2.77625 0.167541 3.04329C0.278152 3.31032 0.440276 3.55296 0.644658 3.75734C0.84904 3.96172 1.09168 4.12385 1.35871 4.23446C1.62575 4.34507 1.91196 4.402 2.201 4.402C2.78474 4.40187 3.34452 4.16985 3.7572 3.75699C4.16987 3.34413 4.40163 2.78424 4.4015 2.2005C4.40137 1.61676 4.16935 1.05698 3.75649 0.644304C3.34363 0.231631 2.78374 -0.000132534 2.2 5.68597e-08H2.201ZM16.201 5.68597e-08C15.912 5.07687e-08 15.6258 0.0569305 15.3587 0.167541C15.0917 0.278152 14.849 0.440276 14.6447 0.644658C14.4403 0.84904 14.2782 1.09168 14.1675 1.35871C14.0569 1.62575 14 1.91196 14 2.201C14 2.49004 14.0569 2.77625 14.1675 3.04329C14.2782 3.31032 14.4403 3.55296 14.6447 3.75734C14.849 3.96172 15.0917 4.12385 15.3587 4.23446C15.6258 4.34507 15.912 4.402 16.201 4.402C16.7847 4.40187 17.3445 4.16985 17.7572 3.75699C18.1699 3.34413 18.4016 2.78424 18.4015 2.2005C18.4014 1.61676 18.1693 1.05698 17.7565 0.644304C17.3436 0.231631 16.7837 -0.000132534 16.2 5.68597e-08H16.201Z"
                              fill="white"
                            />
                          </svg>
                        </button>
                      </Dropdown>
                    </div>
                    {val.status ? (
                      <>
                        <p className="font-lexend p-4 font-normal leading-8 justify-between text-base text-start text-white/70 ">
                          {val.status}
                        </p>
                      </>
                    ) : (
                      <></>
                    )}

                    {val.image === "false" ? (
                      <></>
                    ) : (
                      <>
                        <img
                          className="mt-5 px-2 w-full rounded-md"
                          src={val.image}
                          style={{
                            height: "350px",
                            width: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </>
                    )}

                    {val.video ? (
                      <>
                        <div className="mt-5 pr-12 px-2 ml-2  w-full h-24">
                          <video
                            className="mt-5 px-2 w-full rounded-md h-24"
                            controls
                          >
                            <source src={val.video} type="video/mp4" />
                          </video>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="flex gap-2 mt-3 py-5 ml-6 border-b border-grey-500">
                      {val?.Like?.some(
                        (value) => value.refOfUser._id == user.user.id
                      ) ? (
                        <>
                          <div onClick={() => deleteLike(val)}>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 32 29"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className={
                                likeLoading ? "animate-pulse" : "cursor-pointer"
                              }
                            >
                              <path
                                d="M32 9.13888C32 4.26329 28.0476 0.310926 23.1729 0.310926C20.2136 0.310926 17.6022 1.77181 16 4.00475C14.3987 1.77181 11.7864 0.310926 8.82796 0.310926C3.95236 0.310926 0 4.26329 0 9.13888C0 9.82952 0.0876713 10.4987 0.237965 11.1437C1.46447 18.7586 9.931 26.7939 16 29C22.0681 26.7939 30.5364 18.7586 31.7602 11.1437C31.9123 10.4987 32 9.82952 32 9.13888Z"
                                fill="#BE1931"
                              />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            onClick={() => {
                              addLike(val);
                            }}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 32 29"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className={
                                likeLoading ? "animate-pulse" : "cursor-pointer"
                              }
                            >
                              <path
                                d="M32 9.13888C32 4.26329 28.0476 0.310926 23.1729 0.310926C20.2136 0.310926 17.6022 1.77181 16 4.00475C14.3987 1.77181 11.7864 0.310926 8.82796 0.310926C3.95236 0.310926 0 4.26329 0 9.13888C0 9.82952 0.0876713 10.4987 0.237965 11.1437C1.46447 18.7586 9.931 26.7939 16 29C22.0681 26.7939 30.5364 18.7586 31.7602 11.1437C31.9123 10.4987 32 9.82952 32 9.13888Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                        </>
                      )}

                      <h5 className="text-base pr-4 font-bold tracking-tight text-white">
                        {val?.Like?.length}
                      </h5>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={
                          commentLoading ? "animate-pulse" : "cursor-pointer"
                        }
                      >
                        <path
                          d="M15 0C11.0231 0.00448626 7.21043 1.58628 4.39835 4.39835C1.58628 7.21043 0.00448626 11.0231 0 15V27.65C0.000713846 28.2731 0.248539 28.8704 0.689107 29.3109C1.12967 29.7515 1.727 29.9993 2.35005 30H15C18.9782 30 22.7936 28.4196 25.6066 25.6066C28.4196 22.7936 30 18.9782 30 15C30 11.0218 28.4196 7.20644 25.6066 4.3934C22.7936 1.58035 18.9782 0 15 0ZM7.79971 17.4002C7.4437 17.4002 7.09569 17.2946 6.79968 17.0968C6.50367 16.899 6.27296 16.6179 6.13672 16.289C6.00049 15.9601 5.96484 15.5982 6.03429 15.249C6.10375 14.8998 6.27518 14.5791 6.52692 14.3274C6.77865 14.0756 7.09938 13.9042 7.44855 13.8347C7.79771 13.7653 8.15963 13.8009 8.48854 13.9372C8.81744 14.0734 9.09857 14.3041 9.29635 14.6001C9.49414 14.8961 9.59971 15.2441 9.59971 15.6002C9.59971 16.0775 9.41006 16.5354 9.0725 16.8729C8.73493 17.2105 8.2771 17.4001 7.79971 17.4001V17.4002ZM14.9997 17.4002C14.6437 17.4002 14.2957 17.2946 13.9997 17.0968C13.7037 16.899 13.473 16.6179 13.3367 16.289C13.2005 15.9601 13.1648 15.5982 13.2343 15.249C13.3037 14.8998 13.4752 14.5791 13.7269 14.3274C13.9787 14.0756 14.2994 13.9042 14.6485 13.8347C14.9977 13.7653 15.3596 13.8009 15.6885 13.9372C16.0174 14.0734 16.2986 14.3041 16.4964 14.6001C16.6941 14.8961 16.7997 15.2441 16.7997 15.6002C16.7997 16.0775 16.6101 16.5354 16.2725 16.8729C15.9349 17.2105 15.4771 17.4001 14.9997 17.4001V17.4002ZM22.1997 17.4002C21.8437 17.4002 21.4957 17.2946 21.1997 17.0968C20.9037 16.899 20.673 16.6179 20.5367 16.289C20.4005 15.9601 20.3648 15.5982 20.4343 15.249C20.5037 14.8998 20.6752 14.5791 20.9269 14.3274C21.1787 14.0756 21.4994 13.9042 21.8485 13.8347C22.1977 13.7653 22.5596 13.8009 22.8885 13.9372C23.2174 14.0734 23.4986 14.3041 23.6964 14.6001C23.8941 14.8961 23.9997 15.2441 23.9997 15.6002C23.9997 16.0775 23.8101 16.5354 23.4725 16.8729C23.1349 17.2105 22.6771 17.4001 22.1997 17.4001V17.4002Z"
                          fill="white"
                        />
                      </svg>
                      <h5
                        onClick={() => handleClick(ind)}
                        className="text-base cursor-pointer font-bold tracking-tight text-white"
                      >
                        {val?.Comment?.length} Comments
                      </h5>
                      <svg
                        className="ml-auto"
                        width="20"
                        height="20"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.665 8.25564L14.665 0.255639C14.5213 0.126486 14.3431 0.041842 14.1522 0.0119848C13.9613 -0.0178724 13.7658 0.00834123 13.5895 0.087443C13.4132 0.166545 13.2636 0.295132 13.159 0.457593C13.0543 0.620053 12.9991 0.809398 13 1.00264V4.20964C9.996 5.01564 0 8.76764 0 23.0026C0.000366134 23.2348 0.081496 23.4596 0.229476 23.6385C0.377455 23.8174 0.583063 23.9392 0.811038 23.983C1.03901 24.0269 1.27515 23.9901 1.47895 23.8789C1.68274 23.7677 1.8415 23.5891 1.928 23.3736C4.893 15.9606 10.673 14.4136 12.999 14.0906V17.0026C12.9988 17.1957 13.0545 17.3847 13.1593 17.5468C13.2642 17.7089 13.4137 17.8372 13.5899 17.9162C13.766 17.9951 13.9613 18.0215 14.1521 17.9919C14.3428 17.9624 14.521 17.8782 14.665 17.7496L23.665 9.74964C23.7704 9.65582 23.8548 9.54076 23.9125 9.41201C23.9703 9.28327 24.0002 9.14375 24.0002 9.00264C24.0002 8.86153 23.9703 8.72201 23.9125 8.59326C23.8548 8.46452 23.7704 8.34945 23.665 8.25564Z"
                          fill="white"
                        />
                      </svg>
                      <div className="relative">
                        <h5
                          onClick={() => sharePost(val)}
                          className="text-base font-bold tracking-tight text-white cursor-pointer"
                        >
                          Share
                        </h5>
                      </div>
                    </div>

                    <div className=" flex gap-4 pl-4 mt-4 mb-4">
                      {val ? (
                        <>
                          <img
                            className=" mt-[2px] w-5 h-5 rounded-full "
                            src={val.refOfUser.image}
                            alt="Bonnie image"
                          />
                        </>
                      ) : (
                        <>
                          <div className=" mt-[2px] w-9 h-9 rounded-full bg-white"></div>
                        </>
                      )}
                      <input
                        type="text"
                        className="w-full bg-[#1A1A1A]  text-white text-sm rounded-2xl block  pl-10 p-2.5  dark:placeholder-gray-400 "
                        placeholder="write comment"
                        required=""
                        onChange={(e) => handleChange1(ind, e)}
                        // Submit on Enter
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            AddComment(val, ind);
                          }
                        }}
                        value={comment[ind] || ""}
                      />
                      <div
                        className="mt-[10px]"
                        onClick={() => AddComment(val, ind)}
                      >
                        <svg
                          width="24"
                          height="22"
                          viewBox="0 0 24 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="cursor-pointer"
                        >
                          <path
                            d="M2.48647 12.7028L9.95408 11.2092C10.6209 11.076 10.6209 10.8592 9.95408 10.726L2.48647 9.23244C2.04167 9.14364 1.60847 8.71004 1.51967 8.26564L0.0260634 0.798029C-0.107537 0.130828 0.285664 -0.179173 0.903665 0.106027L23.6913 10.6232C24.1029 10.8132 24.1029 11.122 23.6913 11.312L0.903665 21.8293C0.285664 22.1145 -0.107537 21.8045 0.0260634 21.1373L1.51967 13.6696C1.60847 13.2252 2.04167 12.7916 2.48647 12.7028Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>

                    {load[ind] ? (
                      val.Comment.map((val, ind) => {
                        return (
                          <>
                            <div className="flex align-middle mb-3 ml-4">
                              <img
                                src={val?.refOfUser?.image}
                                className="rounded-full w-10 h-10 mr-3"
                                alt=""
                              />
                              <div className="text-gray-400 pl-4 bg-[#1A1A1A] p-2 rounded-2xl w-full text-left font-lexend text-sm">
                                <div className="flex align-middle">
                                  <p className="text-md text-white mb-2">
                                    {val?.refOfUser?.name}
                                  </p>
                                  <div className="inline-flex font-dm ml-3 items-center  px-[10px] text-xs font-medium text-white bg-green-500 rounded-md ">
                                    {val?.refOfUser?.role}
                                  </div>
                                </div>
                                <p>{val?.comment}</p>
                              </div>
                            </div>
                            <div className="flex ml-[68px] mb-5 text-white text-xs font-font-lexend">
                              <p className="ml-2">
                                {formatDuration(val?.createdDate)}
                              </p>
                              {/* <button className="btn text-xs">Like</button> */}
                              <button
                                onClick={() => reply(ind)}
                                className="ml-3"
                              >
                                Reply
                              </button>
                            </div>
                            {val?.replies?.map((val, ind) => {
                              return (
                                <>
                                  <div className="flex align-middle mb-3 ml-20">
                                    <img
                                      src={val?.refOfUser?.image}
                                      className="rounded-full w-7 h-7 mr-3"
                                      alt=""
                                    />
                                    <div className="text-gray-400 pl-4 bg-[#1A1A1A] p-2 rounded-2xl w-full text-left font-lexend text-xs">
                                      <div className="flex align-middle">
                                        <p className="text-md text-white mb-2">
                                          {val?.refOfUser?.name}
                                        </p>
                                        <div className="inline-flex font-dm ml-3 items-center px-[10px] text-xs font-medium text-white bg-green-500 rounded-md ">
                                          {val?.refOfUser?.role}
                                        </div>
                                      </div>
                                      <p className="text-xs">{val?.text}</p>
                                    </div>
                                  </div>
                                </>
                              );
                            })}

                            {load1[ind] ? (
                              <div className="flex gap-4 pl-4 mt-4 mb-4">
                                <input
                                  type="text"
                                  className="w-3/4 ml-auto bg-[#1A1A1A]  text-white text-sm rounded-2xl block  pl-10 p-2.5  dark:placeholder-gray-400 "
                                  placeholder="write Reply"
                                  required=""
                                  onChange={(e) => handleChange2(ind, e)}
                                  // Submit on Enter
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      ReplyComment(val, ind);
                                    }
                                  }}
                                  value={replies[ind] || ""}
                                />
                                <div
                                  className="mt-[10px]"
                                  onClick={() => ReplyComment(val, ind)}
                                >
                                  <svg
                                    width="24"
                                    height="22"
                                    viewBox="0 0 24 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="cursor-pointer"
                                  >
                                    <path
                                      d="M2.48647 12.7028L9.95408 11.2092C10.6209 11.076 10.6209 10.8592 9.95408 10.726L2.48647 9.23244C2.04167 9.14364 1.60847 8.71004 1.51967 8.26564L0.0260634 0.798029C-0.107537 0.130828 0.285664 -0.179173 0.903665 0.106027L23.6913 10.6232C24.1029 10.8132 24.1029 11.122 23.6913 11.312L0.903665 21.8293C0.285664 22.1145 -0.107537 21.8045 0.0260634 21.1373L1.51967 13.6696C1.60847 13.2252 2.04167 12.7916 2.48647 12.7028Z"
                                      fill="white"
                                    />
                                  </svg>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                          </>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              );
            })}
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
