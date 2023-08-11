import React from "react";
import "../styles/font.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment";

export default function RightSideChat(props) {
  const location = useLocation();
  const [three, setThree] = React.useState("");
  const user = useSelector((state) => state.user);

  function getFileExtension() {
    const extensionIndex = props?.message?.content?.lastIndexOf(".");
    if (extensionIndex === -1) {
      return ""; // No extension found
    }

    setThree(getExtension(props?.message?.content));
  }
function getfileSrc(file) {
  switch (file) {
    case "jpg":
    case "jpeg":
    case "png":
    case "svg":
    case "webp":
    case "jfif":
      return props.message.content;
    case "pdf":
      return "https://www.thoughtco.com/thmb/gJwCuYnaX0nW2zbCc3y55QKLqEI=/1280x1364/filters:fill(auto,1)/Pdf_by_mimooh.svg-56a9d1943df78cf772aaca04.jpg";
    case "doc":
    case "docx":
      return "https://cdn3.iconfinder.com/data/icons/file-extension-28/267/docx-512.png";
      case "ppt":
      case "pptx":
        return "https://cdn2.iconfinder.com/data/icons/linne-file-types/60/ppt-512.png"
    default:
      // Handle cases not covered in the switch
      return null;
  }
}


  function getExtension(url) {
    const urlParts = url.split("/");

    // Get the last part, which contains the file name and extension
    const lastPart = urlParts[urlParts.length - 1];

    // Split the last part by '?' to get the actual file name and extension
    const fileNameAndExtension = lastPart.split("?")[0];
    const parts = fileNameAndExtension.split(".");

    // Get the last part, which should be the extension
    const extension = parts[parts.length - 1];
    console.log("extension", extension);
    return extension;
  }

  React.useEffect(() => {
    getFileExtension();
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
          <div style={{width: '50%'}}>
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
            <p
              className="font-medium bg-[#212121] text-base text-white mt-1  rounded-tr-lg rounded-b-lg py-2 px-6"
              style={{ width: "100%", overflowWrap: "break-word" }}
            >
              {three === "jpg" ||
              three === "jpeg," ||
              three === "png" ||
              three === "svg" ||
              three === "webp" ||
              three === "pdf" ||
              three === "doc" ||
              three === "docx" ||
              three === "ppt" ||
              three === "pptx" ||
              three === "jfif" ? (
                <a
                  href={props.message.content} // Link to the image
                  target="_blank" // Open link in a new tab
                  rel="noopener noreferrer" // Security best practice for opening links
                  style={{
                    textDecoration: "none", // Remove underline from the link
                  }}
                >
                  <img
                    className="h-[300px] w-[300px] cursor-pointer border border-gray-300 hover:border-green-500"
                    src={getfileSrc(three)}
                    alt="image"
                  />
                </a>
              ) : three === "mp4" ? (
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
