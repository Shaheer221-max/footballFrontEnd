import React from "react";
import Header from "../Components/Header";
import "../styles/font.css"
import AddSubSkill from "../Components/AddSubSkill1";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../admin/Spinner";

export default function AddSkill() {
  const [skills, setSkills] = React.useState([]);
  const getData = async () => {
    const res = await axios.get(
        `${process.env.REACT_APP_API}/skill/GetAllSkills`
    );
    console.log(res.data.data.doc);
    setSkills(res.data.data.doc);
    };
    React.useEffect(() => {
    getData();
    }, []);
  return (
    <>
      <div className="flex-col w-full">
        <Header title={"Players Area"} />
        <div className="flex justify-between mx-9 mt-8 mb-[51px]">
          <h4 className="font-lexend self-center text-xl font-semibold whitespace-nowrap text-white   ">
            Skills Evaluations
          </h4>
         <Link to = "/playerarea/addskill">
         <a
            href=""
            className="text-white font-light bg-green-500 font-dm  focus:outline-none  rounded-[4px] text-base px-5 py-2 text-center inline-flex items-center"
            type="button"
          >
            Go to evaluation
          </a>
         </Link>
        </div>

        {/* Cards oF CAtogerys  */}
        <div className="m-8  grid lg:grid-cols-5 2xl:grid-cols-5  sm:gap-4 lg:gap-4 2xl:gap-y-8">
          {
          
            skills.length > 0 ? (
              skills.map((val, ind) => {
                return (
                  <AddSubSkill
                    key={ind}
                    data={val}
                  />
                );
              })
            ) : (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            )
          
          }
        </div>
      </div>
    </>
  );
}
