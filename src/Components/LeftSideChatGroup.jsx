import React from "react";
import "../styles/font.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function LeftSideChatGroup(props) {
  const location = useLocation();
  console.log(location.state.Members);
  const user = useSelector((state) => state.user);
  const [three, setThree] = React.useState("");

  const getData = () => {
    let str = props?.message?.content;
    let lastThree = str?.substr(str.length - 4);
    setThree(lastThree);
  };

  // Get All Players

  const [players, setPlayers] = React.useState([]);

  const users = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/GetAllUsers`)
      .then((res) => {
        console.log(res.data);
        setPlayers(res.data.data.doc);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getData();
    users();
  }, []);

  return (
    <>
      <div className=" mx-10 my-5 font-lexend">
        <div className="flex gap-2">
          {props.message.sender == user.id ? (
            <img
              className=" w-10 h-10 rounded-full "
              src={user.user.image}
              alt="Bonnie image"
            />
          ) : (
            location?.state?.Members?.map((item) =>
              item.id !== props.message.sender ? (
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

          <div style={{ width: "50%" }}>
            <div className="flex  justify-between">
              <h5 className="text-lg font-normal tracking-tight  text-white">
                {/* {props.name} */}
              </h5>
              <p className="font-normal ml-3 text-sm mt-0.5 text-gray-400">
                {/* {props.date.slice(11,16)} */}
              </p>
            </div>
            <p
              className="font-medium bg-white text-base text-black mt-1  rounded-tr-lg rounded-b-lg py-2 px-6 "
              style={{ width: "100%", overflowWrap: "break-word" }}
            >
              {three === ".jpg" ? (
                <a
                  href={props.message.content} // Link to the image
                  target="_blank" // Open link in a new tab
                  rel="noopener noreferrer" // Security best practice for opening links
                  style={{
                    textDecoration: "none", // Remove underline from the link
                  }}
                >
                  <img
                    className="h-[300px] w-[100%] cursor-pointer border border-gray-300 hover:border-green-500"
                    src={props.message.content}
                    alt="image"
                  />
                </a>
              ) : three === ".mp4" ? (
                <video>
                  <source src={props.message.content} type="video/mp4" />
                </video>
              ) : (
                props.message.content
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
