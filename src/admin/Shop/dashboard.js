import React from "react";
import DashboardSidebar from "./dashboardRightSidebar";
import Header from "../../Components/Header";
import { Line } from "react-chartjs-2";
import "../../styles/font.css"
import axios from "axios";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
 

export default function ShopDashboard() {
const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const yLabels = {
    1: '1k',5: '5k',
    10: '10k',15: '15k',
    20: '20k',25: '25k',
};

  const data = {
    labels,
    yLabels,
      
    
    datasets: [
      {
        
        data: [2,6,4,1],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  

  const options = {
    responsive: true,
    scales: {
      yAxis : [{
        ticks : {
          callback : function(value, index, values){
            return yLabels[value]
          }
        }
      }]
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  // Get All Orders
  const [orders, setOrders] = React.useState([]);
  const [item, setItems] = React.useState([]);
  const [stock, setStock] = React.useState(0);

  const getOrders = async () => {
    try {
      const response = await axios.get("https://football-backend-updated.herokuapp.com/AdminOrderNotification/getNotification");
      console.log(response.data.data)
      setOrders(response.data.data);
    } catch (error) {
    }
  };

  const getData = async () => {
    await axios
      .get("https://football-backend-updated.herokuapp.com/item/GetAllItems")
      .then((res) => {
        console.log(res.data.data.doc);
        setItems(res.data.data.doc);
        setStock(res.data.data.doc.filter((item) => item.quantity < 0).length);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  React.useEffect(() => {
    getOrders();
    getData();
  }, []);
  

  return (
    <>
      <div className="flex-col w-full">
        {/* Page Header */}
        <Header title={"Dashboard"}  />

        <div className="flex  divide-x xl:w-full ">
          {/* Upload Of user  */}
          <div className="w-full pr-12">
            <h3 className="text-xl font-medium text-white font-lexend whitespace-nowrap  ml-9 mt-[32px]"> Analytics</h3>
            <div className="flex">

{/* Orders */}
                <div className="flex-1 flex rounded-[4px] m-2 bg-[#212121] pr-30 mt-10 ml-9 pb-5">
                    <div className="m-3 ">
                    <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20.5" cy="20.5" r="20.5" fill="#0C0E14" fill-opacity="0.4"/>
                      <path d="M27.3515 20.1277L26.7546 13.5936C26.7278 13.2995 26.4826 13.0744 26.1892 13.0744H22.7217V11.7469C22.7217 9.68081 21.0514 8 18.9983 8C16.9452 8 15.2749 9.68081 15.2749 11.7469V13.0744H11.8074C11.5139 13.0744 11.2687 13.2994 11.2419 13.5935L10.0082 27.1001C9.96052 27.6228 10.1211 28.104 10.4725 28.4916C10.8241 28.8793 11.2855 29.0843 11.807 29.0843H20.9084C21.9547 30.83 23.8575 32 26.0269 32C29.3205 32 32 29.3036 32 25.9892C32 23.1329 30.0097 20.7357 27.3515 20.1277ZM16.4106 11.7469C16.4106 10.311 17.5714 9.14286 18.9983 9.14286C20.4252 9.14286 21.586 10.311 21.586 11.7469V13.0744H16.4106V11.7469ZM11.807 27.9414C11.6051 27.9414 11.4477 27.8715 11.3116 27.7213C11.1755 27.5712 11.1207 27.407 11.1392 27.2047L12.3254 14.2173H15.2749V15.2591C15.2749 15.5747 15.5292 15.8306 15.8428 15.8306C16.1564 15.8306 16.4106 15.5747 16.4106 15.2591V14.2173H21.586V15.2591C21.586 15.5747 21.8403 15.8306 22.1539 15.8306C22.4675 15.8306 22.7217 15.5747 22.7217 15.2591V14.2173H25.6712L26.1977 19.9811C26.1409 19.9795 26.0841 19.9785 26.0269 19.9785C22.7334 19.9785 20.0538 22.675 20.0538 25.9893C20.0538 26.6723 20.1679 27.329 20.3775 27.9414H11.807ZM26.0269 30.8571C23.3595 30.8571 21.1895 28.6734 21.1895 25.9892C21.1895 23.305 23.3595 21.1213 26.0269 21.1213C28.6942 21.1213 30.8643 23.305 30.8643 25.9892C30.8643 28.6734 28.6942 30.8571 26.0269 30.8571ZM28.6955 24.1972C28.9123 24.4251 28.9045 24.7869 28.678 25.0051L25.7784 27.7989C25.6687 27.9045 25.5272 27.9575 25.3857 27.9575C25.248 27.9575 25.1103 27.9074 25.0016 27.807L23.3845 26.3125C23.1535 26.099 23.1382 25.7375 23.3503 25.5051C23.5624 25.2726 23.9216 25.2572 24.1526 25.4707L25.3776 26.6028L27.8926 24.1796C28.1191 23.9614 28.4785 23.9692 28.6955 24.1972Z" fill="url(#paint0_linear_0_1)"/>
                      <defs>
                      <linearGradient id="paint0_linear_0_1" x1="12.2936" y1="30.327" x2="28.0295" y2="14.6897" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#FCC60E"/>
                      <stop offset="1" stop-color="#E92E29"/>
                      </linearGradient>
                      </defs>
                      </svg>


                    </div>
                <div>
                <h5 className="m-2  text-sm text-white mt-10 text-lexend">Orders</h5>
                <h1 className="m-2  text-2xl text-white font-bold text-lexend mt-3">{orders.length}</h1>
                </div>
                </div>
{/* Sales */}
                <div className="flex-1 flex rounded-[4px] m-2 bg-[#212121] pr-30 mt-10 ml-3 pb-5">
                    <div className="m-3 ">
                    <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20.5" cy="20.5" r="20.5" fill="#0C0E14" fill-opacity="0.4"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M30.6 15.2C30.7051 15.2788 30.7936 15.3775 30.8605 15.4905C30.9274 15.6035 30.9714 15.7286 30.99 15.8586C31.0085 15.9886 31.0013 16.121 30.9687 16.2482C30.9361 16.3754 30.8788 16.4949 30.8 16.6L24.8 24.6C24.6466 24.8046 24.4207 24.9426 24.1687 24.9858C23.9167 25.0289 23.6577 24.9739 23.445 24.832L18.232 21.357L12.8 28.6C12.7212 28.7051 12.6225 28.7936 12.5095 28.8605C12.3965 28.9274 12.2714 28.9714 12.1414 28.99C12.0114 29.0085 11.879 29.0013 11.7518 28.9687C11.6246 28.9361 11.5051 28.8788 11.4 28.8C11.2949 28.7212 11.2064 28.6225 11.1395 28.5095C11.0726 28.3965 11.0286 28.2714 11.0101 28.1414C10.9915 28.0114 10.9987 27.879 11.0313 27.7518C11.0639 27.6246 11.1212 27.5051 11.2 27.4L17.2 19.4C17.3534 19.1954 17.5793 19.0574 17.8313 19.0142C18.0833 18.9711 18.3423 19.0261 18.555 19.168L23.768 22.643L29.2 15.4C29.3591 15.1878 29.596 15.0476 29.8586 15.0101C30.1211 14.9725 30.3878 15.0409 30.6 15.2Z" fill="white"/>
                    </svg>

                    </div>
                <div>
                <h5 className="m-2  text-sm text-white mt-10 text-lexend">Sales</h5>
                <h1 className="m-2  text-2xl text-white font-bold text-lexend mt-3">$0</h1>
                </div>
                <div className="text-green-500 mt-20">
                    {/* +3% */}
                </div>
                </div>
{/* Profit */}
                <div className="flex-1 flex rounded-[4px] m-2 bg-[#212121] pr-30 mt-10 ml-3 pb-5">
                    <div className="m-3 ">
                    <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20.5" cy="20.5" r="20.5" fill="#0C0E14" fill-opacity="0.4"/>
                      <g clip-path="url(#clip0_0_1)">
                      <path d="M31.2237 10.1644C31.1508 9.98875 31.0112 9.84919 30.8356 9.77625C30.7492 9.73942 30.6564 9.71989 30.5625 9.71875H27.6875C27.4969 9.71875 27.3141 9.79448 27.1793 9.92927C27.0445 10.0641 26.9688 10.2469 26.9688 10.4375C26.9688 10.6281 27.0445 10.8109 27.1793 10.9457C27.3141 11.0805 27.4969 11.1562 27.6875 11.1562H28.8303L27.8528 12.1338L24.6256 16.0078L20.8234 14.1103C20.6878 14.0421 20.5342 14.0186 20.3844 14.0432C20.2346 14.0677 20.0964 14.139 19.9897 14.2469L16.1156 18.1569L12.9603 16.2881C12.8461 16.2167 12.7141 16.1789 12.5794 16.1789C12.4447 16.1789 12.3127 16.2167 12.1984 16.2881L10.0422 17.7256C9.90272 17.838 9.81022 17.9983 9.78279 18.1753C9.75537 18.3523 9.79499 18.5331 9.89392 18.6824C9.99284 18.8317 10.1439 18.9387 10.3176 18.9824C10.4913 19.0261 10.675 19.0034 10.8328 18.9187L12.5938 17.7544L15.8425 19.6806C15.9542 19.7446 16.0803 19.7792 16.2091 19.7812C16.3042 19.7809 16.3982 19.7616 16.4858 19.7246C16.5734 19.6876 16.6528 19.6335 16.7194 19.5656L20.6438 15.6269L24.4891 17.5459C24.634 17.6196 24.7996 17.6419 24.9589 17.6093C25.1181 17.5766 25.2616 17.491 25.3659 17.3663L28.9166 13.1041L29.8438 12.1697V13.3125C29.8438 13.5031 29.9195 13.6859 30.0543 13.8207C30.1891 13.9555 30.3719 14.0312 30.5625 14.0312C30.7531 14.0312 30.9359 13.9555 31.0707 13.8207C31.2055 13.6859 31.2812 13.5031 31.2812 13.3125V10.4375C31.2801 10.3436 31.2606 10.2508 31.2237 10.1644ZM14.75 24.0938H10.4375C10.2469 24.0938 10.0641 24.1695 9.92927 24.3043C9.79448 24.4391 9.71875 24.6219 9.71875 24.8125V26.9688H15.4688V24.8125C15.4688 24.6219 15.393 24.4391 15.2582 24.3043C15.1234 24.1695 14.9406 24.0938 14.75 24.0938ZM9.71875 30.5625C9.71875 30.7531 9.79448 30.9359 9.92927 31.0707C10.0641 31.2055 10.2469 31.2812 10.4375 31.2812H14.75C14.9406 31.2812 15.1234 31.2055 15.2582 31.0707C15.393 30.9359 15.4688 30.7531 15.4688 30.5625V28.4062H9.71875V30.5625ZM22.6562 21.2188H18.3438C18.1531 21.2188 17.9703 21.2945 17.8355 21.4293C17.7007 21.5641 17.625 21.7469 17.625 21.9375V24.0938H23.375V21.9375C23.375 21.7469 23.2993 21.5641 23.1645 21.4293C23.0297 21.2945 22.8469 21.2188 22.6562 21.2188ZM17.625 30.5625C17.625 30.7531 17.7007 30.9359 17.8355 31.0707C17.9703 31.2055 18.1531 31.2812 18.3438 31.2812H22.6562C22.8469 31.2812 23.0297 31.2055 23.1645 31.0707C23.2993 30.9359 23.375 30.7531 23.375 30.5625V28.4062H17.625V30.5625Z" fill="#1294F2"/>
                      <path d="M23.375 25.5312H17.625V26.9688H23.375V25.5312Z" fill="#1294F2"/>
                      <path d="M31.2812 25.5312H25.5312V26.9688H31.2812V25.5312Z" fill="#1294F2"/>
                      <path d="M31.2812 22.6562H25.5312V24.0938H31.2812V22.6562Z" fill="#1294F2"/>
                      <path d="M25.5312 30.5625C25.5312 30.7531 25.607 30.9359 25.7418 31.0707C25.8766 31.2055 26.0594 31.2812 26.25 31.2812H30.5625C30.7531 31.2812 30.9359 31.2055 31.0707 31.0707C31.2055 30.9359 31.2812 30.7531 31.2812 30.5625V28.4062H25.5312V30.5625ZM30.5625 18.3438H26.25C26.0594 18.3438 25.8766 18.4195 25.7418 18.5543C25.607 18.6891 25.5312 18.8719 25.5312 19.0625V21.2188H31.2812V19.0625C31.2812 18.8719 31.2055 18.6891 31.0707 18.5543C30.9359 18.4195 30.7531 18.3438 30.5625 18.3438Z" fill="#1294F2"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_0_1">
                      <rect width="23" height="23" fill="white" transform="translate(9 9)"/>
                      </clipPath>
                      </defs>
                      </svg>


                    </div>
                <div>
                <h5 className="m-2  text-sm text-white mt-10 text-lexend">Profit</h5>
                <h1 className="m-2  text-2xl text-white font-bold text-lexend mt-3">$0</h1>
                </div>
                <div className="text-green-500 mt-20">
                    {/* +3% */}
                </div>
                </div>
{/* total products */}
                <div className="flex-1 flex rounded-[4px] m-2 bg-[#212121] pr-30 mt-10 ml-3 pb-5">
                    <div className="m-3 ">
                    <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20.5" cy="20.5" r="20.5" fill="#0C0E14" fill-opacity="0.4"/>
                    <path d="M24.0553 7.29504C24.3621 6.99878 24.3621 6.51845 24.0553 6.22219C23.7485 5.92594 23.251 5.92594 22.9442 6.22219L21.1427 7.96143L19.3414 6.22219C19.0346 5.92594 18.5371 5.92594 18.2303 6.22219C17.9234 6.51845 17.9234 6.99878 18.2303 7.29504L20.0316 9.03427L18.2301 10.7736C17.9233 11.0698 17.9233 11.5502 18.2301 11.8464C18.537 12.1427 19.0344 12.1427 19.3413 11.8464L21.1427 10.1071L22.9442 11.8464C23.251 12.1427 23.7486 12.1427 24.0554 11.8464C24.3622 11.5502 24.3622 11.0698 24.0554 10.7736L22.2539 9.03427L24.0553 7.29504ZM28.9595 25.8634C29.0967 26.2608 28.8742 26.6904 28.4625 26.823L24.9268 27.9609C24.5152 28.0933 24.0702 27.8786 23.933 27.4811C23.7958 27.0836 24.0182 26.654 24.4299 26.5215L27.9656 25.3836C28.3773 25.2511 28.8222 25.4659 28.9595 25.8634Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.53183 22.0724L10.1111 22.9484V29.6413C10.1111 29.9791 10.3212 30.2797 10.6345 30.3902L20.7393 33.954C20.8939 34.0102 21.0669 34.017 21.2345 33.9629L21.2458 33.9591L21.2577 33.9551L31.3655 30.3902C31.6788 30.2797 31.8889 29.9791 31.8889 29.6413V22.9484L34.4681 22.0724C34.7094 21.9905 34.8961 21.7936 34.9682 21.5451C35.0402 21.2966 34.9884 21.0279 34.8296 20.8256L31.7184 16.8634C31.624 16.7432 31.5002 16.6567 31.3638 16.6089L21.2544 13.0436C21.0896 12.9855 20.9104 12.9855 20.7456 13.0436L10.6362 16.609C10.4998 16.6567 10.3759 16.7432 10.2815 16.8634L7.17044 20.8256C7.01158 21.0279 6.95983 21.2966 7.03186 21.5451C7.10388 21.7936 7.29058 21.9905 7.53183 22.0724ZM18.9149 25.3411L20.2222 23.4384V32.0944L11.6667 29.077V23.4767L18.0318 25.6385C18.3583 25.7493 18.7176 25.6284 18.9149 25.3411ZM13.2666 17.3584L21 20.0859L28.7333 17.3584L21 14.631L13.2666 17.3584ZM23.085 25.3411L21.7778 23.4384V32.0944L30.3333 29.077V23.4767L23.9681 25.6385C23.6416 25.7493 23.2824 25.6284 23.085 25.3411ZM11.1532 18.2903L9.08193 20.9282L13.3685 22.384L17.9733 23.9479L19.772 21.3299L19.667 21.2929L11.1532 18.2903ZM32.918 20.9282L30.8467 18.2903L22.228 21.3299L24.0267 23.9479L32.918 20.9282Z" fill="white"/>
                    </svg>



                    </div>
                <div>
                <h5 className="m-2  text-sm text-white mt-10 text-lexend">Total Products</h5>
                <h1 className="m-2  text-2xl text-white font-bold text-lexend mt-3">{item.length}</h1>
                </div>
                </div>
{/* Out of stock */}
                <div className="flex-1 flex rounded-[4px] m-2 bg-[#212121] pr-30 mt-10 ml-3 pb-5">
                    <div className="m-3 ">
                    <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20.5" cy="20.5" r="20.5" fill="#0C0E14" fill-opacity="0.4"/>
                      <path d="M24.0553 7.29504C24.3621 6.99878 24.3621 6.51845 24.0553 6.22219C23.7485 5.92594 23.251 5.92594 22.9442 6.22219L21.1427 7.96143L19.3414 6.22219C19.0346 5.92594 18.5371 5.92594 18.2303 6.22219C17.9234 6.51845 17.9234 6.99878 18.2303 7.29504L20.0316 9.03427L18.2301 10.7736C17.9233 11.0698 17.9233 11.5502 18.2301 11.8464C18.537 12.1427 19.0344 12.1427 19.3413 11.8464L21.1427 10.1071L22.9442 11.8464C23.251 12.1427 23.7486 12.1427 24.0554 11.8464C24.3622 11.5502 24.3622 11.0698 24.0554 10.7736L22.2539 9.03427L24.0553 7.29504ZM28.9595 25.8634C29.0967 26.2608 28.8742 26.6904 28.4625 26.823L24.9268 27.9609C24.5152 28.0933 24.0702 27.8786 23.933 27.4811C23.7958 27.0836 24.0182 26.654 24.4299 26.5215L27.9656 25.3836C28.3773 25.2511 28.8222 25.4659 28.9595 25.8634Z" fill="white"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M7.53183 22.0724L10.1111 22.9484V29.6413C10.1111 29.9791 10.3212 30.2797 10.6345 30.3902L20.7393 33.954C20.8939 34.0102 21.0669 34.017 21.2345 33.9629L21.2458 33.9591L21.2577 33.9551L31.3655 30.3902C31.6788 30.2797 31.8889 29.9791 31.8889 29.6413V22.9484L34.4681 22.0724C34.7094 21.9905 34.8961 21.7936 34.9682 21.5451C35.0402 21.2966 34.9884 21.0279 34.8296 20.8256L31.7184 16.8634C31.624 16.7432 31.5002 16.6567 31.3638 16.6089L21.2544 13.0436C21.0896 12.9855 20.9104 12.9855 20.7456 13.0436L10.6362 16.609C10.4998 16.6567 10.3759 16.7432 10.2815 16.8634L7.17044 20.8256C7.01158 21.0279 6.95983 21.2966 7.03186 21.5451C7.10388 21.7936 7.29058 21.9905 7.53183 22.0724ZM18.9149 25.3411L20.2222 23.4384V32.0944L11.6667 29.077V23.4767L18.0318 25.6385C18.3583 25.7493 18.7176 25.6284 18.9149 25.3411ZM13.2666 17.3584L21 20.0859L28.7333 17.3584L21 14.631L13.2666 17.3584ZM23.085 25.3411L21.7778 23.4384V32.0944L30.3333 29.077V23.4767L23.9681 25.6385C23.6416 25.7493 23.2824 25.6284 23.085 25.3411ZM11.1532 18.2903L9.08193 20.9282L13.3685 22.384L17.9733 23.9479L19.772 21.3299L19.667 21.2929L11.1532 18.2903ZM32.918 20.9282L30.8467 18.2903L22.228 21.3299L24.0267 23.9479L32.918 20.9282Z" fill="white"/>
                      </svg>


                    </div>
                <div>
                <h5 className="m-2  text-sm text-white mt-10 text-lexend">Out of Stock</h5>
                <h1 className="m-2  text-2xl text-white font-bold text-lexend mt-3">{stock}</h1>
                </div>
                </div>
            </div>

            <div className=" mr-9 ml-9 ">
{/* graph  */}
          <div className="flex justify-left text-sm font-normal font-lexend text-center text-gray-500 ">
          <h1 className="m-2  text-2xl text-white mt-3 text-lexend mt-3">Revenue</h1>
          </div>
          <Line options={options} data={data} className="font-lexend" />
        </div>

{/* Latest Orders  */}
      <div className="ml-6 p-3">
      <h3 className="m-2  text-2xl text-white mt-3 text-lexend mt-6">Latest Orders</h3>
      <table className="font-dm w-full text-md text-left text-white ">
            <thead className=" font-dm text-base font-normal text-[#fffff]/0.81 uppercase  border-b">
              <tr className="text-center ">
                <th scope="col" className="py-3 pl-3">
                  Date
                </th>
                <th scope="col" className="py-3 pl-2">
                  Billing Name
                </th>
                <th scope="col" className="py-3 pl-2">
                  Amount
                </th>
                <th scope="col" className="py-3 pl-2">
                  Item
                </th>
                <th scope="col" className="py-3 pl-2">
                  Qty
                </th>
                <th scope="col" className="py-3 pl-2">
                  Status
                </th>
                
              </tr>
            </thead>
            <tbody>
             
                {
                  orders.map((val) => (
                    <tr className="font-dm text-center border-b">
                  <th
                    scope="row"
                    className="py-4 px-3 font-medium whitespace-nowrap text-white"
                  >
                    {val.refOfCustomerNotification.createdAt.split("T")[0]}
                  </th>
                  <td className="py-4 pl-4 ">
                    <div className="flex gap-2 items-center">
                      
                    {val.refOfCustomerNotification.refOfCustomer.name}
                    </div>
                  </td>
                  <td className="py-4 ">£{val?.refOfCustomerNotification?.price}</td>
                  <td className="py-4 ">{val?.refOfCustomerNotification?.refOfProduct?.productname}</td>
                  <td className="py-4 ">{val?.refOfCustomerNotification?.quantity}</td>
                  <td className="py-4 ">
                  <button
                className="font-dm text-white bg-green-500 m-4 text-sm  w-40  justify-center focus:outline-none font-normal rounded-[4px]  px-4 py-2 text-center inline-flex items-center"
                type="button"
            >
                    {val?.refOfCustomerNotification?.status}
                </button>
                  </td>
                </tr>
                  ))
                }
            </tbody>
          </table>
      </div>
      {/* Side bar */}
            
            
          </div>

          {/*skill cards */}
          <div className=" xl:w-4/12 border-[#7E7E7E]">
            <div className="ml-10 mr-10  2xl:grid 2xl:grid-cols-1 ">
                {/* return <DashboardSidebar />; */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
