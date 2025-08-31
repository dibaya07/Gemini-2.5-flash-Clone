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
  
  const { islogin,isSlideOpen,setIsSlideOpen } = useContext(AuthContext);

  const handleNewChatClick = () => {
    setHistory([]);
    setRecentPrompt("");
    setuserPrompt("");
    setConversationId(null); 
    setIsOldHistory(false);
  };
  const allTitles = async () => {
    const res = await axios
      .get(`${import.meta.env.VITE_API_URL}/chat`, {
        withCredentials: true,
      })
        setTitle(res.data);    
  };

  useEffect(() => {
    allTitles();
  }, [history,islogin]);

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
// bg-[#2f2f31]
  return (
    <>
   <div className={`close-slider md:h-screen h-[10vh] flex flex-col  rounded-full mt-1 md:mt-0 opacity-75 ${isSlideOpen && "hidden"}`}>
    <button className=" text-2xl mx-auto py-2 md:mt-4 my-auto md:my-0 cursor-pointer">
    <LuPanelRightClose onClick={()=>setIsSlideOpen(prev => !prev)}/>
    </button>
    <button  className=" text-2xl mx-auto py-2 mt-4 cursor-pointer md:block hidden"  onClick={handleNewChatClick}>
      <FaEdit />
    </button>
   </div>
   
    <div className={`h-screen flex absolute md:static w-[90vw] md:w-auto z-10 md:z-auto flex-col bg-[#2f2f31] ${!isSlideOpen && "hidden"}`}>
      <div className="line1 flex justify-between mx-3 mt-2 md:m-6">
        <button className="rounded-[50%] bg-[#3e3e3f] p-2 text-xl">
          <TiThMenu />
        </button>
        <button className="rounded-[50%] bg-[#3e3e3f] p-2 text-xl cursor-pointer" onClick={handleSlideBar}>
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
        <ul>
          {title.slice().reverse().map((item, idx) => {
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
