import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";

// Import React Icons
import { IoMdNotifications } from "react-icons/io";

export default function Notifications() {
  const [notifications, setNotifications] = React.useState([]);
  const { user } = useSelector((state) => state);
  console.log(user);
  // Get All Notifications

  const getData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/notification/getNotification`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(res.data.data);
    setNotifications(res.data.data.notificationarray);
  };

  React.useEffect(() => {
    // Get All Notifications
    getData();
  }, []);
  return (
    <div className="flex-col w-full">
      <Header title={"Notifications"} />
      <div className="ml-7 mt-10 mb-5 flex justify-between w-3/4">
        <h5 className="text-green-500">Today</h5>
        <button className="bg-blue-500 p-3 rounded-sm">Mark all as read</button>
      </div>
      {notifications.map((notification) => {
        return (
          <div className="flex-col w-full h-ful">
            <div className="flex align-middle w-3/4 h-full ml-7 border-[#1DB954] border-b-[0.5px]">
              <IoMdNotifications className="text-blue-600 mr-3 mt-8 mb-7" />
              <h3 className="text-white pt-7 pb-7">
                You have a new Player. See{" "}
                <a className="text-orange-400" href="">
                  Player
                </a>
              </h3>
              {/* <h5 className="text-green-500">{notification.createdAt.split('T')[1].slice(0,5)}</h5> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
