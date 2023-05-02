import React from "react";
import "../styles/scrollbar.css";
import "../styles/font.css";
import Header from "../Components/Header";
import MoreProfiles from "../Components/MoreProfiles";
import RecentActivityies from "../Components/RecentActivityies";
import TimelinePost from "../Components/TimelinePost";
import CoachGroupList from "../Components/CoachGroupList";

export default function NewsFeed() {

  return (
    <>
      <div className="flex-col w-full ">
        <Header title={"News Feed"} />
        <div className="flex h-screen">
          <div className="w-2/4 mt-8 ml-8 ">
            <RecentActivityies />
          </div>

          <div className=" w-full overflow-y-scroll scrollbar mt-10">
            <TimelinePost newsfeed={true} />
          </div>
          <div className=" mr-8 w-4/12 mt-8 ml-8">
            <MoreProfiles />
            <CoachGroupList />
          </div>
        </div>
      </div>
    </>
  );
}
