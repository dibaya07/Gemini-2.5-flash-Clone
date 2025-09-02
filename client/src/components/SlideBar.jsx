import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import axios from "axios";
import { LuPanelLeftClose } from "react-icons/lu";
import { LuPanelRightClose } from "react-icons/lu";
import { useContext } from "react";
import { AuthContext } from "./context.jsx";
import ReactMarkdown from "react-markdown";

export default function SlideBar({
  history,
  setTitle,
  title,
  setHistory,
  setRecentPrompt,
  setuserPrompt,
  setConversationId,
  setIsOldHistory,
}) {
  const { userName, isLogin, isSlideOpen, setIsSlideOpen, setUserName } =
    useContext(AuthContext);

  const handleNewChatClick = () => {
    setHistory([]);
    setRecentPrompt("");
    setuserPrompt("");
    setConversationId(null);
    setIsOldHistory(false);
  };
  const allTitles = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/chat`, {
      withCredentials: true,
    });
    setUserName(res.data.userName);
    // console.log(res.data.allTitle)
    // console.log(res.data.userName)
    setTitle(res.data.allTitle);
  };

  useEffect(() => {
    allTitles();
  }, [history, isLogin]);

  const handleTitleClick = async (conversationId) => {
    setConversationId(conversationId);
    await axios
      .post(`${import.meta.env.VITE_API_URL}/chat/${conversationId}`)
      .then((res) => {
        setHistory(res.data);
        setIsOldHistory(true);
      });
      setIsSlideOpen((prev) => !prev)
  };

  // const handleSlideBar = () => {
  //   setIsSlideOpen(false);
  // };
  // bg-[#2f2f31]
  return (
    <>
      <div
        className={`close-slider md:h-screen h-12 flex flex-col  rounded-full mt-1 md:mt-0 opacity-75 ${
          isSlideOpen ? "md:hidden " : ""
        }
        ${!isSlideOpen ? "hidden md:flex" : ""}
       
           `}
      >
        <button className=" text-2xl mx-auto md:mt-4 my-auto md:my-0 cursor-pointer">
          <LuPanelRightClose onClick={() => setIsSlideOpen((prev) => !prev)} />
        </button>
        {/* {console.log(isSlideOpen)} */}
        <button
          className=" text-2xl mx-auto py-2 mt-4 cursor-pointer md:block hidden"
          onClick={handleNewChatClick}
        >
          <FaEdit />
        </button>
      </div>

      <div
        className={`h-screen  absolute md:static w-[90vw] md:w-auto z-10 md:z-auto flex-col bg-[#2f2f31] 
          ${!isSlideOpen && "md:hidden flex"}
          ${isSlideOpen && "md:flex hidden"}
          `}>
        <div className="line1 flex justify-between mx-3 mt-2 md:m-4">
          <button className=" p-2 text-xl capitalize">
            {/* rounded-[50%] bg-[#3e3e3f] */}
            {userName || "Guest"}
            {/* {console.log(userName)} */}
          </button>
          <button
            className="rounded-[50%] bg-[#3e3e3f] p-4 text-xl cursor-pointer"
            onClick={() => setIsSlideOpen((prev) => !prev)}
          >
            <LuPanelLeftClose />
          </button>
        </div>

        <span
          className="md:m-6 mx-3 my-2 flex items-center cursor-pointer"
          onClick={handleNewChatClick}
        >
          <FaEdit className="mr-3" />
          New Chat
        </span>
        <span className="overflow-y-scroll h-96 ">
          <span className="font-light text-sm mx-0 opacity-85 inline-block w-full px-5">
            Chats
            {isLogin ? " " : "-(Need to login to save conversations)"}
          </span>
          <ul>
            {title
              .slice()
              .reverse()
              .map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className="bg-gray-800 hover:bg-white hover:bg-opacity-20 my-2 cursor-pointer rounded-2xl px-3 py-2 mx-1 whitespace-nowrap overflow-hidden text-sm text-ellipsis"
                    onClick={() => handleTitleClick(item.conversationId)}
                  >
                    <ReactMarkdown>{item.title}</ReactMarkdown>
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
