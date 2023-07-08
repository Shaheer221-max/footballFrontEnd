import { message, Popconfirm } from "antd";
import axios from "axios";
import React, { useState } from "react";
import Header from "../Components/Header";
import "../styles/font.css";
import Addcategories from "./AddVideoCategories";

// import Addcategories from "./Addcategories";

export default function Categories() {
  const [title, setTitle] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [event, setevent] = useState(false);

  const [openAddsubcatmodal, setopenAddsubcatmodal] = useState(false);
  const [opensubcat, setopensubcat] = useState(false);
  const [id, setId] = useState("");

  const add = async () => {
    setRefresh(true);
    await axios
      .post(
        `${process.env.REACT_APP_API}/videocategory/AddVideoCategory`,
        {
          title,
        }
      )
      .then((res) => {
        message.success("Category Added Successfully");
        setRefresh(false);
        setevent(false);
        console.log(res.data);
      })
      .catch((err) => {
        message.error("Something went wrong");
        console.log(err);
      });
  };

  const [drills, setDrills] = React.useState([]);

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

  // Delete Drill
  const deleteDrill = async (id) => {
    await axios
      .delete(
        `${process.env.REACT_APP_API}/videocategory/DeleteVideoCategory/${id}`
      )
      .then((res) => {
        message.success("Category Deleted Successfully");
        console.log(res.data);
        setRefresh(res.data);
      })
      .catch((err) => {
        message.error("Something went wrong");
        console.log(err);
      });
  };

  // Update Drill
  const updateDrill = async () => {
    console.log(id);
    await axios
      .put(
        `${process.env.REACT_APP_API}/videocategory/EditVideoCategory/${id}`,
        {
          title,
        }
      )
      .then((res) => {
        setopenAddsubcatmodal(false);
        message.success("Category Updated Successfully");
        console.log(res.data);
        setRefresh(res.data);
      })
      .catch((err) => {
        message.error("Something went wrong");
        console.log(err);
      });
  };

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
            onClick={() => setevent(true)}
            className="text-white font-normal bg-green-500 font-dm cursor-pointer focus:outline-none  rounded-[4px] text-base px-6 py-2.5 text-center inline-flex items-center"
            type="button"
          >
            Add New
          </a>
        </div>

        {/* Cards oF CAtogerys  */}
        <div className="font-lexend cursor-pointer text-xl font-normal m-10 grid lg:grid-cols-4 2xl:grid-cols-5 lg:gap-5 2xl:gap-y-8">
          {drills?.map((val, ind) => {
            // return <Addcategories key={ind} data={val} />;
            return (
              <div>
                <div
                  onClick={() => setopensubcat(true)}
                  className={"p-4 max-w-sm max-h-[180px] rounded-lg bg-white"}
                >
                  <div className="flex items-center ">
                    <p className=" text-center text-lg font-medium text-black">
                      {val.title}
                    </p>
                    <Popconfirm
                      title="Delete Schedule"
                      description="Are you sure to delete this Category?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => deleteDrill(val._id)}
                      className="ml-auto"
                      okButtonProps={{ className: "bg-red-500" }}
                    >

                      <button
                        className="ml-auto"
                      >
                        <svg
                          className="ml-auto"
                          width="12"
                          height="15"
                          viewBox="0 0 12 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.0518 1.56044H7.58027C7.58027 1.14658 7.41378 0.749679 7.11742 0.457041C6.82106 0.164402 6.41911 0 6 0C5.58089 0 5.17894 0.164402 4.88258 0.457041C4.58622 0.749679 4.41973 1.14658 4.41973 1.56044H0.948161C0.696693 1.56044 0.455524 1.65908 0.27771 1.83466C0.0998951 2.01024 0 2.24839 0 2.4967C0 2.74501 0.0998951 2.98315 0.27771 3.15873C0.455524 3.33432 0.696693 3.43296 0.948161 3.43296L1.48495 13.5139C1.50426 13.9139 1.67856 14.2912 1.97177 14.5678C2.26498 14.8445 2.65467 14.9992 3.0602 15H8.92475C9.33028 14.9992 9.71997 14.8445 10.0132 14.5678C10.3064 14.2912 10.4807 13.9139 10.5 13.5139L11.0518 3.45277C11.3033 3.45277 11.5445 3.35413 11.7223 3.17855C11.9001 3.00297 12 2.76482 12 2.51651C12 2.2682 11.9001 2.03006 11.7223 1.85448C11.5445 1.67889 11.3033 1.58025 11.0518 1.58025V1.56044ZM5.03177 11.8494C5.03177 12.0149 4.96518 12.1737 4.84663 12.2908C4.72809 12.4078 4.56731 12.4736 4.39967 12.4736C4.23202 12.4736 4.07124 12.4078 3.9527 12.2908C3.83416 12.1737 3.76756 12.0149 3.76756 11.8494V5.63243C3.76756 5.46689 3.83416 5.30813 3.9527 5.19107C4.07124 5.07402 4.23202 5.00826 4.39967 5.00826C4.56731 5.00826 4.72809 5.07402 4.84663 5.19107C4.96518 5.30813 5.03177 5.46689 5.03177 5.63243V11.8494ZM8.18729 11.8494C8.1951 11.9357 8.18463 12.0227 8.15654 12.1048C8.12844 12.1869 8.08335 12.2623 8.02413 12.3262C7.9649 12.3902 7.89284 12.4412 7.81254 12.4762C7.73224 12.5111 7.64544 12.5291 7.55769 12.5291C7.46994 12.5291 7.38315 12.5111 7.30285 12.4762C7.22254 12.4412 7.15048 12.3902 7.09126 12.3262C7.03204 12.2623 6.98694 12.1869 6.95885 12.1048C6.93076 12.0227 6.92028 11.9357 6.92809 11.8494V5.63243C6.94215 5.47712 7.01456 5.33264 7.13108 5.2274C7.2476 5.12217 7.39979 5.06381 7.55769 5.06381C7.7156 5.06381 7.86779 5.12217 7.98431 5.2274C8.10083 5.33264 8.17324 5.47712 8.18729 5.63243V11.8494Z"
                            fill="#1DB954"
                          />
                        </svg>
                      </button>
                    </Popconfirm>

                    <button
                      className="ml-3"
                      onClick={() => {
                        setId(val._id);
                        setopenAddsubcatmodal(true);
                      }}
                    >
                      <svg
                        className="ml-3"
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 10.4437V12.6389C0 12.8411 0.158867 13 0.361061 13H2.55631C2.65019 13 2.74406 12.9639 2.80905 12.8917L10.6946 5.01333L7.98667 2.30537L0.108318 10.1837C0.0361062 10.2559 0 10.3426 0 10.4437ZM12.7888 2.91918C13.0704 2.63755 13.0704 2.18261 12.7888 1.90099L11.099 0.211221C10.8174 -0.0704069 10.3624 -0.0704069 10.0808 0.211221L8.75934 1.5327L11.4673 4.24066L12.7888 2.91918Z"
                          fill="#1DB954"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        id="defaultModal"
        className={
          !event
            ? "hidden"
            : " flex absolute top-0 right-0 left-0 z-50 w-full h-full  bg-black/70  bg-opacity-5 justify-center items-center"
        }
      >
        <div className="relative p-4 w-full max-w-lg  ">
          <div className="relative bg-gradient-to-r from-[#000000]/24 to-[#000000]/81 backdrop-blur-[5px]  border-[border] border-2   rounded-2xl px-4 py-2">
            <button
              onClick={() => !setevent(false)}
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

            <div className="justify-center p-3 ">
              <input
                type="text"
                className="bg-[#212121]  w-full text-white text-sm rounded-lg  block  pl-10 p-2.5 mb-5 placeholder-[#7E7E7E] placeholder-lexend"
                placeholder="Title"
                required=""
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-center my-2">
              <button
                onClick={add}
                className="inline-flex font-lexend mb-12 items-center py-2.5 px-8  text-sm font-normal text-white bg-green-500 rounded-[4px] m-2"
              >
                {refresh && (
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
                )}
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id="defaultModal"
        className={
          !openAddsubcatmodal
            ? "hidden"
            : " flex absolute top-0 right-0 left-0 z-50 w-full h-full  bg-black/70  bg-opacity-5 justify-center items-center"
        }
      >
        <div className="relative p-4 w-full max-w-lg  ">
          <div className="relative bg-gradient-to-r from-[#000000]/24 to-[#000000]/81 backdrop-blur-[5px]  border-[border] border-2   rounded-2xl px-4 py-2">
            <button
              onClick={() => !setopenAddsubcatmodal(false)}
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
              Updating Video Category
            </h3>

            <div className="justify-center p-3 ">
              <input
                type="text"
                className="bg-[#212121]  w-full text-white text-sm rounded-lg  block  pl-10 p-2.5 mb-5 placeholder-[#7E7E7E] placeholder-lexend"
                placeholder="Title"
                required=""
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-center my-2">
              <button
                onClick={updateDrill}
                className="inline-flex font-lexend mb-12 items-center py-2.5 px-8  text-sm font-normal text-white bg-green-500 rounded-[4px] m-2"
              >
                {refresh && (
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
                )}
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
