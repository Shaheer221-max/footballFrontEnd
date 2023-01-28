import React from "react";
import imgdrills from "../assets/drill2.png";
import "../styles/font.css"
import pfp from "../assets/pfp.png";
import axios from "axios";
export default function DrillCard(props) {
  const [drills, setDrills] = React.useState([]);

  // Get All Drills
  const getDrills = async() => {
    const response = await axios.get("https://football-backend-updated.herokuapp.com/drill/GetAllDrills");
    console.log(response.data.data.doc);
    setDrills(response.data.data.doc);
  }
  React.useEffect(() => {
    getDrills();
  }, []);
  return (
    <>
      {
        drills.map((drill) => {
          return (
            <div className="lg:max-w-[250px] xl:max-w-[300px] font-lexend 2xl:max-w-[350px] 2xl:mt-0 2xl:ml-0 rounded-lg my-9">
        {/* <img className="rounded-t-lg  " src={imgdrills} alt="" /> */}
        <iframe
              className="rounded-t-lg border-2"
              src={drill?.video}
            ></iframe>
        <div className="flex items-center mt-2">
          <img className=" w-10 h-10 rounded-full " src={pfp} alt="Bonnie image" />
          
          <div className="ml-2 font-lexend">
            <h5 className="text-md font-bold tracking-tight  text-white">
              {drill?.drilltitle}
            </h5>
            <p className="font-normal text-sm  text-gray-400">
              23 days Ago{" "}
            </p>
          </div>
          <svg
            className="ml-auto 2xl:mr-5"
            width="19"
            height="5"
            viewBox="0 0 19 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.201 5.68597e-08C8.91196 5.07687e-08 8.62575 0.0569305 8.35871 0.167541C8.09168 0.278152 7.84904 0.440276 7.64466 0.644658C7.44028 0.84904 7.27815 1.09168 7.16754 1.35871C7.05693 1.62575 7 1.91196 7 2.201C7 2.49004 7.05693 2.77625 7.16754 3.04329C7.27815 3.31032 7.44028 3.55296 7.64466 3.75734C7.84904 3.96172 8.09168 4.12385 8.35871 4.23446C8.62575 4.34507 8.91196 4.402 9.201 4.402C9.78474 4.40187 10.3445 4.16985 10.7572 3.75699C11.1699 3.34413 11.4016 2.78424 11.4015 2.2005C11.4014 1.61676 11.1693 1.05698 10.7565 0.644304C10.3436 0.231631 9.78374 -0.000132534 9.2 5.68597e-08H9.201ZM2.201 5.68597e-08C1.91196 5.07687e-08 1.62575 0.0569305 1.35871 0.167541C1.09168 0.278152 0.84904 0.440276 0.644658 0.644658C0.440276 0.84904 0.278152 1.09168 0.167541 1.35871C0.0569305 1.62575 0 1.91196 0 2.201C0 2.49004 0.0569305 2.77625 0.167541 3.04329C0.278152 3.31032 0.440276 3.55296 0.644658 3.75734C0.84904 3.96172 1.09168 4.12385 1.35871 4.23446C1.62575 4.34507 1.91196 4.402 2.201 4.402C2.78474 4.40187 3.34452 4.16985 3.7572 3.75699C4.16987 3.34413 4.40163 2.78424 4.4015 2.2005C4.40137 1.61676 4.16935 1.05698 3.75649 0.644304C3.34363 0.231631 2.78374 -0.000132534 2.2 5.68597e-08H2.201ZM16.201 5.68597e-08C15.912 5.07687e-08 15.6258 0.0569305 15.3587 0.167541C15.0917 0.278152 14.849 0.440276 14.6447 0.644658C14.4403 0.84904 14.2782 1.09168 14.1675 1.35871C14.0569 1.62575 14 1.91196 14 2.201C14 2.49004 14.0569 2.77625 14.1675 3.04329C14.2782 3.31032 14.4403 3.55296 14.6447 3.75734C14.849 3.96172 15.0917 4.12385 15.3587 4.23446C15.6258 4.34507 15.912 4.402 16.201 4.402C16.7847 4.40187 17.3445 4.16985 17.7572 3.75699C18.1699 3.34413 18.4016 2.78424 18.4015 2.2005C18.4014 1.61676 18.1693 1.05698 17.7565 0.644304C17.3436 0.231631 16.7837 -0.000132534 16.2 5.68597e-08H16.201Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
          )
        })
      }
    </>
  );
}
