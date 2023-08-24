import React from "react";
import "../styles/font.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function LeftSideChatGroup(props) {
  const location = useLocation();

  const user = useSelector((state) => state.user);
  const [three, setThree] = React.useState("");


  const extensionArray = [
    "jpg",
    "jpeg",
    "png",
    "svg",
    "webp",
    "pdf",
    "doc",
    "docx",
    "ppt",
    "pptx",
    "jfif",
  ];

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
    return extension;
  }

  // Get All Players

  const [players, setPlayers] = React.useState([]);

  const users = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/GetAllUsers`)
      .then((res) => {
        setPlayers(res.data.data.doc);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getFileExtension();
    users();
  }, []);

  return (
    <>
      <div className=" mx-10 my-5 font-lexend">
        <div className="flex gap-2">
          {props.message.sender.id === user?.user?.id ? (
            <img
              className=" w-10 h-10 rounded-full "
              src={user.user.image}
              alt="BonnieImage"
            />
          ) : (
            location?.state?.Members?.some((item) => item.id === props.message?.sender?.id) ? (
              location?.state?.Members?.map((item) =>
                item.id === props.message?.sender?.id ? (
                  <img
                    key={item.id}
                    className="w-10 h-10 rounded-full"
                    src={item.image}
                    alt="BonnieImage"
                  />
                ) : null
              )
            ) : (
              <img
                className="w-10 h-10 rounded-full"
                src={props?.message?.sender?.image}
                alt="BonnieImage"
              />
            ))}
            

            <div style={{ width:  `${props.message.content && props.message.link ? '30%' : '50%'}` }}>
            <div className="flex  justify-between">
              <h5 className="text-lg font-normal tracking-tight  text-white">
                {/* {props.name} */}
              </h5>
              <p className="font-normal ml-3 text-sm mt-0.5 text-gray-400">
                {/* {props.date.slice(11,16)} */}
              </p>
            </div>
            <p
              className="font-medium bg-[#212121] text-base text-white mt-1 rounded-tr-lg rounded-b-lg py-2 px-6"
              style={{ width: "100%", overflowWrap: "break-word" }}
            >
              {three === "mp4" ? (
                <video controls>
                  <source src={props.message.content} type="video/mp4" />
                </video>
              ) : props.message.content &&
              props.message.link
                 ? (
                <div>
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
                      src={props.message.link}
                      alt="image"
                    />
                  </a>

                  <p
                    className="font-medium bg-[#212121] text-base text-white mt-1 rounded-tr-lg rounded-b-lg py-2 px-6"
                    style={{ width: "70%", overflowWrap: "break-word" }}
                  >
                    {props.message.content}
                  </p>
                </div>
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
