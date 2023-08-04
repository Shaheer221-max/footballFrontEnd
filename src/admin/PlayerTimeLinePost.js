import React from "react";
import pfp from "../assets/pfp.png";
import pic3 from "../assets/pic3.png";
import "../styles/font.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../admin/ActiveUser";
import axios from "../axios";
import Moment from "react-moment";
import { fetchPostData } from "../redux/actions/user";

import { Dropdown } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function PlayerTimeLinePost(props) {
    console.log(props.data)
  const [post, SetPost] = useState([]);
  const [likeId, setLikeId] = useState(false);
  const { group, setActiveGroup } = useContext(AuthContext);
  const { id, setActiveId } = useContext(AuthContext);
  const [likes, setLikes] = useState(false);
  const [comment, setComment] = useState(false);
  const [postId, setPostId] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { user } = useSelector((state) => state);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    console.log(comment);
  };

  // getting all posts
  const memberName = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API}/newsfeed/GetAllUserPosts/${props.data._id}`
      )
      .then((res) => {
        SetPost(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    memberName();
  }, [refresh, user]);

  const addLike = async (val) => {
    await axios
      .post(`${process.env.REACT_APP_API}/like/PostLike`, {
        refOfNewsfeed: val._id,
        refOfUser: user.user.id,
      })
      .then((response) => {
        setLikes(true);
        setLikeId(response.data.data.doc._id);
        memberName();
      });
  };

  const deleteLike = async (val) => {
    await axios
      .post(`${process.env.REACT_APP_API}/like/DeleteLike`, {
        refOfNewsfeed: val._id,
        refOfUser: user.user.id,
      })
      .then((response) => {
        console.log("like removed");
        setLikes(false);
        memberName();
      });
  };

  const AddComment = async (val) => {
    console.log("in add comment", val, comment);
    setRefresh(true);
    let response = await axios
      .post(`${process.env.REACT_APP_API}/comment/PostComment`, {
        refOfNewsfeed: val._id,
        comment: comment,
        refOfUser: user.user.id,
      })
      .then((response) => {
        setRefresh(false);
        console.log("commented");
        // memberName();
      });
  };

  // delete Post
  const deletePost = async () => {
    setRefresh(true);
    console.log("in delete post", postId);
    await axios
      .delete(`${process.env.REACT_APP_API}/newsfeed/DeleteNewsFeed/${postId}`)
      .then((response) => {
        setRefresh(false);
        console.log("post deleted");
        // memberName();
      });
  };

  const items = [
    {
      label: <a onClick={deletePost}>Delete Post</a>,
      key: "0",
    },
  ];

  return (
    <div className="">
      <div className=" mx-[22px] my-10  ">
        {post.length > 0 ? (
          <>
            {post.map((val, ind) => {
              return (
                <>
                  {/* if post img */}
                  <div className="mt-5 px-4 pb-2 font-lexend lg:w-full 2xl:w-[880px] min-w-sm text-center bg-[#212121] rounded-lg  ">
                    <div className="flex items-center gap-2  mb-8 ml-4">
                      <img
                        className=" mt-[34px] w-9 h-9 rounded-full "
                        src={val.refOfUser.image}
                        alt="Bonnie image"
                      />

                      <div className="mt-[31px]">
                        <p className="font-lexend font-normal text-left text-xs text-gray-400">
                          {val?.refOfUser?.email}
                        </p>
                        <div className="flex font-lexend mt-1  items-center gap-4">
                          <h5 className="text-base  font-normal tracking-tight text-white">
                            {val?.refOfUser?.name}
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

                          <h5 className=" text-sm font-light tracking-tight text-white">
                            {/* <Moment fromNow>{val.post.post.date}</Moment> */}
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

                    {val.image ? (
                      <>
                        <img
                          className="mt-5 px-2 w-full rounded-md object-contain"
                          src={val.image}
                        />
                      </>
                    ) : (
                      <></>
                    )}

                    {val.video ? (
                      <>
                        <div className="mt-5 pr-12 px-2 ml-2  w-full">
                          <video
                            className="mt-5 px-2 w-full rounded-md"
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
                      {val.Like.some(
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
                              className="cursor-pointer"
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
                              className="cursor-pointer"
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
                        {val.Like.length}
                      </h5>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 0C11.0231 0.00448626 7.21043 1.58628 4.39835 4.39835C1.58628 7.21043 0.00448626 11.0231 0 15V27.65C0.000713846 28.2731 0.248539 28.8704 0.689107 29.3109C1.12967 29.7515 1.727 29.9993 2.35005 30H15C18.9782 30 22.7936 28.4196 25.6066 25.6066C28.4196 22.7936 30 18.9782 30 15C30 11.0218 28.4196 7.20644 25.6066 4.3934C22.7936 1.58035 18.9782 0 15 0ZM7.79971 17.4002C7.4437 17.4002 7.09569 17.2946 6.79968 17.0968C6.50367 16.899 6.27296 16.6179 6.13672 16.289C6.00049 15.9601 5.96484 15.5982 6.03429 15.249C6.10375 14.8998 6.27518 14.5791 6.52692 14.3274C6.77865 14.0756 7.09938 13.9042 7.44855 13.8347C7.79771 13.7653 8.15963 13.8009 8.48854 13.9372C8.81744 14.0734 9.09857 14.3041 9.29635 14.6001C9.49414 14.8961 9.59971 15.2441 9.59971 15.6002C9.59971 16.0775 9.41006 16.5354 9.0725 16.8729C8.73493 17.2105 8.2771 17.4001 7.79971 17.4001V17.4002ZM14.9997 17.4002C14.6437 17.4002 14.2957 17.2946 13.9997 17.0968C13.7037 16.899 13.473 16.6179 13.3367 16.289C13.2005 15.9601 13.1648 15.5982 13.2343 15.249C13.3037 14.8998 13.4752 14.5791 13.7269 14.3274C13.9787 14.0756 14.2994 13.9042 14.6485 13.8347C14.9977 13.7653 15.3596 13.8009 15.6885 13.9372C16.0174 14.0734 16.2986 14.3041 16.4964 14.6001C16.6941 14.8961 16.7997 15.2441 16.7997 15.6002C16.7997 16.0775 16.6101 16.5354 16.2725 16.8729C15.9349 17.2105 15.4771 17.4001 14.9997 17.4001V17.4002ZM22.1997 17.4002C21.8437 17.4002 21.4957 17.2946 21.1997 17.0968C20.9037 16.899 20.673 16.6179 20.5367 16.289C20.4005 15.9601 20.3648 15.5982 20.4343 15.249C20.5037 14.8998 20.6752 14.5791 20.9269 14.3274C21.1787 14.0756 21.4994 13.9042 21.8485 13.8347C22.1977 13.7653 22.5596 13.8009 22.8885 13.9372C23.2174 14.0734 23.4986 14.3041 23.6964 14.6001C23.8941 14.8961 23.9997 15.2441 23.9997 15.6002C23.9997 16.0775 23.8101 16.5354 23.4725 16.8729C23.1349 17.2105 22.6771 17.4001 22.1997 17.4001V17.4002Z"
                          fill="white"
                        />
                      </svg>
                      <Link to={{pathname : "/comments"}} state = {val.Comment}>
                        <h5 className="text-base font-bold tracking-tight text-white">
                          {val.Comment.length} Comments
                        </h5>
                      </Link>
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
                      <h5 className="text-base font-bold tracking-tight text-white">
                        Share
                      </h5>
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
                        onChange={handleCommentChange}
                      />
                      <div
                        className="mt-[10px]"
                        onClick={() => AddComment(val)}
                      >
                        <svg
                          width="24"
                          height="22"
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
                    </div>
                  </div>
                </>
              );
            })}
          </>
        ) : (
          <>
           <p className="text-white">This user has no posts</p>
          </>
        )}
      </div>
    </div>
  );
}
