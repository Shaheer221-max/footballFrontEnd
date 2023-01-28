import React, { useState, useEffect } from "react";
import LeftSideChat from "./LeftSideChat";
import RightSideChat from "./RightSideChat";
import "../styles/font.css";
import "../styles/scrollbar.css";
import { Divider, Dropdown, Modal } from "antd";
import sajjad from "../assets/sajjad.jpg";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const items = [
  {
    label: <p>Group Members</p>,
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: <p>Delete Item</p>,
    key: "1",
  },
];

const item = [
  {
    label: <p>Remove</p>,
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: <p>View Profile</p>,
    key: "1",
  },
];

export default function ChatBox(props) {
  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chat, setChat] = useState([]);

  const params = useParams();
  const location = useLocation();

  const user = useSelector((state) => state.user);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onClick = ({ key }) => {
    if (key === "0") {
      showModal();
    }
  };

  const onClick1 = ({ key }) => {
    if (key === "0") {
      showModal();
    }
  };

  const AllMessages = async () => {
    await axios
      .get(
        `https://football-backend-updated.herokuapp.com/message/${params.id}`
      )
      .then((res) => {
        console.log(res.data);
        setChat(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  React.useEffect(() => {
    AllMessages();
  }, [params.id]);

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
            />
          </div>
          <div
            className="mt-6"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={sajjad}
                style={{ width: 35, height: 35 }}
                className="rounded-full mr-2"
                alt=""
              />
              <p className="text-white text-16 font-medium">Sajjad Akhtar</p>
            </div>
            <Dropdown
              placement="bottomRight"
              menu={{
                items: item,
                onClick: onClick1,
              }}
              trigger={["click"]}
            >
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
            </Dropdown>
          </div>
          <div
            className="mt-6"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={sajjad}
                style={{ width: 35, height: 35 }}
                className="rounded-full mr-2"
                alt=""
              />
              <p className="text-white text-16 font-medium">Sajjad Akhtar</p>
            </div>
            <Dropdown
              placement="bottomRight"
              menu={{
                items: item,
                onClick: onClick1,
              }}
              trigger={["click"]}
            >
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
            </Dropdown>
          </div>
          <div
            className="mt-6"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={sajjad}
                style={{ width: 35, height: 35 }}
                className="rounded-full mr-2"
                alt=""
              />
              <p className="text-white text-16 font-medium">Sajjad Akhtar</p>
            </div>
            <Dropdown
              placement="bottomRight"
              menu={{
                items: item,
                onClick: onClick1,
              }}
              trigger={["click"]}
            >
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
            </Dropdown>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="bg-green-500 p-2 rounded-sm mt-4 h-[44px] px-7 text-white">
              Add Player
            </button>
          </div>
        </Modal>
        <div className="w-full my-6 ">
          {/* Profile OF the User */}
          <div className="flex items-center gap-2 pb-5 px-5 ml-4 border-b border-grey-500">
            <>
              {location?.state?.members?.map((item) =>
                item.id === user.userId ? (
                  ""
                ) : (
                  <>
                    <img
                      className=" w-10 h-10 rounded-full "
                      src={item.image}
                      alt="Bonnie image"
                    />
                    <div className="flex-col">
                      <h3 className="text-white">{item.name}</h3>
                      {/* <h3 className="text-white">{item.email}</h3> */}
                    </div>
                  </>
                )
              )}
            </>

            <div>
              <div className="flex items-center gap-4">
                {location?.state?.members?.map((item) =>
                  item.id === user.userId ? (
                    ""
                  ) : (
                    <></>
                    // <h5 className="text-3xl font-lexend font-medium tracking-tight text-white">{item.email}</h5>
                  )
                )}
                {props.RecieverName}

                <>
                  {location?.state?.members?.map((item) =>
                    item.id === user.userId ? (
                      ""
                    ) : (
                      <div className="inline-flex font-dm items-center py-1 px-5  text-xs font-medium text-white bg-green-500 rounded-md ">
                        {item.role}
                      </div>
                    )
                  )}
                </>
              </div>
            </div>
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
          <div className=" lg:h-[450px] 2xl:h-[700px] overflow-y-scroll scrollbar">
            <>
              {chat.map((val, ind) => {
                return (
                  <div>
                    {ind === 0 ? (
                      <>
                        <div className="flex items-center py-4 mx-10">
                          <div className="flex-grow h-px bg-gray-400"></div>

                          <span className="flex-shrink text-base font-dm text-[#ffffff] px-4  font-normal">
                            {date === val.createdAt.slice(0, 10) ? (
                              <>Today</>
                            ) : (
                              <>{val.createdAt.slice(0, 10)}</>
                            )}
                          </span>

                          <div className="flex-grow h-px bg-gray-400"></div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* {val.date.slice(0, 10).toString() !==
                          props.chat[ind - 1].date.slice(0, 10).toString() ? (
                            <>
                              <div className="flex items-center py-4 mx-10">
                                <div className="flex-grow h-px bg-gray-400"></div>

                                <span className="flex-shrink text-base font-dm text-[#ffffff] px-4  font-normal">
                                  {val.date.slice(0, 10)}
                                </span>

                                <div className="flex-grow h-px bg-gray-400"></div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )} */}
                      </>
                    )}

                    {val.sender !== user.userId ? (
                      <>
                        <div className="mt-5">
                          <LeftSideChat message={val} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <RightSideChat message={val} />
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
    </>
  );
}
