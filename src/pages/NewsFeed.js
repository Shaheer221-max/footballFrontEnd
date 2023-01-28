import React from "react";
import GroupList from "../Components/GroupList";
import "../styles/scrollbar.css"
import "../styles/font.css"
import Header from "../Components/Header";
import MoreProfiles from "../Components/MoreProfiles";
import RecentActivityies from "../Components/RecentActivityies";
import TimelinePost from "../Components/TimelinePost";
import UploadPostOntimeline from "../Components/UploadPostOntimeline";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../admin/ActiveUser";

export default function NewsFeed() {

  const [name, setName] = useState(false);
  const [pic, setpic] = useState(false);
  const {id, setActiveId } = useContext(AuthContext);
  const api = axios.create({
    baseURL : 'http://localhost:8000/coach/'
  });

  
  
   // getting players from database
  const data = async () => {
    console.log("in data")
    let res = await api.get('getcoachByEmail/'+id)
    .then((res) => {
      if (res.data.data !== res.data.data.Prototype){
        setName(res.data.data.name);
        setpic(res.data.data.image);
        console.log(name)

      }})
    .catch((error) => {
        console.log(error.response.data);
        
    })
  };
  data();

  return (
    <>
      <div className="flex-col w-full ">
        {/* Page Header */}
        <Header title={"News Feed"} />
        <div className="flex   h-screen">
          {/* left side-bar details  */}
          <div className="w-1/4 mt-8 ml-8 ">
            <RecentActivityies />
          </div>

          {/* center Post */}
          <div className=" w-full overflow-y-scroll scrollbar mt-10">
            <UploadPostOntimeline newsfeed = {true} name = {name} image = {pic}/>
            <TimelinePost newsfeed = {true}/>
          </div>

          {/* right side-bar parent profile */}

          <div className=" mr-8 w-4/12 mt-8 ml-8">
            <MoreProfiles />
            <GroupList />
          </div>
        </div>
      </div>
    </>
  );
}
