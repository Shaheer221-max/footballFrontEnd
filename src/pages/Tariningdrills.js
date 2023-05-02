import React from "react";
import Header from "../Components/Header";
import "../styles/font.css";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import moment from "moment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Dropdown, message, Popconfirm } from "antd";
export default function Tariningdrills() {
  const [drills, setDrills] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  const [showMenu, setShowMenu] = React.useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  // Get All Drills
  const getDrills = async () => {
    const response = await axios.get(
      "https://football-backend-updated.herokuapp.com/drill/GetAllDrills"
    );
    console.log(response.data.data.doc);
    setDrills(response.data.data.doc);
  };
  React.useEffect(() => {
    getDrills();
    getCategories();
  }, [refresh]);

  const [categories, setCategories] = React.useState([]);

  // Get All Drills
  const getCategories = async () => {
    const response = await axios.get(
      "https://football-backend-updated.herokuapp.com/videocategory/GetAllVideoCategories"
    );
    console.log(response.data.data);
    setCategories(response.data.data);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [id, setId] = React.useState("");

  // Delete Drill
  const deleteDrill = async () => {
    setRefresh(true);
    await axios
      .delete(
        `https://football-backend-updated.herokuapp.com/drill/DeleteDrill/${id}`
      )
      .then((res) => {
        message.success("Drill Deleted Successfully");
        console.log(res.data);
        setRefresh(false);
      })
      .catch((err) => {
        message.error("Something went wrong");
        console.log(err);
      });
  };

  const items = [
    {
      label: <Link to={{ pathname: `/traningdrill/edit/${id}` }} >
        <button>Edit</button>
      </Link>,
      key: "0",
    },
    {
      label: <Popconfirm
      title="Delete Drill"
      description="Are you sure to delete this Drill?"
      okText="Yes"
      cancelText="No"
      onConfirm={deleteDrill}
      className=""
      okButtonProps={{ className: "bg-red-500" }}
    ><button>Delete</button>
    </Popconfirm>
    ,
      key: "1",
    },
  ];

  return (
    <>
      <div className="flex-col w-full">
        {/* Page Header */}
        <Header title={"Training Drills"} viewlist={true} />
        {/* Title Of the Page */}
        <div className="flex mx-8">
          {/* Video and Describtion   */}
          {/* {
            drills.length > 0 ? (
              <div className="w-3/5">
            <h4 className="self-center font-lexend text-xl font-medium whitespace-nowrap text-white  mt-8 mb-12 ">
              Today’s Drill
            </h4>
            <iframe
              className="rounded-md lg:w-full lg:h-[350px] 2xl:w-full 2xl:h-[620.56px] border"
              src={drills[0]?.video}
            ></iframe>
            <div className="lg:w-full  2xl:w-[887px] ">
              <div className="flex  justify-start relative ">
                <h4 className="self-center text-2xl mt-6 mb-1.5  font-lexend font-medium whitespace-nowrap text-white  my-2 ">
                  {drills[0]?.drilltitle}
                </h4>
                <button className=" absolute bottom-0 right-20 font-lexend inline-flex items-center py-1 px-5 ml-2  text-xs font-medium text-black bg-blue-500 rounded-md ">
                  {drills[0]?.refOfVideoCat?.title}
                </button>
              </div>
              <p className="mb-6 text-lg font-normal font-lexend text-[#7e7e7e]">
                Uploaded Today
              </p>
              <p className="mb-3 font-light text-[16px] leading-[27px] font-lexend   text-white/70">
                {drills[0]?.description}
              </p>
            </div>
          </div>
            ) : (
              <div className="w-3/5">
                <Spinner />
              </div>
            )
          } */}

          {/* More Drills Card  */}
          <div className="lg:ml-10 2xl:ml-20 mb-9 w-full">
            <div className="flex justify-between ">
              <h4 className="self-center font-lexend text-xl font-medium whitespace-nowrap text-white  mt-8 mb-12 ">
                More Drills
              </h4>
              <div className="flex">
                <button className="flex items-center font-lexend mr-4  ">
                  <Link to={"/categories"}>
                    <a
                      href=""
                      className="inline-flex items-center py-2 px-4  text-sm font-normal text-white bg-green-500  rounded-[4px] "
                    >
                      Categories
                    </a>
                  </Link>
                </button>
                <NavLink
                  to={"/traningdrill/uploaddrills"}
                  className="flex font-lexend items-center   "
                >
                  <button className="flex font-lexend items-center   ">
                    <a
                      href=""
                      className="inline-flex items-center py-2 px-4  text-sm font-normal text-black bg-white rounded-[4px] "
                    >
                      Upload Drill
                    </a>
                  </button>
                </NavLink>
              </div>
            </div>

            <div className="grid grid-cols-5  gap-7">
              {drills.length > 0 ? (
                drills.map((val, ind) => {
                  const change = ind % 2 == 0;
                  return (
                    <div
                      key={ind}
                      className="max-w-[280px] 2xl:max-w-xs font-lexend rounded-lg"
                    >
                      <div className="relative">
                        <div
                          className={
                            change
                              ? "absolute bottom-0 right-0 font-lexend inline-flex items-center py-1 px-5 m-2  text-xs font-medium text-black bg-blue-500 rounded-md "
                              : "absolute bottom-0 right-0 font-lexend inline-flex items-center py-1 px-5 m-2  text-xs font-medium text-black bg-green-500 rounded-md "
                          }
                        >
                          {val?.refOfVideoCat?.title}
                        </div>
                        <iframe
                          style={{ width: 235 }}
                          className="rounded-t-lg border w-{235px]"
                          src={val?.video}
                        ></iframe>
                      </div>
                      <div className="flex items-center mt-2">
                        <img
                          className=" w-10 h-10 rounded-full mt-2.5"
                          src={val?.refOfUser?.image}
                          alt="Bonnie image"
                        />
                        <div className="ml-2">
                          <h5 className="text-base font-medium mt-4 font-lexend tracking-tight  text-white">
                            {val?.drilltitle}
                          </h5>
                          <p className="font-normal text-sm font-lexend  text-gray-400">
                            {moment(val?.createdAt).fromNow()}
                          </p>
                        </div>

                        <Dropdown
                          menu={{
                            items,
                          }}
                          trigger={["click"]}
                        >
                          <svg
                            className="ml-auto cursor-pointer"
                            width="19"
                            height="5"
                            viewBox="0 0 19 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => {
                              setId(val?._id)
                              }
                            }
                          >
                            <path
                              d="M9.201 5.68597e-08C8.91196 5.07687e-08 8.62575 0.0569305 8.35871 0.167541C8.09168 0.278152 7.84904 0.440276 7.64466 0.644658C7.44028 0.84904 7.27815 1.09168 7.16754 1.35871C7.05693 1.62575 7 1.91196 7 2.201C7 2.49004 7.05693 2.77625 7.16754 3.04329C7.27815 3.31032 7.44028 3.55296 7.64466 3.75734C7.84904 3.96172 8.09168 4.12385 8.35871 4.23446C8.62575 4.34507 8.91196 4.402 9.201 4.402C9.78474 4.40187 10.3445 4.16985 10.7572 3.75699C11.1699 3.34413 11.4016 2.78424 11.4015 2.2005C11.4014 1.61676 11.1693 1.05698 10.7565 0.644304C10.3436 0.231631 9.78374 -0.000132534 9.2 5.68597e-08H9.201ZM2.201 5.68597e-08C1.91196 5.07687e-08 1.62575 0.0569305 1.35871 0.167541C1.09168 0.278152 0.84904 0.440276 0.644658 0.644658C0.440276 0.84904 0.278152 1.09168 0.167541 1.35871C0.0569305 1.62575 0 1.91196 0 2.201C0 2.49004 0.0569305 2.77625 0.167541 3.04329C0.278152 3.31032 0.440276 3.55296 0.644658 3.75734C0.84904 3.96172 1.09168 4.12385 1.35871 4.23446C1.62575 4.34507 1.91196 4.402 2.201 4.402C2.78474 4.40187 3.34452 4.16985 3.7572 3.75699C4.16987 3.34413 4.40163 2.78424 4.4015 2.2005C4.40137 1.61676 4.16935 1.05698 3.75649 0.644304C3.34363 0.231631 2.78374 -0.000132534 2.2 5.68597e-08H2.201ZM16.201 5.68597e-08C15.912 5.07687e-08 15.6258 0.0569305 15.3587 0.167541C15.0917 0.278152 14.849 0.440276 14.6447 0.644658C14.4403 0.84904 14.2782 1.09168 14.1675 1.35871C14.0569 1.62575 14 1.91196 14 2.201C14 2.49004 14.0569 2.77625 14.1675 3.04329C14.2782 3.31032 14.4403 3.55296 14.6447 3.75734C14.849 3.96172 15.0917 4.12385 15.3587 4.23446C15.6258 4.34507 15.912 4.402 16.201 4.402C16.7847 4.40187 17.3445 4.16985 17.7572 3.75699C18.1699 3.34413 18.4016 2.78424 18.4015 2.2005C18.4014 1.61676 18.1693 1.05698 17.7565 0.644304C17.3436 0.231631 16.7837 -0.000132534 16.2 5.68597e-08H16.201Z"
                              fill="white"
                            />
                          </svg>
                        </Dropdown>

                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem onClick={handleClose}>Edit Drill</MenuItem>
                          <Popconfirm
                            title="Delete Schedule"
                            description="Are you sure to delete this Schedule?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                              handleClose();
                              deleteDrill(val._id);
                            }}
                            className=""
                            okButtonProps={{ className: "bg-red-500" }}
                          >
                            <MenuItem>Delete Drill</MenuItem>
                          </Popconfirm>
                        </Menu>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex justify-center items-center">
                  <h1 className="text-2xl font-lexend font-medium text-white">
                    No Videos
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
