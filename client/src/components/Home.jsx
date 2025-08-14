import { useState } from "react";
import SearchArea from "./SearchArea";
import Title from "./Title";
import ChatArea from "./ChatArea";
import { v4 as uuidv4 } from 'uuid';
import SlideBar from "./SlideBar";


function Home() {

  const [title, setTitle] = useState([])      
  const [history, setHistory] = useState([])
  const [userPrompt, setuserPrompt] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("")
  // const [userName, setUserName] = useState("")
  const [conversationId, setConversationId] = useState(null)

  return (
    <>
      <div className="germini  bg-[#28282B] h-screen flex">
        <div className="left-side w-64 text-white">
          <SlideBar title={title} setHistory={setHistory} setRecentPrompt={setRecentPrompt} setuserPrompt={setuserPrompt}  conversationId={conversationId} setConversationId={setConversationId} />
        </div>
        <div className="right-side flex flex-col flex-1">
          <Title/>
          <div className="searchArea flex-grow  w-full flex flex-col justify-between  overflow-hidden">
          <ChatArea history={history} recentPrompt={recentPrompt} setRecentPrompt={setRecentPrompt} setuserPrompt={setuserPrompt} />
          <span className="flex justify-center py-4">
            <SearchArea userPrompt={userPrompt} setuserPrompt={setuserPrompt} conversationId={conversationId} setConversationId={setConversationId} history={history} setHistory={setHistory} setTitle={setTitle} recentPrompt={recentPrompt} setRecentPrompt={setRecentPrompt} />
          </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

