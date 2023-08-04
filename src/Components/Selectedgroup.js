import React from "react";
import Header from "../Components/Header";
import "../styles/scrollbar.css";
import MoreProfiles from "../Components/MoreProfiles";
import GroupMembers from "../Components/GroupMembers";
import "../styles/font.css";
import { useLocation } from "react-router-dom";
import GroupTimeline from "../Components/GroupTimeline";
import CoachGroupList from "./CoachGroupList";

export default function Selectedgroup() {
  const location = useLocation();
  return (
    <div className="flex-col w-full">
      <Header title={location.state.val.title} />
      <div className="flex  divide-x divide-[#7E7E7E] h-[calc(100vh-95px)] overflow-y-auto">
        <div className="w-2/4 ml-6 mt-10 mr-2">
          <GroupMembers data = {location.state} />
        </div>

        <div className=" w-full scrollbar mt-10 h-[calc(100vh-95px)] overflow-y-auto">
          <GroupTimeline newsfeed={false} data = {location.state} />
        </div>


        <div className="mr-8 w-2/4  mt-10 pl-8 h-[calc(100vh-95px)] overflow-y-auto">
          <MoreProfiles />
          <CoachGroupList />
        </div>
      </div>
    </div>
  );
}
