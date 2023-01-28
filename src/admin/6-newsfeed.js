import React from "react";
import GroupList from "../Components/GroupList";
import "../styles/scrollbar.css";
import "../styles/font.css";
import Header from "../Components/Header";
import MoreProfiles from "../Components/MoreProfiles";
import RecentActivityies from "../Components/RecentActivityies";
import TimelinePost from "../Components/TimelinePost";
import UploadPostOntimeline from "../Components/UploadPostOntimeline";
import { useState } from "react";

export default function NewsFeed() {
  const [name, setName] = useState(false);
  const [pic, setpic] = useState(false);

  return (
    <>
      <div className="flex-col w-full ">
        {/* Page Header */}
        <Header title={"News Feed"} />
        <div className="flex h-screen">
          {/* left side-bar details  */}
          <div className="w-3/4 mt-8 ml-8 ">
            <RecentActivityies />
          </div>

          {/* center Post */}
          <div className=" w-full scrollbar mt-10">
            <UploadPostOntimeline newsfeed={true} name={name} image={pic} />
            <TimelinePost newsfeed={true} />
          </div>

          {/* right side-bar parent profile */}

          <div className=" mr-8 w-3/4 mt-8 ml-8">
            <MoreProfiles />
            <GroupList />
          </div>
        </div>
      </div>
    </>
  );
}
