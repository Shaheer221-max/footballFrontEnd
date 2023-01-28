import React from "react";
import GroupList from "../Components/GroupList";
import Header from "../Components/Header";
import "../styles/scrollbar.css";
import MoreProfiles from "../Components/MoreProfiles";
import GroupMembers from "../Components/GroupMembers";
import "../styles/font.css";
import { useLocation } from "react-router-dom";
import GroupTimeline from "../Components/GroupTimeline";
import UploadGroupPost from "../Components/UploadGroupPost";

export default function Selectedgroup() {
  const location = useLocation();

  return (
    <div className="flex-col w-full ">
      {/* Page Header */}
      <Header title={location.state.val.title} />
      <div className="flex  divide-x divide-[#7E7E7E] h-screen">
        {/* left side-bar details  */}
        <div className="w-2/3 ml-6 mt-10 mr-2">
          <GroupMembers data={location.state} />
        </div>

        {/* center Post */}
        <div className=" w-full scrollbar  mt-10">
          <UploadGroupPost newsfeed={location.state} />
          <GroupTimeline newsfeed={false} data={location.state} />
        </div>

        {/* right side-bar parent profile */}
        <div className="mr-8 w-2/3  mt-10 pl-8">
          <MoreProfiles />
          <GroupList />
        </div>
      </div>
    </div>
  );
}
