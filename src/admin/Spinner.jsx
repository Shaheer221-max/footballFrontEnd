import React from "react";
import { Oval } from "react-loader-spinner";

export default function Spinner() {
  return (
    <Oval
      height="40"
      width="40"
      color="#4fa94d"
      wrapperStyle={{
        
      }}
      wrapperClass=""
      visible={true}
      outerCircleColor=""
      innerCircleColor=""
      barColor=""
      ariaLabel="circles-with-bar-loading"
    />
  );
}
