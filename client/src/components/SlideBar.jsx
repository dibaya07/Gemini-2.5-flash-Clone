import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { LuPanelLeftClose } from "react-icons/lu";
import { LuPanelRightClose } from "react-icons/lu";

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
  const handleNewChatClick = () => {
    setHistory([]);
    setRecentPrompt("");
    setuserPrompt("");
    setConversationId(null);
    setIsOldHistory(false);
    // console.log(userName)
  };
  let allTitles = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/chat`, {
        withCredentials: true,
      })
      .then((res) => {
        setTitle(res.data);
        // console.log(res.data)
      });
  };

  useEffect(() => {
    allTitles();
  }, [history]);
  // let conversationIdParams =""

  const handleTitleClick = async (conversationId) => {
    // console.log(conversationId)
    setConversationId(conversationId);
    await axios
      .post(`${import.meta.env.VITE_API_URL}/chat/${conversationId}`)
      .then((res) => {
        setHistory(res.data);
        setIsOldHistory(true);
        // conversationIdParams(conversationId)

        // console.log(res.data)
      });
  };

  // const handleSlideBar = () => {
  //   setSlideBar(true);
  // };
  // useEffect(() => {
  //   handleTitleClick(conversationIdParams)
  // }, [])

  return (
    <div className="h-screen flex flex-col bg-[#2f2f31]">
      <div className="line1 flex justify-between m-6">
        <button className="rounded-[50%] bg-[#3e3e3f] p-2 text-xl">
          <TiThMenu />
        </button>
        <button className="rounded-[50%] bg-[#3e3e3f] p-2 text-xl cursor-pointer">
          <LuPanelLeftClose />
          {/* <LuPanelRightClose  className={`${slideBar ? "hidden" : "inline-block"}`} onClick={handleSlideBar}/> */}
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
          {/* {title} */}
          {/* {console.log(title)} */}
        </ul>
      </span>
      {/* <span className="absolute bottom-1 flex items-center my-6 text-lg h-11 w-60  bg-[#3e3e3f] rounded-3xl px-6 mx-2">
        <IoSettingsSharp className="mr-3" />
        Settings
      </span> */}
      <div className=" w-full h-2 mt-auto" />
    </div>
  );
}
