import React from "react";
import "../styles/font.css";
import { useState, useContext } from "react";
import { AuthContext } from "../admin/ActiveUser";
import axios from "../axios";
import { useSelector } from "react-redux";
import { message } from "antd";

export default function UploadPostOntimeline(props) {
  const hiddenFileInputphoto = React.useRef(null);
  const hiddenFileInputvideo = React.useRef(null);
  const [postt, setpostt] = useState("");
  const [img, setimg] = useState(false);
  const [vid, setvid] = useState(false);
  const [post, setPost] = useState([]);
  const { group, setActiveGroup } = useContext(AuthContext);
  const { id, setActiveId } = useContext(AuthContext);
  const [Activemage, setActiveImage] = useState(false);
  const [selected, setSelected] = useState(false);
  const [name, setName] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [video, setVideo] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const token = localStorage.getItem("token");

  const { user } = useSelector((state) => state);

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
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  React.useEffect(() => {
    getData();
  }, [refresh]);

  const date = new Date();
  const handleClickphoto = (event) => {
    hiddenFileInputphoto.current.click();
  };
  const handleClickvideo = (event) => {
    hiddenFileInputvideo.current.click();
  };
  const handleChangephoto = (event) => {
    setName(event.target.files[0].name);
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("upload_preset", "player_image");
    data.append("height", 300); // set height
    data.append("width", 500);
    //data.append("cloud_name","dyapmvalo");
    axios
      .post(`https://api.cloudinary.com/v1_1/dyapmvalo/image/upload`, data)
      .then((res) => {
        setimg(res.data.url);
        setvid(false);
        setSelected(true);
        console.log(res.data.url);
      })
      .catch((err) => {
        console.log("Image not Selected");
      });
  };
  const handleChangevideo = (event) => {
    setName(event.target.files[0].name);
    setVideo(event.target.files[0]);
  };

  const handlePostChange = (event) => {
    setpostt(event.target.value);
  };

  const sendPost = async () => {
    if (postt === "" && !img && !video) {
      message.error("Post not Uploaded");
      return;
    }
    setPostLoading(true);

    if (video) {
      try {
        const data = new FormData();
        data.append("file", video);
        data.append("upload_preset", "player_image");
        data.append("refOfUser", user.user.id);
        data.append("status", postt);
        await axios
          .post(`${process.env.REACT_APP_API}/newsfeed/PostNewsFeed`, data)
          .then((res) => {
            console.log(res.data);
            message.success("Post Uploaded");
            setPost([res.data.data, ...post]);
            setPost(post.reverse());
            setPostLoading(false);
            setimg("");
            setpostt("");
            setName("");
          });
      } catch (error) {
        console.log(error);
        message.error("Post not Uploaded");
      }
    } else {
      try {
        await axios
          .post(`${process.env.REACT_APP_API}/newsfeed/PostNewsFeed`, {
            refOfUser: user.user.id,
            status: postt,
            image: img,
          })
          .then((res) => {
            message.success("Post Uploaded");
            setPost([res.data.data, ...post]);
            setPost(post.reverse());
            setPostLoading(false);
            setimg("");
            setpostt("");
            setName("");
          });
      } catch (error) {
        console.log(error);
        message.error("Post not Uploaded");
      }
    }
  };

  return (
    <>
      <div className="mx-[22px] ">
        <div className=" px-7 pt-8 pb-6 font-lexend lg:w-full min-w-sm text-center bg-[#212121] rounded-lg  ">
          <div className=" gap-5 flex mt-2">
            {user.user ? (
              <>
                <img
                  className=" w-10 h-10 rounded-full "
                  src={user?.user.image}
                  alt="Bonnie image"
                />
              </>
            ) : (
              <>
                <div className=" w-10 h-10 rounded-full bg-white"></div>
              </>
            )}

            <input
              type="text"
              className="w-full bg-[#1A1A1A] font-lexend  placeholder-lexend text-white text-sm font-normal rounded-lg block  pl-7 py-2.5  placeholder-gray-400 "
              placeholder="Post something"
              required=""
              onChange={handlePostChange}
            />
          </div>
          {selected ? (
            <div>
              <p className="text-white text-sm text-left ml-10 pl-5 pt-2"></p>
            </div>
          ) : (
            <></>
          )}
          <div className="mt-5">
            <div className="flex ml-14 ">
              <button
                onClick={handleClickphoto}
                className="inline-flex ml-1   py-2 px-4 text-sm font-normal text-white bg-[#191919] rounded-2xl "
              >
                <svg
                  className="mr-3"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V15C0 15.7956 0.316071 16.5587 0.87868 17.1213C1.44129 17.6839 2.20435 18 3 18H15C15.7956 18 16.5587 17.6839 17.1213 17.1213C17.6839 16.5587 18 15.7956 18 15V3C18 2.20435 17.6839 1.44129 17.1213 0.87868C16.5587 0.316071 15.7956 0 15 0ZM3 2H15C15.2652 2 15.5196 2.10536 15.7071 2.29289C15.8946 2.48043 16 2.73478 16 3V11.36L12.8 8.63C12.3042 8.22204 11.6821 7.99899 11.04 7.99899C10.3979 7.99899 9.7758 8.22204 9.28 8.63L2 14.7V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2Z"
                    fill="#D5D5D5"
                  />
                  <path
                    d="M5 7C5.82843 7 6.5 6.32843 6.5 5.5C6.5 4.67157 5.82843 4 5 4C4.17157 4 3.5 4.67157 3.5 5.5C3.5 6.32843 4.17157 7 5 7Z"
                    fill="#D5D5D5"
                  />
                </svg>
                Photo
              </button>
              <input
                type="file"
                ref={hiddenFileInputphoto}
                onChange={handleChangephoto}
                style={{ display: "none" }}
              />
              <button
                onClick={handleClickvideo}
                className="inline-flex  py-2 ml-[15px] px-4 text-sm font-normal text-white bg-[#191919] rounded-2xl"
              >
                <svg
                  className="mr-3"
                  width="22"
                  height="18"
                  viewBox="0 0 22 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 3.58826V14.4157C21.999 15.366 21.6195 16.2771 20.9449 16.949C20.2702 17.621 19.3555 17.999 18.4014 18H3.6025C2.64738 17.999 1.73167 17.6206 1.0563 16.9479C0.380922 16.2752 0.00103987 15.3631 0 14.4117V3.58826C0.00103987 2.63691 0.380922 1.72483 1.0563 1.05212C1.73167 0.379416 2.64738 0.00103576 3.6025 0H18.3975C19.3526 0.00103576 20.2683 0.379416 20.9437 1.05212C21.6191 1.72483 21.999 2.63691 22 3.58826ZM10.0179 13.1596L14.5711 10.4204C14.8199 10.2706 15.0257 10.0593 15.1686 9.80707C15.3115 9.5548 15.3865 9.27007 15.3865 8.98043C15.3865 8.6908 15.3115 8.40607 15.1686 8.1538C15.0257 7.90153 14.8199 7.69026 14.5711 7.54043L10.0179 4.84044C9.76205 4.68729 9.47 4.60456 9.17157 4.60069C8.87314 4.59682 8.57903 4.67196 8.31931 4.81842C8.05959 4.96488 7.84357 5.17741 7.69335 5.43428C7.54312 5.69116 7.46407 5.98316 7.46429 6.28043V11.7391C7.46147 12.0373 7.53956 12.3307 7.6903 12.5883C7.84105 12.8459 8.05886 13.0581 8.32071 13.2026C8.5737 13.345 8.85908 13.4204 9.14964 13.4217C9.45786 13.4162 9.75847 13.3255 10.0179 13.1596V13.1596ZM9.20857 6.18261L13.7618 8.92174C13.7789 8.93176 13.7931 8.94605 13.8029 8.96321C13.8128 8.98037 13.818 8.9998 13.818 9.01956C13.818 9.03933 13.8128 9.05876 13.8029 9.07592C13.7931 9.09308 13.7789 9.10737 13.7618 9.11739L9.20857 11.8565C9.18978 11.8684 9.16791 11.8745 9.14567 11.8741C9.12342 11.8738 9.10177 11.8669 9.08339 11.8544C9.06501 11.842 9.0507 11.8244 9.04222 11.8039C9.03375 11.7834 9.03149 11.7609 9.03571 11.7391V6.28043C9.03483 6.25965 9.0399 6.23905 9.05033 6.22104C9.06077 6.20302 9.07614 6.18833 9.09464 6.1787C9.11266 6.17388 9.13163 6.17388 9.14964 6.1787C9.1691 6.17271 9.19009 6.17411 9.20857 6.18261ZM4.32143 7.04348V4.69565C4.32143 4.48809 4.23865 4.28903 4.0913 4.14226C3.94395 3.9955 3.7441 3.91304 3.53571 3.91304C3.32733 3.91304 3.12748 3.9955 2.98013 4.14226C2.83278 4.28903 2.75 4.48809 2.75 4.69565V7.04348C2.75 7.25104 2.83278 7.4501 2.98013 7.59687C3.12748 7.74363 3.32733 7.82609 3.53571 7.82609C3.7441 7.82609 3.94395 7.74363 4.0913 7.59687C4.23865 7.4501 4.32143 7.25104 4.32143 7.04348Z"
                    fill="#1DB954"
                  />
                </svg>
                Video
              </button>
              <input
                type="file"
                ref={hiddenFileInputvideo}
                onChange={handleChangevideo}
                style={{ display: "none" }}
              />
              <button
                onClick={sendPost}
                className="inline-flex  py-2 px-7 ml-auto text-sm font-normal text-white bg-green-500 rounded-[4px] "
              >
                {postLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                ) : (
                  "Post"
                )}
              </button>
            </div>
          </div>
          {img ? (
            <div className="text-white mt-5">
              <img src={img} alt="" className="w-full h-full" />
            </div>
          ) : null}
          {name && !img ? (
            <div className="text-white mt-5">
              <p>{name}</p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
