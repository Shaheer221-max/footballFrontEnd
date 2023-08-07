import React from "react";
import Header from "../Components/Header";
import PlayerProfileleftsidebar from "../Components/Adminplayerprofileleftsidebar";
import PlayerProfileCenterBox from "../Components/PlayerProfileCenterBox";
import PlayerProfileRightSidebar from "../Components/PlayerProfileRightSidebar";
import { useLocation } from "react-router-dom";
import "../styles/font.css"
import axios from "axios";
export default function Playerprofile() {
  const location = useLocation();
  return (
    <>
      <div className="flex-col w-full ">
        {/* Page Header */}
        <Header title={"Player's Profile"} />
        <div className="flex  divide-x h-[calc(100vh-95px)] overflow-y-auto">
          {/* left side-bar details  */}
          <div className="w-[20%] ml-10 mr-3 mt-5 h-[calc(100vh-115px)] overflow-y-auto">
            <PlayerProfileleftsidebar data = {location?.state} />
          </div>

          {/* center Post */}
          <div className=" w-[55rem] h-[calc(100vh-95px)] overflow-y-auto border-[#7e7e7e] ">
            <PlayerProfileCenterBox data = {location?.state} />
          </div>

          {/* right side-bar parent profile */}

          <div className=" mr-5 mt-2 w-1/4 h-[calc(100vh-95px)] overflow-y-auto border-[#7e7e7e] ">
            <PlayerProfileRightSidebar data = {location?.state} />
          </div>
        </div>
      </div>
    </>
  );
}
