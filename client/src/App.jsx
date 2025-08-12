import { useState } from "react";
import "./App.css";
import SearchArea from "./components/SearchArea";
import Title from "./components/Title";
import ChatArea from "./components/ChatArea";
import { v4 as uuidv4 } from 'uuid';
import SlideBar from "./components/SlideBar";


function App() {

  const [title, setTitle] = useState('')      
  const [history, setHistory] = useState()
  const [userPrompt, setuserPrompt] = useState("");
  const [conversationId, setConversationId] = useState(null)

  return (
    <>
      <div className="germini  bg-[#28282B] h-screen flex">
        <div className="left-side w-64 text-white">
          <SlideBar title={title}/>
        </div>
        <div className="right-side flex flex-col flex-1">
          <Title />
          <div className="searchArea flex-grow  w-full flex flex-col justify-between  overflow-hidden">
          <ChatArea history={history} />
          <span className="flex justify-center py-4">
            <SearchArea userPrompt={userPrompt} setuserPrompt={setuserPrompt} conversationId={conversationId} setConversationId={setConversationId} history={history} setHistory={setHistory} setTitle={setTitle}/>
          </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

