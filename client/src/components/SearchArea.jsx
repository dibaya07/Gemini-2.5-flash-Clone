import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { useEffect } from "react";


const SearchArea = ({userPrompt,setuserPrompt,conversationId,setConversationId,setHistory,setTitle}) => {

  const handleclick = async()=>{
    await axios.post(`${import.meta.env.VITE_API_URL}/chat`,{conversationId,userPrompt})
    .then((res)=>{
      setConversationId(res.data.conversation._id)
      setHistory(res.data.history)
      setTitle(res.data.conversation.title)
    })
  }


  return (
    <>
      <div className="h-36 w-3/4 bg-transparent rounded-3xl border border-solid border-white text-white flex flex-col justify-center">
        <div className="input h-1/4 w-full flex justify-center items-center my-4">
          <input
            className="h-4/5 w-11/12 text-white bg-transparent "
            type="text"
            placeholder="enter your text"
            value={userPrompt}
            onChange={(e) => setuserPrompt(e.target.value)}
          ></input>
        </div>

        <div className="submitBtn w-full text-center flex justify-between items-center my-4">
          <span className="ml-7 text-3xl">
            <IoMdAdd />
          </span>
          <button onClick={handleclick} className="mr-7 text-3xl">
            <IoSend />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchArea;
