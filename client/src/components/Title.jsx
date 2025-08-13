import React from "react";
import { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Title() {
  // const navigate = useNavigate()

  // const [currentpage, setCurrentpage] = useState("app")
  return (
    <div className="w-full  text-white flex justify-between ">
      <div className="flex flex-col p-4 font-medium text-lg">
        <span>Gemini</span>
        <span>2.5 Flash</span>
      </div>
      <span className="flex items-center text-3xl px-4" role="Profile">
        <IoPersonCircle onClick={()=>navigate('/authForm')} className="cursor-pointer"/>
      </span>
    </div>
  );
}
