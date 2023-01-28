import "./App.css";
import AuthContext from "./admin/ActiveUser";
import { Login } from "./admin/Login";


function App() {
  return (
    <div>
      <AuthContext>
        <Login />
      </AuthContext>
    </div>
  );
}

export default App;
