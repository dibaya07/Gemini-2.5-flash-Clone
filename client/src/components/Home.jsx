import { useState } from "react";
import SearchArea from "./SearchArea";
import Title from "./Title";
import ChatArea from "./ChatArea";
import SlideBar from "./SlideBar";
import { useContext } from "react";
import { AuthContext } from "./context.jsx";

function Home() {
  const [title, setTitle] = useState([]);
  const [history, setHistory] = useState([]);
  const [userPrompt, setuserPrompt] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  // const [userName, setUserName] = useState("")
  const [conversationId, setConversationId] = useState(null);
  const [isOldHistory, setIsOldHistory] = useState(false);
  const { isSlideOpen,setIsSlideOpen,showOption,setShowOption } = useContext(AuthContext);

  const handleShowOptionClick = ()=>{
    if(showOption){
      setShowOption(false)
    }
  }
  return (
    <>
      <div className="germini  bg-[#28282B] h-dvh flex" onClick={handleShowOptionClick}>
        <div className={`left-side md:static absolute  text-white ${!isSlideOpen ?  "w-12":"md:w-64 w-12"}`}>
           {/* md:h-auto h-[10vh] */}
          <SlideBar
            title={title}
            setHistory={setHistory}
            setRecentPrompt={setRecentPrompt}
            setuserPrompt={setuserPrompt}
            conversationId={conversationId}
            setConversationId={setConversationId}
            history={history}
            setTitle={setTitle}
            setIsOldHistory={setIsOldHistory}
          />
        </div>
        <div className="right-side flex flex-col flex-1">
          <Title />
          <hr className="opacity-70"/>
          <div className="searchArea flex-grow  w-full flex flex-col justify-between  overflow-hidden">
            <ChatArea
              history={history}
              recentPrompt={recentPrompt}
              setRecentPrompt={setRecentPrompt}
              setuserPrompt={setuserPrompt}
              isOldHistory={isOldHistory}
              setIsOldHistory={setIsOldHistory}
            />
            <span className="flex justify-center pb-4 py-1">
              <SearchArea
                userPrompt={userPrompt}
                setuserPrompt={setuserPrompt}
                conversationId={conversationId}
                setConversationId={setConversationId}
                history={history}
                setHistory={setHistory}
                setTitle={setTitle}
                recentPrompt={recentPrompt}
                setRecentPrompt={setRecentPrompt}
                isOldHistory={isOldHistory}
                setIsOldHistory={setIsOldHistory}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
