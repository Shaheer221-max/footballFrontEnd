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
      <div className="flex h-full">
        {/* left side-bar details */}
        <div className="w-1/4 ml-6 mt-10 mr-2">
          <GroupMembers data={location.state} />
        </div>

        {/* center Post */}
        <div className="w-3/4 scrollbar mt-10">
          {/* <UploadGroupPost newsfeed={location.state} /> */}
          <GroupTimeline newsfeed={false} data={location.state} />
        </div>

        {/* right side-bar parent profile */}
        <div className="mr-8 w-1/4 mt-10 pl-8">
          <MoreProfiles />
          <GroupList />
        </div>
      </div>
    </div>
  );
}
