import React, { useEffect, useRef } from "react";
import "../../src/components/ChatArea.css";
import ReactMarkdown from "react-markdown";


// function WordByWordText({ text, speed = 300 }) {
//   const words = text.split(" ");
//   const [displayedText, setDisplayedText] = useState([]);
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (index < words.length) {
//       const timer = setTimeout(() => {
//         setDisplayedText((prev) => [...prev, words[index]]);
//         setIndex(index + 1);
//       }, speed);
//       return () => clearTimeout(timer);
//     }
//   }, [index, words, speed]);

//   return <>{displayedText.join(" ")}</>;
// }

export default function ChatArea({
  history,
  recentPrompt,
  isOldHistory,
}) {
  // useEffect(() => {
  //   setIsOldHistory(true)
  // }, [])

  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [history, recentPrompt]);

  return (
    <div className="flex-grow overflow-y-scroll scrollbar-hide">
      <ul className="flex flex-col items-center pb-4 md:pb-8 md:pt-4">
        {history?.map((item, idx) => {
          // if( item.role === "model"){
          //   let answer = item.parts[0].text.split(" ")
          // }
          return item.role === "user" ? (
            <div
              className="flex justify-end px-4 py-2 md:w-3/4 w-[90vw]"
              key={item._id || idx}
            >
              <li className="text-white w-fit px-2 text-base font-normal bg-[#3e3e3f] text-end  flex-wrap">
                {isOldHistory ? item.content : item.parts[0].text}
              </li>
            </div>
          ) : (
            <div
              className="flex justify-start px-4 py-2  md:w-3/4 w-[90vw]"
              key={item._id || idx}
            >
              <li className="text-white w-fit px-2 text-base font-normal   flex-wrap whitespace-pre-wrap">
                <ReactMarkdown>{isOldHistory ? item.content : item.parts[0].text}</ReactMarkdown>
                {/* <WordByWordText text={isOldHistory ? item.content : item.parts[0].text} speed={250} /> */}
                {/* <WordByWordText text={item.parts[0].text} speed={250} /> */}
              </li>
            </div>
          );
        })}
        {recentPrompt && (
          <>
            <div className="flex justify-end px-4 py-2  md:w-3/4 w-[90vw]">
              <li className="text-white w-fit px-2 text-base font-normal bg-[#3e3e3f] text-end  flex-wrap">
                {recentPrompt}
              </li>
            </div>
            <div className="flex justify-start px-4 py-2  md:w-3/4 w-[90vw]">
              <li className="text-white w-fit px-2 text-base font-normal bg-[#3e3e3f]  flex-wrap">
                Thinking ...
              </li>
            </div>
          </>
        )}
      </ul>
      <div ref={bottomRef} />
    </div>
  );
}
