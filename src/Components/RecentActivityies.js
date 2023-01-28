import React, { useState, useEffect, useContext } from "react";
import pfp from "../assets/pfp.png";
import pic1 from "../assets/pic1.png"
import "../styles/font.css"
import axios from '../axios';
import Moment from 'react-moment';
import { AuthContext } from "../admin/ActiveUser"
export default function RecentActivityies(props) {
  const [post, SetPost] = useState(false);
  const [recent, setRecent] = useState(false);
  const {id, setActiveId } = useContext(AuthContext);
  


  // getting all posts
  const memberName = async () => {
    let email = {
      email : id
    }
      let res = await axios.get('/post/getrecentposts', {params:{data:email}})
      .then ( (res) => {
        
        if (res.data.data !== res.data.data.Prototype){
          let member = (res.data.data);
          SetPost(member.reverse());
         console.log(post)
        }
        }
      )
      .catch((error) => {
          console.log(error);
      })
    
    
  }
  useEffect (()=>{  
  // memberName()
  },[])

  return (
    <>
      <div className=" flex items-center justify-between ">
        <h4 className="self-center text-lg font-normal font-lexend whitespace-nowrap text-white  ">
          Recent Activity
        </h4>
        {props.All === true ? (
        <a className="text-sm text-gray-500 ml-auto font-lexend">All</a>
        ) : (
              <div></div>
            )}
      </div>
      <div className="">
        {post === false ? (<></>): (<>
          {post.map((val, ind) => (
          <>

            
            <div className="flex gap-2 mt-5 ">
            <div className="flex items-center">
              {val.post.sender_img?(<>
                <img
                className=" w-8 h-8 rounded-full shadow-lg"
                src={val.post.sender_img}
                alt="Bonnie image"
              />
              </>):(<>
              <div className="w-8 h-8 rounded-full shadow-lg bg-white"></div>
              </>)}
              
            </div>
            <div className="ml-1">
              <div className="flex gap-1 items-center">
                <h6 className=" font-medium whitespace-nowrap text-sm font-lexend text-white  ">
                  {val.post.name}
                </h6>
                <p className="text-xs font-lexend text-gray-500 ">Posted </p>
              </div>
              <p className="text-xs font-lexend text-gray-500 "><Moment fromNow>{val.post.date}</Moment></p>
            </div>
            {props.Preview === true ? (
              <div className="flex items-center">
              <img
                className="ml-[25px] w-8 h-8 rounded-2 shadow-lg"
                src={pic1}
                alt="Bonnie image"
              />
            </div>
            ) : (
              <div></div>
            )}
           
          </div>
          </>
          
          
        ))}</>)}
        
      </div>
    </>
  );
}
