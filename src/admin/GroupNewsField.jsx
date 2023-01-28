import React from "react";
import GroupList from "../Components/GroupList";
import "../styles/scrollbar.css";
import "../styles/font.css";
import Header from "../Components/Header";
import MoreProfiles from "../Components/MoreProfiles";
import RecentActivityies from "../Components/RecentActivityies";
import TimelinePost from "../Components/TimelinePost";
import UploadPostOntimeline from "../Components/UploadPostOntimeline";
import { useState, useEffect, useContext } from "react";
import axios from "../axios";
import { AuthContext } from "./ActiveUser";

export default function GroupNewsField() {
  const [name, setName] = useState(false);
  const [pic, setpic] = useState(false);
  const { id, setActiveId } = useContext(AuthContext);

  // getting players from database
  const data = async () => {
    console.log("in data");
    let res = await axios
      .get("/admin/getadminByEmail/" + id)
      .then((res) => {
        if (res.data.data !== res.data.data.Prototype) {
          setName(res.data.data.name);
          setpic(res.data.data.image);
          console.log(name);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  data();

  return (
    <>
      <div className="flex-col w-full ">
        {/* Page Header */}
        <Header title={"News Feed"} />
        <div className="flex h-screen">
          {/* left side-bar details  */}
          <div className="w-1/3 mt-8 ml-8 ">
            <RecentActivityies />
          </div>

          {/* center Post */}
          <div className=" w-full scrollbar mt-10">
            <UploadPostOntimeline newsfeed={true} name={name} image={pic} />
            <TimelinePost newsfeed={true} />
          </div>

          {/* right side-bar parent profile */}

          <div className=" mr-8 w-1/2 mt-8 ml-8">
            <MoreProfiles />
            <GroupList />
          </div>
        </div>
      </div>
    </>
  );
}
