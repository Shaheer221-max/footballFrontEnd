import React from "react";
import Header from "../../Components/Header";
import "../../styles/font.css";
import axios from "axios";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

// Import React Icons
import { CiLocationOn } from "react-icons/ci";

export default function Orders() {
  // chart
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Get All Orders
  const [orders, setOrders] = React.useState([]);
  const [newFolder, setNewFolder] = React.useState(false);
  const [name, setName] = React.useState(false);
  const [email, setEmail] = React.useState(false);
  const [itemName, setItemName] = React.useState(false);
  const [price, setPrice] = React.useState(false);
  const [address, setAddress] = React.useState(false);
  const [image, setImage] = React.useState(false);
  const [productImage, setProductImage] = React.useState(false);
  const [orderDate, setOrderDate] = React.useState(false);
  const [quantity, setquantity] = React.useState(false);
  const [pQuantity, setPQuantity] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [searchOrder, setSearchOrder] = React.useState("");

  const getOrderData = (val) => {
    console.log(val);
    setNewFolder(true);
    setName(val?.refOfCustomer?.name);
    setEmail(val?.refOfCustomer?.email);
    setImage(val?.refOfCustomer?.image);
    setItemName(val?.refOfProduct?.productname);
    setPrice(val?.price);
    setAddress(val?.deliveryAddress);
    setProductImage(val?.refOfProduct?.coverphoto);
    setOrderDate(val?.createdAt);
    setquantity(val?.quantity);
    setPQuantity(val?.refOfProduct?.quantity);
  };

  const getOrders = async () => {
    try {
      const response = await axios.get(
        "https://football-backend-updated.herokuapp.com/AdminOrderNotification/getNotification"
      );
      console.log(response.data.data);
      setOrders(response.data.data);
    } catch (error) {}
  };

  React.useEffect(() => {
    getOrders();
  }, []);

  const searching = (search) => {
    setSearch(search);
    console.log(
      orders.filter((val) =>
        val.refOfCustomerNotification.refOfCustomer.name
          .toUpperCase()
          .startsWith(search.toUpperCase())
      )
    );
    setSearchOrder(
      orders.filter((val) =>
        val.refOfCustomerNotification.refOfCustomer.name
          .toUpperCase()
          .startsWith(search.toUpperCase())
      )
    );
  };

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
                      onChange={(e) => searching(e.target.value)}
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
              {/* <div className="flex-1 grow-0">
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
              </div> */}
            </div>

            {/* Latest Orders  */}
            <div className="ml-6 p-3">
              <table className=" w-full text-md text-center justify-items-center text-white items-center">
                <thead className=" text-base font-sm text-[#7E7E7E] border-b border-[#7E7E7E]  border-b">
                  <tr className="text-center ">
                    <th scope="col" className="py-3 ">
                      Order Id
                    </th>
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
                    {/* <th scope="col" className="py-3 pl-2">
                      Size
                    </th>
                    <th scope="col" className="py-3 pl-2">
                      Color
                    </th> */}
                    <th scope="col" className="py-3 pl-2">
                      Qty
                    </th>
                    <th scope="col" className="py-3">
                      Receipt
                    </th>
                    <th scope="col" className="py-3 pl-1">
                      Status
                    </th>
                  </tr>
                </thead>

                {search === "" ? (
                  orders.length > 0 ? (
                    orders.map((val, ind) => (
                      <tbody>
                        <tr className="text-center border-b border-[#7E7E7E] justify-items-center">
                          <td className="py-4 ">
                            {val?.refOfCustomerNotification?._id.slice(20)}
                          </td>
                          <th
                            scope="row"
                            className="py-4 px-3 font-medium whitespace-nowrap text-white"
                          >
                            {
                              val.refOfCustomerNotification.createdAt.split(
                                "T"
                              )[0]
                            }
                          </th>
                          <td className="py-4 pl-4 ">
                            <div className="flex gap-2 justify-center">
                              {val.refOfCustomerNotification.refOfCustomer.name}
                            </div>
                          </td>
                          <td className="py-4 ">
                            £{val?.refOfCustomerNotification?.price}
                          </td>
                          <td className="py-4 ">
                            {
                              val?.refOfCustomerNotification?.refOfProduct
                                ?.productname
                            }
                          </td>
                          {/* <td className="py-4 ">{val?.refOfCustomerNotification?.refOfProduct?.size}</td> */}
                          {/* <td className="py-4 ">{val?.refOfCustomerNotification?.refOfProduct?.color}</td> */}
                          <td className="py-4 ">
                            {val?.refOfCustomerNotification?.quantity}
                          </td>
                          <td className="py-4 mx-auto">
                            <div>
                              <button
                                onClick={() => {
                                  getOrderData(val.refOfCustomerNotification);
                                }}
                                className="bg-blue-500 rounded-md pl-3 pr-3 pt-1 pb-1"
                              >
                                View
                              </button>
                            </div>
                          </td>
                          <td className="py-4 ">
                            {val?.refOfCustomerNotification?.status ===
                            "Pending" ? (
                              <button
                                className=" text-black bg-white m-4 text-sm  text-lexend w-40  justify-center focus:outline-none font-normal rounded-[4px]  px-4 py-2 text-center inline-flex items-center"
                                type="button"
                                id="basic-button"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                              >
                                {val?.refOfCustomerNotification?.status}
                              </button>
                            ) : val?.refOfCustomerNotification?.status ===
                              "Cancelled" ? (
                              <button
                                className=" text-white bg-red-500 m-4 text-sm  text-lexend w-40  justify-center focus:outline-none font-normal rounded-[4px]  px-4 py-2 text-center inline-flex items-center"
                                type="button"
                                id="basic-button"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                              >
                                {val?.refOfCustomerNotification?.status}
                              </button>
                            ) : (
                              <button
                                className=" text-white bg-green-500 m-4 text-sm  text-lexend w-40  justify-center focus:outline-none font-normal rounded-[4px]  px-4 py-2 text-center inline-flex items-center"
                                type="button"
                                id="basic-button"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                              >
                                {val?.refOfCustomerNotification?.status}
                              </button>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    ))
                  ) : (
                    <div className="flex justify-center items-center">
                      <h1 className="text-white text-2xl font-bold">
                        No Orders
                      </h1>
                    </div>
                  )
                ) : orders.length > 0 ? (
                  orders.map((val, ind) => (
                    <tbody>
                      <tr className="text-center border-b border-[#7E7E7E] justify-items-center">
                        <td className="py-4 ">
                          {val?.refOfCustomerNotification?._id.slice(20)}
                        </td>
                        <th
                          scope="row"
                          className="py-4 px-3 font-medium whitespace-nowrap text-white"
                        >
                          {
                            val.refOfCustomerNotification.createdAt.split(
                              "T"
                            )[0]
                          }
                        </th>
                        <td className="py-4 pl-4 ">
                          <div className="flex gap-2 justify-center">
                            {val.refOfCustomerNotification.refOfCustomer.name}
                          </div>
                        </td>
                        <td className="py-4 ">
                          £{val?.refOfCustomerNotification?.price}
                        </td>
                        <td className="py-4 ">
                          {
                            val?.refOfCustomerNotification?.refOfProduct
                              ?.productname
                          }
                        </td>
                        {/* <td className="py-4 ">{val?.refOfCustomerNotification?.refOfProduct?.size}</td> */}
                        {/* <td className="py-4 ">{val?.refOfCustomerNotification?.refOfProduct?.color}</td> */}
                        <td className="py-4 ">
                          {val?.refOfCustomerNotification?.quantity}
                        </td>
                        <td className="py-4 mx-auto">
                          <div>
                            <button
                              onClick={() => {
                                getOrderData(val.refOfCustomerNotification);
                              }}
                              className="bg-blue-500 rounded-md pl-3 pr-3 pt-1 pb-1"
                            >
                              View
                            </button>
                          </div>
                        </td>
                        <td className="py-4 ">
                          {val?.refOfCustomerNotification?.status ===
                          "Pending" ? (
                            <button
                              className=" text-black bg-white m-4 text-sm  text-lexend w-40  justify-center focus:outline-none font-normal rounded-[4px]  px-4 py-2 text-center inline-flex items-center"
                              type="button"
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClick}
                            >
                              {val?.refOfCustomerNotification?.status}
                            </button>
                          ) : val?.refOfCustomerNotification?.status ===
                            "Cancelled" ? (
                            <button
                              className=" text-white bg-red-500 m-4 text-sm  text-lexend w-40  justify-center focus:outline-none font-normal rounded-[4px]  px-4 py-2 text-center inline-flex items-center"
                              type="button"
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClick}
                            >
                              {val?.refOfCustomerNotification?.status}
                            </button>
                          ) : (
                            <button
                              className=" text-white bg-green-500 m-4 text-sm  text-lexend w-40  justify-center focus:outline-none font-normal rounded-[4px]  px-4 py-2 text-center inline-flex items-center"
                              type="button"
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClick}
                            >
                              {val?.refOfCustomerNotification?.status}
                            </button>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  ))
                ) : (
                  <div className="flex justify-center mt-3 w-full h-96">
                    <p className="text-[#818181] font-dm font-normal text-lg">
                      Loading ...
                    </p>
                  </div>
                )}
              </table>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <FormControlLabel
                    value="pending"
                    label="Pending"
                    control={<Radio size="small" />}
                  />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <FormControlLabel
                    value="delivered"
                    control={<Radio size="small" />}
                    label="Delivered"
                  />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <FormControlLabel
                    value="cancelled"
                    control={<Radio size="small" />}
                    label="Cancelled"
                  />
                </MenuItem>
              </Menu>
            </div>
            {/* Side bar */}
          </div>

          {/*skill cards */}
          <div className=" xl:w-4/12 border-[#7E7E7E]">
            <div className="ml-10 mr-10  2xl:grid 2xl:grid-cols-1 ">
              {/* return <DashboardSidebar />; */}
            </div>
          </div>
        </div>
      </div>

      <div
        id="defaultModal"
        className={
          !newFolder
            ? "hidden"
            : " flex absolute top-0 right-0 left-0 z-50 w-full h-full  bg-black/70  bg-opacity-5 justify-center items-center"
        }
      >
        <div className="relative w-full max-w-lg  ">
          <div className="relative bg-[#212121] rounded-2xl py-2">
            <div
              className="flex align-middle border-b pb-3"
              style={{ borderSpacing: 20 }}
            >
              <h5 className="text-white pl-3">Order Receipt</h5>
              <button
                onClick={() => !setNewFolder(false)}
                type="button"
                className="text-gray-400 pr-3 bg-white bg-transparent rounded-full p-0.5 ml-auto flex items-center "
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
            </div>

            
              <>
                <div
                  className="justify-center p-3 border-b border-dashed"
                  style={{ borderSpacing: 40 }}
                >
                  <h3 className="text-sm text-left font-lexend font-bold text-white p-3.5">
                    Ordered By
                  </h3>
                  <div className="flex ml-3">
                    <img
                      src={image}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                    <div className="ml-3">
                      <p className="text-white text-xs pb-2">{name}</p>
                      <p className="text-gray-500 text-xs">{email}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between p-3 border-b border-dashed">
                  <div>
                    <h3 className="text-sm text-left font-lexend font-bold text-white p-3.5">
                      Product
                    </h3>
                    <div className="flex align-middle ml-3">
                      <img
                        src={productImage}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-3">
                        <p className="text-green-500 text-xs pb-1">
                          {itemName}
                        </p>
                        <p className="text-gray-500 text-xs pb-2">
                          {pQuantity > 0 ? "In Stock" : "Out of Stock"}
                        </p>
                        <p className="text-white text-xs">$ {price}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5">
                    <p className="text-white text-sm">Quantity</p>
                    <p className="text-gray-500 bg-black pl-2 pr-2 mt-3 rounded-md inline">
                      {quantity}
                    </p>
                  </div>
                </div>

                <div className="justify-center p-3 border-b border-dashed">
                  <h3 className="text-sm text-left font-lexend font-bold text-white p-3.5">
                    Delivery Address
                  </h3>
                  <div className="flex align-middle ml-3">
                    <div className="bg-black p-3">
                      <CiLocationOn className="text-white" />
                    </div>
                    {/* <img src={image} alt="" /> */}
                    <div className="ml-1 p-3">
                      <p className="text-white text-xs">{address}</p>
                      {/* <p>{email}</p> */}
                    </div>
                  </div>
                  <div className="ml-3 mt-3">
                    <p className="text-white text-sm pb-2">Date Ordered</p>
                    <p className="text-green-500 text-xs">
                      {orderDate?.split("T")[0]}
                    </p>
                  </div>
                </div>

                <div className="justify-center p-3">
                  <div className="flex justify-between align-middle">
                    <h3 className="ml-3 text-left font-lexend font-bold text-sm text-white">
                      Total Payment
                    </h3>
                    <p className="text-white text-sm">$ {price}</p>
                  </div>
                </div>
              </>
          </div>
        </div>
      </div>
    </>
  );
}
