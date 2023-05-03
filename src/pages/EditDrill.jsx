import { message } from "antd";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import videoicon from "../assets/videoicon.png";
import DrillCard from "../Components/DrillCard";
import Header from "../Components/Header";
import "../styles/font.css";
export default function EditDrill() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  // onciick button uppload video

  const { user } = useSelector((state) => state.user);

  const {id} = useParams();

  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setUrl(fileUploaded);
  };

  const [drills, setDrills] = React.useState([]);
  const [refresh, setRefresh] = React.useState("");

  // Get All Drills
  const getDrills = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/videocategory/GetAllVideoCategories`
    );
    console.log(response.data.data);
    setDrills(response.data.data);
  };
  React.useEffect(() => {
    getDrills();
  }, [refresh]);

  // Add Drill
  const addDrill = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", url);
    formData.append("drilltitle", title);
    formData.append("description", description);
    formData.append("refOfVideoCat", category);
    formData.append("refOfUser", user._id);
    await axios
      .put(
        `${process.env.REACT_APP_API}/drill/UpdateDrill/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        message.success("Drill Edited Successfully");
        console.log(response.data);
        setRefresh(response.data);
      })
      .catch((err) => {
        message.error("Error in Editing Drill");
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex-col w-full">
        <Header title={"Training Drills"} />

        <div className="flex  divide-x xl:w-full ">
          <div>
            <h4 className="self-center font-lexend text-xl font-medium whitespace-nowrap text-white  mt-8 mb-12 ml-8">
              Editing Drill
            </h4>
            <div className=" flex mx-8 2xl:mr-32 xl:mr-28 font-lexend">
              <div>
                <input
                  type="text"
                  className="bg-[#212121]  text-white xl:text-base 2xl:text-lg text-sm rounded-[4px]  block w-full pl-6 p-2.5 mb-5"
                  placeholder="Enter video title here"
                  required=""
                  onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                  rows="10"
                  cols="70"
                  className="block pl-6 p-2.5 w-full xl:text-base  text-sm text-white bg-[#212121] rounded-[4px] placeholder:text-gray-400 "
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="w-[382px] max-h-[350px] ml-5 bg-[#212121] rounded-lg flex flex-col items-center justify-center">
                <div>
                  <img
                    className="mt-10 rounded-t w-8 h-6"
                    src={videoicon}
                    alt=""
                  />
                </div>

                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                <div className="p-5 text-center ">
                  <button
                    onClick={handleClick}
                    className=" text-base xl:text-lg font-normal  tracking-tight  text-white"
                  >
                    Upload Video
                  </button>

                  <p className="mb-3 mt-[10px] font-light xl:text-base text-sm  text-gray-400">
                    Mp4,webm formats are supported
                  </p>

                  <p className="font-light xl:text-base text-sm  text-gray-400">
                    {url?.name}
                  </p>
                </div>
              </div>
            </div>

            <select
              id="countries"
              className="bg-[#212121]   text-gray-400 xl:text-base text-sm rounded-lg block  pl-6 p-2.5 mx-8 my-5"
              onChange={(e) => setCategory(e.target.value)}
            >
              {drills?.map((drill) => {
                return <option value={drill._id}>{drill.title}</option>;
              })}
            </select>
            <div>
              <NavLink to={"/traningdrill"}>
                <button className="inline-flex font-lexend items-center py-2 px-8 ml-8 2xl:py-3 2xl:px-10 text-sm font-normal text-black bg-white rounded-[4px] ">
                  Cancel
                </button>
              </NavLink>
              <Link to={"/traningdrill"}>
                <button
                  onClick={addDrill}
                  className="inline-flex font-lexend items-center py-2 2xl:py-3 2xl:px-10 px-8 ml-[16px] text-sm font-normal  text-black bg-green-500 rounded-[4px] "
                >
                  {
                    loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      "Edit"
                    )
                  }
                </button>
              </Link>
            </div>
          </div>

          {/*skill cards */}
          <div className=" xl:w-4/12">
            <h4 className="self-center font-lexend text-xl 2xl:ml-12 font-medium whitespace-nowrap text-white  mt-8 mb-12 ml-8">
              More Drill
            </h4>

            <div className="ml-10 mr-10  2xl:grid 2xl:grid-cols-1 ">
              <DrillCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
