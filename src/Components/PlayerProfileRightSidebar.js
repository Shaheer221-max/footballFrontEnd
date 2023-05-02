import axios from "axios";
import React from "react";
import { getDatasetAtEvent } from "react-chartjs-2";
import { Link } from "react-router-dom";
import pfp from "../assets/pfp.png";
import "../styles/font.css";

import MoreProfiles from "./MoreProfiles";
import RecentActivityies from "./RecentActivityies";
export default function PlayerProfileRightSidebar(props) {
  console.log(props.data);
  const staticdata = [
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
  ];

  const [data, setData] = React.useState([]);

  const getData = async () => {
    const res = await axios.get(
      "https://football-backend-updated.herokuapp.com/users/GetAllUsers"
    );
    console.log(
      res.data.data.doc.filter(
        (val) => val.role === "Parent" && val.refOfPlayer === props.data._id
      )
    );
    setData(
      res.data.data.doc.filter(
        (val) => val.role === "Parent" && val.refOfPlayer === props.data._id
      )
    );
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {/* Parent Profile Card */}
      <div className="">
        <h4 className="self-center font-lexend text-lg font-medium whitespace-nowrap text-white ml-7 mt-8 ">
          Parent Profile
        </h4>
        {data.length === 0 ? (
          <>
            <p className="text-white ml-7 mt-7 mb-7">No Parent Added</p>
          </>
        ) : (
          data?.map((val, ind) => (
            <div className="w-full min-w-sm bg-transparent   ">
              <div className="flex justify-center px-4 pt-7">
                <div className="flex flex-col items-center pb-10">
                  <img
                    className="mb-3  w-20 h-20 rounded-full shadow-lg"
                    src={val?.image}
                    alt="Bonnie image"
                  />
                  <h5 className="mb-1  text-lg font-normal text-white font-lexend ">
                    {val?.name}
                  </h5>
                  <span className="text-sm font-normal text-gray-500 font-lexend">
                    {val?.email}
                  </span>
                  <Link to={"/chat"}>
                    <a
                      href=""
                      className="inline-flex items-center py-2 px-9 mt-5 text-sm font-normal  font-lexend text-white bg-green-500 rounded-[4px] "
                    >
                      Chat
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* More Profile */}
      <div className=" ml-5 mt-2">
        <MoreProfiles />
      </div>

      {/* Recent Activity */}
      <div className=" mt-12 ml-5 ">
        <RecentActivityies Preview={true} All={true} />
      </div>
    </div>
  );
}
