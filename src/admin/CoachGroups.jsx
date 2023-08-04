import React from "react";
import { useState, useEffect, useContext } from "react";
import Header from "../Components/Header";
import "../styles/font.css";
import { NavLink } from "react-router-dom";
import axios from "../axios";
import { AuthContext } from "./ActiveUser";
import { message, Popconfirm } from "antd";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "./Spinner";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

export default function CoachGroup() {
  let search;
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState();
  const [staticdataCopy, setStaticDataCopy] = useState([]);
  const { id, setActiveId } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);

  const { user } = useSelector((state) => state.user);
  console.log(user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const token = localStorage.getItem("token");

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

  const handleGroupChange = (event) => {
    search = event.target.value;
    console.log(search);
    setStaticDataCopy(
      groups.filter((val) =>
        val.title.toLowerCase().startsWith(search.toLowerCase())
      )
    );
    console.log(groups.filter((val) => val.title.startsWith(search)));
  };

  //Get All Groups
  const getGroups = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/group/GetAllUserGroups/${user?._id}`)
      .then((res) => {
        console.log(res.data.data);
        setGroups(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getGroups();
    getData();
  }, [refresh]);

  const deleteGroup = async () => {
    setRefresh(true);
    await axios
      .delete(`${process.env.REACT_APP_API}/group/DeleteGroup/` + groupId)
      .then((res) => {
        message.success("Group Deleted Successfully");
        console.log(res.data);
        setRefresh(false);
        handleClose();
      })
      .catch((error) => {
        message.error("Group Not Deleted");
        console.log(error.response.data);
      });
  };

  return (
    <>
      <div className="flex-col w-full">
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={deleteGroup}>Delete Group</MenuItem>
        </Menu>
        <Header title={"Groups"} />
        <div className="h-[calc(100vh-95px)] overflow-y-auto">
          <div className="flex items-center justify-between mt-[32px]  mr-10">
            <h4 className="self-center text-xl font-medium text-white font-lexend whitespace-nowrap  ml-9 ">
              All Groups
            </h4>
            <div className="flex">
              <input
                type="text"
                onChange={handleGroupChange}
                className="bg-[#212121]  text-white p-2.5  align-items-right text-sm rounded-lg block w-60 mr-3   border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Group"
              />
              <div className=" space-x-4 mr-9">
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-6 font-lexend  text-sm font-normal text-white bg-green-500 rounded-[4px] "
                >
                  Search
                </button>
                <NavLink to={"/selectgroup/addgroups"}>
                  <a
                    href=""
                    className="inline-flex items-center  py-2.5 px-6  text-sm font-lexend font-normal text-black bg-white rounded-[4px] "
                  >
                    New Group
                  </a>
                </NavLink>
              </div>
            </div>
          </div>
          {/* Group Cards */}
          <div className="mb-9 mt-12 mx-9 font-sans grid lg:grid-cols-4 2xl:grid-cols-5 gap-5 ">
            {/* checking if searched */}
            {staticdataCopy.length > 0 || groups.length > 0 ? (
              staticdataCopy?.length > 0 ? (
                <>
                  {staticdataCopy.map((val, ind) => (
                    <>
                      <div className=" font-dm p-3 mb-6 max-w-xs bg-[#212121] rounded-lg h-30">
                        <NavLink
                          to={{ pathname: "/selectgroup/groups" }}
                          state={{ val }}
                        >
                          <div className="flex gap-4 items-center">
                            <img
                              src={val.image}
                              className="rounded-lg h-20 w-20"
                            />
                            <div>
                              <h5 className="mb-2 font-dm text-lg font-normal tracking-tight text-white">
                                {val.title}
                              </h5>
                              <div className="flex items-center gap-3">
                                <svg
                                  width="11"
                                  height="11"
                                  viewBox="0 0 11 11"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="5.5"
                                    cy="5.5"
                                    r="5.5"
                                    fill="#1DB954"
                                  />
                                </svg>

                                <p className="font-normal font-dm text-sm  text-gray-400">
                                  {val.Members.length} members
                                </p>
                              </div>
                            </div>
                          </div>
                        </NavLink>
                        <div className="flex justify-end">
                          <button
                            onClick={(e) => {
                              setGroupId(val._id);
                            }}
                          >
                            <Popconfirm
                              title="Delete Group"
                              description="Are you sure to delete this Group?"
                              okText="Yes"
                              cancelText="No"
                              onConfirm={() => deleteGroup()}
                              okButtonProps={{ className: "bg-red-500" }}
                            >
                              <MdDelete className="ml-auto text-2xl text-white cursor-pointer" />
                            </Popconfirm>
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
                </>
              ) : (
                <>
                  {groups.map((val, ind) => (
                    <>
                      <div className=" font-dm p-3 mb-6 max-w-xs bg-[#212121] rounded-lg h-30">
                        <NavLink
                          to={{ pathname: "/selectgroup/groups" }}
                          state={{ val }}
                        >
                          <div className="flex gap-4 items-center">
                            <img
                              src={val.image}
                              className="rounded-lg h-20 w-20"
                            />
                            <div>
                              <h5 className="mb-2 font-dm text-lg font-normal tracking-tight text-white">
                                {val.title}
                              </h5>
                              <div className="flex items-center gap-3">
                                <svg
                                  width="11"
                                  height="11"
                                  viewBox="0 0 11 11"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="5.5"
                                    cy="5.5"
                                    r="5.5"
                                    fill="#1DB954"
                                  />
                                </svg>

                                <p className="font-normal font-dm text-sm  text-gray-400">
                                  {val.Members.length} members
                                </p>
                              </div>
                            </div>
                          </div>
                        </NavLink>
                        <div className="flex justify-end">
                          <button
                            onClick={(e) => {
                              setGroupId(val._id);
                            }}
                          >
                            <Popconfirm
                              title="Delete Group"
                              description="Are you sure to delete this Group?"
                              okText="Yes"
                              cancelText="No"
                              onConfirm={() => deleteGroup()}
                              okButtonProps={{ className: "bg-red-500" }}
                            >
                              <MdDelete className="ml-auto text-2xl text-white cursor-pointer" />
                            </Popconfirm>
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
                </>
              )
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
