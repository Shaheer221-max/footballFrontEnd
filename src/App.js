import "./App.css";
import AuthContext from "./admin/ActiveUser";
import { Login } from "./admin/Login";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Admin from "./routes/Admin";
import Coach from "./routes/Coach";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const getUser = async () => {
    if (token) {
      const user = await axios.get(
        `${process.env.REACT_APP_API}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "GET_USER", payload: user.data.data.doc });
    }
  };

  React.useEffect(() => {
    getUser();
  }, [dispatch]);

  const {user} = useSelector((state) => state);
  console.log(user)
  return (
    <div>
      <AuthContext>
        {/* {user.token !== null ? user.userRole === "Admin" ? <Admin /> : <Coach /> : <Login />} */}
        <Login />
      </AuthContext>
    </div>
  );
}

export default App;
