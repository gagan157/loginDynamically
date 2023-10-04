import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { Navigate } from "react-router-dom";
import { AuthState } from "./context/authContext";

const ProtectedRoute = ({ Component }) => {
  const { islogin } = AuthState();

  return islogin ? <Component /> : <Navigate to={"/login"} />;
};

const ProtectedRouteAfterLogin = ({ Component }) => {
  const { islogin } = AuthState();

  return !islogin ? <Component /> : <Navigate to={"/"} />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute Component={Home} />} />
      <Route
        path="/login"
        element={<ProtectedRouteAfterLogin Component={LoginForm} />}
      />
      <Route
        path="/signup"
        element={<ProtectedRouteAfterLogin Component={SignupForm} />}
      />
    </Routes>
  );
}

export default App;
