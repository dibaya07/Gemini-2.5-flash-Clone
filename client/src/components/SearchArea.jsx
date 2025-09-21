import React, { useEffect, useState } from "react";
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

  
  // const [file, setFile] = useState(null)
    const { showOption,setShowOption,isSubmit,setIsSubmit,previewFile,setPreviewFile,file, setFile, isUploaded, setIsUploaded } = useContext(AuthContext);

  const handleChange = (e)=>{
    setShowOption(prev=>!prev)
    // console.dir(e.target.files[0])
    // console.log(e.target.files[0])
    let selectedFile =e.target.files[0]
    // setIsUploaded(true)
    // setFile(selectedFile ? selectedFile : "")
    setFile(selectedFile || "")
    const url = URL.createObjectURL(selectedFile)
    setPreviewFile(url)
    // setIsSubmit(true)    
  }
  
  
  const handleclick = async () => {
    setRecentPrompt(userPrompt);
    setuserPrompt("");
    setIsSubmit(true)    
    setIsUploaded(file ? true : false)
    const formData = new FormData();
    
    if(userPrompt){
      formData.append("userPrompt", userPrompt);
    }
    if(conversationId){
      formData.append("conversationId", conversationId);
    }
    
    if(file){
      formData.append("file", file);
    }
    await axios
    .post(
      `${import.meta.env.VITE_API_URL}/chat`,
      formData , 
      {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (conversationId) {
          setIsOldHistory(false);
        }
        setConversationId(res.data.conversation._id);
        setRecentPrompt("");
        setIsUploaded(false)
        setFile(null)
        setPreviewFile(null)
    setIsSubmit(false)
        setHistory(res.data.history);
      });
    };

    // useEffect(() => {
    //  console.log(isSubmit)
    //  console.log(file)
    // }, [isSubmit,file])
    
    // console.log(res.data)
    // setUserName(res.data.conversation.user.userName);
    // console.log("file", file,"previewFile", previewFile,"isSubmit",isSubmit)
    // formData.append("conversationId", conversationId);
    // formData.append("conversationId", null? JSON.stringify(conversationId) : conversationId;
    // else{
    //   formData.append("userPrompt", userPrompt);
    //   formData.append("conversationId", conversationId);

    // }

  return (
    <>
      <div className="h-fit w-full mx-2 md:mx-0 md:w-3/4 bg-transparent rounded-3xl border border-solid border-white text-white flex flex-col justify-center">
      {
       !isSubmit && previewFile && <div className="bg-red-500 overflow-hidden md:h-24 md:w-36 h-16 w-24 m-3 rounded-md relative">
          <IoCloseSharp size={18} className="absolute top-0 right-0 m-2 bg-white text-black rounded-full" onClick={()=>setPreviewFile(null)}/>
          <img src={previewFile} alt="uploaded image" />
        </div>
      }
        <div className="input h-1/4 w-full flex justify-center items-center mt-2 md:my-2">
          <TextareaAutosize
            className="h-4/5 w-11/12 text-white bg-transparent outline-none resize-none  overflow-y-auto min-h-8 max-h-32"
            
            minRows={1}
            maxRows={5}
            placeholder="enter your text"
            value={userPrompt}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                // console.log("enter pressed")
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
          <button onClick={handleclick} className="md:mr-7 mr-2 text-2xl md:text-3xl disabled:opacity-75 disabled:cursor-not-allowed" disabled={!userPrompt && !file}>
             
             
            <IoSend />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchArea;
