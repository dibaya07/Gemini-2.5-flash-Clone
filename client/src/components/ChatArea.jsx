import React from "react";
import "../../src/components/ChatArea.css"
// import { useEffect,useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function ChatArea({ modelRes, displayPrompt,allHistory }) {



// const prevLength = allHistory.length


  // async function results() {
  //    await historyHandler(displayPrompt,modelRes)
     
  // }
  return (

    <div className="flex-grow  overflow-y-scroll scrollbar-hide">
      {/* {console.log(prevLength)} */}
      {/* <p className="text-white">{modelRes}</p> */}
      {/* <p className="text-white">{...allHistory}</p> */}
      {/* {console.log(allHistory)} */}
{console.log(allHistory)}
      <ul className="flex flex-col items-center">
        {
          allHistory.map((item)=>{
            return item.role === "user" ? <div className="flex justify-end px-4 py-2  w-3/4" key={item.id}> <li className="text-white w-fit px-2 text-xl font-normal bg-[#3e3e3f] text-end  flex-wrap" >{item.text}</li></div> :  <div  key={item.id} className="flex justify-start px-4 py-2  w-3/4" ><ul>{
              item.text.map((res)=>{
                return(
                  <li  className="text-white px-2 text-xl font-light" key={uuidv4()}>{res}</li>
                )
              })
              }</ul></div>
            // console.log(item)
            
          })
        }
      </ul>
      {/* {console.log(allHistory.length)} */}
      {
        displayPrompt.trim() !== '' &&<div className=" flex w-full justify-center"> <div className="flex justify-end px-4 py-2  w-3/4"><p className="text-white w-fit px-2 text-xl font-normal bg-[#3e3e3f] text-end  flex-wrap">{displayPrompt}</p> </div></div>
      }
      {
        allHistory.length === 0 && displayPrompt.trim() == '' && <div className="h-full w-full flex justify-center items-center"><h2 className="text-white font-extrabold text-4xl">What do you want to know</h2></div>
      }
        
         {/* {console.log(allHistory)} */}
    </div>
  );
}


