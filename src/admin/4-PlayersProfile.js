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
  console.log(location)
  return (
    <>
      <div className="flex-col w-full ">
        {/* Page Header */}
        <Header title={"Player's Profile"} />
        <div className="flex  divide-x h-screen">
          {/* left side-bar details  */}
          <div className="w-1/4 ml-10 mr-3 mt-5">
            <PlayerProfileleftsidebar data = {location?.state} />
          </div>

          {/* center Post */}
          <div className=" border-[#7E7E7E] w-full mt-7 ">
            <PlayerProfileCenterBox data = {location?.state} />
          </div>

          {/* right side-bar parent profile */}

          <div className=" border-[#7E7E7E] mr-5 mt-2 w-4/12">
            <PlayerProfileRightSidebar data = {location?.state} />
          </div>
        </div>
      </div>
    </>
  );
}
