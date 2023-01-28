import React from "react";
import GroupList from "../Components/GroupList";
import Header from "../Components/Header";
import "../styles/scrollbar.css";
import MoreProfiles from "../Components/MoreProfiles";
import TimelinePost from "../Components/TimelinePost";
import GroupMembers from "../Components/GroupMembers";
import { useState, useEffect, useContext } from "react";
import axios from "../axios";
import { Divider, Dropdown, message, Modal } from "antd";
import "../styles/font.css";
import UploadPostOntimeline from "../Components/UploadPostOntimeline";
import { useLocation } from "react-router-dom";
import GroupTimeline from "../Components/GroupTimeline";

const items = [
  {
    label: <p>Delete Group</p>,
    key: "0",
  }
];
export default function Selectedgroup(props) {
  const [Group, SetGroup] = useState(false);
  const [name, setName] = useState(false);
  const [pic, setpic] = useState(false);
  const [id, setActiveId] = useState('');


  const location = useLocation();

  const token = localStorage.getItem("token");

  const getData = async () => {
    let res = await axios
      .get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.doc.id);
        setActiveId(res.data.data.doc.id);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    // getData();
    // memberpic();
  }, []);

  return (
    <div className="flex-col w-full ">
      {/* Page Header */}
      <Header title={location.state.val.title} />
      <div className="flex  divide-x divide-[#7E7E7E] h-screen">
        {/* left side-bar details  */}
        <div className="w-1/3 ml-6 mt-10 mr-2">
          <GroupMembers data = {location.state} />
        </div>

        {/* center Post */}
        <div className=" w-full scrollbar  mt-10">
          <UploadPostOntimeline newsfeed={false} name={name} image={pic} />
          <GroupTimeline newsfeed={false} data = {location.state} />
        </div>

        {/* right side-bar parent profile */}

        <div className="mr-8 w-1/4  mt-10 pl-8">
          <MoreProfiles />
          <GroupList />
        </div>
      </div>
    </div>
  );
}
