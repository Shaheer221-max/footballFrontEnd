import React from "react";
import Header from "../Components/Header";
import "../styles/scrollbar.css"
import PlayerProfileleftsidebar from "../Components/PlayerProfileleftsidebar";
import PlayerProfileCenterBox from "../Components/PlayerProfileCenterBox";
import PlayerProfileRightSidebar from "../Components/PlayerProfileRightSidebar";
import TimelinePost from "../Components/TimelinePost";
import pic1 from "../assets/pic1.png"
import "../styles/font.css"
export default function Timline() {
  return (
    <>
      <div className="flex-col w-full ">
        {/* Page Header */}
        <Header title={"Player's Profile"} />
        <div className="flex  divide-x divide-[#7e7e7e] h-screen">
          {/* left side-bar details  */}
          <div className="w-1/4 ml-10 mr-3">
            <PlayerProfileleftsidebar />
          </div>

          {/* center Post */}
          <div className=" w-full overflow-y-scroll scrollbar">
         
            <TimelinePost />
          </div>

          {/* right side-bar parent profile */}

          <div className=" mr-8 w-4/12">
            <PlayerProfileRightSidebar  />
          </div>
        </div>
      </div>
    </>
  );
}
