import axios from "axios";
import React, { useState } from "react";
import Header from "../Components/Header";
import { videosdata } from "../Components/Videocategories";
import "../styles/font.css"
import Addcategories from "./AddVideoCategories";

// import Addcategories from "./Addcategories";

export default function Categories() {
    const [openAddsubcatmodal, setopenAddsubcatmodal] = useState(false);
    const [title, setTitle] = useState('');
    const [refresh, setRefresh] = useState(false);

    const add = async () => {
      setRefresh(true);
        const res = await axios.post("https://football-backend-updated.herokuapp.com/videocategory/AddVideoCategory", {
            title
        });
        setRefresh(false);
        setopenAddsubcatmodal(false);
        console.log(res.data);
    };

    const [drills, setDrills] = React.useState([]);

  // Get All Drills
  const getDrills = async () => {
    const response = await axios.get(
      "https://football-backend-updated.herokuapp.com/videocategory/GetAllVideoCategories"
    );
    console.log(response.data.data.doc);
    setDrills(response.data.data.doc);
  };
  React.useEffect(() => {
    getDrills();
  }, [refresh]);

  return (
    <>
      <div className="flex-col font-lexend w-full">
        {/* Page Header */}
        <Header title={"Categories"} />
        {/* Title Of the Page */}
        <div className="flex  justify-between mx-9 mt-8 mb-[51px] ">
          <h4 className="self-center font-lexend text-xl font-medium whitespace-nowrap text-white   ">
            Videos Categories
          </h4>
          <a
             onClick={()=>setopenAddsubcatmodal(true)}
            className="text-white font-normal bg-green-500 font-dm cursor-pointer focus:outline-none  rounded-[4px] text-base px-6 py-2.5 text-center inline-flex items-center"
            type="button"
          >
            Add New
          </a>
        </div>

        {/* Cards oF CAtogerys  */}
        <div className="font-lexend cursor-pointer text-xl font-normal m-10 grid lg:grid-cols-4 2xl:grid-cols-5 lg:gap-5 2xl:gap-y-8">
              {
                drills.map((val, ind) => {
                  return (
                    <Addcategories
                      key={ind}
                      data={val}
                    />
                  );
                })
              }
              
        </div>
      </div>

      <div
        id="defaultModal"
        onClick={() => setopenAddsubcatmodal(false)}
        className={
          !openAddsubcatmodal
            ? "hidden"
            : " flex absolute top-0 right-0 left-0 z-50 w-full h-full  bg-black/70  bg-opacity-5 justify-center items-center"
        }
      >
        <div className="relative p-4 w-full max-w-lg  ">
          <div className="relative bg-gradient-to-r from-[#000000]/24 to-[#000000]/81 backdrop-blur-[5px]  border-[border] border-2   rounded-2xl px-4 py-2">
            <button
              onClick={() => setopenAddsubcatmodal(false)}
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
              Adding Video Category
            </h3>

            <div className="p-3 ">
              <input
                type="text"
                className="bg-[#212121]  text-gray-200 text-sm rounded-lg  block w-full pl-10 p-2.5 mb-5"
                placeholder="Title"
                required=""
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center my-2">
              <button onClick={add} className="inline-flex font-lexend mb-12 items-center py-2.5 px-8  text-sm font-normal text-white bg-green-500 rounded-[4px] ">
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
