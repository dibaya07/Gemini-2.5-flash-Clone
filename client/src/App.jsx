import { useState } from "react";
import "./App.css";
import SearchArea from "./components/SearchArea";
import Title from "./components/Title";
import ChatArea from "./components/ChatArea";
import { v4 as uuidv4 } from 'uuid';
import SlideBar from "./components/SlideBar";


function App() {
  
   const [response, setResponse] = useState("");
   const [prompt, setPrompt] = useState("");
   const [historyTaker, setHistoryTaker] = useState([])
   const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem("History")))
  let handleRes = (resData)=>{
    setResponse(resData)
  }

  let handlePrompt = (promptData)=>{
    setPrompt(promptData)
  }

  let handleHistory = (promptData,resData)=>{
   setHistoryTaker(historyTaker ? [...historyTaker,{role: "user", text:promptData ,id:uuidv4()},{role:'model', text:resData ,id:uuidv4()}]: {role: "user", text:promptData ,id:uuidv4()},{role:'model', text:resData ,id:uuidv4()}) 
   
  }


  return (
    <>
      <div className="germini  bg-[#28282B] h-screen flex">
        <div className="left-side w-64 text-white">
          <SlideBar modelRes={response} displayPrompt={prompt} setPrompt={setPrompt} recentHistory={recentHistory}/>
        </div>
        <div className="right-side flex flex-col flex-1">
          <Title />
          <div className="searchArea flex-grow  w-full flex flex-col justify-between  overflow-hidden">
          <ChatArea displayPrompt={prompt} allHistory={historyTaker} />
          <span className="flex justify-center py-4">
            <SearchArea searchRes={handleRes} modelRes={response} userPromptData={handlePrompt} displayPrompt={prompt} historyHandler={handleHistory} allHistory={historyTaker} recentHistory={recentHistory} setRecentHistory={setRecentHistory}/>
          </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;


//  results={historyTaker}

//    let handleHistory =()=>{
//     setHistoryTaker(...historyTaker,{prompt,response})
//   }

//    historyHandler={handleHistory}

// modelRes={response} displayPrompt={prompt}