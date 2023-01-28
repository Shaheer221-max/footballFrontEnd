import React from "react";
import "../styles/font.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function LeftSideChat(props) {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className=" mx-10 my-5 font-lexend">
        <div className="flex gap-2">
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
            <div className="flex  justify-between">
              <h5 className="text-lg font-normal tracking-tight  text-white">
                {/* {props.name} */}
              </h5>
              <p className="font-normal ml-3 text-sm mt-0.5 text-gray-400">
                {/* {props.date.slice(11,16)} */}
              </p>
            </div>
            <p className="font-medium bg-white text-base text-black mt-1  rounded-tr-lg rounded-b-lg py-2 px-6">
              {props.message.text}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
