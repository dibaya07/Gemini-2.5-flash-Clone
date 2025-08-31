// import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context.jsx";
import axios from "axios";

export default function Title() {
  // const [token, setToken] = useState(
  //   localStorage.getItem("gemini-token") || ""
  // );
  // const [isLogin, setIsLogin] = useState(token ? true : false);
  const { userName, setUserName ,isLogin, setIsLogin,token, setToken} = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    setToken(localStorage.getItem("gemini-token"))
    // setIsLogin(token ? true : false);
  }, []);
  useEffect(() => {
    // setToken(localStorage.getItem("gemini-token"))
    setIsLogin(token ? true : false);
  }, [token]);

  const hadleLoginClick =async() => {
    if (token) {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/logout`, {},{
        withCredentials: true,
      })
      if(res.status === 200){
        localStorage.removeItem("gemini-token");
        setToken("");
        setIsLogin(false);
      }
    }else{
      navigate("/authForm")
    }
  };
  return (
    <div className="w-full  text-white flex justify-between ">
      <div className="flex flex-col px-4 py-1 font-medium text-base ml-10 md:ml-0">
        <span>Gemini</span>
        <span>2.5 Flash</span>
      </div>
      <button
        className="flex items-center text-2xl px-4 cursor-pointer"
        role="Profile"
        onClick={hadleLoginClick}
      >
        {isLogin ? `Log Out ` : <IoPersonCircle />}
      </button>
      {/* ${userName} */}
    </div>
  );
}

// onClick={()=>navigate('/authForm')} className="cursor-pointer"
