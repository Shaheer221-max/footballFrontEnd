import React from "react";
import "../styles/font.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function LeftSideChat(props) {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const [three, setThree] = React.useState("");

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
      <div className=" mx-10 my-5 font-lexend">
        <div className="flex gap-2">
          {props.message.sender == user.user.id ? (
            <img
              className=" w-10 h-10 rounded-full "
              src={user.user.image}
              alt="Bonnie image"
            />
          ) : (
            location?.state?.members?.map((item) =>
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
            <div className="flex  justify-between">
              <h5 className="text-lg font-normal tracking-tight  text-white">
                {/* {props.name} */}
              </h5>
              <p className="font-normal ml-3 text-sm mt-0.5 text-gray-400">
                {/* {props.date.slice(11,16)} */}
              </p>
            </div>
            <p className="font-medium bg-white text-base text-black mt-1  rounded-tr-lg rounded-b-lg py-2 px-6">
            {three === ".jpg" ? (
                <img className="" src={props.message.text} alt="image" />
              ) : three === ".mp4" ? (
                <video>
                  <source src={props.message.text} type="video/mp4" />
                </video>
              ) : (
                props.message.text
              )
              }
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
