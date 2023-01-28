import React from "react";
import grouplist from "../assets/grouplist.png";
import "../styles/font.css"
export default function AdminGroupList() {
  const staticdata = [
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },


  ];
  return (
    <>
      <div className=" font-lexend flex items-center justify-between mb-7  mt-10">
        <h4 className="self-center text-lg font-normal font-lexend whitespace-nowrap text-white ">
          Groups
        </h4>
        <a href="/selectedGroup" className="text-sm text-gray-500 ml-auto">All</a>
      </div>
      {staticdata.map((val, ind) => (
        <a href="/selectedGroup" className="flex gap-4 mb-6 items-center ">
          <img
            className=" w-16 h-16 rounded-md "
            src={grouplist}
            alt="Bonnie image"
          />
          <div>
            <h4 className="self-center text-lg font-normal font-lexend whitespace-nowrap text-white  ">
              Strikers Group
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
                32 members in it
              </p>
            </div>
          </div>
        </a>
      ))}
    </>
  );
}
