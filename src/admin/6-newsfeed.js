import React from "react";
import GroupList from "../Components/GroupList";
import "../styles/scrollbar.css";
import "../styles/font.css";
import Header from "../Components/Header";
import MoreProfiles from "../Components/MoreProfiles";
import RecentActivityies from "../Components/RecentActivityies";
import TimelinePost from "../Components/TimelinePost";
import { useState } from "react";

export default function NewsFeed() {
  const [name, setName] = useState(false);
  const [pic, setpic] = useState(false);

  return (
    <>
      <div className="flex-col w-full h-screen">
        {/* Page Header */}
        <Header title={"News Feed"} />
        <div className="flex flex-grow h-[calc(100vh-95px)] overflow-y-auto mx-4">
          {/* left side-bar details */}
          <div className="w-1/2 mt-8">
            <RecentActivityies />
          </div>

          {/* center Post */}
          <div className="w-full scrollbar mt-10 h-[calc(100vh-95px)] overflow-y-auto">
            {/* <UploadPostOntimeline newsfeed={true} name={name} image={pic} /> */}
            <TimelinePost newsfeed={true} />
          </div>

          {/* right side-bar parent profile */}
          <div className="w-[55%] mt-8 ml-8 h-[calc(100vh-95px)] overflow-y-auto">
            <MoreProfiles />
            <GroupList />
          </div>
        </div>
      </div>
    </>
  );
}
