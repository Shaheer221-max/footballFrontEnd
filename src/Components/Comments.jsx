import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";

export default function Comments() {
  var location = useLocation();
  console.log(location.state);
  return (
    <div className="flex-col w-full">
      <Header title={"Comments"} />
      <div className="flex-col">
        <h1 style={{ color: "white", margin: 20 }}>All Comments</h1>
        {location.state.map((comment) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid white",
              margin: 20,
              padding: 10,
            }}
          >
            <img
              src={comment.refOfUser.image}
              alt=""
              style={{ width: 30, height: 30 }}
              className="rounded-full"
            />
            <h3 style={{ color: "white", marginLeft: 15 }}>
              {comment.comment}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
