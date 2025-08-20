import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context.jsx";

export default function Title() {
  const [token, setToken] = useState(
    localStorage.getItem("gemini-token") || ""
  );
  const [isLogin, setIsLogin] = useState(token ? true : false);
  const { userName, setUserName } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    setIsLogin(token ? true : false);
  }, [token]);

  const hadleLoginClick = () => {
    if (token) {
      localStorage.removeItem("gemini-token");
      setToken("");
      setIsLogin(false);
    }else{
      navigate("/authForm")
    }
  };
  return (
    <div className="w-full  text-white flex justify-between ">
      <div className="flex flex-col p-4 font-medium text-lg">
        <span>Gemini</span>
        <span>2.5 Flash</span>
      </div>
      <button
        className="flex items-center text-2xl px-4 cursor-pointer"
        role="Profile"
        onClick={hadleLoginClick}
      >
        {isLogin ? `Log Out${userName}` : <IoPersonCircle />}
      </button>
    </div>
  );
}

// onClick={()=>navigate('/authForm')} className="cursor-pointer"
