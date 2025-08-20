import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { LuPanelLeftClose } from "react-icons/lu";
import { LuPanelRightClose } from "react-icons/lu";
import { useContext } from "react";
import { AuthContext } from "./context.jsx";



export default function SlideBar({
  history,
  setTitle,
  title,
  setHistory,
  setRecentPrompt,
  setuserPrompt,
  conversationId,
  setConversationId,
  userName,
  setUserName,
  setIsOldHistory,
}) {
  
  const { isSlideOpen,setIsSlideOpen } = useContext(AuthContext);

  const handleNewChatClick = () => {
    setHistory([]);
    setRecentPrompt("");
    setuserPrompt("");
    setConversationId(null);
    setIsOldHistory(false);
  };
  let allTitles = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/chat`, {
        withCredentials: true,
      })
      .then((res) => {
        setTitle(res.data);
      });
  };

  useEffect(() => {
    allTitles();
  }, [history]);

  const handleTitleClick = async (conversationId) => {
    setConversationId(conversationId);
    await axios
      .post(`${import.meta.env.VITE_API_URL}/chat/${conversationId}`)
      .then((res) => {
        setHistory(res.data);
        setIsOldHistory(true);
      });
  };

  const handleSlideBar = () => {
    setIsSlideOpen(false);
  };

  return (
    <>
   <div className={`close-slider h-screen flex flex-col bg-[#2f2f31] opacity-75 ${isSlideOpen && "hidden"}`}>
    <button className=" text-2xl mx-auto py-2 mt-4 cursor-pointer">
    <LuPanelRightClose onClick={()=>setIsSlideOpen(prev => !prev)}/>
    </button>
    <button  className=" text-2xl mx-auto py-2 mt-4 cursor-pointer"  onClick={handleNewChatClick}>
      <FaEdit />
    </button>
   </div>
    <div className={`h-screen flex flex-col bg-[#2f2f31] ${!isSlideOpen && "hidden"}`}>
      <div className="line1 flex justify-between m-6">
        <button className="rounded-[50%] bg-[#3e3e3f] p-2 text-xl">
          <TiThMenu />
        </button>
        <button className="rounded-[50%] bg-[#3e3e3f] p-2 text-xl cursor-pointer" onClick={handleSlideBar}>
          <LuPanelLeftClose />
          
        </button>
      </div>

      <span
        className="m-6 flex items-center cursor-pointer"
        onClick={handleNewChatClick}
      >
        <FaEdit className="mr-3" />
        New Chat
      </span>
      <span className="overflow-y-scroll h-96 ">
        <ul>
          {title.map((item, idx) => {
            return (
              <li
                key={idx}
                className="bg-gray-900 my-2 cursor-pointer rounded-2xl px-3 py-2 mx-1 whitespace-nowrap overflow-hidden text-ellipsis"
                onClick={() => handleTitleClick(item.conversationId)}
              >
                {item.title}
              </li>
            );
          })}
        </ul>
      </span>
      <div className=" w-full h-2 mt-auto" />
    </div>
     </>
  );
}
