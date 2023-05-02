import React from "react";
import "../styles/font.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment";

export default function RightSideChat(props) {
  const location = useLocation();
  const [three, setThree] = React.useState("");
  const user = useSelector((state) => state.user);

  const getData = () => {
    let str = props?.message?.text;
    let lastThree = str?.substr(str.length - 4);
    setThree(lastThree);
    console.log(lastThree);
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="window mx-10 my-5" id="chat-window">
        <div className="flex flex-row-reverse gap-2 px-5">
          {props.message.sender == user.user.id ? (
            <img
              className=" w-10 h-10 rounded-full "
              src={user.user.image}
              alt="Bonnie image"
            />
          ) : (
            location.state.members.map((item) =>
              item.id === user.user.id ? (
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
                {/* {props?.message?.Date?.split("T")[1]?.slice(0, 5)} */}
                {moment(props.message.createdAt).format("LT")}
              </p>
            </div>
            <p className="font-medium bg-[#212121] text-base text-white mt-1  rounded-tr-lg rounded-b-lg py-2 px-6">
              {three === ".jpg" || three === ".png" ? (
                <img className="" src={props.message.text} alt="image" />
              ) : three === ".mp4" ? (
                <video>
                  <source src={props.message.text} type="video/mp4" />
                </video>
              ) : (
                props.message.text
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
