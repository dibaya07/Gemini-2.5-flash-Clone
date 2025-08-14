import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context.jsx";

export default function Title() {
  const [token, setToken] = useState(localStorage.getItem("gemini-token") || "");
  const [isLogin, setIsLogin] = useState(token ? true : false);
  const { userName,setUserName } = useContext(AuthContext);

  // isLogin, setIsLogin, token, setToken,
  // const navigate = useNavigate()

  // useEffect(async() => {
  //   await axios.get(`${import.meta.env.VITE_API_URL}/user/${endpoints}`, data, {
  //       withCredentials: true,
  //     })
  
  //   return () => {
  //     second
  //   }
  // }, [third])
  
  
  useEffect(() => {
    setIsLogin(token ? true : false);
  }, [token]);


  const hadleLoginClick = ()=>{
    if(token){
      localStorage.removeItem("gemini-token")
      setToken("")
      setIsLogin(false)
    }
  }
  // const [currentpage, setCurrentpage] = useState("app")
  return (
    <div className="w-full  text-white flex justify-between ">
      <div className="flex flex-col p-4 font-medium text-lg">
        <span>Gemini</span>
        <span>2.5 Flash</span>
        {/* {console.log(userName)} */}
      </div>
      <Link className="flex items-center text-3xl px-4 cursor-pointer" role="Profile" to={isLogin ? "/":"/authForm"} onClick={hadleLoginClick}>
        {isLogin ? `log out${userName}` : <IoPersonCircle />}
      </Link>
    </div>
  );
}


// onClick={()=>navigate('/authForm')} className="cursor-pointer"