import { Dropdown } from "antd";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/font.css";
import { IoMdNotifications } from "react-icons/io";
export default function Header(props) {
  // Get Redux State
  const { user } = useSelector((state) => state);

  const [notifications, setNotifications] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
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

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const items = [
    {
      label: <button>View Profile</button>,
      key: "0",
    },
    {
      label: <button onClick={logout}>Logout</button>,
      key: "1",
    },
  ];
  return (
    <>
      <div>
        <div
          className="flex-col rounded-md pt-2 pb-7 w-[400px] bg-[#2C2C2C] absolute right-[110px] top-[70px]"
          style={{
            visibility: visible ? "visible" : "hidden",
            boxShadow: "0px 44px 72px rgba(0, 0, 0, 0.02)",
          }}
        >
          <p className="text-white ml-7 mt-5">Notification</p>
          {notifications.map((item) => (
            <div className="flex align-middle w-full h-full border-green-500 border-b-[0.5px]">
              <IoMdNotifications className="text-blue-600 mr-3 mt-5 ml-3" />
              <h3 className="text-white pt-4 pb-4">
                You have a new Player. See{" "}
                <a className="text-orange-400" href="">
                  Player
                </a>
              </h3>
            </div>
          ))}
        </div>
      </div>
      <div className=" p-5 ml-4 mb-1 ">
        <div className=" flex flex-wrap justify-between items-center  ">
          <div className="flex items-center">
            <span
              className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white text-white"
              id="head"
            >
              <h1>{props.title}</h1>
            </span>
            {props.viewlist === true ? (
              <NavLink to={"/traningdrill/alldrills"}>
                <a
                  href=""
                  className="inline-flex font-lexend items-center py-2 px-3 ml-10 text-sm font-normal text-white bg-green-500 rounded-[4px] "
                >
                  View in list
                </a>
              </NavLink>
            ) : (
              <div></div>
            )}
            {props.Preview === true ? (
              <Link to={"/traningdrill"}>
                <a
                  href=""
                  className="inline-flex items-center py-2 px-3 ml-10 text-sm font-normal text-white bg-green-500 rounded-[4px] "
                >
                  Preview
                </a>
              </Link>
            ) : (
              <div></div>
            )}
          </div>

          <div className="w-full md:w-auto flex items-center gap-5">
            <div>
              {/* <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.8482 16.6079C19.2974 14.8517 20.2127 12.5991 20.2127 10.1175C20.2127 4.54332 15.6744 0 10.1063 0C4.53832 0 0 4.54332 0 10.1175C0 15.6916 4.53832 20.2349 10.1063 20.2349C12.5471 20.2349 14.8354 19.3568 16.5897 17.8678L24.4459 25.7327C24.6366 25.9236 24.8654 26 25.0942 26C25.3231 26 25.5519 25.9236 25.7426 25.7327C26.0858 25.3891 26.0858 24.7783 25.7426 24.4347L17.8482 16.6079ZM10.0682 18.4023C5.49175 18.4023 1.79245 14.699 1.79245 10.1175C1.79245 5.53598 5.49175 1.8326 10.0682 1.8326C14.6447 1.8326 18.344 5.53598 18.344 10.1175C18.344 14.699 14.6447 18.4023 10.0682 18.4023Z"
                  fill="white"
                />
              </svg> */}
            </div>
            <div>
              <svg
                width="24"
                height="28"
                viewBox="0 0 24 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  setVisible(!visible);
                }}
                className="cursor-pointer"
              >
                <path
                  d="M9.12572 24.8974C9.75862 25.6918 10.688 26.2059 11.7083 26.326C12.7285 26.446 13.7555 26.1621 14.5618 25.5371C14.8098 25.3522 15.033 25.1373 15.2259 24.8974M1.45124 15.9419V15.6643C1.49197 14.843 1.75519 14.0472 2.21377 13.3591C2.97708 12.5324 3.4996 11.5193 3.72653 10.4262C3.72653 9.58134 3.72653 8.72441 3.80032 7.87955C4.18158 3.81217 8.2033 1 12.1758 1H12.2742C16.2467 1 20.2685 3.81217 20.662 7.87955C20.7358 8.72441 20.662 9.58134 20.7235 10.4262C20.9535 11.5219 21.4755 12.5381 22.2363 13.3711C22.6983 14.0532 22.9619 14.8461 22.9988 15.6643V15.9298C23.0263 17.0333 22.6462 18.1092 21.9288 18.9593C20.9808 19.9532 19.6943 20.5715 18.3129 20.6972C14.2623 21.1318 10.1755 21.1318 6.1248 20.6972C4.74499 20.5661 3.46038 19.9487 2.50894 18.9593C1.8026 18.1086 1.42768 17.039 1.45124 15.9419Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <Link to = "/setting">
            <div className="flex items-center gap-2">
              <img
                className=" w-12 h-12 rounded-full border-green-500 border-4"
                src={user?.user?.image}
                alt="Bonnie image"
              />
              {/* <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              > */}
                <svg
                  width="12"
                  height="6"
                  viewBox="0 0 12 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                >
                  <path
                    d="M10.64 0.198787L6 4.29333L1.35999 0.198787C1.20864 0.0697912 1.00593 -0.0015867 0.795519 2.67701e-05C0.585108 0.00164024 0.383833 0.0761159 0.235044 0.207413C0.0862558 0.338711 0.00185875 0.516325 3.03363e-05 0.702C-0.00179808 0.887676 0.0790885 1.06656 0.225269 1.20012L5.43023 5.7932C5.50487 5.85934 5.5937 5.9117 5.69153 5.9472C5.78936 5.98271 5.89422 6.00065 6 5.99998C6.10574 6.00045 6.21055 5.98242 6.30834 5.94693C6.40614 5.91143 6.495 5.85918 6.56977 5.7932L11.7747 1.20012C11.9209 1.06656 12.0018 0.887676 12 0.702C11.9981 0.516325 11.9137 0.338711 11.765 0.207413C11.6162 0.0761159 11.4149 0.00164024 11.2045 2.67701e-05C10.9941 -0.0015867 10.7914 0.0697912 10.64 0.198787Z"
                    fill="white"
                  />
                </svg>
              {/* </Dropdown> */}
            </div>
            </Link>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
