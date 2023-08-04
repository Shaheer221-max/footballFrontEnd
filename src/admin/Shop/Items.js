import React, { useState, useEffect } from "react";
import ItemsRightSidebar from "./ItemsRightSideBar";
import Header from "../../Components/Header";
import "../../styles/font.css";
import Minus from "../../assets/Minus.png";
import { NavLink } from "react-router-dom";
import axios from "../../axios";
import Spinner from "../Spinner";
import { message } from "antd";

export default function Items() {
  const [allItems, setAllItems] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [searchItemCopy, setSearchItemCopy] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(false);
  const [quantity, setQuantity] = useState(false);
  const [status, setStatus] = useState(false);
  const [price, setPrice] = useState(false);
  const [id, setId] = useState(false);
  const [order, setOrder] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    data();
    getOrder();
  }, [refresh]);

  const data = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/item/GetAllItems`)
      .then((res) => {
        console.log(res.data.data.doc.reverse());
        setAllItems(res.data.data.doc.reverse());
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getOrder = async() => {
    const response = await axios.get(`${process.env.REACT_APP_API}/AdminOrderNotification/getNotification`);
    console.log(response.data.data);
    setOrder(response.data.data);
  };



  // searching
  const handleSearchChange = (event) => {
    setSearchItem(event.target.value);
    searchInItem();
  };

  const searchInItem = () => {
    console.log(allItems.filter((val) => val.productname.startsWith(searchItem)));
    setSearchItemCopy(allItems.filter((val) => val.productname.startsWith(searchItem)));
  };

  const checkNames = (val) => {
    if (val.name.toUpperCase().includes(searchItem.toUpperCase())) {
      return val.name;
    }
  };

  // adding members in the group
  const additem = (index) => {
    let arr = [...allItems];
    arr.map((val, ind) => {
      if (val.isitem === true) {
        val.isitem = false;
      }
    });
    arr[index].isitem = true;
    setAllItems(arr);
    Item(index);
  };

  const Item = (ind) => {
    setName(allItems[ind].name);
    setImage(allItems[ind].image);
    setQuantity(allItems[ind].quantity);
    setPrice(allItems[ind].price);
    if (quantity !== 0) {
      setStatus("Available (In Stock)");
    } else {
      setStatus("Out of Stock");
    }
  };

  const deleteItem = async () => {
    setRefresh(true)
    await axios
      .delete(`${process.env.REACT_APP_API}/item/DeleteItem/${id}`)
      .then((res) => {
        message.success("Item Deleted Successfully");
        console.log(res.data);
        setRefresh(false)
      })
      .catch((error) => {
        message.error("Something went wrong");
        console.log(error.response.data);
      });
  };

  return (
    <>
      <div className="flex-col w-full">
        {/* Page Header */}
        <Header title={"All Items"} />

        <div className="flex  divide-x xl:w-full h-[calc(100vh-95px)] overflow-y-auto">
          {/* Upload Of user  */}
          <div className="w-full pr-12">
            <h3 className="text-xl font-medium text-white font-lexend whitespace-nowrap  ml-9 mt-[32px]">
              {" "}
              Items
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
                      className="bg-[#212121]  text-white  text-sm rounded-lg block w-full pl-10 p-2.5   border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search Items"
                      required=""
                      onChange={handleSearchChange}
                    />
                  </div>
                  <NavLink to="/allItems">
                    <button
                      type="submit"
                      className="inline-flex font-dm items-center font-lexend py-2 px-5 ml-4 text-sm font-normal text-white bg-green-500 rounded-[4px] "
                      onClick={searchInItem}
                    >
                      Search
                    </button>
                  </NavLink>
                </form>
              </div>

              <div className="flex-row grow-0 mt-2" style={{ display: "flex", alignItems: 'center' }}>
                
                <button
                  onClick={deleteItem}
                  type="submit"
                  className=" font-dm items-center w-32 py-2  ml-4 text-sm font-normal h-10 text-white bg-red-800 rounded-[4px] "
                >
                  Delete
                </button>

                <NavLink
                  to={"/allItems/addItem"}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center  text-base font-normal  rounded-lg border-2 border-green-500 border-line "
                      : "flex items-center text-base font-normal   rounded-lg border-dashed"
                  }
                >
                  <button
                    type="submit"
                    className=" font-dm items-center w-32 py-2  ml-4 text-sm font-normal text-white bg-green-500 rounded-[4px] "
                  >
                    Add Item
                  </button>
                </NavLink>
              </div>
            </div>

            {/* Latest Orders  */}
            <div className="ml-6 p-3 mt-10">
              <table className="font-dm w-full text-md text-center justify-items-center text-white items-center">
                <thead className=" font-dm text-base font-normal text-[#7E7E7E]  border-b border-[#7E7E7E]">
                  <tr className="text-center ">
                    <th scope="col" className="py-3 pl-3">
                      <div className="bg-[#DAD3FF] h-5 w-5 grid place-items-center rounded-md">
                        <div className="m-auto my-auto">
                          <img className="mx-auto " src={Minus} />
                        </div>
                      </div>
                    </th>
                    <th scope="col" className="py-3 pl-2">
                      Name
                    </th>
                    <th scope="col" className="py-3 pl-2">
                      Price
                    </th>
                    <th scope="col" className="py-3 pl-2">
                      Status
                    </th>
                    <th scope="col" className="py-3 pl-2">
                      Items Left
                    </th>
                    <th scope="col" className="py-3 pl-2">
                      Revenue
                    </th>
                    <th scope="col" className="py-3 pl-2">
                      Action
                    </th>
                  </tr>
                </thead>

                    {searchItemCopy.length > 0 || allItems.length > 0 ? searchItem !== '' ? (
                      // if searched
                      <>
                        {searchItemCopy.map((val, ind) => (
                          <tbody>
                            <tr className="font-dm text-center border-b border-[#7E7E7E] justify-items-center">
                              <th
                                scope="row"
                                className="py-4 px-3 font-medium whitespace-nowrap text-white"
                              >
                                {val.isitem === true ? (
                                  <>
                                    <div
                                      className="bg-[#DAD3FF] h-5 w-5 grid place-items-center rounded-md"
                                      onClick={() => {
                                        setId(val._id);
                                      }}
                                    >
                                      <div className="m-auto my-auto">
                                        <img className="mx-auto " src={Minus} />
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="bg-[#424242] h-5 w-5 grid place-items-center rounded-md"
                                    onClick={() => {
                                      setId(val._id);
                                      additem(ind);
                                    }}
                                  ></button>
                                )}
                              </th>
                              <td className="py-4 pl-8 ">
                                <div className="flex gap-2 items-center justify-center pl-3">
                                  <div className="flex">
                                    <div className="flex-1 rounded-md mr-6">
                                      <img
                                        className=" rounded-md w-10 h-10"
                                        src={val.coverphoto}
                                      />
                                    </div>
                                    <div className="p-3 ">
                                      <p>{val.productname}</p>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 ">£{val.price}</td>
                              {val.quantity !== 0 ? (
                                <>
                                  <td className="py-4 text-[#818181] ">
                                    Available
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="py-4 text-[#818181] ">
                                    Out of Stock
                                  </td>
                                </>
                              )}

                              <td className="py-4 ">{val.quantity}</td>
                              <td className="py-4 mx-auto">£ 0</td>
                              <td className="py-4 mx-auto">
                                <NavLink
                                to={{pathname:"/editItem"}} state={{ val }}
                                  className={({ isActive }) =>
                                    isActive
                                      ? "flex items-center  text-base font-normal  rounded-lg border-2 border-green-500 border-line "
                                      : "flex items-center text-base font-normal   rounded-lg border-dashed"
                                  }
                                >
                                  <button className="bg-E7E7E7 text-white">
                                    Edit Item
                                  </button>
                                </NavLink>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </>
                    ) : (
                      // if not searched
                      <>
                        {allItems?.map((val, ind) => (
                          <tbody>
                            <tr className="font-dm text-center border-b border-[#7E7E7E] justify-items-center">
                              <th
                                scope="row"
                                className="py-4 px-3 font-medium whitespace-nowrap text-white"
                              >
                                {val.isitem === true ? (
                                  <>
                                    <div
                                      className="bg-[#DAD3FF] h-5 w-5 grid place-items-center rounded-md"
                                      onClick={() => {
                                        setId(val._id);
                                      }}
                                    >
                                      <div className="m-auto my-auto">
                                        <img className="mx-auto " src={Minus} />
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="bg-[#424242] h-5 w-5 grid place-items-center rounded-md"
                                    onClick={() => {
                                      setId(val._id);
                                      additem(ind);
                                    }}
                                  ></button>
                                )}
                              </th>
                              <td className="py-4 pl-8 ">
                                <div className="flex gap-2 items-center justify-center pl-3">
                                  <div className="flex items-center">
                                    <div className="flex-1 rounded-md mr-6">
                                      <img
                                        className=" rounded-md w-10 h-10"
                                        src={val.coverphoto}
                                      />
                                    </div>
                                    <div className="p-3 ">
                                      <p>{val.productname}</p>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 ">£{val.price}</td>
                              {val.quantity !== 0 ? (
                                <>
                                  <td className="py-4 text-[#818181] ">
                                    Available
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="py-4 text-[#818181] ">
                                    Out of Stock
                                  </td>
                                </>
                              )}

                              <td className="py-4 ">{val.quantity}</td>
                              <td className="py-4 mx-auto">£ 0</td>
                              <td className="py-4 mx-auto">
                                <NavLink to={{pathname:"/editItem"}} state={{ val }}
                                  className={({ isActive }) =>
                                    isActive
                                      ? "flex items-center  text-base font-normal  rounded-lg border-2 border-green-500 border-line "
                                      : "flex items-center text-base font-normal   rounded-lg border-dashed"
                                  }
                                >
                                  <button className="bg-[#818181] text-white p-2 rounded-md">
                                    Edit Item
                                  </button>
                                </NavLink>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </>
                    ): <tbody>
                      <div className="flex justify-center mt-3 w-full h-96">
                        <p className="text-[#818181] font-dm font-normal text-lg">
                          Loading ....
                        </p>
                    </div>
                    </tbody>
                    }
              </table>
            </div>
            {/* Side bar */}
          </div>

          {/*skill cards */}
          <div className=" xl:w-4/12 border-[#7E7E7E]">
            <div className="ml-10 mr-10  2xl:grid 2xl:grid-cols-1 ">
              return{" "}
              <ItemsRightSidebar
                name={name}
                image={image}
                quantity={quantity}
                price={price}
                status={status}
              />
              ;
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
