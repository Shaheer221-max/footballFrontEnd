import React, { useState } from "react";
import pfp from "../assets/pfp.png";
import pic1 from "../assets/pic1.png";
import pic2 from "../assets/player1.png";
import pic3 from "../assets/pic2.png"
import pic4 from "../assets/d.png"
import bg from "../assets/image.png"
import { Line } from "react-chartjs-2";
import "../styles/player.css"
import "../styles/font.css"
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
import { click } from "@testing-library/user-event/dist/click";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function PlayerProfileCenterBox(props) {
  const[edit,setEdit] = useState(false);

  function click(){
    setEdit(true);
  }


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

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const options = {
    responsive: true,
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
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: staticdata.map((val) => val.id),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <>
      {/* picture card and Graph */}
      <div className="flex my-4 gap-3 mx-7 justify-between">
        <div className="w-full background height-full  lg:max-w-[250px] 2xl:min-w-[350px]  rounded-lg border border-gray-400 " id="player">
          <div className="flex pl-3  pt-2">
            <div className="flex   ">
           
             <div className="card">
              <h5 className=" text-left text-base  font-bold  text-white ">
                JOHN 
              </h5>
              <span className="text-3xl font-black text-white">
                PETER
              </span>

              <span>

              <a
                href="/chat"
                className="flex  mt-2 justify-center font-lexend items-center py-1  px-5 text-sm font-medium text-white bg-green-500 rounded-[4px] "
              >
                Chat
              </a>
              </span>
              <span>

              <div className="flex mt-60">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.1488 14.5327V11.1545L24.7363 9.23969C24.7921 9.21689 24.8421 9.18188 24.8825 9.13723C24.923 9.09258 24.9529 9.03943 24.9701 8.98169C24.9875 8.92339 24.9914 8.86192 24.9817 8.80188C24.9719 8.74184 24.9487 8.68479 24.9137 8.635L20.0762 1.78189C20.0656 1.76219 20.0534 1.74333 20.0399 1.72546C19.4909 1.17474 18.8379 0.738619 18.1189 0.442425C17.3998 0.146232 16.6291 -0.00412584 15.8515 8.61016e-05H14.9082C14.8012 8.61016e-05 14.6987 0.042558 14.6231 0.118158C14.5475 0.193759 14.505 0.296295 14.505 0.40321V1.20946C14.505 1.74403 14.2927 2.25671 13.9147 2.63472C13.5367 3.01272 13.024 3.22508 12.4894 3.22508C11.9548 3.22508 11.4422 3.01272 11.0642 2.63472C10.6862 2.25671 10.4738 1.74403 10.4738 1.20946V0.40321C10.4738 0.296295 10.4313 0.193759 10.3557 0.118158C10.2801 0.042558 10.1776 8.61016e-05 10.0707 8.61016e-05H9.12737C8.3508 -0.00252901 7.58144 0.148983 6.86385 0.445844C6.14627 0.742705 5.49472 1.17901 4.94697 1.72949C4.93347 1.74736 4.92134 1.76622 4.91069 1.78593L0.0732009 8.63903C0.0382463 8.68882 0.0150116 8.74587 0.00523771 8.80591C-0.00453619 8.86595 -0.000595872 8.92742 0.0167634 8.98572C0.0339768 9.04346 0.0639159 9.09662 0.104379 9.14126C0.144841 9.18591 0.194799 9.22092 0.250575 9.24372L4.83006 11.1545V22.9782C4.83006 23.0851 4.87254 23.1876 4.94814 23.2632C5.02374 23.3388 5.12627 23.3813 5.23319 23.3813H15.9724C16.5601 23.9957 17.2885 24.4579 18.0948 24.728C18.901 24.9981 19.7608 25.068 20.6001 24.9316C21.4394 24.7952 22.2328 24.4567 22.9121 23.9452C23.5913 23.4337 24.1358 22.7646 24.4987 21.9957C24.8617 21.2268 25.032 20.3811 24.9952 19.5316C24.9583 18.6821 24.7153 17.8544 24.2871 17.1198C23.859 16.3852 23.2585 15.7658 22.5375 15.3151C21.8165 14.8644 20.9967 14.5959 20.1488 14.5327ZM23.9059 18.2334L21.8903 18.5236L20.1488 17.1409V15.339C20.9848 15.4162 21.7817 15.7293 22.4468 16.2417C23.1119 16.7541 23.6179 17.4447 23.9059 18.2334ZM20.6809 20.9625H18.8265L18.2017 19.088L19.7457 17.8504L21.2896 19.088L20.6809 20.9625ZM15.3113 19.7532C15.3122 19.5072 15.3338 19.2618 15.3758 19.0195L17.4277 19.3097L18.0848 21.285L16.7222 22.9782C16.2778 22.5666 15.9231 22.0677 15.6804 21.5128C15.4376 20.9579 15.3119 20.3589 15.3113 19.7532ZM19.3425 14.5126C18.787 14.5603 18.2427 14.6964 17.73 14.9157V14.307C17.7275 12.5868 18.2945 10.9141 19.3425 9.55009V14.5126ZM19.3425 15.3188V17.1208L17.6131 18.5438L15.5975 18.2535C15.8815 17.4629 16.3843 16.7691 17.0473 16.2531C17.7103 15.7371 18.5063 15.4201 19.3425 15.339V15.3188ZM20.1488 10.2797V3.28555L23.9623 8.69144L20.1488 10.2797ZM1.01651 8.69144L4.83006 3.28555V10.2797L1.01651 8.69144ZM5.63631 9.55009C6.68438 10.9141 7.25138 12.5868 7.24881 14.307V22.575H5.63631V9.55009ZM8.05506 22.575V14.307C8.05914 12.0703 7.19152 9.92002 5.63631 8.3125V2.18502C6.58039 1.29517 7.83003 0.80167 9.12737 0.806334H9.66755V1.20946C9.66755 1.95786 9.96486 2.67562 10.4941 3.20482C11.0233 3.73402 11.741 4.03133 12.4894 4.03133C13.2378 4.03133 13.9556 3.73402 14.4848 3.20482C15.014 2.67562 15.3113 1.95786 15.3113 1.20946V0.806334H15.8515C17.1488 0.80167 18.3984 1.29517 19.3425 2.18502V8.3125C17.7873 9.92002 16.9197 12.0703 16.9238 14.307V15.343C15.7552 16.0923 14.9316 17.2746 14.6338 18.6305C14.336 19.9864 14.5884 21.405 15.3355 22.575H8.05506ZM17.3592 23.4821L18.7298 21.7688H20.7454L22.116 23.4821C21.4052 23.9424 20.5764 24.1874 19.7295 24.1874C18.8826 24.1874 18.0538 23.9424 17.343 23.4821H17.3592ZM22.7691 22.9782L21.4065 21.285L22.0636 19.3097L24.1155 19.0195C24.2395 19.7393 24.1812 20.4786 23.946 21.1701C23.7108 21.8616 23.3062 22.4832 22.7691 22.9782Z" fill="#1DB954"/>
                </svg>
                <p className="text-[#7E7E7E] text-sm font-lexend mt-2 ml-2">Goalkeeper</p>

              </div>
              </span>
              </div>
              
              
             
            </div>
           
          </div>
           <div className="flex gap-1 ml-1 pr-10  items-center font-['lexend']">
                    <div className="flex-1 m-2 py-2 bg-gradient-to-b from-[#3e3e3e]/40 to-[#000000]/40 rounded-lg">
                      <h5 className="text-xs ml-2 font-medium leading-5 tracking-tight text-green-500">
                        Age
                      </h5>
                      <p className=" text-sm font-medium mt-2 pr-2 pb-2 ml-8 text-white ">
                        12
                      </p>
                    </div>
                    <div className="flex-1 m-2 py-2  bg-gradient-to-b from-[#3e3e3e]/40 to-[#000000]/40 rounded-lg">
                      <h5 className="text-xs ml-2 font-medium leading-5 tracking-tight text-green-500 ">
                        Avg
                      </h5>
                      <p className=" text-sm font-medium mt-2 ml-10 pr-2 pb-2 text-white ">
                        4
                      </p>
                    </div>
                    <div className="flex-1 m-2 py-2 bg-gradient-to-b from-[#3e3e3e]/40 to-[#000000]/40 rounded-lg ">
                      <h5 className="text-xs ml-2 font-medium leading-5 tracking-tight text-green-500 ">
                        Height
                      </h5>
                      <p className=" text-sm font-medium mt-2 ml-8 pr-2 pb-2 text-white ">
                        4ft
                      </p>
                    </div>
                    </div>

        </div>
        <div className="lg:w-[400px] 2xl:w-[800px] ">
          {/* tabs  */}
          <div className="flex justify-left text-sm font-normal font-lexend text-center text-gray-500 ">
            <ul className="flex flex-wrap -mt-[20px]">
              <li className="mr-2">
                <a
                  href="#"
                  className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:border-gray-300 hover:text-gray-300"
                >
                  Attendence
                </a>
              </li>
              <li className="mr-2">
                <a
                  href="#"
                  className="inline-block p-4  rounded-t-lg border-b-2  active text-blue-500 border-blue-500"
                  aria-current="page"
                >
                  Report
                </a>
              </li>
            </ul>
          </div>
          <div >
          <Line options={options} data={data} className="font-lexend" />
          </div>
          
        </div>
      </div>
      {/* Pictures */}
      <div className="flex gap-4 my-9 ml-7">
        <img
          className="sm:w-[250.5px] lg:h-[190.5px] 2xl:w-[369px] 2xl:h-[307px] "
          src={pic1}
        />
        <img
          className="lg:w-[184.5px] lg:h-[190.5px]  2xl:w-[259px] 2xl:h-[307px]"
          src={pic3}
        />
        <div className="grid grid-cols-3 gap-x-3 gap-y-2">
          <img
            className=" lg:w-[100.5px] lg:h-[90.5px]  lg:w-[156px] 2xl:h-[147px]"
            src={pic2}
          />
          <img
            className=" lg:w-[100.5px] lg:h-[90.5px]  lg:w-[156px] 2xl:h-[147px]"
            src={pic2}
          />
          <img
            className="lg:w-[100.5px] lg:h-[90.5px]  lg:w-[156px] 2xl:h-[147px]"
            src={pic2}
          />{" "}
          <img
            className="lg:w-[100.5px] lg:h-[90.5px]  lg:w-[156px] 2xl:h-[147px]"
            src={pic2}
          />
          <img
            className=" lg:w-[100.5px] lg:h-[90.5px]  lg:w-[156px] 2xl:h-[147px]"
            src={pic2}
          />
          <img
            className=" lg:w-[100.5px] lg:h-[90.5px] lg:w-[156px] 2xl:h-[147px]"
            src={pic2}
          />
        </div>
      </div>
      {/* Desciption */}
      <div className="mx-5 my-5">
        <h5 className=" text-xl pb-4 font-medium font-lexend  text-white">
          About me
        </h5>
        <span className=" text-lg justify-evenly font-normal font-lexend  text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          fermentum tristique mollis. Donec porta purus sed arcu feugiat
          sagittis. Sed tristique eget turpis a feugiat. amet, consectetur
          adipiscing elit. Suspendisse fermentum tristique
        </span>
      </div>
    </>
  );
}
