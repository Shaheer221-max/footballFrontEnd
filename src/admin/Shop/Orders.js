import React from "react";
import DashboardSidebar from "./dashboardRightSidebar";
import Header from "../../Components/Header";
import "../../styles/font.css";
import Download from "../../assets/Download.png";
import axios from "axios";

export default function Orders() {
  // chart
  const staticdata = [
    {
      id: 25,
    },
    {
      id: 21,
    },
    {
      id: 30,
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

  // Get All Orders
  const [orders, setOrders] = React.useState([]);

  const getOrders = async () => {
    try {
      const response = await axios.get("https://football-backend-updated.herokuapp.com/AdminOrderNotification/getNotification");
      console.log(response.data.data)
      setOrders(response.data.data);
    } catch (error) {
    }
  };

  React.useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div className="flex-col w-full">
        {/* Page Header */}
        <Header title={"All Orders"} />

        <div className="flex  divide-x xl:w-full ">
          {/* Upload Of user  */}
          <div className="w-full pr-12">
            <h3 className="text-xl font-medium text-white font-lexend whitespace-nowrap  ml-9 mt-[32px]">
              {" "}
              Orders
            </h3>

            {/*head  */}
            <div className="flex">
              <div className="flex-1 grow-1">
                {/* search button */}
                <form className="flex items-center w-1/2 ml-9 mt-4">
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
                      className="bg-[#212121]  text-white  text-sm rounded-lg block w-full pl-10 p-2.5   border-gray-600 placeholder-gray-400  placeholder-lexend text-lexend focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search Orders"
                      required=""
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center font-lexend py-2 px-5 ml-4 text-sm font-normal text-white bg-green-500 rounded-[4px] "
                  >
                    Search
                  </button>
                </form>
              </div>
              <div className="flex-1 grow-0">
                <button
                  type="submit"
                  className="  items-center py-2 px-5 ml-4 text-sm font-normal bg-[#E7E7E7] rounded-[4px] "
                >
                  <div className="flex">
                    <div className="flex-1">Latest</div>
                    <div className="flex-1 pt-1.5 pl-3">
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.090625 0.772277L0.146875 0.837937L4.39687 5.73111C4.54063 5.89682 4.75625 6 4.99687 6C5.2375 6 5.45312 5.89369 5.59688 5.73111L9.84375 0.847317L9.91562 0.766024C9.96875 0.687858 10 0.59406 10 0.494007C10 0.221991 9.76875 0 9.48125 0H0.51875C0.23125 0 0 0.221991 0 0.494007C0 0.597186 0.034375 0.694111 0.090625 0.772277Z"
                          fill="#0C0E14"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              <div className="flex-1 grow-0">
                <button
                  type="submit"
                  className=" items-center py-2 px-5 ml-4 text-sm font-normal text-white bg-green-500 rounded-[4px] "
                >
                  Done
                </button>
              </div>
            </div>

            {/* Latest Orders  */}
            <div className="ml-6 p-3">
              <table className=" w-full text-md text-center justify-items-center text-white items-center">
                <thead className=" text-base font-sm text-[#7E7E7E] border-b border-[#7E7E7E]  border-b">
                  <tr className="text-center ">
                    <th scope="col" className="py-3 ">
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
                    <th scope="col" className="py-3">
                      Invoice
                    </th>
                    <th scope="col" className="py-3 pl-1">
                      Status
                    </th>
                  </tr>
                </thead>

                {orders.map((val, ind) => (
                  <tbody>
                    <tr className="text-center border-b border-[#7E7E7E] justify-items-center">
                      <th
                        scope="row"
                        className="py-4 px-3 font-medium whitespace-nowrap text-white"
                      >
                        {val.refOfCustomerNotification.createdAt.split("T")[0]}
                      </th>
                      <td className="py-4 pl-4 ">
                        <div className="flex gap-2 justify-center">{val.refOfCustomerNotification.refOfCustomer.name}</div>
                      </td>
                      <td className="py-4 ">£{val?.refOfCustomerNotification?.price}</td>
                      <td className="py-4 ">{val?.refOfCustomerNotification?.refOfProduct?.productname}</td>
                      <td className="py-4 ">{val?.refOfCustomerNotification?.quantity}</td>
                      <td className="py-4 mx-auto">
                        <div>
                          <img className="mx-auto" src={Download} />
                        </div>
                      </td>
                      <td className="py-4 ">
                        <button
                          className=" text-white bg-green-500 m-4 text-sm  text-lexend w-40  justify-center focus:outline-none font-normal rounded-[4px]  px-4 py-2 text-center inline-flex items-center"
                          type="button"
                        >
                          {val?.refOfCustomerNotification?.status}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
            {/* Side bar */}
          </div>

          {/*skill cards */}
          <div className=" xl:w-4/12 border-[#7E7E7E]">
            <div className="ml-10 mr-10  2xl:grid 2xl:grid-cols-1 ">
              return <DashboardSidebar />;
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
