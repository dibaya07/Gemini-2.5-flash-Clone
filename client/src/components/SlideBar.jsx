import React from "react";
import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

export default function SlideBar({ setPrompt, recentHistory }) {
  const handleclick = (qsn) => {
    setPrompt(qsn);
  };

  return (
    <div className="h-screen flex flex-col bg-[#2f2f31]">
      <div className="line1 flex justify-between m-6">
        <button className="rounded-[50%] bg-[#3e3e3f] p-2 text-xl">
          <TiThMenu />
        </button>
        <button className="rounded-[50%] bg-[#3e3e3f] p-2 text-xl">
          <FaSearch />
        </button>
      </div>

      <span className="m-6 flex items-center">
        <FaEdit className="mr-3" />
        New Chat
      </span>
      <span className="overflow-y-scroll">
        <ul>
          {recentHistory &&
            recentHistory.map((item) => {
              return (
                <li
                  key={uuidv4()}
                  className="bg-gray-900 my-2 cursor-pointer rounded-2xl px-3 py-2 mx-1"
                  onClick={() => handleclick(item)}
                >
                  {item}
                </li>
              );
            })}
        </ul>
      </span>
      <span className="absolute bottom-1 flex items-center my-6 text-lg h-11 w-60  bg-[#3e3e3f] rounded-3xl px-6 mx-2">
        <IoSettingsSharp className="mr-3" />
        Settings
      </span>
    </div>
  );
}
