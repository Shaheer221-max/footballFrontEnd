import React from "react";
import "../styles/font.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function RightSideChat(props) {
  const location = useLocation();

  const user = useSelector((state) => state.user);
  return (
    <>
      <div className=" mx-10 my-5">
        <div className="flex flex-row-reverse gap-2 px-5">
          {props.message.sender == user.userId ? (
            <img
              className=" w-10 h-10 rounded-full "
              src={user.user.image}
              alt="Bonnie image"
            />
          ) : (
            location.state.members.map((item) =>
              item.id === user.userId ? (
                ""
              ) : (
                <img
                  className=" w-10 h-10 rounded-full "
                  src={item.image}
                  alt="Bonnie image"
                />
              )
            )
          )}
          <div>
            <div className="flex flex-row-reverse justify-between mx2">
              <h5 className="text-lg font-normal tracking-tight text-white">
                {user.user.name}
              </h5>
              <p className="font-normal text-sm mt-0.5 mr-2 text-gray-400">
                {/* {props.date.slice(11, 16)} */}
                {props.message.createdAt.split("T")[1].slice(0, 5)}
              </p>
            </div>
            <p className="font-medium bg-[#212121] text-base text-white mt-1  rounded-tr-lg rounded-b-lg py-2 px-6">
              {props.message.text}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
