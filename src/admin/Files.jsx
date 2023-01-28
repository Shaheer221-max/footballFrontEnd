import React, { useState, useEffect, useContext } from "react";
import ClubhubSidebar from "../Components/clubhub-sidebar";
import Header from "../Components/Header";
import "../styles/font.css";
import axios from "../axios";
import { AuthContext } from "./ActiveUser";
import { NavLink } from "react-router-dom";
import img from "../assets/Document.png";
export default function Files() {
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
    getFile();
  }, []);

  // getting folders from database
  const allFolders = async () => {
    await axios
      .get("/club/GetFolders/")
      .then((res) => {
        console.log(res.data.data.doc);
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

  const SelectedGroup = (name, ind, _id) => {
    setDocument(name);
    let arr = [...folders];
    arr.map((val) => {
      val.isFolder = false;
    });
    arr[ind].isFolder = true;
    setfolders(arr);
    setFolder(_id);
    getFile(_id);
  };

  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    // setfileupload(event.target.files[0]);
    // setFileName(event.target.files[0].name);
    // console.log("in upload file");
    // const formData = new FormData();
    // formData.append("fileupload", event.target.files[0]);
    // formData.append("upload_preset", "fileupload");
    // console.log(folderr, fileupload);
    // uploadFile(formData);
    setfileupload(event.target.files[0].name);
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("upload_preset", "player_image");
    //data.append("cloud_name","dyapmvalo");
    axios
      .post("https://api.cloudinary.com/v1_1/dyapmvalo/image/upload", data)
      .then(async (res) => {
        console.log(res.data.url);
        await axios
          .post("/club/AddFileInFolder/63baf7453564cb139c54a0f7", {url: res.data.url})
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

  const getFile = async (_id) => {
    await axios
      .get("/club/GetAllFolderFiles/63baf7453564cb139c54a0f7")
      .then((res) => {
        console.log(res.data.data)
        let data = res.data.data;
        setstaticdata(data.reverse());
        console.log("all files", staticdata);
      })
      .catch((error) => {
        setError(error.response.data);
        console.log(error);
      });
  };

  const handleFileName = (event) => {
    setFolderName(event.target.value);
    console.log(folderName);
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
                <div className="rounded-lg bg-[#212121] w-full">
                  <div className="flex">
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
                    {val.Files ? (
                      <>
                        <h5 className="m-2  text-sm text-white">
                          {val.Files.length} files
                        </h5>
                      </>
                    ) : (
                      <>
                        <h5 className="m-2  text-sm text-white">0 files</h5>
                      </>
                    )}
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

            {/* filess */}
            {/* <div className="flex-column ml-9">
              {staticdata ? (
                <>
                  {staticdata.map((val, ind) => {
                    return (
                      // <a href={process.env.REACT_APP_API+"/"+val.name}>
                      <div
                        className="flex rounded-lg mb-3 mt-3 bg-[#212121] pr-30 p-3 "
                        onClick={() => setValue(val)}
                      >
                        <div className="flex-1 grow-0 p-2">
                          <svg
                            width="31"
                            height="38"
                            viewBox="0 0 31 38"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M27.9 38H3.1C1.39066 38 0 36.6253 0 34.9355V3.06453C0 1.37475 1.39066 1.12902e-05 3.1 1.12902e-05H15.713C16.1202 -0.00108512 16.5236 0.0776839 16.8998 0.231758C17.276 0.385832 17.6175 0.61215 17.9047 0.897608L30.092 12.9454C30.3808 13.2293 30.6097 13.5669 30.7656 13.9388C30.9214 14.3107 31.0011 14.7095 31 15.1121V34.9355C31 36.6253 29.6093 38 27.9 38ZM3.1 1.22582C2.07421 1.22582 1.24 2.05048 1.24 3.06453V34.9355C1.24 35.9495 2.07421 36.7742 3.1 36.7742H27.9C28.9258 36.7742 29.76 35.9495 29.76 34.9355V15.1121C29.7585 14.6248 29.5628 14.1577 29.2153 13.8121L17.028 1.76425C16.8557 1.59301 16.6508 1.45725 16.425 1.36483C16.1993 1.27241 15.9573 1.22516 15.713 1.22582H3.1Z"
                              fill="#FD4233"
                            />

                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 19 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18.9728 12.1952C18.9515 12.0371 18.8271 11.8386 18.6936 11.7052C18.3112 11.3206 17.4705 11.119 16.1897 11.1004C15.3217 11.0911 14.2776 11.1686 13.1789 11.3268C12.6873 11.0384 12.1804 10.722 11.7828 10.3405C10.7115 9.32011 9.81917 7.90271 9.26073 6.34264C9.29715 6.19687 9.3275 6.0697 9.35785 5.93944C9.35785 5.93944 9.95878 2.44091 9.80096 1.25612C9.77971 1.09484 9.76454 1.04832 9.72205 0.921156L9.67045 0.784688C9.50656 0.396996 9.18485 -0.0124065 8.68104 0.00930422L8.3836 0H8.37753C7.81302 0 7.35777 0.294646 7.23637 0.731962C6.87216 2.10904 7.24851 4.17156 7.93139 6.83888L7.75535 7.2731C7.26672 8.4951 6.65364 9.72331 6.11341 10.8057L6.0436 10.9453C5.47302 12.0836 4.95706 13.0513 4.48664 13.8701L4.00407 14.1306C3.96765 14.1492 3.13909 14.5989 2.94484 14.7168C1.29683 15.7248 0.20422 16.8661 0.0221184 17.7718C-0.035547 18.0633 0.00694276 18.4324 0.30134 18.603L0.768734 18.8449C0.97208 18.9473 1.18757 19 1.40609 19C2.58064 19 3.94337 17.5051 5.82205 14.1554C7.98905 13.4358 10.4596 12.8341 12.6235 12.5054C14.2715 13.4514 16.2989 14.112 17.5797 14.112C17.8073 14.112 18.0046 14.0903 18.1624 14.0468C18.4083 13.9786 18.6147 13.8359 18.7421 13.6436C18.991 13.2622 19.0396 12.7349 18.9728 12.1952ZM1.15115 18.0912C1.3636 17.4927 2.2134 16.3079 3.46687 15.2595C3.54578 15.1944 3.74002 15.0083 3.91605 14.8346C2.60492 16.9716 1.7278 17.8214 1.15115 18.0912ZM8.57481 0.620307C8.95115 0.620307 9.16664 1.59109 9.18485 2.50294C9.20306 3.41479 8.99364 4.0537 8.73567 4.52824C8.52018 3.82729 8.41699 2.72315 8.41699 2.00049C8.41699 2.00049 8.40181 0.620307 8.57481 0.620307ZM6.35924 13.0699C6.62329 12.5891 6.89644 12.0805 7.17567 11.5439C7.85855 10.2258 8.28952 9.19605 8.6082 8.34933C9.24555 9.53412 10.0407 10.5421 10.9725 11.3485C11.0908 11.4478 11.2153 11.5501 11.3427 11.6525C9.44586 12.034 7.80392 12.5023 6.35924 13.0699ZM18.3263 12.9613C18.211 13.0326 17.8802 13.0761 17.6677 13.0761C16.9818 13.0761 16.129 12.7566 14.9362 12.2325C15.3945 12.1983 15.8164 12.1797 16.1927 12.1797C16.8817 12.1797 17.085 12.1766 17.7618 12.3534C18.4356 12.5302 18.4447 12.8869 18.3263 12.9613Z"
                                fill="#FF402F"
                              />
                            </svg>
                          </svg>
                        </div>
                        <div className="flex-1 grow-1 p-2 text-white mt-3 font-lexend">
                          <img src={val} alt="" />
                        </div>
                        <div className="flex  mt-7 mr-3 ">
                          <svg
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
                      //    </a>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </div> */}
          </div>

          {/*skill cards */}
          {/* <div className=" xl:w-4/12 border-[#7E7E7E]">
            <div className="ml-10 mr-10  2xl:grid 2xl:grid-cols-1 ">
              return <ClubhubSidebar value={value} />;
            </div>
          </div> */}
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
