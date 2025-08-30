import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { HiPaperClip } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "./context.jsx";
import TextareaAutosize from 'react-textarea-autosize';


// import { useEffect } from "react";

const SearchArea = ({
  userPrompt,
  setuserPrompt,
  conversationId,
  setConversationId,
  setHistory,
  setRecentPrompt,
  setUserName,
  setIsOldHistory,
}) => {

  const [isSubmit, setIsSubmit] = useState(false)
  const [file, setFile] = useState(null)
  const [previewFile, setPreviewFile] = useState(null)
    const { showOption,setShowOption } = useContext(AuthContext);

  const handleChange = (e)=>{
    setShowOption(prev=>!prev)
    let seletedFile =e.target.files[0]
    setFile(seletedFile)
    const url = URL.createObjectURL(seletedFile)
    setPreviewFile(url)
  }


  const handleclick = async () => {
    setRecentPrompt(userPrompt);
    setuserPrompt("");
    setIsSubmit(true)
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/chat`,
        { conversationId, userPrompt }, 
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (conversationId) {
          setIsOldHistory(false);
        }
        setConversationId(res.data.conversation._id);
        setRecentPrompt("");
        setHistory(res.data.history);
        console.log(res.data)
        setUserName(res.data.conversation.user.userName);
      });
  };

  return (
    <>
      <div className="h-fit w-full mx-2 md:mx-0 md:w-3/4 bg-transparent rounded-3xl border border-solid border-white text-white flex flex-col justify-center">
      {
        previewFile && <div className="bg-red-500 overflow-hidden md:h-24 md:w-36 h-16 w-24 m-3 rounded-md relative">
          <IoCloseSharp size={18} className="absolute top-0 right-0 m-2 bg-white text-black rounded-full" onClick={()=>setPreviewFile(null)}/>
          <img src={previewFile} alt="uploaded image" />
        </div>
      }
        <div className="input h-1/4 w-full flex justify-center items-center mt-2 md:my-2">
          <TextareaAutosize
            className="h-4/5 w-11/12 text-white bg-transparent outline-none resize-none  overflow-y-auto min-h-8 max-h-32"
            
            minRows={1}
            maxRows={5}
            type="text"
            placeholder="enter your text"
            value={userPrompt}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleclick();
              }
            }}
            onChange={(e) => setuserPrompt(e.target.value)}
          />
        </div>

        <div className="submitBtn w-full text-center flex justify-between items-center my-2 relative">
          <span className="md:ml-7 ml-2 text-xl md:text-3xl cursor-pointer" onClick={()=>setShowOption((prev)=>!prev)}>
            <IoMdAdd />
          </span>
          {
            showOption && <div className="bg-gray-700 absolute left-9 bottom-10 rounded-md p-2" onClick={(e)=>e.stopPropagation()}> 
              <label className="cursor-pointer flex p-1 hover:bg-slate-500 rounded-md" >
             <HiPaperClip size={20} className="m-1"/>
              <span className=" flex items-center ">Add photos and files</span>
              <input type="file" name="image" accept="image/*,video/*" onChange={handleChange} className="hidden"/>
              </label>
            </div>
          }
          <button onClick={handleclick} className="md:mr-7 mr-2 text-2xl md:text-3xl">
            <IoSend />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchArea;
