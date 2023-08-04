import React from "react";
import { useState, useEffect, useContext } from "react";
import Header from "../../Components/Header";
import "../../styles/font.css";
import { NavLink } from "react-router-dom";
import axios from "../../axios";
import { AuthContext } from "../ActiveUser";
import { Dropdown, message, Modal } from "antd";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Spinner from "../Spinner";

export default function Category() {
  let search;
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState();
  const [staticdataCopy, setStaticDataCopy] = useState([]);
  const { id, setActiveId } = useContext(AuthContext);
  const { group, setActiveGroup } = useContext(AuthContext);
  const [openAddsubcatmodal, setopenAddsubcatmodal] = useState(false);
  const [opendeletemodal, setopendeletemodal] = useState(false);
  const [newFolder, setNewFolder] = useState(false);
  const [newFolder1, setNewFolder1] = useState(false);
  const [categories, setCategory] = useState(false);
  const [categoryid, setCategoryid] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
    setStaticDataCopy(groups.filter((val) => val.name.startsWith(search)));
    console.log(groups.filter((val) => val.title.startsWith(search)));
  };

  //Get All Groups
  const getGroups = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/itemcategory/GetAllItemCategories/`)
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
    console.log(groupId);
    await axios
      .delete(`${process.env.REACT_APP_API}/group/DeleteGroup/` + groupId)
      .then((res) => {
        message.success("Group Deleted Successfully");
        console.log(res.data);
        message.success("Group Deleted Successfully");
        handleClose();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const category = async (id) => {
    setRefresh(true);
    await axios
      .post(`${process.env.REACT_APP_API}/itemcategory/CreateItemCategory/`, {
        name: categories,
      })
      .then((res) => {
        message.success("Category Added Successfully");
        console.log(res.data.data);
        setActiveGroup(res.data.data);
        setNewFolder(false);
        setRefresh(false);
      })
      .catch((error) => {
        message.error("Category Already Exists");
        console.log(error.response.data);
      });
  };

  const category1 = async () => {
    setRefresh(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/itemcategory/UpdateItemCategory/${categoryid}`,
        { name: categories }
      )
      .then((res) => {
        message.success("Category Updated Successfully");
        console.log(res.data.data);
        setActiveGroup(res.data.data);
        setNewFolder1(false);
        setRefresh(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const deletecategory = async (id) => {
    setRefresh(true);
    await axios
      .delete(
        `${process.env.REACT_APP_API}/itemcategory/DeleteItemCategory/${id}`
      )
      .then((res) => {
        message.success("Category Deleted Successfully");
        console.log(res.data.data);
        setRefresh(false);
      })
      .catch((error) => {
        message.error("Category Already Exists");
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
        {/* Page Header */}
        <Header title={"Categories"} />
        {/* Title Of the Page */}
        <div className="h-[calc(100vh-95px)] overflow-y-auto">
          <div className="flex items-center justify-between mt-[32px]  mr-10">
            <h4 className="self-center text-xl font-medium text-white font-lexend whitespace-nowrap  ml-9 ">
              All Categories
            </h4>
          </div>
          <div className="flex">
            <div className="flex-1 grow-1">
              {/* search button */}
              <form className="flex items-center w-1/2 ml-9 mt-4">
                <div className="relative w-full font-dm">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="bg-[#212121]  text-white  text-sm rounded-lg block w-full pl-10 p-2.5   border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search Items"
                    required=""
                    onChange={handleGroupChange}
                  />
                </div>
                <NavLink to="/allItems">
                  <button
                    type="submit"
                    className="inline-flex font-dm items-center font-lexend py-2 px-5 ml-4 text-sm font-normal text-white bg-green-500 rounded-[4px] "
                    //   onClick={searchInItem}
                  >
                    Search
                  </button>
                </NavLink>
              </form>
            </div>

            <div className="flex-1 grow-0 mt-2 mr-8">
              <button
                onClick={() => {
                  setNewFolder(true);
                }}
                type="submit"
                className=" font-dm items-center w-40 py-2  ml-4 text-sm font-normal text-white bg-green-500 rounded-[4px] "
              >
                Add Category
              </button>
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
                        <div className="">
                          <div>
                            <div className="flex justify-between align-middle">
                              <h5 className="mb-2 font-dm text-lg font-normal tracking-tight text-white">
                                {val.name}
                              </h5>
                              <div>
                                <DeleteOutlined
                                  onClick={() => {
                                    deletecategory(val.id);
                                  }}
                                  className="text-green-500 mr-2"
                                />
                                <EditOutlined
                                  onClick={() => {
                                    setCategoryid(val.id);
                                    setNewFolder1(true);
                                  }}
                                  className="text-green-500"
                                />
                              </div>
                            </div>

                            {/* <div className="flex items-center gap-3">
                          <button
                            type="submit"
                            className=" font-dm items-center w-40 py-1 mt-2 text-sm font-normal text-white bg-blue-500 rounded-[4px] "
                          >
                            View All Variants
                          </button>
                        </div> */}
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </>
              ) : (
                // if group searched
                <>
                  {groups.map((val, ind) => (
                    <>
                      <div className=" font-dm p-3 mb-6 max-w-xs bg-[#212121] rounded-lg h-30">
                        <div className="">
                          <div>
                            <div className="flex justify-between align-middle">
                              <h5 className="mb-2 font-dm text-lg font-normal tracking-tight text-white">
                                {val.name}
                              </h5>
                              <div>
                                <DeleteOutlined
                                  onClick={() => {
                                    deletecategory(val.id);
                                  }}
                                  className="text-green-500 mr-2"
                                />
                                <EditOutlined
                                  onClick={() => {
                                    setCategoryid(val.id);
                                    setNewFolder1(true);
                                  }}
                                  className="text-green-500"
                                />
                              </div>
                            </div>

                            {/* <div className="flex items-center gap-3">
                          <button
                            type="submit"
                            className=" font-dm items-center w-40 py-1 mt-2 text-sm font-normal text-white bg-blue-500 rounded-[4px] "
                          >
                            View All Variants
                          </button>
                        </div> */}
                          </div>
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

      <div
        id="defaultModal"
        className={
          !newFolder
            ? "hidden"
            : " flex absolute top-0 right-0 left-0 z-50 w-full h-full  bg-black/70  bg-opacity-5 justify-center items-center"
        }
      >
        <div className="relative p-4 w-full max-w-lg  ">
          <div className="relative bg-gradient-to-r from-[#000000]/24 to-[#000000]/81 backdrop-blur-[5px]  border-[border] border-2   rounded-2xl px-4 py-2">
            <button
              onClick={() => !setNewFolder(false)}
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

            <div className="justify-center p-3 ">
              <h3 className="text-lg text-left font-lexend font-bold text-white p-3.5">
                Adding Category
              </h3>

              <div className="flex justify-center p-3 ">
                <input
                  type="text"
                  className="bg-[#212121]  text-white text-sm rounded-lg placeholder-lexend block w-full p-3 mb-5 placeholder-white"
                  placeholder="Category"
                  required=""
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center gap-3 mt-2 mb-10">
                <button
                  className="inline-flex items-center py-2 px-7  text-sm font-medium text-black bg-white rounded-[4px] "
                  onClick={category}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="defaultModal"
        className={
          !newFolder1
            ? "hidden"
            : " flex absolute top-0 right-0 left-0 z-50 w-full h-full  bg-black/70  bg-opacity-5 justify-center items-center"
        }
      >
        <div className="relative p-4 w-full max-w-lg  ">
          <div className="relative bg-gradient-to-r from-[#000000]/24 to-[#000000]/81 backdrop-blur-[5px]  border-[border] border-2   rounded-2xl px-4 py-2">
            <button
              onClick={() => !setNewFolder1(false)}
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

            <div className="justify-center p-3 ">
              <h3 className="text-lg text-left font-lexend font-bold text-white p-3.5">
                Editing Category
              </h3>

              <div className="flex justify-center p-3 ">
                <input
                  type="text"
                  className="bg-[#212121]  text-white text-sm rounded-lg placeholder-lexend block w-full p-3 mb-5 placeholder-white"
                  placeholder="Category"
                  required=""
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center gap-3 mt-2 mb-10">
                <button
                  className="inline-flex items-center py-2 px-7  text-sm font-medium text-black bg-white rounded-[4px] "
                  onClick={category1}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
