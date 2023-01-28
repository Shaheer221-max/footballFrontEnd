import React, { useState, useEffect, useContext } from "react";
import ClubhubSidebar from "../Components/clubhub-sidebar";
import Header from "../Components/Header";
import "../styles/font.css";
import axios from "../axios";
import { AuthContext } from "./ActiveUser";
import { NavLink } from "react-router-dom";
import img from "../assets/Document.png";
export default function Club2() {
  // onciick button uppload video

  const [newFolder, setNewFolder] = useState(false);
  const [folderName, setFolderName] = useState(false);
  const [error, setError] = useState(false);
  const [folders, setfolders] = useState([]);
  const [document, setDocument] = useState(false);
  const [fileupload, setfileupload] = useState(false);
  const [folderr, setFolder] = useState(false);
  const [fileName, setFileName] = useState(false);
  const [staticdata, setstaticdata] = useState(false);
  const [value, setValue] = useState(false);
  const [url, setUrl] = useState("");
  const { id, setActiveId } = useContext(AuthContext);
  const [isFolder] = useState(false);

  useEffect(() => {
    allFolders();
  }, []);

  // getting folders from database
  const allFolders = async () => {
    await axios
      .get("/club/GetFolders/")
      .then((res) => {
        setfolders(res.data.data.doc);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // creating folders
  const Folder = () => {
    createFolder();
    allFolders();
  };
  const createFolder = async () => {
    await axios
      .post("/club/CreateFolder/63bae4c8ad884b20bc7f7bc9", {
        foldername: folderName,
      })
      .then((res) => {
        console.log(res.data.data);
        setError(false);
        setNewFolder(false);
      })
      .catch((error) => {
        setError(error.response.data);
        console.log(error);
      });
  };


  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    setfileupload(event.target.files[0].name);
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("upload_preset", "player_image");
    axios
      .post("https://api.cloudinary.com/v1_1/dyapmvalo/image/upload", data)
      .then(async (res) => {
        console.log(res.data.url);
        await axios
          .post(`/club/AddFileInFolder/${url}`, { url: res.data.url })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            setError(error.response.data);
            console.log("Error: ", error.response.data);
          });
      })
      .catch((err) => {
        setError("Image not Selected");
      });
  };

  const handleFileName = (event) => {
    setFolderName(event.target.value);
  };

  return (
    <>
      <div className="flex-col w-full">
        {/* Page Header */}
        <Header title={"Club Hub"} />

        <div className="flex  divide-x xl:w-full ">
          {/* Upload Of user  */}
          <div className="w-full pr-12">
            <div className="flex items-stretch">
              <div className="flex-1">
                <h4 className="text-xl font-medium text-white font-lexend whitespace-nowrap  ml-9 mt-[32px] ">
                  Folders
                </h4>
              </div>
              <div className="flex place-content-end">
                <div className="flex-1">
                  <button
                    onClick={() => {
                      setNewFolder(true);
                    }}
                    className="flex-end  font-lexend mb-12 items-center mt-[32px] py-2.5 px-8  text-sm font-normal  bg-white rounded-[4px] m-2"
                  >
                    New Folder
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-9 mx-7 font-sans grid grid-cols-3 md:grid-cols-3  gap-4 ">
              {folders.map((val, ind) => (
                <div
                  className="rounded-lg bg-[#212121] w-full"
                >
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    name="fileupload"
                    style={{ display: "none" }}
                  />
                  <div className="flex" onClick={(e) => {
                    setUrl(val._id);
                    handleClick(e);
                  }}>
                    <div className="flex-1 m-2 p-4">
                      <svg
                        width="40"
                        height="32"
                        viewBox="0 0 40 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 0H4C1.79 0 0.02 1.79 0.02 4L0 28C0 30.21 1.79 32 4 32H36C38.21 32 40 30.21 40 28V8C40 5.79 38.21 4 36 4H20L16 0Z"
                          fill="#1DB954"
                        />
                      </svg>
                    </div>
                    <div className="flex place-content-end">
                      <div className="flex-1 mt-10">
                        <svg
                          width="7"
                          height="106"
                          viewBox="0 0 7 106"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 7C0 3.134 3.13401 0 7 0V106C3.13401 106 0 102.866 0 99V7Z"
                            fill="#1DB954"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="m-4 ">
                    <h3 className="m-2 text-lg text-white">{val.foldername}</h3>
                    <h5 className="m-2  text-sm text-white">
                      {val.Files.length} files
                    </h5>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-stretch">
              <div className="flex-1">
                <h4 className="text-xl font-medium text-white font-lexend whitespace-nowrap  ml-9 mt-[32px] ">
                  {document}
                </h4>
              </div>
              <div className="flex place-content-end">
                <div className="flex-1">
                  <form>
                    <div
                      onClick={handleClick}
                      className=" flex-end  font-lexend mb-12 items-center mt-[32px] py-2.5 px-8  text-sm font-normal  bg-green-500 text-white rounded-[4px] m-2"
                    >
                      <div className="ml-2"> Upload File</div>
                      <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handleChange}
                        name="fileupload"
                        style={{ display: "none" }}
                        // onClick = {UploadFile}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* set event popup */}
      <div
        id="defaultModal"
        className={
          !newFolder
            ? "hidden"
            : " flex absolute top-0 right-0 left-0 z-50 w-full h-full  bg-black/70  bg-opacity-5 justify-center items-center"
        }
      >
        <div className="relative p-4 w-full max-w-lg  ">
          <div className="relative bg-gradient-to-r from-[#000000]/24 to-[#000000]/81 backdrop-blur-[5px]  border-[border] border-2   rounded-2xl px-4 py-2">
            <button
              onClick={() => !setNewFolder(false)}
              type="button"
              className="text-gray-400 bg-white bg-transparent rounded-full  p-0.5 ml-auto flex items-center "
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            <div className="justify-center p-3 ">
              <h3 className="text-lg text-left font-lexend font-bold text-white p-3.5">
                Name
              </h3>

              <div className="flex justify-center p-3 ">
                <input
                  type="text"
                  className="bg-[#212121]  text-white text-sm rounded-lg placeholder-lexend block w-full p-3 mb-5 placeholder-white"
                  placeholder="Enter Name of the Folder"
                  required=""
                  onChange={handleFileName}
                />
              </div>
              {error ? (
                <div>
                  <p className="text-red-600 text-lg text-center">{error}!</p>
                </div>
              ) : (
                <></>
              )}
              <div className="flex items-center justify-center gap-3 mt-2 mb-10">
                <button
                  className="inline-flex items-center py-2 px-7  text-sm font-medium text-black bg-white rounded-[4px] "
                  onClick={Folder}
                >
                  Create Folder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
