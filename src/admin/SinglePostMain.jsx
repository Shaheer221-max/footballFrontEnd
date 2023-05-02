import React from "react";
import GroupList from "../Components/GroupList";
import "../styles/scrollbar.css";
import "../styles/font.css";
import Header from "../Components/Header";
import MoreProfiles from "../Components/MoreProfiles";
import RecentActivityies from "../Components/RecentActivityies";
import UploadPostOntimeline from "../Components/UploadPostOntimeline";
import SinglePost from "../Components/SinglePost";

export default function SinglePostMain() {
  return (
    <>
      <div className="flex-col w-full ">
        <Header title={"News Feed"} />
        <div className="flex h-screen">
          <div className="w-3/4 mt-8 ml-8 ">
            <RecentActivityies />
          </div>

          <div className=" w-full scrollbar mt-10">
            <UploadPostOntimeline />
            <SinglePost />
          </div>

          <div className=" mr-8 w-3/4 mt-8 ml-8">
            <MoreProfiles />
            <GroupList />
          </div>
        </div>
      </div>
    </>
  );
}
