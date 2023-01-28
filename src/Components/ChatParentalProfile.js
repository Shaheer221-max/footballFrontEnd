import React from "react";
import "../styles/font.css"
export default function ChatParentalProfile(props) {
  return (
    <>
    {props.to?(<>
      <div className=" font-lexend ml-6  mt-8">
        <h4 className="self-center font-lexend text-xl font-medium whitespace-nowrap text-white  ">
          Parent Profile
        </h4>
        <div className="w-full min-w-sm bg-transparent mt-8   ">
          <div className="flex justify-center px-4 pt-4">
            <div className="flex flex-col items-center pb-10">
              {props.img.toString() !== "false"?(<>
                <img
                className="mb-3 w-20 h-20 rounded-full shadow-lg"
                src={props.img}
                alt="Bonnie image"
              />
              </>):(<div className="mb-3 w-20 h-20 rounded-full shadow-lg bg-white"></div>)}
              
              <h5 className="mb-1 text-lg font-lexend font-normal text-white ">{props.RecieverName}</h5>
              <span className="text-sm font-lexend font-normal text-[#7e7e7e]">{props.to}</span>
              <a
                href="/chat"
                className="inline-flex font-lexend items-center py-2 px-7 mt-5 text-sm font-medium text-white bg-green-500 rounded-[4px] "
              >
                Chat
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className=" font-lexend ml-6 mt-6 space-y-2">
        <h4 className="self-center text-xl font-lexend font-normal whitespace-nowrap text-white  ">
          Profile Info
        </h4>
        {/* Email */}
        <div className="flex gap-4 items-center">
          <svg
            width="19"
            height="14"
            viewBox="0 0 19 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1 0H1.9C0.855 0 0.00949999 0.7875 0.00949999 1.75L0 12.25C0 13.2125 0.855 14 1.9 14H17.1C18.145 14 19 13.2125 19 12.25V1.75C19 0.7875 18.145 0 17.1 0ZM16.72 3.71875L10.0035 7.58625C9.6995 7.76125 9.3005 7.76125 8.9965 7.58625L2.28 3.71875C2.0425 3.57875 1.9 3.3425 1.9 3.08875C1.9 2.5025 2.5935 2.1525 3.135 2.45875L9.5 6.125L15.865 2.45875C16.4065 2.1525 17.1 2.5025 17.1 3.08875C17.1 3.3425 16.9575 3.57875 16.72 3.71875Z"
              fill="#1DB954"
            />
          </svg>
          <div>
            {" "}
            <h4 className=" text-base font-normal font-lexend whitespace-nowrap text-white  ">
              Email
            </h4>
          </div>
        </div>
        <p className="font-normal mt-1 text-sm font-lexend  text-gray-400 ">
        {props.to}
        </p>
        {/* Phone */}
        <div className="flex pt-5 gap-4 items-center">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.5 21C16.2991 21 21 16.2991 21 10.5C21 4.70085 16.2991 0 10.5 0C4.70085 0 0 4.70085 0 10.5C0 16.2991 4.70085 21 10.5 21ZM13.8936 11.929L15.5148 13.5545C15.8371 13.8789 15.8266 14.4154 15.4938 14.7514L15.0297 15.2051L15.0192 15.1956C14.6303 15.4942 14.1683 15.6827 13.6815 15.7416C13.5765 15.7531 11.1247 15.9831 8.08185 12.9339C5.88 10.7278 5.06835 9.1014 5.2836 7.3227C5.30775 7.1001 5.36235 6.8796 5.4516 6.64755C5.5461 6.40395 5.6742 6.17715 5.8275 5.98185L5.8149 5.96925L6.27165 5.5083C6.6066 5.1723 7.1421 5.16285 7.4634 5.48625L9.08565 7.11165C9.408 7.43505 9.39855 7.97055 9.06465 8.30655L8.79375 8.5764L8.24565 9.12555C8.27548 9.1778 8.30488 9.23031 8.33385 9.28305L8.3349 9.2862C8.62155 9.80385 9.01425 10.5115 9.75765 11.256C10.501 12.0015 11.2066 12.3942 11.7232 12.6808L11.8839 12.7711L12.7008 11.9521C13.0357 11.6161 13.5702 11.6067 13.8936 11.9301V11.929Z"
              fill="#1DB954"
            />
          </svg>

          <div>
            {" "}
            <h4 className="self-center text-base font-normal font-lexend whitespace-nowrap text-white  ">
              Phone
            </h4>
          </div>
        </div>
        <p className="font-normal mt-1 text-sm font-lexend  text-gray-400 my-2">
          {props.phone}
        </p>
        {/* Position */}
        <div className="flex mt-5 pt-5 gap-4 items-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5745 7.02111L16.5957 4.34026C16.3404 3.95728 16.0851 3.5743 15.8298 3.31898C15.7021 3.44664 15.5745 3.44664 15.4468 3.70196L14.2979 6.89345L12.1277 7.78707L9.57447 5.87217L9.44681 3.06366L12.1277 1.14877C12.2553 1.02111 12.383 0.893451 12.383 0.765791C12 0.638132 11.4894 0.510472 11.1064 0.382812L8.68085 2.04239L6.51064 0.382812C6 0.510472 5.61702 0.638131 5.23404 0.893451C5.23404 1.02111 5.3617 1.14877 5.48936 1.14877L8.17021 3.06366L8.29787 5.87217L5.87234 7.53175L3.31915 6.76579L2.17021 3.82962C2.17021 3.70196 2.04255 3.5743 1.91489 3.44664L1.14894 4.59558L2.17021 7.27643L0 9.06366C0 9.5743 -1.23648e-07 9.95728 0.127659 10.4679C0.255319 10.4679 0.382979 10.4679 0.510638 10.3403L3.19149 8.17005L5.48936 8.80834L6.38298 11.6169L4.85106 13.5317L1.78723 13.6594C1.65957 13.6594 1.65957 13.7871 1.53191 13.7871C1.78723 14.2977 2.17021 14.6807 2.55319 15.0637L4.97872 14.936L5.87234 17.3615C6.25532 17.4892 6.6383 17.6169 7.14894 17.7445C7.14894 17.6169 7.2766 17.3615 7.14894 17.2339L6.12766 14.17L7.53191 12.5105H10.4681L11.4894 14.2977L10.2128 17.2339C10.0851 17.4892 10.2128 17.6169 10.3404 17.8722C10.7234 17.8722 11.1064 17.7445 11.4894 17.6169L12.6383 14.8083L15.5745 15.0637C15.8298 14.8083 16.0851 14.553 16.2128 14.17C16.0851 14.0424 15.9574 13.9147 15.7021 13.9147L12.383 13.5317L11.4894 11.7445L12.5106 8.80834L14.8085 7.91473L17.3617 9.95728C17.4894 10.0849 17.617 10.0849 17.7447 10.0849H17.8723C17.8723 9.70196 18 9.31898 18 9.06366V8.936L15.5745 7.02111ZM10.2128 11.1062H7.53191L6.6383 8.55303L8.93617 6.89345L11.1064 8.55303L10.2128 11.1062Z"
              fill="#1DB954"
            />
          </svg>

          <div>
            {" "}
            <h4 className="self-center text-base font-normal font-lexend whitespace-nowrap text-white  ">
              Position
            </h4>
          </div>
        </div>
        <p className="font-normal mt-1 text-sm font-lexend text-gray-400 my-2">
          {props.position}
        </p>
        
      </div>
    </>):(<></>)}
      
    </>
  );
}
