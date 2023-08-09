import React, { useState, useEffect } from "react";
import "../styles/font.css";
import axios from "../axios";
import { Link } from "react-router-dom";
export default function RecentActivityies(props) {
  const [post, SetPost] = useState(false);

  // getting all posts
  const memberName = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API}/newsfeed/GetAllNewsFeed`
      )
      .then((res) => {
        SetPost(res.data.data.reverse().slice(0, 5));
        console.log(res.data.data.reverse().slice(0, 5));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    memberName();
  }, []);

  return (
    <>
      <div className=" flex items-center justify-between ">
        <h4 className="self-center text-lg font-normal font-lexend whitespace-nowrap text-white  ">
          Recent Activity
        </h4>
      </div>
      <div className="cursor-pointer mb-12">
        {post === false ? (
          <></>
        ) : (
          <>
            {post.map((val, ind) => (
              <>
                <Link to={{ pathname: "/single" }} state={val}>
                  <div className="flex gap-2 mt-5 ">
                    <div className="flex items-center">
                      {val?.refOfUser?.image ? (
                        <>
                          <img
                            className=" w-8 h-8 rounded-full shadow-lg"
                            src={val?.refOfUser?.image}
                            alt="Bonnie image"
                          />
                        </>
                      ) : (
                        <>
                          <div className="w-8 h-8 rounded-full shadow-lg bg-white"></div>
                        </>
                      )}
                    </div>
                    <div className="ml-1">
                      <div className="flex gap-1 items-center">
                        <h6 className=" font-medium whitespace-nowrap text-sm font-lexend text-white  ">
                          {val?.refOfUser?.name}
                        </h6>
                        {/* <p className="text-white">{val.image}</p> */}
                        <p className="text-xs font-lexend text-gray-500 ml-2">
                          Posted{" "}
                        </p>{" "}
                        {val?.image !== "false" ? (
                          <p className="text-gray-500 text-xs font-lexend">
                            Image
                          </p>
                        ) : (
                          <p className="text-gray-500 text-xs font-lexend">
                            a status
                          </p>
                        )}
                      </div>
                      <p className="text-xs font-lexend text-gray-500 ">
                        {/* {moment(val?.time).fromNow()} */}
                        {/* {moment(val?.time).fromNow()} */}
                        {/* <Moment fromNow>{val?.time}</Moment> */}
                      </p>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </>
        )}
      </div>
    </>
  );
}
