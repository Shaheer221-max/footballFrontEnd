import React from "react";
import { useState, useEffect } from "react";
import "../styles/font.css";
import axios from "../axios";
import { NavLink } from "react-router-dom";
export default function MoreProfiles() {
  const [player, setPlayers] = useState(false);

  useEffect(() => {
    allPlayers();
  }, []);

  const token = localStorage.getItem("token");

  // getting players from database
  const allPlayers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/GetAllPlayers`)
      .then((res) => {
        console.log(res.data.data);
        setPlayers(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <>
      <div className=" flex ">
        <h4 className=" text-lg font-normal font-lexend whitespace-nowrap ml-2 text-white  ">
          More Profiles
        </h4>
        <NavLink
          to={"/userarea/"}
          className="text-sm text-gray-500 ml-auto font-lexend"
        >
          <a className="text-sm text-gray-500 ml-auto font-lexend">All</a>
        </NavLink>
      </div>
      <div className=" grid grid-cols-3 gap-x-2 mt-7">
        {player !== false ? (
          <>
            {player.map((val, index) => {
              return (
                <>
                  {val.image ? (
                    <>
                      <NavLink to={{ pathname : "/userarea/playerprofile/profile"}} state = {val}>
                        <img
                          className="mb-3 w-10 h-10 rounded-full shadow-lg"
                          src={val.image}
                          alt="Bonnie image"
                        />
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink to={"/userarea/playerprofile/profile"}>
                        <div className="mb-3 w-10 h-10 rounded-full shadow-lg bg-white"></div>
                      </NavLink>
                    </>
                  )}
                </>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
