import React from "react";
import "../../styles/font.css"
import Product from "../../assets/Product.png"
export default function ShopDashboardSidebar() {
    
    
    const staticdata = [
        {
          id: 1,
        },
        {
          id: 21,
        },
        {
          id: 1,
        },
      ];
 
  return (

    
    <div >
      {/* Parent Profile Card */}
      <div className="">
        <h2 className="self-center font-lexend text-lg font-medium whitespace-nowrap text-white ml-3 mt-8 ">
          Notifications
        </h2>
        <div className="overflow-x-auto   font-lexend relative  my-5 font-dm rounded-xl">
          
                
              {staticdata.map((val, ind) => (
                 <div className="flex p-2">
                    <div className="flex-1 grow-0">
                    <img  src={Product} alt="image not found"/>
                    <p>11111</p>

                    </div>
                    <div className="flex-1 grow-0">
                    <h3 className="self-center font-lexend text-lg font-medium whitespace-nowrap text-white  ">
                    New Order
                    </h3>
                    <p className="text-white font-lexend text-sm">20 min ago</p>
                    </div>
                    <div className="flex-1 grow-1 ml-3 mt-1">
                        <p className="text-[#7E7E7E]">from michel adam</p>
                    </div>
                 </div>
              ))}
            
        </div>
        
        </div>
    </div>
  );
}
