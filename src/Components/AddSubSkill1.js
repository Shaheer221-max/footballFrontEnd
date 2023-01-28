import React, { useState } from "react";
import Bg from "../assets/addskillscardbg.png";
import axios from "axios";
import { NavLink } from "react-router-dom";
export default function AddSubSkill(props) {
  console.log(props);
  const [opensubcat, setopensubcat] = useState(false);
  const [openAddsubcatmodal, setopenAddsubcatmodal] = useState(false);
  const [openUpdatesubcatmodal, setopenUpdatesubcatmodal] = useState(false);
  const [openUpdateskillmodal, setopenUpdateskillmodal] = useState(false);
  const [subskillname, setsubskillname] = useState("");
  const [subskill, setsubskill] = useState([]);
  const [filterSubskill, setFilterSubskill] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [subcatID, setsubcat] = useState("");
  const [skill, setSkill] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [button, setButton] = useState(false);

  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    setImage(event.target.files[0].name);
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("upload_preset", "player_image");
    //data.append("cloud_name","dyapmvalo");
    axios
      .post("https://api.cloudinary.com/v1_1/dyapmvalo/image/upload", data)
      .then((res) => {
        console.log(res.data.url);
        setUrl(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
    //img(event.target.files[0]);
  };

  const addSubSkill = async (e) => {
    e.preventDefault();
    setRefresh(true);
    const res = await axios.post(
      `https://football-backend-updated.herokuapp.com/skill/AddSubSkill/${props.data._id}`,
      {
        subskillname,
      }
    );
    setRefresh(false);
    setopenAddsubcatmodal(false);
    console.log(res.data);
  };

  // Update Sub Skill
  const updateSubSkill = async (e) => {
    console.log(subcatID);
    e.preventDefault();
    setRefresh(true);
    const res = await axios.put(
      `https://football-backend-updated.herokuapp.com/skill/UpdateSubSkill/${subcatID}`,
      {
        subskillname,
      }
    );
    setRefresh(false);
    setopenUpdatesubcatmodal(false);
    console.log(res.data);
  };

  const getData = async () => {
    const res = await axios.get(`https://football-backend-updated.herokuapp.com/skill/GetAllSubSkills`);
    console.log(res.data.data);
    setsubskill(res.data.data);
  };

  const subCat = (val) => {
    setopensubcat(val);
    setFilterSubskill(
      subskill.filter((item) => item.refOfSkill === props.data._id)
    );
  };

  // Delete Sub Skill
  const deleteSubSkill = async (s_id, id) => {
    console.log(s_id, id);
    setRefresh(true);
    const res = await axios.post(`https://football-backend-updated.herokuapp.com/skill/RemoveSubSkill/${id}&${s_id}`);
    setRefresh(false);
    console.log(res.data);
  };

  // Delete Skill

  const deleteSkill = async () => {
    setRefresh(true);
    const res = await axios.delete(`https://football-backend-updated.herokuapp.com/skill/DeleteSkill/${props.data._id}`);
    setRefresh(false);
    console.log(res.data);
  };

  // Update Skill
  const updateSkill = async (e) => {
    e.preventDefault();
    setRefresh(true);
    const res = await axios.put(`https://football-backend-updated.herokuapp.com/skill/UpdateSkill/${props.data._id}`, {
      skillname: skill,
      skillicon: url,
    });
    setRefresh(false);
    setopenUpdateskillmodal(false);
    console.log(res.data);
  };

  React.useEffect(() => {
    getData();
    subCat();
  }, [props, refresh]);
  return (
    <>
      <div>
        {opensubcat === false ? (
          <div
            onClick={() => {
              subCat(true);
            }}
            className=" w-sm h-[150px] rounded-lg bg-no-repeat cursor-pointer"
            style={{ backgroundImage: `url("${Bg}")` }}
          >
            <div className="flex justify-center pt-5 ">
              <img src={props.data.skillicon} className="w-[64px] h-[64px]" />
            </div>
            <p className=" pb-5 pt-3 px-3 text-center text-lg font-medium text-white">
              {props.data.skillname}
            </p>
          </div>
        ) : (
          <div
            onClick={() => setopensubcat(false)}
            className=" w-sm h-[150px] rounded-lg bg-no-repeat cursor-pointer"
            style={{ backgroundImage: `url("${Bg}")`, opacity: button ? 0.5 : 1 }}
          >
            <div className="flex justify-center pt-5">
              <img src={props.data.skillicon} className="w-[64px] h-[64px]" />
            </div>

            <p className="pb-5 pt-3 px-3 text-center text-lg font-medium text-white">
              {props.data.skillname}
            </p>
          </div>
        )}
        {opensubcat ? (
          filterSubskill.map((val, ind) => (
            <>
              <div className="my-3 p-3 max-w-sm max-h-[180px] rounded-lg bg-[#212121]">
                <div className="flex items-center ">
                  <p className=" text-center text-lexend text-base font-normal text-white">
                    {val.subskillname}
                  </p>
                </div>
              </div>
            </>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
