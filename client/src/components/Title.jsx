import React from "react";
import { IoPersonCircle } from "react-icons/io5";

export default function Title() {
  return (
    <div className="w-full  text-white flex justify-between ">
      <div className="flex flex-col p-4 font-medium text-lg">
        <span>Gemini</span>
        <span>2.5 Flash</span>
      </div>
      <span className="flex items-center text-3xl px-4" role="Profile">
        <IoPersonCircle />
      </span>
    </div>
  );
}
