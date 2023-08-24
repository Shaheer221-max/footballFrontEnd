import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "../styles/player.css";
import "../styles/font.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { DatePicker } from "antd";
import getAge from "get-age";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import { Tabs } from "antd";
import { useEffect } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PlayerProfileCenterBox(props) {
  const [evaluation, setEvaluation] = React.useState([]);
  const [avg, setAvg] = React.useState(0);
  const [playerAttendence, setPlayerAttendence] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [activeKey, setActiveKey] = React.useState("1");
  const navigation = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [graphData, setGraphData] = useState();
  const [conversations, setConversations] = React.useState([]);
  const [conversationId, setConversationId] = React.useState();
  const [reportGraphData, setReportGraphData] = useState();
  const [graphSelectedMonth, setGraphSelectedMonth] = useState("Month");
  const [reportTableSkills, setReportTableSkills] = useState([]);
  const [filteredLabels, setFilteredLabels] = useState([]);

  const onChange = (key) => {
    setActiveKey(key);
    setGraphSelectedMonth("Month");
  };
  const getPlayerAttendence = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API}/attendance/GetAttendanceOfPlayer/${props?.data?.id}`
      )
      .then((res) => {
        setPlayerAttendence(res?.data?.data?.attendance);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

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

  const getBackgroundColor = (score) => {
    return score >= 2 ? "green" : "red";
  };

  const chartData1 = {
    labels:
      graphSelectedMonth !== "Month"
        ? graphSelectedMonth
        : filteredLabels?.map((month) => month.slice(0, 3)),
    datasets: [
      {
        label: reportGraphData?.length > 0 ? "Average Score" : "No Data Found",
        data: reportGraphData,
        backgroundColor: reportGraphData?.map((score) =>
          getBackgroundColor(score)
        ),
        hoverBackgroundColor: "white",
        borderWidth: 1,
        barThickness: 20, // Set the bar width to 20 pixels
      },
    ],
  };

  const MonthEnum = {
    Month: 0,
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  const monthOptions = Object.keys(MonthEnum).map((key) => key);

  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedReportMonth, setSelectedReportMonth] = useState("Month");
  const [selectedReportYear, setSelectedReportYear] = useState(null);
  const [selectedReportDate, setSelectedReportDate] = useState(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 + 1 },
    (_, index) => currentYear - index
  );

  // Filter report based on selectedYear
  const filteredReport = evaluation.filter((evalObject) => {
    if (selectedReportYear && selectedReportYear !== "Year") {
      const selectedYearInt = parseInt(selectedReportYear);
      const year = new Date(evalObject.date).getFullYear();
      if (year !== selectedYearInt) {
        return false;
      }
    }

    if (selectedReportMonth && selectedReportMonth !== "Month") {
      const selectedMonthIndex = monthOptions.indexOf(selectedReportMonth);
      const month = new Date(evalObject.date).getMonth() + 1;
      if (month !== selectedMonthIndex) {
        return false;
      }
    }

    if (selectedReportDate) {
      const reportDate = new Date(evalObject.date);

      const selectedYear = selectedReportDate.year();
      const selectedMonth = selectedReportDate.month();
      const selectedDay = selectedReportDate.date();

      const reportYear = reportDate.getFullYear();
      const reportMonth = reportDate.getMonth();
      const reportDay = reportDate.getDate();

      if (
        reportYear !== selectedYear ||
        reportMonth !== selectedMonth ||
        reportDay !== selectedDay
      ) {
        return false;
      }
    }

    return true;
  });

  // Filter playerAttendence based on selectedYear
  const filteredAttendence = playerAttendence.filter((attendanceObject) => {
    if (selectedYear && selectedYear !== "Year") {
      const selectedYearInt = parseInt(selectedYear);
      const year = new Date(attendanceObject.date).getFullYear();
      if (year !== selectedYearInt) {
        return false;
      }
    }

    if (selectedMonth && selectedMonth !== "Month") {
      const selectedMonthIndex = monthOptions.indexOf(selectedMonth);
      const month = new Date(attendanceObject.date).getMonth() + 1;
      if (month !== selectedMonthIndex) {
        return false;
      }
    }

    if (selectedDate) {
      const attendanceDate = new Date(attendanceObject.date);

      const selectedYear = selectedDate.year();
      const selectedMonth = selectedDate.month();
      const selectedDay = selectedDate.date();

      const attendanceYear = attendanceDate.getFullYear();
      const attendanceMonth = attendanceDate.getMonth();
      const attendanceDay = attendanceDate.getDate();

      if (
        attendanceYear !== selectedYear ||
        attendanceMonth !== selectedMonth ||
        attendanceDay !== selectedDay
      ) {
        return false;
      }
    }

    return true;
  });

  // Get Evaluation
  const getEvaluation = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/evaluation/ViewEvaluationsOfPlayer/${location?.state._id}`
    );
    // Calculate Average of Evaluation
    let sum = 0;
    for (let i = 0; i < response.data.data.length; i++) {
      sum += response.data.data[i].avgScore;
    }
    setAvg(sum / response.data.data.length);
    // // Create an object to store evaluation records with unique dates
    // const uniqueDatesData = {};

    // // Filter and add records to the uniqueDatesData object
    // response.data.data.forEach((evaluationObject) => {
    //   const date = new Date(evaluationObject.date).toDateString(); // Convert to a string to group by date only
    //   if (!uniqueDatesData[date]) {
    //     uniqueDatesData[date] = evaluationObject;
    //   }
    // });

    // // Convert the uniqueDatesData object values to an array
    // const uniqueDatesArray = Object.values(uniqueDatesData);
    // console.log('UNIQUE DATES ARRAT: ', uniqueDatesArray);
    setEvaluation(response.data.data);
  };

  React.useEffect(() => {
    getEvaluation();
    getPlayerAttendence();
  }, []);

  // Get All Conversations

  const getConversations = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/conversation/${location?.state._id}`
    );
    // Discard Duplicate Conversations
    const uniqueConversations = response.data.data.filter(
      (conversation, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.members[0]._id === conversation.members[0]._id &&
            t.members[1]._id === conversation.members[1]._id
        )
    );

    // Discard Conversations in which the current user is not a member
    const filteredConversations = uniqueConversations.filter((conversation) => {
      const user1 = conversation.members[0];
      const user2 = conversation.members[1];
      return user1._id === user._id || user2._id === user._id;
    });
    setConversations(filteredConversations);
  };
  React.useEffect(() => {
    getConversations();
  }, []);

  const createConversation = async () => {
    if (conversations.length === 0) {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/conversation/`,
        {
          senderId: user._id,
          receiverId: location?.state._id,
        }
      );
      navigation(`/chat/${response.data._id}`);
      setConversationId(response.data._id);
    } else {
      navigation(`/chat/${conversations[0]._id}`);
      setConversationId(conversations[0]._id);
    }
  };

  const location = useLocation();

  // Get Attendance
  const [attendanceData, setAttendanceData] = React.useState([]);
  const getAttendance = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API}/attendance/GetAttendanceOfPlayer/${location?.state._id}`
      )
      .then((response) => {
        const adata = response.data.data.attendance.map((items) => {
          const filteredRecords = items.attendance.filter(
            (record) => record.refOfPlayer === location?.state._id
          );
          return { ...items, attendance: filteredRecords };
        });

        setAttendanceData(adata);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getAttendance();
  }, []);

  const filterGraphData = (data, selectedMonth) => {
    if (selectedMonth !== "Month") {
      const filteredData = data.filter((record) => {
        const recordDate = new Date(record.date);

        const selectedMonthName = Object.keys(MonthEnum).find(
          (key) => MonthEnum[key] === recordDate.getMonth() + 1
        );

        return selectedMonthName === selectedMonth;
      });
      return filteredData;
    } else {
      return data;
    }
  };

  const calculateAttendanceDataByMonth = (data) => {
    const acc = data.reduce((acc, item) => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      const isPresent = item.attendance[0]?.isPresent || false;

      if (!acc[month]) {
        acc[month] = { present: 0, total: 0 };
      }

      acc[month].total++;

      if (isPresent) {
        acc[month].present++;
      }

      return acc;
    }, {});

    if (graphSelectedMonth === "Month") {
      // Iterate through months and add missing entries
      for (let month = 1; month <= 12; month++) {
        if (!acc[month]) {
          acc[month] = { present: 0, total: 0 };
        }
      }
    }
    return acc;
  };

  const calculateReportDataByMonth = (data) => {
    return data.reduce((acc, item) => {
      const date = new Date(item.date);
      const month = date.getMonth();

      if (!acc[month]) {
        acc[month] = { totalAvgScore: 0, totalReports: 0 };
      }

      acc[month].totalAvgScore += item.avgScore;
      acc[month].totalReports++;
      return acc;
    }, {});
  };

  const monthlyPercentages = (attendanceDataByMonth) => {
    return Object.values(attendanceDataByMonth).map(
      ({ present, total }) => (present / total) * 100
    );
  };

  const chartData = {
    labels:
      graphSelectedMonth !== "Month"
        ? graphSelectedMonth
        : labels.map((month) => month.slice(0, 3)),
    datasets: [
      {
        label:
          graphData?.length > 0 ? "Attendance Percentage" : "No Data Found",
        data: graphData,
        backgroundColor: graphData?.map((percentage) =>
          percentage >= 40 ? "green" : "red"
        ),
        hoverBackgroundColor: "white",
        borderWidth: 1,
        barThickness: 20,
      },
    ],
  };

  const monthlyReportPercentages = (ReportDataByMonth) => {
    return Object.values(ReportDataByMonth).map(
      ({ totalAvgScore, totalReports }) => totalAvgScore / totalReports
    );
  };

  //EVALUATION GRAPH DATA
  useEffect(() => {
    const filteredData = filterGraphData(evaluation, graphSelectedMonth);
    if (graphSelectedMonth !== "Month") {
      const monthlyReportData = calculateReportDataByMonth(filteredData);
      const percentage = monthlyReportPercentages(monthlyReportData);
      setReportGraphData(percentage);
    } else {
      const monthlyReportData = calculateReportDataByMonth(
        filteredData?.filter((report) => report.refOfSkill !== null)
      );
      const percentage = monthlyReportPercentages(monthlyReportData);
      setReportGraphData(percentage);
      const skillMonthNames = filteredData
        ?.filter((report) => report.refOfSkill !== null)
        .map((item) =>
          new Date(item.date).toLocaleString("default", { month: "long" })
        );
      // Filter unique month names
      const uniqueMonthNames = Array.from(new Set(skillMonthNames));
      // Filter and map the unique month names to month labels
      const filteredLabelstemp = labels?.filter((monthName) =>
        uniqueMonthNames.includes(monthName)
      );
      setFilteredLabels(filteredLabelstemp);
    }
  }, [graphSelectedMonth, evaluation]);

  useEffect(() => {
    const filteredData = filterGraphData(attendanceData, graphSelectedMonth);
    const monthlyAttendancePercentages =
      calculateAttendanceDataByMonth(filteredData);
    const percentage = monthlyPercentages(monthlyAttendancePercentages);
    setGraphData(percentage);
  }, [graphSelectedMonth, attendanceData]);

  const getChartOptions = () => {
    return {
      scales: {
        x: {
          grid: {
            display: true,
            borderColor: "gray",
            borderWidth: 1,
          },
        },
        y: {
          grid: {
            display: true,
            borderColor: "gray",
            borderWidth: 1,
          },
          ticks: {
            beginAtZero: true,
            stepSize: 20,
            min: 0,
            max: 100,
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      height: 225,
    };
  };

  const getGraphHeader = () => {
    return (
      <div className="flex justify-between font-dm text-base font-normal text-white/0.81">
        <div className="flex items-center justify-end space-x-2 p-0 pt-[15px]">
          <button
            style={{ width: "80px", fontSize: "14px", height: "31px" }}
            className="bg-gray-800 font-[12px] text-green-500 py-1 px-2 rounded-full border border-green-500"
            onClick={() => {
              setGraphSelectedMonth("Month");
            }}
          >
            All
          </button>
          <select
            style={{ fontSize: "14px" }}
            className="bg-gray-800 font-[12px] text-green-500 py-1 px-2 rounded-full border border-green-500"
            onChange={(event) => {
              setGraphSelectedMonth(event.target.value);
            }}
            value={graphSelectedMonth}
          >
            {monthOptions.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  const items = [
    {
      key: "1",
      label: "Attendance",
      children: (
        <div style={{ height: "225px", width: "360px" }}>
          <Bar data={chartData} options={getChartOptions()} />
        </div>
      ),
    },
    {
      key: "2",
      label: "Report",
      children: (
        <div style={{ height: "225px", width: "360px" }}>
          <Bar data={chartData1} options={getChartOptions()} />
        </div>
      ),
    },
    {
      key: activeKey === "1" ? "1" : "2", // Add a new key for the filters tab
      label: getGraphHeader(),
    },
  ];

  function formatDate(dateString) {
    const dateObj = new Date(dateString);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = dateObj.toLocaleDateString(undefined, options);

    return formattedDate;
  }

  function ConvertDateintoDay(dateString) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dateObj = new Date(dateString);
    const dayIndex = dateObj.getDay();

    return daysOfWeek[dayIndex];
  }
  useEffect(() => {
    if (filteredReport) {
      let uniqueSkills = [];
      // Loop through reference data
      for (const entry of filteredReport) {
        const skillName = entry.refOfSkill?.skillname; // Use optional chaining
        if (skillName && !uniqueSkills.includes(skillName)) {
          uniqueSkills.push(skillName);
        }
      }
      setReportTableSkills(uniqueSkills);
    }
  }, [filteredReport]);

  return (
    <>
      {/* picture card and Graph */}
      <div className="flex my-4 gap-3 mx-7 justify-between pt-7">
        <div
          className="background h-[300px] w-[350px]  rounded-lg border border-gray-400 "
          id="player"
          style={{
            backgroundImage: `url(${location?.state?.image})`,
            backgroundSize: "100% 100%",
            backgroundPosition: ".1px bottom, right",
            backgroundRepeat: "no-repeat, repeat",
            padding: "right 15",
          }}
        >
          <div className="flex pl-3  pt-2">
            <div className="flex   ">
              <div className="card">
                <div className="h-[65px]">
                  <h5 className=" text-left text-base  font-bold  text-white ">
                    {location?.state?.name?.split(" ")[0]}
                  </h5>
                  <span className="text-3xl font-black text-white">
                    {location?.state?.name.split(" ")[1]}
                  </span>
                </div>
                {/* <span>
                  <h1 className="text-2xl font-bold text-white">
                    {" "}
                   {props?.data?.name.toUpperCase()}
                  </h1>
                </span> */}
                <span>
                  <button
                    onClick={createConversation}
                    className="flex  mt-2 justify-center font-lexend items-center py-1  px-5 text-sm font-medium text-white bg-green-500 rounded-[4px] "
                  >
                    Chat
                  </button>
                </span>
                <span>
                  <div className="flex mt-[70px]">
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.1488 14.5327V11.1545L24.7363 9.23969C24.7921 9.21689 24.8421 9.18188 24.8825 9.13723C24.923 9.09258 24.9529 9.03943 24.9701 8.98169C24.9875 8.92339 24.9914 8.86192 24.9817 8.80188C24.9719 8.74184 24.9487 8.68479 24.9137 8.635L20.0762 1.78189C20.0656 1.76219 20.0534 1.74333 20.0399 1.72546C19.4909 1.17474 18.8379 0.738619 18.1189 0.442425C17.3998 0.146232 16.6291 -0.00412584 15.8515 8.61016e-05H14.9082C14.8012 8.61016e-05 14.6987 0.042558 14.6231 0.118158C14.5475 0.193759 14.505 0.296295 14.505 0.40321V1.20946C14.505 1.74403 14.2927 2.25671 13.9147 2.63472C13.5367 3.01272 13.024 3.22508 12.4894 3.22508C11.9548 3.22508 11.4422 3.01272 11.0642 2.63472C10.6862 2.25671 10.4738 1.74403 10.4738 1.20946V0.40321C10.4738 0.296295 10.4313 0.193759 10.3557 0.118158C10.2801 0.042558 10.1776 8.61016e-05 10.0707 8.61016e-05H9.12737C8.3508 -0.00252901 7.58144 0.148983 6.86385 0.445844C6.14627 0.742705 5.49472 1.17901 4.94697 1.72949C4.93347 1.74736 4.92134 1.76622 4.91069 1.78593L0.0732009 8.63903C0.0382463 8.68882 0.0150116 8.74587 0.00523771 8.80591C-0.00453619 8.86595 -0.000595872 8.92742 0.0167634 8.98572C0.0339768 9.04346 0.0639159 9.09662 0.104379 9.14126C0.144841 9.18591 0.194799 9.22092 0.250575 9.24372L4.83006 11.1545V22.9782C4.83006 23.0851 4.87254 23.1876 4.94814 23.2632C5.02374 23.3388 5.12627 23.3813 5.23319 23.3813H15.9724C16.5601 23.9957 17.2885 24.4579 18.0948 24.728C18.901 24.9981 19.7608 25.068 20.6001 24.9316C21.4394 24.7952 22.2328 24.4567 22.9121 23.9452C23.5913 23.4337 24.1358 22.7646 24.4987 21.9957C24.8617 21.2268 25.032 20.3811 24.9952 19.5316C24.9583 18.6821 24.7153 17.8544 24.2871 17.1198C23.859 16.3852 23.2585 15.7658 22.5375 15.3151C21.8165 14.8644 20.9967 14.5959 20.1488 14.5327ZM23.9059 18.2334L21.8903 18.5236L20.1488 17.1409V15.339C20.9848 15.4162 21.7817 15.7293 22.4468 16.2417C23.1119 16.7541 23.6179 17.4447 23.9059 18.2334ZM20.6809 20.9625H18.8265L18.2017 19.088L19.7457 17.8504L21.2896 19.088L20.6809 20.9625ZM15.3113 19.7532C15.3122 19.5072 15.3338 19.2618 15.3758 19.0195L17.4277 19.3097L18.0848 21.285L16.7222 22.9782C16.2778 22.5666 15.9231 22.0677 15.6804 21.5128C15.4376 20.9579 15.3119 20.3589 15.3113 19.7532ZM19.3425 14.5126C18.787 14.5603 18.2427 14.6964 17.73 14.9157V14.307C17.7275 12.5868 18.2945 10.9141 19.3425 9.55009V14.5126ZM19.3425 15.3188V17.1208L17.6131 18.5438L15.5975 18.2535C15.8815 17.4629 16.3843 16.7691 17.0473 16.2531C17.7103 15.7371 18.5063 15.4201 19.3425 15.339V15.3188ZM20.1488 10.2797V3.28555L23.9623 8.69144L20.1488 10.2797ZM1.01651 8.69144L4.83006 3.28555V10.2797L1.01651 8.69144ZM5.63631 9.55009C6.68438 10.9141 7.25138 12.5868 7.24881 14.307V22.575H5.63631V9.55009ZM8.05506 22.575V14.307C8.05914 12.0703 7.19152 9.92002 5.63631 8.3125V2.18502C6.58039 1.29517 7.83003 0.80167 9.12737 0.806334H9.66755V1.20946C9.66755 1.95786 9.96486 2.67562 10.4941 3.20482C11.0233 3.73402 11.741 4.03133 12.4894 4.03133C13.2378 4.03133 13.9556 3.73402 14.4848 3.20482C15.014 2.67562 15.3113 1.95786 15.3113 1.20946V0.806334H15.8515C17.1488 0.80167 18.3984 1.29517 19.3425 2.18502V8.3125C17.7873 9.92002 16.9197 12.0703 16.9238 14.307V15.343C15.7552 16.0923 14.9316 17.2746 14.6338 18.6305C14.336 19.9864 14.5884 21.405 15.3355 22.575H8.05506ZM17.3592 23.4821L18.7298 21.7688H20.7454L22.116 23.4821C21.4052 23.9424 20.5764 24.1874 19.7295 24.1874C18.8826 24.1874 18.0538 23.9424 17.343 23.4821H17.3592ZM22.7691 22.9782L21.4065 21.285L22.0636 19.3097L24.1155 19.0195C24.2395 19.7393 24.1812 20.4786 23.946 21.1701C23.7108 21.8616 23.3062 22.4832 22.7691 22.9782Z"
                        fill="#1DB954"
                      />
                    </svg>
                    <p className="text-[#7E7E7E] text-sm font-lexend mt-2 ml-2">
                      {location?.state?.position}
                    </p>
                  </div>
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-1 ml-1 pr-10  items-center font-['lexend'] sticky top-[300px]">
            <div className="flex-1 m-2 py-2 w-20 bg-gradient-to-b from-[#3e3e3e]/40 to-[#000000]/40 rounded-lg">
              <h5 className="text-xs ml-2 font-medium leading-5 tracking-tight text-green-500">
                Age
              </h5>
              <p className=" text-sm font-medium mt-2 pr-2 pb-2 ml-3 text-white ">
                {/* {getAge} */}
                {getAge(location?.state?.dateOfBirth?.split("T")[0])}
              </p>
            </div>
            <div className="flex-1 m-2 py-2 w-20 bg-gradient-to-b from-[#3e3e3e]/40 to-[#000000]/40 rounded-lg">
              <h5 className="text-xs ml-2 font-medium leading-5 tracking-tight text-green-500 ">
                Avg
              </h5>
              <p className=" text-sm font-medium mt-2 ml-3 pr-2 pb-2 text-white ">
                {Math.round(avg)}
              </p>
            </div>
            <div className="flex-1 m-2 py-2 w-20 bg-gradient-to-b from-[#3e3e3e]/40 to-[#000000]/40 rounded-lg ">
              <h5 className="text-xs ml-2 font-medium leading-5 tracking-tight text-green-500 ">
                Height
              </h5>
              <p className=" text-sm font-medium mt-2 ml-3 pr-2 pb-2 text-white ">
                {location?.state?.height}ft
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-[400px] 2xl:w-[800px] rounded-lg border border-gray-400 ">
          {/* tabs  */}
          <div className="flex justify-left text-sm font-normal font-lexend text-center text-gray-500 m-3">
            <ul className="flex flex-wrap -mt-[20px]">
              <li>
                <Tabs
                  defaultActiveKey="1"
                  items={items}
                  onChange={onChange}
                  className="text-white"
                />
              </li>
            </ul>
          </div>
          <div>
            {/* <Line options={options} data={data} className="font-lexend" /> */}
          </div>
        </div>
      </div>

      {activeKey === "1" ? (
        <div className="overflow-x-auto   font-lexend relative mx-7 my-5 font-dm rounded-xl">
          <div className="flex justify-between font-dm text-base font-normal text-white/0.81 bg border-[#7E7E7E] bg-gradient-to-r from-[#2F2F2F]/100 to-[#3A3A3A]/0 border-b">
            <h1
              style={{ fontSize: "20px" }}
              scope="col"
              className="py-3 pl-6 flex justify-start text-white"
            >
              Attendance
            </h1>

            <div className="py-3 pl-3">
              <div className="flex items-center justify-end space-x-2">
                <select
                  style={{ fontSize: "14px" }}
                  className="bg-gray-800 font-[12px] text-green-500 py-1 px-2 rounded-full border border-green-500"
                  onChange={(event) =>
                    setSelectedYear(
                      event.target.value === "Year"
                        ? null
                        : parseInt(event.target.value)
                    )
                  }
                  value={selectedYear || "Year"}
                >
                  <option className="font-[12px]" value="Year">
                    Year
                  </option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <DatePicker
                  className=" text-green-500  bg-gray-800  py-1 px-2 rounded-full border border-green-500"
                  onChange={(date) => setSelectedDate(date)}
                  value={selectedDate}
                />

                <button
                  style={{ width: "80px", fontSize: "14px" }}
                  className="bg-gray-800 font-[12px] text-green-500 py-1 px-2 rounded-full border border-green-500"
                  onClick={() => {
                    setSelectedYear("Year");
                    setSelectedMonth("Month");
                    setSelectedDate(null);
                  }}
                >
                  All
                </button>
                <select
                  style={{ fontSize: "14px" }}
                  className="bg-gray-800 font-[12px] text-green-500 py-1 px-2 rounded-full border border-green-500"
                  onChange={(event) => setSelectedMonth(event.target.value)}
                  value={selectedMonth}
                >
                  {monthOptions.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <table className="font-dm w-full text-sm text-left text-white  bg-gradient-to-r from-[#2F2F2F]/100 to-[#3A3A3A]/0 ">
            <thead className=" font-dm text-base font-normal text-white/0.81 border-[#7E7E7E] border-b">
              <tr className="text-center font-DM-sans">
                <th scope="col" className="py-3 pl-6 flex justify-start">
                  Date
                </th>
                <th scope="col" className="py-3 pl-3">
                  Day
                </th>
                <th scope="col" className="py-3 pl-3">
                  Status
                </th>
                {/* <th scope="col" className="py-3 pl-3 justify-center">
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody>
              {filteredAttendence.length > 0 &&
                filteredAttendence
                .reverse()
                  .slice(0, showAll ? filteredAttendence.length : 6) // Display all or first 6 records
                  
                  .map((attendanceObject, index) => {
                    return (
                      <>
                        <tr className="font-dm border-[#7E7E7E] border-b text-center">
                          <td className="py-3 text-green-500 pl-6 flex justify-start">
                            {formatDate(attendanceObject?.date)}{" "}
                          </td>

                          <td className="py-4 font-lexend">
                            {ConvertDateintoDay(attendanceObject?.date)}
                          </td>
                          <td
                            className={`py-4 font-lexend ${
                              attendanceObject?.attendance[0]?.isPresent
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {attendanceObject?.attendance[0]?.isPresent
                              ? "Present"
                              : "Absent"}
                          </td>
                          {/* <td className="py-4 font-lexend flex text-green-500 justify-center cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pencil-fill"
                              viewBox="0 0 16 16"
                            >
                              {" "}
                              <path
                                d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                                fill="#118d1f"
                              ></path>{" "}
                            </svg>
                          </td> */}
                        </tr>
                      </>
                    );
                  })}
            </tbody>

            <tr>
              <td>
                {filteredAttendence.length === 0 && (
                  <div className="flex justify-center mt-3 w-full h-96 pl-[7px]">
                    <p className="text-[#818181] font-dm font-normal text-lg">
                      No results Found
                    </p>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                {filteredAttendence.length > 6 && (
                  <div className="flex justify-center m-3 w-full ">
                    <button
                      className="font-[12px] cursor-pointer text-blue-500 underline"
                      onClick={() => setShowAll(!showAll)} // Toggle the showAll state
                    >
                      {showAll ? "Show Less" : "Show More"}
                    </button>
                  </div>
                )}
              </td>
            </tr>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto font-lexend relative mx-7 my-5 font-dm rounded-xl">
          <div className="flex justify-between font-dm w-[800px]  text-base font-normal text-white/0.81 bg border-[#7E7E7E] bg-gradient-to-r from-[#2F2F2F]/100 to-[#3A3A3A]/0 border-b  overflow-x-auto">
            <h1
              style={{ fontSize: "20px" }}
              scope="col"
              className="py-3 pl-6 flex justify-start text-white"
            >
              Report
            </h1>

            <div className="py-3 pl-3 mr-[80px]">
              <div className="flex items-center justify-end space-x-2">
                <select
                  style={{ fontSize: "14px" }}
                  className="bg-gray-800 font-[12px] text-green-500 py-1 px-2 rounded-full border border-green-500"
                  onChange={(event) =>
                    setSelectedReportYear(
                      event.target.value === "Year"
                        ? null
                        : parseInt(event.target.value)
                    )
                  }
                  value={selectedReportYear || "Year"}
                >
                  <option className="font-[12px]" value="Year">
                    Year
                  </option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <DatePicker
                  className=" text-green-500  bg-gray-800  py-1 px-2 rounded-full border border-green-500"
                  onChange={(date) => setSelectedReportDate(date)}
                  value={selectedReportDate}
                />

                <button
                  style={{ width: "80px", fontSize: "14px" }}
                  className="bg-gray-800 font-[12px] text-green-500 py-1 px-2 rounded-full border border-green-500"
                  onClick={() => {
                    setSelectedReportYear("Year");
                    setSelectedReportMonth("Month");
                    setSelectedReportDate(null);
                  }}
                >
                  All
                </button>
                <select
                  style={{ fontSize: "14px" }}
                  className="bg-gray-800 font-[12px] text-green-500 py-1 px-2 rounded-full border border-green-500"
                  onChange={(event) =>
                    setSelectedReportMonth(event.target.value)
                  }
                  value={selectedReportMonth}
                >
                  {monthOptions.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <table className="font-dm w-[800px] text-sm text-left text-white  bg-gradient-to-r from-[#2F2F2F]/100 to-[#3A3A3A]/0 overflow-x-auto ">
            <thead className=" font-dm text-base font-normal text-white/0.81 border-[#7E7E7E] border-b">
              <tr className="text-center font-DM-sans">
                <th
                  scope="col"
                  className="py-3 pl-6 flex justify-start w-[100px]"
                >
                  Date
                </th>
                <th scope="col" className="py-3 pl-3 w-[100px]">
                  Day
                </th>
                {reportTableSkills.map((skill, index) => (
                  <th
                    scope="col"
                    className="py-3 pl-3 justify-center"
                    key={index}
                  >
                    {skill}
                  </th>
                ))}
                {/* <th scope="col" className="py-3 pl-3 justify-center">
                  Comments
                </th> */}
              </tr>
            </thead>
            <tbody>
              {filteredReport.length > 0 &&
                filteredReport
                  .filter((report) => report.refOfSkill !== null)
                  .reverse()
                  .slice(0, showAll ? filteredReport.length : 6)
                  .map((evaluationObject, index) => {
                    return (
                      <tr className="font-dm border-[#7E7E7E] border-b text-center">
                        <td className="py-4 text-green-500 pl-6 flex justify-start">
                          {formatDate(evaluationObject?.date)}{" "}
                        </td>
                        <td className="py-4 font-lexend">
                          {ConvertDateintoDay(evaluationObject?.date)}
                        </td>
                        {reportTableSkills.map((skill, skillIndex) => (
                          <td key={skillIndex}>
                            {evaluationObject.refOfSkill?.skillname === skill
                              ? evaluationObject.avgScore.toFixed(1)
                              : "-"}
                          </td>
                        ))}
                        {/* <td className="text-blue-500 underline">
                          {" "}
                          View Comments
                        </td> */}
                      </tr>
                    );
                  })}
            </tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                {filteredReport.filter((report) => report.refOfSkill !== null)
                  .length === 0 && (
                  <div className="flex justify-center mt-3 w-[full] h-96 pl-[7px]">
                    <p className="text-[#818181] font-dm font-normal text-lg">
                      No results Found
                    </p>
                  </div>
                )}
              </td>
              <td></td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                {filteredReport.filter((report) => report.refOfSkill !== null)
                  .length > 6 && (
                  <div className="flex justify-center m-3 w-full ">
                    <button
                      className="font-[12px] cursor-pointer text-blue-500 underline"
                      onClick={() => setShowAll(!showAll)} // Toggle the showAll state
                    >
                      {showAll ? "Show Less" : "Show More"}
                    </button>
                  </div>
                )}
              </td>
            </tr>
          </table>
        </div>
      )}
      {/* Pictures */}
      {/* <div className="flex gap-4 my-9 ml-7">
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
      </div> */}
      {/* Desciption */}
      {/* <div className="mx-5 my-5">
        <h5 className=" text-xl pb-4 font-medium font-lexend  text-white">
          About me
        </h5>
        <span className=" text-lg justify-evenly font-normal font-lexend  text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          fermentum tristique mollis. Donec porta purus sed arcu feugiat
          sagittis. Sed tristique eget turpis a feugiat. amet, consectetur
          adipiscing elit. Suspendisse fermentum tristique
        </span>
      </div> */}
    </>
  );
}
