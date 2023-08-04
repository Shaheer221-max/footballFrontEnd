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
  console.log(location.state);

  return (
    <div className="flex-col w-full h-screen">
      {/* Page Header */}
      <Header title={location.state.val.title} />
      <div className="flex flex-grow h-[calc(100vh-95px)] overflow-y-auto mx-4">
        {/* left side-bar details */}
        <div className="w-1/2 mt-8">
          <GroupMembers data={location.state} />
        </div>

        {/* center Post */}
        <div className="w-full scrollbar mt-10 h-[calc(100vh-95px)] overflow-y-auto">
          {/* <UploadGroupPost newsfeed={location.state} /> */}
          <GroupTimeline newsfeed={false} data={location.state} />
        </div>

        {/* right side-bar parent profile */}
        <div className="w-[55%] mt-8 ml-8 h-[calc(100vh-95px)] overflow-y-auto">
          <MoreProfiles />
          <GroupList />
        </div>
      </div>
    </div>
  );
}
