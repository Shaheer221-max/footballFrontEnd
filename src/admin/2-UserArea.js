import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import "../styles/font.css";
import { NavLink } from "react-router-dom";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/actions/user";

export default function UserArea() {
  const [staticdata, setStaticData] = useState([]);
  const [openAddsubcatmodal, setopenAddsubcatmodal] = useState(false);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [coach, setCoach] = useState(0);
  const [playersJoined, setPlayersJoined] = useState(0);
  const [playersLeft, setPlayersLeft] = useState(0);
  const [searchPlayer, setSearchPlayer] = useState(false);
  const [search, setSearch] = useState(false);
  const [staticdataCopy, setStaticDataCopy] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(false);
  const [playersPerPage] = useState(10);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  let next = false;
  // seting value
  const handleSearchChange = (event) => {
    setSearchPlayer(event.target.value);
    const data = staticdata.filter((val) => val.name.toUpperCase().startsWith(event.target.value.toUpperCase()));
    setStaticDataCopy(data);
  };

  useEffect(() => {
    data();
    dispatch(fetchData())
  }, [dispatch]);

  // getting players from database
  const data = async () => {
    await axios
      .get("https://football-backend-updated.herokuapp.com/users/GetAllPlayers")
      .then((res) => {
        setTotalPlayers(res.data.result);
        setStaticData(res.data.data);
        setPage(res.data.data.doc);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // Dispatch Player from Redux
  



  const setPage = (data) => {
    const current = currentPage;
    if (nextPage) {
      current = current + 1
    }
    const indexOfLastPage = current * playersPerPage;
    const indexOfFirstPage = indexOfLastPage - playersPerPage;
    let page = [];
    page = data?.slice(indexOfFirstPage, indexOfLastPage);
    setStaticData(page);
    setTotalPages(Math.ceil(data?.length / playersPerPage));
    console.log("Current pages", currentPage);
    console.log(
      "Index Of 1st",
      indexOfFirstPage,
      "Last Index",
      indexOfLastPage,
      "next",
      next
    );
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      let current = currentPage;
      setCurrentPage((prev) => setCurrentPage(prev + 1));
      console.log(currentPage);
      next = true;
      data();
    }
  };

  const backPage = () => {
    if (currentPage > 1) {
      let current = currentPage;
      setCurrentPage(current - 1);
      data();
    }
  };

  // searching players
  const searchInPlayer = () => {
    const data = staticdata.filter((val) => val.name.toUpperCase().startsWith(searchPlayer.toUpperCase()));
    setStaticDataCopy(data);
  };

  const checkNames = (val) => {
    console.log("Search: ", val);
    if (val.name.toUpperCase().includes(searchPlayer.toUpperCase())) {
      return val.name;
    }
  };

  // profile
  const openProfile = (index) => {
    let arr;
    if (staticdataCopy) {
      arr = [...staticdataCopy];
    } else {
      arr = [...staticdata];
    }
    arr.map((val, ind) => {
      val.isPlayer = false;
    });
    arr[index].isPlayer = true;
    setStaticData(arr);
  };
  const closeProfile = (index) => {
    let arr;
    if (staticdataCopy) {
      arr = [...staticdataCopy];
    } else {
      arr = [...staticdata];
    }
    arr[index].isPlayer = false;
    setStaticData(arr);
  };

  return (
    <>
      <div className="flex-col w-full">
        {/* Page Header */}
        <Header title={"User Area"} />
        {/* Title Of the Page */}
        <div className="flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="flex-row">
            <button className="self-center text-20 font-medium text-white whitespace-nowrap  ml-9 mt-[32px]">
              Players
            </button>
            <NavLink to="/userarea/coach">
            <button className="self-center text-18 font-medium bg-green-500 p-2 rounded-md text-white whitespace-nowrap  ml-9 mt-[32px] ">
              View Coaches
            </button>
            </NavLink>
          </div>

          {/* <div className="flex-row mr-7" style={{ display: 'flex' }}>
            <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="self-center text-20 font-medium bg-green-500 p-2 rounded-md text-white whitespace-nowrap  ml-9 mt-[32px]">
              <svg style={{ width: 16, height: 16, marginRight: 8 }} className="svg-icon search-icon" aria-labelledby="title desc" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7"><title id="title">Search Icon</title><desc id="desc">A magnifying glass icon.</desc><g className="search-path" fill="none" stroke="#FFFFFF"><path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4"/><circle cx="8" cy="8" r="7"/></g></svg>
              Search
            </button>
            <button className="self-center text-18 font-medium bg-white text-black p-2 rounded-md whitespace-nowrap  ml-4 mt-[32px] ">
              Create Player
            </button>
          </div> */}
        </div>
        {/* Search Button  */}
        <div className="flex items-center justify-start gap-10 mx-9 my-5 font-dm">
          <form className="flex items-center w-1/2">
            <div className="relative w-full font-dm">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                className="bg-[#212121]  text-white p-5  text-sm rounded-lg block w-full pl-10 p-2.5   border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Players"
                required=""
                onChange={handleSearchChange}
              />
            </div>

            <NavLink to={"/userarea"}>
              <button
                className="inline-flex font-dm font-lexend placeholder-lexend items-center py-4 px-6 ml-4 text-sm font-normal text-white bg-green-500 rounded-[4px] "
                onClick={searchInPlayer}
              >
                Search
              </button>
            </NavLink>
          </form>

          <NavLink to={"/userarea/createProfile"}>
            <button
              className="font-dm bg-white ml-auto text-sm  focus:outline-none font-normal rounded-[4px]  px-6 py-4 text-center inline-flex items-center"
              type="button"
            >
              Create Player
            </button>
          </NavLink>
        </div>

        {/* Header Of Table  */}
        <div className="flex mx-10">
          <div className="w-72 mr-8">
            <div className="flex rounded-lg text-lg text-left text-white  bg-zinc-800 p-19">
              <div className="flex-1 w-full mt-3 ml-2 mb-3 pt-3 pb-3 pl-3 grow-0">
                <svg
                  width="78"
                  height="78"
                  viewBox="0 0 78 78"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="39" cy="39" r="39" fill="#AA42C8" />
                  <path
                    d="M58.9993 39.4971C59.0932 25.5439 44.9713 15.5253 31.7914 20.1357C12.8142 26.9145 13.6276 53.576 32.96 59.2201C45.849 62.9343 59.1137 52.8924 58.9993 39.4971ZM53.1518 36.4625C52.3586 35.8863 52.0283 34.8598 52.3313 33.9273C52.9242 32.1031 55.2747 31.8319 55.8858 33.6502C55.9962 33.9787 56.0971 34.3104 56.1885 34.6449C56.6811 36.4476 54.6638 37.5609 53.1518 36.4625ZM45.7841 23.1071C45.9969 22.9624 46.2413 22.8575 46.4731 22.9695C48.583 23.9886 50.4707 25.3991 52.0514 27.1398C52.19 27.2924 52.1852 27.5164 52.1237 27.7132L50.4056 32.9998C49.9749 34.3251 48.9706 35.3862 47.671 35.889C46.2036 36.4567 44.5485 36.241 43.2756 35.3162L41.5373 34.0532C40.2793 33.1391 39.5348 31.678 39.5348 30.1229C39.5348 28.5677 40.2793 27.1066 41.5374 26.1925L45.7841 23.1071ZM42.8773 41.5976C42.2578 43.5045 40.4807 44.7959 38.4758 44.7959C36.4707 44.7959 34.6936 43.5046 34.0742 41.5975C33.4549 39.6908 34.1339 37.6018 35.7558 36.4234C37.3779 35.2449 39.5745 35.2448 41.1965 36.4234C42.8183 37.6019 43.4968 39.691 42.8773 41.5976ZM39.0433 21.1493C41.0298 21.2101 41.4977 23.6031 39.8898 24.7713C39.0466 25.384 37.9047 25.3841 37.0614 24.7714C35.4535 23.6033 35.9216 21.2103 37.9081 21.1493C38.2864 21.1377 38.665 21.1377 39.0433 21.1493ZM30.4777 22.9701C30.7091 22.858 30.954 22.9622 31.1665 23.1071L35.414 26.1928C36.672 27.1067 37.4164 28.5676 37.4164 30.1225C37.4164 31.6774 36.672 33.1383 35.4141 34.0522L33.6749 35.3157C32.4021 36.2404 30.7469 36.4561 29.2796 35.8884C27.9799 35.3855 26.9756 34.3244 26.5449 32.9991L24.8268 27.7125C24.7642 27.521 24.7611 27.299 24.8956 27.149C26.4603 25.4032 28.3696 23.9917 30.4777 22.9701ZM23.7989 36.4624C22.2871 37.5605 20.27 36.4474 20.7624 34.6449C20.8538 34.3104 20.9547 33.9788 21.065 33.6504C21.6759 31.8321 24.0264 32.1033 24.6193 33.9275C24.9223 34.8598 24.592 35.8863 23.7989 36.4624ZM20.7124 44.2236C20.2877 42.6241 21.1118 41.0326 22.4506 40.0599L24.4884 38.5795C25.7612 37.6548 27.4163 37.4391 28.8835 38.0068C30.1833 38.5097 31.1876 39.5709 31.6182 40.8963L32.4598 43.4867C32.8983 44.8366 32.6363 46.3161 31.761 47.4333C30.9529 48.4648 29.7154 49.0673 28.4051 49.0673H25.6728C23.8994 49.0673 22.2113 48.1476 21.5133 46.5174C21.1929 45.7689 20.9183 44.9993 20.7124 44.2236ZM27.5041 54.21C26.1008 53.1623 26.9778 51.1857 28.729 51.1857C29.6207 51.1857 30.4131 51.7599 30.6885 52.608C31.2216 54.2492 29.6473 55.6824 28.2172 54.7166C27.9756 54.5534 27.7378 54.3845 27.5041 54.21ZM37.2995 57.817C35.5351 57.7041 34.1431 56.3829 33.5968 54.7014L32.8799 52.4949C32.4414 51.145 32.7033 49.6655 33.5786 48.5483C34.3868 47.5168 35.6243 46.9143 36.9346 46.9143H40.016C41.3263 46.9143 42.5638 47.5168 43.3719 48.5483C44.2472 49.6655 44.5092 51.145 44.0706 52.4949L43.354 54.7007C42.8076 56.3826 41.4151 57.7039 39.6503 57.8169C38.8675 57.8671 38.0821 57.8671 37.2995 57.817ZM48.7326 54.7168C47.3025 55.6826 45.7282 54.2494 46.2612 52.6082C46.5367 51.76 47.3291 51.1857 48.2209 51.1857C49.9721 51.1857 50.8491 53.1623 49.4459 54.2101C49.2121 54.3846 48.9742 54.5536 48.7326 54.7168ZM55.4373 46.5164C54.7392 48.1471 53.0507 49.0673 51.2769 49.0673H48.5455C47.2352 49.0673 45.9976 48.4648 45.1895 47.4333C44.3142 46.3161 44.0522 44.8366 44.4908 43.4867L45.3323 40.8963C45.7629 39.5709 46.7673 38.5097 48.067 38.0068C49.5343 37.4391 51.1893 37.6548 52.4621 38.5795L54.4993 40.0595C55.8385 41.0324 56.6627 42.6245 56.2377 44.2244C56.0319 44.9995 55.7575 45.7685 55.4373 46.5164Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="flex-1 mt-8 ml-3">
                <h1 className="text-3xl font-bold font-lexend">
                  {totalPlayers}
                </h1>
                <h3 className="text-text-lg font-lexend">Total Players</h3>
              </div>
            </div>
          </div>
          <div className="w-72 mr-8">
            <div className="flex rounded-lg text-lg text-left text-white  bg-zinc-800 p-18">
              <div className="flex-1 w-20 mt-3 ml-2 mb-3 pt-3 pb-3 pl-3 grow-0">
                <svg
                  width="78"
                  height="78"
                  viewBox="0 0 78 78"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="39" cy="39" r="39" fill="#7730AF" />
                  <path
                    d="M58.9993 39.4971C59.0932 25.5439 44.9713 15.5253 31.7914 20.1357C12.8142 26.9145 13.6276 53.576 32.96 59.2201C45.849 62.9343 59.1137 52.8924 58.9993 39.4971ZM53.1518 36.4625C52.3586 35.8863 52.0283 34.8598 52.3313 33.9273C52.9242 32.1031 55.2747 31.8319 55.8858 33.6502C55.9962 33.9787 56.0971 34.3104 56.1885 34.6449C56.6811 36.4476 54.6638 37.5609 53.1518 36.4625ZM45.7841 23.1071C45.9969 22.9624 46.2413 22.8575 46.4731 22.9695C48.583 23.9886 50.4707 25.3991 52.0514 27.1398C52.19 27.2924 52.1852 27.5164 52.1237 27.7132L50.4056 32.9998C49.9749 34.3251 48.9706 35.3862 47.671 35.889C46.2036 36.4567 44.5485 36.241 43.2756 35.3162L41.5373 34.0532C40.2793 33.1391 39.5348 31.678 39.5348 30.1229C39.5348 28.5677 40.2793 27.1066 41.5374 26.1925L45.7841 23.1071ZM42.8773 41.5976C42.2578 43.5045 40.4807 44.7959 38.4758 44.7959C36.4707 44.7959 34.6936 43.5046 34.0742 41.5975C33.4549 39.6908 34.1339 37.6018 35.7558 36.4234C37.3779 35.2449 39.5745 35.2448 41.1965 36.4234C42.8183 37.6019 43.4968 39.691 42.8773 41.5976ZM39.0433 21.1493C41.0298 21.2101 41.4977 23.6031 39.8898 24.7713C39.0466 25.384 37.9047 25.3841 37.0614 24.7714C35.4535 23.6033 35.9216 21.2103 37.9081 21.1493C38.2864 21.1377 38.665 21.1377 39.0433 21.1493ZM30.4777 22.9701C30.7091 22.858 30.954 22.9622 31.1665 23.1071L35.414 26.1928C36.672 27.1067 37.4164 28.5676 37.4164 30.1225C37.4164 31.6774 36.672 33.1383 35.4141 34.0522L33.6749 35.3157C32.4021 36.2404 30.7469 36.4561 29.2796 35.8884C27.9799 35.3855 26.9756 34.3244 26.5449 32.9991L24.8268 27.7125C24.7642 27.521 24.7611 27.299 24.8956 27.149C26.4603 25.4032 28.3696 23.9917 30.4777 22.9701ZM23.7989 36.4624C22.2871 37.5605 20.27 36.4474 20.7624 34.6449C20.8538 34.3104 20.9547 33.9788 21.065 33.6504C21.6759 31.8321 24.0264 32.1033 24.6193 33.9275C24.9223 34.8598 24.592 35.8863 23.7989 36.4624ZM21.0399 45.2946C20.2671 43.0544 21.4579 40.7812 23.3751 39.3883L24.4884 38.5795C25.7612 37.6548 27.4163 37.4391 28.8835 38.0068C30.1833 38.5097 31.1876 39.5709 31.6182 40.8963L32.4598 43.4867C32.8983 44.8366 32.6363 46.3161 31.761 47.4333C30.9529 48.4648 29.7154 49.0673 28.4051 49.0673H26.9366C24.3803 49.0673 21.8736 47.7111 21.0399 45.2946ZM27.5041 54.21C26.1008 53.1623 26.9778 51.1857 28.729 51.1857C29.6207 51.1857 30.4131 51.7599 30.6885 52.608C31.2216 54.2492 29.6473 55.6824 28.2172 54.7166C27.9756 54.5534 27.7378 54.3845 27.5041 54.21ZM38.2957 57.8537C35.9099 57.8306 34.0259 56.0224 33.2887 53.7532L32.8799 52.4949C32.4414 51.145 32.7033 49.6655 33.5786 48.5483C34.3868 47.5168 35.6243 46.9143 36.9346 46.9143H40.016C41.3263 46.9143 42.5638 47.5168 43.3719 48.5483C44.2472 49.6655 44.5092 51.145 44.0706 52.4949L43.662 53.7527C42.9247 56.0221 41.0404 57.8303 38.6543 57.8537C38.5348 57.8549 38.4152 57.8549 38.2957 57.8537ZM48.7326 54.7168C47.3025 55.6826 45.7282 54.2494 46.2612 52.6082C46.5367 51.76 47.3291 51.1857 48.2209 51.1857C49.9721 51.1857 50.8491 53.1623 49.4459 54.2101C49.2121 54.3846 48.9742 54.5536 48.7326 54.7168ZM55.9102 45.295C55.0765 47.7113 52.5702 49.0673 50.014 49.0673H48.5455C47.2352 49.0673 45.9976 48.4648 45.1895 47.4333C44.3142 46.3161 44.0522 44.8366 44.4908 43.4867L45.3323 40.8963C45.7629 39.5709 46.7673 38.5097 48.067 38.0068C49.5343 37.4391 51.1893 37.6548 52.4621 38.5795L53.5749 39.3879C55.4924 40.781 56.6833 43.0545 55.9102 45.295Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="flex-1 mt-3 mt-8 ml-4">
                <h1 className="text-3xl font-bold">{playersJoined}</h1>
                <h3 className="text-lg">Players Joined</h3>
              </div>
            </div>
          </div>
          <div className="w-72 ">
            <div className="flex rounded-lg text-lg text-left text-white  bg-zinc-800 p-18">
              <div className="flex-1 mt-3 ml-2 mb-3 pt-3 pb-3 pl-3 grow-0">
                <svg
                  width="78"
                  height="78"
                  viewBox="0 0 78 78"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="39" cy="39" r="39" fill="#FFB800" />
                  <path
                    d="M58.9993 39.4971C59.0932 25.5439 44.9713 15.5253 31.7914 20.1357C12.8142 26.9145 13.6276 53.576 32.96 59.2201C45.849 62.9343 59.1137 52.8924 58.9993 39.4971ZM53.1518 36.4625C52.3586 35.8863 52.0283 34.8598 52.3313 33.9273C52.9242 32.1031 55.2747 31.8319 55.8858 33.6502C55.9962 33.9787 56.0971 34.3104 56.1885 34.6449C56.6811 36.4476 54.6638 37.5609 53.1518 36.4625ZM45.7841 23.1071C45.9969 22.9624 46.2413 22.8575 46.4731 22.9695C48.583 23.9886 50.4707 25.3991 52.0514 27.1398C52.19 27.2924 52.1852 27.5164 52.1237 27.7132L50.4056 32.9998C49.9749 34.3251 48.9706 35.3862 47.671 35.889C46.2036 36.4567 44.5485 36.241 43.2756 35.3162L41.5373 34.0532C40.2793 33.1391 39.5348 31.678 39.5348 30.1229C39.5348 28.5677 40.2793 27.1066 41.5374 26.1925L45.7841 23.1071ZM42.8773 41.5976C42.2578 43.5045 40.4807 44.7959 38.4758 44.7959C36.4707 44.7959 34.6936 43.5046 34.0742 41.5975C33.4549 39.6908 34.1339 37.6018 35.7558 36.4234C37.3779 35.2449 39.5745 35.2448 41.1965 36.4234C42.8183 37.6019 43.4968 39.691 42.8773 41.5976ZM39.0433 21.1493C41.0298 21.2101 41.4977 23.6031 39.8898 24.7713C39.0466 25.384 37.9047 25.3841 37.0614 24.7714C35.4535 23.6033 35.9216 21.2103 37.9081 21.1493C38.2864 21.1377 38.665 21.1377 39.0433 21.1493ZM30.4777 22.9701C30.7091 22.858 30.954 22.9622 31.1665 23.1071L35.414 26.1928C36.672 27.1067 37.4164 28.5676 37.4164 30.1225C37.4164 31.6774 36.672 33.1383 35.4141 34.0522L33.6749 35.3157C32.4021 36.2404 30.7469 36.4561 29.2796 35.8884C27.9799 35.3855 26.9756 34.3244 26.5449 32.9991L24.8268 27.7125C24.7642 27.521 24.7611 27.299 24.8956 27.149C26.4603 25.4032 28.3696 23.9917 30.4777 22.9701ZM23.7989 36.4624C22.2871 37.5605 20.27 36.4474 20.7624 34.6449C20.8538 34.3104 20.9547 33.9788 21.065 33.6504C21.6759 31.8321 24.0264 32.1033 24.6193 33.9275C24.9223 34.8598 24.592 35.8863 23.7989 36.4624ZM20.7124 44.2236C20.2877 42.6241 21.1118 41.0326 22.4506 40.0599L24.4884 38.5795C25.7612 37.6548 27.4163 37.4391 28.8835 38.0068C30.1833 38.5097 31.1876 39.5709 31.6182 40.8963L32.4598 43.4867C32.8983 44.8366 32.6363 46.3161 31.761 47.4333C30.9529 48.4648 29.7154 49.0673 28.4051 49.0673H25.6728C23.8994 49.0673 22.2113 48.1476 21.5133 46.5174C21.1929 45.7689 20.9183 44.9993 20.7124 44.2236ZM27.5041 54.21C26.1008 53.1623 26.9778 51.1857 28.729 51.1857C29.6207 51.1857 30.4131 51.7599 30.6885 52.608C31.2216 54.2492 29.6473 55.6824 28.2172 54.7166C27.9756 54.5534 27.7378 54.3845 27.5041 54.21ZM37.2995 57.817C35.5351 57.7041 34.1431 56.3829 33.5968 54.7014L32.8799 52.4949C32.4414 51.145 32.7033 49.6655 33.5786 48.5483C34.3868 47.5168 35.6243 46.9143 36.9346 46.9143H40.016C41.3263 46.9143 42.5638 47.5168 43.3719 48.5483C44.2472 49.6655 44.5092 51.145 44.0706 52.4949L43.354 54.7007C42.8076 56.3826 41.4151 57.7039 39.6503 57.8169C38.8675 57.8671 38.0821 57.8671 37.2995 57.817ZM48.7326 54.7168C47.3025 55.6826 45.7282 54.2494 46.2612 52.6082C46.5367 51.76 47.3291 51.1857 48.2209 51.1857C49.9721 51.1857 50.8491 53.1623 49.4459 54.2101C49.2121 54.3846 48.9742 54.5536 48.7326 54.7168ZM55.4373 46.5164C54.7392 48.1471 53.0507 49.0673 51.2769 49.0673H48.5455C47.2352 49.0673 45.9976 48.4648 45.1895 47.4333C44.3142 46.3161 44.0522 44.8366 44.4908 43.4867L45.3323 40.8963C45.7629 39.5709 46.7673 38.5097 48.067 38.0068C49.5343 37.4391 51.1893 37.6548 52.4621 38.5795L54.4993 40.0595C55.8385 41.0324 56.6627 42.6245 56.2377 44.2244C56.0319 44.9995 55.7575 45.7685 55.4373 46.5164Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="flex-1 mt-3 mt-8 ml-3">
                <h1 className="text-3xl font-bold">{playersLeft}</h1>
                <h3 className="text-lg">Players Left</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Table Of user  */}
        <div className="overflow-x-auto   font-lexend relative mx-10 my-5 font-dm rounded-xl">
          <table className="font-dm w-full text-sm text-left text-white  bg-gradient-to-r from-[#2F2F2F]/100 to-[#3A3A3A]/0 ">
            <thead className=" font-dm text-base font-normal text-white/0.81 border-[#7E7E7E] border-b">
              <tr
                className="text-center font-DM-sans"
                onClick={() => setopenAddsubcatmodal(false)}
              >
                <th scope="col" className="py-3 pl-3">
                  Id
                </th>
                <th scope="col" className="py-3 justify-start">
                  User
                </th>
                <th scope="col" className="py-3 pl-2 text-left">
                  Email
                </th>
                <th scope="col" className="py-3 pl-2">
                  Phone
                </th>
                <th scope="col" className="py-3 pl-2">
                  Date Joined
                </th>
                <th scope="col" className="py-3 pl-2">
                  Son of
                </th>
                <th scope="col" className="py-3 px-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {staticdataCopy.length > 0 ?   staticdataCopy.map((object, index) => (
                    <tr className="font-dm border-[#7E7E7E] border-b text-center">
                      <th
                        scope="row"
                        className="py-4 font-medium whitespace-nowrap text-white"
                        onClick={() => setopenAddsubcatmodal(false)}
                      >
                        #{index + 1}
                      </th>
                      <td className="py-4 ">
                        <div
                          className="flex gap-4 items-center justify-left"
                          style={{ marginLeft: "10rem" }}
                          onClick={() => closeProfile(index)}
                        >
                          <img
                            className=" w-10 h-10 rounded-full "
                            src={object.image}
                          />
                          <p> {object.name} </p>
                        </div>
                      </td>
                      <td className="py-4 text-left" onClick={() => closeProfile(index)}>
                        {object.email}
                      </td>
                      <td className="py-4 " onClick={() => closeProfile(index)}>
                        {object.phone}
                      </td>
                      <td className="py-4 " onClick={() => closeProfile(index)}>
                        {object.datedjoined.split("T")[0]}
                      </td>
                      <td className="py-4 " onClick={() => closeProfile(index)}>
                        {object.dateLeft ? <>{object.dateLeft}</> : <>-</>}
                      </td>

                      <td>
                        <div className="flex pl-3 gap-10 justify-center">
                          <NavLink to={"/userarea/playerprofile/profile"}>
                            <button className="bg-blue-500 p-2 rounded-sm">View Profile</button>
                          </NavLink>
                          <div className="mt-2">
                            <svg
                              onClick={() => openProfile(index)}
                              width="19"
                              height="5"
                              viewBox="0 0 19 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.201 5.68597e-08C8.91196 5.07687e-08 8.62575 0.0569305 8.35871 0.167541C8.09168 0.278152 7.84904 0.440276 7.64466 0.644658C7.44028 0.84904 7.27815 1.09168 7.16754 1.35871C7.05693 1.62575 7 1.91196 7 2.201C7 2.49004 7.05693 2.77625 7.16754 3.04329C7.27815 3.31032 7.44028 3.55296 7.64466 3.75734C7.84904 3.96172 8.09168 4.12385 8.35871 4.23446C8.62575 4.34507 8.91196 4.402 9.201 4.402C9.78474 4.40187 10.3445 4.16985 10.7572 3.75699C11.1699 3.34413 11.4016 2.78424 11.4015 2.2005C11.4014 1.61676 11.1693 1.05698 10.7565 0.644304C10.3436 0.231631 9.78374 -0.000132534 9.2 5.68597e-08H9.201ZM2.201 5.68597e-08C1.91196 5.07687e-08 1.62575 0.0569305 1.35871 0.167541C1.09168 0.278152 0.84904 0.440276 0.644658 0.644658C0.440276 0.84904 0.278152 1.09168 0.167541 1.35871C0.0569305 1.62575 0 1.91196 0 2.201C0 2.49004 0.0569305 2.77625 0.167541 3.04329C0.278152 3.31032 0.440276 3.55296 0.644658 3.75734C0.84904 3.96172 1.09168 4.12385 1.35871 4.23446C1.62575 4.34507 1.91196 4.402 2.201 4.402C2.78474 4.40187 3.34452 4.16985 3.7572 3.75699C4.16987 3.34413 4.40163 2.78424 4.4015 2.2005C4.40137 1.61676 4.16935 1.05698 3.75649 0.644304C3.34363 0.231631 2.78474 -0.000132534 2.201 5.68597e-08ZM16.201 5.68597e-08C15.912 5.07687e-08 15.6258 0.0569305 15.3587 0.167541C15.0917 0.278152 14.849 0.440276 14.6447 0.644658C14.4403 0.84904 14.2782 1.09168 14.1675 1.35871C14.0569 1.62575 14 1.91196 14 2.201C14 2.49004 14.0569 2.77625 14.1675 3.04329C14.2782 3.31032 14.4403 3.55296 14.6447 3.75734C14.849 3.96172 15.0917 4.12385 15.3587 4.23446C15.6258 4.34507 15.912 4.402 16.201 4.402C16.7847 4.40187 17.3445 4.16985 17.7572 3.75699C18.1699 3.34413 18.4016 2.78424 18.4015 2.2005C18.4014 1.61676 18.1693 1.05698 17.7565 0.644304C17.3436 0.231631 16.7847 -0.000132534 16.201 5.68597e-08Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                      {/* view profile */}
                      <tr>
                        <div
                          id="defaultModal"
                          onClick={() => closeProfile(index)}
                          className={
                            !object.isPlayer
                              ? "hidden"
                              : " flex  mt-3  bg-black/0 justify-center items-center"
                          }
                        >
                          <div
                            id="defaultModal"
                            className={
                              !object.isPlayer
                                ? "hidden"
                                : " flex absolute right-0 mb-3 mt-3  z-50 w-[150px] h-[80px]   bg-white rounded-xl justify-center content-center items-center"
                            }
                          >
                            <div className="w-full ">
                              <h5 className="text-sm text-center  mb-2 mt-3  font-medium tracking-tight font-lexend  text-[#212121] ">
                                <NavLink to={{pathname : "/userarea/playerprofile/profile"}} state = {{ data: object }} >
                                  <a href="userarea/playerprofile/profile">
                                    View Profile
                                  </a>
                                </NavLink>
                              </h5>
                              <div className="border-b-2 w-full border-[#212121]/50" />

                              <h5
                                className="text-[#212121] text-center mt-3 mb-3  text-sm font-normal font-lexend cursor-pointer  "
                                onClick={() => setopenAddsubcatmodal(false)}
                              >
                                <NavLink to={"chat"}>
                                  <a href="/chat"> chat</a>
                                </NavLink>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </tr>
                    </tr>
                  )) : staticdata.map((object, index) => (
                    <tr className="font-dm border-[#7E7E7E] border-b text-center">
                      <th
                        scope="row"
                        className="py-4 font-medium whitespace-nowrap text-white"
                        onClick={() => setopenAddsubcatmodal(false)}
                      >
                        #{index + 1}
                      </th>
                      <td className="py-4 ">
                        <div
                          className="flex gap-4 items-center justify-left"
                          onClick={() => closeProfile(index)}
                          style={{ marginLeft: "10rem" }}
                        >
                          <img
                            className=" w-10 h-10 rounded-full "
                            src={object.image}
                          />
                          <p> {object.name} </p>
                        </div>
                      </td>
                      <td className="py-4 text-left" onClick={() => closeProfile(index)}>
                        {object.email}
                      </td>
                      <td className="py-4 " onClick={() => closeProfile(index)}>
                        {object.phone}
                      </td>
                      <td className="py-4 " onClick={() => closeProfile(index)}>
                        {object.datedjoined.split("T")[0]}
                      </td>
                      <td className="py-4 " onClick={() => closeProfile(index)}>
                        {object.dateLeft ? <>{object.dateLeft}</> : <>-</>}
                      </td>

                      <td>
                        <div className="flex pl-3 gap-10 justify-center">
                          <NavLink to={{pathname: "/userarea/playerprofile/profile"}} state = {{ object }}>
                            <button className="bg-blue-500 p-2 rounded-sm">View Profile</button>
                          </NavLink>
                          <div className="mt-2">
                            <svg
                              onClick={() => openProfile(index)}
                              width="19"
                              height="5"
                              viewBox="0 0 19 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.201 5.68597e-08C8.91196 5.07687e-08 8.62575 0.0569305 8.35871 0.167541C8.09168 0.278152 7.84904 0.440276 7.64466 0.644658C7.44028 0.84904 7.27815 1.09168 7.16754 1.35871C7.05693 1.62575 7 1.91196 7 2.201C7 2.49004 7.05693 2.77625 7.16754 3.04329C7.27815 3.31032 7.44028 3.55296 7.64466 3.75734C7.84904 3.96172 8.09168 4.12385 8.35871 4.23446C8.62575 4.34507 8.91196 4.402 9.201 4.402C9.78474 4.40187 10.3445 4.16985 10.7572 3.75699C11.1699 3.34413 11.4016 2.78424 11.4015 2.2005C11.4014 1.61676 11.1693 1.05698 10.7565 0.644304C10.3436 0.231631 9.78374 -0.000132534 9.2 5.68597e-08H9.201ZM2.201 5.68597e-08C1.91196 5.07687e-08 1.62575 0.0569305 1.35871 0.167541C1.09168 0.278152 0.84904 0.440276 0.644658 0.644658C0.440276 0.84904 0.278152 1.09168 0.167541 1.35871C0.0569305 1.62575 0 1.91196 0 2.201C0 2.49004 0.0569305 2.77625 0.167541 3.04329C0.278152 3.31032 0.440276 3.55296 0.644658 3.75734C0.84904 3.96172 1.09168 4.12385 1.35871 4.23446C1.62575 4.34507 1.91196 4.402 2.201 4.402C2.78474 4.40187 3.34452 4.16985 3.7572 3.75699C4.16987 3.34413 4.40163 2.78424 4.4015 2.2005C4.40137 1.61676 4.16935 1.05698 3.75649 0.644304C3.34363 0.231631 2.78474 -0.000132534 2.201 5.68597e-08ZM16.201 5.68597e-08C15.912 5.07687e-08 15.6258 0.0569305 15.3587 0.167541C15.0917 0.278152 14.849 0.440276 14.6447 0.644658C14.4403 0.84904 14.2782 1.09168 14.1675 1.35871C14.0569 1.62575 14 1.91196 14 2.201C14 2.49004 14.0569 2.77625 14.1675 3.04329C14.2782 3.31032 14.4403 3.55296 14.6447 3.75734C14.849 3.96172 15.0917 4.12385 15.3587 4.23446C15.6258 4.34507 15.912 4.402 16.201 4.402C16.7847 4.40187 17.3445 4.16985 17.7572 3.75699C18.1699 3.34413 18.4016 2.78424 18.4015 2.2005C18.4014 1.61676 18.1693 1.05698 17.7565 0.644304C17.3436 0.231631 16.7847 -0.000132534 16.201 5.68597e-08Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                      {/* view profile */}
                      <tr>
                        <div
                          id="defaultModal"
                          onClick={() => closeProfile(index)}
                          className={
                            !object.isPlayer
                              ? "hidden"
                              : " flex  mt-3  bg-black/0 justify-center items-center"
                          }
                        >
                          <div
                            id="defaultModal"
                            className={
                              !object.isPlayer
                                ? "hidden"
                                : " flex absolute right-0 mb-3 mt-3  z-50 w-[150px] h-[80px]   bg-white rounded-xl justify-center content-center items-center"
                            }
                          >
                            <div className="w-full ">
                              <h5 className="text-sm text-center  mb-2 mt-3  font-medium tracking-tight font-lexend  text-[#212121] ">
                                <NavLink to={{pathname: "/userarea/playerprofile/profile"}} state = {{ object }}>
                                  <a href="userarea/playerprofile/profile">
                                    View Profile
                                  </a>
                                </NavLink>
                              </h5>
                              <div className="border-b-2 w-full border-[#212121]/50" />

                              <h5
                                className="text-[#212121] text-center mt-3 mb-3  text-sm font-normal font-lexend cursor-pointer  "
                                onClick={() => setopenAddsubcatmodal(false)}
                              >
                                <NavLink to={"chat"}>
                                  <a href="/chat"> chat</a>
                                </NavLink>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </tr>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        {/* pagination */}
        <div className="flex items-center justify-end font-lexend">
          <h4 className="self-center text-xl font-normal whitespace-nowrap text-white mr-4 my-5 ">
            Page
          </h4>
          <div onClick={backPage}>
            <svg
              width="11"
              height="19"
              viewBox="0 0 11 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3725 0.3675C9.8825 -0.1225 9.0925 -0.1225 8.6025 0.3675L0.2925 8.6775C-0.0975 9.0675 -0.0975 9.6975 0.2925 10.0875L8.6025 18.3975C9.0925 18.8875 9.8825 18.8875 10.3725 18.3975C10.8625 17.9075 10.8625 17.1175 10.3725 16.6275L3.1325 9.3775L10.3825 2.1275C10.8625 1.6475 10.8625 0.8475 10.3725 0.3675Z"
                fill="white"
              />
            </svg>
          </div>

          <h4 className="self-center text-xl font-normal whitespace-nowrap text-white ml-3 mr-4 my-5 ">
            {currentPage}
          </h4>
          <div onClick={nextPage}>
            <svg
              width="11"
              height="19"
              viewBox="0 0 11 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.369687 0.3675C0.859687 -0.1225 1.64969 -0.1225 2.13969 0.3675L10.4497 8.6775C10.8397 9.0675 10.8397 9.6975 10.4497 10.0875L2.13969 18.3975C1.64969 18.8875 0.859687 18.8875 0.369687 18.3975C-0.120313 17.9075 -0.120313 17.1175 0.369687 16.6275L7.60969 9.3775L0.359689 2.1275C-0.120311 1.6475 -0.120313 0.8475 0.369687 0.3675Z"
                fill="white"
              />
            </svg>
          </div>

          <h4 className="self-center text-xl font-normal whitespace-nowrap text-white mx-4 my-5 ">
            out of {totalPages}
          </h4>
        </div>
      </div>
    </>
  );
}
