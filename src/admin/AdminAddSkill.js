import React, { useState } from "react";
import Header from "../Components/Header";
import "../styles/font.css";
import { skillsdata } from "../Components/Skills";
import AddSubSkill from "../Components/AddSubSkill";
import { NavLink } from "react-router-dom";
import axios from "../axios";
import Spinner from "./Spinner";
import { message } from "antd";

export default function AdminAddSkill() {
  const [addschedule, setschedule] = useState(false);
  const [skills, setSkills] = useState([]);
  const [url, setUrl] = useState('');
  const [image, setImage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    setDisabled(true);
    setImage(event.target.files[0].name);
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("upload_preset", "player_image");
    //data.append("cloud_name","dyapmvalo");
    axios
      .post("https://api.cloudinary.com/v1_1/dyapmvalo/image/upload", data)
      .then((res) => {
        console.log(res.data.url);
        setDisabled(false);
        setUrl(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
    //img(event.target.files[0]);
  };

  //Add Skill
  const [skill, setSkill] = useState("");

  const addSkill = async (e) => {
    e.preventDefault();
    setRefresh(true);
    if(skill === "" || url === ""){
      message.error("Please Fill All Fields");
      return;
    }
    const res = await axios.post(
      `${process.env.REACT_APP_API}/skill/CreateSkill`,
      {
        skillname: skill,
        skillicon: url,
      }
    ).then((res) => {
      message.success("Skill Added Successfully");
      console.log(res.data);
      setRefresh(false);
      setschedule(false);
    }).catch((err) => {
      message.error("Something Went Wrong");
      console.log(err);
    });
  };

  const getData = async () => {
    const res = await axios.get(
        `${process.env.REACT_APP_API}/skill/GetAllSkills`
    );
    console.log("Get: ", res.data.data.doc);
    setSkills(res.data.data.doc);
    };
    React.useEffect(() => {
    getData();
    }, [refresh]);

    const refreshData = () => {
      setRefresh(!refresh);
  }

  return (
    <>
      <div className="flex-col w-full">
        {/* Page Header */}
        <Header title={"Skills"} />
        {/* Title Of the Page */}
        <div className="flex justify-between mx-9 mt-8 mb-[51px]">
          <h4 className="font-lexend self-center text-xl font-semibold whitespace-nowrap text-white   ">
            All Skills
          </h4>
          {/* <NavLink to="/playerarea/addskill"> */}
          <button
            onClick={() => setschedule(true)}
            className="text-white font-light bg-green-500 font-dm  focus:outline-none  rounded-[4px] text-base px-5 py-2 text-center inline-flex items-center"
            type="button"
          >
            Add Skill
          </button>
          {/* </NavLink> */}
        </div>

        <div
          id="defaultModal"
          className={
            !addschedule
              ? "hidden"
              : " flex absolute top-0 right-0 left-0 z-50 w-full h-full  bg-black/70  bg-opacity-5 justify-center items-center"
          }
        >
          <div className="relative p-4 w-full max-w-lg  ">
            <div className="relative bg-gradient-to-r from-[#000000]/24 to-[#000000]/81 backdrop-blur-[5px]  border-[border] border-2   rounded-2xl px-4 py-2">
              <button
                onClick={() => setschedule(false)}
                type="button"
                className="text-gray-400 bg-white bg-transparent rounded-full  p-0.5 ml-auto flex items-center "
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <h3 className="text-lg mt-4 mb-4 text-center font-normal font-lexend text-white">
                Adding Skills
              </h3>

              <div className="flex flex-col cursor-pointer w-full ">
                <input
                  type="text"
                  className="bg-[#808080] w-full text-white text-sm rounded-lg placeholder-lexend block  pl-10 p-2.5 mb-5 placeholder-white"
                  placeholder="Title"
                  required=""
                  onChange={(e) => setSkill(e.target.value)}
                />
                <div
                  onClick={handleClick}
                  className=" flex bg-[#212121] w-48 mt-4 text-white  text-sm rounded-lg  p-2.5   border-gray-600 placeholder-gray-400"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.625 0H4.375C1.95967 0.00224297 0.00224297 1.95967 0 4.375V30.625C0.00224297 33.0403 1.95967 34.9978 4.375 35H30.625C33.0403 34.9978 34.9978 33.0403 35 30.625V4.375C34.9978 1.95967 33.0403 0.00224297 30.625 0ZM4.375 33.25C2.92589 33.2484 1.7516 32.0741 1.75 30.625V21.4819L8.33472 14.8972C9.53175 13.7043 11.4682 13.7043 12.6653 14.8972L30.9834 33.2136C30.8651 33.23 30.7477 33.2499 30.625 33.25H4.375ZM33.25 30.625C33.2493 31.2871 32.9955 31.8848 32.5908 32.3465L20.4875 20.2443L22.3347 18.3972C23.5318 17.2043 25.4682 17.2043 26.6653 18.3972L33.25 24.9819V30.625ZM33.25 22.5074L27.9026 17.16C26.0223 15.2836 22.9777 15.2836 21.0974 17.16L19.2503 19.0071L13.9026 13.6599C11.9986 11.8416 9.00143 11.8416 7.09741 13.6599L1.75 19.0073V4.375C1.7516 2.92589 2.92589 1.7516 4.375 1.75H30.625C32.0741 1.7516 33.2484 2.92589 33.25 4.375V22.5074Z"
                      fill="white"
                    />
                  </svg>

                  <div className="ml-2 "> Upload Icon</div>
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center my-2">
                <button
                  onClick={addSkill}
                  disabled = {disabled}
                  className="inline-flex font-lexend mb-12 items-center py-2.5 px-8  text-sm font-normal text-white bg-green-500 rounded-[4px] m-2"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cards oF CAtogerys  */}
        <div className="m-8  grid lg:grid-cols-5 2xl:grid-cols-5  sm:gap-4 lg:gap-4 2xl:gap-y-8">
          {skills.length > 0 ? skills.map((val, ind) => {
            return (
              <AddSubSkill
                key={ind}
                data = {val}
                refreshData = {refreshData}
              />
            );
          }): <Spinner />}
        </div>
      </div>
    </>
  );
}
