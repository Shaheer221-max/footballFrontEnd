import React from "react";
import pfp from "../assets/pfp.png";
import grouplist from "../assets/grouplist.png";
import "../styles/font.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../admin/ActiveUser";
import axios from "../axios";
import { message } from "antd";
import { useSelector } from "react-redux";

export default function GroupMembers(props) {
  console.log(props.data);
  const [Group, SetGroup] = useState(false);
  const [groupDetail, SetGroupDetail] = useState("");
  const [members, setMembers] = useState(props.data.val.Members);
  const [players, SetPlayers] = useState([]);
  const [name, setName] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [adminImage, setAdminImage] = useState(false);
  const [adminName, setAdminName] = useState(false);
  const [image, setImage] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { id, setActiveId } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  

  // Get Admin of Group
  const getAdmin = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API}/users/singleUser/${props.data.val.refOfUser}`
      )
      .then((res) => {
        console.log(res.data);
        setAdmin(res.data.data.doc.id);
        setAdminImage(res.data.data.doc.image);
        setAdminName(res.data.data.doc.name);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.doc.id);
        setActiveId(res.data.data.doc.id);
        setImage(res.data.data.doc.image);
        setName(res.data.data.doc.name);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const GetGroup = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API}/group/GetGroup/${props.data.val._id}`
      )
      .then((res) => {
        console.log(res.data.data.doc.Members);
        SetGroupDetail(res.data.data.doc);
        setMembers(res.data.data.doc.Members);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  React.useEffect(() => {
    getData();
    getAdmin();
    GetGroup();
  }, [refresh, props]);

  // Remove Member from Group
  const removeMember = async (id, ind) => {
    console.log(groupDetail._id, id);
    setRefresh(true);
    setRefreshIndex([...refreshIndex, ind]);
    await axios
      .post(
        `${process.env.REACT_APP_API}/group/RemoveMember/${id}&${groupDetail._id}`
      )
      .then((res) => {
        setRefresh(false);
        setRefreshIndex([]);
        message.success("Member Removed");
        console.log(res.data);
      })
      .catch((error) => {
        message.error("Member Not Removed");
        console.log(error.response.data);
      });
  };

  // Refresh according to index
  const [refreshIndex, setRefreshIndex] = useState([]);

  // Add Member to Group
  const addMember = async (id, ind) => {
    console.log(groupDetail._id);
    setRefresh(true);
    setRefreshIndex([...refreshIndex, ind]);
    await axios
      .post(
        `${process.env.REACT_APP_API}/group/AddMember/${id}&${groupDetail._id}`
      )
      .then((res) => {
        setRefreshIndex([]);
        setRefresh(false);
        message.success("Member Added");
        console.log(res.data);
      })
      .catch((error) => {
        message.error("Member Not Added");
        console.log(error.response.data);
      });
  };

  // Get All Players in Group
  const getPlayers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/GetAllPlayers`)
      .then((res) => {
        console.log(groupDetail.Members);
        SetPlayers(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  React.useEffect(() => {
    getPlayers();
    GetGroup();
  }, [refresh, props]);

  const handleAddMember = (user) => {
    setMembers([...members, user]);
  };

  return (
    <>
      <div className="lg:h-[550px] 2xl:h-[550px] overflow-y-hidden scrollbar hover:overflow-y-scroll">
        {/* <div className="flex justify-end ">
          <svg
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
        </div> */}
        <div className="w-full min-w-sm bg-transparent   ">
          <div className="px-4 pt-4">
            <div className="flex flex-col items-center ">
              <img
                className=" w-28 h-28 rounded-lg"
                src={groupDetail?.image}
                alt="Bonnie image"
              />
              <h5 className="mb-1 mt-5 text-lg font-lexend font-medium text-white ">
                {/* {Group.memberName} */}
              </h5>
              <div className="flex items-center gap-1">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4" cy="4" r="4" fill="#1DB954" />
                </svg>
                <p className="font-normal font-lexend text-left text-sm text-gray-400">
                  {/* {Group.members.length} members */}
                </p>
              </div>
            </div>

            <div>
              <div className=" flex items-center justify-between mt-10 mb-9">
                <h4 className="self-center mr-20 font-lexend text-lg font-medium whitespace-nowrap text-white  ">
                  Players
                </h4>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2  000/svg"
                  className="cursor-pointer"
                  onClick={() => {
                    SetGroup(!Group);
                  }}
                >
                  <path
                    d="M12.5 0C5.596 0 0 5.596 0 12.5C0 19.404 5.596 25 12.5 25C19.404 25 25 19.404 25 12.5C25 5.596 19.404 0 12.5 0ZM19 13.5H13.5V19C13.5 19.2652 13.3946 19.5196 13.2071 19.7071C13.0196 19.8946 12.7652 20 12.5 20C12.2348 20 11.9804 19.8946 11.7929 19.7071C11.6054 19.5196 11.5 19.2652 11.5 19V13.5H6C5.73478 13.5 5.48043 13.3946 5.29289 13.2071C5.10536 13.0196 5 12.7652 5 12.5C5 12.2348 5.10536 11.9804 5.29289 11.7929C5.48043 11.6054 5.73478 11.5 6 11.5H11.5V6C11.5 5.73478 11.6054 5.48043 11.7929 5.29289C11.9804 5.10536 12.2348 5 12.5 5C12.7652 5 13.0196 5.10536 13.2071 5.29289C13.3946 5.48043 13.5 5.73478 13.5 6V11.5H19C19.2652 11.5 19.5196 11.6054 19.7071 11.7929C19.8946 11.9804 20 12.2348 20 12.5C20 12.7652 19.8946 13.0196 19.7071 13.2071C19.5196 13.3946 19.2652 13.5 19 13.5Z"
                    fill="#1DB954"
                  />
                </svg>
              </div>
              {Group
                ? players
                    .filter(
                      (data) => !members.some((val) => val._id == data._id)
                    )
                    .map((val, ind) => {
                      return (
                        <div className="flex items-center font-lexend mb-6">
                          <img
                            className=" w-10 h-10 rounded-full"
                            src={val.image}
                            alt="Bonnie image"
                          />

                          <h4 className="font-lexend self-center text-base font-normal whitespace-nowrap text-white ml-3  ">
                            {val.name}
                          </h4>
                          {refreshIndex.includes(ind) ? (
                            <svg
                              className="animate-spin h-5 w-5 ml-auto text-white"
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
                                stroke-width="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 25 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="cursor-pointer ml-auto"
                              onClick={() => {
                                handleAddMember(val);
                                addMember(val.id, ind);
                              }}
                            >
                              <path
                                d="M12.5 0C5.596 0 0 5.596 0 12.5C0 19.404 5.596 25 12.5 25C19.404 25 25 19.404 25 12.5C25 5.596 19.404 0 12.5 0ZM19 13.5H13.5V19C13.5 19.2652 13.3946 19.5196 13.2071 19.7071C13.0196 19.8946 12.7652 20 12.5 20C12.2348 20 11.9804 19.8946 11.7929 19.7071C11.6054 19.5196 11.5 19.2652 11.5 19V13.5H6C5.73478 13.5 5.48043 13.3946 5.29289 13.2071C5.10536 13.0196 5 12.7652 5 12.5C5 12.2348 5.10536 11.9804 5.29289 11.7929C5.48043 11.6054 5.73478 11.5 6 11.5H11.5V6C11.5 5.73478 11.6054 5.48043 11.7929 5.29289C11.9804 5.10536 12.2348 5 12.5 5C12.7652 5 13.0196 5.10536 13.2071 5.29289C13.3946 5.48043 13.5 5.73478 13.5 6V11.5H19C19.2652 11.5 19.5196 11.6054 19.7071 11.7929C19.8946 11.9804 20 12.2348 20 12.5C20 12.7652 19.8946 13.0196 19.7071 13.2071C19.5196 13.3946 19.2652 13.5 19 13.5Z"
                                fill="#1DB954"
                              />
                            </svg>
                          )}
                        </div>
                      );
                    })
                : ""}
              {groupDetail.Members ? (
                <>
                  {members.map((val, ind) => {
                    return val.role == "Player" ? (
                      <div className="flex items-center font-lexend  mb-6">
                        {val.image ? (
                          <>
                            <img
                              className=" w-10 h-10 rounded-full"
                              src={val.image}
                              alt="Bonnie image"
                            />
                          </>
                        ) : (
                          <>
                            <div className=" w-10 h-10 rounded-full bg-white"></div>
                          </>
                        )}

                        <h4 className="font-lexend self-center text-base font-normal whitespace-nowrap text-white ml-3  ">
                          {val.name}
                        </h4>
                        {refreshIndex.includes(ind) ? (
                          <svg
                            className="animate-spin h-5 w-5 ml-auto text-white"
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
                              stroke-width="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            className="ml-auto cursor-pointer"
                            width="16"
                            height="16"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => removeMember(val.id, ind)}
                          >
                            <path
                              d="M9 0C4.0275 0 0 4.0275 0 9C0 13.9725 4.0275 18 9 18C13.9725 18 18 13.9725 18 9C18 4.0275 13.9725 0 9 0ZM13.5 9.9H4.5V8.1H13.5V9.9Z"
                              fill="#FF0000"
                            />
                          </svg>
                        )}
                      </div>
                    ) : (
                      <></>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </div>

            <div>
              <div className=" flex font-lexend items-center justify-between mt-9">
                <h4 className="self-center mb-3 mr-20 font-lexend text-lg font-medium whitespace-nowrap text-white ">
                  Coaches
                </h4>
              </div>
              {members.map((val, ind) => {
                return val.role == "Coach" ? (
                  <div className="flex items-center font-lexend  mb-6">
                    {val.image ? (
                      <>
                        <img
                          className=" w-10 h-10 rounded-full"
                          src={val.image}
                          alt="Bonnie image"
                        />
                      </>
                    ) : (
                      <>
                        <div className=" w-10 h-10 rounded-full bg-white"></div>
                      </>
                    )}

                    <h4 className="font-lexend self-center text-base font-normal whitespace-nowrap text-white ml-3  ">
                      {val.name}
                    </h4>
                    {refreshIndex.includes(ind) ? (
                      <svg
                        className="animate-spin h-5 w-5 ml-auto text-white"
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
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="ml-auto cursor-pointer"
                        width="16"
                        height="16"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => removeMember(val.id, ind)}
                      >
                        <path
                          d="M9 0C4.0275 0 0 4.0275 0 9C0 13.9725 4.0275 18 9 18C13.9725 18 18 13.9725 18 9C18 4.0275 13.9725 0 9 0ZM13.5 9.9H4.5V8.1H13.5V9.9Z"
                          fill="#FF0000"
                        />
                      </svg>
                    )}
                  </div>
                ) : (
                  <></>
                );
              })}
            </div>

            <div>
              <div className=" flex font-lexend items-center justify-between mt-9">
                <h4 className="self-center mb-3 mr-20 font-lexend text-lg font-medium whitespace-nowrap text-white ">
                  Parents
                </h4>
              </div>
              {members.map((val, ind) => {
                return val.role == "Parent" ? (
                  <div className="flex items-center font-lexend mb-6">
                    {val.image ? (
                      <>
                        <img
                          className=" w-10 h-10 rounded-full"
                          src={val.image}
                          alt="Bonnie image"
                        />
                      </>
                    ) : (
                      <>
                        <div className=" w-10 h-10 rounded-full bg-white"></div>
                      </>
                    )}

                    <h4 className="font-lexend self-center text-base font-normal whitespace-nowrap text-white ml-3  ">
                      {val.name}
                    </h4>
                    {refreshIndex.includes(ind) ? (
                      <svg
                        className="animate-spin h-5 w-5 ml-auto text-white"
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
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="ml-auto cursor-pointer"
                        width="16"
                        height="16"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => removeMember(val.id, ind)}
                      >
                        <path
                          d="M9 0C4.0275 0 0 4.0275 0 9C0 13.9725 4.0275 18 9 18C13.9725 18 18 13.9725 18 9C18 4.0275 13.9725 0 9 0ZM13.5 9.9H4.5V8.1H13.5V9.9Z"
                          fill="#FF0000"
                        />
                      </svg>
                    )}
                  </div>
                ) : (
                  <></>
                );
              })}
            </div>

            <div>
              <div className=" flex font-lexend items-center justify-between mt-9">
                <h4 className="self-center mr-20 font-lexend text-lg font-medium whitespace-nowrap text-white ">
                  Admin
                </h4>
              </div>
              <div className="flex items-center gap-3  my-7 pb-10 mb-10 ">
                <img
                  className=" w-10 h-10 rounded-full"
                  src={adminImage}
                  alt="Bonnie image"
                />
                <h4 className="self-center  text-base font-normal font-lexend whitespace-nowrap text-white   ">
                  {adminName}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
