import React from "react";
import { useState, useEffect, useContext } from "react";
import "../styles/font.css";
import { NavLink } from "react-router-dom";
import axios from "../axios";
import { AuthContext } from "../admin/ActiveUser";

export default function GroupList() {
  const [groups, setGroup] = useState([]);
  const { id, setActiveId } = useContext(AuthContext);
  const { group, setActiveGroup } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const getData = async () => {
    let res = await axios
      .get("https://football-backend-updated.herokuapp.com/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setActiveId(res.data.data.doc.id);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getData();
    data();
  }, []);

  const data = async () => {
    let res = await axios
      .get("https://football-backend-updated.herokuapp.com/group/GetAllGroups/")
      .then((res) => {
        if (res.data.data !== res.data.data.Prototype) {
          setGroup(res.data.data.doc);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <>
      <div className=" font-lexend flex items-center justify-between mb-7  mt-10">
        <h4 className="self-center text-lg font-normal font-lexend whitespace-nowrap text-white ">
          Groups
        </h4>
        <NavLink to="/selectgroup">
          <p className="text-sm text-gray-500 ml-auto">All</p>
        </NavLink>
      </div>
      {groups === false ? (
        <></>
      ) : (
        <>
          {groups?.map((val, ind) => (
            <NavLink
            to={{ pathname: "/selectgroup/groups" }}
            state={{ val }}
              onClick={() => setActiveGroup(val._id)}
              className="flex gap-4 mb-6 items-center "
            >
              <img
                className=" w-16 h-16 rounded-md "
                src={val.image}
                alt="Bonnie image"
              />
              <div>
                <h4 className="self-center text-lg font-normal font-lexend whitespace-nowrap text-white  ">
                  {val.title}
                </h4>
                <div className="flex items-center gap-2  mt-1">
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="4" cy="4" r="4" fill="#1DB954" />
                  </svg>
                  <p className="font-normal font-lexend text-left text-sm text-gray-400">
                    {val.Members.length} members in it
                  </p>
                </div>
              </div>
            </NavLink>
          ))}
        </>
      )}
    </>
  );
}
