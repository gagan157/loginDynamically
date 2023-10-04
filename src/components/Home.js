import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthState } from "../context/authContext";

export default function Home() {
  const { user, setUser, setLogin } = AuthState();
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-screen overflow-hidden">      
        <span>Home</span>
        <h4>{user?.email}</h4>
        <button
          type="button"
          onClick={() => {
            setUser(null);
            setLogin(false);
            navigate("/login");
          }}
        >
          Logout
        </button>
  
    </div>
  );
}
